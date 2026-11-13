import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

// Build do app (Capacitor): `vite build --mode native`. Sem service worker
// (o bundle já vai dentro do app), sem analytics e sem Sentry (Política de
// Famílias do Play).
const stripAnalytics = (): Plugin => ({
  name: "strip-analytics",
  transformIndexHtml: (html) =>
    html.replace(/[ \t]*<!-- analytics:start[\s\S]*?<!-- analytics:end -->\r?\n?/, ""),
});

// As prévias de Open Graph (public/og) só servem a quem compartilha o link do
// site; não entram no app.
const dropWebOnlyFiles = (): Plugin => ({
  name: "drop-web-only-files",
  closeBundle: () =>
    fs.rmSync(path.resolve(__dirname, "dist", "og"), { recursive: true, force: true }),
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const native = mode === "native";
  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: [
      react(),
      mode === "development" && componentTagger(),
      native && stripAnalytics(),
      native && dropWebOnlyFiles(),
      !native &&
        VitePWA({
          registerType: "autoUpdate",
          devOptions: {
            enabled: false,
          },
          workbox: {
            globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp,woff,woff2,mp3,ogg,wav}"],
            maximumFileSizeToCacheInBytes: 4194304,
            navigateFallback: "index.html",
            navigateFallbackDenylist: [/^\/~oauth/, /^\/~api/, /^\/~flock/],
          },
          manifest: false,
        }),
    ].filter(Boolean),
    resolve: {
      alias: [
        // No app, o Sentry dá lugar a um substituto sem rede (vem antes do "@").
        ...(native
          ? [
              {
                find: "@/lib/sentry",
                replacement: path.resolve(__dirname, "./src/lib/sentry.native.tsx"),
              },
            ]
          : []),
        { find: "@", replacement: path.resolve(__dirname, "./src") },
      ],
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },
  };
});
