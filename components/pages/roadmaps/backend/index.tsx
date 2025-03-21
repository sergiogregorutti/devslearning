"use client";

import { useLanguage } from "@/components/context/LanguageContext";
import dynamic from "next/dynamic";
import { ComponentType } from "react";

const English = dynamic(() => import("./en"));
const Spanish = dynamic(() => import("./es"));

type Language = "en" | "es";

export default function Backend() {
  const { lang } = useLanguage();
  const languageComponents: Record<Language, ComponentType<{}>> = {
    en: English,
    es: Spanish,
  };

  const SelectedComponent = languageComponents[lang as Language] || English;

  return <SelectedComponent />;
}
