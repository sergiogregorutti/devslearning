"use client";

import { createContext, useContext } from "react";

interface LanguageContextType {
  lang: string;
  dictionary: any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({
  lang,
  dictionary,
  children,
}: {
  lang: string;
  dictionary: any;
  children: React.ReactNode;
}) {
  return (
    <LanguageContext.Provider value={{ lang, dictionary }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
