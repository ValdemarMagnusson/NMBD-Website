import { site } from "@/site.config";

export type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

export type ContactMailLabels = {
  subject: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

export async function submitContactForm(
  formData: ContactFormData,
  labels: ContactMailLabels,
): Promise<{ success: true; data: Record<string, never> }> {
  const subject = encodeURIComponent(labels.subject);
  const body = encodeURIComponent(
    [
      `${labels.name}: ${formData.name}`,
      `${labels.email}: ${formData.email}`,
      `${labels.phone}: ${formData.phone || "-"}`,
      `${labels.service}: ${formData.service}`,
      "",
      `${labels.message}:`,
      formData.message,
    ].join("\n"),
  );

  window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  return { success: true, data: {} };
}
