import { useMemo } from "react";
import serviceData, { type Service } from "@/data/serviceData";
import { useTranslation } from "@/lib/i18n";

export type TranslatedService = Service & {
  title: string;
  description: string;
};

export function useServiceTranslations(): TranslatedService[] {
  const { t } = useTranslation();

  return useMemo(
    () =>
      serviceData.map((service) => ({
        ...service,
        title: t(`nmbd.services.items.${service.id}.title`),
        description: t(`nmbd.services.items.${service.id}.description`),
      })),
    [t],
  );
}

export function getServiceTitle(
  serviceId: number,
  t: (key: string) => string,
): string {
  return t(`nmbd.services.items.${serviceId}.title`);
}
