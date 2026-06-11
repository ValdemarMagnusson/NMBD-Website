import type { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";
import { buildMetadata } from "@/lib/seo";
import sv from "@/locales/sv.json";
import { site } from "@/site.config";

export const metadata: Metadata = buildMetadata({
  title: sv.seo.om.title,
  description: sv.seo.om.description,
  path: "/om",
  lang: site.defaultLanguage,
});

export default function OmPage() {
  return <AboutPage />;
}
