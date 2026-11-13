import { useEffect, useRef } from "react";
import { App } from "@capacitor/app";
import { isNative } from "@/lib/platform";
import { cancelSpeech } from "@/lib/sounds";

/**
 * Comportamento de app Android (não faz nada no site): o botão voltar chama
 * `onBack` e a narração se cala quando o app vai para segundo plano.
 */
export function useNativeApp(onBack: () => void): void {
  const onBackRef = useRef(onBack);
  onBackRef.current = onBack;

  useEffect(() => {
    if (!isNative) return;
    const listeners = [
      App.addListener("backButton", () => onBackRef.current()),
      App.addListener("appStateChange", ({ isActive }) => {
        if (!isActive) cancelSpeech();
      }),
    ];
    return () => listeners.forEach((l) => l.then((handle) => handle.remove()));
  }, []);
}
