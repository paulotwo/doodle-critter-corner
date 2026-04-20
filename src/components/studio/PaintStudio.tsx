import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brush, Stamp } from "lucide-react";
import { Challenge, ENCOURAGEMENTS, StampId, ThemeId, getThemeById } from "@/lib/studio-data";
import { getAnimal } from "@/lib/animals";
import { playEncourage, speak } from "@/lib/sounds";
import { ChallengeBox } from "./ChallengeBox";
import { ColorPalette } from "./ColorPalette";
import { StampPicker } from "./StampPicker";
import { ToolBar, Tool } from "./ToolBar";
import { PaintCanvas, PaintCanvasHandle } from "./PaintCanvas";
import { CelebrationModal } from "./CelebrationModal";

interface PaintStudioProps {
  themeId: ThemeId;
  mode: "free" | "challenge";
  onBack: () => void;
  onChangeTheme: () => void;
}

type PanelTab = "colors" | "stamps";

export const PaintStudio = ({ themeId, mode: initialMode, onBack, onChangeTheme }: PaintStudioProps) => {
  const theme = useMemo(() => getThemeById(themeId), [themeId]);
  const animal = useMemo(() => getAnimal(themeId), [themeId]);
  const canvasRef = useRef<PaintCanvasHandle>(null);

  // local mode can switch to "free" once all challenges are done
  const [mode, setMode] = useState<"free" | "challenge">(initialMode);

  const [color, setColor] = useState("red");
  const [tool, setTool] = useState<Tool>("fill");
  const [stamp, setStamp] = useState<StampId | null>(null);
  const [panel, setPanel] = useState<PanelTab>("colors");

  const [challengeIdx, setChallengeIdx] = useState(0);
  const [stampCounts, setStampCounts] = useState<Record<string, number>>({});
  const [colorsUsed, setColorsUsed] = useState<Set<string>>(new Set());
  const [partFills, setPartFills] = useState<Record<string, string>>({});
  const [allDone, setAllDone] = useState(false);
  const [hint, setHint] = useState<string | undefined>(undefined);

  const totalChallenges = theme.challenges.length;
  const challenge: Challenge | null =
    mode === "challenge" && challengeIdx < totalChallenges ? theme.challenges[challengeIdx] : null;

  // Speak challenge on change
  useEffect(() => {
    if (challenge) {
      const t = setTimeout(() => speak(challenge.text), 350);
      return () => clearTimeout(t);
    }
  }, [challenge?.id]); // eslint-disable-line

  // Reset counters & state when animal changes
  useEffect(() => {
    setStampCounts({});
    setColorsUsed(new Set());
    setPartFills({});
    setHint(undefined);
    setChallengeIdx(0);
    setAllDone(false);
    setMode(initialMode);
  }, [themeId, initialMode]);

  const progress = useMemo(() => {
    if (!challenge) return 0;
    const k = challenge.kind;
    if (k.type === "stamp") return Math.min(1, (stampCounts[k.stamp] ?? 0) / k.count);
    if (k.type === "colors") return Math.min(1, colorsUsed.size / k.count);
    if (k.type === "paint_count") return Math.min(1, Object.keys(partFills).length / k.count);
    if (k.type === "paint_part") {
      // accept any part sharing the same label (e.g. both ears)
      const target = animal.parts.find((p) => p.id === k.part);
      const ids = animal.parts.filter((p) => p.label === target?.label).map((p) => p.id);
      return ids.some((id) => partFills[id]) ? 1 : 0;
    }
    if (k.type === "paint_part_color") {
      const target = animal.parts.find((p) => p.id === k.part);
      const ids = animal.parts.filter((p) => p.label === target?.label).map((p) => p.id);
      return ids.some((id) => partFills[id] === k.color) ? 1 : 0;
    }
    if (k.type === "paint_all") {
      const totalParts = animal.parts.length;
      return Math.min(1, Object.keys(partFills).length / totalParts);
    }
    return 0;
  }, [challenge, stampCounts, colorsUsed, partFills, animal.parts]);

  // Auto-advance to next challenge when current one is complete
  useEffect(() => {
    if (!challenge || progress < 1) return;
    const t = setTimeout(() => {
      playEncourage();
      const next = challengeIdx + 1;
      if (next >= totalChallenges) {
        setAllDone(true);
      } else {
        setChallengeIdx(next);
      }
    }, 700);
    return () => clearTimeout(t);
  }, [progress, challenge, challengeIdx, totalChallenges]);

  const showEncouragement = () => {
    const msg = ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];
    setHint(msg);
    playEncourage();
    setTimeout(() => setHint(undefined), 2200);
  };

  const handleStampPlaced = (s: StampId) => {
    setStampCounts((prev) => ({ ...prev, [s]: (prev[s] ?? 0) + 1 }));
    if (challenge && challenge.kind.type === "stamp" && challenge.kind.stamp === s) {
      const next = (stampCounts[s] ?? 0) + 1;
      if (next < challenge.kind.count) showEncouragement();
    }
  };

  const handleColorUsed = (c: string) => {
    setColorsUsed((prev) => {
      if (prev.has(c)) return prev;
      const n = new Set(prev);
      n.add(c);
      return n;
    });
  };

  const handlePartFilled = (partId: string, colorId: string) => {
    setPartFills((p) => ({ ...p, [partId]: colorId }));
    if (challenge && challenge.kind.type === "paint_count") {
      const next = Object.keys({ ...partFills, [partId]: colorId }).length;
      if (next < challenge.kind.count) showEncouragement();
    }
    if (challenge && challenge.kind.type === "paint_all") {
      const next = Object.keys({ ...partFills, [partId]: colorId }).length;
      if (next < animal.parts.length) showEncouragement();
    }
  };

  // Final modal actions
  const handleNewChallengePickAnimal = () => {
    setAllDone(false);
    onChangeTheme();
  };

  const handleSwitchToFree = () => {
    setAllDone(false);
    setMode("free");
  };

  const handleStampSelect = (s: StampId | null) => {
    setStamp(s);
    if (s) setTool("stamp");
  };

  const handleToolChange = (t: Tool) => {
    setTool(t);
    if (t !== "stamp") setStamp(null);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.bg}`}>
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-3 py-3 sm:gap-4 sm:px-6 sm:py-5">
        <ChallengeBox theme={theme} challenge={challenge} progress={progress} hint={hint} />

        <div className="relative h-[45vh] min-h-[280px] sm:h-[55vh]">
          <PaintCanvas
            ref={canvasRef}
            animal={animal}
            color={color}
            tool={tool}
            stamp={stamp}
            onStampPlaced={handleStampPlaced}
            onColorUsed={handleColorUsed}
            onPartFilled={handlePartFilled}
          />
        </div>

        <ToolBar
          tool={tool}
          onToolChange={handleToolChange}
          onClear={() => canvasRef.current?.clear()}
          onBack={onBack}
          onChangeTheme={onChangeTheme}
        />

        <div className="kid-shadow-pop rounded-[1.75rem] border-4 border-white bg-card p-3 sm:p-4">
          <div className="mb-3 flex justify-center gap-2">
            <button
              onClick={() => setPanel("colors")}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-all ${
                panel === "colors" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
              }`}
            >
              <Brush className="h-4 w-4" /> {t.colorsTab}
            </button>
            <button
              onClick={() => setPanel("stamps")}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-all ${
                panel === "stamps" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
              }`}
            >
              <Stamp className="h-4 w-4" /> {t.stampsTab}
            </button>
          </div>
          <AnimatePresence mode="wait">
            {panel === "colors" ? (
              <motion.div key="colors" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
                <ColorPalette
                  selected={color}
                  onSelect={(c) => {
                    setColor(c);
                    if (tool === "stamp") setTool("fill");
                  }}
                />
              </motion.div>
            ) : (
              <motion.div key="stamps" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
                <StampPicker stamps={theme.stamps} selected={stamp} onSelect={handleStampSelect} />
                {stamp && (
                  <p className="mt-2 text-center text-xs text-muted-foreground">
                    {t.stampHint}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <CelebrationModal
        open={allDone}
        onPickAnotherAnimal={handleNewChallengePickAnimal}
        onContinueFree={handleSwitchToFree}
      />
    </div>
  );
};
