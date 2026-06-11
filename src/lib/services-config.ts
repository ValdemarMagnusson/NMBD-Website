/** Shared service slugs, paths and locale keys for nav, footer and SEO. */

export const SERVICE_SLUGS = [
  "stenlaggning",
  "betongplattor",
  "tradgardsdesign",
  "murning",
  "total-renovering",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export type ServiceConfig = {
  slug: ServiceSlug;
  /** Locale key under `pages.services.*` and `seo.services.*` */
  localeKey: ServiceSlug;
  /** Maps to legacy homepage service card id in `nmbd.services.items` */
  serviceId: number;
  image: string;
};

export const SERVICES: readonly ServiceConfig[] = [
  {
    slug: "stenlaggning",
    localeKey: "stenlaggning",
    serviceId: 1,
    image: "svc-stenlaggning.jpg",
  },
  {
    slug: "betongplattor",
    localeKey: "betongplattor",
    serviceId: 2,
    image: "svc-betong.jpg",
  },
  {
    slug: "tradgardsdesign",
    localeKey: "tradgardsdesign",
    serviceId: 3,
    image: "svc-tradgard.jpg",
  },
  {
    slug: "murning",
    localeKey: "murning",
    serviceId: 4,
    image: "svc-murning.jpg",
  },
  {
    slug: "total-renovering",
    localeKey: "total-renovering",
    serviceId: 5,
    image: "svc-renovering.jpg",
  },
] as const;

export const siteRoutes = {
  servicesHub: "/tjanster",
  faq: "/faq",
  service: (slug: ServiceSlug) => `/tjanster/${slug}`,
} as const;

export function isServiceSlug(value: string): value is ServiceSlug {
  return (SERVICE_SLUGS as readonly string[]).includes(value);
}

export function getServiceBySlug(slug: string): ServiceConfig | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

export function getServiceById(id: number): ServiceConfig | undefined {
  return SERVICES.find((service) => service.serviceId === id);
}
