// Sons leves gerados via WebAudio (sem dependência de arquivos)
let ctx: AudioContext | null = null;
const getCtx = () => {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    try {
      ctx = new (
        window.AudioContext ||
        (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      )();
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
    c.resume().catch(() => {
      /* ignore */
    });
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

import { TextToSpeech } from "@capacitor-community/text-to-speech";
import { isNative } from "./platform";
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
const NATIVE_SPEECH_TIMEOUT_MS = 15000;
// Muda a cada cancelamento: o fim de uma fala cancelada não puxa a fila.
let generation = 0;

// No app (Capacitor) o WebView do Android não implementa `speechSynthesis`:
// a narração sai pelo TTS do sistema.
const canSpeak = () => isNative || (typeof window !== "undefined" && "speechSynthesis" in window);

const stopEngine = () => {
  generation++;
  speaking = false;
  try {
    if (isNative)
      TextToSpeech.stop().catch(() => {
        /* ignore */
      });
    else window.speechSynthesis.cancel();
  } catch {
    /* ignore */
  }
};

const playNext = () => {
  if (!canSpeak()) return;
  const next = speechQueue.shift();
  if (!next) {
    speaking = false;
    return;
  }
  speaking = true;
  const mine = generation;
  let finished = false;
  const done = () => {
    if (finished || mine !== generation) return;
    finished = true;
    // pequeno respiro entre falas
    setTimeout(() => {
      if (mine === generation) playNext();
    }, 120);
  };
  try {
    const friendly = next.lang.startsWith("pt") ? speechFriendly(next.text) : next.text;
    if (isNative) {
      // Sem motor de TTS ou sem voz do idioma a promessa rejeita: segue a fila em silêncio.
      TextToSpeech.speak({ text: friendly, lang: next.lang, rate: 0.95, pitch: 1.2 }).then(
        done,
        done,
      );
      // Um motor que não responde não pode prender a fila.
      setTimeout(done, NATIVE_SPEECH_TIMEOUT_MS);
      return;
    }
    const u = new SpeechSynthesisUtterance(friendly);
    u.lang = next.lang;
    u.rate = 0.95;
    u.pitch = 1.2;
    u.onend = done;
    u.onerror = done;
    window.speechSynthesis.speak(u);
  } catch {
    speaking = false;
  }
};

export const speak = (text: string, options?: { interrupt?: boolean; lang?: string }) => {
  if (!canSpeak()) return;
  try {
    if (options?.interrupt) {
      speechQueue.length = 0;
      stopEngine();
    }
    speechQueue.push({ text, lang: options?.lang ?? currentLang });
    // Depois de interromper, alguns navegadores ainda reportam `speaking` por um instante.
    if (!speaking && (isNative || options?.interrupt || !window.speechSynthesis.speaking)) {
      playNext();
    }
  } catch {
    /* ignore */
  }
};

export const cancelSpeech = () => {
  if (!canSpeak()) return;
  speechQueue.length = 0;
  stopEngine();
};

// Acorda o motor de TTS cedo, para já estar conectado na primeira narração.
if (isNative)
  TextToSpeech.getSupportedLanguages().catch(() => {
    /* ignore */
  });
