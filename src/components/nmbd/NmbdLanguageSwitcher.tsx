"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { useTranslation } from "@/lib/i18n";

function GlobeIcon() {
  return (
    <svg
      className="nmbd-lang-icon"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

export function NmbdLanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();
  const { t } = useTranslation();
  const nextLabel =
    language === "sv" ? t("lang.switchToEn") : t("lang.switchToSv");
  const badge = language === "sv" ? t("lang.currentEn") : t("lang.currentSv");

  return (
    <button
      type="button"
      className="nmbd-lang-switch"
      onClick={toggleLanguage}
      aria-label={nextLabel}
      title={nextLabel}
    >
      <GlobeIcon />
      <span className="nmbd-lang-badge">{badge}</span>
    </button>
  );
}
