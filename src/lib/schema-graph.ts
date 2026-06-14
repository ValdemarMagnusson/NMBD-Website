import type { Language } from "../site.config";
import { site } from "../site.config";
import { nap } from "./site-nap";
import {
  buildTeamPersonNodes,
  linkTeamToOrganization,
  type TeamMemberData,
} from "./team-schema";

const SITE_ORIGIN = site.origin;
const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/og-image.svg`;

export type FaqItem = { q: string; a: string };

export type ServiceSchemaInput = {
  slug: string;
  name: string;
  description: string;
};

export type PageJsonLdInput = {
  path: string;
  description: string;
  lang: Language;
  faqItems?: FaqItem[];
  service?: ServiceSchemaInput;
  teamMembers?: TeamMemberData[];
};

const AREA_SERVED = [
  site.location.city,
  "Värmdö",
  "Stockholm",
  "Nacka",
  "Tyresö",
  "Ingarö",
  "Saltsjö-Boo",
];

const KNOWS_ABOUT = [
  ...site.knowsAbout,
  "ROT-avdrag",
  "Dränering",
  "Uteplatser",
  "Uppfarter",
  "Stödmurar",
  "Utemiljö",
];

function pageUrl(path: string): string {
  return path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`;
}

function buildOrganizationNode(description: string): Record<string, unknown> {
  return {
    "@type": "Organization",
    "@id": `${SITE_ORIGIN}/#organization`,
    name: nap.displayName,
    legalName: nap.legalName,
    alternateName: site.name,
    url: SITE_ORIGIN,
    logo: `${SITE_ORIGIN}/icons/favicon192.png`,
    image: DEFAULT_OG_IMAGE,
    email: nap.email,
    telephone: nap.phone,
    taxID: nap.orgNumber,
    foundingDate: nap.foundingDate,
    sameAs: [...nap.sameAs],
    description,
    address: {
      "@type": "PostalAddress",
      ...nap.address,
    },
    knowsAbout: KNOWS_ABOUT,
  };
}

function buildProfessionalServiceNode(description: string): Record<string, unknown> {
  return {
    "@type": "ProfessionalService",
    "@id": `${SITE_ORIGIN}/#service`,
    name: site.name,
    url: SITE_ORIGIN,
    email: nap.email,
    telephone: nap.phone,
    image: DEFAULT_OG_IMAGE,
    description,
    priceRange: "$$",
    parentOrganization: { "@id": `${SITE_ORIGIN}/#organization` },
    address: {
      "@type": "PostalAddress",
      ...nap.address,
    },
    areaServed: AREA_SERVED,
    knowsAbout: KNOWS_ABOUT,
  };
}

function buildWebSiteNode(lang: Language): Record<string, unknown> {
  return {
    "@type": "WebSite",
    "@id": `${SITE_ORIGIN}/#website`,
    name: nap.displayName,
    alternateName: site.name,
    url: SITE_ORIGIN,
    publisher: { "@id": `${SITE_ORIGIN}/#organization` },
    inLanguage: lang === "sv" ? ["sv", "en"] : ["en", "sv"],
  };
}

export function buildFaqPageNode(
  items: FaqItem[],
  path: string,
): Record<string, unknown> {
  return {
    "@type": "FAQPage",
    "@id": `${pageUrl(path)}#faq`,
    url: pageUrl(path),
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function buildServiceNode(
  service: ServiceSchemaInput,
): Record<string, unknown> {
  const url = `${SITE_ORIGIN}/tjanster/${service.slug}`;
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: service.name,
    description: service.description,
    url,
    provider: { "@id": `${SITE_ORIGIN}/#organization` },
    areaServed: AREA_SERVED.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
  };
}

export function buildAboutPageNode(description: string): Record<string, unknown> {
  return {
    "@type": "AboutPage",
    "@id": `${SITE_ORIGIN}/om#about`,
    url: `${SITE_ORIGIN}/om`,
    name: site.name,
    description,
    isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
    about: { "@id": `${SITE_ORIGIN}/#organization` },
  };
}

export function buildPageJsonLd({
  path,
  description,
  lang,
  faqItems,
  service,
  teamMembers,
}: PageJsonLdInput): Record<string, unknown> {
  const graph: Record<string, unknown>[] = [
    buildOrganizationNode(description),
    buildProfessionalServiceNode(description),
    buildWebSiteNode(lang),
  ];

  if (faqItems && faqItems.length > 0) {
    graph.push(buildFaqPageNode(faqItems, path));
  }

  if (service) {
    graph.push(buildServiceNode(service));
  }

  if (teamMembers && teamMembers.length > 0) {
    const persons = buildTeamPersonNodes(teamMembers);
    graph.push(...persons);
    linkTeamToOrganization(graph, persons.length);
    graph.push(buildAboutPageNode(description));
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

/** Default graph for home and pages without route-specific schema. */
export function buildJsonLd(description: string, lang: Language) {
  return buildPageJsonLd({ path: "/", description, lang });
}
