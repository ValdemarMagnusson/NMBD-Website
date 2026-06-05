"use client";

import { LanguageProvider } from "../hooks/useLanguage";
import "../lib/i18n";
import { AppShell } from "./AppShell";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <AppShell>{children}</AppShell>
    </LanguageProvider>
  );
}
