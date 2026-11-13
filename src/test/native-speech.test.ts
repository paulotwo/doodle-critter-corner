import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// No app (Capacitor) o WebView não tem speechSynthesis: a narração sai pelo
// TTS do sistema. O plugin nativo não existe no jsdom, então é simulado.
const tts = vi.hoisted(() => ({
  speak: vi.fn(),
  stop: vi.fn(),
  getSupportedLanguages: vi.fn(),
}));
vi.mock("@/lib/platform", () => ({ isNative: true }));
vi.mock("@capacitor-community/text-to-speech", () => ({ TextToSpeech: tts }));

type Pending = { resolve: () => void; reject: (e: unknown) => void };
let pending: Pending[];
let sounds: typeof import("@/lib/sounds");

beforeEach(async () => {
  vi.useFakeTimers();
  vi.resetModules();
  pending = [];
  tts.speak
    .mockReset()
    .mockImplementation(
      () => new Promise<void>((resolve, reject) => pending.push({ resolve, reject })),
    );
  tts.stop.mockReset().mockResolvedValue(undefined);
  tts.getSupportedLanguages.mockReset().mockResolvedValue({ languages: [] });
  sounds = await import("@/lib/sounds");
});
afterEach(() => vi.useRealTimers());

const spoken = () => tts.speak.mock.calls.map((c) => c[0].text);

describe("narração no app nativo", () => {
  it("fala pelo TTS do sistema, no idioma pedido e com o texto amigável", () => {
    sounds.speak("Coloque 2 flores", { lang: "pt-BR" });
    expect(tts.speak).toHaveBeenCalledWith({
      text: "Coloque duas flores",
      lang: "pt-BR",
      rate: 0.95,
      pitch: 1.2,
    });
  });

  it("usa o idioma global quando nenhum é pedido", () => {
    sounds.setSpeechLang("de-DE");
    sounds.speak("Hallo");
    expect(tts.speak.mock.calls[0][0].lang).toBe("de-DE");
  });

  it("a segunda fala espera a primeira terminar", async () => {
    sounds.speak("Uau");
    sounds.speak("Muito bem");
    expect(spoken()).toEqual(["Uau"]);
    pending[0].resolve();
    await vi.advanceTimersByTimeAsync(200);
    expect(spoken()).toEqual(["Uau", "Muito bem"]);
  });

  it("uma fala que falha (sem motor ou sem voz) não trava a fila", async () => {
    sounds.speak("Uau");
    sounds.speak("Muito bem");
    pending[0].reject(new Error("no engine"));
    await vi.advanceTimersByTimeAsync(200);
    expect(spoken()).toEqual(["Uau", "Muito bem"]);
  });

  it("cancelSpeech para a fala e descarta a fila", async () => {
    sounds.speak("Uau");
    sounds.speak("Muito bem");
    sounds.cancelSpeech();
    expect(tts.stop).toHaveBeenCalled();
    pending[0].reject(new Error("interrupted"));
    await vi.advanceTimersByTimeAsync(200);
    expect(spoken()).toEqual(["Uau"]);
  });

  it("depois de cancelar, uma fala nova toca uma vez só", async () => {
    sounds.speak("Uau");
    sounds.cancelSpeech();
    sounds.speak("Pinte o corpinho");
    pending[0].reject(new Error("interrupted"));
    await vi.advanceTimersByTimeAsync(200);
    expect(spoken()).toEqual(["Uau", "Pinte o corpinho"]);
  });

  it("interrupt para a fala atual e fala a nova na hora", () => {
    sounds.speak("Uau");
    sounds.speak("Muito bem");
    sounds.speak("Agora", { interrupt: true });
    expect(tts.stop).toHaveBeenCalled();
    expect(spoken()).toEqual(["Uau", "Agora"]);
  });

  it("um motor de TTS que nunca responde não prende a fila para sempre", async () => {
    sounds.speak("Uau");
    sounds.speak("Muito bem");
    await vi.advanceTimersByTimeAsync(20000);
    expect(spoken()).toEqual(["Uau", "Muito bem"]);
  });
});
