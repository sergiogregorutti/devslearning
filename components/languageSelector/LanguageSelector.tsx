import Link from "next/link";

interface LanguageSelectorProps {
  dictionary: { [key: string]: any };
  lang: string;
}

import "./styles.css";

export default function LanguageSelector({
  dictionary,
  lang,
}: LanguageSelectorProps) {
  return (
    <div className="language-selector">
      <Link href="/" className={lang === "en" ? "active" : ""}>
        {dictionary.header.language.english}
      </Link>
      <Link href="/es/" className={lang === "es" ? "active" : ""}>
        {dictionary.header.language.spanish}
      </Link>
    </div>
  );
}
