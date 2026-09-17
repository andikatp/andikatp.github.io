import { motion } from "framer-motion";
import { PROJECT_SELECTOR_VARIANTS } from "../animations/work-animations";
import {
  getSetIndexFromLayoutId,
  getWorkLayoutId,
  type WorkItem,
  WORKS,
} from "../data/work-data";

interface WorkDetailSelectorProps {
  currentWorkId: number;
  activeLayoutId: string;
  isContentReady: boolean;
  isClosing: boolean;
  onSelectWork?: (work: WorkItem, layoutId?: string) => void;
  onSelectInternal: (work: WorkItem, targetLayoutId: string) => void;
}

export function WorkDetailSelector({
  currentWorkId,
  activeLayoutId,
  isContentReady,
  isClosing,
  onSelectWork,
  onSelectInternal,
}: WorkDetailSelectorProps) {
  const projectsList = WORKS.slice(0, 8);
  const isReadyAndOpen = isContentReady && !isClosing;

  return (
    <motion.div
      variants={PROJECT_SELECTOR_VARIANTS}
      initial="initial"
      animate={isReadyAndOpen ? "animate" : "initial"}
      custom={isReadyAndOpen}
      exit="exit"
      transition={{
        duration: isClosing ? 0.1 : 0.3,
        delay: isReadyAndOpen ? 0.15 : 0,
      }}
      className="flex justify-end w-full pt-4"
    >
      <div className="flex flex-row items-center gap-2">
        {projectsList.map((item) => {
          const isActive = item.id === currentWorkId;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === currentWorkId) return;
                const setIdx = getSetIndexFromLayoutId(activeLayoutId);
                const targetLayoutId = getWorkLayoutId(item, setIdx);
                if (onSelectWork) {
                  onSelectWork(item, targetLayoutId);
                } else {
                  onSelectInternal(item, targetLayoutId);
                }
              }}
              title={item.title}
              className={`rounded-lg p-1 bg-slate-100/80 shadow-sm flex items-center justify-center transition-all duration-200 cursor-pointer shrink-0 ${
                isActive
                  ? "opacity-100 grayscale-0 scale-105"
                  : "opacity-40 grayscale hover:opacity-100 hover:grayscale-0"
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-9 sm:h-11 w-auto max-w-[28px] sm:max-w-[34px] object-contain rounded-md"
              />
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
