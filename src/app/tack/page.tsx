import type { Metadata } from "next";
import TackPage from "@/components/pages/TackPage";
import { buildMetadata } from "@/lib/seo";
import sv from "@/locales/sv.json";
import { site } from "@/site.config";

export const metadata: Metadata = {
  ...buildMetadata({
    title: sv.seo.thankYou.title,
    description: sv.seo.thankYou.description,
    path: site.routes.thankYou,
    lang: site.defaultLanguage,
  }),
  robots: {
    index: false,
    follow: false,
  },
};

export default function TackRoute() {
  return <TackPage />;
}
