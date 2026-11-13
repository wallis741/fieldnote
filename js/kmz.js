/* FIELDNOTE KMZ 匯出：停駐點、觀測紀錄（含照片）與 GPS 軌跡，可用 Google Earth 開啟 */
window.FN = window.FN || {};

FN.kmz = (function () {
  /* ---- 不壓縮的 ZIP 產生器 ---- */
  var CRC = (function () {
    var t = new Uint32Array(256);
    for (var n = 0; n < 256; n++) { var c = n; for (var k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; }
    return t;
  })();
  function crc32(bytes) { var c = 0xffffffff; for (var i = 0; i < bytes.length; i++) c = CRC[(c ^ bytes[i]) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; }
  function zip(files) {
    var enc = new TextEncoder(), parts = [], central = [], offset = 0;
    var d = new Date(), time = (d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1), date = ((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate();
    files.forEach(function (f) {
      var name = enc.encode(f.name), data = f.data, crc = crc32(data);
      var h = new DataView(new ArrayBuffer(30));
      h.setUint32(0, 0x04034b50, true); h.setUint16(4, 20, true); h.setUint16(6, 0x0800, true); h.setUint16(8, 0, true);
      h.setUint16(10, time, true); h.setUint16(12, date, true); h.setUint32(14, crc, true); h.setUint32(18, data.length, true); h.setUint32(22, data.length, true);
      h.setUint16(26, name.length, true); h.setUint16(28, 0, true);
      parts.push(new Uint8Array(h.buffer), name, data);
      var c = new DataView(new ArrayBuffer(46));
      c.setUint32(0, 0x02014b50, true); c.setUint16(4, 20, true); c.setUint16(6, 20, true); c.setUint16(8, 0x0800, true); c.setUint16(10, 0, true);
      c.setUint16(12, time, true); c.setUint16(14, date, true); c.setUint32(16, crc, true); c.setUint32(20, data.length, true); c.setUint32(24, data.length, true);
      c.setUint16(28, name.length, true); c.setUint32(42, offset, true);
      central.push(new Uint8Array(c.buffer), name);
      offset += 30 + name.length + data.length;
    });
    var cdSize = central.reduce(function (s, p) { return s + p.length; }, 0);
    var e = new DataView(new ArrayBuffer(22));
    e.setUint32(0, 0x06054b50, true); e.setUint16(8, files.length, true); e.setUint16(10, files.length, true); e.setUint32(12, cdSize, true); e.setUint32(16, offset, true);
    return new Blob(parts.concat(central, [new Uint8Array(e.buffer)]), { type: "application/vnd.google-earth.kmz" });
  }
  function b64bytes(dataUrl) { var bin = atob(dataUrl.split(",")[1]), a = new Uint8Array(bin.length); for (var i = 0; i < bin.length; i++) a[i] = bin.charCodeAt(i); return a; }
  function x(s) { return String(s === null || s === undefined ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function h(s) { return x(s).replace(/\n/g, "<br>"); }

  /* list：觀測；track：[{lat,lon,t}]；field：{group, answers} */
  function build(list, track, field) {
    var T = FN.TRIP, files = [], kml = [];
    kml.push('<?xml version="1.0" encoding="UTF-8"?>', '<kml xmlns="http://www.opengis.net/kml/2.2"><Document>',
      "<name>" + x(T.course + " " + T.title + (field.group ? "（" + field.group + "）" : "")) + "</name>",
      '<Style id="stop"><IconStyle><color>ff1eb5e7</color><scale>1.2</scale><Icon><href>http://maps.google.com/mapfiles/kml/paddle/ylw-stars.png</href></Icon></IconStyle></Style>',
      '<Style id="obs"><IconStyle><color>ff223aa0</color><Icon><href>http://maps.google.com/mapfiles/kml/paddle/red-circle.png</href></Icon></IconStyle></Style>',
      '<Style id="track"><LineStyle><color>ff2f3bff</color><width>4</width></LineStyle></Style>');

    kml.push("<Folder><name>停駐點</name>");
    T.stops.forEach(function (st) {
      var ans = st.questions.map(function (q, i) { var a = field.answers[st.id + ":" + i]; return "<p><b>" + x(q) + "</b><br>" + (a ? h(a) : "（未作答）") + "</p>"; }).join("");
      kml.push("<Placemark><name>" + st.no + " " + x(st.name) + '</name><styleUrl>#stop</styleUrl><description><![CDATA[' + ans + "]]></description><Point><coordinates>" + st.lon + "," + st.lat + ",0</coordinates></Point></Placemark>");
    });
    kml.push("</Folder><Folder><name>觀測紀錄</name>");
    list.forEach(function (o) {
      if (o.lat === null || o.lon === null) return;
      var desc = [];
      if (o.photo) { var fn = "files/" + o.id.replace(/[^a-z0-9-]/gi, "") + ".jpg"; files.push({ name: fn, data: b64bytes(o.photo) }); desc.push('<img src="' + fn + '" width="420"><br>'); }
      desc.push("<p>主題：" + x(FN.TOPICS[o.topic].name) + (o.stopId && FN.stopLabel ? "｜" + x(FN.stopLabel(o.stopId)) : "") + "</p>");
      if (o.strike !== null && o.dip !== null) desc.push("<p>位態（右手定則）：走向 " + o.strike + "°／傾角 " + o.dip + "°，傾向 " + ((o.strike + 90) % 360) + "°</p>");
      (o.extraAttitudes || []).forEach(function (a) { desc.push("<p>" + x(a.kind || "量測") + "：走向 " + a.strike + "°／傾角 " + a.dip + "°</p>"); });
      if (FN.formationText) desc.push("<p>手冊地質圖：" + x(FN.formationText(o.lat, o.lon)) + "</p>");
      desc.push("<p><b>觀察</b><br>" + h(o.notes) + "</p><p><b>判讀</b><br>" + h(o.initial) + "</p>");
      if (o.revision) desc.push("<p><b>修正</b><br>" + h(o.revision) + "</p>");
      kml.push("<Placemark><name>" + x(o.title || "觀測") + "</name><TimeStamp><when>" + x(o.createdAt) + "</when></TimeStamp><styleUrl>#obs</styleUrl><description><![CDATA[" + desc.join("") + "]]></description><Point><coordinates>" + o.lon + "," + o.lat + ",0</coordinates></Point></Placemark>");
    });
    kml.push("</Folder>");
    if (track && track.length > 1) {
      kml.push("<Folder><name>GPS 軌跡</name><Placemark><name>本次野外軌跡（" + track.length + " 點）</name><styleUrl>#track</styleUrl><LineString><tessellate>1</tessellate><coordinates>" +
        track.map(function (p) { return p.lon.toFixed(6) + "," + p.lat.toFixed(6) + ",0"; }).join(" ") + "</coordinates></LineString></Placemark></Folder>");
    }
    kml.push("</Document></kml>");
    files.unshift({ name: "doc.kml", data: new TextEncoder().encode(kml.join("\n")) });
    return zip(files);
  }
  return { build: build };
})();
