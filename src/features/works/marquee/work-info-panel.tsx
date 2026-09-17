import { AnimatePresence, motion } from "framer-motion";
import type { WorkItem } from "../data/work-data";

interface WorkInfoPanelProps {
  hoveredWork: WorkItem | null;
}

export function WorkInfoPanel({ hoveredWork }: WorkInfoPanelProps) {
  return (
    <AnimatePresence>
      {hoveredWork && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-6 left-6 sm:bottom-10 sm:left-16 z-40 pointer-events-none select-none flex flex-col space-y-1"
        >
          <p className="text-xs sm:text-sm font-semibold tracking-wider text-slate-400 uppercase">
            {hoveredWork.category}
          </p>
          <p className="text-2xl sm:text-2xl font-semibold text-slate-950 tracking-tight leading-none">
            {hoveredWork.title}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
