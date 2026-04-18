# FintelAI

AI-powered financial insights in a clean, fast web experience.

## Demo
- Live demo: https://fintelai.netlify.app/

## Overview
FintelAI helps you explore financial information and insights with an AI-assisted interface. It’s designed to be simple to run locally and easy to extend.

## Features
- AI-assisted financial Q&A / insights experience
- Clean, responsive UI (desktop/mobile)
- Fast development workflow
- Easy to customize and extend

## Tech Stack
> If you tell me the exact framework (Vite/Next.js/CRA) and any backend/API, I’ll tailor this precisely.
- JavaScript/TypeScript
- Node.js + npm (or yarn/pnpm)
- Hosting (demo): Netlify

## Getting Started

### Prerequisites
- Node.js (LTS recommended)
- npm / yarn / pnpm

### Install
```bash
git clone https://github.com/ShivamNikhra14/FintelAI.git
cd FintelAI
npm install
```

### Run locally
```bash
npm run dev
```
Open the URL shown in your terminal (commonly `http://localhost:5173` or `http://localhost:3000`).

### Build
```bash
npm run build
```

### Preview (optional)
```bash
npm run preview
```

## Environment Variables
If your app uses API keys (common for AI features), create a `.env` file in the project root.

Example:
```bash
# Example AI key
VITE_OPENAI_API_KEY=your_api_key_here

# Optional base URL example
VITE_API_BASE_URL=http://localhost:3000
```

Notes:
- Exact variable names depend on the codebase.
- If using Vite, env vars typically must start with `VITE_`.
- Restart the dev server after changing `.env`.

## Usage
1. Open the app (demo or local).
2. Enter your finance-related question or query.
3. Review the generated insights/results.
4. Refine with follow-up prompts for deeper exploration.

## Project Structure
```text
FintelAI/
  src/              # application source
  public/           # static assets
  package.json      # scripts and dependencies
  README.md
```

## Troubleshooting

### App won’t start
Check Node/npm:
```bash
node -v
npm -v
```

### Install issues
Try a clean install:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Env vars not applied
- Confirm `.env` is in the project root
- Restart the dev server
