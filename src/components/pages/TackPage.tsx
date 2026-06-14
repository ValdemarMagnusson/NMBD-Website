"use client";

import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import { PageHero } from "@/components/nmbd/PageHero";
import { useTranslation } from "@/lib/i18n";
import { site } from "@/site.config";

export default function TackPage() {
  const { t } = useTranslation();

  return (
    <>
      <PageHero
        eyebrow={t("pages.thankYou.eyebrow")}
        title={t("pages.thankYou.title")}
        image="hero-villa.jpg"
      />

      <div className="page">
        <section className="section prose-block">
          <p className="thank-you-lede">
            <FaCheckCircle aria-hidden="true" />
            {t("pages.thankYou.lede")}
          </p>
          <p>{t("pages.thankYou.body")}</p>
        </section>

        <section className="section service-cta">
          <Link href="/" className="button primary">
            {t("pages.thankYou.backHome")}
          </Link>
          <Link href={site.routes.servicesHub} className="button">
            {t("nav.services")}
          </Link>
        </section>
      </div>
    </>
  );
}
