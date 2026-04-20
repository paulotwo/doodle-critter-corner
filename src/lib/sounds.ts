// Sons leves gerados via WebAudio (sem dependência de arquivos)
let ctx: AudioContext | null = null;
const getCtx = () => {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    try {
      ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch {
      ctx = null;
    }
  }
  return ctx;
};

const tone = (freq: number, dur = 0.12, type: OscillatorType = "sine", gain = 0.08) => {
  const c = getCtx();
  if (!c) return;
  // Mobile/iOS keeps the context "suspended" until resumed under a gesture.
  // Without this, oscillators pile up and the audio thread hangs the UI.
  if (c.state === "suspended") {
    c.resume().catch(() => { /* ignore */ });
  }
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.value = gain;
  g.gain.setValueAtTime(gain, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
  osc.connect(g).connect(c.destination);
  osc.start();
  osc.stop(c.currentTime + dur);
};

export const playClick = () => tone(520, 0.08, "triangle", 0.06);
export const playStamp = () => {
  tone(660, 0.07, "triangle", 0.06);
  setTimeout(() => tone(880, 0.08, "triangle", 0.05), 60);
};
export const playSuccess = () => {
  const notes = [523, 659, 784, 1046];
  notes.forEach((n, i) => setTimeout(() => tone(n, 0.18, "triangle", 0.08), i * 110));
};
export const playEncourage = () => {
  tone(440, 0.12, "sine", 0.06);
  setTimeout(() => tone(587, 0.12, "sine", 0.06), 120);
};

import { speechFriendly } from "./speech";

// Idioma global (pode ser atualizado pelo I18nProvider).
let currentLang = "pt-BR";
export const setSpeechLang = (lang: string) => {
  currentLang = lang;
};

// Fila sequencial para evitar sobreposição de falas (ex.: "Uau" + "Você conseguiu").
type QueuedSpeech = { text: string; lang: string };
const speechQueue: QueuedSpeech[] = [];
let speaking = false;

const playNext = () => {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const next = speechQueue.shift();
  if (!next) {
    speaking = false;
    return;
  }
  speaking = true;
  try {
    const friendly = next.lang.startsWith("pt") ? speechFriendly(next.text) : next.text;
    const u = new SpeechSynthesisUtterance(friendly);
    u.lang = next.lang;
    u.rate = 0.95;
    u.pitch = 1.2;
    const done = () => {
      // pequeno respiro entre falas
      setTimeout(playNext, 120);
    };
    u.onend = done;
    u.onerror = done;
    window.speechSynthesis.speak(u);
  } catch {
    speaking = false;
  }
};

export const speak = (text: string, options?: { interrupt?: boolean; lang?: string }) => {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  try {
    if (options?.interrupt) {
      speechQueue.length = 0;
      window.speechSynthesis.cancel();
      speaking = false;
    }
    speechQueue.push({ text, lang: options?.lang ?? currentLang });
    if (!speaking && !window.speechSynthesis.speaking) {
      playNext();
    }
  } catch {
    /* ignore */
  }
};

export const cancelSpeech = () => {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  speechQueue.length = 0;
  speaking = false;
  try { window.speechSynthesis.cancel(); } catch { /* ignore */ }
};
