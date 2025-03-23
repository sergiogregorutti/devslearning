"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCookie } from "@/lib/helpers";

interface LanguageSelectorProps {
  mobile?: boolean;
  dictionary: { [key: string]: any };
  lang: string;
}

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
      className={`flex bg-blue-500 rounded-full p-[1px] ${
        mobile === true ? " mobile" : ""
      }`}
    >
      <Link
        href="/"
        className={`font-poppins uppercase text-xs rounded-l-full px-3 py-1 ${
          lang === "en"
            ? "bg-blue-500 text-white"
            : "bg-white text-neutral-500 hover:text-neutral-800"
        }`}
        data-language="en"
        onClick={changeLanguage}
      >
        {dictionary.header.language.english}
      </Link>
      <Link
        href="/es/"
        className={`font-poppins uppercase text-xs rounded-r-full px-3 py-1 ${
          lang === "es"
            ? "bg-blue-500 text-white"
            : "bg-white text-neutral-500 hover:text-neutral-800"
        }`}
        data-language="es"
        onClick={changeLanguage}
      >
        {dictionary.header.language.spanish}
      </Link>
    </div>
  );
}
