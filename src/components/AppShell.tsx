"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { usePageSeo } from "../hooks/usePageSeo";
import { useTranslation } from "../lib/i18n";
import { site } from "../site.config";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { t } = useTranslation();
  usePageSeo();

  if (pathname === "/") {
    return <>{children}</>;
  }

  return (
    <div className={`layout${pathname === "/" ? "" : " offset"}`}>
      <header className="header">
        <Link href="/" className="logo">
          {site.shortName}
        </Link>
        <nav className="nav">
          <Link href="/" className={pathname === "/" ? "active" : undefined}>
            {t("nav.home")}
          </Link>
          <Link
            href={site.routes.contact}
            className={pathname === site.routes.contact ? "active" : undefined}
          >
            {t("nav.contact")}
          </Link>
          <LanguageSwitcher />
        </nav>
      </header>
      <main className="main">{children}</main>
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <p className="footer-label">{t("footer.contact")}</p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
          <div>
            <p className="footer-label">{t("footer.location")}</p>
            <p>{t("footer.locationValue")}</p>
          </div>
        </div>
        <p className="footer-meta">
          {t("footer.copyright", { year: new Date().getFullYear() })}
        </p>
      </footer>
    </div>
  );
}
