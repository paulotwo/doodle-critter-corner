export type Locale = "pt" | "en" | "es" | "fr" | "it" | "de";

export interface Translations {
  // App
  appTitle: string;
  appTagline: string;
  appSubtitle: string;
  appDescription: string;
  startButton: string;
  shareApp: string;
  shareText: string;

  // Theme selector
  back: string;
  howToPlay: string;
  pickModeAnimal: string;
  modeChallenge: string;
  modeFree: string;
  challengesCount: (n: number) => string;
  freeBadge: string;

  // Toolbar
  bucket: string;
  brush: string;
  eraser: string;
  spray: string;
  glitter: string;
  pattern: string;
  clear: string;
  changeAnimal: string;
  share: string;
  shareTitle: string;
  shareMessage: (animal: string) => string;
  shareDownloaded: string;

  // Panel
  colorsTab: string;
  stampsTab: string;
  stampHint: string;

  // Celebration modal
  celebrationSubtitle: string;
  continuePainting: string;
  pickAnotherAnimal: string;

  // Free mode
  paintFreeHint: string;

  // PWA banner
  pwaInstall: string;
  pwaIos: string;
  pwaInstallButton: string;
  close: string;

  // Error boundary
  oops: string;
  oopsHint: string;
  reload: string;

  // Language selector
  language: string;

  // Categories
  categoryDomesticos: string;
  categoryFazenda: string;
  categoryPassaros: string;
  categorySelvagens: string;
  categoryAquaticos: string;
  categoryInsetos: string;
  categoryDinossauros: string;
}

const baseT: Record<Locale, Translations> = {
  pt: {
    appTitle: "Estúdio de Pintura",
    appTagline: "dos Bichinhos",
    appSubtitle: "Para pequenos artistas",
    appDescription: "Pinte, carimbe e ajude os bichinhos com missões divertidas!",
    startButton: "Começar a pintar",
    shareApp: "Compartilhar app",
    shareText: "Pinte bichinhos fofos com seu filho! Um app infantil de pintura com desafios.",

    back: "Voltar",
    howToPlay: "Como vamos brincar?",
    pickModeAnimal: "Escolha o modo e o bichinho",
    modeChallenge: "🎯 Desafio",
    modeFree: "🎨 Livre",
    challengesCount: (n) => `${n} desafios`,
    freeBadge: "Livre",

    bucket: "Baldinho",
    brush: "Pincel",
    eraser: "Borracha",
    spray: "Spray",
    glitter: "Glitter",
    pattern: "Estampa",
    clear: "Limpar",
    changeAnimal: "Trocar bichinho",
    share: "Compartilhar",
    shareTitle: "Meu desenho 🎨",
    shareMessage: (animal) => `Olha o meu ${animal} pintado!`,
    shareDownloaded: "Desenho salvo na galeria!",

    colorsTab: "Cores",
    stampsTab: "Carimbos",
    stampHint: "Toque na folha para colocar o carimbo!",

    celebrationSubtitle: "Você completou todos os desafios! 🎉",
    continuePainting: "🎨 Continuar pintando",
    pickAnotherAnimal: "✨ Escolher outro bichinho",
    paintFreeHint: "Pinte à vontade! 🎨",

    pwaInstall: "Instale o app para pintar sem internet!",
    pwaIos: "Para instalar, toque em ⬆️ Compartilhar e depois em «Adicionar à Tela Inicial».",
    pwaInstallButton: "Instalar",
    close: "Fechar",

    oops: "Ops! Algo deu errado 🐾",
    oopsHint: "Tente recarregar a página para continuar pintando.",
    reload: "Recarregar",

    language: "Idioma",

    categoryDomesticos: "Animais Domésticos",
    categoryFazenda: "Animais da Fazenda",
    categoryPassaros: "Pássaros",
    categorySelvagens: "Animais Selvagens",
    categoryAquaticos: "Animais Aquáticos",
    categoryInsetos: "Insetos",
    categoryDinossauros: "Dinossauros",
  },
  en: {
    appTitle: "Painting Studio",
    appTagline: "of the Animals",
    appSubtitle: "For little artists",
    appDescription: "Paint, stamp and help the animals with fun missions!",
    startButton: "Start painting",
    shareApp: "Share app",
    shareText: "Paint cute animals with your kid! A painting app with fun challenges.",

    back: "Back",
    howToPlay: "How shall we play?",
    pickModeAnimal: "Pick a mode and an animal",
    modeChallenge: "🎯 Challenge",
    modeFree: "🎨 Free",
    challengesCount: (n) => `${n} challenges`,
    freeBadge: "Free",

    bucket: "Bucket",
    brush: "Brush",
    eraser: "Eraser",
    spray: "Spray",
    glitter: "Glitter",
    pattern: "Pattern",
    clear: "Clear",
    changeAnimal: "Change animal",
    share: "Share",
    shareTitle: "My drawing 🎨",
    shareMessage: (animal) => `Look at my ${animal} I painted!`,
    shareDownloaded: "Drawing saved to your device!",

    colorsTab: "Colors",
    stampsTab: "Stamps",
    stampHint: "Tap the canvas to place a stamp!",

    celebrationSubtitle: "You finished all challenges! 🎉",
    continuePainting: "🎨 Keep painting",
    pickAnotherAnimal: "✨ Pick another animal",
    paintFreeHint: "Paint freely! 🎨",

    pwaInstall: "Install the app to paint offline!",
    pwaIos: "To install, tap ⬆️ Share and then «Add to Home Screen».",
    pwaInstallButton: "Install",
    close: "Close",

    oops: "Oops! Something went wrong 🐾",
    oopsHint: "Try reloading the page to keep painting.",
    reload: "Reload",

    language: "Language",

    categoryDomesticos: "Pets",
    categoryFazenda: "Farm Animals",
    categoryPassaros: "Birds",
    categorySelvagens: "Wild Animals",
    categoryAquaticos: "Aquatic Animals",
    categoryInsetos: "Bugs & Insects",
    categoryDinossauros: "Dinosaurs",
  },
  es: {
    appTitle: "Estudio de Pintura",
    appTagline: "de los Animalitos",
    appSubtitle: "Para pequeños artistas",
    appDescription: "¡Pinta, sella y ayuda a los animalitos con misiones divertidas!",
    startButton: "Empezar a pintar",
    shareApp: "Compartir app",
    shareText: "¡Pinta animalitos con tu hijo! Una app infantil con desafíos.",

    back: "Volver",
    howToPlay: "¿Cómo vamos a jugar?",
    pickModeAnimal: "Elige el modo y el animalito",
    modeChallenge: "🎯 Desafío",
    modeFree: "🎨 Libre",
    challengesCount: (n) => `${n} desafíos`,
    freeBadge: "Libre",

    bucket: "Cubeta",
    brush: "Pincel",
    eraser: "Borrador",
    spray: "Spray",
    glitter: "Brillo",
    pattern: "Estampa",
    clear: "Limpiar",
    changeAnimal: "Cambiar animalito",
    share: "Compartir",
    shareTitle: "Mi dibujo 🎨",
    shareMessage: (animal) => `¡Mira mi ${animal} pintado!`,
    shareDownloaded: "¡Dibujo guardado!",

    colorsTab: "Colores",
    stampsTab: "Sellos",
    stampHint: "¡Toca la hoja para poner un sello!",

    celebrationSubtitle: "¡Completaste todos los desafíos! 🎉",
    continuePainting: "🎨 Seguir pintando",
    pickAnotherAnimal: "✨ Elegir otro animalito",
    paintFreeHint: "¡Pinta libremente! 🎨",

    pwaInstall: "¡Instala la app para pintar sin internet!",
    pwaIos: "Para instalar, toca ⬆️ Compartir y luego «Agregar a inicio».",
    pwaInstallButton: "Instalar",
    close: "Cerrar",

    oops: "¡Uy! Algo salió mal 🐾",
    oopsHint: "Recarga la página para seguir pintando.",
    reload: "Recargar",

    language: "Idioma",

    categoryDomesticos: "Mascotas",
    categoryFazenda: "Animales de Granja",
    categoryPassaros: "Pájaros",
    categorySelvagens: "Animales Salvajes",
    categoryAquaticos: "Animales Acuáticos",
    categoryInsetos: "Insectos",
    categoryDinossauros: "Dinosaurios",
  },
  fr: {
    appTitle: "Studio de Peinture",
    appTagline: "des Petits Animaux",
    appSubtitle: "Pour les petits artistes",
    appDescription: "Peins, tamponne et aide les animaux avec des missions amusantes !",
    startButton: "Commencer à peindre",
    shareApp: "Partager l'app",
    shareText: "Peins des animaux mignons avec ton enfant ! Une appli avec des défis.",

    back: "Retour",
    howToPlay: "On joue comment ?",
    pickModeAnimal: "Choisis le mode et l'animal",
    modeChallenge: "🎯 Défi",
    modeFree: "🎨 Libre",
    challengesCount: (n) => `${n} défis`,
    freeBadge: "Libre",

    bucket: "Seau",
    brush: "Pinceau",
    eraser: "Gomme",
    spray: "Spray",
    glitter: "Paillettes",
    pattern: "Motif",
    clear: "Effacer",
    changeAnimal: "Changer d'animal",
    share: "Partager",
    shareTitle: "Mon dessin 🎨",
    shareMessage: (animal) => `Regarde mon ${animal} que j'ai peint !`,
    shareDownloaded: "Dessin enregistré !",

    colorsTab: "Couleurs",
    stampsTab: "Tampons",
    stampHint: "Touche la feuille pour poser un tampon !",

    celebrationSubtitle: "Tu as fini tous les défis ! 🎉",
    continuePainting: "🎨 Continuer à peindre",
    pickAnotherAnimal: "✨ Choisir un autre animal",
    paintFreeHint: "Peins librement ! 🎨",

    pwaInstall: "Installe l'appli pour peindre sans internet !",
    pwaIos: "Pour installer, touche ⬆️ Partager puis «Ajouter à l'écran d'accueil».",
    pwaInstallButton: "Installer",
    close: "Fermer",

    oops: "Oups ! Quelque chose a mal tourné 🐾",
    oopsHint: "Recharge la page pour continuer à peindre.",
    reload: "Recharger",

    language: "Langue",

    categoryDomesticos: "Animaux de compagnie",
    categoryFazenda: "Animaux de la ferme",
    categoryPassaros: "Oiseaux",
    categorySelvagens: "Animaux sauvages",
    categoryAquaticos: "Animaux aquatiques",
    categoryInsetos: "Insectes",
    categoryDinossauros: "Dinosaures",
  },
  it: {
    appTitle: "Studio di Pittura",
    appTagline: "degli Animaletti",
    appSubtitle: "Per piccoli artisti",
    appDescription: "Dipingi, timbra e aiuta gli animaletti con missioni divertenti!",
    startButton: "Inizia a dipingere",
    shareApp: "Condividi app",
    shareText: "Dipingi animaletti con il tuo bambino! Un'app con sfide divertenti.",

    back: "Indietro",
    howToPlay: "Come giochiamo?",
    pickModeAnimal: "Scegli la modalità e l'animaletto",
    modeChallenge: "🎯 Sfida",
    modeFree: "🎨 Libero",
    challengesCount: (n) => `${n} sfide`,
    freeBadge: "Libero",

    bucket: "Secchiello",
    brush: "Pennello",
    eraser: "Gomma",
    spray: "Spray",
    glitter: "Glitter",
    pattern: "Fantasia",
    clear: "Pulisci",
    changeAnimal: "Cambia animaletto",
    share: "Condividi",
    shareTitle: "Il mio disegno 🎨",
    shareMessage: (animal) => `Guarda il mio ${animal} dipinto!`,
    shareDownloaded: "Disegno salvato!",

    colorsTab: "Colori",
    stampsTab: "Timbri",
    stampHint: "Tocca il foglio per mettere un timbro!",

    celebrationSubtitle: "Hai finito tutte le sfide! 🎉",
    continuePainting: "🎨 Continua a dipingere",
    pickAnotherAnimal: "✨ Scegli un altro animaletto",
    paintFreeHint: "Dipingi liberamente! 🎨",

    pwaInstall: "Installa l'app per dipingere senza internet!",
    pwaIos: "Per installare, tocca ⬆️ Condividi e poi «Aggiungi a Home».",
    pwaInstallButton: "Installa",
    close: "Chiudi",

    oops: "Ops! Qualcosa è andato storto 🐾",
    oopsHint: "Ricarica la pagina per continuare a dipingere.",
    reload: "Ricarica",

    language: "Lingua",

    categoryDomesticos: "Animali domestici",
    categoryFazenda: "Animali della fattoria",
    categoryPassaros: "Uccelli",
    categorySelvagens: "Animali selvatici",
    categoryAquaticos: "Animali acquatici",
    categoryInsetos: "Insetti",
    categoryDinossauros: "Dinosauri",
  },
  de: {
    appTitle: "Mal-Studio",
    appTagline: "der Tierchen",
    appSubtitle: "Für kleine Künstler",
    appDescription: "Male, stemple und hilf den Tierchen mit lustigen Aufgaben!",
    startButton: "Los malen",
    shareApp: "App teilen",
    shareText: "Mal süße Tiere mit deinem Kind! Eine Mal-App mit lustigen Aufgaben.",

    back: "Zurück",
    howToPlay: "Wie wollen wir spielen?",
    pickModeAnimal: "Wähle Modus und Tierchen",
    modeChallenge: "🎯 Aufgabe",
    modeFree: "🎨 Frei",
    challengesCount: (n) => `${n} Aufgaben`,
    freeBadge: "Frei",

    bucket: "Eimer",
    brush: "Pinsel",
    eraser: "Radierer",
    spray: "Spray",
    glitter: "Glitzer",
    pattern: "Muster",
    clear: "Löschen",
    changeAnimal: "Tier wechseln",
    share: "Teilen",
    shareTitle: "Mein Bild 🎨",
    shareMessage: (animal) => `Schau, mein gemaltes ${animal}!`,
    shareDownloaded: "Bild gespeichert!",

    colorsTab: "Farben",
    stampsTab: "Stempel",
    stampHint: "Tippe auf das Blatt, um einen Stempel zu setzen!",

    celebrationSubtitle: "Du hast alle Aufgaben geschafft! 🎉",
    continuePainting: "🎨 Weiter malen",
    pickAnotherAnimal: "✨ Anderes Tier wählen",
    paintFreeHint: "Male frei drauf los! 🎨",

    pwaInstall: "Installiere die App, um offline zu malen!",
    pwaIos: "Zum Installieren tippe auf ⬆️ Teilen und dann «Zum Home-Bildschirm».",
    pwaInstallButton: "Installieren",
    close: "Schließen",

    oops: "Ups! Etwas ist schiefgelaufen 🐾",
    oopsHint: "Lade die Seite neu, um weiter zu malen.",
    reload: "Neu laden",

    language: "Sprache",

    categoryDomesticos: "Haustiere",
    categoryFazenda: "Bauernhoftiere",
    categoryPassaros: "Vögel",
    categorySelvagens: "Wildtiere",
    categoryAquaticos: "Wassertiere",
    categoryInsetos: "Insekten",
    categoryDinossauros: "Dinosaurier",
  },
};

export const translations = baseT;
