import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

// Custom ease-in curve: slow at start to feel initial transition, fast towards end
const EASE = [0.7, 0, 0.84, 0] as const;

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <div className="relative w-full flex-1 flex flex-col bg-white overflow-hidden">
      {/* Slide curtain panel (z-35, behind Navbar z-45) */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: "100%" }}
        exit={{
          y: "0%",
          transition: { duration: 0.85, ease: EASE },
        }}
        className="fixed inset-0 z-35 bg-white pointer-events-none"
        style={{ willChange: "transform" }}
      />

      {/* Perspective wrapper */}
      <motion.div
        initial={{ scale: 0.92, y: 50, opacity: 0 }}
        animate={{
          scale: 1,
          y: 0,
          opacity: 1,
          transition: { duration: 0.85, ease: EASE },
        }}
        exit={{
          scale: 0.9,
          y: -60,
          opacity: 0.35,
          transition: { duration: 0.85, ease: EASE },
        }}
        className="w-full flex-1 flex flex-col bg-white"
        style={{
          transformPerspective: 1200,
          willChange: "transform, opacity",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
