"use client";
import React, { useState } from "react";
import Link from "next/link";
import LanguageSelector from "@/ui/site/languageSelector/LanguageSelector";
import { getLocalizedPathFromPrefix } from "@/lib/language";
import Image from "next/image";
import { FaBars, FaXmark, FaCaretRight } from "react-icons/fa6";

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
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <header>
      <div className="container">
        <div className="left">
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
          <ul className="menu">
            <li>
              <Link href={getLocalizedPathFromPrefix(lang, `/technologies`)}>
                {dictionary.header.navigation.technologies}
              </Link>
            </li>
          </ul>
        </div>
        <div className="right">
          <LanguageSelector dictionary={dictionary} lang={lang} />
          <button className="menu-toggle" onClick={toggleMobileMenu}>
            <FaBars />
          </button>

          <div className={`mobile-menu ${showMobileMenu ? "open" : ""}`}>
            <div className="mobile-menu-content">
              <div className="close-container">
                <button className="btn-close" onClick={toggleMobileMenu}>
                  <FaXmark />
                </button>
              </div>
              <div className="mobile-menu-content-wrapper">
                <Link href={getLocalizedPathFromPrefix(lang, `/`)}>
                  <Image
                    src="/assets/logo_dark.svg"
                    width={136}
                    height={40}
                    alt="Devs Learning"
                    onClick={toggleMobileMenu}
                    className="mobile-menu-logo"
                  />
                </Link>
                <ul className="menu">
                  <li className="item" onClick={toggleMobileMenu}>
                    <Link
                      href={getLocalizedPathFromPrefix(lang, `/technologies`)}
                    >
                      {dictionary.header.navigation.technologies}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="language-selector-wrapper">
              <h3>{dictionary.header.navigation.language}</h3>
              <LanguageSelector
                mobile={true}
                dictionary={dictionary}
                lang={lang}
              />
            </div>
          </div>
        </div>

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
