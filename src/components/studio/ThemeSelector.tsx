import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { THEMES, ThemeId } from "@/lib/studio-data";
import { getAnimal } from "@/lib/animals";
import { playClick } from "@/lib/sounds";
import { useI18n } from "@/i18n";
import LanguageSelector from "@/components/LanguageSelector";

export type StudioMode = "free" | "challenge";

interface ThemeSelectorProps {
  mode: StudioMode;
  onModeChange: (m: StudioMode) => void;
  onPick: (id: ThemeId) => void;
  onBack: () => void;
}

export const ThemeSelector = ({ mode, onModeChange, onPick, onBack }: ThemeSelectorProps) => {
  const { t } = useI18n();
  return (
    <div className="min-h-screen bg-gradient-sky px-4 py-6 sm:px-8 sm:py-10">
      <header className="mx-auto mb-6 flex max-w-5xl items-center justify-between gap-2">
        <button
          onClick={() => { playClick(); onBack(); }}
          className="kid-shadow-pop flex items-center gap-2 rounded-full bg-white px-5 py-3 text-base font-bold text-foreground"
        >
          <ArrowLeft className="h-5 w-5" /> {t.back}
        </button>
        <LanguageSelector />
      </header>

      <div className="mx-auto max-w-5xl text-center">
        <motion.h2
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-2 text-4xl font-extrabold sm:text-5xl"
        >
          {t.howToPlay}
        </motion.h2>
        <p className="mb-5 text-lg text-muted-foreground">{t.pickModeAnimal}</p>

        {/* Mode toggle */}
        <div className="mb-8 flex justify-center">
          <div className="kid-shadow-pop inline-flex rounded-full border-4 border-white bg-card p-1">
            <button
              onClick={() => { playClick(); onModeChange("challenge"); }}
              className={`rounded-full px-5 py-2.5 text-base font-extrabold transition-all sm:px-7 sm:text-lg ${
                mode === "challenge" ? "bg-primary text-primary-foreground shadow" : "text-foreground"
              }`}
            >
              {t.modeChallenge}
            </button>
            <button
              onClick={() => { playClick(); onModeChange("free"); }}
              className={`rounded-full px-5 py-2.5 text-base font-extrabold transition-all sm:px-7 sm:text-lg ${
                mode === "free" ? "bg-primary text-primary-foreground shadow" : "text-foreground"
              }`}
            >
              {t.modeFree}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
          {THEMES.map((theme, i) => {
            const animal = getAnimal(theme.id);
            return (
              <motion.button
                key={theme.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, type: "spring", stiffness: 120 }}
                whileHover={{ scale: 1.04, rotate: -1 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => { playClick(); onPick(theme.id); }}
                className={`kid-shadow-pop relative aspect-[4/5] overflow-hidden rounded-[2rem] border-4 border-white bg-gradient-to-br ${theme.bg} p-3 text-left`}
              >
                <div className="flex h-full flex-col items-center justify-between">
                  <div className="self-end rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-foreground/70">
                    {mode === "challenge" ? t.challengesCount(theme.challenges.length) : t.freeBadge}
                  </div>
                  <motion.img
                    src={animal.src}
                    alt={theme.name}
                    width={256}
                    height={256}
                    loading="lazy"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
                    className="h-28 w-28 object-contain drop-shadow-md sm:h-36 sm:w-36"
                  />
                  <div className="w-full text-center">
                    <h3 className="text-xl font-extrabold sm:text-2xl">{theme.name}</h3>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-foreground/50 sm:text-xs">
                      {theme.scene}
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
