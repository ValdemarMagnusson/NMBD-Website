"use client";

import Link from "next/link";
import { PageHero } from "@/components/nmbd/PageHero";
import { TEAM_MEMBERS } from "@/lib/team-schema";
import { useTranslation } from "@/lib/i18n";
import { formatOrgNumber, nap } from "@/lib/site-nap";
import { siteRoutes } from "@/lib/services-config";
import { site } from "@/site.config";

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <>
      <PageHero
        eyebrow={t("pages.om.eyebrow")}
        title={t("pages.om.title")}
        lede={t("pages.om.intro")}
        image="svc-murning.jpg"
      />

      <div className="page">
        <section className="section prose-block">
          <h2>{t("pages.om.companyHeading")}</h2>
          <p>{t("pages.om.companyBody")}</p>
          <dl className="fact-list">
            <div>
              <dt>{t("pages.om.facts.legalName")}</dt>
              <dd>{nap.legalName}</dd>
            </div>
            <div>
              <dt>{t("pages.om.facts.orgNumber")}</dt>
              <dd>{formatOrgNumber(nap.orgNumber)}</dd>
            </div>
            <div>
              <dt>{t("pages.om.facts.founded")}</dt>
              <dd>{t("pages.om.facts.foundedValue", { year: site.foundedYear })}</dd>
            </div>
            <div>
              <dt>{t("pages.om.facts.serviceArea")}</dt>
              <dd>{t("footer.locationValue")}</dd>
            </div>
          </dl>
        </section>

        <section className="section">
          <h2>{t("pages.om.teamHeading")}</h2>
          <p className="lede">{t("pages.om.teamIntro")}</p>
          <div className="team-grid">
            {TEAM_MEMBERS.map((member) => (
              <article key={member.id} className="team-card">
                {member.image && (
                  <img
                    src={member.image}
                    alt={t(`team.members.${member.localeKey}.imageAlt`)}
                    className="team-photo"
                  />
                )}
                <h3>{t(`team.members.${member.localeKey}.name`)}</h3>
                <p className="team-role">{t(`team.members.${member.localeKey}.jobTitle`)}</p>
                <p>{t(`team.members.${member.localeKey}.bio`)}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section prose-block">
          <h2>{t("pages.om.trustHeading")}</h2>
          <ul className="service-bullets">
            {(t("pages.om.trustPoints", { returnObjects: true }) as string[]).map(
              (point) => (
                <li key={point}>{point}</li>
              ),
            )}
          </ul>
        </section>

        <section className="section service-cta">
          <Link href={site.routes.contact} className="button primary">
            {t("pages.om.cta")}
          </Link>
          <Link href={siteRoutes.faq} className="button">
            {t("nav.faq")}
          </Link>
          <Link href={site.routes.privacy} className="button">
            {t("pages.om.privacyLink")}
          </Link>
        </section>
      </div>
    </>
  );
}
