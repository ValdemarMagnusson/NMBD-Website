"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "./useLanguage";
import { useTranslation } from "../lib/i18n";
import { applySeo } from "../lib/seo";
import { buildJsonLdForRoute } from "../lib/page-jsonld";
import { seoTranslationKeys } from "../lib/page-seo-map";

export function usePageSeo(): void {
  const pathname = usePathname();
  const { language } = useLanguage();
  const { t } = useTranslation();

  useEffect(() => {
    const { titleKey, descriptionKey } = seoTranslationKeys(pathname);

    applySeo({
      title: t(titleKey),
      description: t(descriptionKey),
      path: pathname,
      lang: language,
      jsonLd: buildJsonLdForRoute(pathname, language, t),
    });
  }, [pathname, language, t]);
}
