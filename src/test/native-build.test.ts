import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

// Confere o resultado de `bun run build:native` (dist/ + cópia em android/).
// Só roda com NATIVE_BUILD_CHECK=1, logo depois desse build: o mesmo dist/
// também recebe o build do site, que tem (e deve ter) tudo isto.
const dist = path.resolve(__dirname, "../../dist");
const enabled = process.env.NATIVE_BUILD_CHECK === "1";

const walk = (dir: string): string[] =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name);
    return e.isDirectory() ? walk(full) : [full];
  });

describe.skipIf(!enabled)("build nativo", () => {
  it("não tem service worker", () => {
    expect(fs.existsSync(path.join(dist, "sw.js"))).toBe(false);
    expect(fs.existsSync(path.join(dist, "registerSW.js"))).toBe(false);
  });

  it("não leva as prévias de Open Graph", () => {
    expect(fs.existsSync(path.join(dist, "og"))).toBe(false);
  });

  it.each(["googletagmanager", "sentry.io", "fonts.googleapis.com", "fonts.gstatic.com"])(
    "nenhum arquivo cita %s",
    (needle) => {
      const hits = walk(dist)
        .filter((f) => /\.(html|js|css|json)$/.test(f))
        .filter((f) => fs.readFileSync(f, "utf8").includes(needle))
        .map((f) => path.relative(dist, f));
      expect(hits).toEqual([]);
    },
  );
});
