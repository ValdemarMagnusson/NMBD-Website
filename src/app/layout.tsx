import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Providers } from "@/components/Providers";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/site.config";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600"],
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  ...buildMetadata({
    title: `${site.name} — Stenläggning, trädgårdsdesign & markarbeten`,
    description:
      "Nordiska Mark, Bygg & Design AB skapar hållbara utemiljöer med stenläggning, murning, trädgårdsdesign och total renovering i Stockholmsområdet.",
    path: "/",
  }),
  applicationName: site.name,
  authors: [{ name: site.name }],
};

export const viewport: Viewport = {
  themeColor: site.themeColor,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={site.defaultLanguage} className={`${display.variable} ${sans.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
