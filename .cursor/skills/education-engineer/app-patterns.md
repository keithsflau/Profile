# App Patterns

Technical and navigation conventions extracted from this repository. Reuse these patterns before introducing new stacks.

## Tech Tier Decision

| Tier | When | Stack | Deploy |
|------|------|-------|--------|
| **A** | Primary lessons, simple quizzes, single-page interactives | HTML + Tailwind CDN + React 18 CDN + Babel + optional Framer Motion | Single `index.html`, no build |
| **B** | Secondary simulations, charts, multi-component state | Vite + React + Tailwind + Framer Motion | Commit `dist/` for root Pages upload |
| **C** | AI, MediaPipe, face-api, large TS codebases | Vite + React + TypeScript | Build + commit `dist/` or dedicated workflow |
| **D** | Pure canvas / minimal JS | HTML + CSS + Canvas/vanilla JS | Single file |

**Examples:**

- Tier A: `Primary_School/General_Studies/P1/09_My_Feelings/index.html`
- Tier B: `Secondary_School/Biology/apps/energy-flow/`
- Tier C: `Music Therapy/music-therapy-app/`, `Primary_School/PrimaryChinese/粵語伴讀：濫竽充數/`
- Tier D: some `Secondary_School/Mathematics/Form 3/` canvas apps

---

## Tier A: CDN React Boilerplate

Minimal head for Primary General Studies (adjust relative path to `i18n.js`):

```html
<!DOCTYPE html>
<html lang="zh-HK">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>小一常識：Topic | Topic EN</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="https://unpkg.com/framer-motion@10.16.4/dist/framer-motion.js"></script>
  <script src="../../common/i18n.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700&family=Fredoka:wght@400;600&display=swap" rel="stylesheet" />
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    const { useState } = React;
    const { motion } = window.Motion;
    const { LanguageSelector, get } = window.MathI18n;
    // App code…
    ReactDOM.createRoot(document.getElementById("root")).render(<App />);
  </script>
</body>
</html>
```

Mathematics uses `Primary_School/Mathematics/common/i18n.js` with the same `window.MathI18n` API.

---

## i18n Pattern

### With MathI18n (Primary GS / Math)

```javascript
const t = {
  title: {
    en: "My Feelings",
    zh: "心情變變變",
    ja: "…",
    // en, zh, ja, ko, es, de, fi, fr, ar, it
  },
  instruction: { en: "…", zh: "…", /* … */ },
};

// In component:
const lang = /* from LanguageSelector state */;
<h1>{get(t.title, lang)}</h1>
```

Reuse common strings from `i18n.js` (`start`, `check`, `correct`, `wrong`, `score`, `back`) via `get(window.MathI18n.common.correct, lang)` or merge into `t`.

### Inline bilingual (simple apps)

Some secondary or Bible Study pages use a smaller `{ en, zh }` object without full 10-language support. Match siblings in the same folder.

---

## Folder & Naming

```
Primary_School/General_Studies/P3/14_Pollution_Busters/index.html
Secondary_School/Mathematics/Form 1/01_Directed_Numbers/index.html
Secondary_School/Biology/apps/photosynthesis/
bible_study/經卷/四福音/index.html
```

Rules:

- Zero-padded `NN_` prefix for ordered curriculum apps
- `snake_case` English topic name
- One main entry: `index.html` (Tier A/D) or Vite app with `index.html` entry

---

## Hub Registry Updates

### Primary General Studies portal

File: `Primary_School/General_Studies/index.html`

Add slug to `appsData` for the correct year:

```javascript
const appsData = {
  P3: [
    // …
    "14_Pollution_Busters",
  ],
};
```

Also verify the year-level page if one exists (e.g. `P3/index.html`).

### Primary Mathematics

Year hubs under `Primary_School/Mathematics/P{n}/index.html` list apps in a React catalog — add new entries there.

### Secondary subjects

Update the relevant subject or form index (e.g. `Secondary_School/Biology/index.html`, form folders). Biology standalone apps live under `Biology/apps/{name}/` and are linked from the Biology hub.

### Bible Study & Typing Test

Link from section root `index.html` or thematic sub-index (e.g. `bible_study/經卷/`).

**Never ship a new app without a navigation path from its section hub.**

---

## Tier B: Vite App Structure

Typical layout (Biology apps):

```
apps/my-app/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   └── App.jsx
├── dist/          # committed for static hosting
└── README.md      # features + HKDSE concepts
```

`package.json` scripts: `dev`, `build`, `preview`.

After `npm run build`, commit `dist/` when the root Pages workflow serves the app without a separate CI build.

### Vite README template

```markdown
# App Title

One-line description for [audience] covering **[key concepts]**.

## Features
- Feature 1
- Feature 2

## Tech Stack
React, Tailwind, Vite, …

## Key [HKDSE / Curriculum] Concepts Covered
1. Concept one
2. Concept two

## Getting Started
npm install && npm run dev
```

See `Secondary_School/Biology/apps/energy-flow/README.md` for a full example.

---

## UI & Theming

| Area | Pattern |
|------|---------|
| Portfolio hubs | Glass-card, gradient backgrounds, Fredoka/Nunito/Inter |
| Primary GS | Warm gradients, emoji, rounded-2xl buttons |
| Secondary Math | "Bright Math" — white/slate + emerald/blue accents (see S1_MATH_PLAN.md) |
| Biology | Earthy greens, scientific accuracy notes |
| Bible Study | Readable TC typography, devotional tone |

Use Tailwind utility classes consistently. Avoid custom CSS unless matching existing lesson style.

---

## Interactive Design Patterns

Reuse proven mechanics from the portfolio:

| Mechanic | Use case | Example |
|----------|----------|---------|
| Drag-and-drop sorting | Classification | `16_Animal_Sorting`, recycling bins |
| Image + emotion/action choice | SEL, health | `09_My_Feelings` |
| Simulation sliders | Science, ecology | Biology energy-flow |
| Step-by-step lab | Chemistry, physics | F3–F5 chem apps |
| Map / hotspot click | HK geography | `21_Community_Map`, `06_HK_Districts` |
| Timed quiz | Revision | ICT HKDSE Lab |
| Typing input | Language | typing test section |

Each interaction must produce **visible feedback** within one user action.

---

## Deployment Notes

- Root workflow uploads `.` to GitHub Pages — all paths are static
- No server-side APIs unless user provides external hosting
- Do not commit `.env`, API keys, or credentials
- Optional: `visit-counter.js` for analytics on hub pages
- Separate workflows exist for some apps (English Vocabulary, idiom games) — check `.github/workflows/` before assuming root deploy

---

## Smoke Testing

`browser-smoke-test/` validates that HTML pages load. After adding or heavily editing pages, run the project's smoke test script if available and ensure new URLs are included in its page list when appropriate.

---

## Section Exceptions

| Section | Notes |
|---------|-------|
| **bible_study** | Traditional Chinese; spiritual accuracy matters; no HKDSE block required |
| **typing test** | Focus on metrics (WPM, accuracy); keyboard layout zh/en |
| **Music Therapy** | May require camera/mic permissions; document browser requirements |
| **Primary Chinese games** | Often standalone under `PrimaryChinese/` with custom game logic |

When extending exceptions, copy patterns from the nearest sibling app in the same section.
