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
    <section className="flex flex-col md:flex-row items-center justify-between flex-1 px-6 sm:px-10 md:px-16 w-full py-6 sm:py-0">
      {/* left side */}
      <div className="flex flex-col gap-6 sm:gap-10 md:gap-16 lg:gap-20 w-full md:w-2/3 justify-center my-auto">
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
          className="text-3xl sm:text-4xl md:text-2xl lg:text-3xl text-slate-800 select-none max-w-2xl leading-snug font-normal"
        >
          I'm a fullstack developer who loves to build cool stuff. Available for
          work.
        </motion.p>
      </div>

      {/* right side (hidden on mobile, visible on md and up) */}
      <div className="hidden md:flex flex-col space-y-4 w-1/3 pl-8 lg:pl-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xs lg:text-sm text-gray-400 font-semibold select-none"
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
              className="group relative flex items-center justify-between py-3 lg:py-4 border-b border-slate-200 cursor-pointer text-base lg:text-xl text-slate-800 hover:text-slate-950 font-medium select-none w-full"
            >
              <span>{project}</span>
              <div className="overflow-hidden flex items-center justify-center p-0.5">
                <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out text-slate-900 shrink-0" />
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
