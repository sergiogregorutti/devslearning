"use client";

import { useRouter } from "next/navigation";
import { setCookie } from "@/lib/helpers";

interface LanguageSelectorProps {
  dictionary: { [key: string]: any };
  lang: string;
}

import "./styles.css";

export default function LanguageSelector({
  dictionary,
  lang,
}: LanguageSelectorProps) {
  const router = useRouter();

  const changeLanguage = (event: any) => {
    event.preventDefault();
    const languageSelected = event.target.getAttribute("data-language");
    const href = event.target.getAttribute("href");

    if (languageSelected === lang) return false;

    setCookie("language", languageSelected);
    router.push(href);
  };

  return (
    <div className="language-selector">
      <a
        href="/"
        className={lang === "en" ? "active" : ""}
        data-language="en"
        onClick={changeLanguage}
      >
        {dictionary.header.language.english}
      </a>
      <a
        href="/es/"
        className={lang === "es" ? "active" : ""}
        data-language="es"
        onClick={changeLanguage}
      >
        {dictionary.header.language.spanish}
      </a>
    </div>
  );
}
