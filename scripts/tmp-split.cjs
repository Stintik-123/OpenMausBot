const fs = require("fs");
const en = require("/workspace/src/locales/en.json");
const ru = require("/workspace/src/locales/ru.json");

const ph = (s) => [...String(s).matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(",");
const out = {};
let dropped = [];
for (const k of Object.keys(ru)) {
  if (!(k in en)) { dropped.push(k + " (no key)"); continue; }
  if (ph(en[k]) === ph(ru[k])) out[k] = ru[k];
  else dropped.push(k + " (placeholders)");
}
console.log("kept", Object.keys(out).length, "dropped", dropped.length, dropped);
fs.writeFileSync("/tmp/ru-keep.json", JSON.stringify(out, null, 2));

const missing = Object.keys(en).filter((k) => !(k in out));
console.log("missing", missing.length);
const batches = [];
let cur = {};
for (const k of missing) {
  cur[k] = en[k];
  if (Object.keys(cur).length >= 45) { batches.push(cur); cur = {}; }
}
if (Object.keys(cur).length) batches.push(cur);
fs.mkdirSync("/tmp/batches", { recursive: true });
batches.forEach((b, i) => {
  fs.writeFileSync(`/tmp/batches/${String(i).padStart(3, "0")}.json`, JSON.stringify(b, null, 2));
});
console.log("batches", batches.length);
