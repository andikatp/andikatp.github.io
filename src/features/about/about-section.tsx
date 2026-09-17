import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  AboutAdditionals,
  AboutBackdrop,
  AboutCV,
  AboutCurve,
  AboutExperience,
  AboutHeader,
  AboutIntro,
  AboutStory,
  AboutSummary,
  SkillMatrix,
  contentVariants,
  menuVariants,
  tabVariants,
} from "./";

interface AboutProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = "about" | "experience" | "cv";

function AboutSection({ isOpen, onClose }: AboutProps) {
  const [activeTab, setActiveTab] = useState<TabType>("about");
  const [windowHeight, setWindowHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 800,
  );

  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const tabs = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "cv", label: "Download CV" },
  ] as const;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Dark Backdrop with Custom Floating Close Pointer */}
          <AboutBackdrop onClose={onClose} />

          {/* Right Curved Slide-Over Modal */}
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className="fixed top-0 right-0 h-full w-full md:w-1/2 bg-white text-slate-900 shadow-2xl z-70 flex flex-col"
          >
            {/* SVG Elastic Curve Edge on Left Border */}
            <AboutCurve windowHeight={windowHeight} />

            {/* Header */}
            <AboutHeader onClose={onClose} customIndex={0} />

            {/* Tab Navigation */}
            <div className="px-8 pt-4 pb-2 border-b border-slate-100 flex items-center space-x-2 shrink-0">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 select-none cursor-pointer ${
                      isActive
                        ? "bg-slate-900 text-white shadow-sm"
                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 p-8 overflow-y-auto overflow-x-hidden no-scrollbar space-y-8">
              <AnimatePresence mode="wait">
                {activeTab === "about" && (
                  <motion.div
                    key="tab-about"
                    variants={tabVariants}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    className="space-y-8"
                  >
                    <AboutIntro customIndex={1} />
                    <AboutStory customIndex={2} />

                    <motion.div
                      custom={3}
                      variants={contentVariants}
                      initial="initial"
                      animate="enter"
                      exit="exit"
                    >
                      <SkillMatrix />
                    </motion.div>

                    <AboutSummary customIndex={4} />
                  </motion.div>
                )}

                {activeTab === "experience" && (
                  <motion.div
                    key="tab-experience"
                    variants={tabVariants}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                  >
                    <AboutExperience />
                  </motion.div>
                )}

                {activeTab === "cv" && (
                  <motion.div
                    key="tab-cv"
                    variants={tabVariants}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                  >
                    <AboutCV customIndex={1} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Pinned Bottom Footer (Always Visible) */}
            <motion.div
              custom={5}
              variants={contentVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              className="px-8 py-4 border-t border-slate-100 bg-white shrink-0 z-10"
            >
              <AboutAdditionals />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default AboutSection;
