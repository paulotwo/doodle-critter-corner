export type ThemeId =
  // domésticos
  | "cachorrinho"
  | "gatinho"
  | "coelhinho"
  | "passarinho"
  | "patinho"
  | "porquinho"
  // selvagens
  | "ursinho"
  | "raposinha"
  | "corujinha"
  | "macaquinho"
  | "leaozinho"
  | "elefantinho"
  | "girafinha"
  | "zebrinha"
  | "tigrinho"
  | "pandinha"
  | "esquilinho"
  | "cangurzinho"
  // aquáticos
  | "peixinho"
  | "tartaruguinha"
  | "baleinha"
  | "golfinho"
  | "polvinho"
  | "cavalinho_marinho"
  | "tubaraozinho"
  | "caranguejinho"
  | "foquinha"
  // dinossauros
  | "rexinho"
  | "tricerinho"
  | "brontinho"
  | "pterossaurinho"
  | "estegossaurinho"
  | "anquilossaurinho"
  | "velocirraptorzinho"
  | "parassaurolofinho"
  | "dimetrodonzinho";

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
  // bird
  | "egg"
  | "worm"
  | "nest"
  // dino
  | "dino_egg"
  | "volcano"
  | "fern"
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
  // bird
  { id: "egg", label: "Ovinho", emoji: "🥚" },
  { id: "worm", label: "Minhoca", emoji: "🪱" },
  { id: "nest", label: "Ninho", emoji: "🪺" },
  // dino
  { id: "dino_egg", label: "Ovo de dino", emoji: "🥚" },
  { id: "volcano", label: "Vulcão", emoji: "🌋" },
  { id: "fern", label: "Samambaia", emoji: "🌿" },
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

// THEMES are ordered: domésticos → selvagens → aquáticos → dinossauros
export const THEMES: ThemeDef[] = [
  // ---------- 🏡 Domésticos ----------
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
    id: "passarinho",
    name: "Passarinho",
    emoji: "🐤",
    bg: "from-sky-100 via-yellow-100 to-amber-100",
    greeting: "O passarinho está no jardim!",
    scene: "jardim",
    stamps: ["egg", "worm", "nest", "leaf", "flower", "tree", "cloud", "sun", "heart", "star", "rainbow", "music"],
    challenges: [
      { id: "pa_1", text: "Pinte o corpinho de amarelo", hint: "Use o baldinho no corpo", kind: { type: "paint_part_color", part: "body", partLabel: "corpinho", color: "yellow", colorLabel: "amarelo" }, icon: "💛" },
      { id: "pa_2", text: "Pinte o biquinho de laranja", hint: "Toque no biquinho", kind: { type: "paint_part_color", part: "beak", partLabel: "biquinho", color: "orange", colorLabel: "laranja" }, icon: "🐤" },
      { id: "pa_3", text: "Coloque 3 ovinhos", hint: "Ovinhos no ninho", kind: { type: "stamp", stamp: "egg", count: 3 }, icon: "🥚" },
      { id: "pa_4", text: "Coloque 2 nuvens", hint: "Nuvens no céu", kind: { type: "stamp", stamp: "cloud", count: 2 }, icon: "☁️" },
      { id: "pa_5", text: "Use 3 cores diferentes", hint: "Pinte com várias cores", kind: { type: "colors", count: 3 }, icon: "🌈" },
      { id: "pa_6", text: "Pinte todo o passarinho!", hint: "Pinte cada parte do passarinho", kind: { type: "paint_all" }, icon: "🎨" },
    ],
  },
  {
    id: "patinho",
    name: "Patinho",
    emoji: "🦆",
    bg: "from-yellow-100 via-amber-100 to-sky-100",
    greeting: "O patinho está no laguinho!",
    scene: "quintal",
    stamps: ["water_drop", "wave", "bubble", "egg", "flower", "leaf", "cloud", "sun", "heart", "star", "rainbow", "music"],
    challenges: [
      { id: "pt_1", text: "Pinte o corpinho de amarelo", hint: "Use o baldinho no corpo", kind: { type: "paint_part_color", part: "body", partLabel: "corpinho", color: "yellow", colorLabel: "amarelo" }, icon: "💛" },
      { id: "pt_2", text: "Pinte o biquinho de laranja", hint: "Toque no biquinho", kind: { type: "paint_part_color", part: "beak", partLabel: "biquinho", color: "orange", colorLabel: "laranja" }, icon: "🦆" },
      { id: "pt_3", text: "Coloque 3 gotinhas", hint: "Águinha do laguinho", kind: { type: "stamp", stamp: "water_drop", count: 3 }, icon: "💧" },
      { id: "pt_4", text: "Coloque 2 ondinhas", hint: "Ondinhas no laguinho", kind: { type: "stamp", stamp: "wave", count: 2 }, icon: "🌊" },
      { id: "pt_5", text: "Use 3 cores diferentes", hint: "Pinte com várias cores", kind: { type: "colors", count: 3 }, icon: "🌈" },
      { id: "pt_6", text: "Pinte todo o patinho!", hint: "Pinte cada parte do patinho", kind: { type: "paint_all" }, icon: "🎨" },
    ],
  },
  {
    id: "porquinho",
    name: "Porquinho",
    emoji: "🐷",
    bg: "from-pink-100 via-rose-100 to-amber-100",
    greeting: "O porquinho está na fazendinha!",
    scene: "quintal",
    stamps: ["flower", "leaf", "clover", "mushroom", "butterfly", "ladybug", "sun", "cloud", "heart", "star", "rainbow", "music"],
    challenges: [
      { id: "pq1", text: "Pinte o corpinho de rosa", hint: "Use o baldinho no corpo", kind: { type: "paint_part_color", part: "body", partLabel: "corpinho", color: "pink", colorLabel: "rosa" }, icon: "💗" },
      { id: "pq2", text: "Pinte o focinho de rosa", hint: "Toque no focinho", kind: { type: "paint_part_color", part: "snout", partLabel: "focinho", color: "pink", colorLabel: "rosa" }, icon: "🐷" },
      { id: "pq3", text: "Coloque 3 flores", hint: "Flores na fazendinha", kind: { type: "stamp", stamp: "flower", count: 3 }, icon: "🌸" },
      { id: "pq4", text: "Coloque 2 trevos", hint: "Trevinhos no quintal", kind: { type: "stamp", stamp: "clover", count: 2 }, icon: "🍀" },
      { id: "pq5", text: "Use 3 cores diferentes", hint: "Pinte com várias cores", kind: { type: "colors", count: 3 }, icon: "🌈" },
      { id: "pq6", text: "Pinte todo o porquinho!", hint: "Pinte cada parte do porquinho", kind: { type: "paint_all" }, icon: "🎨" },
    ],
  },

  // ---------- 🌳 Selvagens ----------
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
    id: "raposinha",
    name: "Raposinha",
    emoji: "🦊",
    bg: "from-orange-100 via-amber-100 to-rose-100",
    greeting: "A raposinha está na floresta!",
    scene: "floresta",
    stamps: ["leaf", "tree", "berry", "mushroom", "acorn", "flower", "pinecone", "heart", "star", "sun", "rainbow", "moon"],
    challenges: [
      { id: "r1", text: "Pinte o corpinho de laranja", hint: "Use o baldinho no corpo", kind: { type: "paint_part_color", part: "body", partLabel: "corpinho", color: "orange", colorLabel: "laranja" }, icon: "🦊" },
      { id: "r2", text: "Pinte a barriguinha de branco", hint: "Toque na barriga", kind: { type: "paint_part_color", part: "belly", partLabel: "barriguinha", color: "white", colorLabel: "branco" }, icon: "🤍" },
      { id: "r3", text: "Coloque 3 folhas", hint: "Folhas da floresta", kind: { type: "stamp", stamp: "leaf", count: 3 }, icon: "🍃" },
      { id: "r4", text: "Coloque 2 frutinhas", hint: "Frutinhas pra raposinha", kind: { type: "stamp", stamp: "berry", count: 2 }, icon: "🍓" },
      { id: "r5", text: "Use 3 cores diferentes", hint: "Pinte com várias cores", kind: { type: "colors", count: 3 }, icon: "🌈" },
      { id: "r6", text: "Pinte toda a raposinha!", hint: "Pinte cada parte da raposinha", kind: { type: "paint_all" }, icon: "🎨" },
    ],
  },
  {
    id: "corujinha",
    name: "Corujinha",
    emoji: "🦉",
    bg: "from-indigo-100 via-violet-100 to-blue-100",
    greeting: "A corujinha voa de noite!",
    scene: "floresta à noite",
    stamps: ["leaf", "tree", "moon", "star", "feather", "acorn", "pinecone", "cloud", "heart", "sun", "rainbow", "music"],
    challenges: [
      { id: "co1", text: "Pinte o corpinho de marrom", hint: "Use o baldinho no corpo", kind: { type: "paint_part_color", part: "body", partLabel: "corpinho", color: "brown", colorLabel: "marrom" }, icon: "🤎" },
      { id: "co2", text: "Pinte a barriguinha de amarelo", hint: "Toque na barriga", kind: { type: "paint_part_color", part: "belly", partLabel: "barriguinha", color: "yellow", colorLabel: "amarelo" }, icon: "💛" },
      { id: "co3", text: "Coloque 3 estrelas", hint: "Estrelas no céu", kind: { type: "stamp", stamp: "star", count: 3 }, icon: "⭐" },
      { id: "co4", text: "Coloque 2 luas", hint: "Luinhas no céu", kind: { type: "stamp", stamp: "moon", count: 2 }, icon: "🌙" },
      { id: "co5", text: "Use 3 cores diferentes", hint: "Pinte com várias cores", kind: { type: "colors", count: 3 }, icon: "🌈" },
      { id: "co6", text: "Pinte toda a corujinha!", hint: "Pinte cada parte da corujinha", kind: { type: "paint_all" }, icon: "🎨" },
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
      { id: "pn1", text: "Pinte o corpinho de branco", hint: "Use o baldinho no corpo", kind: { type: "paint_part_color", part: "body", partLabel: "corpinho", color: "white", colorLabel: "branco" }, icon: "🐼" },
      { id: "pn2", text: "Pinte as orelhinhas de preto", hint: "Toque nas orelhas", kind: { type: "paint_part_color", part: "ear_left", partLabel: "orelha", color: "black", colorLabel: "preto" }, icon: "⚫" },
      { id: "pn3", text: "Coloque 3 folhas", hint: "Bambu pro pandinha", kind: { type: "stamp", stamp: "leaf", count: 3 }, icon: "🍃" },
      { id: "pn4", text: "Coloque 2 frutinhas", hint: "Frutinhas pro pandinha", kind: { type: "stamp", stamp: "berry", count: 2 }, icon: "🍓" },
      { id: "pn5", text: "Use 3 cores diferentes", hint: "Pinte com várias cores", kind: { type: "colors", count: 3 }, icon: "🌈" },
      { id: "pn6", text: "Pinte todo o pandinha!", hint: "Pinte cada parte do pandinha", kind: { type: "paint_all" }, icon: "🎨" },
    ],
  },
  {
    id: "esquilinho",
    name: "Esquilinho",
    emoji: "🐿️",
    bg: "from-amber-100 via-orange-100 to-yellow-100",
    greeting: "O esquilinho está na floresta!",
    scene: "floresta",
    stamps: ["acorn", "leaf", "tree", "berry", "mushroom", "pinecone", "flower", "sun", "heart", "star", "rainbow", "cloud"],
    challenges: [
      { id: "es1", text: "Pinte o corpinho de marrom", hint: "Use o baldinho no corpo", kind: { type: "paint_part_color", part: "body", partLabel: "corpinho", color: "brown", colorLabel: "marrom" }, icon: "🤎" },
      { id: "es2", text: "Pinte o rabinho de laranja", hint: "Toque no rabo fofinho", kind: { type: "paint_part_color", part: "tail", partLabel: "rabinho", color: "orange", colorLabel: "laranja" }, icon: "🐿️" },
      { id: "es3", text: "Coloque 3 bolotas", hint: "Bolotas pro esquilinho", kind: { type: "stamp", stamp: "acorn", count: 3 }, icon: "🌰" },
      { id: "es4", text: "Coloque 2 folhas", hint: "Folhas da floresta", kind: { type: "stamp", stamp: "leaf", count: 2 }, icon: "🍃" },
      { id: "es5", text: "Use 3 cores diferentes", hint: "Pinte com várias cores", kind: { type: "colors", count: 3 }, icon: "🌈" },
      { id: "es6", text: "Pinte todo o esquilinho!", hint: "Pinte cada parte do esquilinho", kind: { type: "paint_all" }, icon: "🎨" },
    ],
  },
  {
    id: "cangurzinho",
    name: "Cangurzinho",
    emoji: "🦘",
    bg: "from-orange-100 via-amber-100 to-yellow-100",
    greeting: "O cangurzinho pula bem alto!",
    scene: "savana",
    stamps: ["grass", "leaf", "tree", "rock", "flower", "sun", "cloud", "heart", "star", "rainbow", "moon", "water_drop"],
    challenges: [
      { id: "cg1", text: "Pinte o corpinho de marrom", hint: "Use o baldinho no corpo", kind: { type: "paint_part_color", part: "body", partLabel: "corpinho", color: "brown", colorLabel: "marrom" }, icon: "🤎" },
      { id: "cg2", text: "Pinte a bolsinha de rosa", hint: "Toque na bolsinha do filhote", kind: { type: "paint_part_color", part: "pouch", partLabel: "bolsinha", color: "pink", colorLabel: "rosa" }, icon: "💗" },
      { id: "cg3", text: "Coloque 3 capins", hint: "Capim da savana", kind: { type: "stamp", stamp: "grass", count: 3 }, icon: "🌾" },
      { id: "cg4", text: "Coloque 2 pedras", hint: "Pedras pra pular", kind: { type: "stamp", stamp: "rock", count: 2 }, icon: "🪨" },
      { id: "cg5", text: "Use 3 cores diferentes", hint: "Pinte com várias cores", kind: { type: "colors", count: 3 }, icon: "🌈" },
      { id: "cg6", text: "Pinte todo o cangurzinho!", hint: "Pinte cada parte do cangurzinho", kind: { type: "paint_all" }, icon: "🎨" },
    ],
  },

  // ---------- 🌊 Aquáticos ----------
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
    id: "tartaruguinha",
    name: "Tartaruguinha",
    emoji: "🐢",
    bg: "from-teal-100 via-emerald-100 to-cyan-100",
    greeting: "A tartaruguinha nada no mar!",
    scene: "fundo do mar",
    stamps: ["bubble", "seaweed", "starfish", "shell", "fish", "crab", "wave", "water_drop", "heart", "sun", "rainbow", "music"],
    challenges: [
      { id: "ta1", text: "Pinte o casquinho de verde", hint: "Use o baldinho no casco", kind: { type: "paint_part_color", part: "shell", partLabel: "casquinho", color: "green", colorLabel: "verde" }, icon: "💚" },
      { id: "ta2", text: "Pinte a cabeça de verde", hint: "Toque na cabecinha", kind: { type: "paint_part_color", part: "head", partLabel: "cabeça", color: "green", colorLabel: "verde" }, icon: "🐢" },
      { id: "ta3", text: "Coloque 3 bolhas", hint: "Bolhinhas no mar", kind: { type: "stamp", stamp: "bubble", count: 3 }, icon: "🫧" },
      { id: "ta4", text: "Coloque 2 algas", hint: "Plantinhas do mar", kind: { type: "stamp", stamp: "seaweed", count: 2 }, icon: "🌿" },
      { id: "ta5", text: "Use 3 cores diferentes", hint: "Pinte com várias cores", kind: { type: "colors", count: 3 }, icon: "🌈" },
      { id: "ta6", text: "Pinte toda a tartaruguinha!", hint: "Pinte cada parte da tartaruguinha", kind: { type: "paint_all" }, icon: "🎨" },
    ],
  },
  {
    id: "baleinha",
    name: "Baleinha",
    emoji: "🐳",
    bg: "from-blue-200 via-sky-100 to-cyan-200",
    greeting: "A baleinha nada no oceano!",
    scene: "oceano",
    stamps: ["bubble", "wave", "water_drop", "fish", "starfish", "shell", "octopus", "cloud", "heart", "sun", "rainbow", "music"],
    challenges: [
      { id: "ba1", text: "Pinte o corpinho de azul", hint: "Use o baldinho no corpo", kind: { type: "paint_part_color", part: "body", partLabel: "corpinho", color: "blue", colorLabel: "azul" }, icon: "💙" },
      { id: "ba2", text: "Pinte a barriguinha de branco", hint: "Toque na barriga", kind: { type: "paint_part_color", part: "belly", partLabel: "barriguinha", color: "white", colorLabel: "branco" }, icon: "🤍" },
      { id: "ba3", text: "Coloque 3 ondinhas", hint: "Ondas no mar", kind: { type: "stamp", stamp: "wave", count: 3 }, icon: "🌊" },
      { id: "ba4", text: "Coloque 2 gotinhas", hint: "Água do esguicho", kind: { type: "stamp", stamp: "water_drop", count: 2 }, icon: "💧" },
      { id: "ba5", text: "Use 3 cores diferentes", hint: "Pinte com várias cores", kind: { type: "colors", count: 3 }, icon: "🌈" },
      { id: "ba6", text: "Pinte toda a baleinha!", hint: "Pinte cada parte da baleinha", kind: { type: "paint_all" }, icon: "🎨" },
    ],
  },

  {
    id: "golfinho",
    name: "Golfinho",
    emoji: "🐬",
    bg: "from-cyan-100 via-sky-100 to-blue-200",
    greeting: "O golfinho pula no mar!",
    scene: "oceano",
    stamps: ["bubble", "wave", "water_drop", "fish", "starfish", "shell", "seaweed", "sun", "heart", "cloud", "rainbow", "music"],
    challenges: [
      { id: "go1", text: "Pinte o corpinho de azul", hint: "Use o baldinho no corpo", kind: { type: "paint_part_color", part: "body", partLabel: "corpinho", color: "blue", colorLabel: "azul" }, icon: "💙" },
      { id: "go2", text: "Pinte a barriguinha de branco", hint: "Toque na barriga", kind: { type: "paint_part_color", part: "belly", partLabel: "barriguinha", color: "white", colorLabel: "branco" }, icon: "🤍" },
      { id: "go3", text: "Coloque 3 ondinhas", hint: "Ondas no mar", kind: { type: "stamp", stamp: "wave", count: 3 }, icon: "🌊" },
      { id: "go4", text: "Coloque 2 bolhas", hint: "Bolhinhas no mar", kind: { type: "stamp", stamp: "bubble", count: 2 }, icon: "🫧" },
      { id: "go5", text: "Use 3 cores diferentes", hint: "Pinte com várias cores", kind: { type: "colors", count: 3 }, icon: "🌈" },
      { id: "go6", text: "Pinte todo o golfinho!", hint: "Pinte cada parte do golfinho", kind: { type: "paint_all" }, icon: "🎨" },
    ],
  },
  {
    id: "polvinho",
    name: "Polvinho",
    emoji: "🐙",
    bg: "from-purple-100 via-pink-100 to-rose-200",
    greeting: "O polvinho dança no mar!",
    scene: "fundo do mar",
    stamps: ["bubble", "seaweed", "starfish", "shell", "fish", "crab", "wave", "water_drop", "heart", "star", "rainbow", "music"],
    challenges: [
      { id: "po1", text: "Pinte a cabeça de roxo", hint: "Use o baldinho na cabeça", kind: { type: "paint_part_color", part: "head", partLabel: "cabeça", color: "purple", colorLabel: "roxo" }, icon: "💜" },
      { id: "po2", text: "Pinte um tentáculo de rosa", hint: "Toque num bracinho", kind: { type: "paint_part_color", part: "tentacle_1", partLabel: "tentáculo", color: "pink", colorLabel: "rosa" }, icon: "🐙" },
      { id: "po3", text: "Coloque 3 bolhas", hint: "Bolhinhas no mar", kind: { type: "stamp", stamp: "bubble", count: 3 }, icon: "🫧" },
      { id: "po4", text: "Coloque 2 conchas", hint: "Conchinhas do mar", kind: { type: "stamp", stamp: "shell", count: 2 }, icon: "🐚" },
      { id: "po5", text: "Use 3 cores diferentes", hint: "Pinte com várias cores", kind: { type: "colors", count: 3 }, icon: "🌈" },
      { id: "po6", text: "Pinte todo o polvinho!", hint: "Pinte cada parte do polvinho", kind: { type: "paint_all" }, icon: "🎨" },
    ],
  },
  {
    id: "cavalinho_marinho",
    name: "Cavalinho-marinho",
    emoji: "🐴",
    bg: "from-pink-100 via-fuchsia-100 to-cyan-100",
    greeting: "O cavalinho-marinho nada devagarzinho!",
    scene: "fundo do mar",
    stamps: ["bubble", "seaweed", "starfish", "shell", "fish", "wave", "water_drop", "flower", "heart", "star", "rainbow", "music"],
    challenges: [
      { id: "cm1", text: "Pinte o corpinho de amarelo", hint: "Use o baldinho no corpo", kind: { type: "paint_part_color", part: "body", partLabel: "corpinho", color: "yellow", colorLabel: "amarelo" }, icon: "💛" },
      { id: "cm2", text: "Pinte a coroinha de roxo", hint: "Toque na coroa", kind: { type: "paint_part_color", part: "crown", partLabel: "coroinha", color: "purple", colorLabel: "roxo" }, icon: "👑" },
      { id: "cm3", text: "Coloque 3 bolhas", hint: "Bolhinhas no mar", kind: { type: "stamp", stamp: "bubble", count: 3 }, icon: "🫧" },
      { id: "cm4", text: "Coloque 2 algas", hint: "Plantinhas do mar", kind: { type: "stamp", stamp: "seaweed", count: 2 }, icon: "🌿" },
      { id: "cm5", text: "Use 3 cores diferentes", hint: "Pinte com várias cores", kind: { type: "colors", count: 3 }, icon: "🌈" },
      { id: "cm6", text: "Pinte todo o cavalinho-marinho!", hint: "Pinte cada parte do cavalinho-marinho", kind: { type: "paint_all" }, icon: "🎨" },
    ],
  },
  {
    id: "tubaraozinho",
    name: "Tubarãozinho",
    emoji: "🦈",
    bg: "from-sky-200 via-blue-100 to-cyan-200",
    greeting: "O tubarãozinho nada rapidinho!",
    scene: "oceano",
    stamps: ["bubble", "wave", "water_drop", "fish", "starfish", "shell", "seaweed", "octopus", "heart", "sun", "rainbow", "music"],
    challenges: [
      { id: "tb1", text: "Pinte o corpinho de azul", hint: "Use o baldinho no corpo", kind: { type: "paint_part_color", part: "body", partLabel: "corpinho", color: "blue", colorLabel: "azul" }, icon: "💙" },
      { id: "tb2", text: "Pinte a barriguinha de branco", hint: "Toque na barriga", kind: { type: "paint_part_color", part: "belly", partLabel: "barriguinha", color: "white", colorLabel: "branco" }, icon: "🤍" },
      { id: "tb3", text: "Coloque 3 ondinhas", hint: "Ondas no mar", kind: { type: "stamp", stamp: "wave", count: 3 }, icon: "🌊" },
      { id: "tb4", text: "Coloque 2 peixinhos", hint: "Peixinhos pra companhia", kind: { type: "stamp", stamp: "fish", count: 2 }, icon: "🐠" },
      { id: "tb5", text: "Use 3 cores diferentes", hint: "Pinte com várias cores", kind: { type: "colors", count: 3 }, icon: "🌈" },
      { id: "tb6", text: "Pinte todo o tubarãozinho!", hint: "Pinte cada parte do tubarãozinho", kind: { type: "paint_all" }, icon: "🎨" },
    ],
  },
  {
    id: "caranguejinho",
    name: "Caranguejinho",
    emoji: "🦀",
    bg: "from-orange-100 via-red-100 to-amber-100",
    greeting: "O caranguejinho anda de ladinho!",
    scene: "fundo do mar",
    stamps: ["bubble", "seaweed", "starfish", "shell", "fish", "wave", "water_drop", "rock", "heart", "sun", "rainbow", "music"],
    challenges: [
      { id: "cj1", text: "Pinte o corpinho de vermelho", hint: "Use o baldinho no corpo", kind: { type: "paint_part_color", part: "body", partLabel: "corpinho", color: "red", colorLabel: "vermelho" }, icon: "❤️" },
      { id: "cj2", text: "Pinte uma garra de laranja", hint: "Toque numa garra grande", kind: { type: "paint_part_color", part: "claw_left", partLabel: "garra", color: "orange", colorLabel: "laranja" }, icon: "🦀" },
      { id: "cj3", text: "Coloque 3 conchas", hint: "Conchinhas do mar", kind: { type: "stamp", stamp: "shell", count: 3 }, icon: "🐚" },
      { id: "cj4", text: "Coloque 2 bolhas", hint: "Bolhinhas no mar", kind: { type: "stamp", stamp: "bubble", count: 2 }, icon: "🫧" },
      { id: "cj5", text: "Use 3 cores diferentes", hint: "Pinte com várias cores", kind: { type: "colors", count: 3 }, icon: "🌈" },
      { id: "cj6", text: "Pinte todo o caranguejinho!", hint: "Pinte cada parte do caranguejinho", kind: { type: "paint_all" }, icon: "🎨" },
    ],
  },
  {
    id: "foquinha",
    name: "Foquinha",
    emoji: "🦭",
    bg: "from-blue-100 via-cyan-100 to-sky-200",
    greeting: "A foquinha bate palminha no gelo!",
    scene: "oceano",
    stamps: ["bubble", "wave", "water_drop", "fish", "starfish", "shell", "snowflake", "cloud", "heart", "sun", "rainbow", "music"],
    challenges: [
      { id: "fq1", text: "Pinte o corpinho de cinza", hint: "Use o baldinho no corpo (use marrom claro!)", kind: { type: "paint_part_color", part: "body", partLabel: "corpinho", color: "brown", colorLabel: "marrom" }, icon: "🦭" },
      { id: "fq2", text: "Pinte a barriguinha de branco", hint: "Toque na barriga", kind: { type: "paint_part_color", part: "belly", partLabel: "barriguinha", color: "white", colorLabel: "branco" }, icon: "🤍" },
      { id: "fq3", text: "Coloque 3 peixinhos", hint: "Peixinhos pra comer", kind: { type: "stamp", stamp: "fish", count: 3 }, icon: "🐟" },
      { id: "fq4", text: "Coloque 2 bolhas", hint: "Bolhinhas no mar", kind: { type: "stamp", stamp: "bubble", count: 2 }, icon: "🫧" },
      { id: "fq5", text: "Use 3 cores diferentes", hint: "Pinte com várias cores", kind: { type: "colors", count: 3 }, icon: "🌈" },
      { id: "fq6", text: "Pinte toda a foquinha!", hint: "Pinte cada parte da foquinha", kind: { type: "paint_all" }, icon: "🎨" },
    ],
  },

  // ---------- 🦖 Dinossauros ----------
  {
    id: "rexinho",
    name: "Rexinho (T-Rex)",
    emoji: "🦖",
    bg: "from-lime-100 via-emerald-100 to-amber-100",
    greeting: "O Rexinho está caçando na pré-história!",
    scene: "pré-história",
    stamps: ["dino_egg", "volcano", "fern", "leaf", "tree", "rock", "palm", "cloud", "heart", "sun", "rainbow", "star"],
    challenges: [
      { id: "rx1", text: "Pinte o corpinho de verde", hint: "Use o baldinho no corpo", kind: { type: "paint_part_color", part: "body", partLabel: "corpinho", color: "green", colorLabel: "verde" }, icon: "💚" },
      { id: "rx2", text: "Pinte os espinhos de laranja", hint: "Toque nos espinhos", kind: { type: "paint_part_color", part: "spikes", partLabel: "espinhos", color: "orange", colorLabel: "laranja" }, icon: "🦖" },
      { id: "rx3", text: "Coloque 3 ovos de dino", hint: "Ovinhos pra chocar", kind: { type: "stamp", stamp: "dino_egg", count: 3 }, icon: "🥚" },
      { id: "rx4", text: "Coloque 2 vulcões", hint: "Vulcões na pré-história", kind: { type: "stamp", stamp: "volcano", count: 2 }, icon: "🌋" },
      { id: "rx5", text: "Use 3 cores diferentes", hint: "Pinte com várias cores", kind: { type: "colors", count: 3 }, icon: "🌈" },
      { id: "rx6", text: "Pinte todo o Rexinho!", hint: "Pinte cada parte do Rexinho", kind: { type: "paint_all" }, icon: "🎨" },
    ],
  },
  {
    id: "tricerinho",
    name: "Tricerinho (Tricerátops)",
    emoji: "🦕",
    bg: "from-amber-100 via-yellow-100 to-lime-100",
    greeting: "O Tricerinho tem três chifres!",
    scene: "pré-história",
    stamps: ["dino_egg", "volcano", "fern", "leaf", "tree", "rock", "berry", "cloud", "heart", "sun", "rainbow", "star"],
    challenges: [
      { id: "tr1", text: "Pinte o corpinho de marrom", hint: "Use o baldinho no corpo", kind: { type: "paint_part_color", part: "body", partLabel: "corpinho", color: "brown", colorLabel: "marrom" }, icon: "🤎" },
      { id: "tr2", text: "Pinte a coroa de verde", hint: "Toque na coroa atrás da cabeça", kind: { type: "paint_part_color", part: "frill", partLabel: "coroa", color: "green", colorLabel: "verde" }, icon: "💚" },
      { id: "tr3", text: "Coloque 3 samambaias", hint: "Plantinhas pra comer", kind: { type: "stamp", stamp: "fern", count: 3 }, icon: "🌿" },
      { id: "tr4", text: "Coloque 2 pedras", hint: "Pedras na pré-história", kind: { type: "stamp", stamp: "rock", count: 2 }, icon: "🪨" },
      { id: "tr5", text: "Use 3 cores diferentes", hint: "Pinte com várias cores", kind: { type: "colors", count: 3 }, icon: "🌈" },
      { id: "tr6", text: "Pinte todo o Tricerinho!", hint: "Pinte cada parte do Tricerinho", kind: { type: "paint_all" }, icon: "🎨" },
    ],
  },
  {
    id: "brontinho",
    name: "Brontinho (Brontossauro)",
    emoji: "🦕",
    bg: "from-emerald-100 via-teal-100 to-lime-100",
    greeting: "O Brontinho tem o pescoço bem longo!",
    scene: "pré-história",
    stamps: ["dino_egg", "volcano", "fern", "leaf", "tree", "rock", "palm", "cloud", "heart", "sun", "rainbow", "star"],
    challenges: [
      { id: "br1", text: "Pinte o corpinho de verde", hint: "Use o baldinho no corpo", kind: { type: "paint_part_color", part: "body", partLabel: "corpinho", color: "green", colorLabel: "verde" }, icon: "💚" },
      { id: "br2", text: "Pinte o pescocinho de verde", hint: "Toque no pescoço comprido", kind: { type: "paint_part_color", part: "neck", partLabel: "pescocinho", color: "green", colorLabel: "verde" }, icon: "🦕" },
      { id: "br3", text: "Coloque 3 folhas", hint: "Folhinhas pro Brontinho comer", kind: { type: "stamp", stamp: "leaf", count: 3 }, icon: "🍃" },
      { id: "br4", text: "Coloque 2 árvores", hint: "Árvores pra alcançar", kind: { type: "stamp", stamp: "tree", count: 2 }, icon: "🌳" },
      { id: "br5", text: "Use 3 cores diferentes", hint: "Pinte com várias cores", kind: { type: "colors", count: 3 }, icon: "🌈" },
      { id: "br6", text: "Pinte todo o Brontinho!", hint: "Pinte cada parte do Brontinho", kind: { type: "paint_all" }, icon: "🎨" },
    ],
  },
  {
    id: "pterossaurinho",
    name: "Pterossaurinho",
    emoji: "🦅",
    bg: "from-sky-100 via-indigo-100 to-violet-100",
    greeting: "O Pterossaurinho voa bem alto!",
    scene: "céu pré-histórico",
    stamps: ["dino_egg", "volcano", "fern", "cloud", "rock", "tree", "leaf", "sun", "heart", "star", "rainbow", "moon"],
    challenges: [
      { id: "pt1", text: "Pinte as asinhas de roxo", hint: "Use o baldinho nas asas", kind: { type: "paint_part_color", part: "wing_right", partLabel: "asinha", color: "purple", colorLabel: "roxo" }, icon: "💜" },
      { id: "pt2", text: "Pinte o corpinho de marrom", hint: "Toque no corpo", kind: { type: "paint_part_color", part: "body", partLabel: "corpinho", color: "brown", colorLabel: "marrom" }, icon: "🤎" },
      { id: "pt3", text: "Coloque 3 nuvens", hint: "Nuvens no céu", kind: { type: "stamp", stamp: "cloud", count: 3 }, icon: "☁️" },
      { id: "pt4", text: "Coloque 2 vulcões", hint: "Vulcões na pré-história", kind: { type: "stamp", stamp: "volcano", count: 2 }, icon: "🌋" },
      { id: "pt5", text: "Use 3 cores diferentes", hint: "Pinte com várias cores", kind: { type: "colors", count: 3 }, icon: "🌈" },
      { id: "pt6", text: "Pinte todo o Pterossaurinho!", hint: "Pinte cada parte do Pterossaurinho", kind: { type: "paint_all" }, icon: "🎨" },
    ],
  },
  {
    id: "estegossaurinho",
    name: "Estegossaurinho",
    emoji: "🦖",
    bg: "from-emerald-100 via-lime-100 to-yellow-100",
    greeting: "O Estegossaurinho tem placas nas costas!",
    scene: "pré-história",
    stamps: ["dino_egg", "volcano", "fern", "leaf", "tree", "rock", "berry", "cloud", "heart", "sun", "rainbow", "star"],
    challenges: [
      { id: "eg1", text: "Pinte o corpinho de verde", hint: "Use o baldinho no corpo", kind: { type: "paint_part_color", part: "body", partLabel: "corpinho", color: "green", colorLabel: "verde" }, icon: "💚" },
      { id: "eg2", text: "Pinte as placas de laranja", hint: "Toque nas placas das costas", kind: { type: "paint_part_color", part: "plates", partLabel: "placas", color: "orange", colorLabel: "laranja" }, icon: "🦖" },
      { id: "eg3", text: "Coloque 3 samambaias", hint: "Plantinhas pra comer", kind: { type: "stamp", stamp: "fern", count: 3 }, icon: "🌿" },
      { id: "eg4", text: "Coloque 2 vulcões", hint: "Vulcões na pré-história", kind: { type: "stamp", stamp: "volcano", count: 2 }, icon: "🌋" },
      { id: "eg5", text: "Use 3 cores diferentes", hint: "Pinte com várias cores", kind: { type: "colors", count: 3 }, icon: "🌈" },
      { id: "eg6", text: "Pinte todo o Estegossaurinho!", hint: "Pinte cada parte do Estegossaurinho", kind: { type: "paint_all" }, icon: "🎨" },
    ],
  },
  {
    id: "anquilossaurinho",
    name: "Anquilossaurinho",
    emoji: "🦕",
    bg: "from-stone-100 via-amber-100 to-lime-100",
    greeting: "O Anquilossaurinho tem armadura forte!",
    scene: "pré-história",
    stamps: ["dino_egg", "volcano", "fern", "leaf", "tree", "rock", "berry", "cloud", "heart", "sun", "rainbow", "star"],
    challenges: [
      { id: "an1", text: "Pinte o corpinho de marrom", hint: "Use o baldinho no corpo", kind: { type: "paint_part_color", part: "body", partLabel: "corpinho", color: "brown", colorLabel: "marrom" }, icon: "🤎" },
      { id: "an2", text: "Pinte a armadura de verde", hint: "Toque nas plaquinhas das costas", kind: { type: "paint_part_color", part: "armor", partLabel: "armadura", color: "green", colorLabel: "verde" }, icon: "🛡️" },
      { id: "an3", text: "Coloque 3 pedras", hint: "Pedras na pré-história", kind: { type: "stamp", stamp: "rock", count: 3 }, icon: "🪨" },
      { id: "an4", text: "Coloque 2 samambaias", hint: "Plantinhas da pré-história", kind: { type: "stamp", stamp: "fern", count: 2 }, icon: "🌿" },
      { id: "an5", text: "Use 3 cores diferentes", hint: "Pinte com várias cores", kind: { type: "colors", count: 3 }, icon: "🌈" },
      { id: "an6", text: "Pinte todo o Anquilossaurinho!", hint: "Pinte cada parte do Anquilossaurinho", kind: { type: "paint_all" }, icon: "🎨" },
    ],
  },
  {
    id: "velocirraptorzinho",
    name: "Velocirraptorzinho",
    emoji: "🦖",
    bg: "from-rose-100 via-orange-100 to-amber-100",
    greeting: "O Velocirraptorzinho corre rapidinho!",
    scene: "pré-história",
    stamps: ["dino_egg", "volcano", "fern", "leaf", "tree", "rock", "berry", "cloud", "heart", "sun", "rainbow", "star"],
    challenges: [
      { id: "vr1", text: "Pinte o corpinho de laranja", hint: "Use o baldinho no corpo", kind: { type: "paint_part_color", part: "body", partLabel: "corpinho", color: "orange", colorLabel: "laranja" }, icon: "🧡" },
      { id: "vr2", text: "Pinte a barriguinha de amarelo", hint: "Toque na barriga", kind: { type: "paint_part_color", part: "belly", partLabel: "barriguinha", color: "yellow", colorLabel: "amarelo" }, icon: "💛" },
      { id: "vr3", text: "Coloque 3 ovos de dino", hint: "Ovinhos pra chocar", kind: { type: "stamp", stamp: "dino_egg", count: 3 }, icon: "🥚" },
      { id: "vr4", text: "Coloque 2 samambaias", hint: "Plantinhas da pré-história", kind: { type: "stamp", stamp: "fern", count: 2 }, icon: "🌿" },
      { id: "vr5", text: "Use 3 cores diferentes", hint: "Pinte com várias cores", kind: { type: "colors", count: 3 }, icon: "🌈" },
      { id: "vr6", text: "Pinte todo o Velocirraptorzinho!", hint: "Pinte cada parte do Velocirraptorzinho", kind: { type: "paint_all" }, icon: "🎨" },
    ],
  },
  {
    id: "parassaurolofinho",
    name: "Parassaurolofinho",
    emoji: "🦕",
    bg: "from-violet-100 via-purple-100 to-pink-100",
    greeting: "O Parassaurolofinho tem uma cristinha grande!",
    scene: "pré-história",
    stamps: ["dino_egg", "volcano", "fern", "leaf", "tree", "rock", "berry", "cloud", "heart", "sun", "rainbow", "star"],
    challenges: [
      { id: "pa1", text: "Pinte o corpinho de roxo", hint: "Use o baldinho no corpo", kind: { type: "paint_part_color", part: "body", partLabel: "corpinho", color: "purple", colorLabel: "roxo" }, icon: "💜" },
      { id: "pa2", text: "Pinte a cristinha de rosa", hint: "Toque na crista da cabeça", kind: { type: "paint_part_color", part: "crest", partLabel: "cristinha", color: "pink", colorLabel: "rosa" }, icon: "💗" },
      { id: "pa3", text: "Coloque 3 folhas", hint: "Folhinhas pra comer", kind: { type: "stamp", stamp: "leaf", count: 3 }, icon: "🍃" },
      { id: "pa4", text: "Coloque 2 árvores", hint: "Árvores pra alcançar", kind: { type: "stamp", stamp: "tree", count: 2 }, icon: "🌳" },
      { id: "pa5", text: "Use 3 cores diferentes", hint: "Pinte com várias cores", kind: { type: "colors", count: 3 }, icon: "🌈" },
      { id: "pa6", text: "Pinte todo o Parassaurolofinho!", hint: "Pinte cada parte do Parassaurolofinho", kind: { type: "paint_all" }, icon: "🎨" },
    ],
  },
  {
    id: "dimetrodonzinho",
    name: "Dimetrodonzinho",
    emoji: "🦎",
    bg: "from-amber-100 via-orange-100 to-red-100",
    greeting: "O Dimetrodonzinho tem uma vela nas costas!",
    scene: "pré-história",
    stamps: ["dino_egg", "volcano", "fern", "leaf", "tree", "rock", "berry", "cloud", "heart", "sun", "rainbow", "star"],
    challenges: [
      { id: "di1", text: "Pinte o corpinho de verde", hint: "Use o baldinho no corpo", kind: { type: "paint_part_color", part: "body", partLabel: "corpinho", color: "green", colorLabel: "verde" }, icon: "💚" },
      { id: "di2", text: "Pinte a velinha de laranja", hint: "Toque na vela das costas", kind: { type: "paint_part_color", part: "sail", partLabel: "velinha", color: "orange", colorLabel: "laranja" }, icon: "🦎" },
      { id: "di3", text: "Coloque 3 vulcões", hint: "Vulcões na pré-história", kind: { type: "stamp", stamp: "volcano", count: 3 }, icon: "🌋" },
      { id: "di4", text: "Coloque 2 pedras", hint: "Pedras quentes", kind: { type: "stamp", stamp: "rock", count: 2 }, icon: "🪨" },
      { id: "di5", text: "Use 3 cores diferentes", hint: "Pinte com várias cores", kind: { type: "colors", count: 3 }, icon: "🌈" },
      { id: "di6", text: "Pinte todo o Dimetrodonzinho!", hint: "Pinte cada parte do Dimetrodonzinho", kind: { type: "paint_all" }, icon: "🎨" },
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
