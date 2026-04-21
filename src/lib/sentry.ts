import * as Sentry from "@sentry/react";

const DSN = "https://a39bf44516bb07f24b324f1338c54439@o4511247384707072.ingest.us.sentry.io/4511247386214400";

export function initSentry() {
  if (typeof window === "undefined") return;

  // Detect low-power / mobile devices to dial monitoring down further.
  const ua = navigator.userAgent || "";
  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(ua);
  const lowMem =
    typeof (navigator as any).deviceMemory === "number" && (navigator as any).deviceMemory <= 4;
  const lowCpu =
    typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 4;
  const isConstrained = isMobile || lowMem || lowCpu;

  Sentry.init({
    dsn: DSN,
    environment: import.meta.env.MODE,
    release: `doodle-critter-corner@${import.meta.env.MODE}`,

    // ===== Performance monitoring (light) =====
    // Sampling at 1.0 hammers the main thread on mobile. Keep a small sample.
    tracesSampleRate: isConstrained ? 0 : 0.05,

    // ===== Session Replay =====
    // Replay (and especially canvas replay) is the #1 cause of mobile freezes
    // in this app — a paint canvas means every brush stroke is recorded.
    // Disable the always-on session replay; only capture a small fraction on error.
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: isConstrained ? 0 : 0.1,

    // ===== Profiling =====
    // Continuous profiling pegs the CPU. Off on mobile, tiny sample on desktop.
    profilesSampleRate: isConstrained ? 0 : 0.05,

    sendDefaultPii: false,
    attachStacktrace: true,

    integrations: [
      // Only error capture by default — no replay, no canvas recording,
      // no console interception, no XHR body capture.
      Sentry.browserTracingIntegration(),
      Sentry.extraErrorDataIntegration({ depth: 3 }),
    ],
  });

  // Capture unhandled promise rejections explicitly (extra safety net)
  window.addEventListener("unhandledrejection", (event) => {
    Sentry.captureException(event.reason ?? new Error("Unhandled promise rejection"));
  });
}

export { Sentry };
