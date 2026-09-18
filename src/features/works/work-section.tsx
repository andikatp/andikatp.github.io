import { LayoutGroup, useMotionValue, useSpring } from "framer-motion";
import React, { useCallback, useState } from "react";
import { useModal } from "../../context/modal-context";
import {
  WorkCursor,
  WorkDetailModal,
  WorkHeader,
  WorkInfoPanel,
  WorkMarquee,
  type WorkItem,
} from "./";

function WorkSection() {
  const { setIsModalOpen: setGlobalModalOpen } = useModal();
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const cursorX = useSpring(rawX, { damping: 24, stiffness: 280, mass: 0.4 });
  const cursorY = useSpring(rawY, { damping: 24, stiffness: 280, mass: 0.4 });

  const [isHovered, setIsHovered] = useState(false);
  const [hoveredWork, setHoveredWork] = useState<WorkItem | null>(null);
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);
  const [selectedLayoutId, setSelectedLayoutId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    rawX.set(e.clientX - 64);
    rawY.set(e.clientY - 24);
  }, [rawX, rawY]);

  const handleMouseEnter = useCallback((e: React.MouseEvent) => {
    rawX.set(e.clientX - 64);
    rawY.set(e.clientY - 24);
    setIsHovered(true);
  }, [rawX, rawY]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setHoveredWork(null);
  }, []);

  const handleHoverWork = useCallback((work: WorkItem | null) => {
    setHoveredWork(work);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setGlobalModalOpen(false);
    setSelectedWork(null);
    setSelectedLayoutId(null);
  }, [setGlobalModalOpen]);

  return (
    <LayoutGroup id="work-gallery">
      <section className="flex flex-col justify-end w-full flex-1 gap-2">
        <WorkHeader />
        <div className="mt-auto">
          <WorkMarquee
            onHoverWork={handleHoverWork}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            isPausedProp={isModalOpen || Boolean(selectedWork)}
            selectedLayoutId={selectedLayoutId}
            onSelectWork={(work, layoutId) => {
              setSelectedWork(work);
              setSelectedLayoutId(layoutId);
              setIsModalOpen(true);
              setGlobalModalOpen(true);
            }}
          />
        </div>
        <WorkInfoPanel hoveredWork={hoveredWork} />
        <WorkCursor
          isHovered={isHovered && Boolean(hoveredWork)}
          x={cursorX}
          y={cursorY}
        />

        <WorkDetailModal
          isOpen={isModalOpen}
          selectedWork={selectedWork}
          selectedLayoutId={selectedLayoutId}
          onClose={handleCloseModal}
          onSelectWork={(nextWork, nextLayoutId) => {
            setSelectedWork(nextWork);
            if (nextLayoutId) {
              setSelectedLayoutId(nextLayoutId);
            }
          }}
        />
      </section>
    </LayoutGroup>
  );
}

export default WorkSection;

