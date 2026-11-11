# QR 傳檔

用螢幕上的 QR Code 把檔案從一台不能連網的電腦傳到手機。

- `sender-ie11.html`：傳送端。單一檔案、無外部依賴、純 ES5，可在 IE11 開啟。把檔案切片成標準 QR Code（Version 1～40、容錯 L）輪播。
- `index.html`：接收端。手機瀏覽器開啟，鏡頭對著傳送端畫面，自動依頁碼重組並下載。解碼全在手機本機完成，不上傳任何資料。

## 用法

1. 把 `sender-ie11.html` 存到離線電腦，用瀏覽器開啟，選檔案，格式選「帶頁碼標籤」，按「自動輪播」。
2. 手機開接收頁，按「開始掃描」，對著畫面直到全部頁收齊。
3. 按「下載檔案」，核對兩邊顯示的 CRC32 相同。

每張 QR 的內容格式：`頁/總頁|檔名|Base64 片段`。

## 第三方元件

`vendor/` 內為 [zxing-wasm](https://github.com/Sec-ant/zxing-wasm)（MIT），授權見 `vendor/zxing-wasm-LICENSE.txt`。
