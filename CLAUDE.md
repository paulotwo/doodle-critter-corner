# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun run dev        # Dev server on port 8080
bun run build      # Production build
bun run build:dev  # Build in development mode
bun run preview    # Preview production build
bun run lint       # ESLint
bun run format     # Prettier
bun run test       # Vitest (single run)
bun run test:watch # Vitest (watch mode)
bun run deploy     # Production build + wrangler deploy to Cloudflare
bun run build:native  # vite build --mode native + cap sync android
bun run android:apk   # debug APK → android/app/build/outputs/apk/debug/
bun run android:aab   # release AAB → android/app/build/outputs/bundle/release/ (signed if android/keystore.properties exists)
bun run android:open  # open android/ in Android Studio
```

To run a single test file: `bunx vitest run src/test/challenges.test.ts`

## What This Is

A React + TypeScript + Vite PWA — an educational painting/coloring game for children (ages 3–7). Called "Estúdio de Pintura dos Bichinhos" (Animal Painting Studio). Works offline, supports 6 languages (PT, EN, ES, FR, IT, DE), and has no external API dependencies. Deployed to Cloudflare Workers as a static SPA via `wrangler.jsonc`.

## Architecture

**Screen flow:** `main.tsx` → `App.tsx` (QueryClient + I18nProvider + Router) → `pages/Index.tsx` manages three screens: home → theme selector → paint studio.

**Core game components** live in `src/components/studio/`:

- `PaintStudio.tsx` — game state (selected color, tool, stamp, challenge progress) and challenge-completion logic
- `PaintCanvas.tsx` — HTML Canvas rendering with a custom flood-fill algorithm (pixel-level color replacement with HSL→RGB conversion and an RGB cache for performance). The paint canvas and outline canvas are separate layers; at fill time the outline is composited temporarily as a barrier, then removed with `destination-out`.
- `ThemeSelector.tsx`, `HomeScreen.tsx`, `ChallengeBox.tsx`, `ColorPalette.tsx`, `ToolBar.tsx`, `StampPicker.tsx`, `CelebrationModal.tsx`

**Data layer** (`src/lib/`):

- `studio-data.ts` — single source of truth for all game content: animal themes (`ThemeDef`) across 7 categories (domésticos, fazenda, pássaros, selvagens, aquáticos, insetos, dinossauros), 6 challenges per animal (typed `kind` field), color palette, stamp definitions. **Edit here** when adding animals, challenges, or colors.
- `animals.ts` — animal outline PNGs + paintable region definitions with seed coordinates for flood-fill
- `sounds.ts` — encouragement SFX (Web Audio API) + speech synthesis for challenge narration
- `sentry.ts`, `fullscreen.ts` — utility wrappers

**i18n** (`src/i18n/`):

- `I18nContext.tsx` — provider with auto-detection from `navigator.language`, persisted to localStorage, exposes `useI18n()` hook
- `translations.ts` — UI strings for 6 languages
- `studio-translations.ts` — challenge texts and encouragement messages (very large file)

**State management:** React local state + I18n Context. React Query is present but not used for server data. Language preference is the only thing persisted to localStorage.

**Testing:** Vitest + jsdom. Tests live in `src/test/`. Existing coverage: challenge data validity, speech synthesis, basics.

## Native app (Capacitor, Android)

`capacitor.config.ts` (appId `com.pjdev.doodlecrittercorner`) wraps `dist/` with no `server.url`: the bundle ships inside the app and runs at `https://localhost`, so it works offline from install. `android/` is committed; `android/local.properties` (SDK path) is not.

- `vite build --mode native` drops `VitePWA` (no service worker), strips the `analytics:start`/`analytics:end` block from `index.html`, removes `dist/og`, and aliases `@/lib/sentry` to the no-op `src/lib/sentry.native.tsx` (no analytics or telemetry in the app: Play Families Policy). Always import Sentry as `@/lib/sentry`, never by relative path, or the SDK leaks into the app. The web build keeps all of it.
- `NATIVE_BUILD_CHECK=1 bunx vitest run src/test/native-build.test.ts` checks `dist/` right after `bun run build:native` (skipped otherwise).
- Fonts are bundled (`@fontsource/fredoka`, `@fontsource/baloo-2`, imported in `main.tsx`); do not load fonts from the network.
- `src/lib/platform.ts` exports `isNative`. Use it for anything that differs in the app.
- Android WebView has no `speechSynthesis`: on native, `speak`/`cancelSpeech` in `sounds.ts` use `@capacitor-community/text-to-speech`. It needs the `TTS_SERVICE` `<queries>` entry in `AndroidManifest.xml`.
- Sharing uses `src/lib/share.ts` on native: the home link shares `SITE_URL` (not `window.location`), and the painting is written to the app cache and handed to the native share sheet.
- `useNativeApp` (in `pages/Index.tsx`) handles the Android back button (studio → themes → home → exit app) and stops narration when the app goes to background.
- The status bar stays visible over the screen background: `SystemBars` in `capacitor.config.ts` + `viewport-fit=cover`; the root of each screen has the `safe-area-y` class (`index.css`). Do not hide the system bars. Portrait comes from `android:screenOrientation`; `requestAppFullscreen()` is a no-op on native. The PWA install banner is hidden.
- Icons/splash: `node scripts/gen-app-icons.mjs` paints half of the lion outline (sources in `assets/`, plus `public/icon-*.png`, `favicon.ico` and a preview in `test-results/icone-aplicado.png`); then `bunx capacitor-assets generate --android` writes the Android resources. The launcher name is localized in `android/app/src/main/res/values-*/strings.xml`.
- After changing web code, run `bun run build:native` before building in Gradle.
- Popups register with `useBackHandler(open, close)` (`src/hooks/use-native-app.ts`) so the Android back button closes them before navigating.
- Release signing: copy `android/keystore.properties.example` to `android/keystore.properties` and point it at the upload keystore (both git-ignored, as are `*.jks`/`*.keystore`). Without that file `bundleRelease` still builds, unsigned.

## Key Conventions

- Animal images are in `src/assets/animals/` (1024px) and `src/assets/animals-512/` (512px for mobile).
- Tailwind CSS for all styling; `sm:` breakpoint is the primary responsive split.
- UI components come from shadcn/ui (`src/components/ui/`).
- Right-click is globally disabled (intentional game design — do not remove).
- Dynamic SEO meta tags and JSON-LD are updated per language in `Index.tsx`. The canonical URL base is defined as `BASE_URL` at the top of that file.
- TypeScript union types (`ThemeId`, `StampId`, challenge `kind`) are defined in `studio-data.ts` — keep them in sync when adding content.

## Adding a New Animal

1. Add outline PNG to `src/assets/animals/` (1024px) and `src/assets/animals-512/` (512px)
2. Register `AnimalDef` in `src/lib/animals.ts` with paintable region seed coordinates
3. Add `ThemeId` to the union type and `ThemeDef` (with 6 challenges) in `src/lib/studio-data.ts`
4. Add translations for the animal name and challenge texts in `src/i18n/studio-translations.ts`
