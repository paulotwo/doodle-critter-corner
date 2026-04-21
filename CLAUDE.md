# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Dev server on port 8080
npm run build      # Production build
npm run lint       # ESLint
npm run test       # Vitest (single run)
npm run test:watch # Vitest (watch mode)
npm run preview    # Preview production build
```

## What This Is

A React + TypeScript + Vite PWA — an educational painting/coloring game for children (ages 3–7). Called "Estúdio de Pintura dos Bichinhos" (Animal Painting Studio). Works offline, supports 6 languages (PT, EN, ES, FR, IT, DE), and has no external API dependencies.

## Architecture

**Screen flow:** `main.tsx` → `App.tsx` (QueryClient + I18nProvider + Router) → `pages/Index.tsx` manages three screens: home → theme selector → paint studio.

**Core game components** live in `src/components/studio/`:
- `PaintStudio.tsx` — game state (selected color, tool, stamp, challenge progress) and challenge-completion logic
- `PaintCanvas.tsx` — HTML Canvas rendering with a custom flood-fill algorithm (pixel-level color replacement with HSL→RGB conversion and an RGB cache for performance)
- `ThemeSelector.tsx`, `HomeScreen.tsx`, `ChallengeBox.tsx`, `ColorPalette.tsx`, `ToolBar.tsx`, `StampPicker.tsx`, `CelebrationModal.tsx`

**Data layer** (`src/lib/`):
- `studio-data.ts` — the single source of truth for all game content: 29 animal themes (`ThemeDef`), 6 challenges per animal (typed `kind` field), color palette, stamp definitions. Edit here when adding animals, challenges, or colors.
- `animals.ts` — animal outline PNGs + paintable region definitions with seed coordinates for flood-fill
- `sounds.ts` — encouragement SFX (Web Audio API) + speech synthesis for challenge narration
- `sentry.ts`, `pwa-install.ts`, `fullscreen.ts` — utility wrappers

**i18n** (`src/i18n/`):
- `I18nContext.tsx` — provider with auto-detection from `navigator.language`, persisted to localStorage, exposes `useI18n()` hook
- `translations.ts` — UI strings for 6 languages
- `studio-translations.ts` — challenge texts and encouragement messages (very large file)

**State management:** React local state + I18n Context. React Query is present but not heavily used (no server data). Language preference is the only thing persisted to localStorage.

**Testing:** Vitest + jsdom. Tests live in `src/test/`. Existing coverage: challenge data validity, speech synthesis, basics.

## Key Conventions

- Animal images are in `src/assets/animals/` (1024px) and `src/assets/animals-512/` (512px for mobile).
- Tailwind CSS for all styling; `sm:` breakpoint is the primary responsive split.
- UI components come from shadcn/ui (`src/components/ui/`).
- Right-click is globally disabled (intentional game design — do not remove).
- Dynamic SEO meta tags and JSON-LD are updated per language in `Index.tsx`.
- TypeScript union types (`ThemeId`, `StampId`, challenge `kind`) are defined in `studio-data.ts` — keep them in sync when adding content.
