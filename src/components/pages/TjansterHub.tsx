"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { PageHero } from "@/components/nmbd/PageHero";
import { SERVICES, siteRoutes } from "@/lib/services-config";
import { imagePath } from "@/lib/images";
import { useTranslation } from "@/lib/i18n";

export default function TjansterHub() {
  const { t } = useTranslation();

  return (
    <>
      <PageHero
        eyebrow={t("pages.tjanster.eyebrow")}
        title={t("pages.tjanster.title")}
        lede={t("pages.tjanster.intro")}
        image="svc-tradgard.jpg"
      />

      <div className="page">
        <section className="section" aria-label={t("nav.services")}>
          <div className="section-header">
            <div className="section-header-left">
              <p className="nmbd-eyebrow">{t("nmbd.services.eyebrow")}</p>
              <h2>{t("nmbd.services.heading")}</h2>
            </div>
            <p className="section-header-intro">{t("nmbd.services.intro")}</p>
          </div>

          <div className="hub-grid services-grid">
            {SERVICES.map((service, index) => (
              <Link
                key={service.slug}
                href={siteRoutes.service(service.slug)}
                className="hub-card service-card"
              >
                <div className="hub-card-media service-media">
                  <img
                    src={imagePath(service.image)}
                    alt={t(`pages.services.${service.localeKey}.title`)}
                    className="service-img"
                    loading="lazy"
                  />
                  <div className="hub-card-scrim" aria-hidden="true" />
                  <div className="hub-card-caption">
                    <span className="hub-card-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="hub-card-title service-title">
                      {t(`pages.services.${service.localeKey}.title`)}
                    </h3>
                    <FaArrowRight className="service-cta-arrow hub-card-arrow" aria-hidden />
                  </div>
                </div>
                <div className="hub-card-body">
                  <p>{t(`pages.services.${service.localeKey}.summary`)}</p>
                  <span className="hub-card-link">{t("pages.tjanster.viewService")}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="section prose-block">
          <p>{t("pages.tjanster.outro")}</p>
          <div className="service-cta">
            <Link href="/faq" className="button">
              {t("pages.tjanster.faqLink")}
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
