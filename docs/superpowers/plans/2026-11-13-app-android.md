# App Android (Capacitor) — Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Empacotar o Estúdio de Pintura dos Bichinhos como app Android com o bundle embutido e trocar o ícone pelo leãozinho metade pintado.

**Architecture:** Casca Capacitor 8 sem `server.url`, servindo `dist/` gerado por `vite build --mode native`. O código web consulta `isNative` (`src/lib/platform.ts`) nos poucos pontos que diferem no app. Referência viva: `../shadow-critters-play` (commit `5cf887c`), de onde se copiam estrutura e convenções.

**Tech Stack:** Capacitor 8 (`core`, `android`, `app`, `share`, `filesystem`), `@capacitor-community/text-to-speech`, `@capacitor/assets`, `sharp`, Vite 5, Vitest.

**Spec:** `docs/superpowers/specs/2026-11-13-app-android-design.md`

## Global Constraints

- appId `com.pjdev.doodlecrittercorner`; nome no launcher "Pintura dos Bichinhos" (traduzido em en, es, fr, it, de).
- O build nativo não contém service worker, Google Analytics, Sentry nem `dist/og`.
- O build do site (`bun run build`) continua com service worker, analytics e Sentry.
- Retrato; barra de status visível; nunca esconder as barras do sistema.
- `android/` é versionado; `android/local.properties` não.
- Saídas para o Paulo conferir vão em `test-results/` (gitignorada), nunca em pasta temporária.
- Commits só quando o Paulo pedir (regra dele); os passos "Commit" abaixo ficam pendentes até lá.
- Não remover o bloqueio do clique direito.

## Review Focus

1. Aparelho sem motor de TTS ou sem voz do idioma: a narração falha em silêncio e a fila segue; o jogo não trava. (Tarefa 2)
2. Fala em andamento quando o app vai para segundo plano ou a criança sai do estúdio: a fala para e a fila esvazia. (Tarefas 2 e 4)
3. Compartilhar a pintura cancelado pelo usuário: nada de erro nem de download de reserva no app. (Tarefa 3)
4. Fonte ou recurso buscado na rede (Google Fonts) com o aparelho offline na primeira abertura: o app precisa abrir com a fonte certa. (Tarefa 1)
5. Botão voltar com o modal de celebração ou outro diálogo aberto: volta uma tela, sem estado quebrado. (Tarefa 4)

---

### Task 1: Casca Capacitor e build nativo

**Files:**

- Create: `capacitor.config.ts`, `android/` (via `cap add android`), `src/lib/platform.ts`, `src/test/native-build.test.ts`
- Modify: `package.json`, `vite.config.ts`, `index.html`, `src/main.tsx`, `.gitignore`

**Interfaces:**

- Produces: `export const isNative: boolean` em `src/lib/platform.ts` (igual ao do shadow: `Capacitor.isNativePlatform()`); scripts `build:native`, `android:apk`, `android:aab`, `android:open`.

- [ ] **Step 1:** Instalar dependências com `bun add`: `@capacitor/core @capacitor/android @capacitor/app @capacitor/share @capacitor/filesystem @capacitor-community/text-to-speech`; dev: `@capacitor/cli @capacitor/assets sharp`. Renomear o pacote para `doodle-critter-corner`.
- [ ] **Step 2:** `capacitor.config.ts` copiado do shadow, com `appId: "com.pjdev.doodlecrittercorner"`, `appName: "Pintura dos Bichinhos"`, `SystemBars.style: "LIGHT"`.
- [ ] **Step 3:** `vite.config.ts`: `native = mode === "native"`; plugins `stripAnalytics` e `dropWebOnlyFiles` (remove `dist/og`) como no shadow; `VitePWA` só quando `!native`. Em `index.html`, cercar o bloco do gtag com `<!-- analytics:start -->` / `<!-- analytics:end -->`.
- [ ] **Step 4:** Sentry fora do bundle nativo: em `src/main.tsx`, trocar o import estático por `if (import.meta.env.MODE !== "native") import("./lib/sentry").then((m) => m.initSentry());`. Procurar outros imports de `@sentry/react` em `src/` e isolá-los do mesmo jeito.
- [ ] **Step 5:** Fontes: se `index.html` ou `src/index.css` carregarem Google Fonts pela rede, trocar por `@fontsource/<fonte>` importado em `main.tsx` (vale para site e app).
- [ ] **Step 6:** Scripts no `package.json`, idênticos aos do shadow. `.gitignore`: acrescentar `test-results`.
- [ ] **Step 7:** `bun run build && bunx cap add android`; conferir que `android/.gitignore` ignora `local.properties`.
- [ ] **Step 8:** Teste `src/test/native-build.test.ts` (roda sobre `dist/` após `bun run build:native`; pula se `dist/` não existir): não existe `dist/sw.js` nem `dist/og`; nenhum arquivo de `dist/` contém `googletagmanager`, `ingest.us.sentry.io` nem `fonts.googleapis.com`.
- [ ] **Step 9:** Rodar `bun run build:native && bunx vitest run src/test/native-build.test.ts` → PASS. Rodar `bun run build` e conferir que `dist/sw.js` existe e `dist/index.html` contém `googletagmanager`.
- [ ] **Step 10:** Commit (pendente).

### Task 2: Narração pelo TTS do sistema

**Files:**

- Modify: `src/lib/sounds.ts`, `android/app/src/main/AndroidManifest.xml`
- Test: `src/test/speech.test.ts` (acrescentar bloco "nativo")

**Interfaces:**

- Consumes: `isNative`.
- Produces: `speak`, `cancelSpeech` com as mesmas assinaturas de hoje; no app usam `TextToSpeech.speak({ text, lang, rate: 0.95, pitch: 1.2 })` e `TextToSpeech.stop()`.

- [ ] **Step 1:** Testes com `vi.mock("@/lib/platform", () => ({ isNative: true }))` e mock de `@capacitor-community/text-to-speech`:
  - `speak("Olá", { lang: "pt-BR" })` chama `TextToSpeech.speak` com `text` passado por `speechFriendly`, `lang: "pt-BR"`;
  - duas falas seguidas: a segunda só é chamada depois que a promessa da primeira resolve;
  - `TextToSpeech.speak` rejeitando: a fala seguinte da fila ainda toca;
  - `cancelSpeech()` chama `TextToSpeech.stop` e a fala pendente da fila não toca;
  - `speak(x, { interrupt: true })` chama `stop` antes de falar.
- [ ] **Step 2:** Rodar → FAIL.
- [ ] **Step 3:** Em `sounds.ts`, `playNext`/`speak`/`cancelSpeech` ganham o ramo `isNative` (sem exigir `speechSynthesis`); um contador de geração descarta o `done` de falas canceladas. O ramo web não muda.
- [ ] **Step 4:** `AndroidManifest.xml`: bloco `<queries>` com `android.intent.action.TTS_SERVICE`, como no shadow.
- [ ] **Step 5:** `bun run test` → PASS (inclusive os testes de fala já existentes).
- [ ] **Step 6:** Commit (pendente).

### Task 3: Compartilhar pela folha nativa

**Files:**

- Create: `src/lib/share.ts`, `src/test/share.test.ts`
- Modify: `src/components/studio/HomeScreen.tsx`, `src/components/studio/PaintStudio.tsx`

**Interfaces:**

- Produces em `src/lib/share.ts`:
  - `export const SITE_URL = "https://doodle-critter-corner.ksepisteme.com.br/"`
  - `shareLinkNative(data: { title: string; text: string }): Promise<void>` → `Share.share({ ...data, url: SITE_URL })`
  - `shareImageNative(dataUrl: string, fileName: string, data: { title: string; text: string }): Promise<void>` → `Filesystem.writeFile({ path: fileName, data: <base64 sem prefixo>, directory: Directory.Cache })` e `Share.share({ ...data, files: [uri] })`
  - As duas engolem o erro de cancelamento.

- [ ] **Step 1:** Testes (plugins mockados): `shareImageNative` grava sem o prefixo `data:image/png;base64,` em `Directory.Cache` e passa o `uri` devolvido em `files`; `shareLinkNative` usa `SITE_URL`; `Share.share` rejeitando não propaga.
- [ ] **Step 2:** Rodar → FAIL. **Step 3:** Implementar. **Step 4:** Rodar → PASS.
- [ ] **Step 5:** `HomeScreen.handleShare` e `PaintStudio.handleShare`: `if (isNative) { await share…Native(...); return; }` antes do caminho web (no app não há download de reserva).
- [ ] **Step 6:** Commit (pendente).

### Task 4: Comportamento de app

**Files:**

- Create: `src/hooks/use-native-app.ts`
- Modify: `src/pages/Index.tsx`, `src/lib/fullscreen.ts`, `src/components/PwaInstallBanner.tsx`, telas em `src/components/studio/` (áreas seguras), `android/app/src/main/AndroidManifest.xml`, `android/app/src/main/res/values*/strings.xml`
- Test: `src/test/native-app.test.tsx`

**Interfaces:**

- Produces: `useNativeApp(onBack: () => void): void` — no app, registra `App.addListener("backButton", onBack)` e `appStateChange` (inativo → `cancelSpeech()`); remove os ouvintes ao desmontar; fora do app não faz nada.

- [ ] **Step 1:** Testes: com `isNative` true, o hook registra os dois ouvintes; `appStateChange({ isActive: false })` chama `cancelSpeech`; desmontar chama `remove()`; com `isNative` false, `App.addListener` não é chamado. `requestAppFullscreen()` no app não chama `requestFullscreen`.
- [ ] **Step 2:** Rodar → FAIL. **Step 3:** Implementar o hook; `requestAppFullscreen` retorna cedo se `isNative`; `PwaInstallBanner` retorna `null` se `isNative`.
- [ ] **Step 4:** `Index.tsx`: `useNativeApp` com voltar = estúdio → temas → início → `App.exitApp()`, reaproveitando os mesmos manipuladores dos botões de voltar das telas.
- [ ] **Step 5:** Áreas seguras: nos contêineres raiz de `HomeScreen`, `ThemeSelector` e `PaintStudio`, somar `env(safe-area-inset-top/bottom)` ao espaçamento existente.
- [ ] **Step 6:** `AndroidManifest.xml`: `android:screenOrientation="portrait"` na activity. `strings.xml` em `values` (pt: "Pintura dos Bichinhos") e `values-en` ("Critter Paint Studio"), `values-es` ("Pintura de Animalitos"), `values-fr` ("Peinture des Animaux"), `values-it` ("Pittura degli Animaletti"), `values-de` ("Tierchen-Malstudio"); `app_name` e `title_activity_main`.
- [ ] **Step 7:** `bun run test` → PASS. **Step 8:** Commit (pendente).

### Task 5: Ícone novo

**Files:**

- Create: `scripts/gen-app-icons.mjs`, `assets/icon-only.png`, `assets/icon-foreground.png`, `assets/icon-background.png`, `assets/splash.png`, `assets/splash-dark.png`
- Modify: `public/icon-192.png`, `public/icon-512.png`, `public/favicon.ico`, recursos em `android/app/src/main/res/`

- [ ] **Step 1:** Script a partir do `gen-app-icons.mjs` do shadow (mesma estrutura: `background`, `enclosingCircle`, composição, `.ico`, prévia). Diferenças:
  - fonte `src/assets/animals/leaozinho.png` (contorno preto sobre transparente);
  - pintura: preenchimento por inundação em cada região, usando o contorno como barreira, a partir das sementes de `leaozinho` em `src/lib/animals.ts`; cores: juba laranja `#f97316`, cabeça e corpo amarelo `#FFD23F`, orelhas `#FDBA74`, rabo `#f97316`; por baixo, a silhueta inteira do leão em branco (para a metade "por pintar" não ficar transparente);
  - metade esquerda do quadro: leão pintado; metade direita: só branco + contorno;
  - fundo: esquerda `#f97316`, direita `#fff7ed`... se o contraste do leão amarelo sobre laranja ficar fraco, usar azul-céu `#38BDF8` à esquerda; linha tracejada branca (com fio `#f97316` se sumir no creme);
  - saídas web: `public/icon-512.png`, `public/icon-192.png`, `public/favicon.ico`;
  - prévia em `test-results/icone-aplicado.png`.
- [ ] **Step 2:** `node scripts/gen-app-icons.mjs`; abrir a prévia e conferir: leão inteiro dentro do círculo, rosto legível em 48 px, nenhuma região vazando tinta. Ajustar até passar.
- [ ] **Step 3:** `bunx capacitor-assets generate --android`.
- [ ] **Step 4:** Commit (pendente).

### Task 6: Documentação e APK

**Files:**

- Modify: `CLAUDE.md`

- [ ] **Step 1:** `CLAUDE.md`: comandos novos e seção "Native app (Capacitor, Android)" no molde da do shadow, com as particularidades daqui (Sentry fora do app, compartilhar imagem, script do ícone).
- [ ] **Step 2:** `bun run lint`, `bun run test`, `bun run build` → sem erros novos.
- [ ] **Step 3:** `bun run android:apk` → `android/app/build/outputs/apk/debug/app-debug.apk` existe. Se houver aparelho ou emulador em `adb devices`, instalar e conferir abertura, narração e voltar; senão, relatar que não foi testado em aparelho.
- [ ] **Step 4:** Commit (pendente).
