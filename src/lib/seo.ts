import type { Metadata } from "next";
import { site, type Language } from "../site.config";
import { buildJsonLd } from "./schema-graph";

export const SITE_ORIGIN = site.origin;
export const SITE_NAME = site.name;
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/og-image.svg`;

export type SeoConfig = {
  title: string;
  description: string;
  path: string;
  lang: Language;
  image?: string;
  jsonLd?: Record<string, unknown>;
};

function buildPageUrl(path: string): string {
  return path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`;
}

export { buildJsonLd };

export function buildMetadata({
  title,
  description,
  path,
  lang = site.defaultLanguage,
  image = DEFAULT_OG_IMAGE,
}: SeoConfig): Metadata {
  const url = buildPageUrl(path);

  return {
    title,
    description,
    metadataBase: new URL(SITE_ORIGIN),
    applicationName: site.shortName,
    authors: [{ name: SITE_NAME, url: SITE_ORIGIN }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: url,
      languages: {
        "sv-SE": url,
        "en-US": url,
      },
    },
    icons: {
      icon: [
        { url: "/icons/favicon48.png", type: "image/png", sizes: "48x48" },
        { url: "/favicon.ico", sizes: "48x48" },
        { url: "/icons/favicon32.png", type: "image/png", sizes: "32x32" },
        { url: "/icons/favicon192.png", type: "image/png", sizes: "192x192" },
      ],
      shortcut: "/favicon.ico",
      apple: "/icons/favicon192.png",
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url,
      locale: lang === "sv" ? "sv_SE" : "en_US",
      alternateLocale: lang === "sv" ? ["en_US"] : ["sv_SE"],
      images: [{ url: image, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

function upsertMeta(
  attr: "name" | "property",
  key: string,
  content: string,
): void {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string): void {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertJsonLd(jsonLd: Record<string, unknown>): void {
  let script = document.getElementById(
    site.jsonLdScriptId,
  ) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.id = site.jsonLdScriptId;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(jsonLd);
}

/** Client-side SEO updates when language or route changes. */
export function applySeo({
  title,
  description,
  path,
  lang,
  image = DEFAULT_OG_IMAGE,
  jsonLd,
}: SeoConfig): void {
  const url = buildPageUrl(path);

  document.title = title;
  document.documentElement.lang = lang;

  upsertMeta("name", "description", description);
  const indexable = path !== site.routes.thankYou;
  upsertMeta("name", "robots", indexable ? "index, follow" : "noindex, nofollow");
  upsertLink("canonical", url);
  upsertMeta("property", "og:type", "website");
  upsertMeta("property", "og:site_name", SITE_NAME);
  upsertMeta("property", "og:title", title);
  upsertMeta("property", "og:description", description);
  upsertMeta("property", "og:url", url);
  upsertMeta("property", "og:locale", lang === "sv" ? "sv_SE" : "en_US");
  upsertMeta("property", "og:image", image);
  upsertMeta("name", "twitter:card", "summary_large_image");
  upsertMeta("name", "twitter:title", title);
  upsertMeta("name", "twitter:description", description);
  upsertMeta("name", "twitter:image", image);

  upsertJsonLd(jsonLd ?? buildJsonLd(description, lang));
}
