// 讓接收頁載入一次後可離線使用：有網路時拿最新版，沒網路才用快取
var CACHE = 'qr-transfer-v2';
var FILES = ['./', 'index.html', 'sender-ie11.html', 'vendor/zxing-reader.js', 'vendor/zxing_reader.wasm'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.open(CACHE).then(function (cache) {
    return fetch(e.request).then(function (res) {
      if (res && res.ok && new URL(e.request.url).origin === location.origin) cache.put(e.request, res.clone());
      return res;
    }).catch(function () {
      return cache.match(e.request, { ignoreSearch: true });
    });
  }));
});
