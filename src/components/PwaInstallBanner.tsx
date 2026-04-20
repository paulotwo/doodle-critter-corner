import { usePwaInstall } from "@/hooks/use-pwa-install";
import { useI18n } from "@/i18n";

const PwaInstallBanner = () => {
  const { canInstall, install, dismiss, showIosBanner } = usePwaInstall();
  const { t } = useI18n();

  if (!canInstall && !showIosBanner) return null;

  const message = showIosBanner ? t.pwaIos : t.pwaInstall;

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
          {t.pwaInstallButton}
        </button>
      )}
      <button
        onClick={dismiss}
        aria-label={t.close}
        className="text-lg leading-none text-muted-foreground transition-colors hover:text-foreground"
      >
        ✕
      </button>
    </div>
  );
};

export default PwaInstallBanner;
