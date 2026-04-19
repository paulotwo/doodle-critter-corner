import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { FINAL_MESSAGES } from "@/lib/studio-data";
import { playSuccess, playClick, speak } from "@/lib/sounds";

interface CelebrationModalProps {
  open: boolean;
  onPickAnotherAnimal: () => void;
  onContinueFree: () => void;
}

export const CelebrationModal = ({ open, onPickAnotherAnimal, onContinueFree }: CelebrationModalProps) => {
  const message = FINAL_MESSAGES[Math.floor(Math.random() * FINAL_MESSAGES.length)];

  useEffect(() => {
    if (!open) return;
    playSuccess();
    speak(message);
    const fire = (particleRatio: number, opts: confetti.Options) => {
      confetti({
        origin: { y: 0.6 },
        particleCount: Math.floor(220 * particleRatio),
        ...opts,
      });
    };
    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.9 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }, [open, message]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-6"
        >
          <motion.div
            initial={{ scale: 0.6, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
            className="kid-shadow-float w-full max-w-md rounded-[2.5rem] border-4 border-white bg-gradient-card p-8 text-center"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="mx-auto mb-4 text-8xl"
            >
              🏆
            </motion.div>
            <h2 className="mb-2 text-4xl font-extrabold text-primary">{message}</h2>
            <p className="mb-6 text-lg text-muted-foreground">Você completou todos os desafios! 🎉</p>

            <div className="flex flex-col gap-3">
              <motion.button
                whileTap={{ scale: 0.96 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => { playClick(); onContinueFree(); }}
                className="kid-shadow-pop w-full rounded-2xl bg-primary py-4 text-xl font-extrabold text-primary-foreground"
              >
                🎨 Continuar pintando
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.96 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => { playClick(); onPickAnotherAnimal(); }}
                className="w-full rounded-2xl bg-secondary py-4 text-lg font-bold text-secondary-foreground shadow-md"
              >
                ✨ Escolher outro bichinho
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
