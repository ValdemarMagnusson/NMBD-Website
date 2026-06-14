import { isServiceSlug } from "./services-config";
import { site } from "../site.config";

export type SeoPageKey =
  | "home"
  | "contact"
  | "thankYou"
  | "tjanster"
  | "faq"
  | "om"
  | "privacy"
  | `service.${string}`;

export function resolveSeoPage(pathname: string): SeoPageKey {
  if (pathname === site.routes.thankYou) return "thankYou";
  if (pathname === site.routes.contact) return "contact";
  if (pathname === site.routes.about) return "om";
  if (pathname === site.routes.privacy) return "privacy";
  if (pathname === "/tjanster") return "tjanster";
  if (pathname === "/faq") return "faq";

  const serviceMatch = pathname.match(/^\/tjanster\/([^/]+)$/);
  if (serviceMatch && isServiceSlug(serviceMatch[1])) {
    return `service.${serviceMatch[1]}`;
  }

  return "home";
}

export function seoTranslationKeys(pathname: string): {
  titleKey: string;
  descriptionKey: string;
} {
  const page = resolveSeoPage(pathname);

  if (page.startsWith("service.")) {
    const slug = page.slice("service.".length);
    return {
      titleKey: `seo.services.${slug}.title`,
      descriptionKey: `seo.services.${slug}.description`,
    };
  }

  return {
    titleKey: `seo.${page}.title`,
    descriptionKey: `seo.${page}.description`,
  };
}
