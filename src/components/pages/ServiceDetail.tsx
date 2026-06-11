"use client";

import Link from "next/link";
import type { ServiceConfig } from "@/lib/services-config";
import { siteRoutes } from "@/lib/services-config";
import { PageHero } from "@/components/nmbd/PageHero";
import { useTranslation } from "@/lib/i18n";
import { site } from "@/site.config";

type ServiceDetailProps = {
  service: ServiceConfig;
};

export default function ServiceDetail({ service }: ServiceDetailProps) {
  const { t } = useTranslation();
  const key = service.localeKey;
  const body = t(`pages.services.${key}.body`, {
    returnObjects: true,
  }) as string[];
  const bullets = t(`pages.services.${key}.bullets`, {
    returnObjects: true,
  }) as string[];

  return (
    <>
      <PageHero
        eyebrow={
          <Link href={siteRoutes.servicesHub}>{t("pages.tjanster.eyebrow")}</Link>
        }
        title={t(`pages.services.${key}.title`)}
        lede={t(`pages.services.${key}.intro`)}
        image={service.image}
      />

      <div className="page">
        <section className="section prose-block">
          <h2>{t("pages.servicesShared.detailsHeading")}</h2>
          {body.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
          {bullets.length > 0 && (
            <>
              <h3>{t("pages.servicesShared.includesHeading")}</h3>
              <ul className="service-bullets">
                {bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          )}
        </section>

        <section className="section service-cta">
          <Link href={site.routes.contact} className="button primary">
            {t(`pages.services.${key}.cta`)}
          </Link>
          <Link href={siteRoutes.servicesHub} className="button">
            {t("pages.services.backToHub")}
          </Link>
        </section>
      </div>
    </>
  );
}
