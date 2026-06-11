"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import {
  formatOrgNumber,
  nap,
  registeredAddressLine,
} from "@/lib/site-nap";

type NapDetailsProps = {
  email?: string;
  showRegisteredAddress?: boolean;
};

export function NapDetails({
  email = nap.email,
  showRegisteredAddress = false,
}: NapDetailsProps) {
  const { t } = useTranslation();

  return (
    <div className="nap-details">
      <div className="nap-details-block">
        <p className="footer-label">{t("nap.email")}</p>
        <a href={`mailto:${email}`}>{email}</a>
      </div>
      <div className="nap-details-block">
        <p className="footer-label">{t("nap.phone")}</p>
        <a href={`tel:${nap.phone.replace(/\s/g, "")}`}>{nap.phone}</a>
      </div>
      {showRegisteredAddress ? (
        <div className="nap-details-block">
          <p className="footer-label">{t("nap.address")}</p>
          <p>{registeredAddressLine}</p>
        </div>
      ) : null}
      <div className="nap-details-block">
        <p className="footer-label">{t("nap.legalName")}</p>
        <p>{nap.legalName}</p>
        <p className="muted">
          {t("nap.orgNumber", { orgNumber: formatOrgNumber(nap.orgNumber) })}
        </p>
      </div>
      <p className="nap-details-parent">
        <Link href={nap.url}>{nap.url.replace("https://", "")}</Link>
      </p>
    </div>
  );
}
