"use client";

import React, { useState } from "react";
import Link from "next/link";
import LanguageSelector from "@/components/common/LanguageSelector";
import { getLocalizedPathFromPrefix } from "@/lib/language";
import Image from "next/image";
import { FaBars } from "react-icons/fa6";
import Container from "@/components/layout/Container";

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
      <Container>
        <div className="content">
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
                <Link
                  href={getLocalizedPathFromPrefix(lang, `/courses`)}
                  className="text-white text-lg py-[5px] px-[20px] hover:bg-blue-600 rounded-full focus:outline-none transition-all duration-500"
                >
                  {dictionary.header.navigation.courses}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedPathFromPrefix(lang, `/technologies`)}
                  className="text-white text-lg py-[5px] px-[20px] hover:bg-blue-600 rounded-full focus:outline-none transition-all duration-500"
                >
                  {dictionary.header.navigation.technologies}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedPathFromPrefix(lang, `/roadmaps`)}
                  className="text-white text-lg py-[5px] px-[20px] hover:bg-blue-600 rounded-full focus:outline-none transition-all duration-500"
                >
                  {dictionary.header.navigation.roadmaps}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedPathFromPrefix(lang, `/about`)}
                  className="text-white text-lg py-[5px] px-[20px] hover:bg-blue-600 rounded-full focus:outline-none transition-all duration-500"
                >
                  {dictionary.header.navigation.about}
                </Link>
              </li>
            </ul>
          </div>
          <div className="right">
            <LanguageSelector dictionary={dictionary} lang={lang} />
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

        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <FaBars />
        </button>

        <div className={`mobile-menu ${showMobileMenu ? "open" : ""}`}>
          <div className="mobile-menu-content">
            <div className="close-container">
              <button className="btn-close" onClick={toggleMobileMenu}>
                <Image
                  src="/assets/icons/close.svg"
                  width={40}
                  height={40}
                  alt="Close"
                />
              </button>
            </div>
            <div className="mobile-menu-content-wrapper">
              <div className="logo-container">
                <Link href={getLocalizedPathFromPrefix(lang, `/`)}>
                  <Image
                    src="/assets/logo.svg"
                    width={136}
                    height={40}
                    alt="Devs Learning"
                    onClick={toggleMobileMenu}
                    className="mobile-menu-logo"
                  />
                </Link>
              </div>
              <ul className="menu">
                <li className="item" onClick={toggleMobileMenu}>
                  <Link href={getLocalizedPathFromPrefix(lang, `/`)}>
                    {dictionary.header.navigation.home}
                  </Link>
                </li>
                <li className="item" onClick={toggleMobileMenu}>
                  <Link href={getLocalizedPathFromPrefix(lang, `/courses`)}>
                    {dictionary.header.navigation.courses}
                  </Link>
                </li>
                <li className="item" onClick={toggleMobileMenu}>
                  <Link
                    href={getLocalizedPathFromPrefix(lang, `/technologies`)}
                  >
                    {dictionary.header.navigation.technologies}
                  </Link>
                </li>
                <li className="item" onClick={toggleMobileMenu}>
                  <Link href={getLocalizedPathFromPrefix(lang, `/roadmaps`)}>
                    {dictionary.header.navigation.roadmaps}
                  </Link>
                </li>
                <li className="item" onClick={toggleMobileMenu}>
                  <Link href={getLocalizedPathFromPrefix(lang, `/about`)}>
                    {dictionary.header.navigation.about}
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
      </Container>
    </header>
  );
};

export default Header;
