#!/usr/bin/env bash
# OpenMausBot Russian locale setup
# Usage: bash setup-ru.sh
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

if [[ ! -f src/locales/en.json ]]; then
  echo "Error: run this from the OpenMausBot repo root (src/locales/en.json not found)."
  exit 1
fi

if [[ ! -f src/locales/ru.json ]]; then
  echo "Error: src/locales/ru.json missing."
  exit 1
fi

echo "Russian locale file: src/locales/ru.json"
if command -v python3 >/dev/null 2>&1; then
  echo "Keys: $(python3 -c "import json; print(len(json.load(open('src/locales/ru.json'))))")"
fi
echo ""
echo "Next steps:"
echo "  1) pnpm install"
echo "  2) pnpm i18n:check   # optional"
echo "  3) pnpm dev   or   pnpm dev:desktop"
echo "  4) Settings → General → Русский"
echo ""
echo "Done."
