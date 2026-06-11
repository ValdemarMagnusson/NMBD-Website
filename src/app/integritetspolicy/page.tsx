import type { Metadata } from "next";
import PrivacyPage from "@/components/pages/PrivacyPage";
import { buildMetadata } from "@/lib/seo";
import sv from "@/locales/sv.json";
import { site } from "@/site.config";

export const metadata: Metadata = buildMetadata({
  title: sv.seo.privacy.title,
  description: sv.seo.privacy.description,
  path: "/integritetspolicy",
  lang: site.defaultLanguage,
});

export default function IntegritetspolicyPage() {
  return <PrivacyPage />;
}
