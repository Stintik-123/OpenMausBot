# Русская локализация OpenMausBot

## Быстрый старт

```bash
git clone https://github.com/Stintik-123/OpenMausBot.git
cd OpenMausBot
bash setup-ru.sh
pnpm install
pnpm dev:desktop   # или pnpm dev
```

В приложении: **Настройки → Общие → Русский**.

## Что переведено

- Настройки приложения (разделы, профиль, тема, уведомления)
- Провайдеры моделей и проверка CLI
- Выбор модели и уровень усилия
- Настройки бота, новый бот, отделы
- API-ключи, подтверждения, базовый чат/сайдбар

Остальные строки пока на английском (fallback).

## Release

Чтобы опубликовать setup-zip в GitHub Releases:

1. GitHub → **Actions** → **Release Russian locale pack** → **Run workflow**
2. Или вручную: **Releases** → **Create a new release** → tag `ru-v0.1.0` → прикрепите zip с `src/locales/ru.json` + `setup-ru.sh`

Скачать исходники ветки main:
https://github.com/Stintik-123/OpenMausBot/archive/refs/heads/main.zip
