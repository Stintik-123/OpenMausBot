@echo off
REM OpenMausBot Russian locale setup (Windows)
cd /d "%~dp0"

if not exist "src\locales\en.json" (
  echo Error: run from OpenMausBot repo root.
  exit /b 1
)

if not exist "src\locales\ru.json" (
  echo Error: src\locales\ru.json missing.
  exit /b 1
)

echo Russian locale: src\locales\ru.json
echo.
echo Next steps:
echo   1) pnpm install
echo   2) pnpm dev   or   pnpm dev:desktop
echo   3) Settings - General - Russkiy
echo.
echo Done.
pause
