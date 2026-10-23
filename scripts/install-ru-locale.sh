#!/usr/bin/env bash
# Apply Russian locale into an existing OpenMausBot checkout
# Usage: bash scripts/install-ru-locale.sh /path/to/OpenMausBot
set -euo pipefail
TARGET="${1:-.}"
SRC="$(cd "$(dirname "$0")/.." && pwd)"
if [[ ! -f "$TARGET/src/locales/en.json" ]]; then
  echo "Usage: $0 /path/to/OpenMausBot"
  exit 1
fi
cp "$SRC/src/locales/ru.json" "$TARGET/src/locales/ru.json"
echo "Installed ru.json"
echo "Then: cd $TARGET && pnpm install && pnpm dev"
