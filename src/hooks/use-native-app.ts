import { useEffect, useRef } from "react";
import { App } from "@capacitor/app";
import { isNative } from "@/lib/platform";
import { cancelSpeech } from "@/lib/sounds";

// Popups abertos, do mais antigo ao mais recente: o botão voltar fecha o último.
const backHandlers: Array<{ current: () => void }> = [];

/**
 * Enquanto `active`, o botão voltar do Android chama `handler` (fechar um
 * popup) em vez de navegar. Não faz nada no site.
 */
export function useBackHandler(active: boolean, handler: () => void): void {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    if (!isNative || !active) return;
    backHandlers.push(handlerRef);
    return () => {
      const i = backHandlers.indexOf(handlerRef);
      if (i >= 0) backHandlers.splice(i, 1);
    };
  }, [active]);
}

/**
 * Comportamento de app Android (não faz nada no site): o botão voltar fecha o
 * popup aberto ou, sem popup, chama `onBack`; a narração se cala quando o app
 * vai para segundo plano.
 */
export function useNativeApp(onBack: () => void): void {
  const onBackRef = useRef(onBack);
  onBackRef.current = onBack;

  useEffect(() => {
    if (!isNative) return;
    const listeners = [
      App.addListener("backButton", () => {
        const popup = backHandlers[backHandlers.length - 1];
        if (popup) popup.current();
        else onBackRef.current();
      }),
      App.addListener("appStateChange", ({ isActive }) => {
        if (!isActive) cancelSpeech();
      }),
    ];
    return () => listeners.forEach((l) => l.then((handle) => handle.remove()));
  }, []);
}
