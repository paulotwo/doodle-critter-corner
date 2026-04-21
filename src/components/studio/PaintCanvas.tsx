import { useEffect, useRef, useState, useCallback, forwardRef, useImperativeHandle } from "react";
import { PAINT_COLORS, StampId, getStampById } from "@/lib/studio-data";
import { AnimalDef } from "@/lib/animals";
import { Tool } from "./ToolBar";
import { playStamp, playClick } from "@/lib/sounds";
import { Sentry } from "@/lib/sentry";

export interface PaintCanvasHandle {
  clear: () => void;
  paintedParts: () => string[];
}

interface PaintCanvasProps {
  animal: AnimalDef;
  color: string;
  tool: Tool;
  stamp: StampId | null;
  onStampPlaced: (stamp: StampId) => void;
  onColorUsed: (color: string) => void;
  onPartFilled: (partId: string, colorId: string) => void;
}

interface StampMark {
  id: number;
  x: number;
  y: number;
  stamp: StampId;
  rotation: number;
  size: number;
}

// Cache: getComputedStyle is expensive (forces reflow). Compute once per color id.
const colorRgbCache = new Map<string, [number, number, number]>();
const getColorRgb = (id: string): [number, number, number] => {
  const cached = colorRgbCache.get(id);
  if (cached) return cached;
  const c = PAINT_COLORS.find((p) => p.id === id);
  if (!c) return [0, 0, 0];
  const varName = c.hsl.replace("var(", "").replace(")", "");
  const val = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  // val is like "0 90% 60%"
  const m = val.match(/([\d.]+)\s+([\d.]+)%\s+([\d.]+)%/);
  if (!m) return [0, 0, 0];
  const rgb = hslToRgb(parseFloat(m[1]), parseFloat(m[2]) / 100, parseFloat(m[3]) / 100);
  colorRgbCache.set(id, rgb);
  return rgb;
};

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h /= 360;
  let r: number, g: number, b: number;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

/**
 * Scanline flood-fill on the paint canvas.
 * Replaces all connected pixels matching the start pixel's color
 * (within tolerance), so it works on empty regions AND on already-painted
 * regions (lets the child change the color of a region).
 * The dark outline pixels (drawn on a separate layer above) are NOT in this
 * canvas, so they are never treated as fill boundaries directly — instead the
 * outline is composited temporarily before fill so its dark pixels stop the fill.
 */
function floodFill(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  startX: number,
  startY: number,
  fillR: number,
  fillG: number,
  fillB: number
) {
  Sentry.startSpan({ name: "floodFill", op: "canvas.fill" }, (span) => {
    const t0 = performance.now();
    const img = ctx.getImageData(0, 0, width, height);
    const data = img.data;
    const idx = (x: number, y: number) => (y * width + x) * 4;

    if (startX < 0 || startY < 0 || startX >= width || startY >= height) return;

    const si = idx(startX, startY);
    const startR = data[si];
    const startG = data[si + 1];
    const startB = data[si + 2];
    const startA = data[si + 3];

    // No-op if already that color
    if (startR === fillR && startG === fillG && startB === fillB && startA === 255) return;

    const TOL = 24;
    // painted[y*width+x] = 1 once setPixel has run on that pixel.
    // matchesStart checks this first: when fill color ≈ start color (within TOL),
    // already-painted pixels would otherwise still pass the color test, causing
    // them to be re-queued indefinitely (infinite loop).
    const painted = new Uint8Array(width * height);

    const matchesStart = (x: number, y: number) => {
      if (painted[y * width + x]) return false;
      const i = idx(x, y);
      const a = data[i + 3];
      // Both transparent → match
      if (startA < 40 && a < 40) return true;
      if (startA < 40 || a < 40) return false;
      return (
        Math.abs(data[i] - startR) <= TOL &&
        Math.abs(data[i + 1] - startG) <= TOL &&
        Math.abs(data[i + 2] - startB) <= TOL
      );
    };

    const setPixel = (x: number, y: number) => {
      painted[y * width + x] = 1;
      const i = idx(x, y);
      data[i] = fillR;
      data[i + 1] = fillG;
      data[i + 2] = fillB;
      data[i + 3] = 255;
    };

    if (!matchesStart(startX, startY)) return;

    // Safety cap: each pixel can only be processed once, so width*height is
    // the theoretical maximum. Exceeding it means something went wrong.
    const MAX_ITER = width * height;
    let iterations = 0;
    let pixelsFilled = 0;

    const stack: Array<[number, number]> = [[startX, startY]];
    while (stack.length) {
      if (++iterations > MAX_ITER) {
        Sentry.captureException(new Error("floodFill: iteration cap reached"), {
          level: "warning",
          extra: { startX, startY, width, height, iterations, pixelsFilled },
        });
        break;
      }
      const [x, y] = stack.pop()!;
      let lx = x;
      while (lx >= 0 && matchesStart(lx, y)) lx--;
      lx++;
      let spanAbove = false;
      let spanBelow = false;
      let cx = lx;
      while (cx < width && matchesStart(cx, y)) {
        setPixel(cx, y);
        pixelsFilled++;
        if (!spanAbove && y > 0 && matchesStart(cx, y - 1)) {
          stack.push([cx, y - 1]);
          spanAbove = true;
        } else if (spanAbove && y > 0 && !matchesStart(cx, y - 1)) {
          spanAbove = false;
        }
        if (!spanBelow && y < height - 1 && matchesStart(cx, y + 1)) {
          stack.push([cx, y + 1]);
          spanBelow = true;
        } else if (spanBelow && y < height - 1 && !matchesStart(cx, y + 1)) {
          spanBelow = false;
        }
        cx++;
      }
    }
    ctx.putImageData(img, 0, 0);

    const ms = performance.now() - t0;
    span.setAttribute("pixels_filled", pixelsFilled);
    span.setAttribute("iterations", iterations);
    span.setAttribute("canvas_w", width);
    span.setAttribute("canvas_h", height);
    span.setAttribute("duration_ms", ms);

    if (ms > 150) {
      Sentry.addBreadcrumb({
        category: "canvas.performance",
        message: `floodFill slow: ${ms.toFixed(0)}ms`,
        level: "warning",
        data: { ms, pixelsFilled, iterations, width, height },
      });
    }
  });
}

export const PaintCanvas = forwardRef<PaintCanvasHandle, PaintCanvasProps>(
  ({ animal, color, tool, stamp, onStampPlaced, onColorUsed, onPartFilled }, ref) => {
    const paintRef = useRef<HTMLCanvasElement>(null); // user paint (fills + brush strokes)
    const outlineRef = useRef<HTMLCanvasElement>(null); // animal outline overlay
    const containerRef = useRef<HTMLDivElement>(null);
    const drawing = useRef(false);
    const lastPoint = useRef<{ x: number; y: number } | null>(null);
    const [marks, setMarks] = useState<StampMark[]>([]);
    const [partsFilled, setPartsFilled] = useState<Set<string>>(new Set());
    const partsFilledRef = useRef(partsFilled);
    partsFilledRef.current = partsFilled;
    const stampIdRef = useRef(0);
    const outlineImg = useRef<HTMLImageElement | null>(null);

    // Load outline image once per animal
    useEffect(() => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = animal.srcFull;
      img.onload = () => {
        outlineImg.current = img;
        drawOutline();
      };
      // Reset paint state
      setMarks([]);
      setPartsFilled(new Set());
      const pc = paintRef.current;
      const pctx = pc?.getContext("2d");
      if (pc && pctx) {
        pctx.save();
        pctx.setTransform(1, 0, 0, 1, 0, 0);
        pctx.clearRect(0, 0, pc.width, pc.height);
        pctx.restore();
      }
    }, [animal.id]); // eslint-disable-line

    const drawOutline = useCallback(() => {
      const oc = outlineRef.current;
      const img = outlineImg.current;
      if (!oc || !img) return;
      const ctx = oc.getContext("2d");
      if (!ctx) return;
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, oc.width, oc.height);
      ctx.restore();
      // fit image preserving aspect into canvas
      const cw = oc.width;
      const ch = oc.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale = Math.min(cw / iw, ch / ih) * 0.95;
      const w = iw * scale;
      const h = ih * scale;
      const x = (cw - w) / 2;
      const y = (ch - h) / 2;
      ctx.drawImage(img, x, y, w, h);
    }, []);

    const resize = useCallback(() => {
      const container = containerRef.current;
      const pc = paintRef.current;
      const oc = outlineRef.current;
      if (!container || !pc || !oc) return;
      const rect = container.getBoundingClientRect();
      // Cap DPR at 1 — coloring book doesn't need retina, and high DPR
      // makes flood-fill allocate huge ImageData on every click (mobile crashes).
      const dpr = 1;

      const W = Math.floor(rect.width * dpr);
      const H = Math.floor(rect.height * dpr);
      // Skip if dimensions unchanged (mobile URL bar toggling triggers resize repeatedly)
      if (pc.width === W && pc.height === H) return;

      // preserve paint
      let tmp: HTMLCanvasElement | null = null;
      if (pc.width > 0 && pc.height > 0) {
        tmp = document.createElement("canvas");
        tmp.width = pc.width;
        tmp.height = pc.height;
        const tctx = tmp.getContext("2d");
        if (tctx) tctx.drawImage(pc, 0, 0);
      }

      [pc, oc].forEach((c) => {
        c.width = W;
        c.height = H;
        c.style.width = `${rect.width}px`;
        c.style.height = `${rect.height}px`;
      });

      const pctx = pc.getContext("2d");
      if (pctx) {
        pctx.lineCap = "round";
        pctx.lineJoin = "round";
        if (tmp) pctx.drawImage(tmp, 0, 0, W, H);
      }
      // free temp canvas
      if (tmp) {
        tmp.width = 0;
        tmp.height = 0;
      }
      drawOutline();
    }, [drawOutline]);

    useEffect(() => {
      resize();
      let raf = 0;
      const onResize = () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(resize);
      };
      window.addEventListener("resize", onResize);
      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", onResize);
      };
    }, [resize]);

    useImperativeHandle(ref, () => ({
      clear: () => {
        const pc = paintRef.current;
        const ctx = pc?.getContext("2d");
        if (pc && ctx) {
          ctx.save();
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.clearRect(0, 0, pc.width, pc.height);
          ctx.restore();
        }
        setMarks([]);
        setPartsFilled(new Set());
      },
      paintedParts: () => Array.from(partsFilledRef.current),
    }));

    const getPos = (e: React.PointerEvent) => {
      const c = paintRef.current!;
      const rect = c.getBoundingClientRect();
      const dpr = c.width / rect.width;
      return {
        cssX: e.clientX - rect.left,
        cssY: e.clientY - rect.top,
        x: (e.clientX - rect.left) * dpr,
        y: (e.clientY - rect.top) * dpr,
      };
    };

    const drawLine = (
      from: { x: number; y: number },
      to: { x: number; y: number }
    ) => {
      const ctx = paintRef.current?.getContext("2d");
      if (!ctx) return;
      const [r, g, b] = getColorRgb(color);
      ctx.globalCompositeOperation = tool === "eraser" ? "destination-out" : "source-over";
      ctx.strokeStyle = tool === "eraser" ? "rgba(0,0,0,1)" : `rgb(${r},${g},${b})`;
      const baseW = paintRef.current!.width / 30;
      ctx.lineWidth = tool === "eraser" ? baseW * 2 : baseW;
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
    };

    /** Compose paint + outline to determine fillable region */
    const findClosestPart = (px: number, py: number) => {
      const pc = paintRef.current!;
      const W = pc.width;
      const H = pc.height;
      // animal coordinates are normalized over the displayed image area
      const oc = outlineRef.current!;
      const img = outlineImg.current;
      if (!img) return null;
      const cw = oc.width;
      const ch = oc.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale = Math.min(cw / iw, ch / ih) * 0.95;
      const w = iw * scale;
      const h = ih * scale;
      const offX = (cw - w) / 2;
      const offY = (ch - h) / 2;

      let best: { id: string; d: number } | null = null;
      for (const part of animal.parts) {
        for (const pt of part.points) {
          const x = offX + pt.x * w;
          const y = offY + pt.y * h;
          const d = Math.hypot(px - x, py - y);
          if (!best || d < best.d) best = { id: part.id, d };
        }
      }
      // accept only if reasonably close (within 30% of canvas height)
      if (!best || best.d > H * 0.3) return null;
      void W;
      return best.id;
    };

    const performFill = (px: number, py: number) => {
      const pc = paintRef.current;
      const oc = outlineRef.current;
      if (!pc || !oc) return;
      const pctx = pc.getContext("2d");
      if (!pctx) return;
      // Composite outline temporarily so flood-fill respects it
      pctx.save();
      pctx.globalCompositeOperation = "source-over";
      pctx.drawImage(oc, 0, 0);
      const [r, g, b] = getColorRgb(color);
      floodFill(pctx, pc.width, pc.height, Math.floor(px), Math.floor(py), r, g, b);
      // erase the outline pixels we drew (they live on the outline layer above anyway)
      pctx.globalCompositeOperation = "destination-out";
      pctx.drawImage(oc, 0, 0);
      pctx.globalCompositeOperation = "source-over";
      pctx.restore();

      const partId = findClosestPart(px, py);
      if (partId) {
        setPartsFilled((prev) => {
          const n = new Set(prev);
          n.add(partId);
          return n;
        });
        onPartFilled(partId, color);
      }
      onColorUsed(color);
      playClick();
    };

    const handlePointerDown = (e: React.PointerEvent) => {
      const pos = getPos(e);

      if (tool === "stamp" && stamp) {
        e.currentTarget.setPointerCapture(e.pointerId);
        const newMark: StampMark = {
          id: ++stampIdRef.current,
          x: pos.cssX,
          y: pos.cssY,
          stamp,
          rotation: (Math.random() - 0.5) * 30,
          size: 56 + Math.random() * 20,
        };
        // Cap stamps to avoid unbounded growth (each stamp = a DOM node + animation)
        setMarks((m) => (m.length >= 60 ? [...m.slice(-59), newMark] : [...m, newMark]));
        onStampPlaced(stamp);
        playStamp();
        return;
      }

      if (tool === "fill") {
        performFill(pos.x, pos.y);
        return;
      }

      if (tool === "brush" || tool === "eraser") {
        e.currentTarget.setPointerCapture(e.pointerId);
        drawing.current = true;
        lastPoint.current = { x: pos.x, y: pos.y };
        drawLine({ x: pos.x, y: pos.y }, { x: pos.x, y: pos.y });
        if (tool === "brush") onColorUsed(color);
      }
    };

    // rAF-throttled move: coalesces dozens of pointer events into 1 paint per frame.
    const moveRaf = useRef<number>(0);
    const pendingMove = useRef<{ x: number; y: number } | null>(null);
    const handlePointerMove = (e: React.PointerEvent) => {
      if (!drawing.current || !lastPoint.current) return;
      const pos = getPos(e);
      pendingMove.current = { x: pos.x, y: pos.y };
      if (moveRaf.current) return;
      moveRaf.current = requestAnimationFrame(() => {
        moveRaf.current = 0;
        const target = pendingMove.current;
        pendingMove.current = null;
        if (!target || !drawing.current || !lastPoint.current) return;
        drawLine(lastPoint.current, target);
        lastPoint.current = target;
      });
    };

    const handlePointerUp = () => {
      drawing.current = false;
      lastPoint.current = null;
      if (moveRaf.current) {
        cancelAnimationFrame(moveRaf.current);
        moveRaf.current = 0;
      }
      pendingMove.current = null;
    };

    const cursor =
      tool === "eraser" ? "cell" : tool === "stamp" ? "copy" : tool === "fill" ? "pointer" : "crosshair";

    return (
      <div
        ref={containerRef}
        className="kid-shadow-pop relative h-full w-full overflow-hidden rounded-[1.75rem] border-4 border-white bg-white no-touch-callout"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, hsl(var(--accent) / 0.06) 0%, transparent 40%), radial-gradient(circle at 80% 70%, hsl(var(--primary) / 0.05) 0%, transparent 40%)",
        }}
      >
        {/* Paint layer (user fills + brush) - bottom */}
        <canvas
          ref={paintRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="absolute inset-0 h-full w-full touch-none"
          style={{ cursor }}
        />

        {/* Outline layer - top, non-interactive */}
        <canvas
          ref={outlineRef}
          className="pointer-events-none absolute inset-0 h-full w-full"
        />

        {/* Stamps overlay */}
        <div className="pointer-events-none absolute inset-0">
          {marks.map((m) => (
            <span
              key={m.id}
              className="absolute select-none animate-bounce-in"
              style={{
                left: m.x,
                top: m.y,
                transform: `translate(-50%, -50%) rotate(${m.rotation}deg)`,
                fontSize: m.size,
                lineHeight: 1,
                filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.15))",
              }}
            >
              {getStampById(m.stamp).emoji}
            </span>
          ))}
        </div>
      </div>
    );
  }
);

PaintCanvas.displayName = "PaintCanvas";
