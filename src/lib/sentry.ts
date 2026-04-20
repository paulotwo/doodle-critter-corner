import * as Sentry from "@sentry/react";

const DSN = "https://a39bf44516bb07f24b324f1338c54439@o4511247384707072.ingest.us.sentry.io/4511247386214400";

export function initSentry() {
  if (typeof window === "undefined") return;

  Sentry.init({
    dsn: DSN,
    environment: import.meta.env.MODE,
    release: `doodle-critter-corner@${import.meta.env.MODE}`,

    // ===== Performance monitoring (full) =====
    tracesSampleRate: 1.0,
    tracePropagationTargets: ["localhost", /^https:\/\//],

    // ===== Session Replay (full) =====
    replaysSessionSampleRate: 1.0,
    replaysOnErrorSampleRate: 1.0,

    // ===== Profiling =====
    profilesSampleRate: 1.0,

    // ===== Capture everything =====
    sendDefaultPii: true,
    attachStacktrace: true,
    enableLogs: true,

    integrations: [
      // Routing + performance
      Sentry.browserTracingIntegration(),
      Sentry.browserProfilingIntegration(),

      // Replay with rich capture
      Sentry.replayIntegration({
        maskAllText: false,
        maskAllInputs: false,
        blockAllMedia: false,
        networkDetailAllowUrls: [window.location.origin],
        networkCaptureBodies: true,
      }),
      Sentry.replayCanvasIntegration(),

      // Console + extra context
      Sentry.captureConsoleIntegration({
        levels: ["log", "info", "warn", "error", "debug", "assert"],
      }),
      Sentry.extraErrorDataIntegration({ depth: 5 }),
      Sentry.httpClientIntegration(),
      Sentry.contextLinesIntegration(),
      Sentry.reportingObserverIntegration(),
      Sentry.browserApiErrorsIntegration({
        setTimeout: true,
        setInterval: true,
        requestAnimationFrame: true,
        XMLHttpRequest: true,
        eventTarget: true,
      }),
    ],
  });

  // Capture unhandled promise rejections explicitly (extra safety net)
  window.addEventListener("unhandledrejection", (event) => {
    Sentry.captureException(event.reason ?? new Error("Unhandled promise rejection"));
  });
}

export { Sentry };
