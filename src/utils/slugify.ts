import slugifyPackage from "slugify";

/**
 * Converts any string into a clean, URL-friendly slug using the `slugify` npm package.
 * Example: "HRM ESS" -> "hrm-ess"
 * Example: "DG Sales App!" -> "dg-sales-app"
 */
export function slugify(text: string): string {
  return slugifyPackage(text, {
    lower: true,
    strict: true,
    trim: true,
  });
}
