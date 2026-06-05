"use client";

/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { setI18nLanguage } from "../lib/i18n";
import {
  LANGUAGE_STORAGE_KEY,
  readStoredLanguage,
} from "../lib/language-storage";
import { site, type Language } from "../site.config";

type LanguageContextValue = {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(site.defaultLanguage);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLanguageState(readStoredLanguage());
    setReady(true);
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === "sv" ? "en" : "sv");
  }, [language, setLanguage]);

  useEffect(() => {
    if (!ready) return;
    setI18nLanguage(language);
    document.documentElement.lang = language;
  }, [language, ready]);

  if (!ready) return null;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
