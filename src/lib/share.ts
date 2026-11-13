// Compartilhar pela folha nativa do Android (só usado no app Capacitor).
import { Directory, Filesystem } from "@capacitor/filesystem";
import { Share } from "@capacitor/share";

/** No app, `window.location` é https://localhost: o link a divulgar é o do site. */
export const SITE_URL = "https://doodle-critter-corner.ksepisteme.com.br/";

type ShareText = { title: string; text: string };

export async function shareLinkNative(data: ShareText): Promise<void> {
  try {
    await Share.share({ ...data, url: SITE_URL });
  } catch {
    /* cancelado pelo usuário */
  }
}

/** Grava a pintura no cache do app e a entrega à folha de compartilhar. */
export async function shareImageNative(
  dataUrl: string,
  fileName: string,
  data: ShareText,
): Promise<void> {
  try {
    const { uri } = await Filesystem.writeFile({
      path: fileName,
      data: dataUrl.slice(dataUrl.indexOf(",") + 1),
      directory: Directory.Cache,
    });
    await Share.share({ ...data, files: [uri] });
  } catch {
    /* cancelado pelo usuário ou sem espaço para gravar */
  }
}
