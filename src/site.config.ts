/**
 * Site-wide constants — update these first when starting a new client project.
 */
export const site = {
  name: "Nordiska Mark, Bygg & Design AB",
  shortName: "NMBD",
  origin: "https://nmbd.se",
  email: "info@nmbd.se",
  phone: "08-400 654 70",
  themeColor: "#233503",
  languageStorageKey: "nmbd_language",
  jsonLdScriptId: "nmbd-jsonld",
  defaultLanguage: "sv" as const,
  routes: {
    contact: "/contact",
  },
  location: {
    city: "Saltsjö-Boo",
    region: "Stockholms län",
    country: "SE",
    address: "Värmdövägen 643, 132 41 Saltsjö-Boo",
    label: {
      sv: "Saltsjö-Boo, Sverige",
      en: "Saltsjö-Boo, Sweden",
    },
  },
  knowsAbout: [
    "Stenläggning",
    "Betongplattor",
    "Trädgårdsdesign",
    "Murning",
    "Total renovering",
    "Markarbeten",
  ],
} as const;

export type Language = "sv" | "en";

export type SeoPageKey = "home" | "contact";

export function resolveSeoPage(pathname: string): SeoPageKey {
  return pathname === site.routes.contact ? "contact" : "home";
}
