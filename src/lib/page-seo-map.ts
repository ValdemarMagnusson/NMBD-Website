import { site } from "../site.config";

/** Maps route paths to locale keys under `seo.*`. */
export const SEO_PAGES = {
  [site.routes.contact]: "contact",
  "/": "home",
} as const;

export type SeoPageKey = "home" | "contact";

export function resolveSeoPage(pathname: string): SeoPageKey {
  return pathname === site.routes.contact ? "contact" : "home";
}
