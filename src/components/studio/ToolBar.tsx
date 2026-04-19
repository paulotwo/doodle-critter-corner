import { motion } from "framer-motion";
import { Brush, Eraser, Trash2, ArrowLeft, Users, PaintBucket } from "lucide-react";
import { playClick } from "@/lib/sounds";

export type Tool = "brush" | "eraser" | "stamp" | "fill";

interface ToolBarProps {
  tool: Tool;
  onToolChange: (t: Tool) => void;
  onClear: () => void;
  onBack: () => void;
  onChangeTheme: () => void;
}

export const ToolBar = ({
  tool,
  onToolChange,
  onClear,
  onBack,
  onChangeTheme,
}: ToolBarProps) => {
  const btn = (active: boolean) =>
    `flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-white shadow-md transition-all sm:h-14 sm:w-14 ${
      active ? "bg-primary text-primary-foreground scale-110" : "bg-white text-foreground"
    }`;

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      <motion.button whileTap={{ scale: 0.9 }} onClick={() => { playClick(); onBack(); }} className={btn(false)} aria-label="Voltar">
        <ArrowLeft className="h-6 w-6" />
      </motion.button>
      <motion.button whileTap={{ scale: 0.9 }} onClick={() => { playClick(); onToolChange("fill"); }} className={btn(tool === "fill")} aria-label="Baldinho">
        <PaintBucket className="h-6 w-6" />
      </motion.button>
      <motion.button whileTap={{ scale: 0.9 }} onClick={() => { playClick(); onToolChange("brush"); }} className={btn(tool === "brush")} aria-label="Pincel">
        <Brush className="h-6 w-6" />
      </motion.button>
      <motion.button whileTap={{ scale: 0.9 }} onClick={() => { playClick(); onToolChange("eraser"); }} className={btn(tool === "eraser")} aria-label="Borracha">
        <Eraser className="h-6 w-6" />
      </motion.button>
      <motion.button whileTap={{ scale: 0.9 }} onClick={() => { playClick(); onClear(); }} className={btn(false)} aria-label="Limpar">
        <Trash2 className="h-6 w-6" />
      </motion.button>
      <motion.button whileTap={{ scale: 0.9 }} onClick={() => { playClick(); onChangeTheme(); }} className={btn(false)} aria-label="Trocar bichinho">
        <Users className="h-6 w-6" />
      </motion.button>
    </div>
  );
};
