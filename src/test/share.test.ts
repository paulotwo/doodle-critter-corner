import { describe, it, expect, vi, beforeEach } from "vitest";

// Plugins nativos não existem no jsdom: simulados.
const share = vi.hoisted(() => ({ share: vi.fn() }));
const filesystem = vi.hoisted(() => ({ writeFile: vi.fn() }));
vi.mock("@capacitor/share", () => ({ Share: share }));
vi.mock("@capacitor/filesystem", () => ({ Filesystem: filesystem, Directory: { Cache: "CACHE" } }));

import { SITE_URL, shareImageNative, shareLinkNative } from "@/lib/share";

beforeEach(() => {
  share.share.mockReset().mockResolvedValue({});
  filesystem.writeFile.mockReset().mockResolvedValue({ uri: "file:///cache/leaozinho-1.png" });
});

describe("compartilhar no app nativo", () => {
  it("o link compartilhado é o do site, não o endereço interno do app", async () => {
    await shareLinkNative({ title: "Título", text: "Texto" });
    expect(SITE_URL).toBe("https://doodle-critter-corner.ksepisteme.com.br/");
    expect(share.share).toHaveBeenCalledWith({ title: "Título", text: "Texto", url: SITE_URL });
  });

  it("a pintura é gravada no cache sem o prefixo data: e vai como arquivo", async () => {
    await shareImageNative("data:image/png;base64,QUJD", "leaozinho-1.png", {
      title: "T",
      text: "X",
    });
    expect(filesystem.writeFile).toHaveBeenCalledWith({
      path: "leaozinho-1.png",
      data: "QUJD",
      directory: "CACHE",
    });
    expect(share.share).toHaveBeenCalledWith({
      title: "T",
      text: "X",
      files: ["file:///cache/leaozinho-1.png"],
    });
  });

  it("cancelar a folha de compartilhar não gera erro", async () => {
    share.share.mockRejectedValue(new Error("Share canceled"));
    await expect(shareLinkNative({ title: "T", text: "X" })).resolves.toBeUndefined();
    await expect(
      shareImageNative("data:image/png;base64,QUJD", "a.png", { title: "T", text: "X" }),
    ).resolves.toBeUndefined();
  });

  it("falha ao gravar a imagem não gera erro nem abre a folha", async () => {
    filesystem.writeFile.mockRejectedValue(new Error("disk full"));
    await expect(
      shareImageNative("data:image/png;base64,QUJD", "a.png", { title: "T", text: "X" }),
    ).resolves.toBeUndefined();
    expect(share.share).not.toHaveBeenCalled();
  });
});
