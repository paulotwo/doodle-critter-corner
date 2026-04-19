import { describe, it, expect } from "vitest";
import { THEMES, PAINT_COLORS } from "@/lib/studio-data";
import { ANIMALS } from "@/lib/animals";

describe("studio challenges validity", () => {
  for (const theme of THEMES) {
    const animal = ANIMALS[theme.id];

    it(`[${theme.id}] every challenge references existing parts/stamps/colors`, () => {
      expect(animal, `animal ${theme.id} exists`).toBeTruthy();

      for (const ch of theme.challenges) {
        const k = ch.kind;

        if (k.type === "stamp") {
          expect(
            theme.stamps.includes(k.stamp),
            `challenge ${ch.id} (${theme.id}) asks for stamp "${k.stamp}" but it is not in theme.stamps`,
          ).toBe(true);
        }

        if (k.type === "paint_part" || k.type === "paint_part_color") {
          const exists = animal.parts.some((p) => p.id === k.part);
          expect(
            exists,
            `challenge ${ch.id} (${theme.id}) asks for part "${k.part}" but it is not in animal parts`,
          ).toBe(true);
        }

        if (k.type === "paint_part_color") {
          const exists = PAINT_COLORS.some((c) => c.id === k.color);
          expect(
            exists,
            `challenge ${ch.id} (${theme.id}) asks for color "${k.color}" but it is not in PAINT_COLORS`,
          ).toBe(true);
        }
      }
    });
  }
});
