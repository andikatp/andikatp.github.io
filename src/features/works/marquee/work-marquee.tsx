import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HERO_TRANSITION,
  MARQUEE_CARD_VARIANTS,
} from "../animations/work-animations";
import {
  DUPLICATED_WORKS,
  getWorkSlug,
  type WorkItem,
} from "../data/work-data";

interface WorkMarqueeProps {
  onHoverWork: (work: WorkItem | null) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseEnter: (e: React.MouseEvent) => void;
  onMouseLeave: () => void;
  onSelectWork?: (work: WorkItem, layoutId: string) => void;
  isPausedProp?: boolean;
  selectedLayoutId?: string | null;
}

export function WorkMarquee({
  onHoverWork,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  onSelectWork,
  isPausedProp = false,
  selectedLayoutId = null,
}: WorkMarqueeProps) {
  const navigate = useNavigate();
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const singleWidthRef = useRef<number>(0);
  const x = useMotionValue(0);

  const speed = 0.5;

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        singleWidthRef.current = containerRef.current.scrollWidth / 4;
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useAnimationFrame((_, delta) => {
    if (isPaused || isPausedProp) return;

    const moveBy = speed * (delta / 16);
    let currentX = x.get() - moveBy;

    const singleWidth = singleWidthRef.current;
    if (singleWidth > 0 && Math.abs(currentX) >= singleWidth) {
      currentX = currentX + singleWidth;
    }

    x.set(currentX);
  });

  return (
    <div
      className="w-full overflow-hidden my-auto py-4 relative"
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={() => {
        onMouseLeave();
        setIsPaused(false);
      }}
    >
      <motion.div
        ref={containerRef}
        style={{ x }}
        className="flex w-max shrink-0 items-center space-x-6 py-2 transform-gpu will-change-transform"
      >
        {DUPLICATED_WORKS.map((work, index) => {
          const slug = getWorkSlug(work);
          const itemLayoutId = `hero-card-${work.id}-${index}`;
          const isSelected = selectedLayoutId === itemLayoutId;
          return (
            <motion.div
              key={`marquee-item-${work.id}-${index}`}
              onClick={() => {
                if (onSelectWork) {
                  onSelectWork(work, itemLayoutId);
                } else {
                  navigate(`/works/${slug}`);
                }
              }}
              onMouseEnter={() => {
                onHoverWork(work);
                setIsPaused(true);
              }}
              onMouseLeave={() => {
                onHoverWork(null);
                setIsPaused(false);
              }}
              initial="rest"
              whileHover="hover"
              animate={isSelected ? "selected" : "rest"}
              className={`shrink-0 cursor-pointer relative group ${
                isSelected ? "z-9999" : "z-10"
              }`}
              style={{ zIndex: isSelected ? 9999 : 1 }}
            >
              <motion.img
                layoutId={isSelected ? itemLayoutId : undefined}
                transition={{
                  layout: HERO_TRANSITION,
                  scale: { duration: 0.2, ease: "easeOut" },
                  opacity: { duration: 0.2, ease: "easeOut" },
                  filter: { duration: 0.2, ease: "easeOut" },
                }}
                variants={MARQUEE_CARD_VARIANTS}
                src={work.image}
                alt={work.title}
                className="h-[48vh] min-h-[300px] max-h-[440px] sm:h-72 md:h-[340px] lg:h-[400px] w-auto object-contain rounded-xl pointer-events-none transform-gpu"
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

