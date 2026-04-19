export type ThemeId =
  | "coelhinho"
  | "gatinho"
  | "ursinho"
  | "cachorrinho"
  | "peixinho"
  | "macaquinho"
  | "leaozinho"
  | "elefantinho"
  | "girafinha"
  | "zebrinha"
  | "tigrinho"
  | "pandinha";

export type StampId =
  // sea
  | "fish"
  | "bubble"
  | "seaweed"
  | "starfish"
  | "shell"
  | "crab"
  | "octopus"
  | "wave"
  // jungle
  | "banana"
  | "leaf"
  | "palm"
  | "monkey"
  | "coconut"
  | "vine"
  | "parrot"
  // garden / bunny
  | "carrot"
  | "flower"
  | "butterfly"
  | "clover"
  | "tulip"
  | "ladybug"
  | "mushroom"
  // farm / dog
  | "bone"
  | "ball"
  | "pawprint"
  | "house"
  | "biscuit"
  | "collar"
  | "stick"
  // forest / bear
  | "honey"
  | "berry"
  | "tree"
  | "bee"
  | "acorn"
  | "pinecone"
  | "fish_bear"
  // cat
  | "yarn"
  | "milk"
  | "mouse"
  | "paw"
  | "feather"
  | "bell"
  | "toy_mouse"
  // savanna / lion / giraffe / zebra / elephant
  | "cloud"
  | "rock"
  | "grass"
  | "water_drop"
  // tiger
  | "stripe"
  // panda
  | "bamboo"
  | "snowflake"
  // universal
  | "heart"
  | "star"
  | "sun"
  | "moon"
  | "rainbow"
  | "balloon"
  | "music";

export type ChallengeKind =
  // Paint a specific named region of the animal (any color works)
  | { type: "paint_part"; part: string; partLabel: string }
  // Paint a specific region with a specific color
  | { type: "paint_part_color"; part: string; partLabel: string; color: string; colorLabel: string }
  // Paint N parts of the animal (any colors)
  | { type: "paint_count"; count: number }
  // Paint ALL parts of the animal (final challenge)
  | { type: "paint_all" }
  // Use N different colors anywhere
  | { type: "colors"; count: number }
  // Place N stamps of a kind
  | { type: "stamp"; stamp: StampId; count: number };

export interface Challenge {
  id: string;
  text: string;
  hint: string;
  kind: ChallengeKind;
  icon: string; // emoji
}

export interface ThemeDef {
  id: ThemeId;
  name: string;
  emoji: string;
  bg: string; // tailwind gradient class
  greeting: string;
  scene: string; // descriptive context (selva, oceano, etc)
  stamps: StampId[]; // contextual stamps for this animal
  challenges: Challenge[];
}

export const ALL_STAMPS: { id: StampId; label: string; emoji: string }[] = [
  // sea
  { id: "fish", label: "Peixinho", emoji: "🐠" },
  { id: "bubble", label: "Bolha", emoji: "🫧" },
  { id: "seaweed", label: "Alga", emoji: "🌿" },
  { id: "starfish", label: "Estrela do mar", emoji: "⭐" },
  { id: "shell", label: "Concha", emoji: "🐚" },
  { id: "crab", label: "Caranguejo", emoji: "🦀" },
  { id: "octopus", label: "Polvo", emoji: "🐙" },
  { id: "wave", label: "Onda", emoji: "🌊" },
  // jungle
  { id: "banana", label: "Banana", emoji: "🍌" },
  { id: "leaf", label: "Folha", emoji: "🍃" },
  { id: "palm", label: "Palmeira", emoji: "🌴" },
  { id: "monkey", label: "Macaquinho", emoji: "🐵" },
  { id: "coconut", label: "Coco", emoji: "🥥" },
  { id: "vine", label: "Cipó", emoji: "🌱" },
  { id: "parrot", label: "Papagaio", emoji: "🦜" },
  // garden / bunny
  { id: "carrot", label: "Cenoura", emoji: "🥕" },
  { id: "flower", label: "Flor", emoji: "🌸" },
  { id: "butterfly", label: "Borboleta", emoji: "🦋" },
  { id: "clover", label: "Trevo", emoji: "🍀" },
  { id: "tulip", label: "Tulipa", emoji: "🌷" },
  { id: "ladybug", label: "Joaninha", emoji: "🐞" },
  { id: "mushroom", label: "Cogumelo", emoji: "🍄" },
  // farm / dog
  { id: "bone", label: "Ossinho", emoji: "🦴" },
  { id: "ball", label: "Bolinha", emoji: "⚽" },
  { id: "pawprint", label: "Patinha", emoji: "🐾" },
  { id: "house", label: "Casinha", emoji: "🏠" },
  { id: "biscuit", label: "Biscoito", emoji: "🍪" },
  { id: "collar", label: "Coleira", emoji: "🎀" },
  { id: "stick", label: "Graveto", emoji: "🪵" },
  // forest / bear
  { id: "honey", label: "Mel", emoji: "🍯" },
  { id: "berry", label: "Frutinha", emoji: "🍓" },
  { id: "tree", label: "Árvore", emoji: "🌳" },
  { id: "bee", label: "Abelhinha", emoji: "🐝" },
  { id: "acorn", label: "Bolota", emoji: "🌰" },
  { id: "pinecone", label: "Pinha", emoji: "🌲" },
  { id: "fish_bear", label: "Peixinho", emoji: "🐟" },
  // cat
  { id: "yarn", label: "Novelo", emoji: "🧶" },
  { id: "milk", label: "Leite", emoji: "🥛" },
  { id: "mouse", label: "Ratinho", emoji: "🐭" },
  { id: "paw", label: "Pegada", emoji: "🐾" },
  { id: "feather", label: "Peninha", emoji: "🪶" },
  { id: "bell", label: "Sininho", emoji: "🔔" },
  { id: "toy_mouse", label: "Brinquedo", emoji: "🐀" },
  // savanna
  { id: "cloud", label: "Nuvem", emoji: "☁️" },
  { id: "rock", label: "Pedra", emoji: "🪨" },
  { id: "grass", label: "Capim", emoji: "🌾" },
  { id: "water_drop", label: "Gotinha", emoji: "💧" },
  // tiger
  { id: "stripe", label: "Listra", emoji: "〰️" },
  // panda
  { id: "bamboo", label: "Bambu", emoji: "🎋" },
  { id: "snowflake", label: "Florzinha", emoji: "❄️" },
  // universal
  { id: "heart", label: "Coração", emoji: "❤️" },
  { id: "star", label: "Estrela", emoji: "⭐" },
  { id: "sun", label: "Sol", emoji: "☀️" },
  { id: "moon", label: "Lua", emoji: "🌙" },
  { id: "rainbow", label: "Arco-íris", emoji: "🌈" },
  { id: "balloon", label: "Balão", emoji: "🎈" },
  { id: "music", label: "Música", emoji: "🎵" },
];

export const PAINT_COLORS = [
  { id: "red", name: "Vermelho", hsl: "var(--paint-red)" },
  { id: "orange", name: "Laranja", hsl: "var(--paint-orange)" },
  { id: "yellow", name: "Amarelo", hsl: "var(--paint-yellow)" },
  { id: "green", name: "Verde", hsl: "var(--paint-green)" },
  { id: "blue", name: "Azul", hsl: "var(--paint-blue)" },
  { id: "purple", name: "Roxo", hsl: "var(--paint-purple)" },
  { id: "pink", name: "Rosa", hsl: "var(--paint-pink)" },
  { id: "brown", name: "Marrom", hsl: "var(--paint-brown)" },
  { id: "black", name: "Preto", hsl: "var(--paint-black)" },
  { id: "white", name: "Branco", hsl: "var(--paint-white)" },
];

export const THEMES: ThemeDef[] = [
  {
    id: "peixinho",
    name: "Peixinho",
    emoji: "🐠",
    bg: "from-sky-200 via-cyan-100 to-blue-200",
    greeting: "Vamos pintar o peixinho no fundo do mar!",
    scene: "fundo do mar",
    stamps: ["bubble", "seaweed", "starfish", "shell", "fish", "crab", "octopus", "wave", "heart", "sun", "rainbow", "music"],
    challenges: [
      { id: "p1", text: "Pinte o corpinho de azul", hint: "Use o baldinho na barriga grande", kind: { type: "paint_part_color", part: "body_top", partLabel: "corpinho", color: "blue", colorLabel: "azul" }, icon: "🐠" },
      { id: "p2", text: "Pinte o rabinho de laranja", hint: "Toque no rabo com o baldinho", kind: { type: "paint_part_color", part: "tail", partLabel: "rabinho", color: "orange", colorLabel: "laranja" }, icon: "🐠" },
      { id: "p3", text: "Coloque 3 bolhas no mar", hint: "Use o carimbo de bolha", kind: { type: "stamp", stamp: "bubble", count: 3 }, icon: "🫧" },
      { id: "p4", text: "Use 3 cores diferentes", hint: "Troque de cor 3 vezes", kind: { type: "colors", count: 3 }, icon: "🌈" },
      { id: "p5", text: "Coloque 2 estrelas do mar", hint: "Use o carimbo de estrela", kind: { type: "stamp", stamp: "starfish", count: 2 }, icon: "⭐" },
      { id: "p6", text: "Pinte todo o peixinho!", hint: "Pinte cada parte do peixinho", kind: { type: "paint_all" }, icon: "🎨" },
    ],
  },
  {
    id: "coelhinho",
    name: "Coelhinho",
    emoji: "🐰",
    bg: "from-pink-100 via-rose-100 to-amber-100",
    greeting: "O coelhinho está no jardim!",
    scene: "jardim",
    stamps: ["carrot", "flower", "butterfly", "clover", "leaf", "tulip", "ladybug", "mushroom", "heart", "sun", "rainbow", "balloon"],
    challenges: [
      { id: "c1", text: "Pinte as orelhas de rosa", hint: "Use o baldinho nas duas orelhas", kind: { type: "paint_part_color", part: "ear_left", partLabel: "orelha", color: "pink", colorLabel: "rosa" }, icon: "💗" },
      { id: "c2", text: "Pinte a cabeça de marrom", hint: "Toque na cabeça com o baldinho", kind: { type: "paint_part_color", part: "head", partLabel: "cabeça", color: "brown", colorLabel: "marrom" }, icon: "🤎" },
      { id: "c3", text: "Coloque 3 cenouras", hint: "Cenouras pro coelhinho", kind: { type: "stamp", stamp: "carrot", count: 3 }, icon: "🥕" },
      { id: "c4", text: "Coloque 2 flores", hint: "Flores no jardim", kind: { type: "stamp", stamp: "flower", count: 2 }, icon: "🌸" },
      { id: "c5", text: "Use 3 cores diferentes", hint: "Pinte com várias cores", kind: { type: "colors", count: 3 }, icon: "🌈" },
      { id: "c6", text: "Pinte todo o coelhinho!", hint: "Pinte cada parte do coelhinho", kind: { type: "paint_all" }, icon: "🎨" },
    ],
  },
  {
    id: "ursinho",
    name: "Ursinho",
    emoji: "🐻",
    bg: "from-amber-100 via-orange-100 to-yellow-100",
    greeting: "O ursinho está na floresta!",
    scene: "floresta",
    stamps: ["honey", "berry", "tree", "bee", "leaf", "acorn", "pinecone", "fish_bear", "heart", "sun", "moon", "star"],
    challenges: [
      { id: "u1", text: "Pinte a cabeça de marrom", hint: "Use o baldinho na cabeça", kind: { type: "paint_part_color", part: "head", partLabel: "cabeça", color: "brown", colorLabel: "marrom" }, icon: "🤎" },
      { id: "u2", text: "Pinte o coração de vermelho", hint: "Toque no coraçãozinho", kind: { type: "paint_part_color", part: "heart", partLabel: "coração", color: "red", colorLabel: "vermelho" }, icon: "❤️" },
      { id: "u3", text: "Coloque 3 potes de mel", hint: "Mel pro ursinho", kind: { type: "stamp", stamp: "honey", count: 3 }, icon: "🍯" },
      { id: "u4", text: "Coloque 2 frutinhas", hint: "Frutinhas da floresta", kind: { type: "stamp", stamp: "berry", count: 2 }, icon: "🍓" },
      { id: "u5", text: "Use 3 cores diferentes", hint: "Pinte com várias cores", kind: { type: "colors", count: 3 }, icon: "🌈" },
      { id: "u6", text: "Pinte todo o ursinho!", hint: "Pinte cada parte do ursinho", kind: { type: "paint_all" }, icon: "🎨" },
    ],
  },
  {
    id: "gatinho",
    name: "Gatinho",
    emoji: "🐱",
    bg: "from-violet-100 via-pink-100 to-rose-100",
    greeting: "O gatinho quer brincar!",
    scene: "casinha",
    stamps: ["yarn", "milk", "mouse", "paw", "fish", "feather", "bell", "toy_mouse", "heart", "star", "moon", "music"],
    challenges: [
      { id: "g1", text: "Pinte a cabeça de roxo", hint: "Use o baldinho na cabeça", kind: { type: "paint_part_color", part: "head", partLabel: "cabeça", color: "purple", colorLabel: "roxo" }, icon: "🐱" },
      { id: "g2", text: "Pinte o rabinho", hint: "Toque no rabo com o baldinho", kind: { type: "paint_part", part: "tail", partLabel: "rabinho" }, icon: "✨" },
      { id: "g3", text: "Coloque 2 novelos de lã", hint: "Brinquedos pro gatinho", kind: { type: "stamp", stamp: "yarn", count: 2 }, icon: "🧶" },
      { id: "g4", text: "Coloque 2 peixinhos", hint: "Peixes pro gatinho", kind: { type: "stamp", stamp: "fish", count: 2 }, icon: "🐠" },
      { id: "g5", text: "Use 3 cores diferentes", hint: "Pinte com várias cores", kind: { type: "colors", count: 3 }, icon: "🌈" },
      { id: "g6", text: "Pinte todo o gatinho!", hint: "Pinte cada parte do gatinho", kind: { type: "paint_all" }, icon: "🎨" },
    ],
  },
  {
    id: "cachorrinho",
    name: "Cachorrinho",
    emoji: "🐶",
    bg: "from-yellow-100 via-amber-100 to-orange-100",
    greeting: "O cachorrinho está no quintal!",
    scene: "quintal",
    stamps: ["bone", "ball", "pawprint", "house", "biscuit", "collar", "stick", "heart", "star", "sun", "rainbow", "balloon"],
    challenges: [
      { id: "d1", text: "Pinte o corpinho de marrom", hint: "Use o baldinho no corpo", kind: { type: "paint_part_color", part: "body", partLabel: "corpinho", color: "brown", colorLabel: "marrom" }, icon: "🤎" },
      { id: "d2", text: "Pinte as orelhinhas", hint: "Toque nas duas orelhas", kind: { type: "paint_part", part: "ear_left", partLabel: "orelha" }, icon: "👂" },
      { id: "d3", text: "Coloque 3 ossinhos", hint: "Ossinhos pro cachorrinho", kind: { type: "stamp", stamp: "bone", count: 3 }, icon: "🦴" },
      { id: "d4", text: "Coloque 2 bolinhas", hint: "Bolinhas pra brincar", kind: { type: "stamp", stamp: "ball", count: 2 }, icon: "⚽" },
      { id: "d5", text: "Use 3 cores diferentes", hint: "Pinte com várias cores", kind: { type: "colors", count: 3 }, icon: "🌈" },
      { id: "d6", text: "Pinte todo o cachorrinho!", hint: "Pinte cada parte do cachorrinho", kind: { type: "paint_all" }, icon: "🎨" },
    ],
  },
  {
    id: "macaquinho",
    name: "Macaquinho",
    emoji: "🐵",
    bg: "from-emerald-100 via-lime-100 to-yellow-100",
    greeting: "O macaquinho está na selva!",
    scene: "selva",
    stamps: ["banana", "leaf", "palm", "monkey", "coconut", "vine", "parrot", "heart", "star", "sun", "rainbow", "music"],
    challenges: [
      { id: "m1", text: "Pinte o corpinho de marrom", hint: "Use o baldinho no corpinho", kind: { type: "paint_part_color", part: "body", partLabel: "corpinho", color: "brown", colorLabel: "marrom" }, icon: "🤎" },
      { id: "m2", text: "Pinte o rostinho de amarelo", hint: "Toque no rostinho", kind: { type: "paint_part_color", part: "face", partLabel: "rostinho", color: "yellow", colorLabel: "amarelo" }, icon: "🐵" },
      { id: "m3", text: "Coloque 3 bananas", hint: "Bananas pro macaquinho", kind: { type: "stamp", stamp: "banana", count: 3 }, icon: "🍌" },
      { id: "m4", text: "Coloque 2 palmeiras", hint: "Árvores da selva", kind: { type: "stamp", stamp: "palm", count: 2 }, icon: "🌴" },
      { id: "m5", text: "Use 3 cores diferentes", hint: "Pinte com várias cores", kind: { type: "colors", count: 3 }, icon: "🌈" },
      { id: "m6", text: "Pinte todo o macaquinho!", hint: "Pinte cada parte do macaquinho", kind: { type: "paint_all" }, icon: "🎨" },
    ],
  },
  {
    id: "leaozinho",
    name: "Leãozinho",
    emoji: "🦁",
    bg: "from-amber-100 via-yellow-100 to-orange-200",
    greeting: "O leãozinho está na savana!",
    scene: "savana",
    stamps: ["sun", "tree", "leaf", "star", "heart", "pawprint", "bone", "cloud", "rock", "grass", "water_drop", "rainbow"],
    challenges: [
      { id: "l1", text: "Pinte a juba de laranja", hint: "Use o baldinho na juba", kind: { type: "paint_part_color", part: "mane", partLabel: "juba", color: "orange", colorLabel: "laranja" }, icon: "🦁" },
      { id: "l2", text: "Pinte o corpinho de amarelo", hint: "Toque no corpo", kind: { type: "paint_part_color", part: "body", partLabel: "corpinho", color: "yellow", colorLabel: "amarelo" }, icon: "💛" },
      { id: "l3", text: "Coloque 3 sóis", hint: "Sol da savana", kind: { type: "stamp", stamp: "sun", count: 3 }, icon: "☀️" },
      { id: "l4", text: "Coloque 2 patinhas", hint: "Pegadas do leãozinho", kind: { type: "stamp", stamp: "pawprint", count: 2 }, icon: "🐾" },
      { id: "l5", text: "Use 3 cores diferentes", hint: "Pinte com várias cores", kind: { type: "colors", count: 3 }, icon: "🌈" },
      { id: "l6", text: "Pinte todo o leãozinho!", hint: "Pinte cada parte do leãozinho", kind: { type: "paint_all" }, icon: "🎨" },
    ],
  },
  {
    id: "elefantinho",
    name: "Elefantinho",
    emoji: "🐘",
    bg: "from-slate-100 via-blue-100 to-indigo-100",
    greeting: "O elefantinho está no safári!",
    scene: "safári",
    stamps: ["leaf", "tree", "sun", "heart", "star", "flower", "palm", "cloud", "grass", "water_drop", "rainbow", "music"],
    challenges: [
      { id: "e1", text: "Pinte o corpinho de azul", hint: "Use o baldinho no corpo", kind: { type: "paint_part_color", part: "body", partLabel: "corpinho", color: "blue", colorLabel: "azul" }, icon: "🐘" },
      { id: "e2", text: "Pinte as orelhinhas de rosa", hint: "Toque nas orelhas", kind: { type: "paint_part_color", part: "ear_left", partLabel: "orelha", color: "pink", colorLabel: "rosa" }, icon: "👂" },
      { id: "e3", text: "Coloque 3 folhas", hint: "Folhas pro elefantinho", kind: { type: "stamp", stamp: "leaf", count: 3 }, icon: "🍃" },
      { id: "e4", text: "Coloque 2 árvores", hint: "Árvores no safári", kind: { type: "stamp", stamp: "tree", count: 2 }, icon: "🌳" },
      { id: "e5", text: "Use 3 cores diferentes", hint: "Pinte com várias cores", kind: { type: "colors", count: 3 }, icon: "🌈" },
      { id: "e6", text: "Pinte todo o elefantinho!", hint: "Pinte cada parte do elefantinho", kind: { type: "paint_all" }, icon: "🎨" },
    ],
  },
  {
    id: "girafinha",
    name: "Girafinha",
    emoji: "🦒",
    bg: "from-yellow-100 via-amber-200 to-orange-100",
    greeting: "A girafinha está na savana!",
    scene: "savana",
    stamps: ["leaf", "tree", "sun", "heart", "star", "flower", "palm", "cloud", "grass", "rock", "rainbow", "butterfly"],
    challenges: [
      { id: "gi1", text: "Pinte o corpinho de amarelo", hint: "Use o baldinho no corpo", kind: { type: "paint_part_color", part: "body", partLabel: "corpinho", color: "yellow", colorLabel: "amarelo" }, icon: "💛" },
      { id: "gi2", text: "Pinte o pescoço de laranja", hint: "Toque no pescocinho", kind: { type: "paint_part_color", part: "neck", partLabel: "pescoço", color: "orange", colorLabel: "laranja" }, icon: "🦒" },
      { id: "gi3", text: "Coloque 3 folhas", hint: "Folhas pra girafinha", kind: { type: "stamp", stamp: "leaf", count: 3 }, icon: "🍃" },
      { id: "gi4", text: "Coloque 2 árvores", hint: "Árvores da savana", kind: { type: "stamp", stamp: "tree", count: 2 }, icon: "🌳" },
      { id: "gi5", text: "Use 3 cores diferentes", hint: "Pinte com várias cores", kind: { type: "colors", count: 3 }, icon: "🌈" },
      { id: "gi6", text: "Pinte toda a girafinha!", hint: "Pinte cada parte da girafinha", kind: { type: "paint_all" }, icon: "🎨" },
    ],
  },
  {
    id: "zebrinha",
    name: "Zebrinha",
    emoji: "🦓",
    bg: "from-gray-100 via-slate-100 to-zinc-200",
    greeting: "A zebrinha está na savana!",
    scene: "savana",
    stamps: ["leaf", "tree", "sun", "heart", "star", "flower", "clover", "cloud", "grass", "rock", "rainbow", "water_drop"],
    challenges: [
      { id: "z1", text: "Pinte o corpinho de branco", hint: "Use o baldinho no corpo", kind: { type: "paint_part_color", part: "body", partLabel: "corpinho", color: "white", colorLabel: "branco" }, icon: "🦓" },
      { id: "z2", text: "Pinte a cabeça de preto", hint: "Toque na cabeça", kind: { type: "paint_part_color", part: "head", partLabel: "cabeça", color: "black", colorLabel: "preto" }, icon: "⚫" },
      { id: "z3", text: "Coloque 3 folhas", hint: "Folhas pra zebrinha", kind: { type: "stamp", stamp: "leaf", count: 3 }, icon: "🍃" },
      { id: "z4", text: "Coloque 2 sóis", hint: "Sol da savana", kind: { type: "stamp", stamp: "sun", count: 2 }, icon: "☀️" },
      { id: "z5", text: "Use 3 cores diferentes", hint: "Pinte com várias cores", kind: { type: "colors", count: 3 }, icon: "🌈" },
      { id: "z6", text: "Pinte toda a zebrinha!", hint: "Pinte cada parte da zebrinha", kind: { type: "paint_all" }, icon: "🎨" },
    ],
  },
  {
    id: "tigrinho",
    name: "Tigrinho",
    emoji: "🐯",
    bg: "from-orange-200 via-amber-100 to-yellow-200",
    greeting: "O tigrinho está na selva!",
    scene: "selva",
    stamps: ["leaf", "tree", "palm", "pawprint", "heart", "star", "sun", "stripe", "vine", "rock", "rainbow", "moon"],
    challenges: [
      { id: "t1", text: "Pinte o corpinho de laranja", hint: "Use o baldinho no corpo", kind: { type: "paint_part_color", part: "body", partLabel: "corpinho", color: "orange", colorLabel: "laranja" }, icon: "🐯" },
      { id: "t2", text: "Pinte a cabeça de laranja", hint: "Toque na cabeça", kind: { type: "paint_part_color", part: "head", partLabel: "cabeça", color: "orange", colorLabel: "laranja" }, icon: "🧡" },
      { id: "t3", text: "Coloque 3 folhas", hint: "Folhas da selva", kind: { type: "stamp", stamp: "leaf", count: 3 }, icon: "🍃" },
      { id: "t4", text: "Coloque 2 patinhas", hint: "Pegadas do tigrinho", kind: { type: "stamp", stamp: "pawprint", count: 2 }, icon: "🐾" },
      { id: "t5", text: "Use 3 cores diferentes", hint: "Pinte com várias cores", kind: { type: "colors", count: 3 }, icon: "🌈" },
      { id: "t6", text: "Pinte todo o tigrinho!", hint: "Pinte cada parte do tigrinho", kind: { type: "paint_all" }, icon: "🎨" },
    ],
  },
  {
    id: "pandinha",
    name: "Pandinha",
    emoji: "🐼",
    bg: "from-zinc-100 via-slate-100 to-gray-200",
    greeting: "O pandinha está no bambuzal!",
    scene: "bambuzal",
    stamps: ["leaf", "tree", "berry", "heart", "star", "flower", "sun", "bamboo", "snowflake", "cloud", "moon", "rainbow"],
    challenges: [
      { id: "pa1", text: "Pinte o corpinho de branco", hint: "Use o baldinho no corpo", kind: { type: "paint_part_color", part: "body", partLabel: "corpinho", color: "white", colorLabel: "branco" }, icon: "🐼" },
      { id: "pa2", text: "Pinte as orelhinhas de preto", hint: "Toque nas orelhas", kind: { type: "paint_part_color", part: "ear_left", partLabel: "orelha", color: "black", colorLabel: "preto" }, icon: "⚫" },
      { id: "pa3", text: "Coloque 3 folhas", hint: "Bambu pro pandinha", kind: { type: "stamp", stamp: "leaf", count: 3 }, icon: "🍃" },
      { id: "pa4", text: "Coloque 2 frutinhas", hint: "Frutinhas pro pandinha", kind: { type: "stamp", stamp: "berry", count: 2 }, icon: "🍓" },
      { id: "pa5", text: "Use 3 cores diferentes", hint: "Pinte com várias cores", kind: { type: "colors", count: 3 }, icon: "🌈" },
      { id: "pa6", text: "Pinte todo o pandinha!", hint: "Pinte cada parte do pandinha", kind: { type: "paint_all" }, icon: "🎨" },
    ],
  },
];

export const ENCOURAGEMENTS = [
  "Está ficando lindo!",
  "Continue, você consegue!",
  "Quase lá!",
  "Que capricho!",
  "Você tem talento!",
];

export const CELEBRATIONS = [
  "Muito bem!",
  "Você conseguiu!",
  "Que desenho lindo!",
  "Uauu, ficou incrível!",
  "Parabéns, artista!",
];

export const FINAL_MESSAGES = [
  "Você conseguiu! 🎉",
  "Parabéns, artista! 🌟",
  "Uauu, terminou tudo!",
];

export const getThemeById = (id: ThemeId) => THEMES.find((t) => t.id === id)!;
export const getStampById = (id: StampId) => ALL_STAMPS.find((s) => s.id === id)!;
export const getColorById = (id: string) => PAINT_COLORS.find((c) => c.id === id);

// Backwards-compat alias used by some components
export const STAMPS = ALL_STAMPS;
