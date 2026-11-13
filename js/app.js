/* FIELDNOTE 主程式：畫面、操作與流程 */
(function () {
  "use strict";
  var $ = function (s, el) { return (el || document).querySelector(s); };

  /* ---------- 圖示 ---------- */
  var P = {
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/>',
    notes: '<path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"/><path d="M2 6h4M2 10h4M2 14h4M2 18h4"/><path d="M21.4 5.6a2.1 2.1 0 1 0-3-3l-5 5a2 2 0 0 0-.5.9l-.8 2.8a.5.5 0 0 0 .6.6l2.9-.8a2 2 0 0 0 .8-.5z"/>',
    compass: '<circle cx="12" cy="12" r="10"/><path d="m16.2 7.8-1.8 5.4a2 2 0 0 1-1.3 1.3l-5.3 1.7 1.8-5.4a2 2 0 0 1 1.3-1.3z"/>',
    book: '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    chev: '<path d="m9 18 6-6-6-6"/>',
    back: '<path d="m15 18-6-6 6-6"/>',
    camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"/><circle cx="12" cy="13" r="3"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>',
    pin: '<path d="M20 10c0 5-5.5 10.2-7.4 11.8a1 1 0 0 1-1.2 0C9.5 20.2 4 15 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    trash: '<path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>',
    undo: '<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>',
    pen: '<path d="M12 20h9"/><path d="M16.4 3.6a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4z"/>',
    save: '<path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7M7 3v4a1 1 0 0 0 1 1h7"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5M12 15V3"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5M12 3v12"/>',
    more: '<circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    ext: '<path d="M7 7h10v10M7 17 17 7"/>',
    spark: '<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/>',
    alert: '<path d="m21.7 18-8-14a2 2 0 0 0-3.4 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3"/><path d="M12 9v4M12 17h.01"/>',
    lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    share: '<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"/>',
    table: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/>',
    doc: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
    archive: '<rect x="2" y="3" width="20" height="5" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8M10 12h4"/>'
  };
  function ic(name, cls) { return '<svg class="' + (cls || "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + P[name] + "</svg>"; }
  function esc(s) { return String(s === null || s === undefined ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function pad3(n) { return String(Math.round(n)).padStart(3, "0"); }
  function dipDir(s) { return (Number(s) + 90) % 360; }
  function fmtDate(iso) { try { return new Date(iso).toLocaleDateString("zh-TW", { month: "numeric", day: "numeric" }); } catch (e) { return ""; } }
  function fmtDateTime(iso) { try { return new Date(iso).toLocaleString("zh-TW"); } catch (e) { return ""; } }

  /* ---------- 狀態 ---------- */
  var S = {
    view: "home", list: [], persistent: true, aiAvail: false,
    edit: null,
    filter: { q: "", topic: "all" },
    learn: { tab: "cards", q: "", topic: "all", en: false, quiz: { i: 0, picks: [], done: false }, rockQ: "", rockGroup: "all", ask: "", askConsent: false, answer: "", asking: false },
    lab: { strike: 30, dip: 40, yaw: -28, pitch: 33 },
    field: { group: "", members: "", answers: {}, track: [], recording: false },
    pos: null, locState: "off", locErr: "", stopId: null, clino: null,
    map: { layer: "aerial", cE: 0, cN: 0, mpp: 0 },
    userOverlays: [], ovOn: {}
  };
  var VIEWS = ["home", "field", "records", "lab", "learn", "about"];

  /* ---------- 提示與彈出視窗 ---------- */
  var toastTimer;
  function toast(msg) {
    var t = $("#toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.classList.remove("show"); }, 3200);
  }
  var sheetHandler = null;
  function openSheet(html, handler) {
    var root = $("#sheet-root");
    root.innerHTML = '<div class="sheet-backdrop" data-sheet="close"></div><div class="sheet" role="dialog" aria-modal="true"><div class="grab"></div>' + html + "</div>";
    sheetHandler = handler || null;
    requestAnimationFrame(function () { root.querySelector(".sheet-backdrop").classList.add("show"); root.querySelector(".sheet").classList.add("show"); });
    var f = root.querySelector("button, input, textarea"); if (f) setTimeout(function () { f.focus({ preventScroll: true }); }, 280);
  }
  function closeSheet() {
    var root = $("#sheet-root"), sh = root.querySelector(".sheet"), bd = root.querySelector(".sheet-backdrop");
    if (!sh) return;
    sh.classList.remove("show"); bd.classList.remove("show");
    setTimeout(function () { root.innerHTML = ""; }, 260); sheetHandler = null;
  }
  function confirmSheet(title, body, buttons) {
    return new Promise(function (resolve) {
      openSheet("<h2>" + esc(title) + '</h2><div class="sheet-body"><p class="muted">' + body + '</p></div><div class="actions">' +
        buttons.map(function (b) { return '<button class="btn block ' + (b.cls || "") + '" data-sheet="' + b.id + '">' + esc(b.label) + "</button>"; }).join("") + "</div>",
        function (id) { closeSheet(); resolve(id); });
    });
  }

  /* ---------- 共用畫面片段 ---------- */
  function swatch(topic, sm) { var t = FN.TOPICS[topic]; return '<span class="swatch sw-' + topic + (sm ? " sm" : "") + '" aria-hidden="true">' + t.code + "</span>"; }
  function srcLink(i) { var s = FN.SOURCES[i]; return '<a class="src" href="' + s.url + '" target="_blank" rel="noopener noreferrer">' + esc(s.name) + ic("ext") + "</a>"; }
  function rockSrc(k) { var s = FN.ROCK_SOURCES[k]; return '<a class="src" href="' + s.url + '" target="_blank" rel="noopener noreferrer">' + esc(s.name) + ic("ext") + "</a>"; }
  function statusOf(o) {
    if (o.revision) return '<span class="chip ok">已寫修正</span>';
    if (o.ai) return '<span class="chip ai">待比對 AI</span>';
    return '<span class="chip">獨立觀察</span>';
  }

  /* 等高線背景：工作台主視覺 */
  function contours() {
    var paths = "";
    for (var i = 0; i < 9; i++) {
      var r = 30 + i * 26, cx = 300, cy = 40;
      paths += '<path d="M' + (cx - r * 1.6) + " " + cy + " C " + (cx - r * 1.4) + " " + (cy + r * 1.1) + ", " + (cx + r * .9) + " " + (cy + r * 1.25) + ", " + (cx + r * 1.5) + " " + (cy + r * .2) + '" />';
    }
    return '<svg class="contours" viewBox="0 0 360 240" preserveAspectRatio="xMaxYMin slice" fill="none" stroke="#fff" stroke-width="1.2" aria-hidden="true">' + paths + "</svg>";
  }

  /* ---------- 3D 位態模型 ---------- */
  function planeSVG(strike, dip, yaw, pitch, opts) {
    opts = opts || {};
    var rad = function (d) { return d * Math.PI / 180; };
    var sc = opts.compact ? 70 : 96, v = rad(strike), y = rad(dip), a = rad(yaw), w = rad(pitch);
    var k = [Math.sin(v), Math.cos(v), 0], x = [Math.cos(v) * Math.cos(y), -Math.sin(v) * Math.cos(y), -Math.sin(y)];
    var D = function (C) { return [250 + (C[0] * Math.cos(a) - C[1] * Math.sin(a)) * sc, 175 - (C[0] * Math.sin(a) + C[1] * Math.cos(a)) * Math.sin(w) * sc - C[2] * Math.cos(w) * sc]; };
    var T = function (p, q) { return k.map(function (Q, i) { return p * Q + q * x[i]; }); };
    var L = function (A, B) { var p = D(A), q = D(B); return 'x1="' + p[0].toFixed(1) + '" y1="' + p[1].toFixed(1) + '" x2="' + q[0].toFixed(1) + '" y2="' + q[1].toFixed(1) + '"'; };
    var pts = function (arr) { return arr.map(function (c) { return D(c).map(function (n) { return n.toFixed(1); }).join(","); }).join(" "); };
    var plane = [[-1.28, -.9], [1.28, -.9], [1.28, .9], [-1.28, .9]].map(function (c) { return T(c[0], c[1]); });
    var grid = "";
    [-1.5, -1, -.5, 0, .5, 1, 1.5].forEach(function (c) { grid += "<line " + L([c, -1.7, 0], [c, 1.7, 0]) + "/><line " + L([-1.7, c, 0], [1.7, c, 0]) + "/>"; });
    var beds = "";
    [-.6, -.3, .3, .6].forEach(function (c) { beds += "<line " + L(T(-1.28, c), T(1.28, c)) + ' stroke="#9b7a2c" stroke-width="1"/>'; });
    var n = D([0, 2.1, 0]), e = D([2, 0, 0]), o = D([0, 0, 0]);
    var id = opts.compact ? "arrS" : "arrL";
    return '<svg class="plane-svg" ' + (opts.attrs || "") + ' viewBox="0 ' + (opts.compact ? 40 : 0) + " 500 " + (opts.compact ? 280 : 345) + '" role="img" aria-label="三維平面，走向' + strike + "度，傾角" + dip + '度">' +
      '<defs><marker id="' + id + '" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" fill="#a03a22"/></marker></defs>' +
      '<polygon points="' + pts([[-1.7, -1.7, 0], [1.7, -1.7, 0], [1.7, 1.7, 0], [-1.7, 1.7, 0]]) + '" fill="#e3e9e3"/>' +
      '<g stroke="#c9d3ca" stroke-width=".8">' + grid + "</g>" +
      "<line " + L([0, 0, 0], [0, 1.9, 0]) + ' stroke="#56655e" stroke-dasharray="4 4"/>' +
      '<text x="' + n[0] + '" y="' + n[1] + '" text-anchor="middle" fill="#17231e" font-size="17" font-weight="700" font-family="Barlow Condensed, sans-serif">N</text>' +
      '<text x="' + e[0] + '" y="' + e[1] + '" text-anchor="middle" fill="#56655e" font-size="15" font-family="Barlow Condensed, sans-serif">E</text>' +
      '<polygon points="' + pts(plane) + '" fill="#e7b51e" fill-opacity=".78" stroke="#8a6a10" stroke-width="1.6"/>' + beds +
      "<line " + L(T(-1.45, 0), T(1.45, 0)) + ' stroke="#22584a" stroke-width="4" stroke-linecap="round"/>' +
      "<line " + L([0, 0, 0], T(0, 1.16)) + ' stroke="#a03a22" stroke-width="3.5" marker-end="url(#' + id + ')"/>' +
      '<circle cx="' + o[0] + '" cy="' + o[1] + '" r="4.5" fill="#fff" stroke="#17231e"/>' +
      (opts.compact ? "" : '<g font-size="13" font-family="Noto Sans TC, sans-serif"><rect x="16" y="318" width="14" height="4" rx="2" fill="#22584a"/><text x="36" y="324" fill="#17231e">走向 Strike</text><rect x="150" y="318" width="14" height="4" rx="2" fill="#a03a22"/><text x="170" y="324" fill="#17231e">下傾方向 Dip</text><text x="484" y="324" fill="#8a978f" text-anchor="end">左右拖曳可旋轉</text></g>') +
      "</svg>";
  }

  /* ========== 畫面：工作台 ========== */
  function viewHome() {
    var n = S.list.length, rev = S.list.filter(function (o) { return o.revision; }).length, ph = S.list.filter(function (o) { return o.photo; }).length;
    var recent = S.list.slice(0, 3);
    return homeFieldCard() + '<section class="hero">' + contours() +
      "<h1>從觀察開始，<br>建立你的地質判讀。</h1><p>先記下看見什麼，再說明你怎麼解釋。照片、位態與判讀的改變，都收在同一份筆記。</p>" +
      '<button class="btn" data-act="new" data-topic="structure">' + ic("plus") + "新增觀測</button>" +
      '<div class="stats"><div><b>' + n + "</b><span>觀測筆記</span></div><div><b>" + ph + "</b><span>附照片</span></div><div><b>" + rev + "</b><span>已寫修正</span></div></div></section>" +
      '<div class="section-head"><h2>這次想觀察什麼？</h2></div><div class="topic-list">' +
      Object.keys(FN.TOPICS).map(function (k) {
        var t = FN.TOPICS[k];
        return '<button class="topic-row" data-act="new" data-topic="' + k + '">' + swatch(k) + '<span class="txt"><strong>' + t.name + "</strong><span>" + t.intro + "</span></span>" + ic("chev") + "</button>";
      }).join("") + "</div>" +
      '<div class="section-head"><h2>把數字看成立體</h2></div>' +
      '<button class="card lab-teaser" data-act="go" data-view="lab"><div><strong>位態實驗室</strong><p class="small muted">拖動走向與傾角，看平面怎麼轉。</p>' +
      '<div class="read"><div><span>走向</span><b>030°</b></div><div><span>傾角</span><b>40°</b></div><div><span>傾向</span><b>120°</b></div></div></div>' +
      planeSVG(30, 40, -28, 33, { compact: true }).replace('class="plane-svg"', 'class="mini"') + "</button>" +
      '<div class="section-head"><h2>最近的觀測</h2>' + (n ? '<button class="link-btn" data-act="go" data-view="records">全部 ' + n + " 筆" + ic("chev") + "</button>" : "") + "</div>" +
      (recent.length ? recent.map(recordRow).join("") :
        '<div class="empty">' + ic("notes") + "<h3>第一份野外筆記，從一個觀測點開始。</h3><p>新增後，照片、位態與判讀歷程會整理在同一處。</p>" +
        '<button class="btn primary" data-act="new" data-topic="rock">' + ic("plus") + "建立第一筆</button></div>") +
      '<p class="safety">' + ic("alert") + "<span>野外安全優先：本工具不提供即時災害預警或坡面安全判定，請依教師與現地管理單位指示行動。</span></p>";
  }

  function recordRow(o) {
    var thumb = o.photo ? '<img src="' + o.photo + '" alt="">' : swatch(o.topic);
    var att = o.strike !== null && o.dip !== null ? '<span class="num">' + pad3(o.strike) + "/" + o.dip + "°</span>" : "";
    return '<button class="record" data-act="open" data-id="' + o.id + '"><span class="thumb">' + thumb + '</span><span class="body"><h3>' + esc(o.title || "未命名觀測") + "</h3>" +
      '<span class="meta"><span class="chip">' + FN.TOPICS[o.topic].name + "</span>" + statusOf(o) + att + '<span class="small muted">' + fmtDate(o.createdAt) + "</span></span></span>" + ic("chev") + "</button>";
  }

  /* ========== 畫面：觀測筆記 ========== */
  function viewRecords() {
    var f = S.filter, q = f.q.toLowerCase();
    var list = S.list.filter(function (o) { return (f.topic === "all" || o.topic === f.topic) && (o.title + " " + o.notes + " " + o.initial).toLowerCase().indexOf(q) >= 0; });
    return '<div class="page-title title-row"><div><h1>觀測筆記</h1><p>保留觀察證據，也保留判讀改變的理由。</p></div>' +
      '<button class="btn sm" data-act="data-menu">' + ic("archive") + "備份</button></div>" +
      '<label class="search">' + ic("search") + '<input class="input" type="search" data-filter="q" placeholder="搜尋名稱、觀察或判讀" value="' + esc(f.q) + '" aria-label="搜尋觀測"></label>' +
      '<div class="filter-row" role="group" aria-label="篩選主題">' + [["all", "全部"]].concat(Object.keys(FN.TOPICS).map(function (k) { return [k, FN.TOPICS[k].name]; })).map(function (p) {
        return '<button class="choice' + (f.topic === p[0] ? " on" : "") + '" data-act="filter-topic" data-v="' + p[0] + '">' + p[1] + "</button>";
      }).join("") + "</div>" +
      '<div id="record-list" style="margin-top:12px">' + recordListHTML(list) + "</div>";
  }
  function recordListHTML(list) {
    if (list.length) return list.map(recordRow).join("");
    if (S.list.length) return '<div class="empty">' + ic("search") + "<h3>沒有符合的筆記</h3><p>換個關鍵字，或改選「全部」主題。</p></div>";
    return '<div class="empty">' + ic("notes") + "<h3>還沒有觀測紀錄</h3><p>從構造、岩性或坡地災害開始，也可以匯入先前的 JSON 備份。</p>" +
      '<div class="btn-row" style="justify-content:center"><button class="btn primary" data-act="new" data-topic="rock">' + ic("plus") + '新增觀測</button><button class="btn" data-act="import">' + ic("upload") + "匯入備份</button></div></div>";
  }

  /* ========== 畫面：位態實驗室 ========== */
  function viewLab() {
    var L = S.lab, dd = L.dip === 0 ? "—" : pad3(dipDir(L.strike));
    return '<div class="page-title"><h1>位態實驗室</h1><p>改變角度，連結數字、方向與三維平面。</p></div>' +
      '<div class="dial" aria-live="polite"><div><span>走向 Strike</span><b class="num" id="lab-s">' + pad3(L.strike) + '<sup>°</sup></b></div><div><span>傾角 Dip</span><b class="num" id="lab-d">' + L.dip + '<sup>°</sup></b></div><div class="dd"><span>傾向 Dip dir.</span><b class="num" id="lab-dd">' + dd + (L.dip === 0 ? "" : "<sup>°</sup>") + "</b></div></div>" +
      '<div class="card plane-card" style="margin-top:14px"><div id="lab-plane">' + planeSVG(L.strike, L.dip, L.yaw, L.pitch, { attrs: 'data-drag="lab"' }) + "</div>" +
      '<div class="seg" role="group" aria-label="視角">' + [["oblique", "立體"], ["top", "俯視"], ["side", "沿走向看剖面"]].map(function (p) {
        return '<button data-act="lab-view" data-v="' + p[0] + '">' + p[1] + "</button>";
      }).join("") + "</div></div>" +
      '<div class="card" style="margin-top:14px">' +
      sliderField("strike", "走向（右手定則）", L.strike, 0, 359, "") + sliderField("dip", "傾角", L.dip, 0, 90, "dip") +
      '<p class="small muted" id="lab-note" style="margin-top:12px">' + labNote() + "</p>" +
      '<button class="btn primary block" style="margin-top:16px" data-act="lab-record">' + ic("plus") + "用這組位態建立觀測</button>" + srcLink(0) + "</div>";
  }
  function sliderField(k, label, v, min, max, cls) {
    return '<div class="slider-field"><div class="top"><label for="sl-' + k + '">' + label + '</label><span class="stepper"><button data-act="lab-step" data-k="' + k + '" data-d="-1" aria-label="減 1 度">−</button>' +
      '<input class="num" type="number" inputmode="numeric" min="' + min + '" max="' + max + '" value="' + v + '" data-lab="' + k + '" aria-label="' + label + '數值"><button data-act="lab-step" data-k="' + k + '" data-d="1" aria-label="加 1 度">+</button></span></div>' +
      '<input id="sl-' + k + '" class="' + cls + '" type="range" min="' + min + '" max="' + max + '" value="' + v + '" data-lab="' + k + '"></div>';
  }
  function labNote() {
    var L = S.lab;
    if (L.dip === 0) return "水平面沒有唯一的走向與傾向。";
    if (L.dip === 90) return "垂直平面：兩側傾向等價，此處依右手定則顯示。";
    return "右手定則：沿走向方向看，平面向右下傾。傾向 =（走向 + 90°）mod 360°。";
  }
  function updateLab(full) {
    var L = S.lab;
    $("#lab-plane").innerHTML = planeSVG(L.strike, L.dip, L.yaw, L.pitch, { attrs: 'data-drag="lab"' });
    if (!full) return;
    $("#lab-s").innerHTML = pad3(L.strike) + "<sup>°</sup>";
    $("#lab-d").innerHTML = L.dip + "<sup>°</sup>";
    $("#lab-dd").innerHTML = L.dip === 0 ? "—" : pad3(dipDir(L.strike)) + "<sup>°</sup>";
    $("#lab-note").textContent = labNote();
    document.querySelectorAll("[data-lab]").forEach(function (el) { if (document.activeElement !== el) el.value = L[el.dataset.lab]; });
  }

  /* ========== 畫面：學習 ========== */
  function viewLearn() {
    var L = S.learn;
    var tabs = [["cards", "學習卡"], ["quiz", "測驗"], ["rocks", "岩性卡"], ["lab", "位態 3D"]].concat(S.aiAvail ? [["ask", "問助手"]] : []);
    var body = L.tab === "quiz" ? learnQuiz() : L.tab === "rocks" ? learnRocks() : L.tab === "ask" ? learnAsk() : learnCards();
    return '<div class="page-title"><h1>學習卡與測驗</h1><p>回到定義與證據，讓每一次判讀更有把握。</p></div>' +
      '<div class="seg full" role="tablist" style="margin-bottom:16px">' + tabs.map(function (t) {
        return '<button role="tab" aria-selected="' + (L.tab === t[0]) + '" class="' + (L.tab === t[0] ? "on" : "") + '" data-act="learn-tab" data-v="' + t[0] + '">' + t[1] + "</button>";
      }).join("") + "</div>" + body;
  }
  function learnCards() {
    var L = S.learn;
    return '<label class="search">' + ic("search") + '<input class="input" type="search" data-learn="q" placeholder="查詢走向、岩性、落石…" value="' + esc(L.q) + '" aria-label="搜尋術語"></label>' +
      '<div class="filter-row">' + [["all", "全部"]].concat(Object.keys(FN.TOPICS).map(function (k) { return [k, FN.TOPICS[k].name]; })).map(function (p) {
        return '<button class="choice' + (L.topic === p[0] ? " on" : "") + '" data-act="learn-topic" data-v="' + p[0] + '">' + p[1] + "</button>";
      }).join("") + '<button class="choice" data-act="learn-lang" style="margin-left:auto">' + (L.en ? "中文" : "English") + "</button></div>" +
      '<div id="lesson-list" style="margin-top:12px">' + lessonListHTML() + "</div>";
  }
  function lessonListHTML() {
    var L = S.learn, q = L.q.toLowerCase();
    var list = FN.LESSONS.filter(function (c) { return (L.topic === "all" || c.topic === L.topic) && (c.zh + c.en + c.body + c.english).toLowerCase().indexOf(q) >= 0; });
    return list.length ? list.map(function (c) {
      return '<article class="lesson"><div class="head">' + swatch(c.topic, true) + "<h3>" + (L.en ? c.en : c.zh) + "<small>" + (L.en ? c.zh : c.en) + "</small></h3></div><p>" + (L.en ? c.english : c.body) + "</p>" + srcLink(c.source) + "</article>";
    }).join("") : '<div class="empty"><h3>沒有符合的學習卡</h3><p>換個關鍵字試試。</p></div>';
  }
  function learnQuiz() {
    var Q = S.learn.quiz, total = FN.QUIZ.length;
    var bar = '<div class="progress">' + FN.QUIZ.map(function (q, i) {
      var p = Q.picks[i], c = p === undefined ? (i === Q.i && !Q.done ? "on" : "") : (p === q.correct ? "right" : "wrong");
      return '<i class="' + c + '"></i>';
    }).join("") + "</div>";
    if (Q.done) {
      var score = Q.picks.filter(function (p, i) { return p === FN.QUIZ[i].correct; }).length;
      return '<div class="card quiz">' + bar + '<div class="score"><b class="num">' + score + "/" + total + '</b><p class="muted" style="margin-top:6px">' + (score === total ? "全部答對，觀念很清楚。" : "回頭看看答錯的題目說明，再試一次。") + "</p></div>" +
        FN.QUIZ.map(function (q, i) { return '<div class="callout ' + (Q.picks[i] === q.correct ? "green" : "warn") + '" style="margin-top:10px"><b>' + (i + 1) + ". " + esc(q.q) + "</b>" + esc(q.why) + "</div>"; }).join("") +
        '<button class="btn primary block" style="margin-top:16px" data-act="quiz-reset">重新練習</button><p class="small muted" style="margin-top:10px;text-align:center">練習用，不計成績。</p></div>';
    }
    var q = FN.QUIZ[Q.i], picked = Q.picks[Q.i];
    return '<div class="card quiz">' + bar + '<p class="small muted">第 ' + (Q.i + 1) + " 題，共 " + total + " 題</p><h3>" + esc(q.q) + '</h3><div class="opts">' +
      q.options.map(function (op, j) {
        var cls = picked === undefined ? "" : j === q.correct ? "right" : j === picked ? "wrong" : "";
        return '<button class="opt ' + cls + '" data-act="quiz-pick" data-v="' + j + '"' + (picked !== undefined ? " disabled" : "") + '><span class="k">' + "ABC"[j] + "</span>" + esc(op) + "</button>";
      }).join("") + "</div>" +
      (picked !== undefined ? '<div class="callout ' + (picked === q.correct ? "green" : "warn") + ' why"><b>' + (picked === q.correct ? "答對了" : "再想一想") + "</b>" + esc(q.why) + '</div><button class="btn primary block" style="margin-top:14px" data-act="quiz-next">' + (Q.i + 1 < total ? "下一題" : "看結果") + "</button>" : "") + "</div>";
  }
  function learnRocks() {
    var L = S.learn, q = L.rockQ.toLowerCase();
    var list = FN.ROCKS.filter(function (r) { return (L.rockGroup === "all" || r.group === L.rockGroup) && (r.zh + " " + r.en).toLowerCase().indexOf(q) >= 0; });
    return '<div class="callout yellow"><b>14 種臺灣教學候選</b>依臺灣資料與基礎岩石學整理，尚待授課教師審核。「辨識提醒」是觀察建議，不是確診規則。</div>' +
      '<label class="search" style="display:block;margin-top:14px">' + ic("search") + '<input class="input" type="search" data-learn="rockQ" placeholder="例如：板岩、granite" value="' + esc(L.rockQ) + '" aria-label="搜尋岩名"></label>' +
      '<div class="filter-row">' + ["all", "沉積岩", "變質岩", "火成岩"].map(function (g) { return '<button class="choice' + (L.rockGroup === g ? " on" : "") + '" data-act="rock-group" data-v="' + g + '">' + (g === "all" ? "全部" : g) + "</button>"; }).join("") + "</div>" +
      '<div class="rock-grid" id="rock-list" style="margin-top:12px">' + rockListHTML(list) + "</div>" +
      '<details class="more"><summary>' + ic("chev") + "參照資料與使用限制（APA 書目）</summary>" +
      '<p class="small muted">USGS 詞彙提供定義背景，不是手標本的充分鑑定標準。臺灣地區案例不可直接外推至所有岩石；沒有載明日期的資料使用「無日期／n.d.」。</p>' +
      Object.keys(FN.ROCK_SOURCES).map(function (k) { var s = FN.ROCK_SOURCES[k]; return '<p class="apa">' + esc(s.apa) + ' <a href="' + s.url + '" target="_blank" rel="noopener noreferrer">' + esc(s.url) + "</a></p>"; }).join("") + "</details>";
  }
  function rockListHTML(list) {
    return list.length ? list.map(function (r) {
      return '<button class="rock-item" data-act="rock-detail" data-id="' + r.id + '"><span class="swatch sm grp-' + r.group + '">' + r.en.slice(0, 2) + '</span><span class="txt"><strong>' + r.zh + ' <small class="muted">' + r.en + "</small></strong><span>" + r.clues + "</span></span>" + ic("chev") + "</button>";
    }).join("") : '<div class="empty"><h3>沒有符合的岩性卡</h3></div>';
  }
  function rockDetail(id) {
    var r = FN.ROCKS.find(function (x) { return x.id === id; });
    openSheet('<span class="chip">' + r.group + "</span><h2 style=\"margin-top:8px\">" + r.zh + ' <small class="muted" style="font-weight:500">' + r.en + '</small></h2><div class="sheet-body">' +
      "<p>" + r.clues + '</p><div class="callout warn" style="margin-top:14px"><b>辨識提醒</b>' + r.limit + '</div><div class="callout green" style="margin-top:10px"><b>再觀察</b>' + r.next + "</div>" +
      (r.context ? '<p class="small muted" style="margin-top:12px">' + r.context + "</p>" : "") +
      '<div style="display:flex;flex-direction:column;margin-top:8px">' + r.sources.map(rockSrc).join("") + '</div></div><div class="actions"><button class="btn block" data-sheet="close">關閉</button></div>');
  }
  function learnAsk() {
    var L = S.learn;
    return '<div class="card"><h2 style="font-size:1.1rem">向課程助手提問</h2><p class="small muted" style="margin-top:4px">依據本版教學卡回答；超出內容時會標示限制，不是整份課程教材檢索。</p>' +
      '<label class="field"><span class="label">你的問題</span><textarea class="input" data-learn="ask" maxlength="2000" placeholder="例如：走向與傾向為什麼相差 90 度？">' + esc(L.ask) + "</textarea></label>" +
      '<label class="consent"><input type="checkbox" data-learn-check="askConsent"' + (L.askConsent ? " checked" : "") + "><span>同意將問題傳送給 AI 服務；問題裡不含個資。</span></label>" +
      '<button class="btn primary block" style="margin-top:14px" data-act="ask"' + (L.asking ? " disabled" : "") + ">" + (L.asking ? '<span class="loading-dots"><i></i><i></i><i></i></span>正在查閱教學卡' : ic("spark") + "取得解釋") + "</button>" +
      '<div id="ask-answer">' + (L.answer ? '<div class="ai-card"><div class="top"><span class="chip ai">AI 回答 · 請對照教學卡</span></div><div class="ai-text">' + esc(L.answer) + "</div></div>" : "") + "</div></div>";
  }

  /* ========== 畫面：說明 ========== */
  function viewAbout() {
    var standalone = window.matchMedia && window.matchMedia("(display-mode: standalone)").matches;
    return '<div class="page-title"><h1>使用說明</h1><p>先確認工具的能力與限制，再帶進課堂或野外。</p></div>' +
      (S.persistent ? "" : '<div class="callout warn" style="margin-bottom:14px"><b>這個瀏覽器不能長期保存筆記</b>關閉頁面後紀錄可能消失，請隨時匯出備份。</div>') +
      '<div class="card"><div class="menu-item" style="cursor:default">' + ic("archive") + "<div><b>筆記存在這支手機上</b><span>不需要帳號或網路。換手機、清除瀏覽器資料前，請先匯出 JSON 備份。</span></div></div>" +
      '<button class="menu-item" data-act="data-menu">' + ic("download") + "<div><b>備份與匯出</b><span>完整備份 JSON、資料表 CSV、報告草稿 Markdown</span></div></button>" +
      '<button class="menu-item" data-act="import">' + ic("upload") + "<div><b>匯入 JSON 備份</b><span>可匯入舊版 FIELDNOTE 匯出的檔案，相同編號會更新</span></div></button>" +
      (standalone ? "" : '<button class="menu-item" data-act="install">' + ic("plus") + "<div><b>加到手機主畫面</b><span>像 App 一樣全螢幕開啟，也能離線使用</span></div></button>") + "</div>" +
      '<div class="card prose" style="margin-top:16px"><h2>四獸山永春陂野外</h2><p>「野外」分頁收錄手冊的 6 個停駐點、通關問題與 5 張校正過座標的地圖（航照、電子地圖、地形圖、兩張地質圖）。開啟定位後會顯示你在圖上的位置、最近的停駐點、手冊地質圖上的地層，以及 TWD97 座標。地層是依 1/50,000 地質圖概略判讀，靠近界線時以現地為準。</p>' +
      '<h2>這個版本可以做什麼</h2><p>三主題觀測、照片拍攝與畫線標註、手動位態紀錄、互動 3D 位態模型、學習卡、測驗、14 種岩性卡、GPS 軌跡記錄、KMZ（Google Earth）與 JSON／CSV／Markdown 匯出。' + (S.aiAvail ? "在 claude.ai 開啟時可使用 AI 比對與課程助手，只在你勾選同意後才會傳送。" : "AI 比對與課程助手只在 claude.ai 開啟本 App 時提供。") + "</p>" +
      "<h2>隱私</h2><p>不要放入姓名、學號、敏感位置或可辨識他人的照片。位置與照片只存在你的手機，除非你自己匯出分享。</p>" +
      "<h2>量測與安全</h2><p>位態採手動輸入，不使用手機感測器。水平面沒有唯一傾向，垂直面兩側等價。AI 不會由單張照片推斷真實走向、傾角或坡面穩定度，結果需教師複核。</p>" +
      "<h2>離線</h2><p>加到主畫面後，學習卡、3D 模型與筆記都能在沒有網路時使用。地質圖台與 AI 需要網路。此工具不應取代紙本野外紀錄。</p>" +
      "<h2>教材依據</h2>" + FN.SOURCES.map(function (s, i) { return "<p>" + srcLink(i) + "</p>"; }).join("") +
      '<p class="small muted" style="margin-top:14px">以上為本版精簡教學內容的參照，並非整份課程簡報全文；測驗是練習，不是正式成績。</p></div>' +
      '<p class="small muted" style="text-align:center;margin-top:20px">FIELDNOTE · 觀察有依據，判讀可追溯 · v2.0</p>';
  }

  /* ========== 畫面：觀測編輯 ========== */
  var STEPS = ["現場觀察", "證據與量測", "AI 比對", "修正與回饋"];
  function isDirty() { return S.edit && JSON.stringify(S.edit.obs) !== S.edit.snapshot; }

  function viewEdit() {
    var E = S.edit, o = E.obs, t = FN.TOPICS[o.topic];
    var stopChip = o.stopId && stopById(o.stopId) ? '<p class="small muted" style="margin:-4px 0 4px 42px">' + esc(FN.stopLabel(o.stopId)) + "</p>" : "";
    var body = E.step === 0 ? editStep0(o, t) : E.step === 1 ? editStep1(o, t) : E.step === 2 ? editStep2(o) : editStep3(o);
    return '<div class="editor-head"><button class="icon-btn" data-act="leave" aria-label="返回觀測筆記">' + ic("back") + "</button>" + swatch(o.topic, true) +
      "<h1>" + esc(o.title || "新增觀測") + '</h1><button class="icon-btn" data-act="edit-menu" aria-label="更多操作">' + ic("more") + "</button></div>" + stopChip +
      '<div class="steps" role="tablist" aria-label="觀測流程">' + STEPS.map(function (s, i) {
        return '<button role="tab" aria-selected="' + (E.step === i) + '" class="' + (E.step === i ? "on" : i < E.step ? "done" : "") + '" data-act="step" data-v="' + i + '"><i></i><b>' + (i + 1) + "</b>" + s + "</button>";
      }).join("") + "</div>" + body;
  }

  function field(label, inner, opts) {
    opts = opts || {};
    return '<label class="field"><span class="label">' + label + (opts.req ? '<span class="req">*</span>' : "") + (opts.en ? '<span class="en">' + opts.en + "</span>" : "") + "</span>" + inner + (opts.help ? '<span class="help">' + opts.help + "</span>" : "") + "</label>";
  }
  function numInput(k, o, min, max, ph) {
    return '<input class="input" type="number" inputmode="decimal" step="any" min="' + min + '" max="' + max + '" data-f="' + k + '" value="' + (o[k] === null ? "" : o[k]) + '" placeholder="' + (ph || "") + '">';
  }

  function editStep0(o, t) {
    var locked = S.edit.existing && o.initial;
    return '<div class="card">' +
      '<div class="field"><span class="label">觀察主題</span><div class="seg full">' + Object.keys(FN.TOPICS).map(function (k) {
        return '<button class="' + (o.topic === k ? "on" : "") + '" data-act="topic" data-v="' + k + '">' + FN.TOPICS[k].name + "</button>";
      }).join("") + "</div></div>" +
      '<div class="field"><span class="label">停駐點</span><div class="choices">' + [{ id: "", no: "", name: "不屬於停駐點" }].concat(T.stops).map(function (st) {
        return '<button class="choice' + ((o.stopId || "") === st.id ? " on" : "") + '" data-act="stop-pick" data-v="' + st.id + '">' + (st.no ? st.no + " " : "") + esc(st.name) + "</button>";
      }).join("") + "</div></div>" +
      field("觀測點名稱", '<input class="input" data-f="title" maxlength="100" placeholder="例如：路線 A／砂岩露頭 01" value="' + esc(o.title) + '">', { req: true }) +
      '<div class="prompts">' + t.prompts.map(function (p) { return "<div>" + p + "</div>"; }).join("") + "</div>" +
      field("我看見的現象", '<textarea class="input" data-f="notes" rows="4" placeholder="描述顆粒、顏色、平面、裂縫與水；把事實和推論分開。">' + esc(o.notes) + "</textarea>", { en: "Observation" }) +
      field("我的初步判讀", '<textarea class="input" data-f="initial" rows="3" placeholder="我認為是……，因為看到了……；仍不確定的是……"' + (locked ? " disabled" : "") + ">" + esc(o.initial) + "</textarea>", { req: true, en: "Interpretation" }) +
      (locked ? '<p class="locked">' + ic("lock") + "已儲存的原始判讀會保留，看過 AI 後的想法請寫在第 4 步。</p>" : '<span class="help">第一次儲存後會鎖定，避免看過 AI 後改寫自己的初始答案。</span>') +
      "</div>" + (o.topic === "rock" ? rockForm(o.rock) : "") + locationCard(o);
  }

  function choices(key, opts, val, path) {
    return '<div class="choices">' + opts.map(function (v) {
      var label = key === "originKnown" && v === "yes" ? "已知" : FN.ROCK_LABELS[v];
      return '<button class="choice' + (val === v ? " on" : "") + (v === "unknown" ? " unknown" : "") + '" data-act="choose" data-path="' + path + '" data-v="' + v + '">' + label + "</button>";
    }).join("") + "</div>";
  }
  function rockForm(r) {
    var O = FN.ROCK_OPTIONS, F = FN.ROCK_FIELDS, H = FN.ROCK_HELP;
    var ch = function (k, opts) { return '<div class="field"><span class="label">' + F[k] + "</span>" + choices(k, opts, r[k], "rock." + k) + (H[k] ? '<span class="help">' + H[k] + "</span>" : "") + "</div>"; };
    var tx = function (k, ph, max) { return field(F[k], '<input class="input" data-f="rock.' + k + '" maxlength="' + (max || 100) + '" placeholder="' + ph + '" value="' + esc(r[k]) + '">'); };
    return '<div class="section-head"><h2>岩性觀察表</h2><span class="chip">可只填文字</span></div><div class="card">' +
      '<p class="small muted" style="margin-bottom:16px">每項都可以選「不知道」。未觀察不等於不存在，表單不會替你猜答案。</p>' +
      ch("sampleSource", O.sampleSource) + tx("color", "例如：深灰色，外緣黃褐；不用猜岩名", 160) + ch("grain", O.grain) + ch("texture", O.texture) +
      '<details class="more"><summary>' + ic("chev") + "來源、表面、粒徑與光澤（選填）</summary>" + ch("originKnown", O.originKnown) +
      (r.originKnown === "yes" ? tx("originLocation", "已核實的採集地；避免精確敏感位置", 160) : "") + ch("surface", O.surface) + ch("moisture", O.moisture) +
      tx("grainSize", "例如：約 1–2 mm，以尺比較；未測則留白") + ch("luster", O.luster) + "</details>" +
      '<details class="more"><summary>' + ic("chev") + "平行面不一定是同一種構造：看圖再選</summary>" + structureGuide() + "</details>" +
      ch("bedding", O.presence) + ch("cleavage", O.presence) + ch("foliation", O.presence) + ch("joints", O.presence) +
      (r.joints === "yes" ? '<div class="grid-2" style="margin-top:14px">' + tx("jointSets", "例如：2 組", 80) + tx("jointSpacing", "例如：約 5 cm") + "</div>" : "") +
      '<details class="more"><summary>' + ic("chev") + "其他可見線索（選填）</summary>" + ch("fossils", O.presence) + ch("vesicles", O.presence) + ch("veins", O.presence) +
      tx("minerals", "例如：疑似雲母亮片；不確定可寫不知道", 300) + "</details>" +
      '<button class="btn ghost sm" style="margin-top:14px" data-act="go-rocks">' + ic("book") + "對照 14 種岩性辨識卡</button></div>";
  }
  function structureGuide() {
    var g = [
      ["層理 Bedding", "先找顏色、粒度或組成的層次。", '<rect width="180" height="70" fill="#ece1c4"/>' + [12, 33, 55].map(function (y) { return '<path d="M0 ' + y + " Q90 " + (y + 5) + " 180 " + (y - 2) + '" fill="none" stroke="#a88f55" stroke-width="9"/>'; }).join(""), "general"],
      ["岩石劈理 Cleavage", "密集平行面及既有薄板狀分裂；不是單顆礦物的解理。", '<rect width="180" height="70" fill="#e3e9e3"/><path d="M0 40H180" stroke="#b39f70" stroke-width="12"/>' + [0, 25, 50, 75, 100, 125, 150].map(function (x) { return '<path d="M' + x + ' 70l26 -70" stroke="#4c6155" stroke-width="2"/>'; }).join(""), "meta"],
      ["節理 Joints", "記錄裂面與組數；節理不是岩種專屬特徵。", '<rect width="180" height="70" fill="#e3e9e3"/><path d="M35 0l10 30 -5 40M130 0l-6 40 10 30M0 28l45 3 80 9 55 -7" stroke="#4c6155" stroke-width="3" fill="none"/>', "structures"]
    ];
    return '<div style="display:grid;gap:12px">' + g.map(function (x) {
      return '<div style="display:grid;grid-template-columns:110px 1fr;gap:12px;align-items:center"><svg viewBox="0 0 180 70" style="width:100%;border-radius:8px" aria-hidden="true">' + x[2] + '</svg><div><b class="small">' + x[0] + '</b><p class="small muted">' + x[1] + "</p>" + rockSrc(x[3]) + "</div></div>";
    }).join("") + '<p class="small muted">以上是概念示意，不是判讀模板；實際岩石可能同時具有多種構造。</p></div>';
  }

  function locationCard(o) {
    var g = o.geology;
    var mapUrl = "https://www.geologycloud.tw/map/Stratum/EN";
    return '<div class="section-head"><h2>位置</h2><span class="chip">選填</span></div><div class="card">' +
      '<div class="grid-2">' + field("緯度", numInput("lat", o, -90, 90, "WGS84")) + field("經度", numInput("lon", o, -180, 180, "WGS84")) + "</div>" +
      locContext(o) +
      '<div class="btn-row" style="margin-top:12px"><button class="btn sm" data-act="use-here">' + ic("pin") + '取得目前位置</button><a class="btn sm ghost" href="' + mapUrl + '" target="_blank" rel="noopener noreferrer">' + ic("ext") + "開啟官方地質圖台</a></div>" +
      '<p class="help" id="acc-line">' + (o.accuracy !== null ? "裝置回報水平精度約 " + Math.round(o.accuracy) + " m。" : "座標系統 WGS84 經緯度；TWD97 公尺座標請勿直接填入。") + "位置與照片可能涉及隱私，只填課程需要的資料。</p>" +
      (g ? geologyBox(g, o) : "") + "</div>";
  }
  function locContext(o) {
    if (o.lat === null || o.lon === null) return "";
    var t = FN.geo.toTWD97(o.lat, o.lon);
    if (!FN.geo.inArea(t.E, t.N)) return '<p class="help">這個位置不在手冊地圖範圍內。</p>';
    var u = FN.geo.unitAt(t.E, t.N), near = T.stops.map(function (st) { return { s: st, d: FN.geo.dist(t.E, t.N, st.E, st.N) }; }).sort(function (a, b) { return a.d - b.d; })[0];
    return '<div class="loc-grid compact"><div><span>手冊地質圖</span><b><i class="unit-dot" style="background:' + u.unit.color + '"></i>' + u.unit.name + "</b>" + (u.edge ? "<em>接近地層界線</em>" : "") +
      '</div><div><span>TWD97</span><b class="num">E ' + Math.round(t.E) + " / N " + Math.round(t.N) + "</b></div></div>" +
      '<p class="help">最近的停駐點：' + near.s.no + " " + esc(near.s.name) + "（約 " + fmtDist(near.d) + "）</p>";
  }
  function geologyBox(g, o) {
    var stale = g.lat !== o.lat || g.lon !== o.lon;
    return '<div style="margin-top:16px;border-top:1px dashed var(--line);padding-top:14px"><b class="small">先前查詢的地層背景（官方圖資 1:50,000）</b>' +
      (stale ? '<div class="callout warn" style="margin-top:8px">座標已變更，以下是舊位置的結果。</div>' : "") +
      (g.status !== "found" ? '<p class="small muted">' + esc(g.note) + "</p>" : (g.units || []).map(function (u) {
        return '<div class="callout" style="margin-top:8px"><b>' + esc(u.name) + " <small class=\"muted\">" + esc(u.code) + "</small></b>圖載岩性：" + esc(u.lithology) + "<br>圖載年代：" + esc(u.age) + "</div>";
      }).join("") + '<p class="small muted" style="margin-top:8px">' + esc(g.note || "") + "</p>") +
      (o.topic === "rock" && o.rock.sampleSource !== "outcrop" ? '<p class="small muted">目前不是「原地露頭」：拍攝位置不等於標本來源，地層資訊不用來決定標本岩名。</p>' : "") + "</div>";
  }

  function editStep1(o, t) {
    var dd = o.dip === 0 ? "水平面沒有唯一走向／傾向。" : o.dip === 90 ? "垂直面兩側等價，請記錄採用的方向慣例。" : o.strike !== null ? "傾向（右手定則）" : "沒有量測時留白，不要讓 AI 猜測角度。";
    var ddv = o.strike !== null && o.dip !== null && o.dip !== 0 && o.dip !== 90 ? '<b class="num">' + dipDir(o.strike).toFixed(1).replace(/\.0$/, "") + "°</b>" : "";
    return '<div class="card"><div class="section-head" style="margin-top:0"><h2>勾選看見的特徵</h2><span class="small muted">可複選</span></div><div class="check-grid">' +
      t.features.map(function (f) { var on = o.features.indexOf(f) >= 0; return '<button class="check' + (on ? " on" : "") + '" data-act="feature" data-v="' + esc(f) + '" aria-pressed="' + on + '"><span class="box"></span>' + esc(f) + "</button>"; }).join("") + "</div></div>" +
      '<div class="section-head"><h2>現場照片與標註</h2></div><div class="card">' + photoBlock(o) + "</div>" +
      '<div class="section-head"><h2>手動位態紀錄</h2><span class="chip">右手定則</span></div><div class="card"><div class="attitude">' +
      field("走向", numInput("strike", o, 0, 359.9, "0–359.9"), { en: "Strike" }) + field("傾角", numInput("dip", o, 0, 90, "0–90"), { en: "Dip" }) + "</div>" +
      '<div class="derived-line" id="dd-line"><span>' + dd + "</span>" + ddv + "</div>" +
      '<div class="field"><span class="label">北向基準</span>' + '<div class="seg full">' + [["unknown", "尚未確認"], ["true", "真北"], ["magnetic", "磁北"]].map(function (p) {
        return '<button class="' + (o.north === p[0] ? "on" : "") + '" data-act="north" data-v="' + p[0] + '">' + p[1] + "</button>";
      }).join("") + "</div></div>" +
      field("量測工具", '<input class="input" data-f="instrument" maxlength="100" value="' + esc(o.instrument) + '" placeholder="例如：Brunton 羅盤">') +
      '<details class="more"><summary>' + ic("chev") + "我用 Clino 量到的是「傾角／傾向」</summary>" +
      '<div class="attitude"><label class="field"><span class="label">傾角 Dip</span><input class="input" type="number" inputmode="decimal" min="0" max="90" data-eclino="dip" placeholder="0–90"></label>' +
      '<label class="field"><span class="label">傾向 Azimuth</span><input class="input" type="number" inputmode="decimal" min="0" max="360" data-eclino="dd" placeholder="0–359"></label></div><span class="help">輸入後會自動換算成右手定則走向，填入上方欄位。</span></details>' +
      '<button class="btn ghost sm" style="margin-top:12px" data-act="preview-plane"' + (o.strike === null || o.dip === null ? " disabled" : "") + ">" + ic("compass") + "用 3D 模型檢查這組位態</button></div>" +
      '<div class="section-head"><h2>其他量測組</h2><span class="small muted">例如同一露頭的 3 組位態</span></div><div class="card">' +
      (o.extraAttitudes.length ? o.extraAttitudes.map(function (a, i) {
        return '<div class="xa-row"><div class="choices">' + ["層面", "節理", "其他"].map(function (k) { return '<button class="choice' + (a.kind === k ? " on" : "") + '" data-act="xa-kind" data-i="' + i + '" data-v="' + k + '">' + k + "</button>"; }).join("") +
          '<button class="icon-btn" data-act="xa-del" data-v="' + i + '" aria-label="刪除這組">' + ic("trash") + '</button></div><div class="attitude" style="margin-top:8px">' +
          '<label class="field"><span class="label">走向</span><input class="input" type="number" inputmode="decimal" min="0" max="359.9" data-xa="' + i + '.strike" value="' + (a.strike === null ? "" : a.strike) + '" placeholder="0–359.9"></label>' +
          '<label class="field"><span class="label">傾角</span><input class="input" type="number" inputmode="decimal" min="0" max="90" data-xa="' + i + '.dip" value="' + (a.dip === null ? "" : a.dip) + '" placeholder="0–90"></label></div></div>';
      }).join("") : '<p class="small muted">主要位態填在上方；同一點的其他層面或節理量測加在這裡。</p>') +
      '<button class="btn sm" style="margin-top:12px" data-act="xa-add">' + ic("plus") + "新增一組量測</button></div>";
  }
  function photoBlock(o) {
    if (!o.photo) return '<div class="photo-drop">' + ic("camera") + "<p>加入含比例尺的照片</p><span class=\"small muted\">JPG、PNG、WebP，8 MB 以下</span>" +
      '<div class="btn-row"><button class="btn primary sm" data-act="photo-camera">' + ic("camera") + '拍照</button><button class="btn sm" data-act="photo-pick">' + ic("image") + "從相簿選</button></div></div>";
    var draw = S.edit.drawMode;
    return '<div class="photo-stage' + (draw ? " drawing" : "") + '" id="photo-stage"><img src="' + o.photo + '" alt="觀測照片，紅線為標註">' +
      '<svg viewBox="0 0 1000 1000" preserveAspectRatio="none" id="anno" aria-label="照片標註">' + strokesSVG(o.strokes) + "</svg>" +
      (draw ? '<span class="draw-badge">畫線中，用手指描出構造</span>' : "") + "</div>" +
      '<div class="photo-tools"><button class="btn sm ' + (draw ? "primary" : "") + '" data-act="draw-toggle">' + ic("pen") + (draw ? "完成畫線" : "畫線標註") + "</button>" +
      '<button class="btn sm" data-act="undo-stroke"' + (o.strokes.length ? "" : " disabled") + ">" + ic("undo") + "復原</button>" +
      '<button class="btn sm ghost" data-act="photo-replace">' + ic("image") + "更換照片</button></div>" +
      '<p class="help">標註線另外保存，不會覆寫原照片，也不會傳給 AI。</p>';
  }
  function strokesSVG(strokes) {
    return strokes.map(function (s) {
      return '<polyline points="' + s.map(function (p) { return (p.x * 1000).toFixed(1) + "," + (p.y * 1000).toFixed(1); }).join(" ") + '" fill="none" stroke="#ff3b2f" stroke-width="4" vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round"/>';
    }).join("");
  }

  function editStep2(o) {
    var E = S.edit;
    var html = '<div class="card"><h2 style="font-size:1.1rem">比對建議，不取代觀察</h2>' +
      '<div class="initial-box" style="margin-top:14px"><span>你的原始判讀</span><p>' + esc(o.initial || "請先回到第 1 步，寫下你的初步判讀。") + "</p></div>";
    if (S.aiAvail) {
      html += '<p class="small muted" style="margin-top:14px">AI 會使用你的原始判讀、觀察文字、量測與原始照片，提出可能解釋、限制與補充觀察。紅色標註線不會傳出。</p>' +
        '<label class="consent"><input type="checkbox" data-consent' + (E.consent ? " checked" : "") + "><span>我同意將這筆觀察文字與原始照片傳送給 AI 服務，並確認不含個資或敏感內容。</span></label>" +
        '<button class="btn primary block" style="margin-top:14px" data-act="ai"' + (E.busy || !E.consent ? " disabled" : "") + ">" +
        (E.busy ? '<span class="loading-dots"><i></i><i></i><i></i></span>正在比對證據' : ic("spark") + (o.ai ? "儲存並重新取得建議" : "儲存並取得 AI 建議")) + "</button>";
    } else {
      html += '<div class="callout yellow" style="margin-top:14px"><b>AI 比對目前無法使用</b>這個功能只在 claude.ai 開啟本 App 時提供。你仍可以用下面的問題自我檢查，再請教師或同學比對。</div>' +
        '<div class="prompts">' + FN.TOPICS[o.topic].prompts.map(function (p) { return "<div>" + p + "</div>"; }).join("") + "<div>哪一項證據如果改變，你的判讀也會跟著改變？</div></div>";
    }
    html += "</div>";
    if (E.streaming) html += '<div class="ai-card"><div class="top"><span class="chip ai">AI 建議產生中</span></div><div class="ai-text" id="ai-stream">' + esc(E.streaming) + "</div></div>";
    else if (o.topic === "rock" && o.rockAnalysis) html += rockResult(o);
    else if (o.ai) html += '<div class="ai-card"><div class="top"><span class="chip ai">AI 建議 · 尚待人工驗證</span></div><div class="ai-text">' + esc(o.ai) + "</div>" + srcLink(o.topic === "structure" ? 0 : o.topic === "rock" ? 1 : 2) + "</div>";
    html += '<p class="small muted" style="margin-top:14px">不是即時風險判定。照片無法提供的角度、尺度、材料強度與現場狀態，應標為未知。</p>';
    if (o.aiHistory.length) {
      html += '<details class="more"><summary>' + ic("chev") + "先前的 AI 回答（" + o.aiHistory.length + " 次）</summary>" +
        o.aiHistory.slice().reverse().map(function (h) { return '<details class="more"><summary>' + ic("chev") + (h.at ? fmtDateTime(h.at) : "舊版紀錄") + '</summary><div class="ai-text small">' + esc(h.ai) + "</div></details>"; }).join("") + "</details>";
    }
    return html;
  }

  function rockResult(o) {
    var A = o.rockAnalysis, r = A.report, stale = FN.fingerprint(o) !== A.fingerprint;
    var lab = { student: "學生文字／勾選", image: "照片可見（AI）", map: "官方地圖背景", conflict: "證據待核對" };
    var html = '<div class="ai-card"><div class="top"><b>候選岩種與關鍵追問</b><span class="chip ai">AI 假說 · 尚未鑑定</span></div>' +
      '<p class="small muted" style="margin-top:4px">' + fmtDateTime(A.at) + "，未提供經校準的機率或正確率</p>" +
      (stale ? '<div class="callout warn" style="margin-top:10px">觀察或追問回答已變更。以下仍是上一次分析，請重新比對。</div>' : "") +
      '<p style="margin-top:12px">' + esc(r.summary) + "</p>" +
      '<div class="evidence">' + r.evidence.map(function (e) { return '<div><span class="tag tag-' + e.origin + '">' + (lab[e.origin] || "證據") + "</span><br>" + esc(e.detail) + "</div>"; }).join("") + "</div>";
    if (!r.candidates.length) html += '<div class="callout warn" style="margin-top:12px">' + (r.status === "out_of_catalog" ? "目前資料庫不足以涵蓋此標本，不強行套入既有岩名。" : "證據不足，先回答下方問題，不強行猜岩名。") + "</div>";
    html += r.candidates.map(function (c) {
      var rk = FN.ROCKS.find(function (x) { return x.id === c.rockId; }) || { zh: c.rockId, en: "", sources: [] };
      return '<div class="candidate"><div style="display:flex;justify-content:space-between;gap:8px;align-items:center"><h4>' + rk.zh + "<small>" + rk.en + '</small></h4><span class="chip">待比較</span></div><div class="cols">' +
        '<div><b class="tag-student">支持的觀察</b><ul>' + c.support.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul></div>" +
        '<div><b class="tag-conflict">仍缺少／相衝突的證據</b><ul>' + c.uncertainty.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul></div>" +
        '<div><b>如何再區分</b><p>' + esc(c.discriminant) + "</p></div></div>" + '<div style="display:flex;flex-direction:column">' + rk.sources.map(rockSrc).join("") + "</div></div>";
    }).join("");
    html += '<div style="margin-top:16px"><b>再補一兩項觀察</b>' + r.questions.map(function (q, i) {
      var id = A.at + "-" + i, f = o.followups.find(function (x) { return x.id === id; });
      return field((i + 1) + ". " + esc(q.question), '<textarea class="input" rows="2" maxlength="1500" data-followup="' + i + '" placeholder="輸入觀察；不清楚就填「不知道」，不用猜。">' + esc(f ? f.answer : "") + "</textarea>", { help: esc(q.why) });
    }).join("") +
      (S.aiAvail ? '<button class="btn primary block" style="margin-top:14px" data-act="ai"' + (S.edit.busy || !S.edit.consent ? " disabled" : "") + ">" + ic("spark") + "儲存回答並重新比對</button>" : "") + "</div>" +
      '<div class="callout" style="margin-top:16px"><b>限制與學生判讀比對</b>' + esc(r.comparison) + '<ul style="margin:8px 0 0;padding-left:18px">' + r.limitations.map(function (l) { return "<li>" + esc(l) + "</li>"; }).join("") + "</ul></div></div>";
    return html;
  }

  function editStep3(o) {
    return '<div class="card"><h2 style="font-size:1.1rem">把判讀的改變說清楚</h2><div class="initial-box" style="margin-top:14px"><span>原始判讀</span><p>' + esc(o.initial || "尚未填寫") + "</p></div>" +
      field("比對與修正理由", '<textarea class="input" rows="5" data-f="revision" placeholder="AI 或同學的看法哪些與我相同／不同？我採納或保留了什麼？依據是哪張照片或哪筆量測？">' + esc(o.revision) + "</textarea>") +
      field("教師／助教回饋", '<textarea class="input" rows="3" data-f="feedback" placeholder="請由教師或助教補充">' + esc(o.feedback) + "</textarea>", { help: "協作回饋欄，沒有身分驗證，不是正式成績。" }) + "</div>";
  }

  function actionBar() {
    var E = S.edit, dirty = isDirty();
    return '<div class="action-bar"><div class="inner"><span class="state' + (dirty ? " dirty" : "") + '" id="save-state">' + (dirty ? "有未儲存內容" : E.existing ? "已儲存" : "新草稿") + "</span>" +
      (E.step < 3 ? '<button class="btn" data-act="step" data-v="' + (E.step + 1) + '">下一步</button>' : '<button class="btn" data-act="step" data-v="0">回到第 1 步</button>') +
      '<button class="btn primary" data-act="save"' + (E.busy ? " disabled" : "") + ">" + ic("save") + "儲存</button></div></div>";
  }
  function refreshSaveState() {
    var el = $("#save-state"); if (!el) return;
    var d = isDirty(); el.classList.toggle("dirty", d); el.textContent = d ? "有未儲存內容" : S.edit.existing ? "已儲存" : "新草稿";
  }

  /* ========== 野外課程：定位、地圖、停駐點 ========== */
  var T = FN.TRIP;
  function stopById(id) { return T.stops.find(function (s) { return s.id === id; }); }
  FN.stopLabel = function (id) { var s = stopById(id); return s ? "停駐點 " + s.no + " " + s.name : ""; };
  FN.formationText = function (lat, lon) {
    if (lat === null || lon === null || lat === undefined) return "";
    var p = FN.geo.toTWD97(lat, lon); if (!FN.geo.inArea(p.E, p.N)) return "手冊地圖範圍外";
    var u = FN.geo.unitAt(p.E, p.N); return u ? u.unit.name + (u.edge ? "（接近地層界線）" : "") : "";
  };
  function stopBadge(s, cls) { return '<span class="stop-no ' + (cls || "") + '">' + s.no + "</span>"; }
  function fmtDist(m) { return m >= 1000 ? (m / 1000).toFixed(1) + " km" : Math.round(m) + " m"; }
  function allOverlays() { return (FN.OVERLAY_DATA || []).concat(S.userOverlays); }
  function ovVisible(ly) { return S.ovOn[ly.id] !== undefined ? S.ovOn[ly.id] : ly.on !== false; }
  function aroundHTML(E, N, radius, compact) {
    var res = FN.overlay.around(E, N, allOverlays(), radius);
    if (!allOverlays().length) return "";
    if (!res.length) return '<p class="small muted ov-none">' + radius + " m 內沒有已載入的疊加圖資（敏感區、山崩、潛勢溪流等）。</p>";
    return '<div class="ov-hits">' + res.map(function (r) {
      return '<div class="ov-hit' + (r.inside ? " inside" : "") + '"><i style="background:' + r.layer.color + '"></i><div><b>' + esc(r.layer.name) + "</b><span>" +
        (r.inside ? "你位在範圍內" : "距離約 " + fmtDist(r.d)) + (r.label ? "・" + esc(r.label) : "") + "</span></div></div>";
    }).join("") + "</div>";
  }

  /* 目前位置的分析結果 */
  function where() {
    var p = S.pos; if (!p) return null;
    var inA = FN.geo.inArea(p.E, p.N);
    var list = T.stops.map(function (s) { return { s: s, d: FN.geo.dist(p.E, p.N, s.E, s.N), b: FN.geo.bearing(p.E, p.N, s.E, s.N) }; }).sort(function (a, b) { return a.d - b.d; });
    return { p: p, inArea: inA, near: list[0], list: list, unit: inA ? FN.geo.unitAt(p.E, p.N) : null, arrived: list[0].d <= T.nearRadius + Math.min(p.acc || 0, 30),
      toStart: { d: FN.geo.dist(p.E, p.N, T.start.E, T.start.N), b: FN.geo.bearing(p.E, p.N, T.start.E, T.start.N) } };
  }

  /* ---- 定位 ---- */
  var watchId = null;
  function locStart() {
    if (!navigator.geolocation) { S.locState = "error"; S.locErr = "這個瀏覽器不支援定位。"; updateLocUI(); return; }
    if (watchId !== null) return;
    S.locState = "wait"; updateLocUI();
    try {
      watchId = navigator.geolocation.watchPosition(onPos, function (e) {
        if (e && e.code === 1) {
          S.locState = "error"; S.locErr = "沒有定位權限。請在瀏覽器設定允許位置存取後再試。";
          if (watchId !== null) { navigator.geolocation.clearWatch(watchId); watchId = null; }
          updateLocUI(); return;
        }
        /* 暫時性錯誤（訊號不佳、逾時）：繼續等待，不中斷定位 */
        if (!S.pos) { S.locState = "wait"; S.locWeak = true; updateLocUI(); }
      }, { enableHighAccuracy: true, maximumAge: 5000, timeout: 30000 });
    } catch (e) { S.locState = "error"; S.locErr = "這個環境不允許定位。請用自架網址開啟，或手動輸入座標。"; updateLocUI(); }
  }
  function locStop() {
    if (watchId !== null) { navigator.geolocation.clearWatch(watchId); watchId = null; }
    if (S.field.recording) FN.store.setKV("track", S.field.track);
    S.locState = "off"; S.field.recording = false; S.pos = null; if (S.view === "field") render(true); else updateLocUI();
  }
  function onPos(pos) {
    var c = pos.coords, t = FN.geo.toTWD97(c.latitude, c.longitude);
    S.pos = { lat: c.latitude, lon: c.longitude, acc: c.accuracy, E: t.E, N: t.N, t: Date.now() };
    S.locState = "on";
    if (S.field.recording && c.accuracy <= 60) {
      var tr = S.field.track, last = tr[tr.length - 1];
      if (!last || FN.geo.dist(last.E, last.N, t.E, t.N) >= 5) {
        tr.push({ lat: +c.latitude.toFixed(6), lon: +c.longitude.toFixed(6), E: +t.E.toFixed(1), N: +t.N.toFixed(1), t: Date.now() });
        if (tr.length % 5 === 0) FN.store.setKV("track", tr);
      }
    }
    updateLocUI();
  }
  function locFresh() { return S.pos && Date.now() - S.pos.t < 60000; }

  function locCardHTML() {
    var st = S.locState;
    if (st === "off") return '<div class="loc-card"><div class="loc-top"><span class="loc-ico">' + ic("pin") + '</span><div><b>開啟定位，看看你在哪裡</b><p class="small muted">顯示目前位置、最近的停駐點與手冊地質圖上的地層。位置只留在這支手機。</p></div></div>' +
      '<button class="btn primary block" data-act="loc-start">' + ic("pin") + "開始定位</button></div>";
    if (st === "wait") return '<div class="loc-card"><div class="loc-top"><span class="loc-ico pulse">' + ic("pin") + '</span><div><b>正在取得定位</b><p class="small muted">' + (S.locWeak ? "訊號較弱，持續嘗試中。請移到較開闊處。" : "第一次可能需要 10–30 秒；在開闊處會比較快。") + '</p></div></div></div>';
    if (st === "error") return '<div class="loc-card warn"><div class="loc-top"><span class="loc-ico">' + ic("alert") + "</span><div><b>無法取得定位</b><p class=\"small\">" + esc(S.locErr) + '</p></div></div><button class="btn block" data-act="loc-start">再試一次</button></div>';
    var w = where(), p = w.p;
    if (!w.inArea) return '<div class="loc-card"><div class="loc-top"><span class="loc-ico on">' + ic("pin") + '</span><div><b>你目前不在手冊地圖範圍內</b><p class="small muted">距離集合點（' + esc(T.meet.place) + "）約 " + fmtDist(w.toStart.d) + "，往" + FN.compassWord(w.toStart.b) + "方。</p></div></div>" +
      '<p class="small muted loc-meta">精度約 ' + Math.round(p.acc) + ' m <button class="link-btn" data-act="loc-stop">關閉定位</button></p></div>';
    var n = w.near, u = w.unit;
    return '<div class="loc-card' + (w.arrived ? " arrived" : "") + '"><div class="loc-top">' + stopBadge(n.s, "lg") + "<div>" +
      (w.arrived ? '<span class="chip ok">已抵達</span>' : '<span class="chip">最近的停駐點</span>') +
      "<b class=\"loc-name\">" + esc(n.s.name) + "</b>" +
      (w.arrived ? "" : '<p class="small"><span class="arrow" style="transform:rotate(' + Math.round(n.b) + 'deg)">↑</span>往' + FN.compassWord(n.b) + "約 " + fmtDist(n.d) + "</p>") + "</div></div>" +
      '<div class="loc-grid"><div><span>所在地層</span><b>' + (u ? '<i class="unit-dot" style="background:' + u.unit.color + '"></i>' + u.unit.name : "—") + "</b>" + (u && u.edge ? '<em>接近地層界線</em>' : "") + "</div>" +
      '<div><span>TWD97（手冊座標）</span><b class="num">E ' + Math.round(p.E) + "<br>N " + Math.round(p.N) + "</b></div></div>" +
      aroundHTML(p.E, p.N, 50) +
      '<div class="btn-row"><button class="btn primary sm" data-act="new-here">' + ic("plus") + '在這裡新增觀測</button><button class="btn sm" data-act="stop" data-id="' + n.s.id + '">停駐點 ' + n.s.no + " 說明</button></div>" +
      '<p class="small muted loc-meta">精度約 ' + Math.round(p.acc) + " m・地層依手冊 1/50,000 地質圖概略判讀，以現地觀察為準 " + '<button class="link-btn" data-act="loc-stop">關閉定位</button></p></div>';
  }

  function homeFieldCard() {
    var w = S.pos && S.locState === "on" ? where() : null;
    var line = w ? (w.inArea ? (w.arrived ? "你在停駐點 " + w.near.s.no + "　" + w.near.s.name : "最近：停駐點 " + w.near.s.no + " " + w.near.s.name + "，約 " + fmtDist(w.near.d)) : "距離集合點約 " + fmtDist(w.toStart.d)) : T.meet.time + " 在" + T.meet.place + "集合・" + T.stops.length + " 個停駐點";
    return '<button class="field-card" data-act="go" data-view="field"><span class="fc-map" aria-hidden="true"><img src="maps/street.jpg" alt=""></span><span class="fc-txt"><span class="chip">' + T.dateText + "</span><strong>" + esc(T.title) + '</strong><span id="home-field-line">' + esc(line) + "</span></span>" + ic("chev") + "</button>";
  }

  function viewField() {
    var F = S.field;
    return '<div class="page-title"><h1>' + esc(T.title) + '</h1><p>' + T.dateText + "・" + T.meet.time + " " + esc(T.meet.place) + "集合・" + esc(T.teacher) + "</p></div>" +
      '<div id="loc-card">' + locCardHTML() + "</div>" +
      '<div class="section-head"><h2>手冊地圖</h2><span class="small muted">雙指縮放、拖曳移動</span></div>' + mapHTML() +
      overlaySection() +
      '<div class="track-row card"><div><b>GPS 軌跡</b><p class="small muted" id="track-info">' + trackInfo() + '</p></div><div class="btn-row">' +
      '<button class="btn sm ' + (F.recording ? "danger" : "") + '" data-act="track-toggle">' + (F.recording ? "停止記錄" : "開始記錄") + "</button>" +
      '<button class="btn sm" data-act="kmz">' + ic("download") + "匯出 KMZ</button></div></div>" +
      '<div class="section-head"><h2>停駐點</h2><span class="small muted">每站 20 分鐘</span></div><div class="stop-list" id="stop-list">' + stopListHTML() + "</div>" +
      '<div class="section-head"><h2>繳交報告</h2></div><div class="card report-card">' +
      '<p class="small muted">把通關問題答案、照片、位態與路線圖整理成一份 PDF，在手機上直接產生，再傳給老師。資料不會上傳到任何伺服器。</p>' +
      '<div class="grid-2" style="margin-top:14px"><label class="field"><span class="label">組別</span><input class="input" data-group placeholder="例如：第 3 組" value="' + esc(F.group) + '" maxlength="40"></label>' +
      '<label class="field"><span class="label">組員</span><input class="input" data-members placeholder="姓名，用頓號分隔" value="' + esc(F.members) + '" maxlength="120"></label></div>' +
      '<span class="help">只會出現在你產生的報告與 KMZ 檔案中。</span>' +
      '<button class="btn primary block" style="margin-top:14px" data-act="pdf">' + ic("doc") + "產生 PDF 報告</button>" +
      '<details class="more"><summary>' + ic("chev") + "攜帶物品與注意事項</summary><p class=\"small\">" + T.bring.join("、") + "</p>" + T.reminders.map(function (r) { return '<p class="small muted" style="margin-top:6px">' + esc(r) + "</p>"; }).join("") + "</details></div>";
  }
  function overlaySection() {
    var L = allOverlays();
    return '<div class="card ov-card"><div class="ov-head"><div><b>疊加圖資</b><p class="small muted">山崩與地滑地質敏感區、歷史山崩、順向坡、土石流潛勢溪流等</p></div>' +
      '<button class="btn sm" data-act="ov-import">' + ic("upload") + "匯入</button></div>" +
      (L.length ? L.map(function (ly) {
        var on = ovVisible(ly);
        return '<div class="ov-row"><button class="check' + (on ? " on" : "") + '" data-act="ov-toggle" data-id="' + ly.id + '" aria-pressed="' + on + '"><span class="box"></span><i class="ov-sw" style="background:' + ly.color + '"></i><span><b>' + esc(ly.name) + "</b><small>" + ly.features.length + " 個圖徵・" + esc(ly.source || "") + "</small></span></button>" +
          (ly.user ? '<button class="icon-btn" data-act="ov-del" data-id="' + ly.id + '" aria-label="移除圖層">' + ic("trash") + "</button>" : "") + "</div>";
      }).join("") : '<p class="small muted" style="margin-top:10px">目前沒有疊加圖資。可匯入從山崩雲或政府開放資料下載的 KML、KMZ 或 GeoJSON，只會保留手冊地圖範圍附近的部分。</p>') + "</div>";
  }
  function trackInfo() {
    var tr = S.field.track, n = tr.length;
    if (!n) return S.field.recording ? "記錄中，移動後會開始累積軌跡點。" : "記錄走過的路線，可匯出成 KMZ。畫面需保持開啟。";
    var len = 0; for (var i = 1; i < n; i++) len += FN.geo.dist(tr[i - 1].E, tr[i - 1].N, tr[i].E, tr[i].N);
    return (S.field.recording ? "記錄中・" : "") + n + " 點・約 " + fmtDist(len) + (S.field.recording ? "" : ' <button class="link-btn" data-act="track-clear">清除</button>');
  }
  function stopListHTML() {
    var w = S.pos && S.locState === "on" ? where() : null;
    return T.stops.map(function (s) {
      var d = w ? w.list.find(function (x) { return x.s.id === s.id; }) : null;
      var u = FN.geo.unitAt(s.E, s.N), cnt = S.list.filter(function (o) { return o.stopId === s.id; }).length;
      var ansN = s.questions.filter(function (q, i) { return (S.field.answers[s.id + ":" + i] || "").trim(); }).length;
      return '<button class="stop-row" data-act="stop" data-id="' + s.id + '">' + stopBadge(s) + '<span class="txt"><strong>' + esc(s.name) + '</strong><span class="meta">' +
        '<span class="chip"><i class="unit-dot" style="background:' + u.unit.color + '"></i>' + u.unit.name + "</span>" +
        '<span class="chip' + (ansN === s.questions.length ? " ok" : "") + '">問題 ' + ansN + "/" + s.questions.length + "</span>" + (cnt ? '<span class="chip ai">' + cnt + " 筆觀測</span>" : "") + "</span></span>" +
        (d ? '<span class="dist num">' + fmtDist(d.d) + "</span>" : "") + ic("chev") + "</button>";
    }).join("");
  }

  function viewStop() {
    var s = stopById(S.stopId), u = FN.geo.unitAt(s.E, s.N), F = S.field;
    var obs = S.list.filter(function (o) { return o.stopId === s.id; });
    var w = S.pos && S.locState === "on" ? where() : null, d = w ? w.list.find(function (x) { return x.s.id === s.id; }) : null;
    return '<div class="editor-head"><button class="icon-btn" data-act="go" data-view="field" aria-label="返回野外">' + ic("back") + "</button>" + stopBadge(s) + "<h1>" + esc(s.name) + "</h1></div>" +
      '<p class="small muted" style="margin:-2px 0 14px">停駐 ' + s.minutes + " 分鐘・手冊第 " + s.pages + ' 頁<span id="stop-dist">' + (d ? "・距離你約 " + fmtDist(d.d) : "") + "</span></p>" +
      '<div class="stop-hero card"><div class="loc-grid"><div><span>手冊地質圖</span><b><i class="unit-dot" style="background:' + u.unit.color + '"></i>' + u.unit.name + "</b>" + (u.edge ? "<em>接近地層界線</em>" : "") + '</div><div><span>TWD97</span><b class="num">E ' + Math.round(s.E) + "<br>N " + Math.round(s.N) + "</b></div></div>" + aroundHTML(s.E, s.N, 50) +
      '<div class="btn-row" style="margin-top:14px"><button class="btn primary sm" data-act="new-stop" data-id="' + s.id + '">' + ic("plus") + '在這站新增觀測</button><button class="btn sm" data-act="map-to" data-id="' + s.id + '">' + ic("pin") + "在地圖上看</button></div></div>" +
      '<div class="section-head"><h2>學習目標</h2></div><div class="card"><ul class="goal-list">' + s.goals.map(function (g) { return "<li>" + esc(g) + "</li>"; }).join("") + "</ul>" +
      '<p class="small muted" style="margin-top:12px">現場可以注意</p><div class="choices" style="margin-top:6px">' + s.look.map(function (l) { return '<span class="chip">' + esc(l) + "</span>"; }).join("") + "</div></div>" +
      (s.clino ? clinoCard() : "") +
      '<div class="section-head"><h2>通關問題</h2><span class="small muted" id="ans-state">自動儲存</span></div><div class="card">' +
      (s.answerHint ? '<div class="callout yellow" style="margin-bottom:14px">' + esc(s.answerHint) + "</div>" : "") +
      s.questions.map(function (q, i) {
        return '<label class="field"><span class="label q-label"><b class="num">' + (i + 1) + "</b>" + esc(q) + '</span><textarea class="input" rows="4" data-ans="' + s.id + ":" + i + '" placeholder="小組討論後寫下答案與依據">' + esc(F.answers[s.id + ":" + i] || "") + "</textarea></label>";
      }).join("") + "</div>" +
      '<div class="section-head"><h2>補充資料</h2></div><div class="card">' + s.notes.map(function (n, i) {
        return '<details class="more"' + (i === 0 ? " open" : "") + "><summary>" + ic("chev") + esc(n[0]) + '</summary><p class="small" style="padding-bottom:10px">' + esc(n[1]) + "</p></details>";
      }).join("") + "</div>" +
      '<div class="section-head"><h2>這站的觀測</h2><span class="small muted">' + obs.length + " 筆</span></div>" +
      (obs.length ? obs.map(recordRow).join("") : '<div class="empty"><h3>這站還沒有觀測</h3><p>拍照、量測或記下討論，會自動標上這個停駐點。</p><button class="btn primary" data-act="new-stop" data-id="' + s.id + '">' + ic("plus") + "新增觀測</button></div>");
  }
  function clinoCard() {
    var c = S.clino || { dip: "", dd: "" }, has = c.dip !== "" && c.dd !== "";
    var strike = has ? ((Number(c.dd) - 90 + 360) % 360) : null;
    return '<div class="section-head"><h2>Clino 換算</h2><span class="chip">Dip/Azimuth → 走向</span></div><div class="card">' +
      '<p class="small muted">Clino 預設記錄「傾角／傾向」。輸入後換算成右手定則走向。</p><div class="attitude" style="margin-top:12px">' +
      '<label class="field"><span class="label">傾角 Dip</span><input class="input" type="number" inputmode="decimal" min="0" max="90" data-clino="dip" value="' + esc(c.dip) + '" placeholder="0–90"></label>' +
      '<label class="field"><span class="label">傾向 Azimuth</span><input class="input" type="number" inputmode="decimal" min="0" max="360" data-clino="dd" value="' + esc(c.dd) + '" placeholder="0–359"></label></div>' +
      '<div class="derived-line" id="clino-out">' + clinoOut(strike, c.dip) + "</div>" +
      '<button class="btn primary block" style="margin-top:12px" data-act="clino-record"' + (has ? "" : " disabled") + ">" + ic("plus") + "用這組位態建立觀測</button></div>";
  }
  function clinoOut(strike, dip) {
    return strike === null ? "<span>輸入傾角與傾向後顯示走向</span>" : '<span>走向（右手定則）</span><b class="num">' + pad3(strike) + "°</b><span>／傾角 " + dip + "°</span>";
  }

  /* ---- 地圖 ---- */
  function layer() { return FN.MAP_LAYERS.find(function (l) { return l.key === S.map.layer; }) || FN.MAP_LAYERS[0]; }
  function toPx(L, E, N) { return { x: (E - L.west) / (L.east - L.west) * L.w, y: (L.north - N) / (L.north - L.south) * L.h }; }
  function mapHTML() {
    var L = layer();
    return '<div class="map-layers" role="group" aria-label="切換圖層">' + FN.MAP_LAYERS.map(function (l) {
      return '<button class="choice' + (l.key === L.key ? " on" : "") + '" data-act="map-layer" data-v="' + l.key + '">' + esc(l.name) + "</button>";
    }).join("") + "</div>" +
      '<div class="mapview" id="mapview"><div class="map-inner" id="map-inner" style="width:' + L.w + "px;height:" + L.h + 'px"><img src="' + L.src + '" alt="' + esc(L.name) + '" draggable="false">' +
      '<svg class="map-svg" viewBox="0 0 ' + L.w + " " + L.h + '" width="' + L.w + '" height="' + L.h + '"><g id="map-ov"></g><polyline id="map-track" fill="none" stroke="#1f6fff" stroke-width="4" stroke-dasharray="1 7" stroke-linecap="round" vector-effect="non-scaling-stroke" points=""/></svg>' +
      '<div id="map-pins"></div></div>' +
      '<div class="map-ctrl"><button data-act="map-zoom" data-v="1.6" aria-label="放大">+</button><button data-act="map-zoom" data-v="0.625" aria-label="縮小">−</button><button data-act="map-me" aria-label="移到我的位置">' + ic("pin") + "</button></div>" +
      '<div class="map-scale" id="map-scale"><i></i><span></span></div>' +
      (L.key === "geology" ? '<div class="map-legend">' + FN.GEO_UNITS.map(function (u) { return '<span><i style="background:' + u.color + '"></i>' + u.name + "</span>"; }).join("") + "</div>" : "") +
      '<div class="map-src">' + esc(L.name) + "（手冊第 " + ({ aerial: 4, street: 5, topo: 6, geology: 7, geo111: 10 })[L.key] + " 頁）</div></div>";
  }
  function pinsHTML() {
    var L = layer(), h = "";
    S.list.forEach(function (o) {
      if (o.lat === null || o.lon === null) return;
      var t = FN.geo.toTWD97(o.lat, o.lon), p = toPx(L, t.E, t.N);
      if (p.x < 0 || p.y < 0 || p.x > L.w || p.y > L.h) return;
      h += '<button class="pin obs-pin" style="left:' + p.x + "px;top:" + p.y + 'px" data-act="open" data-id="' + o.id + '" aria-label="觀測：' + esc(o.title) + '"></button>';
    });
    T.stops.forEach(function (s) {
      var p = toPx(L, s.E, s.N);
      h += '<button class="pin stop-pin" style="left:' + p.x + "px;top:" + p.y + 'px" data-act="stop" data-id="' + s.id + '" aria-label="停駐點 ' + s.no + " " + esc(s.name) + '">' + s.no + "</button>";
    });
    var st = toPx(L, T.start.E, T.start.N);
    h += '<span class="pin start-pin" style="left:' + st.x + "px;top:" + st.y + 'px" title="集合點">集</span>';
    if (S.pos && S.locState === "on" && FN.geo.inArea(S.pos.E, S.pos.N)) {
      var me = toPx(L, S.pos.E, S.pos.N), r = Math.max(4, S.pos.acc) / (L.east - L.west) * L.w;
      h += '<span class="acc-ring" style="left:' + me.x + "px;top:" + me.y + "px;width:" + 2 * r + "px;height:" + 2 * r + 'px"></span><span class="pin me-pin" style="left:' + me.x + "px;top:" + me.y + 'px"></span>';
    }
    return h;
  }
  function drawTrack() {
    var el = $("#map-track"); if (!el) return; var L = layer();
    el.setAttribute("points", S.field.track.map(function (q) { var p = toPx(L, q.E, q.N); return p.x.toFixed(1) + "," + p.y.toFixed(1); }).join(" "));
  }
  function mapFit() {
    var mv = $("#mapview"); if (!mv) return;
    var L = FN.MAP_LAYERS[0];
    if (!S.map.mpp) { S.map.mpp = (L.east - L.west) / mv.clientWidth; S.map.cE = (L.west + L.east) / 2; S.map.cN = (L.north + L.south) / 2; }
  }
  function mapApply() {
    var mv = $("#mapview"), inner = $("#map-inner"); if (!mv || !inner) return;
    var L = layer(), ppm = L.w / (L.east - L.west), k = 1 / (S.map.mpp * ppm);
    var p = toPx(L, S.map.cE, S.map.cN), tx = mv.clientWidth / 2 - p.x * k, ty = mv.clientHeight / 2 - p.y * k;
    inner.style.transform = "translate(" + tx + "px," + ty + "px) scale(" + k + ")";
    inner.style.setProperty("--inv", 1 / k);
    var m = 80 * S.map.mpp, nice = [5, 10, 20, 25, 50, 100, 200, 250, 500].find(function (v) { return v >= m * 0.6; }) || 500;
    var sc = $("#map-scale"); if (sc) { sc.querySelector("i").style.width = nice / S.map.mpp + "px"; sc.querySelector("span").textContent = nice + " m"; }
  }
  function mapClamp() {
    var A = FN.MAP_LAYERS[0];
    S.map.mpp = Math.max(0.18, Math.min(2.2, S.map.mpp));
    S.map.cE = Math.max(A.west, Math.min(A.east, S.map.cE)); S.map.cN = Math.max(A.south, Math.min(A.north, S.map.cN));
  }
  function drawOverlays() {
    var g = $("#map-ov"); if (!g) return; var L = layer(), h = "";
    var P = function (q) { var p = toPx(L, q[0], q[1]); return p.x.toFixed(1) + "," + p.y.toFixed(1); };
    allOverlays().forEach(function (ly) {
      if (!ovVisible(ly)) return;
      ly.features.forEach(function (f) {
        if (f.type === "polygon") h += '<path d="' + f.g.map(function (r) { return "M" + r.map(P).join("L") + "Z"; }).join("") + '" fill="' + ly.color + '" fill-opacity=".22" fill-rule="evenodd" stroke="' + ly.color + '" stroke-width="2.5" vector-effect="non-scaling-stroke"/>';
        else if (f.type === "line") h += '<polyline points="' + f.g.map(P).join(" ") + '" fill="none" stroke="' + ly.color + '" stroke-width="5" stroke-linecap="round" vector-effect="non-scaling-stroke"/>';
        else { var p = toPx(L, f.g[0], f.g[1]); h += '<circle cx="' + p.x + '" cy="' + p.y + '" r="9" fill="' + ly.color + '" stroke="#fff" stroke-width="3"/>'; }
      });
    });
    g.innerHTML = h;
  }
  function mapRefreshPins() { var el = $("#map-pins"); if (el) el.innerHTML = pinsHTML(); drawTrack(); drawOverlays(); }
  function mapInit() {
    var mv = $("#mapview"); if (!mv) return;
    mapFit(); mapApply(); mapRefreshPins();
    var pts = {}, last = null, moved = false;
    function info() {
      var ids = Object.keys(pts), r = mv.getBoundingClientRect();
      if (ids.length === 1) { var a = pts[ids[0]]; return { x: a.x - r.left, y: a.y - r.top, d: 0 }; }
      var p1 = pts[ids[0]], p2 = pts[ids[1]];
      return { x: (p1.x + p2.x) / 2 - r.left, y: (p1.y + p2.y) / 2 - r.top, d: Math.hypot(p1.x - p2.x, p1.y - p2.y) };
    }
    mv.addEventListener("pointerdown", function (e) {
      if (e.target.closest(".map-ctrl")) return;
      pts[e.pointerId] = { x: e.clientX, y: e.clientY }; last = info(); moved = false;
    });
    mv.addEventListener("pointermove", function (e) {
      if (!pts[e.pointerId]) return;
      pts[e.pointerId] = { x: e.clientX, y: e.clientY };
      var now = info(), dx = now.x - last.x, dy = now.y - last.y;
      if (Math.abs(dx) + Math.abs(dy) > 3) { moved = true; try { mv.setPointerCapture(e.pointerId); } catch (er) {} }
      if (!moved) return;
      S.map.cE -= dx * S.map.mpp; S.map.cN += dy * S.map.mpp;
      if (last.d && now.d) {
        var f = now.d / last.d, w = mv.clientWidth, h = mv.clientHeight;
        var fE = S.map.cE + (now.x - w / 2) * S.map.mpp, fN = S.map.cN - (now.y - h / 2) * S.map.mpp;
        S.map.mpp /= f; mapClamp();
        S.map.cE = fE - (now.x - w / 2) * S.map.mpp; S.map.cN = fN + (now.y - h / 2) * S.map.mpp;
      }
      mapClamp(); mapApply(); last = now; e.preventDefault();
    });
    function up(e) { delete pts[e.pointerId]; last = Object.keys(pts).length ? info() : null; }
    mv.addEventListener("pointerup", up); mv.addEventListener("pointercancel", up);
    mv.addEventListener("click", function (e) { if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; } }, true);
    mv.addEventListener("wheel", function (e) { e.preventDefault(); zoomAt(e.deltaY < 0 ? 1.25 : 0.8, e.clientX - mv.getBoundingClientRect().left, e.clientY - mv.getBoundingClientRect().top); }, { passive: false });
    mv.addEventListener("dblclick", function (e) { zoomAt(1.8, e.clientX - mv.getBoundingClientRect().left, e.clientY - mv.getBoundingClientRect().top); });
  }
  function zoomAt(f, x, y) {
    var mv = $("#mapview"), w = mv.clientWidth, h = mv.clientHeight;
    if (x === undefined) { x = w / 2; y = h / 2; }
    var fE = S.map.cE + (x - w / 2) * S.map.mpp, fN = S.map.cN - (y - h / 2) * S.map.mpp;
    S.map.mpp /= f; mapClamp();
    S.map.cE = fE - (x - w / 2) * S.map.mpp; S.map.cN = fN + (y - h / 2) * S.map.mpp; mapClamp(); mapApply();
  }

  function updateLocUI() {
    if (S.view === "field") {
      var c = $("#loc-card"); if (c) c.innerHTML = locCardHTML();
      var sl = $("#stop-list"); if (sl) sl.innerHTML = stopListHTML();
      var ti = $("#track-info"); if (ti) ti.innerHTML = trackInfo();
      mapRefreshPins();
    } else if (S.view === "home") {
      var hl = $("#home-field-line"); if (hl) { var w = S.pos && S.locState === "on" ? where() : null; if (w) hl.textContent = w.inArea ? (w.arrived ? "你在停駐點 " + w.near.s.no + "　" + w.near.s.name : "最近：停駐點 " + w.near.s.no + " " + w.near.s.name + "，約 " + fmtDist(w.near.d)) : "距離集合點約 " + fmtDist(w.toStart.d); }
    } else if (S.view === "stop") {
      var sd = $("#stop-dist"), w2 = S.pos && S.locState === "on" ? where() : null;
      if (sd && w2) { var d = w2.list.find(function (x) { return x.s.id === S.stopId; }); sd.textContent = "・距離你約 " + fmtDist(d.d); }
    }
  }

  function newAtStop(stopId, usePos) {
    var s = stopId ? stopById(stopId) : null, o = FN.newObservation(s ? s.topic : "structure");
    if (s) { o.stopId = s.id; o.title = "S" + s.no + " " + s.name + "－"; }
    var p = locFresh() ? S.pos : null;
    if (p && (!s || FN.geo.dist(p.E, p.N, s.E, s.N) < 250 || usePos)) { o.lat = +p.lat.toFixed(6); o.lon = +p.lon.toFixed(6); o.accuracy = p.acc; }
    else if (s) { o.lat = s.lat; o.lon = s.lon; o.accuracy = null; toast("已先填入停駐點座標；到現場後可在第 1 步更新定位。"); }
    openEditor(o, false);
  }
  function refreshOverlayUI() {
    var c = document.querySelector(".ov-card"); if (c) c.outerHTML = overlaySection();
    var lc = $("#loc-card"); if (lc) lc.innerHTML = locCardHTML();
    drawOverlays();
  }
  async function importOverlay(file) {
    try {
      var r = await FN.overlay.parseFile(file);
      if (!r.layer.features.length) { toast("檔案裡有 " + r.total + " 個圖徵，但都不在手冊地圖範圍附近。"); return; }
      S.userOverlays.push(r.layer); await FN.store.setKV("overlays", S.userOverlays);
      refreshOverlayUI(); toast("已匯入「" + r.layer.name + "」：保留範圍內 " + r.layer.features.length + " 個圖徵（原有 " + r.total + " 個）。");
    } catch (e) { toast("匯入失敗：" + (e && e.message ? e.message : "請確認是 KML、KMZ 或 GeoJSON 檔。")); }
  }
  var pdfBusy = false;
  async function makePDF() {
    if (pdfBusy) return;
    var T2 = FN.TRIP, unanswered = 0;
    T2.stops.forEach(function (st) { st.questions.forEach(function (q, i) { if (!(S.field.answers[st.id + ":" + i] || "").trim()) unanswered++; }); });
    if (!S.field.group.trim()) { toast("請先填寫組別。"); var g = $("[data-group]"); if (g) g.focus(); return; }
    if (unanswered) {
      var r = await confirmSheet("還有 " + unanswered + " 題沒有作答", "未作答的題目會在報告中標示「未作答」。要先產生報告嗎？", [{ id: "go", label: "照樣產生報告", cls: "primary" }, { id: "close", label: "回去作答" }]);
      if (r !== "go") return;
    }
    pdfBusy = true;
    var btn = $('[data-act="pdf"]'); if (btn) { btn.disabled = true; btn.innerHTML = '<span class="loading-dots"><i></i><i></i><i></i></span>正在排版報告'; }
    try {
      var res = await FN.report.build(S.list, S.field, { map: true });
      var name = T2.date.replace(/-/g, "") + "_" + T2.title + "_" + S.field.group.replace(/[\\/:*?"<>|\s]/g, "") + ".pdf";
      await deliver(name, res.blob, "application/pdf");
      toast("報告完成，共 " + res.pages + " 頁。");
    } catch (e) { toast("產生報告時發生問題，請再試一次。"); }
    pdfBusy = false;
    btn = $('[data-act="pdf"]'); if (btn) { btn.disabled = false; btn.innerHTML = ic("doc") + "產生 PDF 報告"; }
  }
  async function exportKMZ() {
    var blob = FN.kmz.build(S.list, S.field.track, S.field);
    await deliver("fieldnote-" + T.id + (S.field.group ? "-" + S.field.group.replace(/[\\/:*?"<>|\s]/g, "") : "") + ".kmz", blob, "application/vnd.google-earth.kmz");
  }
  var ansTimer = null;
  function saveAnswers() {
    clearTimeout(ansTimer);
    var st = $("#ans-state"); if (st) st.textContent = "儲存中…";
    ansTimer = setTimeout(async function () { await FN.store.setKV("answers", S.field.answers); var s2 = $("#ans-state"); if (s2) s2.textContent = "已自動儲存"; }, 600);
  }

  /* ---------- 整體繪製 ---------- */
  function render(keepScroll) {
    var y = window.scrollY;
    var app = $("#app"), editing = S.view === "edit";
    app.classList.toggle("editing", editing);
    var html = S.view === "home" ? viewHome() : S.view === "records" ? viewRecords() : S.view === "lab" ? viewLab() : S.view === "learn" ? viewLearn() : S.view === "about" ? viewAbout() : S.view === "field" ? viewField() : S.view === "stop" ? viewStop() : viewEdit();
    $("#view").innerHTML = html;
    $("#tabbar").classList.toggle("hidden", editing);
    $("#bar-slot").innerHTML = editing ? actionBar() : "";
    var tabOf = { lab: "learn", stop: "field", about: "home" }, cur = tabOf[S.view] || S.view;
    document.querySelectorAll("#tabbar [data-view]").forEach(function (b) { b.classList.toggle("active", b.dataset.view === cur); b.setAttribute("aria-current", b.dataset.view === cur ? "page" : "false"); });
    $("#mem-pill").classList.toggle("hidden", S.persistent);
    if (keepScroll) window.scrollTo(0, y); else window.scrollTo(0, 0);
    if (S.view === "edit") bindAnnotation();
    if (S.view === "field") mapInit();
  }

  function go(view) {
    if (S.view === "edit") { leaveEditor().then(function (ok) { if (ok) { S.view = "records"; go(view); } }); return; }
    S.view = view;
    try { if (VIEWS.indexOf(view) >= 0 && location.hash !== "#" + view) history.replaceState(null, "", "#" + view); } catch (e) {}
    render();
  }

  /* ---------- 編輯器操作 ---------- */
  function openEditor(obs, existing, step) {
    if (S.view !== "edit") S.prevView = S.view;
    S.edit = { obs: obs, snapshot: JSON.stringify(obs), existing: existing, step: step || 0, drawMode: false, consent: false, busy: false, streaming: "" };
    S.view = "edit"; render();
  }
  function setPath(obj, path, val) {
    var ks = path.split("."), o = obj;
    for (var i = 0; i < ks.length - 1; i++) o = o[ks[i]];
    o[ks[ks.length - 1]] = val;
  }
  async function save(quiet) {
    var o = S.edit.obs;
    if (!o.title.trim() || !o.initial.trim()) {
      S.edit.step = 0; render();
      toast("請先填寫觀測點名稱與你的初步判讀。");
      setTimeout(function () { var el = !o.title.trim() ? $('[data-f="title"]') : $('[data-f="initial"]'); if (el) el.focus(); }, 50);
      return false;
    }
    o.savedAt = new Date().toISOString();
    try {
      await FN.store.put(o);
      S.edit.snapshot = JSON.stringify(o); S.edit.existing = true;
      S.list = await FN.store.all();
      if (!quiet) { toast("已儲存。原始判讀保留為第一版。"); render(true); }
      return true;
    } catch (e) {
      toast("儲存失敗：手機空間可能不足。請先匯出備份再重試。"); return false;
    }
  }
  async function leaveEditor() {
    if (!isDirty()) { S.edit = null; return true; }
    var r = await confirmSheet("還有未儲存的內容", "離開前要先儲存這筆觀測嗎？", [
      { id: "save", label: "儲存並離開", cls: "primary" }, { id: "discard", label: "放棄未存內容", cls: "" }, { id: "close", label: "繼續編輯", cls: "ghost" }]);
    if (r === "save") { if (await save(true)) { S.edit = null; return true; } return false; }
    if (r === "discard") { S.edit = null; return true; }
    return false;
  }

  /* 照片：縮到 1400px、JPEG 0.8，與原版相同 */
  function pickPhoto(capture) {
    var inp = $("#photo-input");
    if (capture) inp.setAttribute("capture", "environment"); else inp.removeAttribute("capture");
    inp.value = ""; inp.click();
  }
  async function loadPhoto(file) {
    if (!/^image\/(jpeg|png|webp|heic|heif)$/.test(file.type) && !/\.(jpe?g|png|webp|heic)$/i.test(file.name)) { toast("請選擇 JPG、PNG 或 WebP 照片。"); return; }
    if (file.size > 15e6) { toast("照片超過 15 MB，請改用較小的照片。"); return; }
    try {
      var url = URL.createObjectURL(file), img = new Image();
      await new Promise(function (res, rej) { img.onload = res; img.onerror = rej; img.src = url; });
      var k = Math.min(1, 1400 / Math.max(img.width, img.height)), c = document.createElement("canvas");
      c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
      var ctx = c.getContext("2d"); ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, c.width, c.height); ctx.drawImage(img, 0, 0, c.width, c.height);
      S.edit.obs.photo = c.toDataURL("image/jpeg", .8); S.edit.obs.strokes = []; URL.revokeObjectURL(url);
      render(true); toast("照片已加入草稿，記得儲存。");
    } catch (e) { toast("無法讀取這張照片，請改用 JPG 或 PNG。"); }
  }

  /* 照片畫線 */
  function bindAnnotation() {
    var svg = $("#anno"); if (!svg) return;
    var drawing = false, cur = null, line = null;
    function pt(e) { var r = svg.getBoundingClientRect(); return { x: Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)), y: Math.max(0, Math.min(1, (e.clientY - r.top) / r.height)) }; }
    svg.addEventListener("pointerdown", function (e) {
      if (!S.edit.drawMode) return;
      e.preventDefault(); svg.setPointerCapture(e.pointerId); drawing = true; cur = [pt(e)];
      line = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
      ["fill:none", "stroke:#ff3b2f", "stroke-width:4", "vector-effect:non-scaling-stroke", "stroke-linecap:round", "stroke-linejoin:round"].forEach(function (a) { var p = a.split(":"); line.setAttribute(p[0], p[1]); });
      svg.appendChild(line);
    });
    svg.addEventListener("pointermove", function (e) {
      if (!drawing || cur.length >= 3000) return;
      cur.push(pt(e)); line.setAttribute("points", cur.map(function (p) { return p.x * 1000 + "," + p.y * 1000; }).join(" "));
    });
    function end() {
      if (!drawing) return; drawing = false;
      if (cur.length > 1 && S.edit.obs.strokes.length < 200) S.edit.obs.strokes.push(cur);
      cur = null; render(true);
    }
    svg.addEventListener("pointerup", end); svg.addEventListener("pointercancel", end);
  }

  function gps() {
    if (!navigator.geolocation) { toast("這個瀏覽器不支援定位，請手動填入 WGS84 經緯度。"); return; }
    toast("正在取得定位…");
    navigator.geolocation.getCurrentPosition(function (p) {
      var o = S.edit.obs; o.lat = +p.coords.latitude.toFixed(6); o.lon = +p.coords.longitude.toFixed(6); o.accuracy = p.coords.accuracy;
      render(true); toast("定位已填入，精度約 " + Math.round(p.coords.accuracy) + " m，請核對。");
    }, function () { toast("沒有取得定位。請允許位置權限，或手動填入座標。"); }, { enableHighAccuracy: true, timeout: 12000 });
  }

  async function runAI() {
    var E = S.edit, o = E.obs;
    if (!E.consent) { toast("請先勾選同意傳送。"); return; }
    if (!(await save(true))) return;
    E.busy = true; E.streaming = ""; render(true);
    try {
      var res = await FN.ai.compare(o, function (t) {
        E.streaming = t; var el = $("#ai-stream");
        if (el) el.textContent = t; else render(true);
      });
      if (o.ai) { o.aiHistory.push({ at: (o.rockAnalysis && o.rockAnalysis.at) || o.savedAt || new Date().toISOString(), ai: o.ai, analysis: o.rockAnalysis || null }); if (o.aiHistory.length > 12) o.aiHistory = o.aiHistory.slice(-12); }
      o.ai = res.ai; if (res.analysis) o.rockAnalysis = res.analysis;
      E.busy = false; E.streaming = "";
      await save(true); render(true);
      toast("AI 建議已保存。請檢查證據與限制，再到第 4 步寫下你的比對。");
    } catch (err) {
      E.busy = false; E.streaming = ""; render(true);
      var c = err && err.code;
      toast(c === "not_granted" ? "沒有取得 AI 使用權限。" : c === "rate_limited" ? "AI 使用次數暫時達上限，請稍後再試。" : "AI 暫時無法回應或格式不完整，沒有產生替代答案。觀測已保留，稍後可重試。");
    }
  }

  /* ---------- 備份與匯出 ---------- */
  function stamp() { var d = new Date(); return d.getFullYear() + String(d.getMonth() + 1).padStart(2, "0") + String(d.getDate()).padStart(2, "0"); }
  async function deliver(filename, text, mime) {
    var blob = text instanceof Blob ? text : new Blob([text], { type: mime });
    try { if (await FN.ai.downloadsAvailable()) { await FN.ai.saveFile(filename, blob); toast("已送出下載：" + filename); return; } } catch (e) { if (e && e.code === "declined") return; }
    try {
      var file = new File([blob], filename, { type: mime });
      if (navigator.canShare && navigator.canShare({ files: [file] }) && /iPhone|iPad|Android/i.test(navigator.userAgent)) { await navigator.share({ files: [file], title: filename }); return; }
    } catch (e) { if (e && e.name === "AbortError") return; }
    var inFrame = false; try { inFrame = window.top !== window.self; } catch (e) { inFrame = true; }
    if (!inFrame) {
      var a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = filename; document.body.appendChild(a); a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000); toast("已下載：" + filename); return;
    }
    if (text instanceof Blob) { toast("這個環境不允許下載檔案。請用自架的 App 網址開啟後再匯出。"); return; }
    openSheet("<h2>複製備份內容</h2><div class=\"sheet-body\"><p class=\"muted small\">這個環境不允許直接下載。請複製下面的內容，貼到記事本並存成 <b>" + esc(filename) + '</b>。</p><textarea class="copy-area" readonly>' + esc(text.length > 2e6 ? text.slice(0, 2e6) : text) + '</textarea></div><div class="actions"><button class="btn primary block" data-sheet="copy">' + ic("copy") + '複製全部</button><button class="btn block" data-sheet="close">關閉</button></div>',
      async function (id) {
        if (id === "copy") { try { await navigator.clipboard.writeText(text); toast("已複製到剪貼簿。"); } catch (e) { var ta = $(".copy-area"); ta.select(); toast("請長按選取後手動複製。"); return; } }
        closeSheet();
      });
  }
  function dataMenu() {
    var n = S.list.length;
    openSheet("<h2>備份與匯出</h2><p class=\"small muted\" style=\"margin-top:4px\">共 " + n + " 筆觀測。換手機或清除瀏覽器資料前，請先匯出完整備份。</p>" +
      '<div class="sheet-body"><button class="menu-item" data-sheet="json"' + (n ? "" : " disabled") + ">" + ic("archive") + "<div><b>完整備份 JSON</b><span>包含照片與 AI 紀錄，可再匯入</span></div></button>" +
      '<button class="menu-item" data-sheet="csv"' + (n ? "" : " disabled") + ">" + ic("table") + "<div><b>資料表 CSV</b><span>用 Excel 或 Google 試算表開啟</span></div></button>" +
      '<button class="menu-item" data-sheet="pdf">' + ic("doc") + "<div><b>野外報告 PDF</b><span>答案、照片、位態與路線圖，傳給老師</span></div></button>" +
      '<button class="menu-item" data-sheet="kmz">' + ic("pin") + "<div><b>野外 KMZ（Google Earth）</b><span>停駐點答案、觀測照片與 GPS 軌跡</span></div></button>" +
      '<button class="menu-item" data-sheet="md"' + (n ? "" : " disabled") + ">" + ic("doc") + "<div><b>報告草稿 Markdown</b><span>含各停駐點通關問題答案</span></div></button>" +
      '<button class="menu-item" data-sheet="import">' + ic("upload") + "<div><b>匯入 JSON 備份</b><span>相同編號的觀測會更新</span></div></button></div>" +
      '<div class="actions"><button class="btn block" data-sheet="close">關閉</button></div>',
      function (id) {
        closeSheet();
        if (id === "json") deliver("fieldnote-" + stamp() + ".json", FN.exportJSON(S.list), "application/json");
        if (id === "csv") deliver("fieldnote-" + stamp() + ".csv", FN.exportCSV(S.list), "text/csv");
        if (id === "md") deliver("fieldnote-" + stamp() + ".md", FN.exportMarkdown(S.list, S.field), "text/markdown");
        if (id === "kmz") exportKMZ();
        if (id === "pdf") { if (!S.field.group.trim()) { go("field"); toast("請先在「野外」填寫組別再產生報告。"); } else makePDF(); }
        if (id === "import") setTimeout(function () { $("#import-input").click(); }, 200);
      });
  }
  async function importFile(file) {
    try {
      var data = JSON.parse(await file.text());
      var arr = Array.isArray(data) ? data : data.observations;
      if (!Array.isArray(arr)) throw 0;
      var count = 0;
      for (var i = 0; i < arr.length; i++) { if (arr[i] && typeof arr[i] === "object") { await FN.store.put(FN.normalize(arr[i])); count++; } }
      S.list = await FN.store.all(); render(true);
      toast("已匯入 " + count + " 筆觀測；相同編號已更新。");
    } catch (e) { toast("匯入失敗：請選擇 FIELDNOTE 匯出的 JSON 檔。"); }
  }

  /* ---------- 事件：點擊 ---------- */
  document.addEventListener("click", async function (e) {
    var sh = e.target.closest("[data-sheet]");
    if (sh) { var id = sh.dataset.sheet; if (id === "close" && !sheetHandler) closeSheet(); else if (sheetHandler) sheetHandler(id); else closeSheet(); return; }
    var b = e.target.closest("[data-act]"); if (!b) return;
    var a = b.dataset.act, v = b.dataset.v, E = S.edit;
    switch (a) {
      case "go": go(b.dataset.view); break;
      case "loc-start": locStart(); break;
      case "loc-stop": locStop(); break;
      case "stop": if (S.view === "edit") { if (!(await leaveEditor())) return; } S.stopId = b.dataset.id; S.view = "stop"; render(); break;
      case "new-here": var w0 = where(); newAtStop(w0 && w0.arrived ? w0.near.s.id : "", true); break;
      case "new-stop": newAtStop(b.dataset.id, false); break;
      case "map-to": var ms = stopById(b.dataset.id); S.map.cE = ms.E; S.map.cN = ms.N; S.map.mpp = 0.5; S.view = "field"; render(); setTimeout(function () { var m = $("#mapview"); if (m) m.scrollIntoView({ block: "center" }); }, 50); break;
      case "map-layer": S.map.layer = v; var keepY = window.scrollY; var ml = document.querySelector(".map-layers"); var mvOld = $("#mapview"); ml.outerHTML = ""; mvOld.outerHTML = mapHTML(); mapInit(); window.scrollTo(0, keepY); break;
      case "map-zoom": zoomAt(Number(v)); break;
      case "map-me":
        if (S.pos && S.locState === "on" && FN.geo.inArea(S.pos.E, S.pos.N)) { S.map.cE = S.pos.E; S.map.cN = S.pos.N; S.map.mpp = Math.min(S.map.mpp, 0.5); mapApply(); }
        else if (S.locState !== "on") { locStart(); toast("正在取得定位…"); }
        else toast("你目前不在手冊地圖範圍內。"); break;
      case "track-toggle":
        S.field.recording = !S.field.recording;
        if (S.field.recording) { locStart(); toast("開始記錄軌跡。請保持 App 畫面開啟。"); } else { FN.store.setKV("track", S.field.track); toast("已停止記錄，共 " + S.field.track.length + " 點。"); }
        render(true); break;
      case "track-clear":
        var rc = await confirmSheet("清除 GPS 軌跡？", "目前記錄的 " + S.field.track.length + " 個軌跡點會刪除。建議先匯出 KMZ。", [{ id: "del", label: "清除軌跡", cls: "danger" }, { id: "close", label: "取消" }]);
        if (rc === "del") { S.field.track = []; await FN.store.setKV("track", []); render(true); } break;
      case "kmz": exportKMZ(); break;
      case "pdf": makePDF(); break;
      case "ov-import": $("#overlay-input").click(); break;
      case "ov-toggle": var ol = allOverlays().find(function (x) { return x.id === b.dataset.id; }); S.ovOn[ol.id] = !ovVisible(ol); FN.store.setKV("ovOn", S.ovOn); refreshOverlayUI(); break;
      case "ov-del":
        var od = S.userOverlays.find(function (x) { return x.id === b.dataset.id; });
        var rd = await confirmSheet("移除「" + od.name + "」？", "只會從這支手機移除這個匯入的圖層，可以再匯入。", [{ id: "del", label: "移除", cls: "danger" }, { id: "close", label: "取消" }]);
        if (rd === "del") { S.userOverlays = S.userOverlays.filter(function (x) { return x.id !== od.id; }); await FN.store.setKV("overlays", S.userOverlays); refreshOverlayUI(); } break;
      case "clino-record":
        var cs = stopById(S.stopId), co = FN.newObservation("structure"); co.stopId = cs.id; co.title = "S" + cs.no + " " + cs.name + "－露頭";
        co.dip = Number(S.clino.dip); co.strike = (Number(S.clino.dd) - 90 + 360) % 360; co.instrument = "手機 Clino（傾角/傾向換算）";
        if (locFresh()) { co.lat = +S.pos.lat.toFixed(6); co.lon = +S.pos.lon.toFixed(6); co.accuracy = S.pos.acc; } else { co.lat = cs.lat; co.lon = cs.lon; }
        openEditor(co, false, 0); break;
      case "xa-add": E.obs.extraAttitudes.push({ kind: "節理", strike: null, dip: null }); render(true); break;
      case "xa-del": E.obs.extraAttitudes.splice(Number(v), 1); render(true); break;
      case "xa-kind": E.obs.extraAttitudes[Number(b.dataset.i)].kind = v; render(true); break;
      case "stop-pick": E.obs.stopId = v; render(true); break;
      case "use-here":
        if (locFresh()) { E.obs.lat = +S.pos.lat.toFixed(6); E.obs.lon = +S.pos.lon.toFixed(6); E.obs.accuracy = S.pos.acc; render(true); toast("已填入目前定位，精度約 " + Math.round(S.pos.acc) + " m。"); }
        else gps(); break;
      case "new":
        if (S.view === "edit") { if (!(await leaveEditor())) return; }
        openEditor(FN.newObservation(b.dataset.topic || "structure"), false); break;
      case "open": var o = await FN.store.get(b.dataset.id); if (o) openEditor(o, true); break;
      case "filter-topic": S.filter.topic = v; render(true); break;
      case "data-menu": dataMenu(); break;
      case "import": $("#import-input").click(); break;
      case "install": installApp(); break;
      /* 實驗室 */
      case "lab-view": if (v === "oblique") { S.lab.pitch = 33; S.lab.yaw = -28; } else if (v === "top") { S.lab.pitch = 90; S.lab.yaw = 0; } else { S.lab.pitch = 0; S.lab.yaw = S.lab.strike; } updateLab(); break;
      case "lab-step": var k = b.dataset.k, max = k === "dip" ? 90 : 359; S.lab[k] = k === "strike" ? (S.lab[k] + Number(b.dataset.d) + 360) % 360 : Math.max(0, Math.min(max, S.lab[k] + Number(b.dataset.d))); updateLab(true); break;
      case "lab-record": var no = FN.newObservation("structure"); no.strike = S.lab.strike; no.dip = S.lab.dip; openEditor(no, false, 1); break;
      /* 學習 */
      case "learn-tab": if (v === "lab") { go("lab"); break; } S.learn.tab = v; render(true); break;
      case "learn-topic": S.learn.topic = v; render(true); break;
      case "learn-lang": S.learn.en = !S.learn.en; render(true); break;
      case "quiz-pick": S.learn.quiz.picks[S.learn.quiz.i] = Number(v); render(true); break;
      case "quiz-next": var Q = S.learn.quiz; if (Q.i + 1 < FN.QUIZ.length) Q.i++; else Q.done = true; render(true); break;
      case "quiz-reset": S.learn.quiz = { i: 0, picks: [], done: false }; render(true); break;
      case "rock-group": S.learn.rockGroup = v; render(true); break;
      case "rock-detail": rockDetail(b.dataset.id); break;
      case "go-rocks": rockLibrarySheet(); break;
      case "ask": askAssistant(); break;
      /* 編輯器 */
      case "leave": var backStop = S.edit && S.edit.obs.stopId; if (await leaveEditor()) { if (backStop && S.prevView === "stop") { S.stopId = backStop; S.view = "stop"; } else S.view = S.prevView === "field" ? "field" : "records"; render(); } break;
      case "step": E.step = Number(v); E.drawMode = false; render(); break;
      case "topic": if (E.obs.topic !== v) { E.obs.topic = v; E.obs.features = []; render(true); } break;
      case "choose": setPath(E.obs, b.dataset.path, v); render(true); break;
      case "feature": var fs = E.obs.features, ix = fs.indexOf(v); if (ix >= 0) fs.splice(ix, 1); else fs.push(v); render(true); break;
      case "north": E.obs.north = v; render(true); break;
      case "photo-camera": pickPhoto(true); break;
      case "photo-pick": case "photo-replace": pickPhoto(false); break;
      case "draw-toggle": E.drawMode = !E.drawMode; render(true); break;
      case "undo-stroke": E.obs.strokes.pop(); render(true); break;
      case "gps": gps(); break;
      case "preview-plane": previewPlane(E.obs); break;
      case "ai": runAI(); break;
      case "save": save(); break;
      case "edit-menu": editMenu(); break;
    }
  });

  function rockLibrarySheet() {
    openSheet("<h2>岩性辨識卡</h2><p class=\"small muted\" style=\"margin-top:4px\">點選一種岩性看辨識提醒。</p><div class=\"rock-grid sheet-body\">" + rockListHTML(FN.ROCKS) + '</div><div class="actions"><button class="btn block" data-sheet="close">關閉</button></div>');
  }
  function previewPlane(o) {
    var s = Number(o.strike), d = Number(o.dip);
    openSheet("<h2>位態檢查</h2><p class=\"small muted\" style=\"margin-top:4px\">走向 " + pad3(s) + "°、傾角 " + d + "°" + (d && d !== 90 ? "，傾向 " + pad3(dipDir(s)) + "°" : "") + '</p><div class="sheet-body">' + planeSVG(s, d, -28, 33) + '</div><div class="actions"><button class="btn block" data-sheet="close">關閉</button></div>');
  }
  function editMenu() {
    openSheet("<h2>這筆觀測</h2><div class=\"sheet-body\">" +
      '<button class="menu-item" data-sheet="save">' + ic("save") + "<div><b>儲存</b><span>保存目前所有內容</span></div></button>" +
      (S.edit.existing ? '<button class="menu-item" data-sheet="delete">' + ic("trash") + "<div><b style=\"color:var(--rust)\">刪除這筆觀測</b><span>刪除後無法復原</span></div></button>" : "") +
      '</div><div class="actions"><button class="btn block" data-sheet="close">關閉</button></div>',
      async function (id) {
        closeSheet();
        if (id === "save") save();
        if (id === "delete") {
          var r = await confirmSheet("刪除「" + (S.edit.obs.title || "未命名觀測") + "」？", "照片、位態與 AI 紀錄會一起刪除，無法復原。建議先匯出備份。", [{ id: "del", label: "確認刪除", cls: "danger" }, { id: "close", label: "取消", cls: "" }]);
          if (r === "del") { await FN.store.remove(S.edit.obs.id); S.list = await FN.store.all(); S.edit = null; S.view = "records"; render(); toast("已刪除。"); }
        }
      });
  }
  async function askAssistant() {
    var L = S.learn;
    if (!L.ask.trim()) { toast("請先輸入問題。"); return; }
    if (!L.askConsent) { toast("請先勾選同意傳送。"); return; }
    L.asking = true; L.answer = ""; render(true);
    try {
      L.answer = await FN.ai.ask(L.ask, function (t) { L.answer = t; var el = $("#ask-answer"); if (el) el.innerHTML = '<div class="ai-card"><div class="top"><span class="chip ai">AI 回答中</span></div><div class="ai-text">' + esc(t) + "</div></div>"; });
    } catch (e) { L.answer = "目前無法連線到 AI 服務。你仍可查閱學習卡，稍後再試。"; }
    L.asking = false; render(true);
  }

  /* ---------- 事件：輸入 ---------- */
  document.addEventListener("input", function (e) {
    var t = e.target;
    if (t.dataset.f && S.edit) {
      var k = t.dataset.f, val = t.value;
      if (t.type === "number") { val = val === "" ? null : Number(val); if (val !== null && isNaN(val)) return; }
      setPath(S.edit.obs, k, val);
      if (k === "lat" || k === "lon") S.edit.obs.accuracy = null;
      if (k === "title") { var h = $(".editor-head h1"); if (h) h.textContent = val || "新增觀測"; }
      if (k === "strike" || k === "dip") updateDipLine();
      refreshSaveState(); return;
    }
    if (t.dataset.followup !== undefined && S.edit) {
      var A = S.edit.obs.rockAnalysis, i = Number(t.dataset.followup), q = A.report.questions[i], id = A.at + "-" + i;
      S.edit.obs.followups = S.edit.obs.followups.filter(function (f) { return f.id !== id; }).concat([{ id: id, question: q.question, answer: t.value }]);
      refreshSaveState(); return;
    }
    if (t.dataset.ans !== undefined) { S.field.answers[t.dataset.ans] = t.value; saveAnswers(); return; }
    if (t.hasAttribute("data-group")) { S.field.group = t.value; FN.store.setKV("group", t.value); return; }
    if (t.hasAttribute("data-members")) { S.field.members = t.value; FN.store.setKV("members", t.value); return; }
    if (t.dataset.clino) {
      S.clino = S.clino || { dip: "", dd: "" }; S.clino[t.dataset.clino] = t.value;
      var c = S.clino, ok = c.dip !== "" && c.dd !== "" && !isNaN(c.dip) && !isNaN(c.dd);
      $("#clino-out").innerHTML = clinoOut(ok ? ((Number(c.dd) - 90 + 360) % 360) : null, c.dip);
      $('[data-act="clino-record"]').disabled = !ok; return;
    }
    if (t.dataset.eclino && S.edit) {
      var row = t.closest(".attitude"), dipI = row.querySelector('[data-eclino="dip"]'), ddI = row.querySelector('[data-eclino="dd"]');
      if (dipI.value !== "" && ddI.value !== "") {
        S.edit.obs.dip = Number(dipI.value); S.edit.obs.strike = (Number(ddI.value) - 90 + 360) % 360;
        $('[data-f="strike"]').value = S.edit.obs.strike; $('[data-f="dip"]').value = S.edit.obs.dip; updateDipLine(); refreshSaveState();
      }
      return;
    }
    if (t.dataset.xa && S.edit) {
      var parts = t.dataset.xa.split("."), xv = t.value === "" ? null : Number(t.value);
      S.edit.obs.extraAttitudes[Number(parts[0])][parts[1]] = xv; refreshSaveState(); return;
    }
    if (t.dataset.filter) { S.filter[t.dataset.filter] = t.value; var f = S.filter, q2 = f.q.toLowerCase();
      $("#record-list").innerHTML = recordListHTML(S.list.filter(function (o) { return (f.topic === "all" || o.topic === f.topic) && (o.title + " " + o.notes + " " + o.initial).toLowerCase().indexOf(q2) >= 0; })); return; }
    if (t.dataset.learn) {
      S.learn[t.dataset.learn] = t.value;
      if (t.dataset.learn === "q") $("#lesson-list").innerHTML = lessonListHTML();
      if (t.dataset.learn === "rockQ") { var L = S.learn, rq = t.value.toLowerCase(); $("#rock-list").innerHTML = rockListHTML(FN.ROCKS.filter(function (r) { return (L.rockGroup === "all" || r.group === L.rockGroup) && (r.zh + " " + r.en).toLowerCase().indexOf(rq) >= 0; })); }
      return;
    }
    if (t.dataset.lab) {
      var key = t.dataset.lab, max = key === "dip" ? 90 : 359, nv = Number(t.value);
      if (t.value === "" || isNaN(nv)) return;
      S.lab[key] = Math.max(0, Math.min(max, Math.round(nv))); updateLab(true);
    }
  });
  document.addEventListener("change", function (e) {
    var t = e.target;
    if (t.id === "photo-input" && t.files && t.files[0]) loadPhoto(t.files[0]);
    if (t.id === "import-input" && t.files && t.files[0]) { importFile(t.files[0]); t.value = ""; }
    if (t.id === "overlay-input" && t.files && t.files[0]) { importOverlay(t.files[0]); t.value = ""; }
    if (t.hasAttribute("data-consent") && S.edit) { S.edit.consent = t.checked; render(true); }
    if (t.dataset.learnCheck) { S.learn[t.dataset.learnCheck] = t.checked; }
  });
  function updateDipLine() {
    var o = S.edit.obs, el = $("#dd-line"); if (!el) return;
    if (o.dip === 0) el.innerHTML = "<span>水平面沒有唯一走向／傾向。</span>";
    else if (o.dip === 90) el.innerHTML = "<span>垂直面兩側等價，請記錄採用的方向慣例。</span>";
    else if (o.strike !== null && o.dip !== null) el.innerHTML = '<span>傾向（右手定則）</span><b class="num">' + dipDir(o.strike).toFixed(1).replace(/\.0$/, "") + "°</b>";
    else el.innerHTML = "<span>沒有量測時留白，不要讓 AI 猜測角度。</span>";
    var pb = $('[data-act="preview-plane"]'); if (pb) pb.disabled = o.strike === null || o.dip === null;
  }

  /* 實驗室：拖曳旋轉 */
  var drag = null;
  document.addEventListener("pointerdown", function (e) { var s = e.target.closest('[data-drag="lab"]'); if (s) drag = { x: e.clientX, yaw: S.lab.yaw }; });
  document.addEventListener("pointermove", function (e) { if (!drag) return; S.lab.yaw = drag.yaw + (e.clientX - drag.x) * .5; updateLab(); });
  document.addEventListener("pointerup", function () { drag = null; });

  /* 頂部陰影 */
  window.addEventListener("scroll", function () { $("#topbar").classList.toggle("scrolled", window.scrollY > 4); }, { passive: true });
  window.addEventListener("hashchange", function () { var h = location.hash.slice(1); if (VIEWS.indexOf(h) >= 0 && h !== S.view && S.view !== "edit") { S.view = h; render(); } });
  window.addEventListener("beforeunload", function (e) { if (isDirty()) { e.preventDefault(); e.returnValue = ""; } });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && $("#sheet-root .sheet")) { if (sheetHandler) sheetHandler("close"); else closeSheet(); } });

  /* ---------- 加到主畫面 ---------- */
  var installEvt = null;
  window.addEventListener("beforeinstallprompt", function (e) { e.preventDefault(); installEvt = e; });
  function installApp() {
    if (installEvt) { installEvt.prompt(); installEvt = null; return; }
    var ios = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    openSheet("<h2>加到手機主畫面</h2><div class=\"sheet-body\">" + (ios
      ? "<p>1. 用 <b>Safari</b> 開啟本 App 的網址。</p><p>2. 點下方的「分享」按鈕。</p><p>3. 選「加入主畫面」，再按「新增」。</p>"
      : "<p>1. 用 <b>Chrome</b> 開啟本 App 的網址。</p><p>2. 點右上角「⋮」選單。</p><p>3. 選「安裝應用程式」或「加到主畫面」。</p>") +
      '<p class="small muted" style="margin-top:14px">在 claude.ai 預覽中無法安裝；請使用教師提供的 App 網址。</p></div><div class="actions"><button class="btn block" data-sheet="close">知道了</button></div>');
  }

  /* ---------- 啟動 ---------- */
  async function start() {
    S.persistent = await FN.store.init();
    S.list = await FN.store.all();
    S.field.answers = await FN.store.getKV("answers", {}); S.field.track = await FN.store.getKV("track", []); S.field.group = await FN.store.getKV("group", ""); S.field.members = await FN.store.getKV("members", "");
    S.userOverlays = await FN.store.getKV("overlays", []); S.ovOn = await FN.store.getKV("ovOn", {});
    var h = location.hash.slice(1); if (VIEWS.indexOf(h) >= 0) S.view = h;
    render();
    FN.ai.available().then(function (ok) { S.aiAvail = ok; if (S.view !== "home") render(true); });
    if ("serviceWorker" in navigator && location.protocol === "https:") {
      try { navigator.serviceWorker.register("sw.js").catch(function () {}); } catch (e) {}
    }
  }
  start();
})();
