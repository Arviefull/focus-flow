# Как залить Focus Flow на GitHub

Ниже два способа: через сайт GitHub без командной строки и через терминал. Если Git не установлен или команда `git` не работает, используйте первый способ.

## Способ 1: через сайт GitHub

1. Откройте [github.com/new](https://github.com/new).
2. В поле **Repository name** напишите:

```text
focus-flow
```

3. Оставьте репозиторий **Public**, если хотите показать проект в профиле.
4. Не добавляйте README, `.gitignore` и лицензию на сайте, потому что они уже есть в проекте.
5. Нажмите **Create repository**.
6. На странице нового репозитория нажмите **uploading an existing file**.
7. Перетащите в окно GitHub все файлы из папки:

```text
D:\GitHub\focus-flow
```

8. В поле commit message напишите:

```text
Create Focus Flow app
```

9. Нажмите **Commit changes**.

## Способ 2: через терминал

Перед этим установите Git: [git-scm.com/downloads](https://git-scm.com/downloads).

Затем выполните:

```bash
cd D:\GitHub\focus-flow
git init
git add .
git commit -m "Create Focus Flow app"
git branch -M main
git remote add origin https://github.com/Arviefull/focus-flow.git
git push -u origin main
```

## Как включить GitHub Pages

После загрузки проекта:

1. Откройте репозиторий `focus-flow` на GitHub.
2. Перейдите в **Settings**.
3. В левом меню откройте **Pages**.
4. В блоке **Build and deployment** выберите:

```text
Source: Deploy from a branch
Branch: main
Folder: /root
```

5. Нажмите **Save**.

Через несколько минут сайт будет доступен по адресу:

```text
https://arviefull.github.io/focus-flow/
```

## Что написать в описании репозитория

Короткое описание:

```text
Minimal focus timer with tasks, stats, dark mode and localStorage.
```

Темы для репозитория:

```text
javascript
html
css
pomodoro
productivity
localstorage
focus-timer
github-pages
```

## Что закрепить в профиле

После загрузки можно закрепить репозиторий в профиле GitHub:

1. Откройте свой профиль.
2. Нажмите **Customize your pins**.
3. Выберите `focus-flow`.
4. Сохраните изменения.
