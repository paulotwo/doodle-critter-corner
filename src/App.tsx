import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider, useI18n } from "@/i18n";
import { useEffect } from "react";
import { setSpeechLang } from "@/lib/sounds";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import PwaInstallBanner from "./components/PwaInstallBanner";
import { Sentry } from "./lib/sentry";

const queryClient = new QueryClient();

const Fallback = () => {
  // Não usa hook de i18n para evitar cascata se o provider falhou.
  return (
    <div className="flex min-h-screen items-center justify-center p-6 text-center">
      <div className="kid-card max-w-md p-8">
        <h1 className="mb-2 text-2xl">Ops! 🐾</h1>
        <p className="mb-4 text-muted-foreground">
          Try reloading the page · Tente recarregar a página
        </p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-2xl bg-primary px-6 py-3 font-bold text-primary-foreground shadow-md"
        >
          Reload · Recarregar
        </button>
      </div>
    </div>
  );
};

const SpeechLangSync = () => {
  const { speechLang } = useI18n();
  useEffect(() => { setSpeechLang(speechLang); }, [speechLang]);
  return null;
};

const App = () => (
  <Sentry.ErrorBoundary fallback={<Fallback />}>
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <SpeechLangSync />
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <PwaInstallBanner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </I18nProvider>
    </QueryClientProvider>
  </Sentry.ErrorBoundary>
);

export default App;
