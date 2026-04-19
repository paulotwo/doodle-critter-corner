import { describe, it, expect } from "vitest";
import { speechFriendly } from "@/lib/speech";

describe("speechFriendly pt-BR gender/number", () => {
  it("femininos viram 'duas/três ...'", () => {
    expect(speechFriendly("Coloque 2 flores")).toBe("Coloque duas flores");
    expect(speechFriendly("Coloque 3 cenouras")).toBe("Coloque três cenouras");
    expect(speechFriendly("Coloque 2 estrelas do mar")).toBe("Coloque duas estrelas do mar");
    expect(speechFriendly("Coloque 2 patinhas")).toBe("Coloque duas patinhas");
    expect(speechFriendly("Coloque 3 folhas")).toBe("Coloque três folhas");
  });
  it("masculinos viram 'dois/três ...'", () => {
    expect(speechFriendly("Coloque 3 ossinhos")).toBe("Coloque três ossinhos");
    expect(speechFriendly("Coloque 3 sóis")).toBe("Coloque três sóis");
    expect(speechFriendly("Coloque 2 novelos de lã")).toBe("Coloque dois novelos de lã");
  });
  it("'Use 3 cores' fica feminino", () => {
    expect(speechFriendly("Use 3 cores diferentes")).toBe("Use três cores diferentes");
  });
  it("não altera texto sem números reconhecidos", () => {
    expect(speechFriendly("Pinte o corpinho de azul")).toBe("Pinte o corpinho de azul");
  });
});
