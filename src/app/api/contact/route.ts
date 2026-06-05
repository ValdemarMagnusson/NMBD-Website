import { NextResponse } from "next/server";

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
  lang?: string;
}

const MAX = {
  name: 120,
  email: 254,
  phone: 40,
  service: 120,
  message: 8000,
} as const;

type Lang = "en" | "sv";

const MSG: Record<Lang, Record<string, string>> = {
  sv: {
    name: "Ange ett namn.",
    email: "Ange en giltig e-postadress.",
    phone: "Telefonnumret är för långt.",
    service: "Välj en tjänst.",
    message: "Skriv ett meddelande.",
    messageTooLong: "Meddelandet är för långt.",
    serverError: "Något gick fel. Försök igen om en stund.",
    sendFailed: "Något gick fel. Försök igen om en stund.",
    subject: "Kontaktförfrågan från",
    nameLabel: "Namn",
    emailLabel: "E-post",
    phoneLabel: "Telefon",
    serviceLabel: "Tjänst",
    messageLabel: "Meddelande",
    heading: "Ny kontaktförfrågan",
    autoReplySubject: "Tack för ditt meddelande — NMBD",
    autoReplyText:
      "Hej {{name}},\n\nTack för att du hörde av dig till Nordiska Mark, Bygg & Design AB. Vi har tagit emot ditt meddelande och återkommer inom kort.\n\nMed vänliga hälsningar,\nNordiska Mark, Bygg & Design AB\ninfo@nmbd.se",
    autoReplyHtmlHeading: "Tack för ditt meddelande",
    autoReplyHtmlBody:
      "Hej {{name}},<br><br>Tack för att du hörde av dig till Nordiska Mark, Bygg & Design AB. Vi har tagit emot ditt meddelande och återkommer inom kort.<br><br>Med vänliga hälsningar,<br><strong>Nordiska Mark, Bygg & Design AB</strong><br><a href=\"mailto:info@nmbd.se\">info@nmbd.se</a>",
  },
  en: {
    name: "Please enter a name.",
    email: "Please enter a valid email address.",
    phone: "Phone number is too long.",
    service: "Please select a service.",
    message: "Please enter a message.",
    messageTooLong: "Message is too long.",
    serverError: "Something went wrong. Please try again shortly.",
    sendFailed: "Something went wrong. Please try again shortly.",
    subject: "Contact request from",
    nameLabel: "Name",
    emailLabel: "Email",
    phoneLabel: "Phone",
    serviceLabel: "Service",
    messageLabel: "Message",
    heading: "New contact request",
    autoReplySubject: "Thank you for your message — NMBD",
    autoReplyText:
      "Hi {{name}},\n\nThank you for contacting Nordiska Mark, Bygg & Design AB. We have received your message and will get back to you shortly.\n\nBest regards,\nNordiska Mark, Bygg & Design AB\ninfo@nmbd.se",
    autoReplyHtmlHeading: "Thank you for your message",
    autoReplyHtmlBody:
      "Hi {{name}},<br><br>Thank you for contacting Nordiska Mark, Bygg & Design AB. We have received your message and will get back to you shortly.<br><br>Best regards,<br><strong>Nordiska Mark, Bygg & Design AB</strong><br><a href=\"mailto:info@nmbd.se\">info@nmbd.se</a>",
  },
};

function resolveLang(raw: unknown): Lang {
  return raw === "en" ? "en" : "sv";
}

function json(data: unknown, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: { "cache-control": "no-store" },
  });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function fillTemplate(template: string, name: string) {
  return template.replaceAll("{{name}}", name);
}

async function sendResendEmail(
  apiKey: string,
  payload: Record<string, unknown>,
): Promise<Response> {
  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

export async function POST(request: Request) {
  if (
    request.headers.get("content-type")?.split(";")[0]?.trim() !==
    "application/json"
  ) {
    console.error("Contact API: invalid Content-Type");
    return json({ ok: false, error: MSG.sv.serverError }, 415);
  }

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    console.error("Contact API: invalid JSON body");
    return json({ ok: false, error: MSG.sv.serverError }, 400);
  }

  const lang = resolveLang(body.lang);
  const m = MSG[lang];

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const service = typeof body.service === "string" ? body.service.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || name.length > MAX.name) {
    return json({ ok: false, error: m.name }, 400);
  }
  if (!email || email.length > MAX.email || !email.includes("@")) {
    return json({ ok: false, error: m.email }, 400);
  }
  if (phone.length > MAX.phone) {
    return json({ ok: false, error: m.phone }, 400);
  }
  if (!service || service.length > MAX.service) {
    return json({ ok: false, error: m.service }, 400);
  }
  if (!message) {
    return json({ ok: false, error: m.message }, 400);
  }
  if (message.length > MAX.message) {
    return json({ ok: false, error: m.messageTooLong }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const from =
    process.env.CONTACT_FROM_EMAIL?.trim() ||
    "Nordiska Mark, Bygg & Design AB <info@nmbd.se>";

  if (!apiKey || !to) {
    console.error("Contact API: missing RESEND_API_KEY or CONTACT_TO_EMAIL");
    return json({ ok: false, error: m.serverError }, 503);
  }

  const subject = `${m.subject} ${name}`;
  const text = [
    `${m.nameLabel}: ${name}`,
    `${m.emailLabel}: ${email}`,
    phone ? `${m.phoneLabel}: ${phone}` : null,
    `${m.serviceLabel}: ${service}`,
    "",
    `${m.messageLabel}:`,
    message,
  ]
    .filter((value) => value !== null)
    .join("\n");

  const html = `
    <h2>${escapeHtml(m.heading)}</h2>
    <table style="border-collapse:collapse;font-family:system-ui,sans-serif">
      <tr><td style="padding:4px 12px 4px 0"><strong>${escapeHtml(m.nameLabel)}</strong></td><td>${escapeHtml(name)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0"><strong>${escapeHtml(m.emailLabel)}</strong></td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
      ${
        phone
          ? `<tr><td style="padding:4px 12px 4px 0"><strong>${escapeHtml(m.phoneLabel)}</strong></td><td><a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></td></tr>`
          : ""
      }
      <tr><td style="padding:4px 12px 4px 0"><strong>${escapeHtml(m.serviceLabel)}</strong></td><td>${escapeHtml(service)}</td></tr>
    </table>
    <p style="margin-top:16px"><strong>${escapeHtml(m.messageLabel)}:</strong></p>
    <pre style="white-space:pre-wrap;font-family:system-ui,sans-serif;background:#f6f4ef;padding:12px;border-radius:8px">${escapeHtml(
      message,
    )}</pre>
  `;

  const inquiry = await sendResendEmail(apiKey, {
    from,
    to: [to],
    reply_to: email,
    subject,
    text,
    html,
  });

  if (!inquiry.ok) {
    const errText = await inquiry.text().catch(() => "");
    console.error("Resend inquiry error", inquiry.status, errText);
    return json({ ok: false, error: m.sendFailed }, 502);
  }

  const autoReplyText = fillTemplate(m.autoReplyText, name);
  const autoReplyHtmlBody = fillTemplate(m.autoReplyHtmlBody, escapeHtml(name));
  const autoReply = await sendResendEmail(apiKey, {
    from,
    to: [email],
    subject: m.autoReplySubject,
    text: autoReplyText,
    html: `<h2>${escapeHtml(m.autoReplyHtmlHeading)}</h2><p style="font-family:system-ui,sans-serif;line-height:1.6">${autoReplyHtmlBody}</p>`,
  });

  if (!autoReply.ok) {
    const errText = await autoReply.text().catch(() => "");
    console.error("Resend auto-reply error", autoReply.status, errText);
  }

  return json({ ok: true });
}
