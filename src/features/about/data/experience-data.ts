export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  bullets: string[];
}

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "dgmi",
    company: "PT Daya Guna Motor Indonesia",
    role: "Mobile Developer",
    location: "Bandung",
    period: "May 2024 - Present",
    bullets: [
      "Engineered and maintained a suite of 6 enterprise-grade applications, specifically focusing on scalable ERP and HRM solutions that digitize and automate critical business workflows for large-scale operations.",
      "Designed and open-sourced a stateless Face Authentication Engine for Flutter, integrating AI-driven 1:1 face verification and passive liveness detection.",
      "Leveraged both Flutter and React Native frameworks based on project requirements, ensuring stable and efficient cross-platform solutions for diverse production environments.",
      "Enhanced application performance, reducing load times by 40% through optimized architecture and asset handling, resulting in a 30% increase in overall operational efficiency across enterprise workflows.",
    ],
  },
  {
    id: "violet",
    company: "PT Violet Indah ESA",
    role: "Freelance Mobile Developer",
    location: "Remote",
    period: "Jul 2024 - Nov 2025",
    bullets: [
      "Developed and launched 1 production flight and hotel ticketing mobile application using Flutter and Dart.",
      "Maintained and enhanced the application post-launch, including a full backend API migration completed in an additional 2 months (Oct–Nov 2025).",
      "Integrated secure payment gateways, real-time ticket availability engines, and booking confirmation workflows.",
    ],
  },
  {
    id: "bax",
    company: "PT BAX Digital Indonesia",
    role: "Freelance Mobile Developer",
    location: "Remote",
    period: "Jan 2025 - Feb 2025",
    bullets: [
      "Developed and delivered a production-ready affiliate marketing mobile application using Flutter and Dart within 2 months (Jan–Feb 2025).",
      "Designed and implemented multi-level affiliate hierarchies, referral flows, and commission tracking systems to support scalable referral-based marketing.",
    ],
  },
];
