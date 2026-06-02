# Deploy Focus Flow To GitHub

This guide shows two ways to publish the project: through the GitHub website or through the terminal.

## Option 1: GitHub Website

1. Open [github.com/new](https://github.com/new).
2. Use this repository name:

```text
focus-flow
```

3. Keep the repository **Public** if you want to show it on your profile.
4. Do not add a README, `.gitignore`, or license on GitHub because the project already includes them.
5. Click **Create repository**.
6. On the new repository page, click **uploading an existing file**.
7. Drag all files from this folder into GitHub:

```text
D:\GitHub\focus-flow
```

8. Use this commit message:

```text
Create Focus Flow app
```

9. Click **Commit changes**.

## Option 2: Terminal

Install Git first if needed: [git-scm.com/downloads](https://git-scm.com/downloads).

Then run:

```bash
cd D:\GitHub\focus-flow
git init
git add .
git commit -m "Create Focus Flow app"
git branch -M main
git remote add origin https://github.com/Arviefull/focus-flow.git
git push -u origin main
```

## Enable GitHub Pages

After the project is uploaded:

1. Open the `focus-flow` repository on GitHub.
2. Go to **Settings**.
3. Open **Pages** in the left menu.
4. Under **Build and deployment**, select:

```text
Source: Deploy from a branch
Branch: main
Folder: /root
```

5. Click **Save**.

After a few minutes, the site will be available at:

```text
https://arviefull.github.io/focus-flow/
```

## Repository Description

Suggested description:

```text
Minimal focus timer with tasks, stats, dark mode and localStorage.
```

Suggested topics:

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

## Pin The Project

To pin the repository on your GitHub profile:

1. Open your profile.
2. Click **Customize your pins**.
3. Select `focus-flow`.
4. Save the changes.
