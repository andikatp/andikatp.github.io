import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [phase, setPhase] = useState<"loading" | "waiting" | "exit">("loading");

  useEffect(() => {
    const updateDimension = () => {
      setDimension({
        width: window.innerWidth || document.documentElement.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight,
      });
    };
    updateDimension();
    window.addEventListener("resize", updateDimension);
    return () => window.removeEventListener("resize", updateDimension);
  }, []);

  useEffect(() => {
    // Phase 1: Show "Loading..." for 1000ms
    const timer1 = setTimeout(() => {
      setPhase("waiting");
    }, 1000);
    return () => clearTimeout(timer1);
  }, []);

  useEffect(() => {
    if (phase === "waiting") {
      // Phase 2: Show "Thank you for waiting" for 1100ms
      const timer2 = setTimeout(() => {
        setPhase("exit");
      }, 1100);
      return () => clearTimeout(timer2);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "exit") {
      // Phase 3: Allow U-curve SVG animation (800ms) to complete before unmounting
      const timer3 = setTimeout(() => {
        if (onComplete) onComplete();
      }, 850);
      return () => clearTimeout(timer3);
    }
  }, [phase, onComplete]);

  const w =
    dimension.width ||
    (typeof window !== "undefined" ? window.innerWidth : 1440);
  const h =
    dimension.height ||
    (typeof window !== "undefined" ? window.innerHeight : 900);

  const initialPath = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h} 0 ${h} Z`;
  const curvePath = `M0 0 L${w} 0 L${w} 0 Q${w / 2} ${Math.min(h * 0.35, 300)} 0 0 Z`;
  const targetPath = `M0 0 L${w} 0 L${w} 0 Q${w / 2} 0 0 0 Z`;

  const curveVariants = {
    initial: {
      d: initialPath,
    },
    exit: {
      d: [initialPath, curvePath, targetPath],
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1] as const,
        times: [0, 0.5, 1],
      },
    },
  };

  return (
    <div className="fixed inset-0 z-9999 pointer-events-none select-none">
      {/* SVG Background Path Curtain Overlay */}
      <svg className="absolute inset-0 w-full h-full fill-black stroke-none pointer-events-auto">
        <motion.path
          variants={curveVariants}
          initial="initial"
          animate={phase === "exit" ? "exit" : "initial"}
          style={{ willChange: "d" }}
        />
      </svg>

      {/* Content Layer (Centered Text Only) */}
      <AnimatePresence>
        {phase !== "exit" && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            className="relative z-10 w-full h-full flex items-center justify-center text-white pointer-events-auto"
            style={{ willChange: "opacity" }}
          >
            <AnimatePresence mode="wait">
              {phase === "loading" && (
                <motion.div
                  key="loading-text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center"
                >
                  <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-white">
                    Loading<span className="animate-pulse">...</span>
                  </h1>
                </motion.div>
              )}

              {phase === "waiting" && (
                <motion.div
                  key="thank-you-text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center"
                >
                  <h1 className="text-2xl sm:text-4xl md:text-5xl font-light tracking-tight text-slate-100">
                    Thank you for waiting
                  </h1>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
