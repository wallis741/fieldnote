# FIELDNOTE 工程地質學習筆記 v2.0

學生用的手機野外筆記 App（PWA）。不需要安裝商店、不需要伺服器，筆記存在每支手機自己的瀏覽器裡。

## 檔案結構

```
index.html              App 入口
css/app.css             介面樣式（顏色在最上面的 :root）
js/data.js              教學內容：主題、學習卡、測驗、14 種岩性卡、書目  ← 最常修改
js/fieldtrip.js         野外課程：停駐點座標、學習目標、通關問題、補充資料、座標換算
js/fieldmaps.js         手冊地圖的座標範圍（TWD97）與地質圖地層網格（自動產生）
js/kmz.js               KMZ 匯出（停駐點、觀測照片、GPS 軌跡）
js/report.js            PDF 野外報告（在手機上產生，不經伺服器）
js/overlays.js          疊加圖資：匯入 KML/KMZ/GeoJSON、判斷位置是否在敏感區內
js/overlaydata.js       內建疊加圖資（由 tools/import_overlay.py 產生）
tools/import_overlay.py 把 SHP/KML/GeoJSON 裁切到手冊範圍並寫入內建圖資
maps/                   從手冊裁切、校正座標的 5 張地圖
js/store.js             資料儲存（IndexedDB）、匯入、匯出 JSON/CSV/Markdown
js/ai.js                AI 比對與課程助手（只在 claude.ai 開啟時可用）
js/app.js               畫面與操作流程
manifest.webmanifest    App 名稱、圖示、主題色
sw.js                   離線快取
icons/                  App 圖示
```

全部是一般的 HTML、CSS、JavaScript，不需要編譯或安裝套件，改完存檔重新整理就生效。

## 讓學生用手機安裝

1. 把整個資料夾放到任何靜態網站空間，例如 GitHub Pages、Netlify 或 Cloudflare Pages（必須是 https 網址）。
2. 學生用手機開啟網址：
   - iPhone：Safari → 分享 → 加入主畫面
   - Android：Chrome → ⋮ → 安裝應用程式
3. 安裝後可以離線使用，拍照、定位、匯出備份都能正常運作。

## 常見維護

**新增測驗題**：在 `js/data.js` 的 `FN.QUIZ` 加一筆，`correct` 是正確答案的位置（從 0 開始）。

**新增學習卡**：在 `FN.LESSONS` 加一筆，`topic` 填 `structure`、`rock` 或 `hazard`，`source` 是 `FN.SOURCES` 的索引。

**新增岩性卡**：在 `FN.ROCKS` 加一筆，`id` 用英文小寫且不重複，`sources` 填 `FN.ROCK_SOURCES` 裡的代號。

**換主色**：改 `css/app.css` 最上面的 `--primary`，以及 `manifest.webmanifest` 的 `theme_color`。

**發布更新**：改完內容後，把 `sw.js` 第一行的 `VERSION` 改成新值（例如 `fieldnote-v2.0.1`），學生手機下次開啟就會更新。

## 野外課程（四獸山永春陂 2026/11/14）

- 停駐點座標取自手冊第 4 頁路線圖的星號，依圖框 TWD97 格線換算成 WGS84，誤差約數公尺。
- 「所在地層」來自手冊第 7 頁五萬分之一地質圖，整理成 10 m 網格；界線附近 20 m 內會提示「接近地層界線」。
- 換一次野外課程：改 `js/fieldtrip.js` 的 `FN.TRIP`；新地圖需要重新裁切並更新 `js/fieldmaps.js` 的座標範圍。
- GPS 軌跡只在 App 畫面開啟時記錄（瀏覽器限制），手機鎖定時會暫停。

## 學生繳交 PDF 報告

「野外」分頁最下方填組別、組員，按「產生 PDF 報告」。報告包含封面與作答概況、路線圖（停駐點、觀測點、GPS 軌跡）、各站通關問題答案、觀測照片（含畫線標註）、位態、觀察與判讀。手機會跳出分享選單，可直接用 LINE 或 Email 傳給老師；資料不會上傳到任何伺服器。

## 加入疊加圖資（山崩雲、土石流潛勢溪流等）

- 學生或老師可以在 App「野外 → 疊加圖資 → 匯入」放入 KML、KMZ 或 GeoJSON，只會存在那支手機。
- 要讓全班都有：在電腦上執行
  `python3 tools/import_overlay.py --id sens --name "山崩與地滑地質敏感區" --color "#d1495b" --source "地礦中心" 檔案.zip`
  再重新上傳網站（記得改 sw.js 的 VERSION）。
- 開啟定位後，App 會顯示你是否位在多邊形範圍內，以及 50 m 內的線狀、點狀圖資（例如 DF029 潛勢溪流）。

## 資料相容性

匯入、匯出的 JSON 格式和原版 FIELDNOTE 相同（`version: 1`），舊版匯出的備份可以直接匯入，AI 比對紀錄也會保留。

## 和原版的差異

- 原版需要後端伺服器與「筆記識別碼」；新版改為存在手機本機，不需要帳號。
- 「GPS 查詢地層」原本靠伺服器查官方 GeoJSON，新版改為提供官方地質圖台連結；舊紀錄裡已查過的地層資料仍會顯示。
- AI 比對與課程助手在 claude.ai 開啟時可用；自架網址上會自動隱藏，改用自我檢查問題。
