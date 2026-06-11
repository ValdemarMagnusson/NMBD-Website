/**
 * Site-wide constants — update these first when starting a new client project.
 */
export const site = {
  name: "Nordiska Mark, Bygg & Design AB",
  shortName: "NMBD",
  origin:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://nmbd.se",
  email: "info@nmbd.se",
  phone: "08-400 654 70",
  themeColor: "#233503",
  languageStorageKey: "nmbd_language",
  jsonLdScriptId: "nmbd-jsonld",
  defaultLanguage: "sv" as const,
  routes: {
    contact: "/kontakt",
    servicesHub: "/tjanster",
    faq: "/faq",
    about: "/om",
    privacy: "/integritetspolicy",
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
  foundedYear: 2021,
} as const;

export type Language = "sv" | "en";
