# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server with hot-reload
npm run build    # Build for production
npm run start    # Run production server
npm run lint     # Run ESLint
```

No test runner is configured.

## Architecture

Next.js 16 App Router project with React 19, TypeScript (strict mode), and Tailwind CSS v4.

**Routing:** All routes live under `app/`. The App Router uses file-system routing — `app/page.tsx` is the home route, `app/layout.tsx` is the root layout wrapping all pages.

**Styling:** Tailwind CSS v4 uses a CSS-first approach. Styles are configured in `app/globals.css` using `@import "tailwindcss"` and `@theme` directives — not a `tailwind.config.js`. CSS variables for the Geist font families are set in `app/layout.tsx` and available as `--font-geist-sans` / `--font-geist-mono`.

**Path aliases:** `@/*` maps to the project root (e.g. `import { foo } from '@/lib/foo'`).

## Code Style

Prettier is configured (`.prettierrc`): no semicolons, single quotes, trailing commas, 2-space indent, 80-char print width.
