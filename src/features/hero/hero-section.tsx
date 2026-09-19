import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import React from "react";
import { usePageTransition } from "../../context";
import { getWorkSlug, useWorks } from "../works";

function HeroSection() {
  const { works } = useWorks();
  const { navigateWithTransition, isAnimating } = usePageTransition();

  const handleNavClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    if (isAnimating) return;
    navigateWithTransition(path);
  };

  const topProjects = works.slice(0, 5);

  return (
    <section className="flex flex-col md:flex-row items-stretch md:items-center justify-between flex-1 w-full px-4 sm:px-8 md:px-16 py-2 sm:py-4 md:py-0 gap-4 sm:gap-8 md:gap-0 min-h-0 overflow-hidden">
      <div className="flex flex-col justify-center w-full md:w-2/3 gap-2 sm:gap-6 md:gap-12 lg:gap-16 my-auto">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-[13vw] sm:text-[14vw] md:text-8xl lg:text-9xl xl:text-[11rem] 2xl:text-[13rem] font-semibold select-none leading-[0.85] sm:leading-[0.82] tracking-tight text-slate-900"
        >
          I'm Andika Tri Prasetya.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl text-base sm:text-xl md:text-2xl lg:text-3xl font-normal leading-relaxed select-none text-slate-800"
        >
          I'm a fullstack developer who loves to build cool stuff. Available for
          work.
        </motion.p>
      </div>

      <div className="flex flex-col w-full md:w-1/3 mt-1 md:mt-0 md:pl-8 lg:pl-16 space-y-1.5 sm:space-y-3">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[10px] sm:text-xs font-semibold text-gray-400 select-none lg:text-sm tracking-wider uppercase"
        >
          CURRENT PROJECTS
        </motion.h1>
        <div className="flex flex-col">
          {topProjects.map((project, index) => {
            const slug = getWorkSlug(project, works);
            const path = `/works/${slug}`;
            const isHiddenOnSmallMobile = index >= 3;
            return (
              <motion.a
                key={project.id}
                href={path}
                onClick={(e) => handleNavClick(e, path)}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.25 + index * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`relative flex items-center justify-between w-full py-1.5 sm:py-2.5 lg:py-4 text-xs sm:text-base lg:text-xl font-medium border-b cursor-pointer select-none group border-slate-200 text-slate-800 hover:text-slate-950 ${
                  isHiddenOnSmallMobile ? "hidden sm:flex" : "flex"
                }`}
              >
                <span>{project.title}</span>
                <div className="overflow-hidden flex items-center justify-center p-0.5">
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 ease-out -translate-x-full lg:w-5 lg:h-5 group-hover:translate-x-0 text-slate-900 shrink-0" />
                </div>
                <span className="absolute bottom-0 left-0 h-[2px] w-full bg-slate-900 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </motion.a>
            );
          })}

          <motion.a
            href="/works"
            onClick={(e) => handleNavClick(e, "/works")}
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.25 + topProjects.length * 0.07,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative flex items-center justify-between w-full py-1.5 sm:py-2.5 lg:py-4 text-xs sm:text-base lg:text-xl font-medium border-b cursor-pointer select-none group border-slate-200 text-slate-800 hover:text-slate-950"
          >
            <span>More</span>
            <div className="overflow-hidden flex items-center justify-center p-0.5">
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 ease-out -translate-x-full lg:w-5 lg:h-5 group-hover:translate-x-0 text-slate-900 shrink-0" />
            </div>
            <span className="absolute bottom-0 left-0 h-[2px] w-full bg-slate-900 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
