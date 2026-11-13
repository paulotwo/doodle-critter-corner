// Substituto do Sentry no build do app (`vite build --mode native`): o app não
// envia telemetria (Política de Famílias do Play). O vite.config.ts troca
// `@/lib/sentry` por este arquivo, então o SDK nem entra no bundle.
import { Component, type ReactNode } from "react";

class ErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

const span = { setAttribute: (_key: string, _value: unknown) => {} };

export const Sentry = {
  ErrorBoundary,
  startSpan: <T,>(_options: unknown, callback: (s: typeof span) => T): T => callback(span),
  captureException: (_error: unknown, _context?: unknown) => {},
  addBreadcrumb: (_breadcrumb: unknown) => {},
};

export function initSentry() {}
