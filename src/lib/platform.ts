import { Capacitor } from "@capacitor/core";

/** true dentro do app Capacitor (Android/iOS); false no site e no PWA. */
export const isNative = Capacitor.isNativePlatform();
