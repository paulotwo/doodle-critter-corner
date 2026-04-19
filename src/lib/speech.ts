import { ALL_STAMPS, StampId } from "./studio-data";

// Gênero gramatical de cada carimbo, usado para falar "duas flores" vs "dois ossinhos".
const STAMP_GENDER: Record<StampId, "m" | "f"> = {
  // sea
  fish: "m",
  bubble: "f",
  seaweed: "f",
  starfish: "f",
  shell: "f",
  crab: "m",
  octopus: "m",
  wave: "f",
  // jungle
  banana: "f",
  leaf: "f",
  palm: "f",
  monkey: "m",
  coconut: "m",
  vine: "m",
  parrot: "m",
  // garden / bunny
  carrot: "f",
  flower: "f",
  butterfly: "f",
  clover: "m",
  tulip: "f",
  ladybug: "f",
  mushroom: "m",
  // farm / dog
  bone: "m",
  ball: "f",
  pawprint: "f",
  house: "f",
  biscuit: "m",
  collar: "f",
  stick: "m",
  // forest / bear
  honey: "m", // pote de mel
  berry: "f",
  tree: "f",
  bee: "f",
  acorn: "f",
  pinecone: "f",
  fish_bear: "m",
  // cat
  yarn: "m",
  milk: "m",
  mouse: "m",
  paw: "f",
  feather: "f",
  bell: "m",
  toy_mouse: "m",
  // savanna
  cloud: "f",
  rock: "f",
  grass: "m",
  water_drop: "f",
  // tiger
  stripe: "f",
  // panda
  bamboo: "m",
  snowflake: "f",
  // bird
  egg: "m",
  worm: "f",
  nest: "m",
  // dino
  dino_egg: "m",
  volcano: "m",
  fern: "f",
  // universal
  heart: "m",
  star: "f",
  sun: "m",
  moon: "f",
  rainbow: "m",
  balloon: "m",
  music: "f",
};

const NUM_M: Record<number, string> = {
  1: "um", 2: "dois", 3: "três", 4: "quatro", 5: "cinco", 6: "seis", 7: "sete", 8: "oito", 9: "nove", 10: "dez",
};
const NUM_F: Record<number, string> = {
  1: "uma", 2: "duas", 3: "três", 4: "quatro", 5: "cinco", 6: "seis", 7: "sete", 8: "oito", 9: "nove", 10: "dez",
};

const escapeReg = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Reescreve o texto do desafio para soar natural na fala em pt-BR.
 * - "Coloque 2 flores" → "Coloque duas flores"
 * - "Coloque 3 ossinhos" → "Coloque três ossinhos"
 */
// Plurais irregulares conhecidos (por id de carimbo).
const IRREGULAR_PLURALS: Partial<Record<StampId, string[]>> = {
  sun: ["sóis", "sois"],
  flower: ["flores"],
  balloon: ["balões"],
  heart: ["corações"],
};

// Gera variantes plurais simples para casar a palavra dentro da frase.
const pluralVariants = (singular: string): string[] => {
  const w = singular.toLowerCase();
  const v = new Set<string>([w, w + "s"]);
  if (/r$/.test(w)) v.add(w + "es"); // flor → flores
  if (/ão$/.test(w)) {
    v.add(w.replace(/ão$/, "ões"));
    v.add(w.replace(/ão$/, "ãos"));
  }
  return [...v];
};

export const speechFriendly = (text: string): string => {
  let out = text;
  for (const stamp of ALL_STAMPS) {
    const gender = STAMP_GENDER[stamp.id] ?? "m";
    const word = stamp.label.toLowerCase();
    const variants = new Set<string>(pluralVariants(word));
    for (const extra of IRREGULAR_PLURALS[stamp.id] ?? []) variants.add(extra);
    // ordena do mais longo pro mais curto pra casar plural antes do singular
    const ordered = [...variants].sort((a, b) => b.length - a.length);
    for (const v of ordered) {
      const re = new RegExp(`(\\b)(\\d+)(\\s+${escapeReg(v)}\\b)`, "gi");
      out = out.replace(re, (_m, pre, num, rest) => {
        const n = parseInt(num, 10);
        const map = gender === "f" ? NUM_F : NUM_M;
        return `${pre}${map[n] ?? num}${rest}`;
      });
    }
  }
  // fallback genérico para "Use 2 cores" → "Use duas cores" (feminino)
  out = out.replace(/\b(\d+)\s+cores\b/gi, (_m, num) => {
    const n = parseInt(num, 10);
    return `${NUM_F[n] ?? num} cores`;
  });
  return out;
};
