import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import React, { useRef } from "react";

const items = [
  "Based in Bandung, Indonesia",
  "Open for fulltime job anywhere",
  "3+ years of experiences",
  "Fullstack Developer",
];

const trackItems = [...items, ...items, ...items, ...items];

function MarqueeAbout() {
  const baseX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const speed = 0.8;

  useAnimationFrame((_, delta) => {
    const moveBy = speed * (delta / 16);
    let currentX = baseX.get() - moveBy;

    if (containerRef.current) {
      const singleWidth = containerRef.current.scrollWidth / 4;
      if (singleWidth > 0 && Math.abs(currentX) >= singleWidth) {
        currentX = currentX + singleWidth;
      }
    }

    baseX.set(currentX);
  });

  return (
    <div className="relative w-full overflow-hidden bg-amber-400 text-slate-950 py-3 shadow-md select-none font-semibold text-sm sm:text-base tracking-wider">
      <motion.div
        ref={containerRef}
        style={{ x: baseX }}
        className="flex w-max shrink-0 items-center space-x-6 pr-6"
      >
        {trackItems.map((item, index) => (
          <React.Fragment key={`about-item-${index}`}>
            <span className="text-sm whitespace-nowrap">{item}</span>
            <span className="text-xl opacity-70">•</span>
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}

export default MarqueeAbout;
