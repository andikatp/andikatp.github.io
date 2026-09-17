import { AnimatePresence, motion } from "framer-motion";
import WorkDetailPage from "../../../pages/work-detail-page";
import { BACKDROP_VARIANTS, HERO_TRANSITION } from "../animations/work-animations";
import { getWorkLayoutId, type WorkItem } from "../data/work-data";

interface WorkDetailModalProps {
  isOpen: boolean;
  selectedWork: WorkItem | null;
  selectedLayoutId: string | null;
  onClose: () => void;
  onSelectWork: (nextWork: WorkItem, nextLayoutId?: string) => void;
}

export function WorkDetailModal({
  isOpen,
  selectedWork,
  selectedLayoutId,
  onClose,
  onSelectWork,
}: WorkDetailModalProps) {
  return (
    <AnimatePresence
      onExitComplete={() => {
        onClose();
      }}
    >
      {isOpen && selectedWork && (
        <motion.div
          key="work-detail-modal"
          className="fixed inset-0 z-100 overflow-y-auto flex flex-col justify-between"
        >
          {/* Backdrop layer */}
          <motion.div
            key="modal-backdrop"
            variants={BACKDROP_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5, ease: HERO_TRANSITION.ease }}
            className="fixed inset-0 bg-white/95 backdrop-blur-xl z-0"
            onClick={onClose}
          />

          <div className="relative z-10 min-h-screen flex flex-col justify-between">
            <WorkDetailPage
              work={selectedWork}
              layoutId={selectedLayoutId || getWorkLayoutId(selectedWork, 0)}
              onClose={onClose}
              onSelectWork={onSelectWork}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
