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
    <div
      className={`language-selector flex gap-3${
        mobile === true ? " mobile" : ""
      }`}
    >
      <Link
        href="/"
        className={`uppercase rounded-md px-3 py-1 ${
          lang === "en" ? "active bg-blue-500" : ""
        }`}
        data-language="en"
        onClick={changeLanguage}
      >
        {dictionary.header.language.english}
      </Link>
      <Link
        href="/es/"
        className={`uppercase rounded-md px-3 py-1 ${
          lang === "es" ? "active bg-blue-500" : ""
        }`}
        data-language="es"
        onClick={changeLanguage}
      >
        {dictionary.header.language.spanish}
      </Link>
    </div>
  );
}
