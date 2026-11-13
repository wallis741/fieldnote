#!/usr/bin/env python3
"""把 SHP / KML / KMZ / GeoJSON 裁切到手冊地圖範圍，寫進 js/overlaydata.js（內建疊加圖資）。

用法：
  python3 tools/import_overlay.py --id sens --name "山崩與地滑地質敏感區" --color "#d1495b" \
      --source "地礦中心 L0001 臺北市" 檔案.zip
需要：pip install pyshp pyproj
同一個 --id 再執行一次會取代舊資料。
"""
import argparse, io, json, os, re, sys, zipfile, xml.etree.ElementTree as ET

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "js", "overlaydata.js")
MAPS = os.path.join(ROOT, "js", "fieldmaps.js")
MARGIN = 300


def bounds():
    txt = open(MAPS, encoding="utf-8").read()
    layers = json.loads(re.search(r"FN\.MAP_LAYERS = (\[.*?\]);", txt, re.S).group(1))
    L = layers[0]
    return (L["west"] - MARGIN, L["south"] - MARGIN, L["east"] + MARGIN, L["north"] + MARGIN)


def transformer(prj_wkt):
    from pyproj import CRS, Transformer
    src = CRS.from_wkt(prj_wkt) if prj_wkt else CRS.from_epsg(3826)
    return Transformer.from_crs(src, CRS.from_epsg(3826), always_xy=True)


def to_en(x, y, tf):
    if tf is None:
        if abs(x) <= 180 and abs(y) <= 90:
            from pyproj import Transformer
            x, y = Transformer.from_crs(4326, 3826, always_xy=True).transform(x, y)
        return [round(x, 1), round(y, 1)]
    x, y = tf.transform(x, y)
    return [round(x, 1), round(y, 1)]


def read_shp(path):
    import shapefile
    files = {}
    if path.lower().endswith(".zip"):
        z = zipfile.ZipFile(path)
        for n in z.namelist():
            ext = n.lower().rsplit(".", 1)[-1]
            files.setdefault(ext, []).append(n)
        out = []
        for shp in files.get("shp", []):
            base = shp[:-4]
            get = lambda e: io.BytesIO(z.read(next(n for n in z.namelist() if n.lower() == (base + "." + e).lower())))
            prj = None
            try: prj = get("prj").read().decode("utf-8", "ignore")
            except StopIteration: pass
            out += shp_records(shapefile.Reader(shp=get("shp"), dbf=get("dbf"), encoding=guess_enc(get("dbf"))), prj)
        return out
    base = path[:-4]
    prj = open(base + ".prj").read() if os.path.exists(base + ".prj") else None
    return shp_records(shapefile.Reader(path, encoding=guess_enc(open(base + ".dbf", "rb"))), prj)


def guess_enc(dbf):
    raw = dbf.read()
    for enc in ("utf-8", "big5", "cp950"):
        try: raw.decode(enc); return enc
        except UnicodeDecodeError: pass
    return "latin1"


def shp_records(r, prj):
    tf = transformer(prj)
    fields = [f[0] for f in r.fields[1:]]
    out = []
    for sr in r.iterShapeRecords():
        props = {k: (v if isinstance(v, (int, float, str)) else str(v)) for k, v in zip(fields, sr.record)}
        geo = sr.shape.__geo_interface__
        out += geom(geo, props, tf)
    return out


def geom(g, props, tf):
    t, c = g["type"], g["coordinates"]
    ring = lambda r: [to_en(p[0], p[1], tf) for p in r]
    if t == "Point": return [{"type": "point", "g": to_en(c[0], c[1], tf), "props": props}]
    if t == "MultiPoint": return [{"type": "point", "g": to_en(p[0], p[1], tf), "props": props} for p in c]
    if t == "LineString": return [{"type": "line", "g": ring(c), "props": props}]
    if t == "MultiLineString": return [{"type": "line", "g": ring(l), "props": props} for l in c]
    if t == "Polygon": return [{"type": "polygon", "g": [ring(r) for r in c], "props": props}]
    if t == "MultiPolygon": return [{"type": "polygon", "g": [ring(r) for r in p], "props": props} for p in c]
    return []


def read_kml_text(text):
    ns = {"k": "http://www.opengis.net/kml/2.2"}
    root = ET.fromstring(text.encode("utf-8") if isinstance(text, str) else text)
    def q(tag): return ".//{http://www.opengis.net/kml/2.2}" + tag
    out = []
    for pm in root.iter("{http://www.opengis.net/kml/2.2}Placemark"):
        name = (pm.findtext("{http://www.opengis.net/kml/2.2}name") or "").strip()
        props = {"name": name}
        for d in pm.iter("{http://www.opengis.net/kml/2.2}SimpleData"): props[d.get("name")] = d.text or ""
        for d in pm.iter("{http://www.opengis.net/kml/2.2}Data"): props[d.get("name")] = d.findtext("{http://www.opengis.net/kml/2.2}value") or ""
        co = lambda el: [to_en(float(a.split(",")[0]), float(a.split(",")[1]), None) for a in (el.text or "").split()]
        for pg in pm.iter("{http://www.opengis.net/kml/2.2}Polygon"):
            rings = [co(e) for e in pg.iter("{http://www.opengis.net/kml/2.2}coordinates")]
            if rings: out.append({"type": "polygon", "g": rings, "props": props})
        for ls in pm.iter("{http://www.opengis.net/kml/2.2}LineString"):
            e = ls.find(q("coordinates"))
            if e is not None: out.append({"type": "line", "g": co(e), "props": props})
        for pt in pm.iter("{http://www.opengis.net/kml/2.2}Point"):
            e = pt.find(q("coordinates"))
            if e is not None: out.append({"type": "point", "g": co(e)[0], "props": props})
    return out


def read_any(path):
    low = path.lower()
    if low.endswith(".shp"): return read_shp(path)
    if low.endswith(".zip"): return read_shp(path)
    if low.endswith(".kmz"):
        z = zipfile.ZipFile(path); return read_kml_text(z.read(next(n for n in z.namelist() if n.lower().endswith(".kml"))))
    if low.endswith(".kml"): return read_kml_text(open(path, "rb").read())
    data = json.load(open(path, encoding="utf-8"))
    feats = data["features"] if data.get("type") == "FeatureCollection" else [data]
    out = []
    for f in feats:
        if f.get("geometry"): out += geom(f["geometry"], f.get("properties") or {}, None)
    return out


def pts(f):
    if f["type"] == "point": return [f["g"]]
    if f["type"] == "line": return f["g"]
    return [p for r in f["g"] for p in r]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("files", nargs="+")
    ap.add_argument("--id", required=True); ap.add_argument("--name", required=True)
    ap.add_argument("--color", default="#d1495b"); ap.add_argument("--source", default="")
    ap.add_argument("--keep", default="", help="只保留這些欄位（逗號分隔）")
    a = ap.parse_args()
    W, S, E, N = bounds()
    feats, total = [], 0
    for f in a.files:
        got = read_any(f); total += len(got)
        for ft in got:
            P = pts(ft); xs = [p[0] for p in P]; ys = [p[1] for p in P]
            if max(xs) >= W and min(xs) <= E and max(ys) >= S and min(ys) <= N:
                if a.keep: ft["props"] = {k: v for k, v in ft["props"].items() if k in a.keep.split(",")}
                feats.append(ft)
    txt = open(OUT, encoding="utf-8").read() if os.path.exists(OUT) else ""
    m = re.search(r"FN\.OVERLAY_DATA = (\[.*\]);", txt, re.S)
    layers = json.loads(m.group(1)) if m else []
    layers = [l for l in layers if l["id"] != a.id] + [{"id": a.id, "name": a.name, "color": a.color, "source": a.source, "features": feats}]
    open(OUT, "w", encoding="utf-8").write("/* 內建疊加圖資（由 tools/import_overlay.py 產生，請勿手動編輯） */\nwindow.FN = window.FN || {};\nFN.OVERLAY_DATA = " + json.dumps(layers, ensure_ascii=False) + ";\n")
    print(f"{a.name}: 原始 {total} 個圖徵，範圍內保留 {len(feats)} 個 → {OUT}")


if __name__ == "__main__":
    main()
