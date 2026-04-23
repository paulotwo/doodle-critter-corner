import { useEffect, useState } from "react";
import { HomeScreen } from "@/components/studio/HomeScreen";
import { ThemeSelector, StudioMode } from "@/components/studio/ThemeSelector";
import { PaintStudio } from "@/components/studio/PaintStudio";
import { ThemeId } from "@/lib/studio-data";
import { requestAppFullscreen } from "@/lib/fullscreen";
import { useI18n } from "@/i18n";
import type { Locale } from "@/i18n";

const BASE_URL = "https://doodle-critter-corner.lovable.app";
const OG_IMAGE = "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/1f5471e1-91c8-4866-98f1-2eabdf157231/id-preview-861b83ac--3f212c36-9202-454b-8511-d68240d18827.lovable.app-1776474483065.png";

const ALL_LOCALES: Locale[] = ["pt", "en", "es", "fr", "it", "de"];

const HREFLANG_MAP: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en",
  es: "es",
  fr: "fr",
  it: "it",
  de: "de",
};

function setMeta(nameOrProp: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector(`meta[${attr}="${nameOrProp}"]`);
  if (el) { el.setAttribute("content", content); return; }
  el = document.createElement("meta");
  el.setAttribute(attr, nameOrProp);
  el.setAttribute("content", content);
  document.head.appendChild(el);
}

function setLink(rel: string, href: string, attrs?: Record<string, string>) {
  const selector = attrs
    ? `link[rel="${rel}"]${Object.entries(attrs).map(([k, v]) => `[${k}="${v}"]`).join("")}`
    : `link[rel="${rel}"]`;
  let el = document.querySelector(selector);
  if (el) { el.setAttribute("href", href); return; }
  el = document.createElement("link");
  el.setAttribute("rel", rel);
  el.setAttribute("href", href);
  if (attrs) Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
  document.head.appendChild(el);
}

type Screen = "home" | "themes" | "studio";

const META_DESCRIPTIONS: Record<string, string> = {
  pt: "Jogo educativo gratuito de pintura para crianças de 3 a 7 anos: aprenda cores, números, nomes de animais e desenvolva coordenação motora fina com 29 bichinhos e desafios lúdicos. Funciona offline!",
  en: "Free educational painting game for kids aged 3–7: learn colors, numbers, animal names and develop fine motor skills with 29 animals and fun challenges. Works offline!",
  es: "Juego educativo gratuito de pintura para niños de 3 a 7 años: aprende colores, números, nombres de animales y desarrolla motricidad fina con 29 animalitos y desafíos lúdicos. ¡Funciona sin internet!",
  fr: "Jeu éducatif gratuit de peinture pour enfants de 3 à 7 ans : apprends les couleurs, les chiffres, les noms d'animaux et développe la motricité fine avec 29 animaux et des défis ludiques. Fonctionne hors ligne !",
  it: "Gioco educativo gratuito di pittura per bambini da 3 a 7 anni: impara colori, numeri, nomi di animali e sviluppa la motricità fine con 29 animaletti e sfide divertenti. Funziona offline!",
  de: "Kostenloses Lernspiel zum Malen für Kinder von 3 bis 7 Jahren: Lerne Farben, Zahlen, Tiernamen und fördere die Feinmotorik mit 29 Tierchen und lustigen Aufgaben. Funktioniert offline!",
};

const META_TITLES: Record<string, string> = {
  pt: "Estúdio de Pintura dos Bichinhos – Jogo Educativo Infantil Grátis",
  en: "Animal Painting Studio – Free Educational Game for Kids",
  es: "Estudio de Pintura de Animalitos – Juego Educativo Infantil Gratis",
  fr: "Studio de Peinture des Animaux – Jeu Éducatif Gratuit pour Enfants",
  it: "Studio di Pittura degli Animaletti – Gioco Educativo Gratis per Bambini",
  de: "Mal-Studio der Tierchen – Kostenloses Lernspiel für Kinder",
};

const META_KEYWORDS: Record<string, string> = {
  pt: "jogo infantil, pintura para crianças, aprender cores, aprender números, coordenação motora fina, nomes de animais, jogo educativo gratuito, app offline crianças, colorir animais, atividade infantil",
  en: "kids game, painting for children, learn colors, learn numbers, fine motor skills, animal names, free educational game, offline kids app, coloring animals, toddler activity",
  es: "juego infantil, pintura para niños, aprender colores, aprender números, motricidad fina, nombres de animales, juego educativo gratis, app sin internet, colorear animales, actividad preescolar",
  fr: "jeu enfant, peinture pour enfants, apprendre les couleurs, apprendre les chiffres, motricité fine, noms d'animaux, jeu éducatif gratuit, app hors ligne, coloriage animaux, activité maternelle",
  it: "gioco bambini, pittura per bambini, imparare colori, imparare numeri, motricità fine, nomi animali, gioco educativo gratis, app offline, colorare animali, attività prescolare",
  de: "Kinderspiel, Malen für Kinder, Farben lernen, Zahlen lernen, Feinmotorik, Tiernamen, kostenloses Lernspiel, Offline-App Kinder, Tiere ausmalen, Vorschulaktivität",
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
    setMeta("robots", "index, follow, max-image-preview:large, max-snippet:-1");

    // Open Graph
    setMeta("og:title", title, "property");
    setMeta("og:description", desc, "property");
    setMeta("og:type", "website", "property");
    setMeta("og:url", BASE_URL, "property");
    setMeta("og:image", OG_IMAGE, "property");
    setMeta("og:image:width", "1200", "property");
    setMeta("og:image:height", "630", "property");
    setMeta("og:image:alt", title, "property");
    setMeta("og:locale", HREFLANG_MAP[locale], "property");
    setMeta("og:site_name", title.split("–")[0].trim(), "property");

    // Twitter
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", desc);
    setMeta("twitter:image", OG_IMAGE);
    setMeta("twitter:image:alt", title);

    // Hreflang alternate links
    ALL_LOCALES.forEach((loc) => {
      setLink("alternate", BASE_URL + "/", { hreflang: HREFLANG_MAP[loc] });
    });
    setLink("alternate", BASE_URL + "/", { hreflang: "x-default" });

    // Canonical
    setLink("canonical", BASE_URL + "/");

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
      "url": BASE_URL,
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Web",
      "browserRequirements": "Requires a modern browser with HTML5 Canvas support",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
      },
      "audience": {
        "@type": "EducationalAudience",
        "educationalRole": "student",
        "suggestedMinAge": 3,
        "suggestedMaxAge": 7,
      },
      "learningResourceType": ["interactive game", "painting activity", "coloring game"],
      "teaches": ["colors", "numbers", "animal names", "fine motor skills", "hand-eye coordination"],
      "inLanguage": ALL_LOCALES.map((loc) => HREFLANG_MAP[loc]),
      "availableLanguage": ALL_LOCALES.map((loc) => ({
        "@type": "Language",
        "name": HREFLANG_MAP[loc],
      })),
      "screenshot": OG_IMAGE,
      "softwareVersion": "1.0",
      "isAccessibleForFree": true,
      "isFamilyFriendly": true,
    });
  }, [t, locale]);

  if (screen === "home") {
    return (
      <HomeScreen
        onStart={() => {
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
