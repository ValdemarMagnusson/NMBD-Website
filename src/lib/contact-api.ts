export type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  lang: "sv" | "en";
};

export type ContactSubmitResult =
  | { success: true }
  | { success: false; error: string; kind: "validation" | "generic" | "network" };

export async function submitContactForm(
  formData: ContactFormData,
): Promise<ContactSubmitResult> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = (await res.json().catch(() => null)) as {
      ok?: boolean;
      error?: string;
    } | null;

    if (!res.ok) {
      const validationError = res.status === 400 && data?.error;
      return {
        success: false,
        error: validationError ? data.error! : "",
        kind: validationError ? "validation" : "generic",
      };
    }

    return { success: true };
  } catch {
    return { success: false, error: "", kind: "network" };
  }
}
