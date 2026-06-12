import type { Metadata } from "next";
import KontaktPage from "@/components/pages/KontaktPage";
import { buildMetadata } from "@/lib/seo";
import sv from "@/locales/sv.json";
import { site } from "@/site.config";

export const metadata: Metadata = buildMetadata({
  title: sv.seo.contact.title,
  description: sv.seo.contact.description,
  path: "/kontakt",
  lang: site.defaultLanguage,
});

export default function KontaktRoute() {
  return <KontaktPage />;
}
