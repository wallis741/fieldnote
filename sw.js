/* FIELDNOTE 離線快取
 * 更新 App 內容後，把 VERSION 改一個新值，手機下次開啟就會換成新版。
 */
var VERSION = "fieldnote-v2.2.0";
var CORE = ["./", "./index.html", "./css/app.css", "./js/data.js", "./js/store.js", "./js/ai.js", "./js/app.js", "./js/fieldmaps.js", "./js/fieldtrip.js", "./js/kmz.js", "./js/overlaydata.js", "./js/overlays.js", "./js/report.js",
  "./maps/aerial.jpg", "./maps/street.jpg", "./maps/topo.jpg", "./maps/geology.jpg", "./maps/geo111.jpg",
  "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/apple-touch-icon.png"];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(CORE); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);
  var isFont = /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (url.origin !== location.origin && !isFont) return;
  /* 自己的檔案：先用網路取最新版，離線時用快取；字型：先用快取 */
  if (isFont) {
    e.respondWith(caches.match(req).then(function (hit) {
      return hit || fetch(req).then(function (res) { var copy = res.clone(); caches.open(VERSION).then(function (c) { c.put(req, copy); }); return res; });
    }));
    return;
  }
  e.respondWith(fetch(req).then(function (res) {
    if (res.ok) { var copy = res.clone(); caches.open(VERSION).then(function (c) { c.put(req, copy); }); }
    return res;
  }).catch(function () { return caches.match(req).then(function (hit) { return hit || caches.match("./index.html"); }); }));
});
