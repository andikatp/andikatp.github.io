import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { Magnetic } from "../../../components/ui/magnetic";

interface AdditionalSection {
  title: string;
  content: ReactNode;
}

const ADDITIONALS: AdditionalSection[] = [
  {
    title: "NAME",
    content: <p>ANDIKA TRI PRASETYA</p>,
  },
  {
    title: "ROLE",
    content: <p>FULLSTACK DEVELOPER</p>,
  },
  {
    title: "CONTACT",
    content: (
      <div className="flex flex-col gap-1 items-start">
        <Magnetic strength={0.9}>
          <a
            className="inline-flex items-center gap-1 hover:text-slate-900 break-all text-[9px] sm:text-xs leading-tight cursor-pointer"
            href="mailto:triprasetya_andika@yahoo.com"
          >
            <span>TRIPRASETYA_ANDIKA@YAHOO.COM</span>
            <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
          </a>
        </Magnetic>
        <Magnetic strength={0.9}>
          <a
            className="inline-flex items-center gap-1 hover:text-slate-900 text-[10px] sm:text-xs cursor-pointer"
            href="https://www.linkedin.com/in/andikatp/"
            target="_blank"
            rel="noreferrer"
          >
            <span>LINKEDIN</span>
            <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
          </a>
        </Magnetic>
      </div>
    ),
  },
];

function AboutAdditionals() {
  return (
    <div className="flex flex-row justify-between gap-3 sm:gap-8 md:gap-12">
      {ADDITIONALS.map(({ title, content }) => (
        <div key={title} className="w-1/3 min-w-0">
          <p className="text-gray-400 text-[10px] sm:text-xs mb-0.5">{title}</p>
          <div className="text-[10px] sm:text-xs font-medium text-slate-800 wrap-break-word">
            {content}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AboutAdditionals;
