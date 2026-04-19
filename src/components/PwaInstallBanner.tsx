import { usePwaInstall } from "@/hooks/use-pwa-install";

const PwaInstallBanner = () => {
  const { canInstall, install, dismiss, showIosBanner } = usePwaInstall();

  if (!canInstall && !showIosBanner) return null;

  const message = showIosBanner
    ? "Para instalar, toque em ⬆️ Compartilhar e depois em «Adicionar à Tela Inicial»."
    : "Instale o app para pintar sem internet!";

  return (
    <div className="fixed bottom-4 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 items-center gap-3 rounded-2xl border-2 border-border bg-card/95 px-5 py-3 shadow-2xl backdrop-blur">
      <span className="text-2xl">📲</span>
      <p className="flex-1 text-sm font-semibold leading-snug text-foreground">
        {message}
      </p>
      {canInstall && (
        <button
          onClick={install}
          className="whitespace-nowrap rounded-xl bg-primary px-3 py-1.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Instalar
        </button>
      )}
      <button
        onClick={dismiss}
        aria-label="Fechar"
        className="text-lg leading-none text-muted-foreground transition-colors hover:text-foreground"
      >
        ✕
      </button>
    </div>
  );
};

export default PwaInstallBanner;
