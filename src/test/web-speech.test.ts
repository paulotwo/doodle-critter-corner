import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Narração no site (Web Speech API). O jsdom não a implementa: simulada aqui,
// imitando navegadores que ainda reportam `speaking` logo depois de `cancel()`.
vi.mock("@/lib/platform", () => ({ isNative: false }));

class Utterance {
  lang = "";
  rate = 1;
  pitch = 1;
  onend: (() => void) | null = null;
  onerror: (() => void) | null = null;
  constructor(public text: string) {}
}

let spoken: Utterance[];
let sounds: typeof import("@/lib/sounds");

beforeEach(async () => {
  vi.useFakeTimers();
  vi.resetModules();
  spoken = [];
  vi.stubGlobal("SpeechSynthesisUtterance", Utterance);
  const synth = {
    speaking: false,
    speak: (u: Utterance) => {
      spoken.push(u);
      synth.speaking = true;
    },
    // `speaking` continua true; a fala cancelada dispara onerror depois.
    cancel: () => {
      const current = spoken[spoken.length - 1];
      setTimeout(() => current?.onerror?.(), 0);
    },
  };
  Object.defineProperty(window, "speechSynthesis", { value: synth, configurable: true });
  sounds = await import("@/lib/sounds");
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("narração no site", () => {
  it("interrupt fala a nova frase mesmo se o navegador ainda reporta a anterior", async () => {
    sounds.speak("Uau");
    sounds.speak("Agora", { interrupt: true });
    await vi.advanceTimersByTimeAsync(500);
    expect(spoken.map((u) => u.text)).toEqual(["Uau", "Agora"]);
  });

  it("falas seguidas saem em ordem, uma depois da outra", async () => {
    sounds.speak("Uau");
    sounds.speak("Muito bem");
    expect(spoken.map((u) => u.text)).toEqual(["Uau"]);
    spoken[0].onend?.();
    await vi.advanceTimersByTimeAsync(200);
    expect(spoken.map((u) => u.text)).toEqual(["Uau", "Muito bem"]);
  });
});
