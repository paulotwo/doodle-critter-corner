import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { THEMES, ThemeId, CATEGORIES, CategoryId, THEME_CATEGORY } from "@/lib/studio-data";
import { getAnimal } from "@/lib/animals";
import { playClick } from "@/lib/sounds";
import { useI18n } from "@/i18n";
import { getAnimalName, getSceneName } from "@/i18n/studio-translations";
import LanguageSelector from "@/components/LanguageSelector";

interface ThemeSelectorProps {
  onPick: (id: ThemeId) => void;
  onBack: () => void;
}

const CATEGORY_LABEL_KEY: Record<CategoryId, keyof ReturnType<typeof useI18n>["t"]> = {
  domesticos: "categoryDomesticos",
  fazenda: "categoryFazenda",
  passaros: "categoryPassaros",
  selvagens: "categorySelvagens",
  aquaticos: "categoryAquaticos",
  insetos: "categoryInsetos",
  dinossauros: "categoryDinossauros",
};

export const ThemeSelector = ({ onPick, onBack }: ThemeSelectorProps) => {
  const { t, locale } = useI18n();

  // Group themes by category
  const grouped = CATEGORIES.map((cat) => ({
    cat,
    themes: THEMES.filter((th) => THEME_CATEGORY[th.id] === cat.id),
  })).filter((g) => g.themes.length > 0);

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
        <p className="mb-8 text-lg text-muted-foreground">{t.pickModeAnimal}</p>

        <div className="space-y-10">
          {grouped.map(({ cat, themes }, sectionIdx) => (
            <section key={cat.id} aria-label={t[CATEGORY_LABEL_KEY[cat.id]] as string}>
              <motion.h3
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-4 flex items-center gap-3 text-left text-2xl font-extrabold sm:text-3xl"
              >
                <span className="text-3xl sm:text-4xl">{cat.emoji}</span>
                <span>{t[CATEGORY_LABEL_KEY[cat.id]] as string}</span>
                <span className="ml-2 rounded-full bg-white px-3 py-1 text-xs font-bold text-foreground/60 shadow">
                  {themes.length}
                </span>
              </motion.h3>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
                {themes.map((theme, i) => {
                  const animal = getAnimal(theme.id);
                  return (
                    <motion.button
                      key={theme.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: Math.min(i * 0.05, 0.4) + sectionIdx * 0.04, type: "spring", stiffness: 120 }}
                      whileHover={{ scale: 1.04, rotate: -1 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => { playClick(); onPick(theme.id); }}
                      className={`kid-shadow-pop relative aspect-[4/5] overflow-hidden rounded-[2rem] border-4 border-white bg-gradient-to-br ${theme.bg} p-3 text-left`}
                    >
                      <div className="flex h-full flex-col items-center justify-between">
                        <div className="self-end rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-foreground/70">
                          {t.challengesCount(theme.challenges.length)}
                        </div>
                        <motion.img
                          src={animal.srcSmall}
                          alt={theme.name}
                          width={256}
                          height={256}
                          loading="lazy"
                          animate={{ y: [0, -6, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
                          className="h-28 w-28 object-contain drop-shadow-md sm:h-36 sm:w-36"
                        />
                        <div className="w-full text-center">
                          <h3 className="text-xl font-extrabold sm:text-2xl">{getAnimalName(theme.id, locale)}</h3>
                          <p className="text-[10px] font-semibold uppercase tracking-wide text-foreground/50 sm:text-xs">
                            {getSceneName(theme.scene, locale)}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};
