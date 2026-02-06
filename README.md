HEAD

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# App Template

## Create a new app repo

1. Click "Use this template" on GitHub
2. Name repo: app-<something> (example: app-flashcards)
3. Create repo

## Customize the new app

- index.html: update <title> and header text
- manifest.json: update name + short_name
- sw.js: update CACHE_NAME to match repo + version (example: app-flashcards-v1)
- VERSION.txt: set v1

## Deploy

Settings → Pages → Deploy from branch → main / root

## Release rule (avoid caching issues)

Every release:

- bump VERSION.txt (v2, v3...)
- bump CACHE_NAME in sw.js to match (app-xyz-v2, app-xyz-v3...)

origin/main
