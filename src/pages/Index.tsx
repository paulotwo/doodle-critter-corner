import { useEffect, useState } from "react";
import { HomeScreen } from "@/components/studio/HomeScreen";
import { ThemeSelector, StudioMode } from "@/components/studio/ThemeSelector";
import { PaintStudio } from "@/components/studio/PaintStudio";
import { ThemeId } from "@/lib/studio-data";
import { requestAppFullscreen } from "@/lib/fullscreen";
import { useI18n } from "@/i18n";

type Screen = "home" | "themes" | "studio";

const META_DESCRIPTIONS: Record<string, string> = {
  pt: "App infantil de pintura para crianças de 4 anos: pinte bichinhos com baldinho e pincel, complete desafios divertidos.",
  en: "Kids painting app for 4-year-olds: paint cute animals with bucket and brush, complete fun challenges.",
  es: "App infantil de pintura para niños de 4 años: pinta animalitos con cubeta y pincel, completa desafíos divertidos.",
  fr: "Appli de peinture pour enfants de 4 ans : peins des animaux mignons avec seau et pinceau, des défis amusants.",
  it: "App di pittura per bambini di 4 anni: dipingi animaletti con secchiello e pennello, sfide divertenti.",
  de: "Mal-App für Kinder ab 4: Male süße Tiere mit Eimer und Pinsel, mit lustigen Aufgaben.",
};

const Index = () => {
  const [screen, setScreen] = useState<Screen>("home");
  const [mode, setMode] = useState<StudioMode>("challenge");
  const [theme, setTheme] = useState<ThemeId | null>(null);
  const { t, locale } = useI18n();

  useEffect(() => {
    document.title = `${t.appTitle} ${t.appTagline}`;
    const desc = META_DESCRIPTIONS[locale] ?? META_DESCRIPTIONS.en;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", desc);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = desc;
      document.head.appendChild(m);
    }
  }, [t, locale]);

  if (screen === "home") {
    return (
      <HomeScreen
        onStart={() => {
          // Best-effort fullscreen (skipped in PWA standalone mode)
          requestAppFullscreen();
          setScreen("themes");
        }}
      />
    );
  }

  if (screen === "themes" || !theme) {
    return (
      <ThemeSelector
        mode={mode}
        onModeChange={setMode}
        onPick={(id) => {
          setTheme(id);
          setScreen("studio");
        }}
        onBack={() => setScreen("home")}
      />
    );
  }

  return (
    <PaintStudio
      themeId={theme}
      mode={mode}
      onBack={() => setScreen("home")}
      onChangeTheme={() => setScreen("themes")}
    />
  );
};

export default Index;
