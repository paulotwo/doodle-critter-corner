import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import PwaInstallBanner from "./components/PwaInstallBanner";
import { Sentry } from "./lib/sentry";

const queryClient = new QueryClient();

const Fallback = () => (
  <div className="flex min-h-screen items-center justify-center p-6 text-center">
    <div className="kid-card max-w-md p-8">
      <h1 className="mb-2 text-2xl">Ops! Algo deu errado 🐾</h1>
      <p className="mb-4 text-muted-foreground">
        Tente recarregar a página para continuar pintando.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="rounded-2xl bg-primary px-6 py-3 font-bold text-primary-foreground shadow-md"
      >
        Recarregar
      </button>
    </div>
  </div>
);

const App = () => (
  <Sentry.ErrorBoundary fallback={<Fallback />}>
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  </Sentry.ErrorBoundary>
);

export default App;
