// 背景解碼執行緒：收一張影像 (RGBA)，回傳裡面所有 QR 的內容與位置
importScripts('zxing-reader.js');

var ready = ZXingWASM.prepareZXingModule({
  overrides: { locateFile: function (path) { return path; } },   // wasm 與這支程式放在同一個資料夾
  fireImmediately: true
});
ready.then(function () { postMessage({ ready: true }); },
           function (e) { postMessage({ fatal: String(e && e.message || e) }); });

onmessage = function (ev) {
  var d = ev.data;
  ready.then(function () {
    return ZXingWASM.readBarcodes(new ImageData(new Uint8ClampedArray(d.buf), d.w, d.h), {
      formats: ['QRCode'], tryHarder: true, tryRotate: false, tryInvert: false,
      tryDownscale: false, maxNumberOfSymbols: 40
    });
  }).then(function (rs) {
    var items = [], i, r;
    for (i = 0; i < rs.length; i++) {
      r = rs[i];
      if (r.isValid) items.push({ text: r.text, bytes: r.bytes, position: r.position });
    }
    postMessage({ id: d.id, items: items });
  }).catch(function (e) {
    postMessage({ id: d.id, items: [], error: String(e && e.message || e) });
  });
};
