"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "./useLanguage";
import { useTranslation } from "../lib/i18n";
import { applySeo } from "../lib/seo";
import { resolveSeoPage } from "../lib/page-seo-map";

export function usePageSeo(): void {
  const pathname = usePathname();
  const { language } = useLanguage();
  const { t } = useTranslation();

  useEffect(() => {
    const page = resolveSeoPage(pathname);

    applySeo({
      title: t(`seo.${page}.title`),
      description: t(`seo.${page}.description`),
      path: pathname,
      lang: language,
    });
  }, [pathname, language, t]);
}
