// Compartilhar pela folha nativa do Android (só usado no app Capacitor).
import { Directory, Filesystem } from "@capacitor/filesystem";
import { Share } from "@capacitor/share";

/** No app, `window.location` é https://localhost: o link a divulgar é o do site. */
export const SITE_URL = "https://doodle-critter-corner.ksepisteme.com.br/";

type ShareText = { title: string; text: string };

/** Fechar a folha sem escolher nada rejeita a promessa, mas não é uma falha. */
const cancelled = (err: unknown) => /cancel/i.test(String((err as Error)?.message ?? err));

/** Devolve `false` só quando não deu para compartilhar (cancelar conta como `true`). */
export async function shareLinkNative(data: ShareText): Promise<boolean> {
  try {
    await Share.share({ ...data, url: SITE_URL });
    return true;
  } catch (err) {
    return cancelled(err);
  }
}

/**
 * Grava a pintura no cache do app e a entrega à folha de compartilhar.
 * Devolve `false` só quando não deu para gravar ou compartilhar.
 */
export async function shareImageNative(
  dataUrl: string,
  fileName: string,
  data: ShareText,
): Promise<boolean> {
  try {
    const { uri } = await Filesystem.writeFile({
      path: fileName,
      data: dataUrl.slice(dataUrl.indexOf(",") + 1),
      directory: Directory.Cache,
    });
    await Share.share({ ...data, files: [uri] });
    return true;
  } catch (err) {
    return cancelled(err);
  }
}
