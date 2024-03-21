import Link from "next/link";

export default function LanguageSelector() {
  return (
    <>
      <Link href="/">English</Link> | <Link href="/es/">Spanish</Link>
    </>
  );
}
