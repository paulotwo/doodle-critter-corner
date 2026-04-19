/**
 * Fullscreen helpers. Skips when running as installed PWA (standalone)
 * because the OS already provides a fullscreen-like experience.
 */
export const isStandalonePwa = (): boolean => {
  if (typeof window === "undefined") return false;
  const mql = window.matchMedia?.("(display-mode: standalone)");
  // iOS Safari uses navigator.standalone
  // @ts-expect-error legacy iOS api
  const iosStandalone = !!window.navigator?.standalone;
  return !!(mql?.matches || iosStandalone);
};

export const lockPortraitOrientation = async (): Promise<void> => {
  try {
    const orientation = (screen as Screen & {
      orientation?: { lock?: (o: string) => Promise<void> };
    }).orientation;
    await orientation?.lock?.("portrait");
  } catch {
    /* unsupported (iOS Safari, desktop) or not in fullscreen */
  }
};

export const requestAppFullscreen = async (): Promise<void> => {
  if (isStandalonePwa()) {
    // Already fullscreen via PWA — still try to lock orientation
    await lockPortraitOrientation();
    return;
  }
  const el = document.documentElement as HTMLElement & {
    webkitRequestFullscreen?: () => Promise<void>;
  };
  try {
    if (el.requestFullscreen) await el.requestFullscreen();
    else if (el.webkitRequestFullscreen) await el.webkitRequestFullscreen();
  } catch {
    /* user denied or unsupported */
  }
  // Orientation lock requires fullscreen on most browsers
  await lockPortraitOrientation();
};
