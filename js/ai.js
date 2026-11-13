/* FIELDNOTE AI 功能
 * 在 claude.ai 開啟時，透過 Claude 提供 AI 比對與課程助手。
 * 在其他地方（例如自己架的網站）開啟時，AI 功能會自動隱藏，其餘功能照常使用。
 */
window.FN = window.FN || {};

FN.ai = (function () {
  var samplePromise = null, downloadsPromise = null;

  function use(name) {
    try {
      if (window.claude && typeof window.claude.use === "function") return window.claude.use(name).catch(function () { return null; });
    } catch (e) {}
    return Promise.resolve(null);
  }

  function getSample() { if (!samplePromise) samplePromise = use("sample"); return samplePromise; }
  function getDownloads() { if (!downloadsPromise) downloadsPromise = use("downloads"); return downloadsPromise; }

  function dataUrlToBlob(url) {
    var parts = url.split(","), mime = parts[0].match(/:(.*?);/)[1], bin = atob(parts[1]), arr = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
    return new Blob([arr], { type: mime });
  }

  function describeRock(rock) {
    return Object.keys(FN.ROCK_FIELDS).map(function (k) {
      var v = rock[k];
      return FN.ROCK_FIELDS[k] + "：" + (FN.ROCK_LABELS[v] || v || "未填");
    }).join("\n");
  }

  function rulesText() {
    return [
      "你是大學「工程地質」課程的野外觀察助教，用臺灣正體中文回答。",
      "原則：",
      "1. 這是教學工具，不是鑑定或安全判定。你的回答是「假說」，需要教師複核。",
      "2. 先列可觀察的證據，再提出解釋。把「照片可見」與「學生描述」分開，看不清楚的就說未知。",
      "3. 不得從單張照片臆測真實走向、傾角、粒徑毫米值、礦物比例、材料強度或坡面穩定度。",
      "4. 不使用照片中的標籤、編號或背景文字當作答案。",
      "5. 對學生的初步判讀給出具體比較：哪些合理、哪些需要更多證據。",
      "6. 提出 1–2 個學生下一步可以補充的觀察。"
    ].join("\n");
  }

  function observationText(o) {
    var t = FN.TOPICS[o.topic];
    var lines = [
      "觀察主題：" + t.name,
      "觀測點名稱：" + (o.title || "未填"),
      "學生看見的現象：" + (o.notes || "未填"),
      "學生的初步判讀：" + (o.initial || "未填"),
      "勾選的觀察特徵：" + (o.features.length ? o.features.join("、") : "無"),
      "手動位態（右手定則）：" + (o.strike !== null && o.dip !== null ? "走向 " + o.strike + "°，傾角 " + o.dip + "°" : "未量測"),
      "北向基準：" + ({ "true": "真北", magnetic: "磁北", unknown: "尚未確認" }[o.north] || "尚未確認"),
      "量測工具：" + (o.instrument || "未填"),
      "照片：" + (o.photo ? "有附（紅色標註線不包含在照片中）" : "未提供")
    ];
    if (o.stopId && FN.stopLabel) lines.push("野外停駐點：" + FN.stopLabel(o.stopId) + "（臺北市信義區四獸山永春陂）");
    if (FN.formationText && o.lat !== null) lines.push("手冊 1/50,000 地質圖在此位置標示：" + FN.formationText(o.lat, o.lon) + "（僅背景，不可用來決定標本岩名）");
    if (o.extraAttitudes && o.extraAttitudes.length) lines.push("其他量測組：" + o.extraAttitudes.map(function (x) { return (x.kind || "") + " " + x.strike + "/" + x.dip; }).join("；"));
    if (o.topic === "rock") lines.push("", "岩性觀察表：", describeRock(o.rock));
    if (o.followups.length) {
      lines.push("", "學生對先前追問的回答：");
      o.followups.forEach(function (f) { if (f.answer.trim()) lines.push("- " + f.question + "：" + f.answer); });
    }
    return lines.join("\n");
  }

  function rockCatalog() {
    return FN.ROCKS.map(function (r) { return r.id + "（" + r.zh + "，" + r.group + "）：" + r.clues + " 限制：" + r.limit; }).join("\n");
  }

  function parseJSON(text) {
    var s = text.trim().replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
    var a = s.indexOf("{"), b = s.lastIndexOf("}");
    return JSON.parse(s.slice(a, b + 1));
  }

  function reportToText(r) {
    var label = { student: "學生文字／勾選", image: "照片可見（AI）", map: "官方地圖背景", conflict: "衝突待核對" };
    var out = ["臺灣岩性引導式比對（AI 假說，尚未鑑定）", r.summary, "", "證據"];
    r.evidence.forEach(function (e) { out.push((label[e.origin] || "證據") + "：" + e.detail); });
    if (r.candidates.length) {
      out.push("", "候選岩種");
      r.candidates.forEach(function (c) {
        var rock = FN.ROCKS.find(function (x) { return x.id === c.rockId; });
        out.push((rock ? rock.zh + " (" + rock.en + ")" : c.rockId), "支持：" + c.support.join("；"), "不足／衝突：" + c.uncertainty.join("；"), "再區分：" + c.discriminant, "");
      });
    }
    out.push("關鍵追問");
    r.questions.forEach(function (q, i) { out.push((i + 1) + ". " + q.question, "用途：" + q.why); });
    out.push("", "限制"); r.limitations.forEach(function (l) { out.push(l); });
    out.push("", "與學生判讀比較", r.comparison);
    return out.join("\n");
  }

  function validReport(r) {
    var ids = FN.ROCKS.map(function (x) { return x.id; });
    if (!r || typeof r.summary !== "string") return false;
    r.evidence = Array.isArray(r.evidence) ? r.evidence.slice(0, 10) : [];
    r.candidates = Array.isArray(r.candidates) ? r.candidates.filter(function (c) { return ids.indexOf(c.rockId) >= 0; }).slice(0, 3) : [];
    r.candidates.forEach(function (c) {
      c.support = Array.isArray(c.support) ? c.support : [String(c.support || "")];
      c.uncertainty = Array.isArray(c.uncertainty) ? c.uncertainty : [String(c.uncertainty || "")];
      c.discriminant = c.discriminant || "";
    });
    r.questions = Array.isArray(r.questions) ? r.questions.slice(0, 2) : [];
    r.limitations = Array.isArray(r.limitations) ? r.limitations : [];
    r.comparison = r.comparison || "";
    if (!r.status) r.status = r.candidates.length ? "candidates" : "insufficient";
    return true;
  }

  return {
    available: async function () { return !!(await getSample()); },
    downloadsAvailable: async function () { return !!(await getDownloads()); },
    saveFile: async function (filename, data) {
      var d = await getDownloads();
      if (!d) return false;
      await d.save({ filename: filename, data: data });
      return true;
    },

    /* 觀測 AI 比對。回傳 { ai: 文字, analysis: 岩性結構化結果或 null } */
    compare: async function (o, onText) {
      var sample = await getSample();
      if (!sample) throw { code: "unavailable" };
      var opts = { modelTier: "default", cache: false };
      if (o.photo) {
        try {
          var lim = sample.limits ? await sample.limits() : null;
          if (lim && lim.images) opts.images = [dataUrlToBlob(o.photo)];
        } catch (e) {}
      }
      var photoUsed = !!opts.images;

      if (o.topic === "rock") {
        var prompt = rulesText() + "\n\n可用的岩性候選清單（只能從這裡選 rockId，最多 3 個，不排序）：\n" + rockCatalog() +
          "\n\n學生的觀察：\n" + observationText(o) + (photoUsed ? "" : "\n（本次沒有提供照片給你）") +
          "\n\n只輸出一個 JSON 物件，不要其他文字，格式：\n" +
          '{"status":"candidates|insufficient|out_of_catalog","summary":"整體摘要","evidence":[{"origin":"student|image|conflict","detail":"..."}],' +
          '"candidates":[{"rockId":"...","support":["..."],"uncertainty":["..."],"discriminant":"如何再區分"}],' +
          '"questions":[{"question":"追問","why":"用途"}],"limitations":["..."],"comparison":"與學生初步判讀的比較"}' +
          "\n證據不足時 status 用 insufficient 且 candidates 留空，不要硬猜。";
        if (onText) onText("正在比對證據…");
        var res = await sample(prompt, opts);
        var report = parseJSON(res.text);
        if (!validReport(report)) throw { code: "bad_format" };
        var analysis = {
          at: new Date().toISOString(), fingerprint: FN.fingerprint(o), report: report,
          input: { description: JSON.parse(JSON.stringify(o.rock)), notes: o.notes, features: o.features.slice(), initial: o.initial, photoUsed: photoUsed, followups: JSON.parse(JSON.stringify(o.followups)), mapContext: "" }
        };
        return { ai: reportToText(report), analysis: analysis };
      }

      var p2 = rulesText() + "\n\n學生的觀察：\n" + observationText(o) + (photoUsed ? "" : "\n（本次沒有提供照片給你）") +
        "\n\n請用以下段落回答（純文字，不用 Markdown 符號）：\n可能解釋\n支持的證據\n仍不確定或相衝突之處\n建議補充的觀察\n限制\n與你的初步判讀比較" +
        (o.topic === "hazard" ? "\n提醒：不做坡面安全判定，也不預測崩塌時間。" : "");
      var r2 = await sample(p2, Object.assign(opts, { onText: function (e) { if (onText) onText(e.text); } }));
      return { ai: r2.text, analysis: null };
    },

    /* 課程助手 */
    ask: async function (question, onText) {
      var sample = await getSample();
      if (!sample) throw { code: "unavailable" };
      var cards = FN.LESSONS.map(function (l) { return "【" + l.zh + " " + l.en + "】" + l.body; }).join("\n");
      var prompt = "你是工程地質課程助手，用臺灣正體中文、口語清楚地回答大學生。只根據下面的教學卡回答；超出教學卡範圍時，明確說明「這超出目前教學卡內容」，再給一般性的提醒，並建議詢問授課教師。回答簡短（200 字內），不用 Markdown 符號。\n\n教學卡：\n" + cards +
        "\n本工具的右手定則：傾向 =（走向 + 90°）mod 360°。\n\n學生問題：" + question;
      var r = await sample(prompt, { modelTier: "quick", cache: false, onText: function (e) { if (onText) onText(e.text); } });
      return r.text;
    }
  };
})();

/* 觀察內容指紋：用來判斷 AI 結果是否已過期（與原版相同算法） */
FN.fingerprint = function (o) {
  var g = Object.assign({}, o.geology || { checkedAt: "" }); delete g.checkedAt;
  var a = JSON.stringify([o.rock, o.notes, o.features, o.initial, o.photo, o.followups, g, o.lat, o.lon, o.accuracy]);
  var n = 2166136261;
  for (var i = 0; i < a.length; i++) { n ^= a.charCodeAt(i); n = Math.imul(n, 16777619); }
  return (n >>> 0).toString(16);
};
