// import { getSession } from "@auth0/nextjs-auth0";
import Link from "next/link";
import LanguageSelector from "@/components/languageSelector/LanguageSelector";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { getLocalizedPathFromPrefix } from "@/lib/language";

import "./styles.css";

const Header = async ({ lang }: { lang: string }) => {
  // const session = await getSession();
  const dictionary = await getDictionary(lang);

  return (
    <header>
      <div className="container">
        <h1>
          <Link href={getLocalizedPathFromPrefix(lang, `/`)}>
            <img src="/assets/logo2024.svg" />
          </Link>
        </h1>
        <LanguageSelector dictionary={dictionary} lang={lang} />

        {/* 
        <a href="/api/auth/login">Login</a> |{" "}
        <a href="/api/auth/logout">Logout</a>
        {session && (
          <div>
            <img src={session.user.picture} alt={session.user.name} />
            <h2>{session.user.name}</h2>
            <p>{session.user.email}</p>
          </div>
        )}
        */}
      </div>
    </header>
  );
};

export default Header;
