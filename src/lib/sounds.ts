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

export const speak = (text: string) => {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "pt-BR";
    u.rate = 0.95;
    u.pitch = 1.2;
    window.speechSynthesis.speak(u);
  } catch {
    /* ignore */
  }
};
