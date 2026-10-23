const fs = require("fs");

// Usage: node scripts/tmp-merge.cjs <translations-dir>   -> writes src/locales/ru.json
//        node scripts/tmp-merge.cjs --report             -> shows coverage + missing prefixes
const dir = "/workspace/.transwork";
const en = JSON.parse(fs.readFileSync("/workspace/src/locales/en.json", "utf8"));
const keep = JSON.parse(fs.readFileSync("/tmp/ru-keep.json", "utf8"));

const merged = {};
if (process.argv[2] !== "--report") {
  const tdir = process.argv[2];
  for (const f of fs.readdirSync(tdir).filter((x) => x.endsWith(".json")).sort()) {
    const obj = JSON.parse(fs.readFileSync(`${tdir}/${f}`, "utf8"));
    for (const [k, v] of Object.entries(obj)) {
      if (!(k in en)) { console.log(`WARN unknown key in ${f}: ${k}`); continue; }
      if (typeof v !== "string" || !v.trim()) { console.log(`WARN empty value ${k} in ${f}`); continue; }
      merged[k] = v;
    }
  }
}

const ph = (s) => [...String(s).matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(",");
const problems = [];
const final = {};
for (const k of Object.keys(en)) {
  const v = merged[k] ?? keep[k];
  if (v === undefined) continue;
  if (ph(v) !== ph(en[k])) { problems.push(k); continue; }
  final[k] = v;
}
const done = Object.keys(final).length;
console.log(`translated ${done}/${Object.keys(en).length}; placeholder problems: ${problems.length}`, problems.slice(0, 20));

if (process.argv[2] === "--report") {
  const missing = Object.keys(en).filter((k) => !(k in final));
  const groups = {};
  for (const k of missing) { const p = k.split(".")[0]; groups[p] = (groups[p] || 0) + 1; }
  console.log("missing by prefix:", JSON.stringify(groups, null, 0));
  return;
}

fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(`${dir}/ru.json`, JSON.stringify(final, null, 2) + "\n");
console.log(`wrote ${dir}/ru.json (${done} keys)`);
