import { motion } from "framer-motion";
import { PAINT_COLORS } from "@/lib/studio-data";
import { playClick } from "@/lib/sounds";

interface ColorPaletteProps {
  selected: string;
  onSelect: (id: string) => void;
}

export const ColorPalette = ({ selected, onSelect }: ColorPaletteProps) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      {PAINT_COLORS.map((c) => {
        const active = selected === c.id;
        return (
          <motion.button
            key={c.id}
            whileTap={{ scale: 0.85 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => { playClick(); onSelect(c.id); }}
            aria-label={c.name}
            className={`relative h-11 w-11 rounded-full border-4 transition-all sm:h-14 sm:w-14 ${
              active ? "border-foreground scale-110 shadow-lg" : "border-white shadow-md"
            }`}
            style={{ backgroundColor: `hsl(${c.hsl})` }}
          >
            {active && (
              <motion.span
                layoutId="color-dot"
                className="absolute inset-0 rounded-full ring-4 ring-foreground/20"
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};
