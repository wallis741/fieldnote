/* FIELDNOTE 疊加圖資：山崩與地滑地質敏感區、歷史山崩、順向坡、土石流潛勢溪流等
 * 內建圖資放在 js/overlaydata.js（FN.OVERLAY_DATA，由 tools/import_overlay.py 產生）。
 * 使用者也可以在 App 內匯入 KML／KMZ／GeoJSON，只會保留手冊地圖範圍附近的圖徵。
 * 所有幾何一律存成 TWD97 TM2 公尺座標：polygon = [ring...]，ring = [[E,N]...]；line = [[E,N]...]；point = [E,N]
 */
window.FN = window.FN || {};
FN.OVERLAY_DATA = FN.OVERLAY_DATA || [];

FN.overlay = (function () {
  var MARGIN = 300; /* 手冊範圍外再多保留 300 m */
  var PALETTE = ["#d1495b", "#7b2cbf", "#e36414", "#0f7173", "#3a86ff", "#8d6a00"];

  function bounds() { var L = FN.MAP_LAYERS[0]; return { w: L.west - MARGIN, e: L.east + MARGIN, s: L.south - MARGIN, n: L.north + MARGIN }; }
  function bboxOf(pts) {
    var b = { w: Infinity, e: -Infinity, s: Infinity, n: -Infinity };
    pts.forEach(function (p) { if (p[0] < b.w) b.w = p[0]; if (p[0] > b.e) b.e = p[0]; if (p[1] < b.s) b.s = p[1]; if (p[1] > b.n) b.n = p[1]; });
    return b;
  }
  function hits(b, a) { return !(b.e < a.w || b.w > a.e || b.n < a.s || b.s > a.n); }
  function flatPts(f) { return f.type === "point" ? [f.g] : f.type === "line" ? f.g : [].concat.apply([], f.g); }

  /* 座標：經緯度或 TWD97 都接受 */
  function toEN(x, y) {
    if (Math.abs(x) <= 180 && Math.abs(y) <= 90) { var t = FN.geo.toTWD97(y, x); return [+t.E.toFixed(1), +t.N.toFixed(1)]; }
    return [+(+x).toFixed(1), +(+y).toFixed(1)];
  }

  /* ---- 解析 GeoJSON ---- */
  function fromGeoJSON(obj) {
    var out = [], feats = obj.type === "FeatureCollection" ? obj.features : obj.type === "Feature" ? [obj] : [{ type: "Feature", geometry: obj, properties: {} }];
    feats.forEach(function (ft) {
      var g = ft.geometry, props = ft.properties || {};
      if (!g) return;
      var push = function (type, geom) { out.push({ type: type, g: geom, props: props }); };
      var ring = function (r) { return r.map(function (c) { return toEN(c[0], c[1]); }); };
      if (g.type === "Point") push("point", toEN(g.coordinates[0], g.coordinates[1]));
      if (g.type === "MultiPoint") g.coordinates.forEach(function (c) { push("point", toEN(c[0], c[1])); });
      if (g.type === "LineString") push("line", ring(g.coordinates));
      if (g.type === "MultiLineString") g.coordinates.forEach(function (l) { push("line", ring(l)); });
      if (g.type === "Polygon") push("polygon", g.coordinates.map(ring));
      if (g.type === "MultiPolygon") g.coordinates.forEach(function (p) { push("polygon", p.map(ring)); });
    });
    return out;
  }

  /* ---- 解析 KML ---- */
  function fromKML(text) {
    var doc = new DOMParser().parseFromString(text, "application/xml"), out = [];
    var byTag = function (el, tag) { return Array.prototype.slice.call(el.getElementsByTagName(tag)); };
    var coords = function (el) {
      return (el.textContent || "").trim().split(/\s+/).filter(Boolean).map(function (s) { var a = s.split(","); return toEN(Number(a[0]), Number(a[1])); });
    };
    byTag(doc, "Placemark").forEach(function (pm) {
      var name = (byTag(pm, "name")[0] || {}).textContent || "";
      var props = { name: name.trim() };
      byTag(pm, "Data").forEach(function (d) { var v = byTag(d, "value")[0]; props[d.getAttribute("name")] = v ? v.textContent : ""; });
      byTag(pm, "SimpleData").forEach(function (d) { props[d.getAttribute("name")] = d.textContent; });
      var desc = byTag(pm, "description")[0]; if (desc) props.description = desc.textContent.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 400);
      byTag(pm, "Polygon").forEach(function (pg) {
        var rings = [];
        byTag(pg, "outerBoundaryIs").forEach(function (ob) { var c = byTag(ob, "coordinates")[0]; if (c) rings.push(coords(c)); });
        byTag(pg, "innerBoundaryIs").forEach(function (ib) { var c = byTag(ib, "coordinates")[0]; if (c) rings.push(coords(c)); });
        if (rings.length) out.push({ type: "polygon", g: rings, props: props });
      });
      byTag(pm, "LineString").forEach(function (ls) { var c = byTag(ls, "coordinates")[0]; if (c) out.push({ type: "line", g: coords(c), props: props }); });
      byTag(pm, "Point").forEach(function (pt) { var c = byTag(pt, "coordinates")[0]; if (c) out.push({ type: "point", g: coords(c)[0], props: props }); });
    });
    return out;
  }

  /* ---- 解開 KMZ（ZIP）：用瀏覽器內建的解壓縮 ---- */
  async function unzipFirstKML(buf) {
    var dv = new DataView(buf), u8 = new Uint8Array(buf), i = 0;
    while (i + 30 < u8.length && dv.getUint32(i, true) === 0x04034b50) {
      var method = dv.getUint16(i + 8, true), csize = dv.getUint32(i + 18, true), nlen = dv.getUint16(i + 26, true), xlen = dv.getUint16(i + 28, true);
      var name = new TextDecoder().decode(u8.subarray(i + 30, i + 30 + nlen)), start = i + 30 + nlen + xlen, data = u8.subarray(start, start + csize);
      if (/\.kml$/i.test(name)) {
        if (method === 0) return new TextDecoder().decode(data);
        if (method === 8 && window.DecompressionStream) {
          var ds = new Blob([data]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
          return await new Response(ds).text();
        }
        throw new Error("這支手機的瀏覽器無法解開 KMZ，請改用 KML 檔。");
      }
      i = start + csize;
    }
    throw new Error("KMZ 裡沒有找到 KML 檔。");
  }

  /* 匯入一個檔案 → 一個圖層（只留範圍內的圖徵） */
  async function parseFile(file) {
    var name = file.name.replace(/\.(kml|kmz|geojson|json)$/i, ""), feats;
    if (/\.kmz$/i.test(file.name)) feats = fromKML(await unzipFirstKML(await file.arrayBuffer()));
    else if (/\.kml$/i.test(file.name)) feats = fromKML(await file.text());
    else feats = fromGeoJSON(JSON.parse(await file.text()));
    var B = bounds(), all = feats.length;
    feats = feats.filter(function (f) { return hits(bboxOf(flatPts(f)), B); });
    return { layer: { id: "u-" + Date.now().toString(36), name: name, source: "自行匯入：" + file.name, color: PALETTE[Math.floor(Math.random() * PALETTE.length)], user: true, features: feats }, total: all };
  }

  /* ---- 幾何判斷 ---- */
  function inRing(E, N, r) {
    var inside = false;
    for (var i = 0, j = r.length - 1; i < r.length; j = i++) {
      var xi = r[i][0], yi = r[i][1], xj = r[j][0], yj = r[j][1];
      if ((yi > N) !== (yj > N) && E < (xj - xi) * (N - yi) / (yj - yi) + xi) inside = !inside;
    }
    return inside;
  }
  function inPolygon(E, N, rings) { if (!inRing(E, N, rings[0])) return false; for (var k = 1; k < rings.length; k++) if (inRing(E, N, rings[k])) return false; return true; }
  function segDist(E, N, a, b) {
    var dx = b[0] - a[0], dy = b[1] - a[1], L = dx * dx + dy * dy, t = L ? Math.max(0, Math.min(1, ((E - a[0]) * dx + (N - a[1]) * dy) / L)) : 0;
    return Math.hypot(E - (a[0] + t * dx), N - (a[1] + t * dy));
  }
  function distTo(E, N, f) {
    if (f.type === "point") return Math.hypot(E - f.g[0], N - f.g[1]);
    var lines = f.type === "line" ? [f.g] : f.g, best = Infinity;
    if (f.type === "polygon" && inPolygon(E, N, f.g)) return 0;
    lines.forEach(function (l) { for (var i = 1; i < l.length; i++) best = Math.min(best, segDist(E, N, l[i - 1], l[i])); });
    return best;
  }
  function label(f) {
    var p = f.props || {};
    return p.DEBRISNO ? p.DEBRISNO + (p.POTENTIAL ? "（" + p.POTENTIAL + "潛勢）" : "") : p.name || p.NAME || p.Name || p.名稱 || p.ID || p.id || "";
  }

  /* 某一點周邊有哪些圖資：在範圍內，或 radius 公尺內 */
  function around(E, N, layers, radius) {
    var res = [];
    layers.forEach(function (ly) {
      var best = null;
      ly.features.forEach(function (f) { var d = distTo(E, N, f); if (d <= radius && (!best || d < best.d)) best = { d: d, f: f }; });
      if (best) res.push({ layer: ly, d: best.d, inside: best.d === 0 && best.f.type === "polygon", f: best.f, label: label(best.f) });
    });
    return res.sort(function (a, b) { return a.d - b.d; });
  }

  return { parseFile: parseFile, around: around, label: label, flatPts: flatPts };
})();
