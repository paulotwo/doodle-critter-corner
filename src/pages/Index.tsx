import { useEffect, useState } from "react";
import { HomeScreen } from "@/components/studio/HomeScreen";
import { ThemeSelector, StudioMode } from "@/components/studio/ThemeSelector";
import { PaintStudio } from "@/components/studio/PaintStudio";
import { ThemeId } from "@/lib/studio-data";
import { requestAppFullscreen } from "@/lib/fullscreen";

type Screen = "home" | "themes" | "studio";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("home");
  const [mode, setMode] = useState<StudioMode>("challenge");
  const [theme, setTheme] = useState<ThemeId | null>(null);

  useEffect(() => {
    document.title = "Estúdio de Pintura dos Bichinhos";
    const meta = document.querySelector('meta[name="description"]');
    const desc = "App infantil de pintura para crianças de 4 anos: pinte bichinhos com baldinho e pincel, complete desafios divertidos.";
    if (meta) meta.setAttribute("content", desc);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = desc;
      document.head.appendChild(m);
    }
  }, []);

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
