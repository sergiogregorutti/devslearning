"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCookie } from "@/lib/helpers";

interface LanguageSelectorProps {
  mobile?: boolean;
  dictionary: { [key: string]: any };
  lang: string;
}

import "./styles.css";

export default function LanguageSelector({
  mobile = false,
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
    <div className={`language-selector${mobile === true ? " mobile" : ""}`}>
      <Link
        href="/"
        className={lang === "en" ? "active" : ""}
        data-language="en"
        onClick={changeLanguage}
      >
        {dictionary.header.language.english}
      </Link>
      <Link
        href="/es/"
        className={lang === "es" ? "active" : ""}
        data-language="es"
        onClick={changeLanguage}
      >
        {dictionary.header.language.spanish}
      </Link>
    </div>
  );
}
