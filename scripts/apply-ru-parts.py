#!/usr/bin/env python3
"""Merge .transwork/ru-parts/*.json into src/locales/ru.json"""
import json
from pathlib import Path
root = Path(__file__).resolve().parents[1]
parts_dir = root / ".transwork" / "ru-parts"
out = root / "src" / "locales" / "ru.json"
merged = {}
for p in sorted(parts_dir.glob("*.json")):
    merged.update(json.loads(p.read_text(encoding="utf-8")))
out.write_text(json.dumps(merged, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Wrote {len(merged)} keys to {out}")
