# App Android do Estúdio de Pintura dos Bichinhos

Aprovado por Paulo em 2026-11-13.

## Intenção

Publicar o jogo na Play Store como app Android, repetindo a receita já usada no
`shadow-critters-play` (commit `5cf887c` de lá), e trocar o ícone atual (coelho
na paleta) por um no mesmo estilo do ícone do leão metade sombra.

## Objetivos

- App Android com o bundle embutido, funcionando offline desde a instalação.
- Ícone novo, gerado por script a partir da arte do jogo, usado no app e no site.
- O site (PWA) continua funcionando como hoje.

Fora do escopo: iOS, assinatura de release e publicação na Play Store.

Seria uma falha: o app coletar analytics ou telemetria (Política de Famílias do
Play), ou o site perder service worker, analytics ou Sentry.

## Abordagens

1. **Capacitor com bundle embutido (escolhida).** É a do `shadow-critters-play`:
   sem `server.url`, o WebView serve `dist/` em `https://localhost`. Offline de
   verdade e mesma manutenção nos dois jogos.
2. **TWA (Bubblewrap).** Só embrulha o site: depende de rede na primeira
   abertura e do Chrome instalado, e não dá acesso ao TTS do sistema.
3. **Capacitor apontando para o site (`server.url`).** Não funciona offline na
   instalação e o Play costuma rejeitar apps que são só um site.

## Desenho

- **Identidade:** appId `com.pjdev.doodlecrittercorner`; nome no launcher
  "Pintura dos Bichinhos", traduzido nos 6 idiomas
  (`android/app/src/main/res/values-*/strings.xml`); retrato
  (`android:screenOrientation`).
- **Build nativo:** `vite build --mode native` sem `VitePWA`, sem o bloco do
  Google Analytics no `index.html` (marcado com `analytics:start`/`analytics:end`),
  sem Sentry e sem `dist/og`. Scripts `build:native`, `android:apk`,
  `android:aab`, `android:open`. `android/` é versionado;
  `android/local.properties` não.
- **`src/lib/platform.ts`:** exporta `isNative`, usado em tudo que difere no app.
- **Narração:** o WebView não tem `speechSynthesis`; no app, `sounds.ts` usa
  `@capacitor-community/text-to-speech` (com a entrada `TTS_SERVICE` em
  `<queries>` do `AndroidManifest.xml`).
- **Compartilhar:** o link da tela inicial vai por `@capacitor/share`; a imagem
  da pintura é gravada no cache com `@capacitor/filesystem` e compartilhada pela
  folha nativa.
- **Comportamento no app:** botão voltar (estúdio → temas → início → sair);
  narração calada com o app em segundo plano; banner de instalar PWA oculto;
  `enterFullscreen()` sem efeito; barra de status visível (`SystemBars` no
  `capacitor.config.ts`) com `env(safe-area-inset-*)` nas telas.
- **Ícone:** o leãozinho do jogo (`src/assets/animals/leaozinho.png`), metade
  esquerda pintada e metade direita só contorno, sobre fundo dividido (azul-céu
  `#38BDF8` no lado pintado e laranja `#F97316` no outro; o laranja e creme
  previstos antes escondiam a juba e o leão em branco) com a linha tracejada
  branca no meio.
  `scripts/gen-app-icons.mjs` pinta as regiões por preenchimento a partir das
  sementes de `animals.ts`, gera as fontes em `assets/`, os ícones do site em
  `public/` e a prévia em `test-results/icone-aplicado.png`; depois
  `bunx capacitor-assets generate --android`.
- **Conferência:** prévia do ícone para o Paulo ver antes de aplicar; testes e
  build do site passando; APK de debug gerado.

## Deixado ao construtor

Cores exatas da pintura do leão, tamanho do leão dentro da zona segura do ícone
adaptativo, e o ponto exato de cada ajuste de área segura nas telas.
