import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetail from "@/components/pages/ServiceDetail";
import { buildMetadata } from "@/lib/seo";
import sv from "@/locales/sv.json";
import {
  SERVICE_SLUGS,
  getServiceBySlug,
  isServiceSlug,
  type ServiceSlug,
} from "@/lib/services-config";
import { site } from "@/site.config";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isServiceSlug(slug)) {
    return {};
  }

  const seo = sv.seo.services[slug as ServiceSlug];
  return buildMetadata({
    title: seo.title,
    description: seo.description,
    path: `/tjanster/${slug}`,
    lang: site.defaultLanguage,
  });
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetail service={service} />;
}
