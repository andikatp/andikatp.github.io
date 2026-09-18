import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

function HeroSection() {
  const projects = [
    "Hrm Ess",
    "DG Sales App",
    "My Sinar Jaya",
    "Mootasi",
    "Devkit",
    "More",
  ];

  return (
    <section className="flex flex-col items-center justify-between flex-1 w-full px-6 py-6 md:flex-row sm:px-10 md:px-16 sm:py-0">
      {/* left side */}
      <div className="flex flex-col justify-center w-full gap-6 my-auto sm:gap-10 md:gap-16 lg:gap-20 md:w-2/3">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-[16vw] sm:text-[16vw] md:text-7xl lg:text-8xl xl:text-9xl font-semibold select-none leading-[0.82] sm:leading-none tracking-tight"
        >
          I'm Andika Tri Prasetya.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl text-3xl font-normal leading-snug select-none sm:text-4xl md:text-2xl lg:text-3xl text-slate-800"
        >
          I'm a fullstack developer who loves to build cool stuff. Available for
          work.
        </motion.p>
      </div>

      {/* right side (hidden on mobile, visible on md and up) */}
      <div className="flex-col hidden w-1/3 pl-8 space-y-4 md:flex lg:pl-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xs font-semibold text-gray-400 select-none lg:text-sm"
        >
          CURRENT PROJECTS
        </motion.h1>
        <div className="flex flex-col">
          {projects.map((project, index) => (
            <motion.a
              key={index}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.25 + index * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative flex items-center justify-between w-full py-3 text-base font-medium border-b cursor-pointer select-none group lg:py-4 border-slate-200 lg:text-xl text-slate-800 hover:text-slate-950"
            >
              <span>{project}</span>
              <div className="overflow-hidden flex items-center justify-center p-0.5">
                <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out -translate-x-full lg:w-5 lg:h-5 group-hover:translate-x-0 text-slate-900 shrink-0" />
              </div>
              <span className="absolute bottom-0 left-0 h-[2px] w-full bg-slate-900 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
