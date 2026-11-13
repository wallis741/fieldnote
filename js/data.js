/* FIELDNOTE 教學內容資料
 * 要新增或修改教學卡、測驗、岩性卡，只要改這個檔案。
 * 每一筆都是一般的 JavaScript 物件，照現有格式複製一份再改內容即可。
 */
window.FN = window.FN || {};

/* 三個觀察主題 */
FN.TOPICS = {
  structure: {
    name: "構造與位態", en: "Structures", code: "St", color: "var(--c-structure)",
    intro: "先找出真正的層面，再記錄走向與傾角。",
    features: ["層理 Bedding", "節理 Joint", "葉理 Foliation", "斷層 Fault", "褶皺 Fold", "接觸面 Contact"],
    prompts: ["這個面是層面、節理，還是葉理？", "是否記下傾向與北向基準？", "哪些照片或線索支持你的判讀？"]
  },
  rock: {
    name: "岩性辨識", en: "Lithology", code: "Li", color: "var(--c-rock)",
    intro: "先描述看見的證據，不急著替岩石命名。",
    features: ["可見顆粒 Visible grains", "結晶組織 Crystalline", "層狀構造 Layering", "葉理 Foliation", "孔隙 Vesicles", "風化表面 Weathering"],
    prompts: ["顆粒大小、形狀與組成如何？", "照片有比例尺與新鮮面嗎？", "哪些證據支持或反對你的岩性推測？"]
  },
  hazard: {
    name: "坡地災害", en: "Slope processes", code: "Sl", color: "var(--c-hazard)",
    intro: "從安全觀察位置記錄材料、運動方式與水的作用。",
    features: ["落石 Rockfall", "滑動 Sliding", "傾倒 Toppling", "流動 Flow", "裂縫 Cracks", "滲水 Seepage"],
    prompts: ["看到的是岩塊、土體，還是混合材料？", "有什麼證據能區分滑動、傾倒與流動？", "坡頂、坡面與坡趾有哪些可觀察的變化？"]
  }
};

/* 教材依據（學習卡引用） */
FN.SOURCES = [
  { name: "MIT · Field Geology I", url: "https://ocw.mit.edu/courses/12-114-field-geology-i-fall-2005/a391b59f5ccbdd60df56b2ea5abe198e_2005_lab01.pdf" },
  { name: "USGS · Rock and mineral", url: "https://www.usgs.gov/faqs/what-difference-between-a-rock-and-a-mineral" },
  { name: "USGS · Landslide Types and Processes", url: "https://pubs.usgs.gov/fs/2004/3072/fs-2004-3072.html" }
];

/* 學習卡：source 對應上面 FN.SOURCES 的索引 */
FN.LESSONS = [
  { topic: "structure", zh: "走向", en: "Strike", source: 0,
    body: "地質平面與水平面的交線方向。本工具採傾向在走向順時針 90° 的右手定則；輸入的是走向方位角，不是傾向。",
    english: "The bearing of the horizontal line on a geological plane. Here, dip direction is 90° clockwise from right-hand-rule strike." },
  { topic: "structure", zh: "傾角與傾向", en: "Dip & dip direction", source: 0,
    body: "傾角是平面沿最陡方向向下，與水平面形成的角度，範圍 0–90°。傾向是這個向下方向的方位角；水平面沒有唯一傾向。",
    english: "Dip is the steepest downward inclination of a plane, from 0° to 90°. Dip direction is its azimuth; a horizontal plane has no unique dip direction." },
  { topic: "rock", zh: "火成岩", en: "Igneous rock", source: 1,
    body: "由熔融物質冷卻結晶形成。先記錄顆粒、晶體與組織；單張照片不足以保證岩石分類正確。",
    english: "Forms when molten rock cools and solidifies. Record grains, crystals and texture before proposing an identification." },
  { topic: "rock", zh: "沉積岩", en: "Sedimentary rock", source: 1,
    body: "由既有岩石碎屑、曾經生存的生物等物質累積形成，常見層理。層狀外觀應搭配顆粒與組成一起判讀。",
    english: "Forms from accumulated pre-existing rock fragments or material from organisms. Bedding is common; examine texture and composition as well." },
  { topic: "rock", zh: "變質岩", en: "Metamorphic rock", source: 1,
    body: "既有岩石受熱、壓力或流體等作用而改變。觀察礦物排列、葉理與原有組織是否保存，避免把所有平行面都當成層理。",
    english: "Pre-existing rock altered by heat, pressure or fluids. Record mineral alignment, foliation and preserved textures." },
  { topic: "hazard", zh: "落石", en: "Rockfall", source: 2,
    body: "岩塊自陡坡或岩壁分離後，以自由落下、彈跳或滾動方式移動。從安全距離觀察來源區、路徑與堆積物，不靠近活動岩壁。",
    english: "Detached rock moves by free fall, bouncing or rolling. Record source, path and deposits from a safe observation point." },
  { topic: "hazard", zh: "滑動", en: "Slide", source: 2,
    body: "沿明顯的破壞面或剪切帶移動，可分旋轉型與平移型。層面方向只是一項證據，不能單憑位態判定坡面安全。",
    english: "Movement along a rupture surface or shear zone, including rotational and translational slides. Orientation alone is not a stability assessment." },
  { topic: "hazard", zh: "傾倒與土石流", en: "Topple & debris flow", source: 2,
    body: "傾倒以岩土單元向前旋轉為特徵；土石流是土石與水等混合物沿坡向下流動。先辨識運動方式，再提出機制假說。",
    english: "Toppling involves forward rotation. Debris flow is downslope flow of a mixture including debris and water. Identify movement before inferring a mechanism." }
];

/* 測驗題：correct 是正確選項的索引（從 0 開始） */
FN.QUIZ = [
  { q: "走向（右手定則）030°、傾角 40°，傾向是多少？", options: ["030°", "120°", "300°"], correct: 1,
    why: "此處約定傾向 =（走向 + 90°）mod 360°，因此為 120°。" },
  { q: "照片看起來有平行線，最合適的下一步是？", options: ["直接判定為沉積岩", "檢查顆粒、組成與平面特徵", "讓 AI 直接決定"], correct: 1,
    why: "先保留可觀察證據，再比較岩性與構造的不同解釋；平行線不等於已確認層理。" },
  { q: "看見坡面裂縫後，這個 app 應該提供什麼？", options: ["宣布坡面安全", "預測幾分鐘後崩塌", "協助記錄並交由教師或專業人員確認"], correct: 2,
    why: "此工具服務教學觀察，不提供即時預警或工程安全判定。" }
];

/* 岩性辨識卡參照書目 */
FN.ROCK_SOURCES = {
  general: { name: "地質知識網：岩石", apa: "劉德慶（2013年5月23日）。岩石。地質知識網。", url: "https://twgeoref.gsmma.gov.tw/GipOpenWeb/wSite/ct?xItem=143272&ctNode=1233&mp=105" },
  microscope: { name: "科博館：偏光顯微鏡下的岩石世界", apa: "國立自然科學博物館（無日期）。偏光顯微鏡下的岩石世界。", url: "https://libknowledge.nmns.edu.tw/nmns/lib/PDF/91/179/10.htm" },
  nanhu: { name: "科博館：南湖大山", apa: "莊文星（無日期）。南湖大山。國立自然科學博物館。", url: "https://libknowledge.nmns.edu.tw/nmns/lib/PDF/90/162/08.htm" },
  meta: { name: "Panchuk：變質岩分類", apa: "Panchuk, K. (2024). 10.3: Classification of metamorphic rocks. Geosciences LibreTexts.", url: "https://geo.libretexts.org/Bookshelves/Geology/Physical_Geology_(Panchuk)/10:_Metamorphism_and_Metamorphic_Rocks/10.03:_Classification_of_Metamorphic_Rocks" },
  mud: { name: "Rygel & Quinton：泥質岩", apa: "Rygel, M., & Quinton, P. (2026). 5.3: Mudrocks. Geosciences LibreTexts.", url: "https://geo.libretexts.org/Courses/SUNY_Potsdam/Sedimentary_Geology:_Rocks_Environments_and_Stratigraphy/05:_Siliciclastic_Sedimentary_Rocks/5.03:_Mudrocks" },
  terms: { name: "USGS：岩性分類詞彙", apa: "U.S. Geological Survey. (n.d.). Lithologic classification of geologic map units.", url: "https://apps.usgs.gov/thesaurus/thesaurus-full.php?thcode=4" },
  andesite: { name: "地質知識網：安山岩", apa: "劉德慶（2013年5月23日）。安山岩。地質知識網。", url: "https://twgeoref.gsmma.gov.tw/GipOpenWeb/wSite/ct?xItem=143276&ctNode=1233&mp=105" },
  basalt: { name: "地質知識網：玄武岩", apa: "劉德慶（2013年5月23日）。玄武岩。地質知識網。", url: "https://twgeoref.gsmma.gov.tw/GipOpenWeb/wSite/ct?xItem=143274&ctNode=1233&mp=105" },
  structures: { name: "Waldron & Snyder：構造詞彙", apa: "Waldron, J., & Snyder, M. (2021). Glossary. In Geological structures: A practical introduction. Geosciences LibreTexts.", url: "https://geo.libretexts.org/Bookshelves/Geology/Geological_Structures_-_A_Practical_Introduction_(Waldron_and_Snyder)/zz:_Back_Matter/11:_Glossary" },
  geology: { name: "地質雲：五萬分之一地質圖地層資料", apa: "經濟部地質調查及礦業管理中心（無日期）。五萬分之一地質圖：地層［資料集］。地質雲加值應用平臺。擷取於2026年10月19日。", url: "https://www.geologycloud.tw/data/zh-tw/Stratum?all=true" }
};

/* 14 種臺灣岩性辨識卡 */
FN.ROCKS = [
  { id: "sandstone", zh: "砂岩", en: "Sandstone", group: "沉積岩",
    clues: "以砂粒尺度碎屑為主，可記錄顆粒、膠結與細粒基質；石英、長石與岩屑是可比較的組成。",
    limit: "顏色或有無節理不是充分依據。未量粒徑時不可從無比例尺照片填入毫米值。",
    next: "放大觀察顆粒邊界、形狀，以及是否保留碎屑與膠結關係。", sources: ["terms", "microscope"] },
  { id: "mudstone", zh: "泥岩（暫採廣義）", en: "Mudstone", group: "沉積岩",
    clues: "細粒泥質碎屑岩；泥質岩命名存在不同分類慣例。本版在粒徑與頁狀劈裂未確認時保留廣義泥岩候選。",
    limit: "不能把「肉眼看不到顆粒」直接等同泥岩；照片不能測出黏土比例。",
    next: "觀察既有斷面是否呈明顯薄頁狀裂開，並與頁岩候選比較。", sources: ["mud", "terms"] },
  { id: "shale", zh: "頁岩", en: "Shale", group: "沉積岩",
    clues: "細粒泥質岩，具明顯頁狀劈裂，可沿薄頁狀面分開；先記錄劈裂外觀與沉積層次。",
    limit: "頁狀劈裂不等於已確認板劈理，深灰色也不能區分頁岩與板岩。",
    next: "從側面比較顏色／粒度層次與薄片面的關係，不要只看一個平面。", sources: ["mud", "meta"] },
  { id: "conglomerate", zh: "礫岩", en: "Conglomerate", group: "沉積岩",
    clues: "由礫級碎屑與較細基質組成，典型碎屑直徑大於 2 mm，可呈圓至次稜角狀。",
    limit: "沒有比例尺就不能確認粒徑；孤立的大晶體不可直接當成礫石。",
    next: "附比例尺拍攝，描述碎屑外形、組成差異與基質。", sources: ["terms"] },
  { id: "limestone", zh: "石灰岩", en: "Limestone", group: "沉積岩",
    clues: "以碳酸鈣為主的沉積岩。生物礁石灰岩可見珊瑚、有孔蟲或貝殼等遺骸。",
    limit: "不是所有石灰岩都看得見化石；白色不能證明是石灰岩，也不能與大理岩直接區分。",
    next: "找已有表面上的生物碎片、沉積組織或晶體；礦物或化學測試交教師安排。", sources: ["terms", "microscope"] },
  { id: "metasandstone", zh: "變質砂岩", en: "Metasandstone", group: "變質岩",
    clues: "臺灣南湖的變質砂岩可同時保存層理與發育劈理；因此有層理不代表未經變質。",
    limit: "本卡證據是特定地區案例，不是所有變質砂岩都具相同外觀。不能只因岩石堅硬或位於中央山脈就判定；也不可直接等同石英岩。",
    next: "比較砂質組織與劈理／礦物定向關係，必要時由教師用薄片確認。", sources: ["nanhu", "microscope"],
    context: "南湖案例包含變質砂岩與板岩；案例不是地點自動判種規則。" },
  { id: "slate", zh: "板岩", en: "Slate", group: "變質岩",
    clues: "細粒變質岩，具板劈理，常沿較平整平行面成薄板；組成礦物可小到肉眼難辨。",
    limit: "薄板外形本身不能證明板劈理；需與頁岩及千枚岩比較，也要排除加工面。不要單靠薄片面與層次是否平行定名。",
    next: "補拍側面與不同反光角度，結合平面、層次與細微礦物的關係比較。", sources: ["meta", "terms", "nanhu"],
    context: "南湖資料記載灰黑色板岩，但顏色並非所有板岩的固定條件。" },
  { id: "phyllite", zh: "千枚岩", en: "Phyllite", group: "變質岩",
    clues: "細粒葉理狀變質岩，細微礦物常使表面呈絲絹光澤；葉理面可較波狀。",
    limit: "潮濕、照明或拋光反射不能直接當成絲絹光澤；沒有明確單顆晶體不排除本候選。",
    next: "在不改變標本的情況下轉動光照角度，分辨整面柔和光澤與單顆亮片。", sources: ["meta", "terms"] },
  { id: "schist", zh: "片岩", en: "Schist", group: "變質岩",
    clues: "明顯葉理／片理，片狀或柱狀礦物具有定向排列；常可見獨立雲母晶體反光。",
    limit: "不能將每一個亮點都稱雲母，也不能僅用一條色帶判為片理。礦物修飾名稱需額外證據。",
    next: "補近照與側照，觀察可見晶體是否一致定向，而不是只看顏色。", sources: ["meta", "microscope"] },
  { id: "gneiss", zh: "片麻岩", en: "Gneiss", group: "變質岩",
    clues: "可見晶體與不同礦物組成的明暗帶或透鏡狀組織；帶狀構造可能連續，也可能不連續。",
    limit: "黑白斑點不一定是片麻狀組織；需比較花崗岩或其他結晶岩。",
    next: "換面觀察深色礦物是否形成可追蹤的帶或透鏡，而非隨機散布。", sources: ["meta", "terms"] },
  { id: "marble", zh: "大理岩", en: "Marble", group: "變質岩",
    clues: "主要由再結晶方解石或白雲石組成，常見粒狀、糖粒狀晶體組織；顏色可因其他成分而變。",
    limit: "白色或亮晶體本身不足以辨識；不能只靠照片確認碳酸鹽礦物。",
    next: "觀察晶體鑲嵌、是否保留沉積組織，與石灰岩比較；實體測試由教師安排。", sources: ["meta", "terms", "microscope"] },
  { id: "granite", zh: "花崗岩類（初步候選）", en: "Granitic rock", group: "火成岩",
    clues: "花崗岩為粗粒侵入岩，常見石英、長石與雲母等礦物，可觀察晶體鑲嵌組織。",
    limit: "粗粒黑白相間只支持結晶岩候選，沒有確認礦物種類與比例時不能確定為狹義花崗岩。",
    next: "分別拍淺色、半透明與深色顆粒近照，並比較是否存在真正礦物條帶。", sources: ["microscope", "terms"] },
  { id: "andesite", zh: "安山岩", en: "Andesite", group: "火成岩",
    clues: "常為灰黑、灰或灰白色，具細至中粒基質，常見斑狀組織；可含斜長石與角閃石、輝石等。",
    limit: "灰色或有斑晶不能單獨區分安山岩與其他火山岩；礦物或化學組成仍可能需要驗證。",
    next: "拍清楚斑晶與基質，記錄晶體形狀、大小差異與可確認的來源。", sources: ["andesite"],
    context: "官方資料記載大屯火山群、觀音山及海岸山脈等地有安山岩；不等於當地每一塊石頭都是安山岩。" },
  { id: "basalt", zh: "玄武岩", en: "Basalt", group: "火成岩",
    clues: "多黑至暗灰色，礦物細小或呈玻璃質，常緻密，有時具氣孔；常含斜長石、輝石與橄欖石。",
    limit: "不是所有玄武岩都有孔洞或柱狀節理；深色及節理都不足以單獨定名。",
    next: "觀察基質、孔洞與晶體，核對標本來源；需要時與安山岩比較。", sources: ["basalt", "microscope"],
    context: "官方資料記載澎湖群島及臺灣其他地點的玄武岩；地點只提供背景。" }
];

/* 岩性觀察表的欄位名稱與選項文字 */
FN.ROCK_FIELDS = {
  sampleSource: "樣本來源", originKnown: "採集地是否已知", originLocation: "已知採集地／來源",
  color: "顏色", surface: "表面狀態", moisture: "乾濕狀態", grain: "顆粒觀察",
  grainSize: "估測粒徑與依據", texture: "顆粒關係", bedding: "層理", cleavage: "岩石劈理",
  foliation: "礦物定向／葉理", joints: "節理", jointSets: "節理組數", jointSpacing: "節理間距與依據",
  luster: "光澤", fossils: "化石或生物碎片", vesicles: "孔洞", veins: "脈體", minerals: "疑似礦物與其他特徵"
};
FN.ROCK_LABELS = {
  unknown: "不知道", yes: "觀察到", notSeen: "看過，未見", unclear: "不確定",
  outcrop: "原地露頭", loose: "河床／地表鬆散石頭", specimen: "教學／收藏標本", no: "來源不明",
  fresh: "較新鮮的面", weathered: "風化表面", polished: "切割／拋光面", dry: "乾燥", wet: "潮濕",
  notVisible: "看不清個別顆粒", sand: "像砂粒", gravel: "可見礫石狀碎屑", crystals: "可見個別晶體", mixed: "大小顆粒混合",
  clastic: "碎屑與基質／膠結", interlocking: "晶體相互鑲嵌", porphyritic: "大晶體包在細基質中",
  dull: "偏暗淡", silky: "整面絲絹光澤", sparkly: "個別顆粒反光"
};
FN.ROCK_OPTIONS = {
  sampleSource: ["unknown", "outcrop", "loose", "specimen"],
  originKnown: ["unknown", "yes", "no"],
  surface: ["unknown", "fresh", "weathered", "polished"],
  moisture: ["unknown", "dry", "wet"],
  grain: ["unknown", "notVisible", "sand", "gravel", "crystals", "mixed"],
  texture: ["unknown", "clastic", "interlocking", "porphyritic", "unclear"],
  luster: ["unknown", "dull", "silky", "sparkly", "unclear"],
  presence: ["unknown", "yes", "notSeen", "unclear"]
};
FN.ROCK_HELP = {
  originKnown: "採集地不是拍照的位置；來源不明時不以地點推定岩種。",
  bedding: "顏色或顆粒是否分層？不確定是否為層理時選「不確定」。",
  cleavage: "這裡指岩石劈理。可描述既有薄片面，不需敲開標本。",
  foliation: "礦物是否大致平行，或形成可追蹤的條帶？",
  joints: "節理獨立紀錄，不單靠有無節理決定岩名。"
};
