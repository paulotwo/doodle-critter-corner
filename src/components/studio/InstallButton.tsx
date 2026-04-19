import { useEffect, useState } from "react";
import { Download, Share as ShareIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  canPromptInstall,
  isIos,
  isStandalone,
  promptInstall,
  subscribeInstallAvailability,
} from "@/lib/pwa-install";
import { playClick } from "@/lib/sounds";

const DISMISS_KEY = "install-banner-dismissed";

export const InstallButton = () => {
  const [available, setAvailable] = useState(false);
  const [showIosHelp, setShowIosHelp] = useState(false);
  const [dismissed, setDismissed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(DISMISS_KEY) === "1";
  });

  useEffect(() => {
    setAvailable(canPromptInstall());
    return subscribeInstallAvailability(() => setAvailable(canPromptInstall()));
  }, []);

  // Don't show anything if already installed.
  if (isStandalone()) return null;

  const ios = isIos();

  // Show iOS help button OR Android/Desktop install button.
  if (!available && !ios) return null;
  if (dismissed) return null;

  const handleClick = async () => {
    playClick();
    if (ios) {
      setShowIosHelp(true);
      return;
    }
    const result = await promptInstall();
    if (result === "dismissed") {
      // Don't nag — remember the dismissal for this session.
      localStorage.setItem(DISMISS_KEY, "1");
      setDismissed(true);
    }
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClick();
    localStorage.setItem(DISMISS_KEY, "1");
    setDismissed(true);
  };

  return (
    <>
      <motion.button
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onClick={handleClick}
        className="kid-shadow-pop relative flex items-center gap-2 rounded-2xl bg-white/90 px-3 py-2 text-sm font-bold text-foreground backdrop-blur transition-transform hover:scale-105 active:scale-95"
        aria-label="Instalar app"
      >
        <Download className="h-4 w-4 text-primary" />
        Instalar
        <span
          onClick={handleDismiss}
          role="button"
          aria-label="Dispensar"
          className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-muted/70"
        >
          <X className="h-3 w-3" />
        </span>
      </motion.button>

      <AnimatePresence>
        {showIosHelp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center"
            onClick={() => setShowIosHelp(false)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-3xl bg-white p-6 text-left shadow-2xl"
            >
              <h2 className="text-lg font-extrabold text-foreground">
                Instalar no iPhone / iPad
              </h2>
              <ol className="mt-3 space-y-3 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary">1.</span>
                  <span>
                    Toque no botão <ShareIcon className="inline h-4 w-4" /> Compartilhar
                    na barra do Safari.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary">2.</span>
                  <span>Escolha <strong>"Adicionar à Tela de Início"</strong>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary">3.</span>
                  <span>Toque em <strong>Adicionar</strong> no canto superior.</span>
                </li>
              </ol>
              <button
                onClick={() => setShowIosHelp(false)}
                className="mt-5 w-full rounded-2xl bg-primary py-3 font-bold text-primary-foreground"
              >
                Entendi!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
