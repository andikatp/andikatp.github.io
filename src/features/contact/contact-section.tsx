import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Magnetic from "../../components/ui/magnetic";

interface ILink {
  id: number;
  label: string;
  link: string;
}

const links: ILink[] = [
  {
    id: 1,
    label: "Email",
    link: "mailto:triprasetya_andika@yahoo.com",
  },
  {
    id: 2,
    label: "Linkedin",
    link: "https://www.linkedin.com/in/andikatp/",
  },
  {
    id: 3,
    label: "Github",
    link: "https://github.com/andikatp",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

function ContactSection() {
  return (
    <section className="flex flex-col items-center justify-center flex-1 px-4 sm:px-8 md:px-16 w-full py-10 sm:py-12 pt-14 sm:pt-20 md:pt-24 gap-6 sm:gap-8">
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="uppercase text-xs sm:text-sm text-gray-400 tracking-wider font-semibold"
      >
        Contact
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-slate-900 tracking-tight text-center"
      >
        Let's Work Together.
      </motion.h1>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mt-4 sm:mt-8 py-4 items-center border-t border-slate-200 w-full sm:w-3/4 md:w-1/2 flex flex-col gap-y-4 sm:gap-y-6"
      >
        {links.map((item) => (
          <motion.div key={item.id} variants={itemVariants}>
            <Magnetic strength={0.9}>
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="flex flex-row items-center gap-2 text-xl sm:text-2xl md:text-3xl font-semibold text-slate-900 hover:text-slate-600 transition-colors select-none"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
              </a>
            </Magnetic>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default ContactSection;
