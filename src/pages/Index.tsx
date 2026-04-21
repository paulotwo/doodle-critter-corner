import { useEffect, useState } from "react";
import { HomeScreen } from "@/components/studio/HomeScreen";
import { ThemeSelector, StudioMode } from "@/components/studio/ThemeSelector";
import { PaintStudio } from "@/components/studio/PaintStudio";
import { ThemeId } from "@/lib/studio-data";
import { requestAppFullscreen } from "@/lib/fullscreen";
import { useI18n } from "@/i18n";

type Screen = "home" | "themes" | "studio";

const META_DESCRIPTIONS: Record<string, string> = {
  pt: "Jogo educativo de pintura para crianças: aprenda cores, números, nomes de animais e desenvolva coordenação motora fina com desafios lúdicos divertidos. Funciona offline!",
  en: "Educational painting game for kids: learn colors, numbers, animal names and develop fine motor skills with fun playful challenges. Works offline!",
  es: "Juego educativo de pintura para niños: aprende colores, números, nombres de animales y desarrolla motricidad fina con desafíos lúdicos. ¡Funciona sin internet!",
  fr: "Jeu éducatif de peinture pour enfants : apprends les couleurs, les chiffres, les noms d'animaux et développe la motricité fine avec des défis ludiques. Fonctionne hors ligne !",
  it: "Gioco educativo di pittura per bambini: impara colori, numeri, nomi di animali e sviluppa la motricità fine con sfide ludiche divertenti. Funziona offline!",
  de: "Lernspiel zum Malen für Kinder: Lerne Farben, Zahlen, Tiernamen und fördere die Feinmotorik mit lustigen spielerischen Aufgaben. Funktioniert offline!",
};

const META_TITLES: Record<string, string> = {
  pt: "Estúdio de Pintura dos Bichinhos – Jogo Educativo Infantil de Cores e Números",
  en: "Animal Painting Studio – Educational Color & Number Game for Kids",
  es: "Estudio de Pintura de Animalitos – Juego Educativo de Colores y Números",
  fr: "Studio de Peinture des Animaux – Jeu Éducatif de Couleurs et Chiffres",
  it: "Studio di Pittura degli Animaletti – Gioco Educativo di Colori e Numeri",
  de: "Mal-Studio der Tierchen – Lernspiel für Farben und Zahlen",
};

const META_KEYWORDS: Record<string, string> = {
  pt: "jogo infantil, pintura para crianças, aprender cores, aprender números, coordenação motora fina, nomes de animais, jogo educativo, app offline crianças",
  en: "kids game, painting for children, learn colors, learn numbers, fine motor skills, animal names, educational game, offline kids app",
  es: "juego infantil, pintura para niños, aprender colores, aprender números, motricidad fina, nombres de animales, juego educativo, app sin internet",
  fr: "jeu enfant, peinture pour enfants, apprendre les couleurs, apprendre les chiffres, motricité fine, noms d'animaux, jeu éducatif, app hors ligne",
  it: "gioco bambini, pittura per bambini, imparare colori, imparare numeri, motricità fine, nomi animali, gioco educativo, app offline",
  de: "Kinderspiel, Malen für Kinder, Farben lernen, Zahlen lernen, Feinmotorik, Tiernamen, Lernspiel, Offline-App Kinder",
};

const Index = () => {
  const [screen, setScreen] = useState<Screen>("home");
  const [mode, setMode] = useState<StudioMode>("challenge");
  const [theme, setTheme] = useState<ThemeId | null>(null);
  const { t, locale } = useI18n();

  useEffect(() => {
    const title = META_TITLES[locale] ?? META_TITLES.en;
    document.title = title;

    const desc = META_DESCRIPTIONS[locale] ?? META_DESCRIPTIONS.en;
    setMeta("description", desc);
    setMeta("keywords", META_KEYWORDS[locale] ?? META_KEYWORDS.en);

    // Open Graph & Twitter (dynamic)
    setMeta("og:title", title, "property");
    setMeta("og:description", desc, "property");
    setMeta("twitter:title", title, "name");
    setMeta("twitter:description", desc, "name");

    // JSON-LD structured data
    let jsonLd = document.getElementById("json-ld-seo");
    if (!jsonLd) {
      jsonLd = document.createElement("script");
      jsonLd.id = "json-ld-seo";
      jsonLd.setAttribute("type", "application/ld+json");
      document.head.appendChild(jsonLd);
    }
    jsonLd.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": title,
      "description": desc,
      "url": "https://doodle-critter-corner.lovable.app/",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "audience": { "@type": "EducationalAudience", "educationalRole": "student", "suggestedMinAge": 3, "suggestedMaxAge": 7 },
      "learningResourceType": ["interactive game", "painting activity"],
      "teaches": ["colors", "numbers", "animal names", "fine motor skills"],
      "inLanguage": locale,
    });
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
