import { ThemeId } from "./studio-data";
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
  /** intrinsic image size (square) */
  size: number;
  /** named fillable regions */
  parts: AnimalPart[];
}

const p = (x: number, y: number) => ({ x, y });

const coelhinho: AnimalDef = {
  id: "coelhinho",
  src: coelhinhoImg,
  size: 1024,
  parts: [
    { id: "ear_left", label: "orelha esquerda", points: [p(0.36, 0.20), p(0.34, 0.12), p(0.38, 0.28)] },
    { id: "ear_right", label: "orelha direita", points: [p(0.61, 0.20), p(0.63, 0.12), p(0.59, 0.28)] },
    { id: "head", label: "cabeça", points: [p(0.50, 0.42), p(0.50, 0.34), p(0.50, 0.30), p(0.44, 0.40), p(0.56, 0.40)] },
    { id: "body", label: "corpinho", points: [p(0.32, 0.70), p(0.68, 0.70), p(0.30, 0.62), p(0.70, 0.62)] },
    { id: "belly", label: "barriguinha", points: [p(0.50, 0.75), p(0.50, 0.80)] },
    { id: "foot_left", label: "patinha", points: [p(0.36, 0.86), p(0.32, 0.92)] },
    { id: "foot_right", label: "patinha", points: [p(0.64, 0.86), p(0.68, 0.92)] },
  ],
};

const gatinho: AnimalDef = {
  id: "gatinho",
  src: gatinhoImg,
  size: 1024,
  parts: [
    { id: "ear_left", label: "orelha esquerda", points: [p(0.30, 0.18)] },
    { id: "ear_right", label: "orelha direita", points: [p(0.66, 0.18)] },
    { id: "head", label: "cabeça", points: [p(0.50, 0.38)] },
    { id: "body", label: "corpinho", points: [p(0.50, 0.72)] },
    { id: "belly", label: "barriguinha", points: [p(0.50, 0.70)] },
    { id: "tail", label: "rabinho", points: [p(0.18, 0.70)] },
  ],
};

const ursinho: AnimalDef = {
  id: "ursinho",
  src: ursinhoImg,
  size: 1024,
  parts: [
    { id: "ear_left", label: "orelha esquerda", points: [p(0.27, 0.18)] },
    { id: "ear_right", label: "orelha direita", points: [p(0.73, 0.18)] },
    { id: "head", label: "cabeça", points: [p(0.50, 0.32)] },
    { id: "body", label: "corpinho", points: [p(0.25, 0.65), p(0.75, 0.65)] },
    { id: "heart", label: "coração", points: [p(0.50, 0.68)] },
    { id: "foot_left", label: "patinha", points: [p(0.32, 0.85)] },
    { id: "foot_right", label: "patinha", points: [p(0.68, 0.85)] },
  ],
};

const cachorrinho: AnimalDef = {
  id: "cachorrinho",
  src: cachorrinhoImg,
  size: 1024,
  parts: [
    { id: "ear_left", label: "orelhinha", points: [p(0.22, 0.32)] },
    { id: "ear_right", label: "orelhinha", points: [p(0.78, 0.32)] },
    { id: "head", label: "cabeça", points: [p(0.40, 0.30)] },
    { id: "body", label: "corpinho", points: [p(0.30, 0.70), p(0.70, 0.70)] },
    { id: "belly", label: "barriguinha", points: [p(0.50, 0.75)] },
    { id: "tail", label: "rabinho", points: [p(0.82, 0.70)] },
  ],
};

const peixinho: AnimalDef = {
  id: "peixinho",
  src: peixinhoImg,
  size: 1024,
  parts: [
    { id: "tail", label: "rabinho", points: [p(0.15, 0.55)] },
    { id: "body_top", label: "lombo", points: [p(0.50, 0.40)] },
    { id: "body_bottom", label: "barriguinha", points: [p(0.50, 0.65)] },
    { id: "fin_top", label: "barbatana", points: [p(0.45, 0.28)] },
    { id: "fin_side", label: "barbatana", points: [p(0.50, 0.55)] },
    { id: "head", label: "rostinho", points: [p(0.78, 0.55)] },
  ],
};

const macaquinho: AnimalDef = {
  id: "macaquinho",
  src: macaquinhoImg,
  size: 1024,
  parts: [
    { id: "ear_left", label: "orelhinha", points: [p(0.22, 0.36)] },
    { id: "ear_right", label: "orelhinha", points: [p(0.78, 0.36)] },
    { id: "head", label: "cabeça", points: [p(0.50, 0.25)] },
    { id: "face", label: "rostinho", points: [p(0.50, 0.40)] },
    { id: "body", label: "corpinho", points: [p(0.32, 0.68), p(0.68, 0.68)] },
    { id: "belly", label: "barriguinha", points: [p(0.50, 0.72)] },
    { id: "tail", label: "rabinho", points: [p(0.85, 0.72)] },
  ],
};

const leaozinho: AnimalDef = {
  id: "leaozinho",
  src: leaozinhoImg,
  size: 1024,
  parts: [
    { id: "mane", label: "juba", points: [p(0.50, 0.18), p(0.22, 0.32), p(0.78, 0.32), p(0.20, 0.50), p(0.80, 0.50)] },
    { id: "head", label: "cabeça", points: [p(0.50, 0.40), p(0.45, 0.42), p(0.55, 0.42)] },
    { id: "body", label: "corpinho", points: [p(0.50, 0.72), p(0.40, 0.78), p(0.60, 0.78)] },
    { id: "tail", label: "rabinho", points: [p(0.85, 0.78)] },
  ],
};

const elefantinho: AnimalDef = {
  id: "elefantinho",
  src: elefantinhoImg,
  size: 1024,
  parts: [
    { id: "ear_left", label: "orelha esquerda", points: [p(0.20, 0.40)] },
    { id: "ear_right", label: "orelha direita", points: [p(0.80, 0.40)] },
    { id: "head", label: "cabeça", points: [p(0.50, 0.35), p(0.45, 0.40), p(0.55, 0.40)] },
    { id: "body", label: "corpinho", points: [p(0.50, 0.72), p(0.38, 0.70), p(0.62, 0.70)] },
    { id: "trunk", label: "tromba", points: [p(0.50, 0.55)] },
  ],
};

const girafinha: AnimalDef = {
  id: "girafinha",
  src: girafinhaImg,
  size: 1024,
  parts: [
    { id: "head", label: "cabeça", points: [p(0.50, 0.28), p(0.42, 0.30), p(0.58, 0.30)] },
    { id: "neck", label: "pescoço", points: [p(0.50, 0.50)] },
    { id: "body", label: "corpinho", points: [p(0.50, 0.72), p(0.42, 0.75), p(0.58, 0.75)] },
    { id: "tail", label: "rabinho", points: [p(0.62, 0.72)] },
  ],
};

const zebrinha: AnimalDef = {
  id: "zebrinha",
  src: zebrinhaImg,
  size: 1024,
  parts: [
    { id: "ear_left", label: "orelha esquerda", points: [p(0.30, 0.20)] },
    { id: "ear_right", label: "orelha direita", points: [p(0.70, 0.20)] },
    { id: "head", label: "cabeça", points: [p(0.50, 0.35), p(0.42, 0.40), p(0.58, 0.40)] },
    { id: "body", label: "corpinho", points: [p(0.50, 0.70), p(0.40, 0.72), p(0.60, 0.72)] },
    { id: "tail", label: "rabinho", points: [p(0.80, 0.70)] },
  ],
};

const tigrinho: AnimalDef = {
  id: "tigrinho",
  src: tigrinhoImg,
  size: 1024,
  parts: [
    { id: "ear_left", label: "orelha esquerda", points: [p(0.22, 0.20)] },
    { id: "ear_right", label: "orelha direita", points: [p(0.78, 0.20)] },
    { id: "head", label: "cabeça", points: [p(0.50, 0.40), p(0.40, 0.45), p(0.60, 0.45)] },
    { id: "body", label: "corpinho", points: [p(0.50, 0.75), p(0.38, 0.78), p(0.62, 0.78)] },
    { id: "tail", label: "rabinho", points: [p(0.82, 0.70)] },
  ],
};

const pandinha: AnimalDef = {
  id: "pandinha",
  src: pandinhaImg,
  size: 1024,
  parts: [
    { id: "ear_left", label: "orelha esquerda", points: [p(0.28, 0.22)] },
    { id: "ear_right", label: "orelha direita", points: [p(0.72, 0.22)] },
    { id: "head", label: "cabeça", points: [p(0.50, 0.35), p(0.42, 0.40), p(0.58, 0.40)] },
    { id: "body", label: "corpinho", points: [p(0.50, 0.72), p(0.40, 0.78), p(0.60, 0.78)] },
    { id: "arm_left", label: "bracinho", points: [p(0.25, 0.60)] },
    { id: "arm_right", label: "bracinho", points: [p(0.75, 0.60)] },
  ],
};

export const ANIMALS: Record<ThemeId, AnimalDef> = {
  coelhinho,
  gatinho,
  ursinho,
  cachorrinho,
  peixinho,
  macaquinho,
  leaozinho,
  elefantinho,
  girafinha,
  zebrinha,
  tigrinho,
  pandinha,
};

export const getAnimal = (id: ThemeId) => ANIMALS[id];
