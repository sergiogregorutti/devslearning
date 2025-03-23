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
    <header className="sticky h-[60px] bg-white drop-shadow-sm top-[0] z-[9999]">
      <Container>
        <div className="flex h-[60px] justify-center xl:justify-between">
          <div className="flex">
            <h1 className="m-0">
              <Link
                className="relative inline-block m-[10px_0]"
                href={getLocalizedPathFromPrefix(lang, `/`)}
              >
                <Image
                  src="/assets/logo_dark.svg"
                  width={136}
                  height={40}
                  alt="Devs Learning"
                  className="w-auto"
                />
              </Link>
            </h1>
          </div>
          <div className="hidden xl:flex gap-5 items-center">
            <ul className="flex gap-3">
              <li>
                <Link
                  href={getLocalizedPathFromPrefix(lang, `/courses`)}
                  className="font-poppins text-neutral-500 py-[5px] px-[15px] hover:text-neutral-800 focus:outline-none transition-all duration-500"
                >
                  {dictionary.header.navigation.courses}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedPathFromPrefix(lang, `/technologies`)}
                  className="font-poppins text-neutral-500 py-[5px] px-[15px] hover:text-neutral-800 focus:outline-none transition-all duration-500"
                >
                  {dictionary.header.navigation.technologies}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedPathFromPrefix(lang, `/roadmaps`)}
                  className="font-poppins text-neutral-500 py-[5px] px-[15px] hover:text-neutral-800 focus:outline-none transition-all duration-500"
                >
                  {dictionary.header.navigation.roadmaps}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedPathFromPrefix(lang, `/about`)}
                  className="font-poppins text-neutral-500 py-[5px] px-[15px] hover:text-neutral-800 focus:outline-none transition-all duration-500"
                >
                  {dictionary.header.navigation.about}
                </Link>
              </li>
            </ul>

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
