import { ThemeId } from "./studio-data";

// ---- Full-res (1024) imports ----
import cachorrinhoImg from "@/assets/animals/cachorrinho.png";
import gatinhoImg from "@/assets/animals/gatinho.png";
import coelhinhoImg from "@/assets/animals/coelhinho.png";
import passarinhoImg from "@/assets/animals/passarinho.png";
import patinhoImg from "@/assets/animals/patinho.png";
import porquinhoImg from "@/assets/animals/porquinho.png";
import ursinhoImg from "@/assets/animals/ursinho.png";
import raposinhaImg from "@/assets/animals/raposinha.png";
import corujinhaImg from "@/assets/animals/corujinha.png";
import macaquinhoImg from "@/assets/animals/macaquinho.png";
import leaozinhoImg from "@/assets/animals/leaozinho.png";
import elefantinhoImg from "@/assets/animals/elefantinho.png";
import girafinhaImg from "@/assets/animals/girafinha.png";
import zebrinhaImg from "@/assets/animals/zebrinha.png";
import tigrinhoImg from "@/assets/animals/tigrinho.png";
import pandinhaImg from "@/assets/animals/pandinha.png";
import esquilinhoImg from "@/assets/animals/esquilinho.png";
import cangurzinhoImg from "@/assets/animals/cangurzinho.png";
import peixinhoImg from "@/assets/animals/peixinho.png";
import tartaruguinhaImg from "@/assets/animals/tartaruguinha.png";
import baleinhaImg from "@/assets/animals/baleinha.png";
import golfinhoImg from "@/assets/animals/golfinho.png";
import polvinhoImg from "@/assets/animals/polvinho.png";
import cavalinhoMarinhoImg from "@/assets/animals/cavalinho_marinho.png";
import tubaraozinhoImg from "@/assets/animals/tubaraozinho.png";
import caranguejinhoImg from "@/assets/animals/caranguejinho.png";
import foquinhaImg from "@/assets/animals/foquinha.png";
import rexinhoImg from "@/assets/animals/dinossaurinho.png";
import tricerinhoImg from "@/assets/animals/tricerinho.png";
import brontinhoImg from "@/assets/animals/brontinho.png";
import pterossaurinhoImg from "@/assets/animals/pterossaurinho.png";
import estegossaurinhoImg from "@/assets/animals/estegossaurinho.png";
import anquilossaurinhoImg from "@/assets/animals/anquilossaurinho.png";
import velocirraptorzinhoImg from "@/assets/animals/velocirraptorzinho.png";
import parassaurolofinhoImg from "@/assets/animals/parassaurolofinho.png";
import dimetrodonzinhoImg from "@/assets/animals/dimetrodonzinho.png";
import hamsterImg from "@/assets/animals/hamster.png";
import vaquinhaImg from "@/assets/animals/vaquinha.png";
import ovelhinhaImg from "@/assets/animals/ovelhinha.png";
import galinhaImg from "@/assets/animals/galinha.png";
import cavalinhoImg from "@/assets/animals/cavalinho.png";
import cabritaImg from "@/assets/animals/cabrita.png";
import papagainhoImg from "@/assets/animals/papagainho.png";
import pinguinzinhoImg from "@/assets/animals/pinguinzinho.png";
import tucaninhoImg from "@/assets/animals/tucaninho.png";
import flamingozinhoImg from "@/assets/animals/flamingozinho.png";
import borboletinhaImg from "@/assets/animals/borboletinha.png";
import joaninhaImg from "@/assets/animals/joaninha.png";
import abelhinhaImg from "@/assets/animals/abelhinha.png";
import formiguinhaImg from "@/assets/animals/formiguinha.png";
import aranhinhaImg from "@/assets/animals/aranhinha.png";
import libelulinhaImg from "@/assets/animals/libelulinha.png";

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
  srcSmall: string;
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
  parts: AnimalPart[]
): AnimalDef => ({
  id,
  srcSmall: full,
  srcFull: full,
  size: 1024,
  parts,
});


const cachorrinho = mkAnimal("cachorrinho", cachorrinhoImg, [
  { id: "body", label: "corpinho", points: [p(0.50, 0.70)] },
  { id: "ear_left", label: "orelha esquerda", points: [p(0.25, 0.32)] },
  { id: "head", label: "cabeça", points: [p(0.48, 0.35)] },
  { id: "ear_right", label: "orelha direita", points: [p(0.75, 0.32)] },
  { id: "wing_right", label: "asinha direita", points: [p(0.62, 0.33)] },
  { id: "leg_back", label: "perninha de trás", points: [p(0.68, 0.74)] },
  { id: "foot_left", label: "patinha esquerda", points: [p(0.32, 0.74)] },
  { id: "belly", label: "barriguinha", points: [p(0.50, 0.49)] },
]);

const gatinho = mkAnimal("gatinho", gatinhoImg, [
  { id: "head", label: "cabeça", points: [p(0.50, 0.39)] },
  { id: "tail", label: "rabinho", points: [p(0.67, 0.76)] },
  { id: "belly", label: "barriguinha", points: [p(0.50, 0.71)] },
  { id: "body", label: "corpinho", points: [p(0.50, 0.71)] },
  { id: "foot_left", label: "patinha esquerda", points: [p(0.22, 0.73)] },
  { id: "ear_left", label: "orelha esquerda", points: [p(0.29, 0.20)] },
  { id: "ear_right", label: "orelha direita", points: [p(0.70, 0.20)] },
  { id: "wing_right", label: "asinha direita", points: [p(0.70, 0.21)] },
]);

const coelhinho = mkAnimal("coelhinho", coelhinhoImg, [
  { id: "ear_left", label: "orelha esquerda", points: [p(0.33, 0.22)] },
  { id: "head", label: "cabeça", points: [p(0.50, 0.38)] },
  { id: "belly", label: "barriguinha", points: [p(0.49, 0.74)] },
  { id: "body", label: "corpinho", points: [p(0.49, 0.73)] },
  { id: "ear_right", label: "orelha direita", points: [p(0.65, 0.21)] },
  { id: "leg_back", label: "perninha de trás", points: [p(0.71, 0.72)] },
  { id: "foot_right", label: "patinha direita", points: [p(0.67, 0.74)] },
  { id: "foot_left", label: "patinha esquerda", points: [p(0.32, 0.74)] },
]);

const passarinho = mkAnimal("passarinho", passarinhoImg, [
  { id: "beak", label: "biquinho", points: [p(0.50, 0.37)] },
  { id: "body", label: "corpinho", points: [p(0.50, 0.61)] },
  { id: "head", label: "cabeça", points: [p(0.50, 0.31)] },
  { id: "wing_left", label: "asinha esquerda", points: [p(0.25, 0.50)] },
  { id: "wing_right", label: "asinha direita", points: [p(0.75, 0.50)] },
  { id: "leg_back", label: "perninha de trás", points: [p(0.58, 0.83)] },
  { id: "leg_front", label: "perninha da frente", points: [p(0.43, 0.83)] },
  { id: "ear_right", label: "orelha direita", points: [p(0.61, 0.31)] },
]);

const patinho = mkAnimal("patinho", patinhoImg, [
  { id: "beak", label: "biquinho", points: [p(0.52, 0.42)] },
  { id: "body", label: "corpinho", points: [p(0.50, 0.61)] },
  { id: "head", label: "cabeça", points: [p(0.50, 0.33)] },
  { id: "leg_front", label: "perninha da frente", points: [p(0.42, 0.78)] },
  { id: "leg_back", label: "perninha de trás", points: [p(0.59, 0.78)] },
]);

const porquinho = mkAnimal("porquinho", porquinhoImg, [
  { id: "body", label: "corpinho", points: [p(0.50, 0.67)] },
  { id: "snout", label: "focinho", points: [p(0.46, 0.46)] },
  { id: "head", label: "cabeça", points: [p(0.50, 0.35)] },
  { id: "belly", label: "barriguinha", points: [p(0.50, 0.46)] },
  { id: "leg_front", label: "perninha da frente", points: [p(0.50, 0.78)] },
  { id: "leg_back", label: "perninha de trás", points: [p(0.67, 0.77)] },
  { id: "foot_left", label: "patinha esquerda", points: [p(0.33, 0.77)] },
]);

const ursinho = mkAnimal("ursinho", ursinhoImg, [
  { id: "head", label: "cabeça", points: [p(0.50, 0.33)] },
  { id: "heart", label: "coração", points: [p(0.50, 0.67)] },
  { id: "body", label: "corpinho", points: [p(0.50, 0.68)] },
  { id: "leg_back", label: "perninha de trás", points: [p(0.66, 0.80)] },
  { id: "foot_left", label: "patinha esquerda", points: [p(0.33, 0.80)] },
  { id: "ear_left", label: "orelha esquerda", points: [p(0.50, 0.42)] },
  { id: "wing_left", label: "asinha esquerda", points: [p(0.28, 0.62)] },
  { id: "tail", label: "rabinho", points: [p(0.71, 0.62)] },
]);

const raposinha = mkAnimal("raposinha", raposinhaImg, [
  { id: "belly", label: "barriguinha", points: [p(0.49, 0.73)] },
  { id: "body", label: "corpinho", points: [p(0.49, 0.80)] },
  { id: "head", label: "cabeça", points: [p(0.47, 0.35)] },
  { id: "tail", label: "rabinho", points: [p(0.77, 0.73)] },
  { id: "foot_left", label: "patinha esquerda", points: [p(0.32, 0.77)] },
  { id: "leg_back", label: "perninha de trás", points: [p(0.65, 0.77)] },
  { id: "leg_front", label: "perninha da frente", points: [p(0.31, 0.86)] },
  { id: "foot_right", label: "patinha direita", points: [p(0.66, 0.86)] },
]);

const corujinha = mkAnimal("corujinha", corujinhaImg, [
  { id: "belly", label: "barriguinha", points: [p(0.60, 0.80)] },
  { id: "body", label: "corpinho", points: [p(0.50, 0.62)] },
  { id: "head", label: "cabeça", points: [p(0.50, 0.41)] },
  { id: "ear_left", label: "orelha esquerda", points: [p(0.50, 0.21)] },
  { id: "wing_right", label: "asinha direita", points: [p(0.73, 0.54)] },
  { id: "wing_left", label: "asinha esquerda", points: [p(0.27, 0.54)] },
  { id: "ear_right", label: "orelha direita", points: [p(0.63, 0.33)] },
  { id: "leg_front", label: "perninha da frente", points: [p(0.37, 0.33)] },
]);

const macaquinho = mkAnimal("macaquinho", macaquinhoImg, [
  { id: "body", label: "corpinho", points: [p(0.50, 0.63)] },
  { id: "face", label: "rostinho", points: [p(0.50, 0.39)] },
  { id: "head", label: "cabeça", points: [p(0.50, 0.25)] },
  { id: "belly", label: "barriguinha", points: [p(0.50, 0.71)] },
  { id: "leg_front", label: "perninha da frente", points: [p(0.50, 0.83)] },
  { id: "foot_left", label: "patinha esquerda", points: [p(0.32, 0.81)] },
  { id: "leg_back", label: "perninha de trás", points: [p(0.67, 0.81)] },
  { id: "tail", label: "rabinho", points: [p(0.79, 0.67)] },
]);

const leaozinho = mkAnimal("leaozinho", leaozinhoImg, [
  { id: "body", label: "corpinho", points: [p(0.50, 0.75)] },
  { id: "mane", label: "juba", points: [p(0.48, 0.22)] },
  { id: "head", label: "cabeça", points: [p(0.48, 0.41)] },
  { id: "wing_right", label: "asinha direita", points: [p(0.70, 0.49)] },
  { id: "wing_left", label: "asinha esquerda", points: [p(0.25, 0.42)] },
  { id: "ear_left", label: "orelha esquerda", points: [p(0.48, 0.12)] },
  { id: "ear_right", label: "orelha direita", points: [p(0.28, 0.25)] },
  { id: "tail", label: "rabinho", points: [p(0.73, 0.36)] },
]);

const elefantinho = mkAnimal("elefantinho", elefantinhoImg, [
  { id: "body", label: "corpinho", points: [p(0.50, 0.70)] },
  { id: "ear_left", label: "orelha esquerda", points: [p(0.22, 0.24)] },
  { id: "head", label: "cabeça", points: [p(0.50, 0.33)] },
  { id: "ear_right", label: "orelha direita", points: [p(0.77, 0.25)] },
  { id: "foot_right", label: "patinha direita", points: [p(0.71, 0.84)] },
  { id: "foot_left", label: "patinha esquerda", points: [p(0.30, 0.84)] },
  { id: "leg_back", label: "perninha de trás", points: [p(0.71, 0.74)] },
  { id: "leg_front", label: "perninha da frente", points: [p(0.29, 0.73)] },
]);

const girafinha = mkAnimal("girafinha", girafinhaImg, [
  { id: "body", label: "corpinho", points: [p(0.51, 0.66)] },
  { id: "neck", label: "pescoço", points: [p(0.52, 0.45)] },
  { id: "head", label: "cabeça", points: [p(0.41, 0.30)] },
  { id: "leg_front", label: "perninha da frente", points: [p(0.36, 0.76)] },
  { id: "belly", label: "barriguinha", points: [p(0.57, 0.78)] },
  { id: "ear_left", label: "orelha esquerda", points: [p(0.31, 0.19)] },
  { id: "foot_left", label: "patinha esquerda", points: [p(0.33, 0.85)] },
  { id: "leg_back", label: "perninha de trás", points: [p(0.52, 0.57)] },
]);

const zebrinha = mkAnimal("zebrinha", zebrinhaImg, [
  { id: "body", label: "corpinho", points: [p(0.48, 0.66)] },
  { id: "head", label: "cabeça", points: [p(0.51, 0.31)] },
  { id: "ear_left", label: "orelha esquerda", points: [p(0.35, 0.37)] },
  { id: "belly", label: "barriguinha", points: [p(0.64, 0.62)] },
  { id: "wing_left", label: "asinha esquerda", points: [p(0.22, 0.51)] },
  { id: "leg_front", label: "perninha da frente", points: [p(0.36, 0.74)] },
  { id: "ear_right", label: "orelha direita", points: [p(0.32, 0.19)] },
  { id: "leg_back", label: "perninha de trás", points: [p(0.58, 0.75)] },
]);

const tigrinho = mkAnimal("tigrinho", tigrinhoImg, [
  { id: "body", label: "corpinho", points: [p(0.49, 0.77)] },
  { id: "head", label: "cabeça", points: [p(0.49, 0.42)] },
  { id: "ear_right", label: "orelha direita", points: [p(0.74, 0.19)] },
  { id: "ear_left", label: "orelha esquerda", points: [p(0.25, 0.19)] },
  { id: "leg_back", label: "perninha de trás", points: [p(0.69, 0.79)] },
  { id: "wing_left", label: "asinha esquerda", points: [p(0.50, 0.14)] },
  { id: "foot_left", label: "patinha esquerda", points: [p(0.30, 0.79)] },
  { id: "belly", label: "barriguinha", points: [p(0.50, 0.48)] },
]);

const pandinha = mkAnimal("pandinha", pandinhaImg, [
  { id: "body", label: "corpinho", points: [p(0.50, 0.69)] },
  { id: "ear_left", label: "orelha esquerda", points: [p(0.28, 0.24)] },
  { id: "head", label: "cabeça", points: [p(0.50, 0.40)] },
  { id: "belly", label: "barriguinha", points: [p(0.50, 0.75)] },
  { id: "foot_left", label: "patinha esquerda", points: [p(0.31, 0.82)] },
  { id: "leg_back", label: "perninha de trás", points: [p(0.69, 0.82)] },
  { id: "ear_right", label: "orelha direita", points: [p(0.70, 0.22)] },
  { id: "wing_left", label: "asinha esquerda", points: [p(0.36, 0.39)] },
]);

const esquilinho = mkAnimal("esquilinho", esquilinhoImg, [
  { id: "body", label: "corpinho", points: [p(0.50, 0.71)] },
  { id: "tail", label: "rabinho", points: [p(0.65, 0.73)] },
  { id: "belly", label: "barriguinha", points: [p(0.43, 0.55)] },
  { id: "leg_front", label: "perninha da frente", points: [p(0.34, 0.73)] },
  { id: "wing_right", label: "asinha direita", points: [p(0.62, 0.56)] },
  { id: "foot_left", label: "patinha esquerda", points: [p(0.40, 0.83)] },
  { id: "leg_back", label: "perninha de trás", points: [p(0.59, 0.83)] },
  { id: "foot_right", label: "patinha direita", points: [p(0.53, 0.59)] },
]);

const cangurzinho = mkAnimal("cangurzinho", cangurzinhoImg, [
  { id: "body", label: "corpinho", points: [p(0.48, 0.60)] },
  { id: "pouch", label: "pouch", points: [p(0.49, 0.50)] },
  { id: "head", label: "cabeça", points: [p(0.48, 0.32)] },
  { id: "belly", label: "barriguinha", points: [p(0.54, 0.73)] },
  { id: "leg_front", label: "perninha da frente", points: [p(0.41, 0.80)] },
  { id: "leg_back", label: "perninha de trás", points: [p(0.67, 0.83)] },
  { id: "foot_left", label: "patinha esquerda", points: [p(0.43, 0.67)] },
  { id: "ear_left", label: "orelha esquerda", points: [p(0.42, 0.17)] },
]);

const peixinho = mkAnimal("peixinho", peixinhoImg, [
  { id: "body_top", label: "lombo", points: [p(0.44, 0.51)] },
  { id: "tail", label: "rabinho", points: [p(0.73, 0.54)] },
  { id: "body", label: "corpinho", points: [p(0.60, 0.53)] },
  { id: "wing_left", label: "asinha esquerda", points: [p(0.18, 0.53)] },
  { id: "head", label: "cabeça", points: [p(0.45, 0.28)] },
  { id: "leg_front", label: "perninha da frente", points: [p(0.41, 0.73)] },
  { id: "wing_right", label: "asinha direita", points: [p(0.70, 0.57)] },
  { id: "belly", label: "barriguinha", points: [p(0.58, 0.76)] },
]);

const tartaruguinha = mkAnimal("tartaruguinha", tartaruguinhaImg, [
  { id: "head", label: "cabeça", points: [p(0.48, 0.32)] },
  { id: "shell", label: "casquinho", points: [p(0.56, 0.40)] },
  { id: "ear_left", label: "orelha esquerda", points: [p(0.26, 0.33)] },
  { id: "body", label: "corpinho", points: [p(0.42, 0.67)] },
  { id: "belly", label: "barriguinha", points: [p(0.53, 0.55)] },
  { id: "wing_left", label: "asinha esquerda", points: [p(0.21, 0.58)] },
  { id: "leg_front", label: "perninha da frente", points: [p(0.43, 0.46)] },
  { id: "ear_right", label: "orelha direita", points: [p(0.57, 0.40)] },
]);

const baleinha = mkAnimal("baleinha", baleinhaImg, [
  { id: "belly", label: "barriguinha", points: [p(0.49, 0.55)] },
  { id: "body", label: "corpinho", points: [p(0.30, 0.60)] },
]);

const golfinho = mkAnimal("golfinho", golfinhoImg, [
  { id: "belly", label: "barriguinha", points: [p(0.38, 0.61)] },
  { id: "body", label: "corpinho", points: [p(0.48, 0.45)] },
]);

const polvinho = mkAnimal("polvinho", polvinhoImg, [
  { id: "head", label: "cabeça", points: [p(0.56, 0.38)] },
  { id: "tentacle_1", label: "tentáculo", points: [p(0.18, 0.62)] },
  { id: "body", label: "corpinho", points: [p(0.49, 0.52)] },
  { id: "wing_right", label: "asinha direita", points: [p(0.76, 0.58)] },
  { id: "tail", label: "rabinho", points: [p(0.73, 0.52)] },
  { id: "leg_back", label: "perninha de trás", points: [p(0.82, 0.62)] },
  { id: "wing_left", label: "asinha esquerda", points: [p(0.25, 0.52)] },
  { id: "foot_right", label: "patinha direita", points: [p(0.66, 0.80)] },
]);

const cavalinhoMarinho = mkAnimal("cavalinho_marinho", cavalinhoMarinhoImg, [
  { id: "body", label: "corpinho", points: [p(0.40, 0.58)] },
  { id: "crown", label: "coroinha", points: [p(0.48, 0.21)] },
  { id: "head", label: "cabeça", points: [p(0.48, 0.45)] },
  { id: "wing_right", label: "asinha direita", points: [p(0.60, 0.54)] },
  { id: "wing_left", label: "asinha esquerda", points: [p(0.39, 0.52)] },
  { id: "ear_left", label: "orelha esquerda", points: [p(0.42, 0.46)] },
  { id: "ear_right", label: "orelha direita", points: [p(0.37, 0.29)] },
]);

const tubaraozinho = mkAnimal("tubaraozinho", tubaraozinhoImg, [
  { id: "belly", label: "barriguinha", points: [p(0.60, 0.67)] },
  { id: "body", label: "corpinho", points: [p(0.45, 0.52)] },
  { id: "head", label: "cabeça", points: [p(0.46, 0.40)] },
  { id: "wing_left", label: "asinha esquerda", points: [p(0.26, 0.61)] },
  { id: "ear_right", label: "orelha direita", points: [p(0.51, 0.16)] },
]);

const caranguejinho = mkAnimal("caranguejinho", caranguejinhoImg, [
  { id: "body", label: "corpinho", points: [p(0.50, 0.52)] },
  { id: "claw_left", label: "garra esquerda", points: [p(0.19, 0.57)] },
  { id: "ear_left", label: "orelha esquerda", points: [p(0.22, 0.26)] },
  { id: "ear_right", label: "orelha direita", points: [p(0.79, 0.26)] },
  { id: "wing_left", label: "asinha esquerda", points: [p(0.23, 0.66)] },
  { id: "tail", label: "rabinho", points: [p(0.76, 0.69)] },
  { id: "wing_right", label: "asinha direita", points: [p(0.80, 0.56)] },
  { id: "head", label: "cabeça", points: [p(0.77, 0.41)] },
]);

const foquinha = mkAnimal("foquinha", foquinhaImg, [
  { id: "belly", label: "barriguinha", points: [p(0.57, 0.68)] },
  { id: "body", label: "corpinho", points: [p(0.32, 0.73)] },
  { id: "head", label: "cabeça", points: [p(0.47, 0.38)] },
  { id: "ear_right", label: "orelha direita", points: [p(0.59, 0.36)] },
  { id: "ear_left", label: "orelha esquerda", points: [p(0.35, 0.35)] },
]);

const rexinho = mkAnimal("rexinho", rexinhoImg, [
  { id: "body", label: "corpinho", points: [p(0.42, 0.65)] },
  { id: "spikes", label: "espinhos", points: [p(0.52, 0.36)] },
  { id: "head", label: "cabeça", points: [p(0.44, 0.46)] },
  { id: "leg_front", label: "perninha da frente", points: [p(0.40, 0.71)] },
  { id: "ear_right", label: "orelha direita", points: [p(0.62, 0.39)] },
  { id: "wing_left", label: "asinha esquerda", points: [p(0.29, 0.54)] },
  { id: "wing_right", label: "asinha direita", points: [p(0.71, 0.48)] },
  { id: "belly", label: "barriguinha", points: [p(0.36, 0.59)] },
]);

const tricerinho = mkAnimal("tricerinho", tricerinhoImg, [
  { id: "body", label: "corpinho", points: [p(0.57, 0.59)] },
  { id: "frill", label: "coroa", points: [p(0.48, 0.32)] },
  { id: "wing_left", label: "asinha esquerda", points: [p(0.30, 0.43)] },
  { id: "wing_right", label: "asinha direita", points: [p(0.81, 0.57)] },
  { id: "leg_front", label: "perninha da frente", points: [p(0.37, 0.70)] },
  { id: "belly", label: "barriguinha", points: [p(0.56, 0.73)] },
  { id: "ear_left", label: "orelha esquerda", points: [p(0.18, 0.32)] },
]);

const brontinho = mkAnimal("brontinho", brontinhoImg, [
  { id: "body", label: "corpinho", points: [p(0.50, 0.75)] },
  { id: "neck", label: "pescoço", points: [p(0.51, 0.38)] },
  { id: "head", label: "cabeça", points: [p(0.47, 0.52)] },
  { id: "leg_front", label: "perninha da frente", points: [p(0.32, 0.72)] },
  { id: "wing_right", label: "asinha direita", points: [p(0.59, 0.41)] },
  { id: "wing_left", label: "asinha esquerda", points: [p(0.43, 0.41)] },
]);

const pterossaurinho = mkAnimal("pterossaurinho", pterossaurinhoImg, [
  { id: "body", label: "corpinho", points: [p(0.45, 0.67)] },
  { id: "wing_right", label: "asinha direita", points: [p(0.53, 0.42)] },
  { id: "belly", label: "barriguinha", points: [p(0.40, 0.59)] },
  { id: "head", label: "cabeça", points: [p(0.38, 0.32)] },
  { id: "wing_left", label: "asinha esquerda", points: [p(0.31, 0.54)] },
]);

const estegossaurinho = mkAnimal("estegossaurinho", estegossaurinhoImg, [
  { id: "body", label: "corpinho", points: [p(0.55, 0.75)] },
  { id: "plates", label: "plates", points: [p(0.48, 0.51)] },
  { id: "head", label: "cabeça", points: [p(0.52, 0.24)] },
  { id: "ear_left", label: "orelha esquerda", points: [p(0.41, 0.26)] },
  { id: "leg_front", label: "perninha da frente", points: [p(0.31, 0.71)] },
  { id: "ear_right", label: "orelha direita", points: [p(0.65, 0.27)] },
  { id: "wing_right", label: "asinha direita", points: [p(0.51, 0.37)] },
  { id: "tail", label: "rabinho", points: [p(0.61, 0.37)] },
]);

const anquilossaurinho = mkAnimal("anquilossaurinho", anquilossaurinhoImg, [
  { id: "armor", label: "armadura", points: [p(0.58, 0.47)] },
  { id: "body", label: "corpinho", points: [p(0.51, 0.72)] },
  { id: "belly", label: "barriguinha", points: [p(0.50, 0.55)] },
  { id: "leg_back", label: "perninha de trás", points: [p(0.57, 0.75)] },
  { id: "head", label: "cabeça", points: [p(0.34, 0.37)] },
  { id: "ear_right", label: "orelha direita", points: [p(0.52, 0.35)] },
  { id: "leg_front", label: "perninha da frente", points: [p(0.32, 0.70)] },
  { id: "ear_left", label: "orelha esquerda", points: [p(0.45, 0.26)] },
]);

const velocirraptorzinho = mkAnimal("velocirraptorzinho", velocirraptorzinhoImg, [
  { id: "belly", label: "barriguinha", points: [p(0.49, 0.82)] },
  { id: "body", label: "corpinho", points: [p(0.51, 0.59)] },
  { id: "head", label: "cabeça", points: [p(0.50, 0.52)] },
  { id: "leg_front", label: "perninha da frente", points: [p(0.39, 0.72)] },
  { id: "ear_right", label: "orelha direita", points: [p(0.50, 0.21)] },
  { id: "ear_left", label: "orelha esquerda", points: [p(0.55, 0.30)] },
  { id: "wing_right", label: "asinha direita", points: [p(0.53, 0.38)] },
  { id: "wing_left", label: "asinha esquerda", points: [p(0.34, 0.40)] },
]);

const parassaurolofinho = mkAnimal("parassaurolofinho", parassaurolofinhoImg, [
  { id: "body", label: "corpinho", points: [p(0.53, 0.73)] },
  { id: "crest", label: "crest", points: [p(0.47, 0.52)] },
  { id: "head", label: "cabeça", points: [p(0.50, 0.34)] },
  { id: "leg_front", label: "perninha da frente", points: [p(0.37, 0.71)] },
]);

const dimetrodonzinho = mkAnimal("dimetrodonzinho", dimetrodonzinhoImg, [
  { id: "body", label: "corpinho", points: [p(0.59, 0.62)] },
  { id: "sail", label: "vela", points: [p(0.57, 0.35)] },
  { id: "wing_left", label: "asinha esquerda", points: [p(0.31, 0.44)] },
  { id: "leg_front", label: "perninha da frente", points: [p(0.37, 0.73)] },
  { id: "belly", label: "barriguinha", points: [p(0.40, 0.65)] },
  { id: "wing_right", label: "asinha direita", points: [p(0.61, 0.48)] },
  { id: "head", label: "cabeça", points: [p(0.50, 0.47)] },
  { id: "ear_left", label: "orelha esquerda", points: [p(0.34, 0.38)] },
]);

const hamster = mkAnimal("hamster", hamsterImg, [
  { id: "belly", label: "barriguinha", points: [p(0.53, 0.70)] },
  { id: "body", label: "corpinho", points: [p(0.48, 0.58)] },
  { id: "head", label: "cabeça", points: [p(0.50, 0.34)] },
  { id: "wing_left", label: "asinha esquerda", points: [p(0.36, 0.59)] },
  { id: "leg_front", label: "perninha da frente", points: [p(0.37, 0.82)] },
  { id: "leg_back", label: "perninha de trás", points: [p(0.63, 0.82)] },
  { id: "wing_right", label: "asinha direita", points: [p(0.51, 0.43)] },
]);

const vaquinha = mkAnimal("vaquinha", vaquinhaImg, [
  { id: "body", label: "corpinho", points: [p(0.50, 0.71)] },
  { id: "spots", label: "manchinhas", points: [p(0.37, 0.63)] },
  { id: "head", label: "cabeça", points: [p(0.50, 0.35)] },
  { id: "foot_left", label: "patinha esquerda", points: [p(0.31, 0.79)] },
  { id: "leg_back", label: "perninha de trás", points: [p(0.71, 0.79)] },
  { id: "leg_front", label: "perninha da frente", points: [p(0.41, 0.85)] },
  { id: "foot_right", label: "patinha direita", points: [p(0.60, 0.85)] },
  { id: "ear_right", label: "orelha direita", points: [p(0.67, 0.17)] },
]);

const ovelhinha = mkAnimal("ovelhinha", ovelhinhaImg, [
  { id: "head", label: "cabeça", points: [p(0.51, 0.34)] },
  { id: "wool", label: "lã", points: [p(0.51, 0.66)] },
  { id: "ear_left", label: "orelha esquerda", points: [p(0.50, 0.14)] },
  { id: "leg_back", label: "perninha de trás", points: [p(0.69, 0.78)] },
  { id: "foot_left", label: "patinha esquerda", points: [p(0.32, 0.78)] },
  { id: "ear_right", label: "orelha direita", points: [p(0.73, 0.21)] },
  { id: "wing_left", label: "asinha esquerda", points: [p(0.27, 0.23)] },
  { id: "leg_front", label: "perninha da frente", points: [p(0.41, 0.90)] },
]);

const galinha = mkAnimal("galinha", galinhaImg, [
  { id: "body", label: "corpinho", points: [p(0.51, 0.62)] },
  { id: "comb", label: "cristinha", points: [p(0.50, 0.15)] },
  { id: "head", label: "cabeça", points: [p(0.51, 0.34)] },
  { id: "foot_right", label: "patinha direita", points: [p(0.59, 0.89)] },
  { id: "leg_front", label: "perninha da frente", points: [p(0.42, 0.89)] },
  { id: "ear_right", label: "orelha direita", points: [p(0.51, 0.38)] },
]);

const cavalinho = mkAnimal("cavalinho", cavalinhoImg, [
  { id: "body", label: "corpinho", points: [p(0.55, 0.73)] },
  { id: "mane", label: "juba", points: [p(0.38, 0.32)] },
  { id: "head", label: "cabeça", points: [p(0.48, 0.50)] },
  { id: "ear_right", label: "orelha direita", points: [p(0.53, 0.26)] },
  { id: "ear_left", label: "orelha esquerda", points: [p(0.29, 0.18)] },
  { id: "wing_right", label: "asinha direita", points: [p(0.78, 0.51)] },
  { id: "leg_front", label: "perninha da frente", points: [p(0.41, 0.75)] },
  { id: "belly", label: "barriguinha", points: [p(0.60, 0.73)] },
]);

const cabrita = mkAnimal("cabrita", cabritaImg, [
  { id: "body", label: "corpinho", points: [p(0.49, 0.69)] },
  { id: "horns", label: "horns", points: [p(0.50, 0.38)] },
  { id: "leg_back", label: "perninha de trás", points: [p(0.68, 0.74)] },
  { id: "belly", label: "barriguinha", points: [p(0.49, 0.77)] },
  { id: "foot_left", label: "patinha esquerda", points: [p(0.31, 0.74)] },
  { id: "leg_front", label: "perninha da frente", points: [p(0.31, 0.82)] },
  { id: "foot_right", label: "patinha direita", points: [p(0.68, 0.82)] },
  { id: "ear_left", label: "orelha esquerda", points: [p(0.34, 0.18)] },
]);

const papagainho = mkAnimal("papagainho", papagainhoImg, [
  { id: "body", label: "corpinho", points: [p(0.49, 0.76)] },
  { id: "wing_left", label: "asinha esquerda", points: [p(0.32, 0.57)] },
  { id: "head", label: "cabeça", points: [p(0.49, 0.44)] },
  { id: "wing_right", label: "asinha direita", points: [p(0.67, 0.59)] },
  { id: "ear_left", label: "orelha esquerda", points: [p(0.47, 0.41)] },
  { id: "leg_back", label: "perninha de trás", points: [p(0.66, 0.79)] },
  { id: "foot_right", label: "patinha direita", points: [p(0.69, 0.75)] },
  { id: "leg_front", label: "perninha da frente", points: [p(0.33, 0.67)] },
]);

const pinguinzinho = mkAnimal("pinguinzinho", pinguinzinhoImg, [
  { id: "belly", label: "barriguinha", points: [p(0.51, 0.64)] },
  { id: "body", label: "corpinho", points: [p(0.40, 0.83)] },
  { id: "head", label: "cabeça", points: [p(0.51, 0.41)] },
  { id: "ear_right", label: "orelha direita", points: [p(0.51, 0.33)] },
  { id: "leg_back", label: "perninha de trás", points: [p(0.61, 0.83)] },
  { id: "ear_left", label: "orelha esquerda", points: [p(0.51, 0.33)] },
]);

const tucaninho = mkAnimal("tucaninho", tucaninhoImg, [
  { id: "beak", label: "biquinho", points: [p(0.49, 0.35)] },
  { id: "body", label: "corpinho", points: [p(0.49, 0.66)] },
  { id: "wing_left", label: "asinha esquerda", points: [p(0.25, 0.42)] },
  { id: "wing_right", label: "asinha direita", points: [p(0.64, 0.60)] },
  { id: "head", label: "cabeça", points: [p(0.31, 0.49)] },
  { id: "tail", label: "rabinho", points: [p(0.82, 0.79)] },
  { id: "leg_back", label: "perninha de trás", points: [p(0.79, 0.81)] },
  { id: "foot_right", label: "patinha direita", points: [p(0.73, 0.81)] },
]);

const flamingozinho = mkAnimal("flamingozinho", flamingozinhoImg, [
  { id: "body", label: "corpinho", points: [p(0.41, 0.72)] },
  { id: "leg_left", label: "perninha esquerda", points: [p(0.50, 0.78)] },
  { id: "head", label: "cabeça", points: [p(0.45, 0.39)] },
  { id: "ear_left", label: "orelha esquerda", points: [p(0.27, 0.18)] },
  { id: "wing_left", label: "asinha esquerda", points: [p(0.28, 0.21)] },
]);

const borboletinha = mkAnimal("borboletinha", borboletinhaImg, [
  { id: "body", label: "corpinho", points: [p(0.50, 0.63)] },
  { id: "wing_left", label: "asinha esquerda", points: [p(0.22, 0.52)] },
  { id: "ear_right", label: "orelha direita", points: [p(0.73, 0.32)] },
  { id: "ear_left", label: "orelha esquerda", points: [p(0.27, 0.32)] },
  { id: "leg_front", label: "perninha da frente", points: [p(0.33, 0.68)] },
  { id: "leg_back", label: "perninha de trás", points: [p(0.67, 0.68)] },
  { id: "head", label: "cabeça", points: [p(0.29, 0.47)] },
  { id: "wing_right", label: "asinha direita", points: [p(0.71, 0.47)] },
]);

const joaninha = mkAnimal("joaninha", joaninhaImg, [
  { id: "body", label: "corpinho", points: [p(0.63, 0.63)] },
  { id: "head", label: "cabeça", points: [p(0.50, 0.22)] },
  { id: "belly", label: "barriguinha", points: [p(0.50, 0.52)] },
  { id: "wing_left", label: "asinha esquerda", points: [p(0.37, 0.49)] },
  { id: "wing_right", label: "asinha direita", points: [p(0.63, 0.49)] },
  { id: "ear_left", label: "orelha esquerda", points: [p(0.42, 0.36)] },
  { id: "ear_right", label: "orelha direita", points: [p(0.58, 0.36)] },
  { id: "leg_front", label: "perninha da frente", points: [p(0.36, 0.63)] },
]);

const abelhinha = mkAnimal("abelhinha", abelhinhaImg, [
  { id: "body", label: "corpinho", points: [p(0.53, 0.67)] },
  { id: "stripes", label: "listras", points: [p(0.46, 0.55)] },
  { id: "wing_left", label: "asinha esquerda", points: [p(0.28, 0.41)] },
  { id: "wing_right", label: "asinha direita", points: [p(0.62, 0.47)] },
  { id: "head", label: "cabeça", points: [p(0.58, 0.27)] },
  { id: "belly", label: "barriguinha", points: [p(0.39, 0.53)] },
  { id: "leg_back", label: "perninha de trás", points: [p(0.63, 0.68)] },
  { id: "tail", label: "rabinho", points: [p(0.74, 0.59)] },
]);

const formiguinha = mkAnimal("formiguinha", formiguinhaImg, [
  { id: "body", label: "corpinho", points: [p(0.50, 0.61)] },
  { id: "head", label: "cabeça", points: [p(0.52, 0.32)] },
  { id: "wing_left", label: "asinha esquerda", points: [p(0.25, 0.44)] },
  { id: "belly", label: "barriguinha", points: [p(0.50, 0.50)] },
  { id: "wing_right", label: "asinha direita", points: [p(0.59, 0.47)] },
  { id: "ear_right", label: "orelha direita", points: [p(0.57, 0.35)] },
  { id: "ear_left", label: "orelha esquerda", points: [p(0.41, 0.48)] },
  { id: "tail", label: "rabinho", points: [p(0.67, 0.47)] },
]);

const aranhinha = mkAnimal("aranhinha", aranhinhaImg, [
  { id: "body", label: "corpinho", points: [p(0.50, 0.46)] },
  { id: "leg_l1", label: "leg_l1", points: [p(0.38, 0.46)] },
  { id: "wing_right", label: "asinha direita", points: [p(0.83, 0.52)] },
  { id: "wing_left", label: "asinha esquerda", points: [p(0.17, 0.52)] },
  { id: "tail", label: "rabinho", points: [p(0.83, 0.42)] },
  { id: "ear_left", label: "orelha esquerda", points: [p(0.17, 0.41)] },
  { id: "foot_left", label: "patinha esquerda", points: [p(0.21, 0.58)] },
  { id: "leg_front", label: "perninha da frente", points: [p(0.21, 0.73)] },
]);

const libelulinha = mkAnimal("libelulinha", libelulinhaImg, [
  { id: "body", label: "corpinho", points: [p(0.51, 0.63)] },
  { id: "wing_left", label: "asinha esquerda", points: [p(0.18, 0.39)] },
  { id: "ear_left", label: "orelha esquerda", points: [p(0.29, 0.30)] },
  { id: "ear_right", label: "orelha direita", points: [p(0.71, 0.29)] },
  { id: "head", label: "cabeça", points: [p(0.30, 0.47)] },
  { id: "wing_right", label: "asinha direita", points: [p(0.69, 0.47)] },
  { id: "tail", label: "rabinho", points: [p(0.81, 0.39)] },
  { id: "belly", label: "barriguinha", points: [p(0.37, 0.65)] },
]);

export const ANIMALS: Record<ThemeId, AnimalDef> = {
  cachorrinho, gatinho, coelhinho, passarinho, patinho, porquinho, ursinho, raposinha, corujinha, macaquinho, leaozinho, elefantinho, girafinha, zebrinha, tigrinho, pandinha, esquilinho, cangurzinho, peixinho, tartaruguinha, baleinha, golfinho, polvinho, cavalinho_marinho: cavalinhoMarinho, tubaraozinho, caranguejinho, foquinha, rexinho, tricerinho, brontinho, pterossaurinho, estegossaurinho, anquilossaurinho, velocirraptorzinho, parassaurolofinho, dimetrodonzinho, hamster, vaquinha, ovelhinha, galinha, cavalinho, cabrita, papagainho, pinguinzinho, tucaninho, flamingozinho, borboletinha, joaninha, abelhinha, formiguinha, aranhinha, libelulinha,
};

export const getAnimal = (id: ThemeId) => ANIMALS[id];
