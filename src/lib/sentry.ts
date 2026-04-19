import * as Sentry from "@sentry/react";

const DSN = "https://a39bf44516bb07f24b324f1338c54439@o4511247384707072.ingest.us.sentry.io/4511247386214400";

export function initSentry() {
  if (typeof window === "undefined") return;

  Sentry.init({
    dsn: DSN,
    environment: import.meta.env.MODE,
    // Performance monitoring
    tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0,
    // Session replay (capture 10% of sessions, 100% of sessions with errors)
    replaysSessionSampleRate: import.meta.env.PROD ? 0.1 : 0,
    replaysOnErrorSampleRate: 1.0,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
  });
}

export { Sentry };
