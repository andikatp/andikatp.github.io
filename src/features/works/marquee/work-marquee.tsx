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
  works?: WorkItem[];
  onHoverWork: (work: WorkItem | null) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseEnter: (e: React.MouseEvent) => void;
  onMouseLeave: () => void;
  onSelectWork?: (work: WorkItem, layoutId: string) => void;
  isPausedProp?: boolean;
  selectedLayoutId?: string | null;
}

export function WorkMarquee({
  works,
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

  const isTouchDraggingRef = useRef(false);
  const touchStartXRef = useRef(0);
  const startMotionXRef = useRef(0);
  const touchMovedRef = useRef(false);

  const speed = 0.5;

  const marqueeWorks =
    works && works.length > 0
      ? [...works, ...works, ...works, ...works]
      : DUPLICATED_WORKS;

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
    if (isPaused || isPausedProp || isTouchDraggingRef.current) return;

    const moveBy = speed * (delta / 16);
    let currentX = x.get() - moveBy;

    const singleWidth = singleWidthRef.current;
    if (singleWidth > 0 && Math.abs(currentX) >= singleWidth) {
      currentX = currentX + singleWidth;
    }

    x.set(currentX);
  });

  const detectHoveredWorkFromPoint = (clientX: number, clientY: number) => {
    const elem = document.elementFromPoint(clientX, clientY);
    if (!elem) return;
    const cardElem = elem.closest("[data-work-index]");
    if (cardElem) {
      const idxStr = cardElem.getAttribute("data-work-index");
      if (idxStr !== null) {
        const idx = parseInt(idxStr, 10);
        if (!isNaN(idx) && marqueeWorks[idx]) {
          onHoverWork(marqueeWorks[idx]);
        }
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isTouchDraggingRef.current = true;
      touchMovedRef.current = false;
      touchStartXRef.current = e.touches[0].clientX;
      startMotionXRef.current = x.get();
      setIsPaused(true);
      detectHoveredWorkFromPoint(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isTouchDraggingRef.current || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - touchStartXRef.current;
    if (Math.abs(deltaX) > 5) {
      touchMovedRef.current = true;
    }
    let newX = startMotionXRef.current + deltaX;
    const singleWidth = singleWidthRef.current;
    if (singleWidth > 0) {
      while (newX > 0) newX -= singleWidth;
      while (Math.abs(newX) >= singleWidth * 2) newX += singleWidth;
    }
    x.set(newX);
    detectHoveredWorkFromPoint(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    isTouchDraggingRef.current = false;
  };

  return (
    <div
      className="w-full overflow-hidden my-auto py-4 relative touch-pan-y"
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={() => {
        onMouseLeave();
        setIsPaused(false);
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <motion.div
        ref={containerRef}
        style={{ x }}
        className="flex w-max shrink-0 items-center space-x-3 sm:space-x-6 py-4 sm:py-6"
      >
        {marqueeWorks.map((work, index) => {
          const slug = getWorkSlug(work, works);
          const itemLayoutId = `hero-card-${work.id}-${index}`;
          const isSelected = selectedLayoutId === itemLayoutId;
          return (
            <motion.div
              key={`marquee-item-${work.id}-${index}`}
              data-work-index={index}
              onClick={(e) => {
                if (touchMovedRef.current) {
                  e.preventDefault();
                  e.stopPropagation();
                  touchMovedRef.current = false;
                  return;
                }
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
                layoutId={itemLayoutId}
                transition={HERO_TRANSITION}
                variants={MARQUEE_CARD_VARIANTS}
                src={work.image}
                alt={work.title}
                className="h-[28vh] min-h-[160px] max-h-[260px] sm:h-[36vh] sm:min-h-[240px] md:h-[340px] lg:h-[400px] w-auto object-contain rounded-2xl pointer-events-none"
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
