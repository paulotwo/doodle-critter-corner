import { motion, AnimatePresence } from "framer-motion";
import { Volume2 } from "lucide-react";
import { Challenge, ThemeDef } from "@/lib/studio-data";
import { playClick, speak } from "@/lib/sounds";
import { useI18n } from "@/i18n";

interface ChallengeBoxProps {
  theme: ThemeDef;
  challenge: Challenge | null;
  progress: number; // 0..1
  hint?: string;
}

export const ChallengeBox = ({ theme, challenge, progress, hint }: ChallengeBoxProps) => {
  const { t } = useI18n();
  const handleSpeak = () => {
    playClick();
    if (challenge) speak(`${challenge.text}. ${challenge.hint}`, { interrupt: true });
  };

  return (
    <motion.div
      layout
      className="kid-shadow-pop mx-auto flex w-full max-w-3xl items-center gap-3 rounded-[1.75rem] border-4 border-white bg-card px-3 py-3 sm:gap-4 sm:px-5 sm:py-4"
    >
      <motion.div
        animate={{ rotate: [0, -6, 6, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-paint-orange text-3xl shadow-inner sm:h-16 sm:w-16 sm:text-4xl"
      >
        {theme.emoji}
      </motion.div>

      <div className="min-w-0 flex-1">
        <AnimatePresence mode="wait">
          {challenge ? (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">{challenge.icon}</span>
                <p className="truncate text-base font-extrabold leading-tight sm:text-xl">{challenge.text}</p>
              </div>
              <p className="truncate text-xs text-muted-foreground sm:text-sm">{hint ?? challenge.hint}</p>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full bg-gradient-rainbow"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, progress * 100)}%` }}
                  transition={{ type: "spring", stiffness: 80 }}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div key="free" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="text-base font-extrabold sm:text-xl">{theme.greeting}</p>
              <p className="text-xs text-muted-foreground sm:text-sm">{t.paintFreeHint}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {challenge && (
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleSpeak}
          aria-label="Ouvir desafio"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground shadow-md sm:h-14 sm:w-14"
        >
          <Volume2 className="h-6 w-6" />
        </motion.button>
      )}
    </motion.div>
  );
};
