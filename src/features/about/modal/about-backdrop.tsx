import { motion } from "framer-motion";
import { useState } from "react";
import { backdropVariants } from "./about-variants";

interface AboutBackdropProps {
  onClose: () => void;
}

export function AboutBackdrop({ onClose }: AboutBackdropProps) {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPos({ x: Math.round(e.clientX), y: Math.round(e.clientY) });
    if (!isHovered) setIsHovered(true);
  };

  const isLeftBackdrop =
    typeof window !== "undefined" &&
    window.innerWidth >= 768 &&
    cursorPos.x > 0 &&
    cursorPos.x < window.innerWidth / 2;

  const showCloseCircle = isHovered && isLeftBackdrop;

  return (
    <>
      {/* Dark Backdrop Overlay */}
      <motion.div
        variants={backdropVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50 cursor-pointer"
        onClick={onClose}
        onMouseMove={handleMouseMove}
        onMouseEnter={(e) => {
          setCursorPos({ x: Math.round(e.clientX), y: Math.round(e.clientY) });
          setIsHovered(true);
        }}
        onMouseLeave={() => setIsHovered(false)}
      />

      {/* Floating Pointer "Close" Circle */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: showCloseCircle ? 1 : 0,
          opacity: showCloseCircle ? 1 : 0,
          x: cursorPos.x - 38,
          y: cursorPos.y - 38,
        }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{
          type: "spring",
          damping: 28,
          stiffness: 350,
          mass: 0.2,
        }}
        style={{ backfaceVisibility: "hidden" }}
        className="fixed top-0 left-0 w-[76px] h-[76px] bg-slate-950 text-white rounded-full flex items-center justify-center text-[10px] font-semibold tracking-widest shadow-2xl pointer-events-none z-50 select-none will-change-transform transform-gpu"
      >
        Close
      </motion.div>
    </>
  );
}
