// Gera o ícone do app (leãozinho metade pintado, metade por pintar) a partir
// do desenho do jogo: fontes do Capacitor em assets/ e ícones web em public/.
// Uso, na raiz do projeto:
//   node scripts/gen-app-icons.mjs && bunx capacitor-assets generate --android
import { mkdirSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const SOURCE = "src/assets/animals/leaozinho.png";
const SKY = "#38BDF8"; // lado pintado
const ORANGE = "#F97316"; // lado por pintar (cor do tema do jogo)
const MANE = [249, 115, 22];
const FUR = [255, 210, 63];
const EAR = [253, 186, 116];
const NOSE = [146, 64, 14];
const PAPER = [255, 255, 255];

/** Fundo dividido ao meio. */
function background(size) {
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">` +
      `<rect width="${size}" height="${size}" fill="${SKY}"/>` +
      `<rect x="${size / 2}" width="${size / 2}" height="${size}" fill="${ORANGE}"/>` +
      `</svg>`,
  );
}

/** Linha tracejada no centro. */
function dash(size) {
  const k = size / 1024;
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">` +
      `<line x1="${size / 2}" y1="0" x2="${size / 2}" y2="${size}" stroke="#ffffff" stroke-width="${14 * k}" stroke-dasharray="${34 * k} ${26 * k}"/>` +
      `</svg>`,
  );
}

/** Cor de cada região fechada do desenho, pelo centro e tamanho dela (frações da imagem). */
function regionColor({ cx, cy, area }) {
  if (area < 0.0003) return PAPER; // brilho dos olhos
  if (area < 0.004 && cy > 0.43 && cy < 0.5 && cx > 0.42 && cx < 0.56)
    return area < 0.001 ? EAR : NOSE; // focinho e o brilho dele
  if (cy > 0.56 && cx > 0.76) return MANE; // tufo do rabo
  if (cy > 0.56) return FUR; // corpo, pernas e patas
  if (cy > 0.3 && cy < 0.56 && cx > 0.32 && cx < 0.68 && area > 0.05) return FUR; // rosto
  if (area < 0.012 && cy > 0.22 && cy < 0.36 && (cx < 0.36 || cx > 0.62)) return EAR; // dentro das orelhas
  return MANE;
}

/**
 * Pinta o desenho como o jogo faz (o contorno é a barreira) e devolve duas
 * imagens PNG recortadas na mesma caixa: o leão pintado e o leão em branco.
 */
async function paintedLion() {
  const { data: src, info } = await sharp(SOURCE)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const n = w * h;
  const barrier = (i) => src[i * 4 + 3] > 96;

  // Componentes conexos das áreas sem contorno. 0 = contorno, 1 = fora do leão.
  const label = new Int32Array(n);
  const regions = [null, null];
  const stack = new Int32Array(n);
  const flood = (start, id) => {
    let top = 0;
    let [sx, sy, area] = [0, 0, 0];
    stack[top++] = start;
    label[start] = id;
    while (top > 0) {
      const i = stack[--top];
      const x = i % w;
      const y = (i - x) / w;
      sx += x;
      sy += y;
      area++;
      for (const j of [
        x > 0 ? i - 1 : -1,
        x < w - 1 ? i + 1 : -1,
        y > 0 ? i - w : -1,
        y < h - 1 ? i + w : -1,
      ]) {
        if (j >= 0 && label[j] === 0 && !barrier(j)) {
          label[j] = id;
          stack[top++] = j;
        }
      }
    }
    return { cx: sx / area / w, cy: sy / area / h, area: area / n };
  };
  for (let x = 0; x < w; x++)
    for (const i of [x, (h - 1) * w + x]) if (label[i] === 0 && !barrier(i)) flood(i, 1);
  for (let y = 0; y < h; y++)
    for (const i of [y * w, y * w + w - 1]) if (label[i] === 0 && !barrier(i)) flood(i, 1);
  for (let i = 0; i < n; i++)
    if (label[i] === 0 && !barrier(i)) regions.push(flood(i, regions.length));
  const colors = regions.map((r) => (r ? regionColor(r) : null));

  // A tinta entra alguns pixels por baixo do traço, para não sobrar fresta clara.
  let grown = label;
  for (let pass = 0; pass < 4; pass++) {
    const next = Int32Array.from(grown);
    for (let y = 1; y < h - 1; y++)
      for (let x = 1; x < w - 1; x++) {
        const i = y * w + x;
        if (grown[i] !== 0) continue;
        for (const j of [i - 1, i + 1, i - w, i + w]) if (grown[j] > 1) next[i] = grown[j];
      }
    grown = next;
  }

  const painted = Buffer.alloc(n * 4);
  const blank = Buffer.alloc(n * 4);
  for (let i = 0; i < n; i++) {
    const a = src[i * 4 + 3] / 255;
    const fill = grown[i] > 1 ? colors[grown[i]] : PAPER;
    // Traço (preto do original) por cima da tinta; fora do leão, só o traço.
    const alpha = Math.max(grown[i] > 1 ? 255 : 0, src[i * 4 + 3]);
    for (let c = 0; c < 3; c++) {
      painted[i * 4 + c] = Math.round(src[i * 4 + c] * a + fill[c] * (1 - a));
      blank[i * 4 + c] = Math.round(src[i * 4 + c] * a + PAPER[c] * (1 - a));
    }
    painted[i * 4 + 3] = alpha;
    blank[i * 4 + 3] = alpha;
  }
  const raw = { raw: { width: w, height: h, channels: 4 } };
  // Recorta as duas com a mesma caixa (a do leão em branco; o alfa é o mesmo).
  const { info: t } = await sharp(blank, raw).trim().toBuffer({ resolveWithObject: true });
  const box = { left: -t.trimOffsetLeft, top: -t.trimOffsetTop, width: t.width, height: t.height };
  return {
    painted: await sharp(painted, raw).extract(box).png().toBuffer(),
    blank: await sharp(blank, raw).extract(box).png().toBuffer(),
  };
}

/**
 * Menor círculo que contém todo o leão (centro e raio em frações da largura
 * da imagem recortada). O launcher do Android recorta o ícone em círculo.
 */
async function enclosingCircle(trimmed) {
  const { data, info } = await sharp(trimmed)
    .resize(320, 320, { fit: "inside" })
    .extractChannel("alpha")
    .raw()
    .toBuffer({ resolveWithObject: true });
  const points = [];
  for (let y = 0; y < info.height; y++)
    for (let x = 0; x < info.width; x++)
      if (data[y * info.width + x] > 8) points.push([x + 0.5, y + 0.5]);
  const farthest = (cx, cy) => {
    let best = points[0];
    let dist = -1;
    for (const p of points) {
      const d = (p[0] - cx) ** 2 + (p[1] - cy) ** 2;
      if (d > dist) [best, dist] = [p, d];
    }
    return [best, Math.sqrt(dist)];
  };
  // Bădoiu–Clarkson: o centro caminha, em passos cada vez menores, até o ponto mais distante.
  let [cx, cy] = [info.width / 2, info.height / 2];
  for (let i = 1; i <= 3000; i++) {
    const [p] = farthest(cx, cy);
    cx += (p[0] - cx) / (i + 1);
    cy += (p[1] - cy) / (i + 1);
  }
  const [, r] = farthest(cx, cy);
  return { cx: cx / info.width, cy: cy / info.width, r: (r + 1) / info.width };
}

const art = await paintedLion();
const circle = await enclosingCircle(art.blank);

/**
 * Leão num quadro transparente de `size` px: pintado à esquerda do centro do
 * quadro, em branco à direita. É o maior possível dentro do círculo de
 * diâmetro `diameter` centrado no quadro.
 */
async function lion(size, diameter) {
  const width = Math.floor(diameter / (2 * circle.r));
  const blank = await sharp(art.blank)
    .resize({ width })
    .png()
    .toBuffer({ resolveWithObject: true });
  const left = Math.round(size / 2 - circle.cx * width);
  const top = Math.round(size / 2 - circle.cy * width);
  const cut = size / 2 - left;
  const paintedHalf = await sharp(await sharp(art.painted).resize({ width }).png().toBuffer())
    .extract({ left: 0, top: 0, width: cut, height: blank.info.height })
    .png()
    .toBuffer();
  return sharp({
    create: { width: size, height: size, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([
      { input: blank.data, left, top },
      { input: paintedHalf, left, top },
    ])
    .png()
    .toBuffer();
}

/** Ícone completo: fundo + linha tracejada + leão. */
async function icon(size, diameter) {
  return sharp(background(size))
    .composite([{ input: dash(size) }, { input: await lion(size, diameter) }])
    .flatten({ background: SKY })
    .png()
    .toBuffer();
}

/** .ico com um PNG embutido (formato aceito desde o Windows Vista). */
function ico(png, size) {
  const header = Buffer.alloc(22);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  header.writeUInt8(size, 6);
  header.writeUInt8(size, 7);
  header.writeUInt16LE(1, 10);
  header.writeUInt16LE(32, 12);
  header.writeUInt32LE(png.length, 14);
  header.writeUInt32LE(22, 18);
  return Buffer.concat([header, png]);
}

mkdirSync("assets", { recursive: true });
mkdirSync("test-results", { recursive: true });

// Capacitor (@capacitor/assets). O ícone adaptativo gerado por ele encaixa a
// imagem inteira nos 72dp visíveis (inset de 16,7%), então a zona segura de
// 66dp, que nenhum launcher corta, é um círculo de 66/72 do lado da imagem.
const SAFE = Math.floor((1024 * 66) / 72);
// icon-only também vira ícone redondo (Android antigo) e "maskable" no PWA
// (zona segura: círculo de 80%).
const full = await icon(1024, 800);
await sharp(full).toFile("assets/icon-only.png");
await sharp(background(1024))
  .composite([{ input: dash(1024) }])
  .png()
  .toFile("assets/icon-background.png");
await sharp(await lion(1024, SAFE)).toFile("assets/icon-foreground.png");
const splash = await icon(2732, 1100);
await sharp(splash).toFile("assets/splash.png");
await sharp(splash).toFile("assets/splash-dark.png");

// Web / PWA
await sharp(full).resize(512, 512).png().toFile("public/icon-512.png");
await sharp(full).resize(192, 192).png().toFile("public/icon-192.png");
writeFileSync("public/favicon.ico", ico(await sharp(full).resize(48, 48).png().toBuffer(), 48));

// Prévia do ícone adaptativo como o launcher recorta (círculo e quadrado
// arredondado), o ícone inteiro e o tamanho real de 48 px.
const adaptive = await sharp("assets/icon-background.png")
  .composite([{ input: "assets/icon-foreground.png" }])
  .png()
  .toBuffer()
  .then((layered) => sharp(layered).resize(400, 400).png().toBuffer());
const mask = (rx) =>
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="400" height="400" rx="${rx}" fill="#fff"/></svg>`,
  );
const masked = (rx) =>
  sharp(adaptive)
    .composite([{ input: mask(rx), blend: "dest-in" }])
    .png()
    .toBuffer();
await sharp({ create: { width: 1420, height: 480, channels: 3, background: "#f2f2f2" } })
  .composite([
    { input: await masked(200), left: 40, top: 40 },
    { input: await masked(90), left: 470, top: 40 },
    { input: await sharp(full).resize(400, 400).toBuffer(), left: 900, top: 40 },
    { input: await sharp(full).resize(48, 48).toBuffer(), left: 1340, top: 40 },
  ])
  .png()
  .toFile("test-results/icone-aplicado.png");
console.log("ícones gerados");
