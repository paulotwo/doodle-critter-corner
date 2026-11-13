import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";

// Simula o plugin @capacitor/app (não existe no jsdom) e liga/desliga o modo app.
const platform = vi.hoisted(() => ({ isNative: true }));
const app = vi.hoisted(() => ({ addListener: vi.fn(), exitApp: vi.fn() }));
const sounds = vi.hoisted(() => ({ cancelSpeech: vi.fn() }));
vi.mock("@/lib/platform", () => platform);
vi.mock("@capacitor/app", () => ({ App: app }));
vi.mock("@/lib/sounds", () => sounds);

import { useNativeApp } from "@/hooks/use-native-app";
import { requestAppFullscreen } from "@/lib/fullscreen";

type Handler = (event?: unknown) => void;
let handlers: Record<string, Handler>;
let removes: Record<string, ReturnType<typeof vi.fn>>;

beforeEach(() => {
  platform.isNative = true;
  handlers = {};
  removes = {};
  sounds.cancelSpeech.mockReset();
  app.addListener.mockReset().mockImplementation((name: string, handler: Handler) => {
    handlers[name] = handler;
    removes[name] = vi.fn();
    return Promise.resolve({ remove: removes[name] });
  });
});

describe("useNativeApp", () => {
  it("o botão voltar do Android chama o onBack mais recente", () => {
    const first = vi.fn();
    const second = vi.fn();
    const { rerender } = renderHook(({ onBack }) => useNativeApp(onBack), {
      initialProps: { onBack: first },
    });
    rerender({ onBack: second });
    handlers.backButton();
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(1);
    expect(app.addListener).toHaveBeenCalledTimes(2);
  });

  it("cala a narração quando o app vai para segundo plano", () => {
    renderHook(() => useNativeApp(() => {}));
    handlers.appStateChange({ isActive: true });
    expect(sounds.cancelSpeech).not.toHaveBeenCalled();
    handlers.appStateChange({ isActive: false });
    expect(sounds.cancelSpeech).toHaveBeenCalledTimes(1);
  });

  it("remove os ouvintes ao desmontar", async () => {
    const { unmount } = renderHook(() => useNativeApp(() => {}));
    unmount();
    await Promise.resolve();
    expect(removes.backButton).toHaveBeenCalled();
    expect(removes.appStateChange).toHaveBeenCalled();
  });

  it("no site não registra nada", () => {
    platform.isNative = false;
    renderHook(() => useNativeApp(() => {}));
    expect(app.addListener).not.toHaveBeenCalled();
  });
});

describe("tela cheia", () => {
  it("no app não pede tela cheia ao navegador (a casca já cuida disso)", async () => {
    const request = vi.fn().mockResolvedValue(undefined);
    document.documentElement.requestFullscreen = request;
    await requestAppFullscreen();
    expect(request).not.toHaveBeenCalled();
    platform.isNative = false;
    await requestAppFullscreen();
    expect(request).toHaveBeenCalledTimes(1);
  });
});
