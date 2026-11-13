import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@fontsource/fredoka/400.css";
import "@fontsource/fredoka/500.css";
import "@fontsource/fredoka/600.css";
import "@fontsource/fredoka/700.css";
import "@fontsource/baloo-2/500.css";
import "@fontsource/baloo-2/600.css";
import "@fontsource/baloo-2/700.css";
import "@fontsource/baloo-2/800.css";
import "./index.css";
import { initSentry } from "@/lib/sentry";

initSentry();

// Guard PWA service worker: never register in iframe or preview hosts
const isInIframe = (() => {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
})();

const isPreviewHost =
  window.location.hostname.includes("id-preview--") ||
  window.location.hostname.includes("lovableproject.com");

if (isPreviewHost || isInIframe) {
  navigator.serviceWorker?.getRegistrations().then((registrations) => {
    registrations.forEach((r) => r.unregister());
  });
}

document.addEventListener("contextmenu", (e) => {
  if (new URLSearchParams(location.search).get("debug") === "1") return;
  e.preventDefault();
});

createRoot(document.getElementById("root")!).render(<App />);