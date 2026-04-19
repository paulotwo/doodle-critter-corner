import { motion } from "framer-motion";
import { Sparkles, Wand2, Share2 } from "lucide-react";
import { playClick } from "@/lib/sounds";
import { InstallButton } from "./InstallButton";

interface HomeScreenProps {
  onStart: () => void;
}

const animalsRow1 = ["🐰", "🐱", "🐻", "🐶", "🐠", "🐵"];
const animalsRow2 = ["🦁", "🐘", "🦒", "🦓", "🐯", "🐼"];

export const HomeScreen = ({ onStart }: HomeScreenProps) => {
  const handleShare = async () => {
    playClick();
    const shareData = {
      title: "Estúdio de Pintura dos Bichinhos",
      text: "Pinte bichinhos fofos com seu filho! Um app infantil de pintura com desafios.",
      url: window.location.href,
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch { /* user cancelled */ }
    } else {
      try {
        await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
      } catch { /* ignore */ }
    }
  };

  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-gradient-sky">
      {/* nuvens decorativas */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute top-6 left-4 text-4xl animate-float-soft sm:top-10 sm:left-6 sm:text-6xl">☁️</div>
        <div className="absolute top-16 right-6 text-3xl animate-float-soft sm:top-24 sm:right-10 sm:text-5xl" style={{ animationDelay: "1s" }}>☁️</div>
        <div className="absolute bottom-16 left-1/4 text-3xl animate-float-soft sm:bottom-20 sm:text-4xl" style={{ animationDelay: "2s" }}>🌈</div>
        <div className="absolute top-1/3 right-1/4 text-2xl animate-float-soft sm:text-3xl" style={{ animationDelay: "0.5s" }}>✨</div>
      </div>

      {/* Install + Share buttons */}
      <div className="absolute right-3 top-3 z-20 flex items-center gap-2 sm:right-4 sm:top-4">
        <InstallButton />
        <button
          onClick={handleShare}
          className="kid-shadow-pop flex h-11 w-11 items-center justify-center rounded-2xl bg-white/90 text-foreground backdrop-blur transition-transform hover:scale-105 active:scale-95 sm:h-12 sm:w-12"
          aria-label="Compartilhar app"
          title="Compartilhar"
        >
          <Share2 className="h-5 w-5" />
        </button>
      </div>

      <main className="relative z-10 mx-auto flex min-h-[100svh] max-w-4xl flex-col items-center justify-center px-4 py-6 text-center sm:px-6 sm:py-12">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
          className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-xs font-semibold text-primary shadow-sm backdrop-blur sm:px-5 sm:py-2 sm:text-sm"
        >
          <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Para pequenos artistas
        </motion.div>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mt-3 text-4xl font-extrabold leading-tight text-foreground sm:mt-4 sm:text-7xl"
        >
          Estúdio de Pintura
          <span className="mt-1 block bg-gradient-to-r from-paint-pink via-paint-orange to-paint-purple bg-clip-text text-transparent sm:mt-2">
            dos Bichinhos
          </span>
        </motion.h1>

        {/* fileiras de animais */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="my-5 flex flex-col items-center gap-1 sm:my-8 sm:gap-2"
        >
          <div className="flex items-end justify-center gap-1.5 sm:gap-4">
            {animalsRow1.map((a, i) => (
              <motion.div
                key={a}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.18 }}
                className="text-3xl drop-shadow-lg sm:text-6xl"
              >
                {a}
              </motion.div>
            ))}
          </div>
          <div className="flex items-end justify-center gap-1.5 sm:gap-4">
            {animalsRow2.map((a, i) => (
              <motion.div
                key={a}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.4 + i * 0.18 }}
                className="text-3xl drop-shadow-lg sm:text-6xl"
              >
                {a}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <p className="mb-6 max-w-md text-base text-muted-foreground sm:mb-10 sm:text-xl">
          Pinte, carimbe e ajude os bichinhos com missões divertidas!
        </p>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => { playClick(); onStart(); }}
          className="kid-shadow-pop group flex w-full max-w-md items-center justify-center gap-3 rounded-[2rem] bg-primary px-6 py-5 text-xl font-extrabold text-primary-foreground transition-colors hover:bg-primary/90 sm:px-8 sm:py-6 sm:text-2xl"
        >
          <Wand2 className="h-6 w-6 transition-transform group-hover:rotate-12 sm:h-7 sm:w-7" />
          Começar a pintar
        </motion.button>
      </main>
    </div>
  );
};
