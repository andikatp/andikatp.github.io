import { motion } from "framer-motion";

export function WorkHeader() {
  return (
    <div className="flex flex-col space-y-4 max-w-2xl px-6 sm:px-10 md:px-16">
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-gray-400 text-xs sm:text-sm font-semibold tracking-wider"
      >
        FEATURED WORKS
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight leading-tight select-none"
      >
        Selected projects in mobile development, web apps, and enterprise
        systems.
      </motion.h1>
    </div>
  );
}
