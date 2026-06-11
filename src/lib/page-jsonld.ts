import type { TFunction } from "i18next";
import { isServiceSlug } from "./services-config";
import {
  buildPageJsonLd,
  type FaqItem,
  type PageJsonLdInput,
} from "./schema-graph";
import { TEAM_MEMBERS } from "./team-schema";
import { resolveSeoPage, seoTranslationKeys } from "./page-seo-map";
import { site, type Language } from "../site.config";

function getTeamMembers(t: TFunction): PageJsonLdInput["teamMembers"] {
  return TEAM_MEMBERS.map((member) => ({
    name: t(`team.members.${member.localeKey}.name`),
    jobTitle: t(`team.members.${member.localeKey}.jobTitle`),
    bio: t(`team.members.${member.localeKey}.bio`),
    image: member.image,
  }));
}

export function buildJsonLdForRoute(
  pathname: string,
  lang: Language,
  t: TFunction,
): ReturnType<typeof buildPageJsonLd> {
  const page = resolveSeoPage(pathname);
  const { descriptionKey } = seoTranslationKeys(pathname);
  const description = t(descriptionKey);

  const input: PageJsonLdInput = {
    path: pathname,
    description,
    lang,
  };

  if (page === "faq") {
    input.faqItems = t("pages.faq.items", { returnObjects: true }) as FaqItem[];
  }

  if (page.startsWith("service.")) {
    const slug = page.slice("service.".length);
    if (isServiceSlug(slug)) {
      input.service = {
        slug,
        name: t(`pages.services.${slug}.title`),
        description: t(`seo.services.${slug}.description`),
      };
    }
  }

  if (pathname === site.routes.about) {
    input.teamMembers = getTeamMembers(t);
  }

  return buildPageJsonLd(input);
}
