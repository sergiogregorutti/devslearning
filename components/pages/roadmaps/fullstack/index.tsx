import dynamic from "next/dynamic";
import { ComponentType } from "react";

const English = dynamic(() => import("./en"));
const Spanish = dynamic(() => import("./es"));

type Language = "en" | "es";

export default function Fullstack({ lang }: { lang: Language }) {
  const languageComponents: Record<Language, ComponentType<{}>> = {
    en: English,
    es: Spanish,
  };

  const SelectedComponent = languageComponents[lang] || English;

  return <SelectedComponent />;
}
