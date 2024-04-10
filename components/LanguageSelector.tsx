import Link from "next/link";

interface LanguageSelectorProps {
  dictionary: { [key: string]: any };
}

export default function LanguageSelector({
  dictionary,
}: LanguageSelectorProps) {
  return (
    <div>
      <Link href="/">{dictionary.header.language.english}</Link> |{" "}
      <Link href="/es/">{dictionary.header.language.spanish}</Link>
    </div>
  );
}
