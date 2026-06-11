import type { Metadata } from "next";
import TjansterHub from "@/components/pages/TjansterHub";
import { buildMetadata } from "@/lib/seo";
import sv from "@/locales/sv.json";
import { site } from "@/site.config";

export const metadata: Metadata = buildMetadata({
  title: sv.seo.tjanster.title,
  description: sv.seo.tjanster.description,
  path: "/tjanster",
  lang: site.defaultLanguage,
});

export default function TjansterPage() {
  return <TjansterHub />;
}
