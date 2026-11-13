/* FIELDNOTE 資料儲存：筆記存在這支手機的瀏覽器（IndexedDB）。
 * 瀏覽器不支援時退回記憶體（關掉頁面就會消失，畫面會提醒使用者）。
 */
window.FN = window.FN || {};

FN.uuid = function () {
  if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
};

FN.blankRock = function () {
  return {
    sampleSource: "unknown", originKnown: "unknown", originLocation: "", color: "", surface: "unknown",
    moisture: "unknown", grain: "unknown", grainSize: "", texture: "unknown", bedding: "unknown",
    cleavage: "unknown", foliation: "unknown", joints: "unknown", jointSets: "", jointSpacing: "",
    luster: "unknown", fossils: "unknown", vesicles: "unknown", veins: "unknown", minerals: ""
  };
};

FN.newObservation = function (topic) {
  return {
    id: FN.uuid(), title: "", topic: topic || "structure", createdAt: new Date().toISOString(),
    notes: "", initial: "", strike: null, dip: null, lat: null, lon: null, accuracy: null,
    north: "unknown", instrument: "未使用／尚未記錄", features: [], photo: "", strokes: [],
    ai: "", revision: "", feedback: "", rock: FN.blankRock(), followups: [], rockAnalysis: null,
    aiHistory: [], geology: null, savedAt: null, stopId: "", extraAttitudes: []
  };
};

/* 把匯入或舊版資料補齊欄位，格式與原版 FIELDNOTE 的 JSON 備份相容 */
FN.normalize = function (o) {
  var base = FN.newObservation(FN.TOPICS[o && o.topic] ? o.topic : "structure");
  var out = Object.assign(base, o || {});
  out.rock = Object.assign(FN.blankRock(), (o && o.rock) || {});
  ["features", "strokes", "followups", "aiHistory", "extraAttitudes"].forEach(function (k) { if (!Array.isArray(out[k])) out[k] = []; });
  ["strike", "dip", "lat", "lon", "accuracy"].forEach(function (k) {
    out[k] = out[k] === null || out[k] === undefined || out[k] === "" || isNaN(Number(out[k])) ? null : Number(out[k]);
  });
  if (!out.id) out.id = FN.uuid();
  if (!out.savedAt) out.savedAt = out.createdAt;
  return out;
};

FN.store = (function () {
  var DB = "fieldnote", STORE = "observations", KV = "kv", db = null, memory = {}, memKV = {}, persistent = false;

  function open() {
    return new Promise(function (resolve) {
      try {
        if (!window.indexedDB) return resolve(null);
        var req = indexedDB.open(DB, 2);
        req.onupgradeneeded = function () {
          var d = req.result;
          if (!d.objectStoreNames.contains(STORE)) d.createObjectStore(STORE, { keyPath: "id" });
          if (!d.objectStoreNames.contains(KV)) d.createObjectStore(KV);
        };
        req.onsuccess = function () { resolve(req.result); };
        req.onerror = function () { resolve(null); };
        req.onblocked = function () { resolve(null); };
      } catch (e) { resolve(null); }
    });
  }
  function tx(mode, fn, store) {
    return new Promise(function (resolve, reject) {
      var t = db.transaction(store || STORE, mode), s = t.objectStore(store || STORE), result;
      var r = fn(s);
      if (r) r.onsuccess = function () { result = r.result; };
      t.oncomplete = function () { resolve(result); };
      t.onerror = function () { reject(t.error); };
    });
  }

  return {
    init: async function () {
      db = await open();
      persistent = !!db;
      if (db && navigator.storage && navigator.storage.persist) {
        try { navigator.storage.persist(); } catch (e) {}
      }
      return persistent;
    },
    isPersistent: function () { return persistent; },
    all: async function () {
      var list = db ? await tx("readonly", function (s) { return s.getAll(); }) : Object.values(memory);
      return (list || []).map(FN.normalize).sort(function (a, b) { return (b.createdAt || "").localeCompare(a.createdAt || ""); });
    },
    get: async function (id) {
      var o = db ? await tx("readonly", function (s) { return s.get(id); }) : memory[id];
      return o ? FN.normalize(o) : null;
    },
    put: async function (o) {
      var copy = JSON.parse(JSON.stringify(o));
      if (db) await tx("readwrite", function (s) { s.put(copy); });
      else memory[copy.id] = copy;
      return copy;
    },
    remove: async function (id) {
      if (db) await tx("readwrite", function (s) { s.delete(id); });
      else delete memory[id];
    },
    /* 小型設定與野外資料（通關問題答案、軌跡、組別） */
    getKV: async function (key, fallback) {
      try {
        var v = db ? await tx("readonly", function (s) { return s.get(key); }, KV) : memKV[key];
        return v === undefined ? fallback : v;
      } catch (e) { return fallback; }
    },
    setKV: async function (key, value) {
      try {
        if (db) await tx("readwrite", function (s) { s.put(JSON.parse(JSON.stringify(value)), key); }, KV);
        else memKV[key] = value;
      } catch (e) {}
    }
  };
})();

/* ---------- 匯出 ---------- */
FN.exportJSON = function (list) {
  return JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), observations: list.map(function (o) {
    var c = Object.assign({}, o); delete c.savedAt; return c;
  }) }, null, 2);
};

FN.exportCSV = function (list) {
  var cols = ["title", "topic", "stop", "createdAt", "notes", "initial", "strike", "dip", "dipDirection", "north", "instrument", "lat", "lon", "accuracy", "twd97E", "twd97N", "formation", "features", "otherAttitudes", "revision", "feedback"];
  function cell(v) { v = v === null || v === undefined ? "" : String(v); return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; }
  var rows = [cols.join(",")];
  list.forEach(function (o) {
    var d = Object.assign({}, o, {
      topic: FN.TOPICS[o.topic] ? FN.TOPICS[o.topic].name : o.topic,
      dipDirection: o.strike !== null && o.dip ? ((o.strike + 90) % 360).toFixed(1) : "",
      features: (o.features || []).join("；"),
      stop: FN.stopLabel ? FN.stopLabel(o.stopId) : o.stopId,
      twd97E: o.lat !== null && FN.geo ? FN.geo.toTWD97(o.lat, o.lon).E.toFixed(1) : "",
      twd97N: o.lat !== null && FN.geo ? FN.geo.toTWD97(o.lat, o.lon).N.toFixed(1) : "",
      formation: FN.formationText ? FN.formationText(o.lat, o.lon) : "",
      otherAttitudes: (o.extraAttitudes || []).map(function (a) { return (a.kind || "") + " " + a.strike + "/" + a.dip; }).join("；")
    });
    rows.push(cols.map(function (k) { return cell(d[k]); }).join(","));
  });
  return "﻿" + rows.join("\n");
};

FN.exportMarkdown = function (list, field) {
  var out = ["# FIELDNOTE 野外筆記報告草稿", "", "匯出時間：" + new Date().toLocaleString("zh-TW"), ""];
  if (field && FN.TRIP) {
    var T = FN.TRIP;
    out.push("## " + T.course + "　" + T.title, "", "- 日期：" + T.date, "- 組別：" + (field.group || "（未填）"), "");
    T.stops.forEach(function (st) {
      out.push("### 停駐點 " + st.no + "　" + st.name, "");
      st.questions.forEach(function (q, i) {
        out.push("**" + (i + 1) + ". " + q + "**", "", (field.answers[st.id + ":" + i] || "（未作答）"), "");
      });
    });
  }
  list.forEach(function (o, i) {
    var t = FN.TOPICS[o.topic];
    out.push("## " + (i + 1) + ". " + (o.title || "未命名觀測"));
    out.push("", "- 主題：" + (t ? t.name : o.topic), "- 日期：" + new Date(o.createdAt).toLocaleDateString("zh-TW"));
    if (o.strike !== null && o.dip !== null) out.push("- 位態（右手定則）：走向 " + o.strike + "°／傾角 " + o.dip + "°，傾向 " + ((o.strike + 90) % 360).toFixed(1) + "°");
    if (o.stopId && FN.stopLabel) out.push("- 停駐點：" + FN.stopLabel(o.stopId));
    if (o.lat !== null && o.lon !== null) out.push("- 位置（WGS84）：" + o.lat.toFixed(5) + ", " + o.lon.toFixed(5) + (FN.formationText ? "（手冊地質圖：" + FN.formationText(o.lat, o.lon) + "）" : ""));
    (o.extraAttitudes || []).forEach(function (a, k) { out.push("- 其他量測 " + (k + 1) + "（" + (a.kind || "未分類") + "）：走向 " + a.strike + "°／傾角 " + a.dip + "°"); });
    if (o.features.length) out.push("- 觀察特徵：" + o.features.join("、"));
    out.push("", "### 我看見的現象", "", o.notes || "（未填）", "", "### 我的初步判讀", "", o.initial || "（未填）", "");
    if (o.ai) out.push("### AI 建議（尚待人工驗證）", "", o.ai, "");
    if (o.revision) out.push("### 比對與修正理由", "", o.revision, "");
    if (o.feedback) out.push("### 教師／助教回饋", "", o.feedback, "");
  });
  return out.join("\n");
};
