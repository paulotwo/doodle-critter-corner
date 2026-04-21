import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initPwa } from "./lib/pwa-install";
import { initSentry } from "./lib/sentry";

initSentry();
initPwa();

// Disable browser context menu (right-click / long-press)
document.addEventListener("contextmenu", (e) => e.preventDefault());

createRoot(document.getElementById("root")!).render(<App />);
