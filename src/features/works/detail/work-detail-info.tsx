import { motion } from "framer-motion";
import appstore from "../../../assets/marketplaces/appstore.webp";
import playstore from "../../../assets/marketplaces/playstore.webp";
import { PROJECT_INFO_VARIANTS } from "../animations/work-animations";
import type { WorkItem } from "../data/work-data";

interface WorkDetailInfoProps {
  work: WorkItem;
  isContentReady: boolean;
  isClosing: boolean;
  isInternalSwitch: boolean;
}

export function WorkDetailInfo({
  work,
  isContentReady,
  isClosing,
  isInternalSwitch,
}: WorkDetailInfoProps) {
  const workNumber = String(work.id).padStart(2, "0");
  const isReadyAndOpen = isContentReady && !isClosing;

  return (
    <motion.div
      key={work.id}
      variants={PROJECT_INFO_VARIANTS}
      initial="initial"
      animate={isReadyAndOpen ? "animate" : "initial"}
      custom={isReadyAndOpen}
      exit="exit"
      transition={{
        duration: isClosing ? 0.1 : 0.3,
        delay: isReadyAndOpen ? (isInternalSwitch ? 0 : 0.05) : 0,
      }}
      className="space-y-6 w-full xl:w-1/3 xl:pr-6 shrink-0"
    >
      <p className="text-sm font-medium text-slate-400 tracking-wider">
        {workNumber}
      </p>
      <h1 className="text-4xl sm:text-6xl xl:text-7xl font-semibold text-slate-900 tracking-tight">
        {work.title}
      </h1>
      <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
        {work.description}
      </p>

      <div className="flex flex-row justify-between w-full gap-4 pt-2">
        <div className="border-t border-slate-200 space-y-1 pt-3 w-full">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            TECHSTACKS
          </p>
          <p className="text-sm font-medium text-slate-900 uppercase">
            {work.techstacks.join(" • ")}
          </p>
        </div>
        <div className="border-t border-slate-200 space-y-1 pt-3 w-full">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            ROLE
          </p>
          <p className="text-sm font-medium text-slate-900 uppercase">
            {work.role}
          </p>
        </div>
      </div>

      <div className="flex flex-row gap-3 pt-6">
        <button className="bg-white px-5 py-2.5 rounded-full hover:bg-slate-50 transition-colors duration-200 flex flex-row justify-center items-center gap-2 cursor-pointer border border-slate-200 text-sm font-medium text-slate-800">
          <img src={playstore} alt="Play Store" height={20} width={20} />
          <span>Play Store</span>
        </button>
        <button className="bg-white px-5 py-2.5 rounded-full hover:bg-slate-50 transition-colors duration-200 flex flex-row justify-center items-center gap-2 cursor-pointer border border-slate-200 text-sm font-medium text-slate-800">
          <img src={appstore} alt="App Store" height={20} width={20} />
          <span>App Store</span>
        </button>
      </div>
    </motion.div>
  );
}
