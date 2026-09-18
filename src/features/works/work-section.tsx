import { LayoutGroup } from "framer-motion";
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
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredWork, setHoveredWork] = useState<WorkItem | null>(null);
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);
  const [selectedLayoutId, setSelectedLayoutId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
    setIsHovered(true);
  }, []);

  const handleMouseEnter = useCallback((e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
    setIsHovered(true);
  }, []);

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
          cursorPos={cursorPos}
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
