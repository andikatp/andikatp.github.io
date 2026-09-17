import thumb1 from "../../../assets/thumbnails/1.jpg";
import thumb2 from "../../../assets/thumbnails/2.jpg";
import thumb3 from "../../../assets/thumbnails/3.jpg";
import thumb4 from "../../../assets/thumbnails/4.png";
import thumb5 from "../../../assets/thumbnails/5.jpg";
import thumb6 from "../../../assets/thumbnails/6.jpeg";
import thumb7 from "../../../assets/thumbnails/7.jpeg";
import { slugify } from "../../../utils/slugify";

export interface WorkItem {
  id: number;
  slug?: string;
  title: string;
  category: string;
  image: string;
  images: string[];
  description?: string;
  techstacks: string[];
  role: string;
}

export const WORKS: WorkItem[] = [
  {
    id: 1,
    slug: "hrm-ess",
    title: "HRM ESS",
    category: "MOBILE APP / FLUTTER",
    image: thumb1,
    images: [thumb1, thumb2, thumb3, thumb7],
    description:
      "Enterprise Human Resource Management and Employee Self-Service platform with AI face authentication.",
    techstacks: ["FLUTTER", "NODEJS"],
    role: "Mobile Developer",
  },
  {
    id: 2,
    slug: "dg-sales-app",
    title: "DG Sales App",
    category: "MOBILE APP / REACT NATIVE",
    image: thumb2,
    images: [thumb2, thumb3, thumb4, thumb1],
    description:
      "Cross-platform enterprise sales & distribution management app.",
    techstacks: ["REACT NATIVE", "NODEJS"],
    role: "Mobile Developer",
  },
  {
    id: 3,
    slug: "my-sinar-jaya",
    title: "My Sinar Jaya",
    category: "MOBILE APP / FLUTTER",
    image: thumb3,
    images: [thumb3, thumb4, thumb5, thumb2],
    description:
      "Ticketing & booking application for transportation operations.",
    techstacks: ["FLUTTER", "NODEJS"],
    role: "Mobile Developer",
  },
  {
    id: 4,
    slug: "mootasi",
    title: "Mootasi",
    category: "FULLSTACK WEB / REACT",
    image: thumb4,
    images: [thumb4, thumb5, thumb6, thumb3],
    description:
      "Financial transaction mutation tracker and analytical dashboard.",
    techstacks: ["REACT", "NODEJS"],
    role: "Fullstack Developer",
  },
  {
    id: 5,
    slug: "devkit",
    title: "Devkit",
    category: "WEB UTILITY / TYPESCRIPT",
    image: thumb5,
    images: [thumb5, thumb6, thumb7, thumb4],
    description: "Developer utility toolset for workflow automation.",
    techstacks: ["TYPESCRIPT", "NODEJS", "REACT"],
    role: "Fullstack Developer",
  },
  {
    id: 6,
    slug: "logistics-dashboard",
    title: "Logistics Dashboard",
    category: "ENTERPRISE / VUE & NODE",
    image: thumb6,
    images: [thumb6, thumb7, thumb1, thumb5],
    description: "Fleet tracking and inventory logistics control center.",
    techstacks: ["VUE", "NODEJS"],
    role: "Fullstack Developer",
  },
  {
    id: 7,
    slug: "inventory-manager",
    title: "Inventory Manager",
    category: "MOBILE APP / FLUTTER",
    image: thumb7,
    images: [thumb7, thumb1, thumb2, thumb6],
    description: "Real-time warehouse stock tracking and barcode scanning.",
    techstacks: ["FLUTTER", "NODEJS"],
    role: "Mobile Developer",
  },
];

export const DUPLICATED_WORKS = [...WORKS, ...WORKS, ...WORKS, ...WORKS];

/**
 * Returns the explicit slug or generates one dynamically from the project title using slugify().
 * Automatically appends the project ID if there is a title collision among multiple items.
 */
export function getWorkSlug(work: WorkItem): string {
  if (work.slug) return work.slug;
  const baseSlug = slugify(work.title);
  const duplicates = WORKS.filter(
    (w) => (w.slug || slugify(w.title)) === baseSlug,
  );
  if (duplicates.length > 1) {
    return `${baseSlug}-${work.id}`;
  }
  return baseSlug;
}

/**
 * Finds a work item matching either explicit slug, dynamic slug, or collision ID fallback
 */
export function getWorkBySlug(slug: string): WorkItem | undefined {
  return WORKS.find((w) => {
    const workSlug = getWorkSlug(w);
    if (workSlug === slug) return true;
    // Fallback: match by base slug + ID or numeric ID
    const baseSlug = slugify(w.title);
    return slug === `${baseSlug}-${w.id}` || slug === String(w.id);
  });
}

/**
 * Returns a valid layoutId string for a work item targeting a specific duplicated set index (default set 1)
 */
export function getWorkLayoutId(work: WorkItem, setIndex: number = 0): string {
  const itemIndexInSet = WORKS.findIndex((w) => w.id === work.id);
  const targetIndex =
    (itemIndexInSet >= 0 ? itemIndexInSet : 0) + setIndex * WORKS.length;
  return `hero-card-${work.id}-${targetIndex}`;
}

export function getSetIndexFromLayoutId(layoutId?: string): number {
  if (!layoutId) return 0;
  const parts = layoutId.split("-");
  const indexStr = parts[parts.length - 1];
  const index = parseInt(indexStr, 10);
  if (isNaN(index)) return 0;
  return Math.floor(index / WORKS.length);
}
