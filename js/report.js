/* FIELDNOTE PDF 野外報告
 * 完全在手機上產生：每一頁先畫在 canvas 上（用手機內建中文字型），再包成 A4 PDF。
 * 不需要網路，也不會把資料傳到任何伺服器。
 */
window.FN = window.FN || {};

FN.report = (function () {
  var W = 1240, H = 1754, M = 96;              /* A4，150 dpi；邊界約 16 mm */
  var FONT = '"Noto Sans TC", "PingFang TC", "Heiti TC", "Microsoft JhengHei", "Noto Sans CJK TC", sans-serif';
  var INK = "#17231e", MUTED = "#56655e", LINE = "#d3dad4", GREEN = "#22584a", YELLOW = "#e7b51e", RUST = "#a03a22";

  function Pager(meta) {
    this.pages = []; this.meta = meta; this.newPage();
  }
  Pager.prototype.newPage = function () {
    var c = document.createElement("canvas"); c.width = W; c.height = H;
    var x = c.getContext("2d"); x.fillStyle = "#fff"; x.fillRect(0, 0, W, H); x.textBaseline = "top";
    if (this.ctx) this.finish();
    this.canvas = c; this.ctx = x; this.y = M;
    if (this.pages.length || this.started) this.header();
    this.started = true;
  };
  Pager.prototype.header = function () {
    var x = this.ctx;
    x.font = "500 20px " + FONT; x.fillStyle = MUTED;
    x.fillText(this.meta.head, M, 44);
    x.textAlign = "right"; x.fillText(this.meta.group || "", W - M, 44); x.textAlign = "left";
    x.fillStyle = LINE; x.fillRect(M, 74, W - 2 * M, 2);
    this.y = M + 10;
  };
  Pager.prototype.finish = function () {
    var x = this.ctx, n = this.pages.length + 1;
    x.font = "400 20px " + FONT; x.fillStyle = MUTED; x.textAlign = "center";
    x.fillText("— " + n + " —", W / 2, H - 56); x.textAlign = "left";
    this.pages.push(this.canvas.toDataURL("image/jpeg", 0.82));
    this.ctx = null;
  };
  Pager.prototype.need = function (h) { if (this.y + h > H - M) this.newPage(); };

  /* 中文逐字換行 */
  function lines(ctx, text, maxW) {
    var out = [];
    String(text || "").split("\n").forEach(function (para) {
      if (!para) { out.push(""); return; }
      var cur = "";
      for (var i = 0; i < para.length; i++) {
        var ch = para[i], t = cur + ch;
        if (ctx.measureText(t).width > maxW && cur) {
          /* 英數字盡量不從中間斷開 */
          var m = cur.match(/([A-Za-z0-9.\-°/]+)$/);
          if (m && m[1].length < cur.length && /[A-Za-z0-9.\-°/]/.test(ch)) { out.push(cur.slice(0, -m[1].length)); cur = m[1] + ch; }
          else { out.push(cur); cur = ch; }
        } else cur = t;
      }
      out.push(cur);
    });
    return out;
  }
  Pager.prototype.text = function (t, o) {
    o = o || {};
    var x = this.ctx, size = o.size || 26, lh = Math.round(size * (o.lh || 1.6)), indent = o.indent || 0;
    x.font = (o.weight || 400) + " " + size + "px " + FONT;
    var ls = lines(x, t, W - 2 * M - indent);
    var self = this;
    ls.forEach(function (l) {
      self.need(lh); x = self.ctx; x.font = (o.weight || 400) + " " + size + "px " + FONT;
      x.fillStyle = o.color || INK; x.fillText(l, M + indent, self.y + (lh - size) / 2); self.y += lh;
    });
    this.y += o.after === undefined ? 8 : o.after;
  };
  Pager.prototype.gap = function (h) { this.y += h; };
  Pager.prototype.rule = function () { this.need(20); this.ctx.fillStyle = LINE; this.ctx.fillRect(M, this.y + 8, W - 2 * M, 2); this.y += 24; };
  Pager.prototype.h1 = function (t, badge) {
    this.need(110);
    var x = this.ctx;
    if (badge) {
      x.fillStyle = YELLOW; x.beginPath(); x.arc(M + 30, this.y + 30, 30, 0, Math.PI * 2); x.fill();
      x.fillStyle = "#2d2300"; x.font = "700 34px " + FONT; x.textAlign = "center"; x.fillText(badge, M + 30, this.y + 12); x.textAlign = "left";
    }
    x.fillStyle = INK; x.font = "700 40px " + FONT; x.fillText(t, M + (badge ? 78 : 0), this.y + 8);
    this.y += 80;
  };
  Pager.prototype.h2 = function (t) {
    this.need(80); var x = this.ctx;
    x.fillStyle = GREEN; x.fillRect(M, this.y + 6, 8, 34);
    x.fillStyle = INK; x.font = "700 30px " + FONT; x.fillText(t, M + 22, this.y + 8); this.y += 58;
  };
  Pager.prototype.kv = function (pairs) {
    var self = this;
    pairs.forEach(function (p) {
      if (!p[1] && p[1] !== 0) return;
      self.need(40); var x = self.ctx;
      x.font = "500 22px " + FONT; x.fillStyle = MUTED; x.fillText(p[0], M, self.y + 6);
      self.text(String(p[1]), { size: 24, indent: 200, after: 2, lh: 1.5 });
      self.y -= 0;
    });
    this.y += 6;
  };
  Pager.prototype.box = function (label, body, color) {
    this.need(90);
    var x = this.ctx, top = this.y;
    x.font = "700 22px " + FONT; x.fillStyle = color || GREEN; x.fillText(label, M + 20, this.y + 12); this.y += 46;
    var startPage = this.pages.length;
    this.text(body || "（未填寫）", { size: 25, indent: 20, color: body ? INK : MUTED, after: 14 });
    if (this.pages.length === startPage) { var c = this.ctx; c.fillStyle = color || GREEN; c.fillRect(M, top + 8, 5, this.y - top - 16); }
  };
  Pager.prototype.image = function (img, strokes, maxH) {
    var maxW = W - 2 * M, k = Math.min(maxW / img.width, (maxH || 720) / img.height), w = img.width * k, h = img.height * k;
    this.need(h + 20);
    var x = this.ctx, ox = M, oy = this.y;
    x.drawImage(img, ox, oy, w, h);
    if (strokes && strokes.length) {
      x.strokeStyle = "#ff3b2f"; x.lineWidth = 5; x.lineCap = "round"; x.lineJoin = "round";
      strokes.forEach(function (s) { x.beginPath(); s.forEach(function (p, i) { var px = ox + p.x * w, py = oy + p.y * h; if (i) x.lineTo(px, py); else x.moveTo(px, py); }); x.stroke(); });
    }
    x.strokeStyle = LINE; x.lineWidth = 2; x.strokeRect(ox, oy, w, h);
    this.y += h + 16;
  };

  function loadImg(src) { return new Promise(function (res) { var i = new Image(); i.onload = function () { res(i); }; i.onerror = function () { res(null); }; i.src = src; }); }

  /* ---- 最小 PDF 產生器：每頁一張 JPEG ---- */
  function pdf(jpegs) {
    var enc = new TextEncoder(), parts = [], offs = [], pos = 0;
    function add(x) { var b = typeof x === "string" ? enc.encode(x) : x; parts.push(b); pos += b.length; }
    function obj(n, body) { offs[n] = pos; add(n + " 0 obj\n"); body(); add("\nendobj\n"); }
    var PW = 595.28, PH = 841.89, n = jpegs.length, kids = [];
    for (var i = 0; i < n; i++) kids.push((3 + i * 3) + " 0 R");
    add("%PDF-1.4\n%âãÏÓ\n");
    obj(1, function () { add("<< /Type /Catalog /Pages 2 0 R >>"); });
    obj(2, function () { add("<< /Type /Pages /Count " + n + " /Kids [" + kids.join(" ") + "] >>"); });
    jpegs.forEach(function (d, i) {
      var bin = atob(d.split(",")[1]), u = new Uint8Array(bin.length); for (var k = 0; k < bin.length; k++) u[k] = bin.charCodeAt(k);
      var pg = 3 + i * 3, ct = pg + 1, im = pg + 2, cs = "q " + PW + " 0 0 " + PH + " 0 0 cm /Im0 Do Q";
      obj(pg, function () { add("<< /Type /Page /Parent 2 0 R /MediaBox [0 0 " + PW + " " + PH + "] /Resources << /XObject << /Im0 " + im + " 0 R >> >> /Contents " + ct + " 0 R >>"); });
      obj(ct, function () { add("<< /Length " + cs.length + " >>\nstream\n" + cs + "\nendstream"); });
      obj(im, function () { add("<< /Type /XObject /Subtype /Image /Width " + W + " /Height " + H + " /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length " + u.length + " >>\nstream\n"); add(u); add("\nendstream"); });
    });
    var total = 3 + n * 3, xref = pos;
    add("xref\n0 " + total + "\n0000000000 65535 f \n");
    for (var j = 1; j < total; j++) add(String(offs[j]).padStart(10, "0") + " 00000 n \n");
    add("trailer\n<< /Size " + total + " /Root 1 0 R >>\nstartxref\n" + xref + "\n%%EOF");
    return new Blob(parts, { type: "application/pdf" });
  }

  /* 路線圖：手冊航照＋停駐點＋觀測點＋GPS 軌跡 */
  async function mapPage(P, list, track) {
    var L = FN.MAP_LAYERS.find(function (l) { return l.key === "street"; }) || FN.MAP_LAYERS[0], img = await loadImg(L.src);
    if (!img) return;
    P.h2("路線、停駐點與觀測位置");
    var maxW = W - 2 * M, maxH = H - P.y - M - 90, k = Math.min(maxW / L.w, maxH / L.h), w = L.w * k, h = L.h * k;
    P.need(h + 60);
    var x = P.ctx, ox = M + (maxW - w) / 2, oy = P.y;
    x.drawImage(img, ox, oy, w, h);
    var px = function (E, N) { return [ox + (E - L.west) / (L.east - L.west) * w, oy + (L.north - N) / (L.north - L.south) * h]; };
    if (track && track.length > 1) {
      x.strokeStyle = "#1f6fff"; x.lineWidth = 6; x.lineJoin = "round"; x.beginPath();
      track.forEach(function (t, i) { var q = px(t.E, t.N); if (i) x.lineTo(q[0], q[1]); else x.moveTo(q[0], q[1]); }); x.stroke();
    }
    list.forEach(function (o) {
      if (o.lat === null || o.lon === null) return; var t = FN.geo.toTWD97(o.lat, o.lon), q = px(t.E, t.N);
      x.fillStyle = RUST; x.strokeStyle = "#fff"; x.lineWidth = 4; x.beginPath(); x.arc(q[0], q[1], 11, 0, Math.PI * 2); x.fill(); x.stroke();
    });
    FN.TRIP.stops.forEach(function (s) {
      var q = px(s.E, s.N);
      x.fillStyle = YELLOW; x.strokeStyle = "#fff"; x.lineWidth = 4; x.beginPath(); x.arc(q[0], q[1], 22, 0, Math.PI * 2); x.fill(); x.stroke();
      x.fillStyle = "#2d2300"; x.font = "700 26px " + FONT; x.textAlign = "center"; x.fillText(s.no, q[0], q[1] - 13); x.textAlign = "left";
    });
    x.strokeStyle = LINE; x.lineWidth = 2; x.strokeRect(ox, oy, w, h);
    P.y = oy + h + 16;
    P.text("底圖：" + L.name + "（課程手冊第 5 頁）。黃色數字為停駐點，紅點為觀測位置" + (track && track.length > 1 ? "，藍線為 GPS 軌跡（" + track.length + " 點）" : "") + "。", { size: 20, color: MUTED });
  }

  async function observation(P, o) {
    var t = FN.TOPICS[o.topic];
    P.need(200);
    P.text(o.title || "未命名觀測", { size: 30, weight: 700, after: 4 });
    P.text(t.name + "・" + new Date(o.createdAt).toLocaleString("zh-TW"), { size: 21, color: MUTED, after: 10 });
    if (o.photo) { var img = await loadImg(o.photo); if (img) P.image(img, o.strokes, 700); }
    var pairs = [];
    if (o.lat !== null && o.lon !== null) {
      var tw = FN.geo.toTWD97(o.lat, o.lon);
      pairs.push(["位置 TWD97", "E " + Math.round(tw.E) + "，N " + Math.round(tw.N)]);
      pairs.push(["手冊地質圖", FN.formationText ? FN.formationText(o.lat, o.lon) : ""]);
    }
    if (o.strike !== null && o.dip !== null) pairs.push(["位態", "走向 " + o.strike + "°／傾角 " + o.dip + "°" + (o.dip && o.dip !== 90 ? "，傾向 " + ((o.strike + 90) % 360) + "°（右手定則）" : "")]);
    (o.extraAttitudes || []).forEach(function (a, i) { if (a.strike !== null && a.dip !== null) pairs.push(["量測 " + (i + 2) + "（" + (a.kind || "其他") + "）", "走向 " + a.strike + "°／傾角 " + a.dip + "°"]); });
    if (o.strike !== null) pairs.push(["北向基準／工具", ({ "true": "真北", magnetic: "磁北", unknown: "尚未確認" }[o.north] || "") + "・" + (o.instrument || "")]);
    if (o.features.length) pairs.push(["觀察特徵", o.features.join("、")]);
    P.kv(pairs);
    P.box("我看見的現象", o.notes);
    P.box("我的初步判讀", o.initial, "#8a6500");
    if (o.ai) P.box("AI 建議（尚待人工驗證）", o.ai.length > 900 ? o.ai.slice(0, 900) + "…" : o.ai, MUTED);
    if (o.revision) P.box("比對與修正理由", o.revision, RUST);
    P.rule();
  }

  /* 產生報告 */
  async function build(list, field, opts) {
    opts = opts || {};
    try { if (document.fonts && document.fonts.ready) await document.fonts.ready; } catch (e) {}
    var T = FN.TRIP, meta = { head: T.course + "　" + T.title + "　野外報告", group: field.group };
    var P = new Pager(meta);
    /* 封面 */
    var x = P.ctx;
    x.fillStyle = GREEN; x.fillRect(0, 0, W, 520);
    x.strokeStyle = "rgba(255,255,255,.18)"; x.lineWidth = 2;
    for (var i = 0; i < 9; i++) { var r = 80 + i * 70; x.beginPath(); x.ellipse(W - 160, 60, r * 1.5, r, 0, 0, Math.PI * 2); x.stroke(); }
    x.fillStyle = YELLOW; x.font = "600 30px " + FONT; x.fillText("FIELDNOTE 野外報告", M, 120);
    x.fillStyle = "#fff"; x.font = "700 64px " + FONT; x.fillText(T.title, M, 190);
    x.font = "400 32px " + FONT; x.fillText(T.course + "・" + T.date, M, 290);
    x.fillText(T.area, M, 340);
    P.y = 600;
    P.kv([["組別", field.group || "（未填）"], ["組員", field.members || "（未填）"], ["授課教師", T.teacher], ["產生時間", new Date().toLocaleString("zh-TW")]]);
    P.gap(10); P.h2("作答與紀錄概況");
    T.stops.forEach(function (s) {
      var a = s.questions.filter(function (q, k) { return (field.answers[s.id + ":" + k] || "").trim(); }).length, n = list.filter(function (o) { return o.stopId === s.id; }).length;
      P.text("停駐點 " + s.no + "　" + s.name + "：問題 " + a + "/" + s.questions.length + "、觀測 " + n + " 筆", { size: 25, after: 2 });
    });
    var other = list.filter(function (o) { return !o.stopId; });
    if (other.length) P.text("其他觀測：" + other.length + " 筆", { size: 25, after: 2 });
    P.gap(20);
    P.text("本報告由學生在自己的裝置上產生，內容為小組野外紀錄；AI 建議僅供參考，需經教師複核。", { size: 20, color: MUTED });

    if (opts.map !== false) { P.newPage(); await mapPage(P, list, field.track); }

    for (var si = 0; si < T.stops.length; si++) {
      var s = T.stops[si], obs = list.filter(function (o) { return o.stopId === s.id; });
      P.newPage();
      P.h1(s.name, String(s.no));
      var u = FN.geo.unitAt(s.E, s.N);
      P.text("手冊第 " + s.pages + " 頁・TWD97 E " + Math.round(s.E) + "，N " + Math.round(s.N) + "・手冊地質圖：" + u.unit.name, { size: 21, color: MUTED, after: 18 });
      P.h2("通關問題");
      s.questions.forEach(function (q, k) {
        P.text((k + 1) + ". " + q, { size: 25, weight: 700, after: 6 });
        var ans = (field.answers[s.id + ":" + k] || "").trim();
        P.text(ans || "（未作答）", { size: 25, indent: 34, color: ans ? INK : MUTED, after: 18 });
      });
      if (obs.length) { P.gap(10); P.h2("觀測紀錄（" + obs.length + " 筆）"); for (var oi = 0; oi < obs.length; oi++) await observation(P, obs[oi]); }
    }
    if (other.length) { P.newPage(); P.h2("其他觀測"); for (var j = 0; j < other.length; j++) await observation(P, other[j]); }
    P.finish();
    return { blob: pdf(P.pages), pages: P.pages.length };
  }

  return { build: build };
})();
