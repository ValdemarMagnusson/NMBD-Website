"use client";

import Link from "next/link";
import { PageHero } from "@/components/nmbd/PageHero";
import { useTranslation } from "@/lib/i18n";
import { siteRoutes } from "@/lib/services-config";
import { site } from "@/site.config";

type FaqItem = { q: string; a: string };

function slugifyQuestion(question: string): string {
  return question
    .toLowerCase()
    .replace(/[^a-z0-9åäö]+/gi, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

export default function FaqPage() {
  const { t } = useTranslation();
  const items = t("pages.faq.items", { returnObjects: true }) as FaqItem[];

  return (
    <>
      <PageHero
        eyebrow={t("pages.faq.eyebrow")}
        title={t("pages.faq.title")}
        lede={t("pages.faq.intro")}
        image="svc-stenlaggning.jpg"
      />

      <div className="page">
        <nav className="faq-toc" aria-label={t("pages.faq.tocLabel")}>
          <p className="nmbd-eyebrow nmbd-eyebrow--compact">
            {t("pages.faq.tocLabel")}
          </p>
          <ul>
            {items.map((item) => (
              <li key={item.q}>
                <a href={`#${slugifyQuestion(item.q)}`}>{item.q}</a>
              </li>
            ))}
          </ul>
        </nav>

        <section
          className="section faq-list"
          itemScope
          itemType="https://schema.org/FAQPage"
        >
          {items.map((item) => (
            <article
              key={item.q}
              id={slugifyQuestion(item.q)}
              className="faq-item-open"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <h2 itemProp="name">{item.q}</h2>
              <div
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
              >
                <p itemProp="text">{item.a}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="section service-cta">
          <Link href={site.routes.contact} className="button primary">
            {t("pages.faq.cta")}
          </Link>
          <Link href={siteRoutes.servicesHub} className="button">
            {t("pages.faq.servicesLink")}
          </Link>
        </section>
      </div>
    </>
  );
}
