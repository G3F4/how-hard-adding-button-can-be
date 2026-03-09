# Plan: Deploy prezentacji na GitHub Pages

## Cel
Skonfigurować projekt React + Vite + Tailwind CSS v4 i wdrożyć prezentację z `src/App.tsx` na GitHub Pages.

## Pliki do utworzenia

### 1. `package.json`
```json
{
  "name": "how-hard-adding-button-can-be",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "tailwindcss": "^4.0.0",
    "typescript": "~5.7.0",
    "vite": "^6.0.0"
  }
}
```

### 2. `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["src"]
}
```

### 3. `vite.config.ts`
```ts
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/how-hard-adding-button-can-be/",
  plugins: [tailwindcss()],
});
```

Uwaga: `base` musi odpowiadać nazwie repozytorium, bo GitHub Pages serwuje z podkatalogu.

### 4. `index.html`
```html
<!doctype html>
<html lang="pl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>How hard can it be to add a button?</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### 5. `src/main.tsx`
```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Presentation from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Presentation />
  </StrictMode>,
);
```

### 6. `src/index.css`
```css
@import "tailwindcss";
```

### 7. `.github/workflows/deploy.yml`
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build-and-deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: "./dist"

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## Kroki po utworzeniu plików

1. `npm install` - zainstalować zależności
2. `npm run build` - zweryfikować, że build przechodzi
3. `npm run dev` - opcjonalnie sprawdzić lokalnie
4. Push na `main` - GitHub Actions automatycznie zdeploi

## Po stronie GitHub

W ustawieniach repo (Settings > Pages) trzeba ustawić:
- **Source:** GitHub Actions

## Wynikowy URL
`https://g3f4.github.io/how-hard-adding-button-can-be/`
