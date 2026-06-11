import type { Metadata } from "next";
import FaqPage from "@/components/pages/FaqPage";
import { buildMetadata } from "@/lib/seo";
import sv from "@/locales/sv.json";
import { site } from "@/site.config";

export const metadata: Metadata = buildMetadata({
  title: sv.seo.faq.title,
  description: sv.seo.faq.description,
  path: "/faq",
  lang: site.defaultLanguage,
});

export default function FaqRoute() {
  return <FaqPage />;
}
