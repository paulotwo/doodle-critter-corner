/**
 * PWA install helpers.
 *
 * - Registers a minimal service worker in production only (never inside the
 *   Lovable preview iframe, where SWs cause stale-content / routing issues).
 * - Captures the `beforeinstallprompt` event so the UI can show a custom
 *   "Install app" button.
 * - Detects iOS Safari, which never fires `beforeinstallprompt` and requires
 *   the user to use the Share → "Add to Home Screen" flow manually.
 */

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

let deferredPrompt: BeforeInstallPromptEvent | null = null;
const listeners = new Set<() => void>();

const isInIframe = (() => {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
})();

const isPreviewHost =
  typeof window !== "undefined" &&
  (window.location.hostname.includes("id-preview--") ||
    window.location.hostname.includes("lovableproject.com") ||
    window.location.hostname.includes("lovable.app") &&
      window.location.hostname.startsWith("id-preview--"));

export const isStandalone = (): boolean => {
  if (typeof window === "undefined") return false;
  const mql = window.matchMedia?.("(display-mode: standalone)");
  // @ts-expect-error legacy iOS api
  const iosStandalone = !!window.navigator?.standalone;
  return !!(mql?.matches || iosStandalone);
};

export const isIos = (): boolean => {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  return /iPad|iPhone|iPod/.test(ua) && !("MSStream" in window);
};

export const canPromptInstall = (): boolean => deferredPrompt !== null;

export const subscribeInstallAvailability = (cb: () => void): (() => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

const notify = () => listeners.forEach((cb) => cb());

export const promptInstall = async (): Promise<"accepted" | "dismissed" | "unavailable"> => {
  if (!deferredPrompt) return "unavailable";
  await deferredPrompt.prompt();
  const choice = await deferredPrompt.userChoice;
  deferredPrompt = null;
  notify();
  return choice.outcome;
};

export const initPwa = (): void => {
  if (typeof window === "undefined") return;

  // Capture the install prompt as soon as the browser fires it.
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e as BeforeInstallPromptEvent;
    notify();
  });

  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    notify();
  });

  // Service worker: only in production, never inside iframes or Lovable preview hosts.
  if (!("serviceWorker" in navigator)) return;

  if (isInIframe || isPreviewHost || import.meta.env.DEV) {
    // Clean up any SW left over from previous environments.
    navigator.serviceWorker.getRegistrations().then((regs) => {
      regs.forEach((r) => r.unregister());
    });
    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {
      /* registration failed — install prompt simply won't appear */
    });
  });
};
