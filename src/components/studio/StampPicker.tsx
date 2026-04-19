import { motion } from "framer-motion";
import { StampId, getStampById } from "@/lib/studio-data";
import { playClick } from "@/lib/sounds";

interface StampPickerProps {
  stamps: StampId[];
  selected: StampId | null;
  onSelect: (id: StampId | null) => void;
}

export const StampPicker = ({ stamps, selected, onSelect }: StampPickerProps) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      {stamps.map((id) => {
        const s = getStampById(id);
        const active = selected === id;
        return (
          <motion.button
            key={id}
            whileTap={{ scale: 0.85 }}
            whileHover={{ scale: 1.1, rotate: -5 }}
            onClick={() => {
              playClick();
              onSelect(active ? null : id);
            }}
            aria-label={s.label}
            className={`flex h-12 w-12 items-center justify-center rounded-2xl border-4 bg-white text-2xl shadow-md transition-all sm:h-14 sm:w-14 sm:text-3xl ${
              active ? "border-primary scale-110 bg-primary/10" : "border-white"
            }`}
          >
            {s.emoji}
          </motion.button>
        );
      })}
    </div>
  );
};
