"use client";

import Link from "next/link";
import { PageHero } from "@/components/nmbd/PageHero";
import { useTranslation } from "@/lib/i18n";
import { nap, formatOrgNumber } from "@/lib/site-nap";
import { site } from "@/site.config";

export default function PrivacyPage() {
  const { t } = useTranslation();
  const sections = t("pages.privacy.sections", {
    returnObjects: true,
  }) as Array<{ title: string; body: string }>;

  return (
    <>
      <PageHero
        eyebrow={t("pages.privacy.eyebrow")}
        title={t("pages.privacy.title")}
        lede={t("pages.privacy.intro")}
        image="hero-villa.jpg"
      />

      <div className="page">
        <section className="section prose-block">
          <dl className="fact-list">
            <div>
              <dt>{t("pages.privacy.controller")}</dt>
              <dd>
                {nap.legalName} ({formatOrgNumber(nap.orgNumber)})
              </dd>
            </div>
            <div>
              <dt>{t("pages.privacy.contact")}</dt>
              <dd>
                <a href={`mailto:${site.email}`}>{site.email}</a>
                {" · "}
                <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
              </dd>
            </div>
          </dl>
        </section>

        {sections.map((section) => (
          <section key={section.title} className="section prose-block">
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </section>
        ))}

        <section className="section service-cta">
          <Link href={site.routes.contact} className="button primary">
            {t("nav.contact")}
          </Link>
          <Link href={site.routes.about} className="button">
            {t("nav.about")}
          </Link>
        </section>
      </div>
    </>
  );
}
