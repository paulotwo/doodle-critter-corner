import type { Locale } from "./translations";
import type { Challenge, ChallengeKind, ThemeDef, ThemeId, StampId } from "@/lib/studio-data";

// ===== Animal Names =====
const animalNames: Record<ThemeId, Record<Locale, string>> = {
  cachorrinho: { pt: "Cachorrinho", en: "Puppy", es: "Perrito", fr: "Petit chien", it: "Cagnolino", de: "Hündchen" },
  gatinho: { pt: "Gatinho", en: "Kitty", es: "Gatito", fr: "Petit chat", it: "Gattino", de: "Kätzchen" },
  coelhinho: { pt: "Coelhinho", en: "Bunny", es: "Conejito", fr: "Petit lapin", it: "Coniglietto", de: "Häschen" },
  passarinho: { pt: "Passarinho", en: "Little Bird", es: "Pajarito", fr: "Petit oiseau", it: "Uccellino", de: "Vögelchen" },
  ursinho: { pt: "Ursinho", en: "Bear Cub", es: "Osito", fr: "Petit ours", it: "Orsetto", de: "Bärchen" },
  raposinha: { pt: "Raposinha", en: "Little Fox", es: "Zorrita", fr: "Petit renard", it: "Volpina", de: "Füchschen" },
  corujinha: { pt: "Corujinha", en: "Little Owl", es: "Lechuza", fr: "Petite chouette", it: "Civettina", de: "Eulchen" },
  macaquinho: { pt: "Macaquinho", en: "Little Monkey", es: "Monito", fr: "Petit singe", it: "Scimmietta", de: "Äffchen" },
  leaozinho: { pt: "Leãozinho", en: "Little Lion", es: "Leoncito", fr: "Petit lion", it: "Leoncino", de: "Löwchen" },
  elefantinho: { pt: "Elefantinho", en: "Little Elephant", es: "Elefantito", fr: "Petit éléphant", it: "Elefantino", de: "Elefäntchen" },
  girafinha: { pt: "Girafinha", en: "Little Giraffe", es: "Jirafita", fr: "Petite girafe", it: "Giraffina", de: "Giräffchen" },
  zebrinha: { pt: "Zebrinha", en: "Little Zebra", es: "Cebrita", fr: "Petit zèbre", it: "Zebrina", de: "Zebrachen" },
  tigrinho: { pt: "Tigrinho", en: "Little Tiger", es: "Tigrecito", fr: "Petit tigre", it: "Tigrotto", de: "Tigerchen" },
  pandinha: { pt: "Pandinha", en: "Little Panda", es: "Pandita", fr: "Petit panda", it: "Pandino", de: "Pandabärchen" },
  peixinho: { pt: "Peixinho", en: "Little Fish", es: "Pececito", fr: "Petit poisson", it: "Pesciolino", de: "Fischlein" },
  tartaruguinha: { pt: "Tartaruguinha", en: "Little Turtle", es: "Tortuguita", fr: "Petite tortue", it: "Tartarughina", de: "Schildkrötchen" },
  baleinha: { pt: "Baleinha", en: "Little Whale", es: "Ballenita", fr: "Petite baleine", it: "Balenina", de: "Wälchen" },
  golfinho: { pt: "Golfinho", en: "Dolphin", es: "Delfín", fr: "Dauphin", it: "Delfino", de: "Delfin" },
  polvinho: { pt: "Polvinho", en: "Little Octopus", es: "Pulpito", fr: "Petit poulpe", it: "Polpetto", de: "Krakchen" },
  cavalinho_marinho: { pt: "Cavalinho-marinho", en: "Seahorse", es: "Caballito de mar", fr: "Hippocampe", it: "Cavalluccio marino", de: "Seepferdchen" },
  rexinho: { pt: "Rexinho (T-Rex)", en: "Little Rex (T-Rex)", es: "Rexito (T-Rex)", fr: "Petit Rex (T-Rex)", it: "Rexino (T-Rex)", de: "Rexchen (T-Rex)" },
  tricerinho: { pt: "Tricerinho (Tricerátops)", en: "Little Triceratops", es: "Tricerito", fr: "Petit Tricératops", it: "Triceratopino", de: "Triceräpschen" },
  brontinho: { pt: "Brontinho (Brontossauro)", en: "Little Brontosaurus", es: "Brontito", fr: "Petit Brontosaure", it: "Brontino", de: "Brontochen" },
  pterossaurinho: { pt: "Pterossaurinho", en: "Little Pterosaur", es: "Pterosaurito", fr: "Petit Ptérosaure", it: "Pterosaurino", de: "Pterosäurchen" },
};

// ===== Scene Names =====
const sceneTranslations: Record<string, Record<Locale, string>> = {
  quintal: { pt: "Quintal", en: "Backyard", es: "Patio", fr: "Jardin", it: "Cortile", de: "Hof" },
  casinha: { pt: "Casinha", en: "Little house", es: "Casita", fr: "Maisonnette", it: "Casetta", de: "Häuschen" },
  jardim: { pt: "Jardim", en: "Garden", es: "Jardín", fr: "Jardin", it: "Giardino", de: "Garten" },
  floresta: { pt: "Floresta", en: "Forest", es: "Bosque", fr: "Forêt", it: "Foresta", de: "Wald" },
  "floresta à noite": { pt: "Floresta à noite", en: "Night forest", es: "Bosque de noche", fr: "Forêt la nuit", it: "Foresta di notte", de: "Nachtwald" },
  selva: { pt: "Selva", en: "Jungle", es: "Selva", fr: "Jungle", it: "Giungla", de: "Dschungel" },
  savana: { pt: "Savana", en: "Savanna", es: "Sabana", fr: "Savane", it: "Savana", de: "Savanne" },
  safári: { pt: "Safári", en: "Safari", es: "Safari", fr: "Safari", it: "Safari", de: "Safari" },
  bambuzal: { pt: "Bambuzal", en: "Bamboo grove", es: "Bambusal", fr: "Bambouseraie", it: "Bambuseto", de: "Bambushain" },
  "fundo do mar": { pt: "Fundo do mar", en: "Under the sea", es: "Fondo del mar", fr: "Fond de la mer", it: "Fondo del mare", de: "Meeresgrund" },
  oceano: { pt: "Oceano", en: "Ocean", es: "Océano", fr: "Océan", it: "Oceano", de: "Ozean" },
  "pré-história": { pt: "Pré-história", en: "Prehistory", es: "Prehistoria", fr: "Préhistoire", it: "Preistoria", de: "Urzeit" },
  "céu pré-histórico": { pt: "Céu pré-histórico", en: "Prehistoric sky", es: "Cielo prehistórico", fr: "Ciel préhistorique", it: "Cielo preistorico", de: "Urzeitlicher Himmel" },
};

// ===== Greetings =====
const greetingTranslations: Record<ThemeId, Record<Locale, string>> = {
  cachorrinho: { pt: "O cachorrinho está no quintal!", en: "The puppy is in the backyard!", es: "¡El perrito está en el patio!", fr: "Le petit chien est dans le jardin !", it: "Il cagnolino è nel cortile!", de: "Das Hündchen ist im Hof!" },
  gatinho: { pt: "O gatinho quer brincar!", en: "The kitty wants to play!", es: "¡El gatito quiere jugar!", fr: "Le petit chat veut jouer !", it: "Il gattino vuole giocare!", de: "Das Kätzchen will spielen!" },
  coelhinho: { pt: "O coelhinho está no jardim!", en: "The bunny is in the garden!", es: "¡El conejito está en el jardín!", fr: "Le petit lapin est dans le jardin !", it: "Il coniglietto è nel giardino!", de: "Das Häschen ist im Garten!" },
  passarinho: { pt: "O passarinho está no jardim!", en: "The little bird is in the garden!", es: "¡El pajarito está en el jardín!", fr: "Le petit oiseau est dans le jardin !", it: "L'uccellino è nel giardino!", de: "Das Vögelchen ist im Garten!" },
  ursinho: { pt: "O ursinho está na floresta!", en: "The bear cub is in the forest!", es: "¡El osito está en el bosque!", fr: "Le petit ours est dans la forêt !", it: "L'orsetto è nella foresta!", de: "Das Bärchen ist im Wald!" },
  raposinha: { pt: "A raposinha está na floresta!", en: "The little fox is in the forest!", es: "¡La zorrita está en el bosque!", fr: "Le petit renard est dans la forêt !", it: "La volpina è nella foresta!", de: "Das Füchschen ist im Wald!" },
  corujinha: { pt: "A corujinha voa de noite!", en: "The little owl flies at night!", es: "¡La lechuza vuela de noche!", fr: "La petite chouette vole la nuit !", it: "La civettina vola di notte!", de: "Das Eulchen fliegt in der Nacht!" },
  macaquinho: { pt: "O macaquinho está na selva!", en: "The little monkey is in the jungle!", es: "¡El monito está en la selva!", fr: "Le petit singe est dans la jungle !", it: "La scimmietta è nella giungla!", de: "Das Äffchen ist im Dschungel!" },
  leaozinho: { pt: "O leãozinho está na savana!", en: "The little lion is in the savanna!", es: "¡El leoncito está en la sabana!", fr: "Le petit lion est dans la savane !", it: "Il leoncino è nella savana!", de: "Das Löwchen ist in der Savanne!" },
  elefantinho: { pt: "O elefantinho está no safári!", en: "The little elephant is on safari!", es: "¡El elefantito está en el safari!", fr: "Le petit éléphant est en safari !", it: "L'elefantino è nel safari!", de: "Das Elefäntchen ist auf Safari!" },
  girafinha: { pt: "A girafinha está na savana!", en: "The little giraffe is in the savanna!", es: "¡La jirafita está en la sabana!", fr: "La petite girafe est dans la savane !", it: "La giraffina è nella savana!", de: "Das Giräffchen ist in der Savanne!" },
  zebrinha: { pt: "A zebrinha está na savana!", en: "The little zebra is in the savanna!", es: "¡La cebrita está en la sabana!", fr: "Le petit zèbre est dans la savane !", it: "La zebrina è nella savana!", de: "Das Zebrachen ist in der Savanne!" },
  tigrinho: { pt: "O tigrinho está na selva!", en: "The little tiger is in the jungle!", es: "¡El tigrecito está en la selva!", fr: "Le petit tigre est dans la jungle !", it: "Il tigrotto è nella giungla!", de: "Das Tigerchen ist im Dschungel!" },
  pandinha: { pt: "O pandinha está no bambuzal!", en: "The little panda is in the bamboo grove!", es: "¡El pandita está en el bambusal!", fr: "Le petit panda est dans la bambouseraie !", it: "Il pandino è nel bambuseto!", de: "Das Pandabärchen ist im Bambushain!" },
  peixinho: { pt: "Vamos pintar o peixinho no fundo do mar!", en: "Let's paint the little fish under the sea!", es: "¡Vamos a pintar el pececito en el fondo del mar!", fr: "Peignons le petit poisson au fond de la mer !", it: "Dipingiamo il pesciolino in fondo al mare!", de: "Malen wir das Fischlein am Meeresgrund!" },
  tartaruguinha: { pt: "A tartaruguinha nada no mar!", en: "The little turtle swims in the sea!", es: "¡La tortuguita nada en el mar!", fr: "La petite tortue nage dans la mer !", it: "La tartarughina nuota nel mare!", de: "Das Schildkrötchen schwimmt im Meer!" },
  baleinha: { pt: "A baleinha nada no oceano!", en: "The little whale swims in the ocean!", es: "¡La ballenita nada en el océano!", fr: "La petite baleine nage dans l'océan !", it: "La balenina nuota nell'oceano!", de: "Das Wälchen schwimmt im Ozean!" },
  golfinho: { pt: "O golfinho pula no mar!", en: "The dolphin jumps in the sea!", es: "¡El delfín salta en el mar!", fr: "Le dauphin saute dans la mer !", it: "Il delfino salta nel mare!", de: "Der Delfin springt im Meer!" },
  polvinho: { pt: "O polvinho dança no mar!", en: "The little octopus dances in the sea!", es: "¡El pulpito baila en el mar!", fr: "Le petit poulpe danse dans la mer !", it: "Il polpetto danza nel mare!", de: "Das Krakchen tanzt im Meer!" },
  cavalinho_marinho: { pt: "O cavalinho-marinho nada devagarzinho!", en: "The seahorse swims slowly!", es: "¡El caballito de mar nada despacito!", fr: "L'hippocampe nage tout doucement !", it: "Il cavalluccio marino nuota piano piano!", de: "Das Seepferdchen schwimmt ganz langsam!" },
  rexinho: { pt: "O Rexinho está caçando na pré-história!", en: "Little Rex is hunting in prehistory!", es: "¡Rexito está cazando en la prehistoria!", fr: "Petit Rex chasse dans la préhistoire !", it: "Rexino sta cacciando nella preistoria!", de: "Rexchen jagt in der Urzeit!" },
  tricerinho: { pt: "O Tricerinho tem três chifres!", en: "Little Triceratops has three horns!", es: "¡Tricerito tiene tres cuernos!", fr: "Petit Tricératops a trois cornes !", it: "Triceratopino ha tre corna!", de: "Triceräpschen hat drei Hörner!" },
  brontinho: { pt: "O Brontinho tem o pescoço bem longo!", en: "Little Brontosaurus has a very long neck!", es: "¡Brontito tiene el cuello muy largo!", fr: "Petit Brontosaure a un très long cou !", it: "Brontino ha un collo lunghissimo!", de: "Brontochen hat einen sehr langen Hals!" },
  pterossaurinho: { pt: "O Pterossaurinho voa bem alto!", en: "Little Pterosaur flies very high!", es: "¡Pterosaurito vuela muy alto!", fr: "Petit Ptérosaure vole très haut !", it: "Pterosaurino vola altissimo!", de: "Pterosäurchen fliegt ganz hoch!" },
};

// ===== Part Labels (with article for template insertion) =====
const partLabelMap: Record<string, Record<Locale, string>> = {
  corpinho: { pt: "o corpinho", en: "the body", es: "el cuerpecito", fr: "le corps", it: "il corpicino", de: "den Körper" },
  orelha: { pt: "as orelhinhas", en: "the ears", es: "las orejitas", fr: "les oreilles", it: "le orecchie", de: "die Ohren" },
  cabeça: { pt: "a cabeça", en: "the head", es: "la cabecita", fr: "la tête", it: "la testina", de: "den Kopf" },
  rabinho: { pt: "o rabinho", en: "the tail", es: "la colita", fr: "la queue", it: "la codina", de: "den Schwanz" },
  barriguinha: { pt: "a barriguinha", en: "the tummy", es: "la pancita", fr: "le ventre", it: "la pancina", de: "den Bauch" },
  juba: { pt: "a juba", en: "the mane", es: "la melena", fr: "la crinière", it: "la criniera", de: "die Mähne" },
  pescoço: { pt: "o pescoço", en: "the neck", es: "el cuello", fr: "le cou", it: "il collo", de: "den Hals" },
  pescocinho: { pt: "o pescocinho", en: "the neck", es: "el cuellito", fr: "le petit cou", it: "il collino", de: "den Hals" },
  coração: { pt: "o coração", en: "the heart", es: "el corazón", fr: "le cœur", it: "il cuore", de: "das Herz" },
  rostinho: { pt: "o rostinho", en: "the face", es: "la carita", fr: "le visage", it: "il visino", de: "das Gesicht" },
  biquinho: { pt: "o biquinho", en: "the beak", es: "el piquito", fr: "le bec", it: "il beccuccio", de: "den Schnabel" },
  casquinho: { pt: "o casquinho", en: "the shell", es: "el caparazón", fr: "la carapace", it: "il guscio", de: "den Panzer" },
  tentáculo: { pt: "um tentáculo", en: "a tentacle", es: "un tentáculo", fr: "un tentacule", it: "un tentacolo", de: "einen Tentakel" },
  coroinha: { pt: "a coroinha", en: "the crown", es: "la coronita", fr: "la couronne", it: "la coroncina", de: "die Krone" },
  espinhos: { pt: "os espinhos", en: "the spikes", es: "las espinas", fr: "les piques", it: "gli aculei", de: "die Stacheln" },
  asinha: { pt: "as asinhas", en: "the wings", es: "las alitas", fr: "les ailes", it: "le alette", de: "die Flügel" },
  coroa: { pt: "a coroa", en: "the frill", es: "la corona", fr: "la collerette", it: "il collare", de: "den Nackenschild" },
};

// ===== Color Labels =====
const colorLabelMap: Record<string, Record<Locale, string>> = {
  marrom: { pt: "marrom", en: "brown", es: "marrón", fr: "marron", it: "marrone", de: "braun" },
  rosa: { pt: "rosa", en: "pink", es: "rosa", fr: "rose", it: "rosa", de: "rosa" },
  roxo: { pt: "roxo", en: "purple", es: "morado", fr: "violet", it: "viola", de: "lila" },
  amarelo: { pt: "amarelo", en: "yellow", es: "amarillo", fr: "jaune", it: "giallo", de: "gelb" },
  laranja: { pt: "laranja", en: "orange", es: "naranja", fr: "orange", it: "arancione", de: "orange" },
  verde: { pt: "verde", en: "green", es: "verde", fr: "vert", it: "verde", de: "grün" },
  azul: { pt: "azul", en: "blue", es: "azul", fr: "bleu", it: "blu", de: "blau" },
  branco: { pt: "branco", en: "white", es: "blanco", fr: "blanc", it: "bianco", de: "weiß" },
  preto: { pt: "preto", en: "black", es: "negro", fr: "noir", it: "nero", de: "schwarz" },
  vermelho: { pt: "vermelho", en: "red", es: "rojo", fr: "rouge", it: "rosso", de: "rot" },
};

// ===== Stamp plural labels for challenge text =====
const stampChallengeLabel: Record<string, Record<Locale, string>> = {
  bone: { pt: "ossinhos", en: "bones", es: "huesitos", fr: "os", it: "ossetti", de: "Knochen" },
  ball: { pt: "bolinhas", en: "balls", es: "pelotitas", fr: "balles", it: "palline", de: "Bälle" },
  yarn: { pt: "novelos de lã", en: "yarn balls", es: "ovillos", fr: "pelotes", it: "gomitoli", de: "Wollknäuel" },
  fish: { pt: "peixinhos", en: "fish", es: "pececitos", fr: "poissons", it: "pesciolini", de: "Fische" },
  carrot: { pt: "cenouras", en: "carrots", es: "zanahorias", fr: "carottes", it: "carote", de: "Karotten" },
  flower: { pt: "flores", en: "flowers", es: "flores", fr: "fleurs", it: "fiori", de: "Blumen" },
  honey: { pt: "potes de mel", en: "honey pots", es: "tarros de miel", fr: "pots de miel", it: "vasetti di miele", de: "Honigtöpfe" },
  berry: { pt: "frutinhas", en: "berries", es: "frutitas", fr: "fruits", it: "frutini", de: "Beeren" },
  leaf: { pt: "folhas", en: "leaves", es: "hojas", fr: "feuilles", it: "foglie", de: "Blätter" },
  egg: { pt: "ovinhos", en: "eggs", es: "huevitos", fr: "œufs", it: "ovetti", de: "Eier" },
  cloud: { pt: "nuvens", en: "clouds", es: "nubes", fr: "nuages", it: "nuvole", de: "Wolken" },
  sun: { pt: "sóis", en: "suns", es: "soles", fr: "soleils", it: "soli", de: "Sonnen" },
  pawprint: { pt: "patinhas", en: "pawprints", es: "huellas", fr: "empreintes", it: "zampine", de: "Pfotenabdrücke" },
  moon: { pt: "luas", en: "moons", es: "lunas", fr: "lunes", it: "lune", de: "Monde" },
  star: { pt: "estrelas", en: "stars", es: "estrellas", fr: "étoiles", it: "stelle", de: "Sterne" },
  bubble: { pt: "bolhas", en: "bubbles", es: "burbujas", fr: "bulles", it: "bolle", de: "Blasen" },
  starfish: { pt: "estrelas do mar", en: "starfish", es: "estrellas de mar", fr: "étoiles de mer", it: "stelle marine", de: "Seesterne" },
  seaweed: { pt: "algas", en: "seaweed", es: "algas", fr: "algues", it: "alghe", de: "Algen" },
  wave: { pt: "ondinhas", en: "waves", es: "olitas", fr: "vagues", it: "ondine", de: "Wellen" },
  water_drop: { pt: "gotinhas", en: "water drops", es: "gotitas", fr: "gouttes", it: "goccioline", de: "Tropfen" },
  shell: { pt: "conchas", en: "shells", es: "conchas", fr: "coquillages", it: "conchiglie", de: "Muscheln" },
  banana: { pt: "bananas", en: "bananas", es: "bananas", fr: "bananes", it: "banane", de: "Bananen" },
  palm: { pt: "palmeiras", en: "palm trees", es: "palmeras", fr: "palmiers", it: "palme", de: "Palmen" },
  dino_egg: { pt: "ovos de dino", en: "dino eggs", es: "huevos de dino", fr: "œufs de dino", it: "uova di dino", de: "Dino-Eier" },
  volcano: { pt: "vulcões", en: "volcanoes", es: "volcanes", fr: "volcans", it: "vulcani", de: "Vulkane" },
  fern: { pt: "samambaias", en: "ferns", es: "helechos", fr: "fougères", it: "felci", de: "Farne" },
  tree: { pt: "árvores", en: "trees", es: "árboles", fr: "arbres", it: "alberi", de: "Bäume" },
  rock: { pt: "pedras", en: "rocks", es: "piedras", fr: "rochers", it: "pietre", de: "Steine" },
  bamboo: { pt: "bambus", en: "bamboo", es: "bambúes", fr: "bambous", it: "bambù", de: "Bambus" },
};

// ===== Stamp labels for UI (singular) =====
const stampLabelMap: Record<string, Record<Locale, string>> = {
  fish: { pt: "Peixinho", en: "Fish", es: "Pececito", fr: "Poisson", it: "Pesciolino", de: "Fisch" },
  bubble: { pt: "Bolha", en: "Bubble", es: "Burbuja", fr: "Bulle", it: "Bolla", de: "Blase" },
  seaweed: { pt: "Alga", en: "Seaweed", es: "Alga", fr: "Algue", it: "Alga", de: "Alge" },
  starfish: { pt: "Estrela do mar", en: "Starfish", es: "Estrella de mar", fr: "Étoile de mer", it: "Stella marina", de: "Seestern" },
  shell: { pt: "Concha", en: "Shell", es: "Concha", fr: "Coquillage", it: "Conchiglia", de: "Muschel" },
  crab: { pt: "Caranguejo", en: "Crab", es: "Cangrejo", fr: "Crabe", it: "Granchio", de: "Krabbe" },
  octopus: { pt: "Polvo", en: "Octopus", es: "Pulpo", fr: "Poulpe", it: "Polpo", de: "Krake" },
  wave: { pt: "Onda", en: "Wave", es: "Ola", fr: "Vague", it: "Onda", de: "Welle" },
  banana: { pt: "Banana", en: "Banana", es: "Banana", fr: "Banane", it: "Banana", de: "Banane" },
  leaf: { pt: "Folha", en: "Leaf", es: "Hoja", fr: "Feuille", it: "Foglia", de: "Blatt" },
  palm: { pt: "Palmeira", en: "Palm tree", es: "Palmera", fr: "Palmier", it: "Palma", de: "Palme" },
  monkey: { pt: "Macaquinho", en: "Monkey", es: "Monito", fr: "Singe", it: "Scimmia", de: "Affe" },
  coconut: { pt: "Coco", en: "Coconut", es: "Coco", fr: "Noix de coco", it: "Cocco", de: "Kokosnuss" },
  vine: { pt: "Cipó", en: "Vine", es: "Liana", fr: "Liane", it: "Liana", de: "Liane" },
  parrot: { pt: "Papagaio", en: "Parrot", es: "Loro", fr: "Perroquet", it: "Pappagallo", de: "Papagei" },
  carrot: { pt: "Cenoura", en: "Carrot", es: "Zanahoria", fr: "Carotte", it: "Carota", de: "Karotte" },
  flower: { pt: "Flor", en: "Flower", es: "Flor", fr: "Fleur", it: "Fiore", de: "Blume" },
  butterfly: { pt: "Borboleta", en: "Butterfly", es: "Mariposa", fr: "Papillon", it: "Farfalla", de: "Schmetterling" },
  clover: { pt: "Trevo", en: "Clover", es: "Trébol", fr: "Trèfle", it: "Trifoglio", de: "Klee" },
  tulip: { pt: "Tulipa", en: "Tulip", es: "Tulipán", fr: "Tulipe", it: "Tulipano", de: "Tulpe" },
  ladybug: { pt: "Joaninha", en: "Ladybug", es: "Mariquita", fr: "Coccinelle", it: "Coccinella", de: "Marienkäfer" },
  mushroom: { pt: "Cogumelo", en: "Mushroom", es: "Hongo", fr: "Champignon", it: "Fungo", de: "Pilz" },
  bone: { pt: "Ossinho", en: "Bone", es: "Huesito", fr: "Os", it: "Ossetto", de: "Knochen" },
  ball: { pt: "Bolinha", en: "Ball", es: "Pelotita", fr: "Balle", it: "Pallina", de: "Ball" },
  pawprint: { pt: "Patinha", en: "Pawprint", es: "Huella", fr: "Empreinte", it: "Zampina", de: "Pfotenabdruck" },
  house: { pt: "Casinha", en: "House", es: "Casita", fr: "Maison", it: "Casetta", de: "Häuschen" },
  biscuit: { pt: "Biscoito", en: "Biscuit", es: "Galleta", fr: "Biscuit", it: "Biscotto", de: "Keks" },
  collar: { pt: "Coleira", en: "Collar", es: "Collar", fr: "Collier", it: "Collare", de: "Halsband" },
  stick: { pt: "Graveto", en: "Stick", es: "Palito", fr: "Bâton", it: "Bastoncino", de: "Stock" },
  honey: { pt: "Mel", en: "Honey", es: "Miel", fr: "Miel", it: "Miele", de: "Honig" },
  berry: { pt: "Frutinha", en: "Berry", es: "Frutita", fr: "Fruit", it: "Frutino", de: "Beere" },
  tree: { pt: "Árvore", en: "Tree", es: "Árbol", fr: "Arbre", it: "Albero", de: "Baum" },
  bee: { pt: "Abelhinha", en: "Bee", es: "Abejita", fr: "Abeille", it: "Apina", de: "Biene" },
  acorn: { pt: "Bolota", en: "Acorn", es: "Bellota", fr: "Gland", it: "Ghianda", de: "Eichel" },
  pinecone: { pt: "Pinha", en: "Pinecone", es: "Piña", fr: "Pomme de pin", it: "Pigna", de: "Tannenzapfen" },
  fish_bear: { pt: "Peixinho", en: "Fish", es: "Pececito", fr: "Poisson", it: "Pesciolino", de: "Fisch" },
  yarn: { pt: "Novelo", en: "Yarn", es: "Ovillo", fr: "Pelote", it: "Gomitolo", de: "Wollknäuel" },
  milk: { pt: "Leite", en: "Milk", es: "Leche", fr: "Lait", it: "Latte", de: "Milch" },
  mouse: { pt: "Ratinho", en: "Mouse", es: "Ratoncito", fr: "Souris", it: "Topolino", de: "Maus" },
  paw: { pt: "Pegada", en: "Paw", es: "Huella", fr: "Patte", it: "Zampa", de: "Pfote" },
  feather: { pt: "Peninha", en: "Feather", es: "Plumita", fr: "Plume", it: "Piuma", de: "Feder" },
  bell: { pt: "Sininho", en: "Bell", es: "Campanita", fr: "Clochette", it: "Campanella", de: "Glöckchen" },
  toy_mouse: { pt: "Brinquedo", en: "Toy", es: "Juguete", fr: "Jouet", it: "Giocattolo", de: "Spielzeug" },
  cloud: { pt: "Nuvem", en: "Cloud", es: "Nube", fr: "Nuage", it: "Nuvola", de: "Wolke" },
  rock: { pt: "Pedra", en: "Rock", es: "Piedra", fr: "Rocher", it: "Pietra", de: "Stein" },
  grass: { pt: "Capim", en: "Grass", es: "Hierba", fr: "Herbe", it: "Erba", de: "Gras" },
  water_drop: { pt: "Gotinha", en: "Water drop", es: "Gotita", fr: "Goutte", it: "Gocciolina", de: "Tropfen" },
  stripe: { pt: "Listra", en: "Stripe", es: "Raya", fr: "Rayure", it: "Striscia", de: "Streifen" },
  bamboo: { pt: "Bambu", en: "Bamboo", es: "Bambú", fr: "Bambou", it: "Bambù", de: "Bambus" },
  snowflake: { pt: "Florzinha", en: "Snowflake", es: "Florecita", fr: "Flocon", it: "Fiorellino", de: "Schneeflocke" },
  egg: { pt: "Ovinho", en: "Egg", es: "Huevito", fr: "Œuf", it: "Ovetto", de: "Ei" },
  worm: { pt: "Minhoca", en: "Worm", es: "Gusanito", fr: "Ver", it: "Vermetto", de: "Wurm" },
  nest: { pt: "Ninho", en: "Nest", es: "Nido", fr: "Nid", it: "Nido", de: "Nest" },
  dino_egg: { pt: "Ovo de dino", en: "Dino egg", es: "Huevo de dino", fr: "Œuf de dino", it: "Uovo di dino", de: "Dino-Ei" },
  volcano: { pt: "Vulcão", en: "Volcano", es: "Volcán", fr: "Volcan", it: "Vulcano", de: "Vulkan" },
  fern: { pt: "Samambaia", en: "Fern", es: "Helecho", fr: "Fougère", it: "Felce", de: "Farn" },
  heart: { pt: "Coração", en: "Heart", es: "Corazón", fr: "Cœur", it: "Cuore", de: "Herz" },
  star: { pt: "Estrela", en: "Star", es: "Estrella", fr: "Étoile", it: "Stella", de: "Stern" },
  sun: { pt: "Sol", en: "Sun", es: "Sol", fr: "Soleil", it: "Sole", de: "Sonne" },
  moon: { pt: "Lua", en: "Moon", es: "Luna", fr: "Lune", it: "Luna", de: "Mond" },
  rainbow: { pt: "Arco-íris", en: "Rainbow", es: "Arcoíris", fr: "Arc-en-ciel", it: "Arcobaleno", de: "Regenbogen" },
  balloon: { pt: "Balão", en: "Balloon", es: "Globo", fr: "Ballon", it: "Palloncino", de: "Ballon" },
  music: { pt: "Música", en: "Music", es: "Música", fr: "Musique", it: "Musica", de: "Musik" },
};

// ===== Color names for PAINT_COLORS =====
const colorNameMap: Record<string, Record<Locale, string>> = {
  red: { pt: "Vermelho", en: "Red", es: "Rojo", fr: "Rouge", it: "Rosso", de: "Rot" },
  orange: { pt: "Laranja", en: "Orange", es: "Naranja", fr: "Orange", it: "Arancione", de: "Orange" },
  yellow: { pt: "Amarelo", en: "Yellow", es: "Amarillo", fr: "Jaune", it: "Giallo", de: "Gelb" },
  green: { pt: "Verde", en: "Green", es: "Verde", fr: "Vert", it: "Verde", de: "Grün" },
  blue: { pt: "Azul", en: "Blue", es: "Azul", fr: "Bleu", it: "Blu", de: "Blau" },
  purple: { pt: "Roxo", en: "Purple", es: "Morado", fr: "Violet", it: "Viola", de: "Lila" },
  pink: { pt: "Rosa", en: "Pink", es: "Rosa", fr: "Rose", it: "Rosa", de: "Rosa" },
  brown: { pt: "Marrom", en: "Brown", es: "Marrón", fr: "Marron", it: "Marrone", de: "Braun" },
  black: { pt: "Preto", en: "Black", es: "Negro", fr: "Noir", it: "Nero", de: "Schwarz" },
  white: { pt: "Branco", en: "White", es: "Blanco", fr: "Blanc", it: "Bianco", de: "Weiß" },
};

// ===== Challenge text/hint generation =====

function getPartLabel(ptLabel: string, locale: Locale): string {
  return partLabelMap[ptLabel]?.[locale] ?? ptLabel;
}
function getColorLabel(ptLabel: string, locale: Locale): string {
  return colorLabelMap[ptLabel]?.[locale] ?? ptLabel;
}
function getStampLabel(stampId: string, locale: Locale): string {
  return stampChallengeLabel[stampId]?.[locale] ?? stampId;
}

function makeChallengeText(kind: ChallengeKind, locale: Locale, animalName: string): string {
  switch (kind.type) {
    case "paint_part_color": {
      const part = getPartLabel(kind.partLabel, locale);
      const color = getColorLabel(kind.colorLabel, locale);
      switch (locale) {
        case "en": return `Paint ${part} ${color}`;
        case "es": return `Pinta ${part} de ${color}`;
        case "fr": return `Peins ${part} en ${color}`;
        case "it": return `Dipingi ${part} di ${color}`;
        case "de": return `Male ${part} ${color}`;
        default: return `Pinte ${part} de ${color}`;
      }
    }
    case "paint_part": {
      const part = getPartLabel(kind.partLabel, locale);
      switch (locale) {
        case "en": return `Paint ${part}`;
        case "es": return `Pinta ${part}`;
        case "fr": return `Peins ${part}`;
        case "it": return `Dipingi ${part}`;
        case "de": return `Male ${part}`;
        default: return `Pinte ${part}`;
      }
    }
    case "stamp": {
      const stamp = getStampLabel(kind.stamp, locale);
      switch (locale) {
        case "en": return `Place ${kind.count} ${stamp}`;
        case "es": return `Coloca ${kind.count} ${stamp}`;
        case "fr": return `Place ${kind.count} ${stamp}`;
        case "it": return `Metti ${kind.count} ${stamp}`;
        case "de": return `Setze ${kind.count} ${stamp}`;
        default: return `Coloque ${kind.count} ${stamp}`;
      }
    }
    case "colors":
      switch (locale) {
        case "en": return `Use ${kind.count} different colors`;
        case "es": return `Usa ${kind.count} colores diferentes`;
        case "fr": return `Utilise ${kind.count} couleurs différentes`;
        case "it": return `Usa ${kind.count} colori diversi`;
        case "de": return `Benutze ${kind.count} verschiedene Farben`;
        default: return `Use ${kind.count} cores diferentes`;
      }
    case "paint_all":
      switch (locale) {
        case "en": return `Paint the whole ${animalName}!`;
        case "es": return `¡Pinta todo el ${animalName}!`;
        case "fr": return `Peins tout le ${animalName} !`;
        case "it": return `Dipingi tutto il ${animalName}!`;
        case "de": return `Male das ganze ${animalName}!`;
        default: return `Pinte todo o ${animalName}!`;
      }
    case "paint_count":
      switch (locale) {
        case "en": return `Paint ${kind.count} parts`;
        case "es": return `Pinta ${kind.count} partes`;
        case "fr": return `Peins ${kind.count} parties`;
        case "it": return `Dipingi ${kind.count} parti`;
        case "de": return `Male ${kind.count} Teile`;
        default: return `Pinte ${kind.count} partes`;
      }
  }
}

function makeChallengeHint(kind: ChallengeKind, locale: Locale, animalName: string): string {
  switch (kind.type) {
    case "paint_part_color":
    case "paint_part": {
      const part = getPartLabel(kind.partLabel, locale);
      switch (locale) {
        case "en": return `Use the bucket on ${part}`;
        case "es": return `Usa el cubito en ${part}`;
        case "fr": return `Utilise le seau sur ${part}`;
        case "it": return `Usa il secchiello su ${part}`;
        case "de": return `Benutze den Eimer auf ${part}`;
        default: return `Use o baldinho`;
      }
    }
    case "stamp": {
      const stamp = getStampLabel(kind.stamp, locale);
      switch (locale) {
        case "en": return `${stamp[0].toUpperCase() + stamp.slice(1)} for the ${animalName}`;
        case "es": return `${stamp[0].toUpperCase() + stamp.slice(1)} para el ${animalName}`;
        case "fr": return `Des ${stamp} pour le ${animalName}`;
        case "it": return `${stamp[0].toUpperCase() + stamp.slice(1)} per il ${animalName}`;
        case "de": return `${stamp[0].toUpperCase() + stamp.slice(1)} für das ${animalName}`;
        default: return `${stamp} pro ${animalName}`;
      }
    }
    case "colors":
      switch (locale) {
        case "en": return "Paint with different colors";
        case "es": return "Pinta con varios colores";
        case "fr": return "Peins avec plusieurs couleurs";
        case "it": return "Dipingi con colori diversi";
        case "de": return "Male mit verschiedenen Farben";
        default: return "Pinte com várias cores";
      }
    case "paint_all":
      switch (locale) {
        case "en": return `Paint every part of the ${animalName}`;
        case "es": return `Pinta cada parte del ${animalName}`;
        case "fr": return `Peins chaque partie du ${animalName}`;
        case "it": return `Dipingi ogni parte del ${animalName}`;
        case "de": return `Male jeden Teil des ${animalName}`;
        default: return `Pinte cada parte do ${animalName}`;
      }
    case "paint_count":
      switch (locale) {
        case "en": return `Paint ${kind.count} different parts`;
        case "es": return `Pinta ${kind.count} partes diferentes`;
        case "fr": return `Peins ${kind.count} parties différentes`;
        case "it": return `Dipingi ${kind.count} parti diverse`;
        case "de": return `Male ${kind.count} verschiedene Teile`;
        default: return `Pinte ${kind.count} partes diferentes`;
      }
  }
}

// ===== Encouragements / Celebrations / Final =====

export const localizedEncouragements: Record<Locale, string[]> = {
  pt: ["Está ficando lindo!", "Continue, você consegue!", "Quase lá!", "Que capricho!", "Você tem talento!"],
  en: ["Looking great!", "Keep going, you can do it!", "Almost there!", "So neat!", "You're talented!"],
  es: ["¡Está quedando lindo!", "¡Sigue, tú puedes!", "¡Ya casi!", "¡Qué bonito!", "¡Tienes talento!"],
  fr: ["C'est magnifique !", "Continue, tu peux !", "Presque fini !", "Quel talent !", "Tu es doué !"],
  it: ["Sta venendo bellissimo!", "Continua, ce la fai!", "Quasi finito!", "Che bello!", "Hai talento!"],
  de: ["Sieht toll aus!", "Weiter so, du schaffst das!", "Fast fertig!", "Wie hübsch!", "Du hast Talent!"],
};

export const localizedCelebrations: Record<Locale, string[]> = {
  pt: ["Muito bem!", "Você conseguiu!", "Que desenho lindo!", "Uauu, ficou incrível!", "Parabéns, artista!"],
  en: ["Well done!", "You did it!", "Beautiful drawing!", "Wow, amazing!", "Bravo, artist!"],
  es: ["¡Muy bien!", "¡Lo lograste!", "¡Qué dibujo tan lindo!", "¡Guau, increíble!", "¡Bravo, artista!"],
  fr: ["Très bien !", "Tu as réussi !", "Quel beau dessin !", "Ouah, incroyable !", "Bravo, artiste !"],
  it: ["Bravissimo!", "Ce l'hai fatta!", "Che bel disegno!", "Wow, incredibile!", "Bravo, artista!"],
  de: ["Sehr gut!", "Du hast es geschafft!", "Was für ein tolles Bild!", "Wow, unglaublich!", "Bravo, Künstler!"],
};

export const localizedFinalMessages: Record<Locale, string[]> = {
  pt: ["Você conseguiu! 🎉", "Parabéns, artista! 🌟", "Uauu, terminou tudo!"],
  en: ["You did it! 🎉", "Bravo, artist! 🌟", "Wow, all done!"],
  es: ["¡Lo lograste! 🎉", "¡Bravo, artista! 🌟", "¡Guau, terminaste todo!"],
  fr: ["Tu as réussi ! 🎉", "Bravo, artiste ! 🌟", "Ouah, tout est fini !"],
  it: ["Ce l'hai fatta! 🎉", "Bravo, artista! 🌟", "Wow, tutto finito!"],
  de: ["Du hast es geschafft! 🎉", "Bravo, Künstler! 🌟", "Wow, alles fertig!"],
};

// ===== Public API =====

export function getAnimalName(id: ThemeId, locale: Locale): string {
  return animalNames[id]?.[locale] ?? id;
}

export function getSceneName(scene: string, locale: Locale): string {
  return sceneTranslations[scene]?.[locale] ?? scene;
}

export function localizeTheme(theme: ThemeDef, locale: Locale): ThemeDef {
  if (locale === "pt") return theme;

  const name = animalNames[theme.id]?.[locale] ?? theme.name;
  const scene = sceneTranslations[theme.scene]?.[locale] ?? theme.scene;
  const greeting = greetingTranslations[theme.id]?.[locale] ?? theme.greeting;

  const challenges: Challenge[] = theme.challenges.map((c) => ({
    ...c,
    text: makeChallengeText(c.kind, locale, name),
    hint: makeChallengeHint(c.kind, locale, name),
  }));

  return { ...theme, name, scene, greeting, challenges };
}

export function getLocalizedStampLabel(id: StampId, locale: Locale): string {
  return stampLabelMap[id]?.[locale] ?? id;
}

export function getLocalizedColorName(id: string, locale: Locale): string {
  return colorNameMap[id]?.[locale] ?? id;
}
