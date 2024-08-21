"use client";
import Link from "next/link";
import LanguageSelector from "@/ui/site/languageSelector/LanguageSelector";
import { getLocalizedPathFromPrefix } from "@/lib/language";
import Image from "next/image";

import "./styles.css";

const Header = ({
  dictionary,
  lang,
  user,
}: {
  dictionary: { [key: string]: any };
  lang: string;
  user: any;
}) => {
  const isAuth = user ? user : false;

  return (
    <header>
      <div className="container">
        <h1>
          <Link href={getLocalizedPathFromPrefix(lang, `/`)}>
            <Image
              src="/assets/logo.svg"
              width={136}
              height={40}
              alt="Devs Learning"
            />
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
