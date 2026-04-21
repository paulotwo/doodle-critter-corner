import { ThemeId } from "./studio-data";

// ---- Full-res (1024) imports ----
import coelhinhoImg from "@/assets/animals/coelhinho.png";
import gatinhoImg from "@/assets/animals/gatinho.png";
import ursinhoImg from "@/assets/animals/ursinho.png";
import cachorrinhoImg from "@/assets/animals/cachorrinho.png";
import peixinhoImg from "@/assets/animals/peixinho.png";
import macaquinhoImg from "@/assets/animals/macaquinho.png";
import leaozinhoImg from "@/assets/animals/leaozinho.png";
import elefantinhoImg from "@/assets/animals/elefantinho.png";
import girafinhaImg from "@/assets/animals/girafinha.png";
import zebrinhaImg from "@/assets/animals/zebrinha.png";
import tigrinhoImg from "@/assets/animals/tigrinho.png";
import pandinhaImg from "@/assets/animals/pandinha.png";
import passarinhoImg from "@/assets/animals/passarinho.png";
import raposinhaImg from "@/assets/animals/raposinha.png";
import corujinhaImg from "@/assets/animals/corujinha.png";
import tartaruguinhaImg from "@/assets/animals/tartaruguinha.png";
import baleinhaImg from "@/assets/animals/baleinha.png";
import golfinhoImg from "@/assets/animals/golfinho.png";
import polvinhoImg from "@/assets/animals/polvinho.png";
import cavalinhoMarinhoImg from "@/assets/animals/cavalinho_marinho.png";
import rexinhoImg from "@/assets/animals/dinossaurinho.png";
import tricerinhoImg from "@/assets/animals/tricerinho.png";
import brontinhoImg from "@/assets/animals/brontinho.png";
import pterossaurinhoImg from "@/assets/animals/pterossaurinho.png";
import patinhoImg from "@/assets/animals/patinho.png";
import porquinhoImg from "@/assets/animals/porquinho.png";
import esquilinhoImg from "@/assets/animals/esquilinho.png";
import cangurzinhoImg from "@/assets/animals/cangurzinho.png";
import estegossaurinhoImg from "@/assets/animals/estegossaurinho.png";
import anquilossaurinhoImg from "@/assets/animals/anquilossaurinho.png";

// ---- 512px imports ----
import coelhinhoImg512 from "@/assets/animals-512/coelhinho.png";
import gatinhoImg512 from "@/assets/animals-512/gatinho.png";
import ursinhoImg512 from "@/assets/animals-512/ursinho.png";
import cachorrinhoImg512 from "@/assets/animals-512/cachorrinho.png";
import peixinhoImg512 from "@/assets/animals-512/peixinho.png";
import macaquinhoImg512 from "@/assets/animals-512/macaquinho.png";
import leaozinhoImg512 from "@/assets/animals-512/leaozinho.png";
import elefantinhoImg512 from "@/assets/animals-512/elefantinho.png";
import girafinhaImg512 from "@/assets/animals-512/girafinha.png";
import zebrinhaImg512 from "@/assets/animals-512/zebrinha.png";
import tigrinhoImg512 from "@/assets/animals-512/tigrinho.png";
import pandinhaImg512 from "@/assets/animals-512/pandinha.png";
import passarinhoImg512 from "@/assets/animals-512/passarinho.png";
import raposinhaImg512 from "@/assets/animals-512/raposinha.png";
import corujinhaImg512 from "@/assets/animals-512/corujinha.png";
import tartaruguinhaImg512 from "@/assets/animals-512/tartaruguinha.png";
import baleinhaImg512 from "@/assets/animals-512/baleinha.png";
import golfinhoImg512 from "@/assets/animals-512/golfinho.png";
import polvinhoImg512 from "@/assets/animals-512/polvinho.png";
import cavalinhoMarinhoImg512 from "@/assets/animals-512/cavalinho_marinho.png";
import rexinhoImg512 from "@/assets/animals-512/dinossaurinho.png";
import tricerinhoImg512 from "@/assets/animals-512/tricerinho.png";
import brontinhoImg512 from "@/assets/animals-512/brontinho.png";
import pterossaurinhoImg512 from "@/assets/animals-512/pterossaurinho.png";
import patinhoImg512 from "@/assets/animals-512/patinho.png";
import porquinhoImg512 from "@/assets/animals-512/porquinho.png";
import esquilinhoImg512 from "@/assets/animals-512/esquilinho.png";
import cangurzinhoImg512 from "@/assets/animals-512/cangurzinho.png";
import estegossaurinhoImg512 from "@/assets/animals-512/estegossaurinho.png";
import anquilossaurinhoImg512 from "@/assets/animals-512/anquilossaurinho.png";

/**
 * Returns true when the viewport is wide enough to warrant full-res images.
 * We check once at module load and also expose the helper for runtime use.
 */
export const isHighRes = () =>
  typeof window !== "undefined" && window.innerWidth >= 1920;

/** Pick the right image URL for current viewport */
const pick = (full: string, small: string) => (isHighRes() ? full : small);

/**
 * Each animal is now an outline PNG (coloring-book style).
 * Painting is done via flood-fill on a canvas.
 * Each "part" describes a named region with one or more sample points
 * (normalized 0..1 over the image) used both for challenge validation
 * and as a hint for the child of where to tap.
 */
export interface AnimalPart {
  id: string;
  label: string;
  /** sample points (normalized 0..1) inside the region */
  points: { x: number; y: number }[];
}

export interface AnimalDef {
  id: ThemeId;
  /** outline image (PNG with transparent background) */
  src: string;
  /** full-res image (always 1024) */
  srcFull: string;
  /** intrinsic image size (square) */
  size: number;
  /** named fillable regions */
  parts: AnimalPart[];
}

const p = (x: number, y: number) => ({ x, y });

const mkAnimal = (
  id: ThemeId,
  full: string,
  small: string,
  parts: AnimalPart[]
): AnimalDef => ({
  id,
  src: pick(full, small),
  srcFull: full,
  size: 1024,
  parts,
});

const coelhinho = mkAnimal("coelhinho", coelhinhoImg, coelhinhoImg512, [
  { id: "ear_left", label: "orelha esquerda", points: [p(0.36, 0.18), p(0.36, 0.10)] },
  { id: "ear_right", label: "orelha direita", points: [p(0.62, 0.18), p(0.62, 0.10)] },
  { id: "head", label: "cabeça", points: [p(0.50, 0.42), p(0.40, 0.45), p(0.60, 0.45)] },
  { id: "body", label: "corpinho", points: [p(0.50, 0.68), p(0.36, 0.70), p(0.64, 0.70)] },
  { id: "belly", label: "barriguinha", points: [p(0.50, 0.75)] },
  { id: "foot_left", label: "patinha", points: [p(0.36, 0.85)] },
  { id: "foot_right", label: "patinha", points: [p(0.64, 0.85)] },
  { id: "tail", label: "rabinho", points: [p(0.78, 0.72)] },
]);

const gatinho = mkAnimal("gatinho", gatinhoImg, gatinhoImg512, [
  { id: "ear_left", label: "orelha esquerda", points: [p(0.30, 0.18)] },
  { id: "ear_right", label: "orelha direita", points: [p(0.66, 0.18)] },
  { id: "head", label: "cabeça", points: [p(0.50, 0.38)] },
  { id: "body", label: "corpinho", points: [p(0.50, 0.72)] },
  { id: "belly", label: "barriguinha", points: [p(0.50, 0.70)] },
  { id: "tail", label: "rabinho", points: [p(0.18, 0.70)] },
]);

const ursinho = mkAnimal("ursinho", ursinhoImg, ursinhoImg512, [
  { id: "ear_left", label: "orelha esquerda", points: [p(0.27, 0.18)] },
  { id: "ear_right", label: "orelha direita", points: [p(0.73, 0.18)] },
  { id: "head", label: "cabeça", points: [p(0.50, 0.32)] },
  { id: "body", label: "corpinho", points: [p(0.25, 0.65), p(0.75, 0.65)] },
  { id: "heart", label: "coração", points: [p(0.50, 0.68)] },
  { id: "foot_left", label: "patinha", points: [p(0.32, 0.85)] },
  { id: "foot_right", label: "patinha", points: [p(0.68, 0.85)] },
]);

const cachorrinho = mkAnimal("cachorrinho", cachorrinhoImg, cachorrinhoImg512, [
  { id: "ear_left", label: "orelhinha", points: [p(0.22, 0.32)] },
  { id: "ear_right", label: "orelhinha", points: [p(0.78, 0.32)] },
  { id: "head", label: "cabeça", points: [p(0.40, 0.30)] },
  { id: "body", label: "corpinho", points: [p(0.30, 0.70), p(0.70, 0.70)] },
  { id: "belly", label: "barriguinha", points: [p(0.50, 0.75)] },
  { id: "tail", label: "rabinho", points: [p(0.82, 0.70)] },
]);

const peixinho = mkAnimal("peixinho", peixinhoImg, peixinhoImg512, [
  { id: "tail", label: "rabinho", points: [p(0.15, 0.55)] },
  { id: "body_top", label: "lombo", points: [p(0.50, 0.40)] },
  { id: "body_bottom", label: "barriguinha", points: [p(0.50, 0.65)] },
  { id: "fin_top", label: "barbatana", points: [p(0.45, 0.28)] },
  { id: "fin_side", label: "barbatana", points: [p(0.50, 0.55)] },
  { id: "head", label: "rostinho", points: [p(0.78, 0.55)] },
]);

const macaquinho = mkAnimal("macaquinho", macaquinhoImg, macaquinhoImg512, [
  { id: "ear_left", label: "orelhinha", points: [p(0.22, 0.36)] },
  { id: "ear_right", label: "orelhinha", points: [p(0.78, 0.36)] },
  { id: "head", label: "cabeça", points: [p(0.50, 0.25)] },
  { id: "face", label: "rostinho", points: [p(0.50, 0.40)] },
  { id: "body", label: "corpinho", points: [p(0.32, 0.68), p(0.68, 0.68)] },
  { id: "belly", label: "barriguinha", points: [p(0.50, 0.72)] },
  { id: "tail", label: "rabinho", points: [p(0.85, 0.72)] },
]);

const leaozinho = mkAnimal("leaozinho", leaozinhoImg, leaozinhoImg512, [
  { id: "mane", label: "juba", points: [p(0.50, 0.18), p(0.22, 0.32), p(0.78, 0.32), p(0.20, 0.50), p(0.80, 0.50)] },
  { id: "head", label: "cabeça", points: [p(0.50, 0.40), p(0.45, 0.42), p(0.55, 0.42)] },
  { id: "body", label: "corpinho", points: [p(0.50, 0.72), p(0.40, 0.78), p(0.60, 0.78)] },
  { id: "tail", label: "rabinho", points: [p(0.85, 0.78)] },
]);

const elefantinho = mkAnimal("elefantinho", elefantinhoImg, elefantinhoImg512, [
  { id: "ear_left", label: "orelha esquerda", points: [p(0.18, 0.32)] },
  { id: "ear_right", label: "orelha direita", points: [p(0.82, 0.32)] },
  { id: "head", label: "cabeça", points: [p(0.50, 0.32), p(0.42, 0.38), p(0.58, 0.38)] },
  { id: "trunk", label: "tromba", points: [p(0.50, 0.55)] },
  { id: "body", label: "corpinho", points: [p(0.35, 0.65), p(0.65, 0.65), p(0.50, 0.72)] },
  { id: "foot_left", label: "patinha", points: [p(0.32, 0.88)] },
  { id: "foot_right", label: "patinha", points: [p(0.68, 0.88)] },
  { id: "tail", label: "rabinho", points: [p(0.78, 0.78)] },
]);

const girafinha = mkAnimal("girafinha", girafinhaImg, girafinhaImg512, [
  { id: "head", label: "cabeça", points: [p(0.36, 0.28), p(0.42, 0.32)] },
  { id: "neck", label: "pescoço", points: [p(0.48, 0.45)] },
  { id: "mane", label: "juba", points: [p(0.55, 0.40)] },
  { id: "body", label: "corpinho", points: [p(0.55, 0.62), p(0.50, 0.68)] },
  { id: "leg_front", label: "perninha", points: [p(0.42, 0.82)] },
  { id: "leg_back", label: "perninha", points: [p(0.62, 0.82)] },
  { id: "tail", label: "rabinho", points: [p(0.78, 0.65)] },
]);

const zebrinha = mkAnimal("zebrinha", zebrinhaImg, zebrinhaImg512, [
  { id: "ear_left", label: "orelha esquerda", points: [p(0.24, 0.20)] },
  { id: "ear_right", label: "orelha direita", points: [p(0.40, 0.18)] },
  { id: "mane", label: "juba", points: [p(0.42, 0.25), p(0.50, 0.30)] },
  { id: "head", label: "cabeça", points: [p(0.22, 0.40), p(0.28, 0.50)] },
  { id: "snout", label: "focinho", points: [p(0.15, 0.55)] },
  { id: "body", label: "corpinho", points: [p(0.55, 0.55), p(0.62, 0.62)] },
  { id: "leg_front", label: "perninha", points: [p(0.42, 0.80)] },
  { id: "leg_back", label: "perninha", points: [p(0.68, 0.80)] },
  { id: "tail", label: "rabinho", points: [p(0.82, 0.62)] },
]);

const tigrinho = mkAnimal("tigrinho", tigrinhoImg, tigrinhoImg512, [
  { id: "ear_left", label: "orelha esquerda", points: [p(0.22, 0.20)] },
  { id: "ear_right", label: "orelha direita", points: [p(0.78, 0.20)] },
  { id: "head", label: "cabeça", points: [p(0.50, 0.40), p(0.40, 0.45), p(0.60, 0.45)] },
  { id: "body", label: "corpinho", points: [p(0.50, 0.75), p(0.38, 0.78), p(0.62, 0.78)] },
  { id: "tail", label: "rabinho", points: [p(0.82, 0.70)] },
]);

const pandinha = mkAnimal("pandinha", pandinhaImg, pandinhaImg512, [
  { id: "ear_left", label: "orelha esquerda", points: [p(0.28, 0.22)] },
  { id: "ear_right", label: "orelha direita", points: [p(0.72, 0.22)] },
  { id: "eye_patch_left", label: "manchinha do olho", points: [p(0.38, 0.42)] },
  { id: "eye_patch_right", label: "manchinha do olho", points: [p(0.62, 0.42)] },
  { id: "head", label: "cabeça", points: [p(0.50, 0.35), p(0.50, 0.50)] },
  { id: "body", label: "corpinho", points: [p(0.50, 0.70), p(0.38, 0.72), p(0.62, 0.72)] },
  { id: "foot_left", label: "patinha", points: [p(0.32, 0.85)] },
  { id: "foot_right", label: "patinha", points: [p(0.68, 0.85)] },
]);

const passarinho = mkAnimal("passarinho", passarinhoImg, passarinhoImg512, [
  { id: "head", label: "cabeça", points: [p(0.50, 0.25), p(0.42, 0.30), p(0.58, 0.30)] },
  { id: "beak", label: "biquinho", points: [p(0.50, 0.38)] },
  { id: "body", label: "corpinho", points: [p(0.50, 0.62), p(0.50, 0.70)] },
  { id: "wing_left", label: "asinha", points: [p(0.22, 0.52)] },
  { id: "wing_right", label: "asinha", points: [p(0.78, 0.52)] },
  { id: "foot_left", label: "patinha", points: [p(0.42, 0.88)] },
  { id: "foot_right", label: "patinha", points: [p(0.58, 0.88)] },
]);

const raposinha = mkAnimal("raposinha", raposinhaImg, raposinhaImg512, [
  { id: "ear_left", label: "orelha esquerda", points: [p(0.28, 0.18)] },
  { id: "ear_right", label: "orelha direita", points: [p(0.72, 0.18)] },
  { id: "head", label: "cabeça", points: [p(0.50, 0.38), p(0.42, 0.42), p(0.58, 0.42)] },
  { id: "body", label: "corpinho", points: [p(0.50, 0.72), p(0.42, 0.78), p(0.58, 0.78)] },
  { id: "belly", label: "barriguinha", points: [p(0.50, 0.80)] },
  { id: "tail", label: "rabinho", points: [p(0.82, 0.72)] },
]);

const corujinha = mkAnimal("corujinha", corujinhaImg, corujinhaImg512, [
  { id: "head", label: "cabeça", points: [p(0.50, 0.22), p(0.40, 0.25), p(0.60, 0.25)] },
  { id: "beak", label: "biquinho", points: [p(0.50, 0.40)] },
  { id: "body", label: "corpinho", points: [p(0.50, 0.65), p(0.42, 0.70), p(0.58, 0.70)] },
  { id: "belly", label: "barriguinha", points: [p(0.50, 0.78)] },
  { id: "wing_left", label: "asinha", points: [p(0.25, 0.55)] },
  { id: "wing_right", label: "asinha", points: [p(0.75, 0.55)] },
  { id: "foot_left", label: "patinha", points: [p(0.42, 0.92)] },
  { id: "foot_right", label: "patinha", points: [p(0.58, 0.92)] },
]);

const tartaruguinha = mkAnimal("tartaruguinha", tartaruguinhaImg, tartaruguinhaImg512, [
  { id: "head", label: "cabeça", points: [p(0.20, 0.40)] },
  { id: "shell", label: "casquinho", points: [p(0.55, 0.40), p(0.55, 0.50)] },
  { id: "body", label: "corpinho", points: [p(0.45, 0.60)] },
  { id: "fin_front", label: "patinha da frente", points: [p(0.30, 0.65)] },
  { id: "fin_back", label: "patinha de trás", points: [p(0.75, 0.65)] },
  { id: "tail", label: "rabinho", points: [p(0.82, 0.55)] },
]);

const baleinha = mkAnimal("baleinha", baleinhaImg, baleinhaImg512, [
  { id: "body", label: "corpinho", points: [p(0.50, 0.45), p(0.45, 0.45)] },
  { id: "belly", label: "barriguinha", points: [p(0.50, 0.62)] },
  { id: "tail", label: "rabinho", points: [p(0.85, 0.40)] },
  { id: "fin", label: "barbatana", points: [p(0.55, 0.65)] },
  { id: "head", label: "rostinho", points: [p(0.22, 0.55)] },
]);

const golfinho = mkAnimal("golfinho", golfinhoImg, golfinhoImg512, [
  { id: "head", label: "rostinho", points: [p(0.30, 0.42)] },
  { id: "body", label: "corpinho", points: [p(0.55, 0.42), p(0.50, 0.50)] },
  { id: "belly", label: "barriguinha", points: [p(0.45, 0.58)] },
  { id: "fin_top", label: "barbatana de cima", points: [p(0.55, 0.32)] },
  { id: "fin_side", label: "barbatana", points: [p(0.42, 0.65)] },
  { id: "tail", label: "rabinho", points: [p(0.82, 0.62)] },
]);

const polvinho = mkAnimal("polvinho", polvinhoImg, polvinhoImg512, [
  { id: "head", label: "cabeça", points: [p(0.50, 0.30), p(0.50, 0.40)] },
  { id: "tentacle_1", label: "tentáculo", points: [p(0.18, 0.65)] },
  { id: "tentacle_2", label: "tentáculo", points: [p(0.30, 0.78)] },
  { id: "tentacle_3", label: "tentáculo", points: [p(0.42, 0.82)] },
  { id: "tentacle_4", label: "tentáculo", points: [p(0.58, 0.82)] },
  { id: "tentacle_5", label: "tentáculo", points: [p(0.70, 0.78)] },
  { id: "tentacle_6", label: "tentáculo", points: [p(0.82, 0.65)] },
]);

const cavalinhoMarinho = mkAnimal("cavalinho_marinho", cavalinhoMarinhoImg, cavalinhoMarinhoImg512, [
  { id: "crown", label: "coroinha", points: [p(0.45, 0.15)] },
  { id: "head", label: "cabeça", points: [p(0.40, 0.30)] },
  { id: "snout", label: "focinho", points: [p(0.22, 0.40)] },
  { id: "body", label: "corpinho", points: [p(0.50, 0.55)] },
  { id: "belly", label: "barriguinha", points: [p(0.42, 0.60)] },
  { id: "fin", label: "barbatana", points: [p(0.62, 0.55)] },
  { id: "tail", label: "rabinho", points: [p(0.55, 0.85)] },
]);

const rexinho = mkAnimal("rexinho", rexinhoImg, rexinhoImg512, [
  { id: "head", label: "cabeça", points: [p(0.22, 0.32), p(0.28, 0.38)] },
  { id: "body", label: "corpinho", points: [p(0.55, 0.55), p(0.60, 0.60)] },
  { id: "belly", label: "barriguinha", points: [p(0.50, 0.72)] },
  { id: "tail", label: "rabinho", points: [p(0.88, 0.50)] },
  { id: "spikes", label: "espinhos", points: [p(0.45, 0.32), p(0.55, 0.38), p(0.65, 0.42)] },
  { id: "arm", label: "bracinho", points: [p(0.34, 0.58)] },
  { id: "leg_front", label: "perninha", points: [p(0.42, 0.82)] },
  { id: "leg_back", label: "perninha", points: [p(0.62, 0.82)] },
]);

const tricerinho = mkAnimal("tricerinho", tricerinhoImg, tricerinhoImg512, [
  { id: "head", label: "cabeça", points: [p(0.25, 0.45)] },
  { id: "frill", label: "coroa", points: [p(0.40, 0.30)] },
  { id: "horn", label: "chifre", points: [p(0.18, 0.32)] },
  { id: "body", label: "corpinho", points: [p(0.55, 0.55), p(0.60, 0.60)] },
  { id: "belly", label: "barriguinha", points: [p(0.50, 0.72)] },
  { id: "tail", label: "rabinho", points: [p(0.88, 0.55)] },
  { id: "leg_front", label: "perninha", points: [p(0.40, 0.82)] },
  { id: "leg_back", label: "perninha", points: [p(0.70, 0.82)] },
]);

const brontinho = mkAnimal("brontinho", brontinhoImg, brontinhoImg512, [
  { id: "head", label: "cabecinha", points: [p(0.20, 0.28)] },
  { id: "neck", label: "pescocinho", points: [p(0.32, 0.45)] },
  { id: "body", label: "corpinho", points: [p(0.55, 0.55), p(0.60, 0.60)] },
  { id: "belly", label: "barriguinha", points: [p(0.55, 0.72)] },
  { id: "spikes", label: "plaquinhas", points: [p(0.55, 0.42), p(0.62, 0.42)] },
  { id: "tail", label: "rabinho", points: [p(0.85, 0.55)] },
  { id: "leg_front", label: "perninha", points: [p(0.38, 0.82)] },
  { id: "leg_back", label: "perninha", points: [p(0.70, 0.82)] },
]);

const pterossaurinho = mkAnimal("pterossaurinho", pterossaurinhoImg, pterossaurinhoImg512, [
  { id: "head", label: "cabeça", points: [p(0.30, 0.30)] },
  { id: "beak", label: "biquinho", points: [p(0.18, 0.32)] },
  { id: "crest", label: "cristinha", points: [p(0.42, 0.20)] },
  { id: "body", label: "corpinho", points: [p(0.45, 0.55)] },
  { id: "belly", label: "barriguinha", points: [p(0.45, 0.68)] },
  { id: "wing_left", label: "asinha", points: [p(0.35, 0.70)] },
  { id: "wing_right", label: "asinha", points: [p(0.75, 0.40)] },
  { id: "feet", label: "patinhas", points: [p(0.45, 0.85)] },
]);

const patinho = mkAnimal("patinho", patinhoImg, patinhoImg512, [
  { id: "head", label: "cabeça", points: [p(0.50, 0.28), p(0.42, 0.32), p(0.58, 0.32)] },
  { id: "beak", label: "biquinho", points: [p(0.50, 0.42)] },
  { id: "body", label: "corpinho", points: [p(0.50, 0.65), p(0.40, 0.68), p(0.60, 0.68)] },
  { id: "wing_left", label: "asinha", points: [p(0.30, 0.58)] },
  { id: "wing_right", label: "asinha", points: [p(0.70, 0.58)] },
  { id: "foot_left", label: "patinha", points: [p(0.42, 0.88)] },
  { id: "foot_right", label: "patinha", points: [p(0.58, 0.88)] },
]);

const porquinho = mkAnimal("porquinho", porquinhoImg, porquinhoImg512, [
  { id: "ear_left", label: "orelha esquerda", points: [p(0.28, 0.22)] },
  { id: "ear_right", label: "orelha direita", points: [p(0.72, 0.22)] },
  { id: "head", label: "cabeça", points: [p(0.50, 0.35), p(0.40, 0.42), p(0.60, 0.42)] },
  { id: "snout", label: "focinho", points: [p(0.50, 0.48)] },
  { id: "body", label: "corpinho", points: [p(0.40, 0.70), p(0.60, 0.70)] },
  { id: "belly", label: "barriguinha", points: [p(0.50, 0.78)] },
  { id: "foot_left", label: "patinha", points: [p(0.36, 0.90)] },
  { id: "foot_right", label: "patinha", points: [p(0.64, 0.90)] },
  { id: "tail", label: "rabinho", points: [p(0.78, 0.78)] },
]);

const esquilinho = mkAnimal("esquilinho", esquilinhoImg, esquilinhoImg512, [
  { id: "ear_left", label: "orelha esquerda", points: [p(0.30, 0.18)] },
  { id: "ear_right", label: "orelha direita", points: [p(0.62, 0.18)] },
  { id: "head", label: "cabeça", points: [p(0.45, 0.32), p(0.40, 0.40)] },
  { id: "body", label: "corpinho", points: [p(0.40, 0.62), p(0.45, 0.55)] },
  { id: "belly", label: "barriguinha", points: [p(0.42, 0.72)] },
  { id: "tail", label: "rabinho", points: [p(0.80, 0.45), p(0.82, 0.60)] },
  { id: "foot_left", label: "patinha", points: [p(0.32, 0.85)] },
  { id: "foot_right", label: "patinha", points: [p(0.55, 0.85)] },
]);

const cangurzinho = mkAnimal("cangurzinho", cangurzinhoImg, cangurzinhoImg512, [
  { id: "ear_left", label: "orelha esquerda", points: [p(0.40, 0.15)] },
  { id: "ear_right", label: "orelha direita", points: [p(0.55, 0.15)] },
  { id: "head", label: "cabeça", points: [p(0.40, 0.32)] },
  { id: "body", label: "corpinho", points: [p(0.55, 0.55), p(0.50, 0.62)] },
  { id: "pouch", label: "bolsinha", points: [p(0.45, 0.55)] },
  { id: "arm", label: "bracinho", points: [p(0.38, 0.50)] },
  { id: "leg_back", label: "perninha", points: [p(0.42, 0.85)] },
  { id: "tail", label: "rabinho", points: [p(0.78, 0.80)] },
]);

const estegossaurinho = mkAnimal("estegossaurinho", estegossaurinhoImg, estegossaurinhoImg512, [
  { id: "head", label: "cabeça", points: [p(0.18, 0.35)] },
  { id: "body", label: "corpinho", points: [p(0.50, 0.55), p(0.55, 0.62)] },
  { id: "belly", label: "barriguinha", points: [p(0.50, 0.72)] },
  { id: "plates", label: "placas", points: [p(0.40, 0.25), p(0.55, 0.22), p(0.70, 0.30)] },
  { id: "leg_front", label: "perninha", points: [p(0.32, 0.85)] },
  { id: "leg_back", label: "perninha", points: [p(0.65, 0.85)] },
  { id: "tail", label: "rabinho", points: [p(0.88, 0.55)] },
]);

const anquilossaurinho = mkAnimal("anquilossaurinho", anquilossaurinhoImg, anquilossaurinhoImg512, [
  { id: "head", label: "cabeça", points: [p(0.18, 0.45)] },
  { id: "body", label: "corpinho", points: [p(0.45, 0.55), p(0.55, 0.62)] },
  { id: "belly", label: "barriguinha", points: [p(0.50, 0.75)] },
  { id: "armor", label: "armadura", points: [p(0.45, 0.35), p(0.60, 0.32), p(0.72, 0.40)] },
  { id: "leg_front", label: "perninha", points: [p(0.32, 0.85)] },
  { id: "leg_back", label: "perninha", points: [p(0.65, 0.85)] },
  { id: "tail", label: "rabinho", points: [p(0.88, 0.62)] },
  { id: "club", label: "clavinha", points: [p(0.92, 0.62)] },
]);

export const ANIMALS: Record<ThemeId, AnimalDef> = {
  cachorrinho, gatinho, coelhinho, passarinho, patinho, porquinho,
  ursinho, raposinha, corujinha, macaquinho,
  leaozinho, elefantinho, girafinha, zebrinha, tigrinho, pandinha,
  esquilinho, cangurzinho,
  peixinho, tartaruguinha, baleinha, golfinho, polvinho,
  cavalinho_marinho: cavalinhoMarinho,
  rexinho, tricerinho, brontinho, pterossaurinho,
  estegossaurinho, anquilossaurinho,
};

export const getAnimal = (id: ThemeId) => ANIMALS[id];
