import type { Metadata } from "next";
import { site, type Language } from "../site.config";

export const SITE_ORIGIN = site.origin;
export const SITE_NAME = site.name;
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/og-image.svg`;

export type SeoConfig = {
  title: string;
  description: string;
  path: string;
  lang: Language;
  image?: string;
};

function buildPageUrl(path: string): string {
  return path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`;
}

export function buildJsonLd(description: string, lang: Language) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${SITE_ORIGIN}/#business`,
        name: SITE_NAME,
        alternateName: site.shortName,
        url: SITE_ORIGIN,
        logo: `${SITE_ORIGIN}/favicon.ico`,
        image: DEFAULT_OG_IMAGE,
        email: site.email,
        telephone: site.phone,
        description,
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: site.location.address,
          addressLocality: site.location.city,
          addressRegion: site.location.region,
          addressCountry: site.location.country,
        },
        areaServed: [site.location.city, "Värmdö", "Stockholm", "Nacka"],
        knowsAbout: site.knowsAbout,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_ORIGIN}/#website`,
        name: site.shortName,
        alternateName: SITE_NAME,
        url: SITE_ORIGIN,
        publisher: { "@id": `${SITE_ORIGIN}/#business` },
        inLanguage: lang === "sv" ? ["sv", "en"] : ["en", "sv"],
      },
    ],
  };
}

export function buildMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
}: Omit<SeoConfig, "lang">): Metadata {
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
      locale: "sv_SE",
      alternateLocale: ["en_US"],
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

function upsertJsonLd(description: string, lang: Language): void {
  let script = document.getElementById(
    site.jsonLdScriptId,
  ) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.id = site.jsonLdScriptId;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(buildJsonLd(description, lang));
}

/** Client-side SEO updates when language or route changes. */
export function applySeo({
  title,
  description,
  path,
  lang,
  image = DEFAULT_OG_IMAGE,
}: SeoConfig): void {
  const url = buildPageUrl(path);

  document.title = title;
  document.documentElement.lang = lang;

  upsertMeta("name", "description", description);
  upsertMeta("name", "robots", "index, follow");
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

  upsertJsonLd(description, lang);
}
