"use client";

import React, { useState } from "react";
import Link from "next/link";
import LanguageSelector from "@/components/common/LanguageSelector";
import { getLocalizedPathFromPrefix } from "@/lib/language";
import Image from "next/image";
import { FaBars } from "react-icons/fa6";
import Container from "@/components/layout/Container";

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
    <header className="sticky h-[60px] bg-blue-800 shadow-md shadow-blue-800/50 top-[0] z-[9999]">
      <Container>
        <div className="flex h-[60px] justify-center xl:justify-between items-center">
          <div className="flex gap-8">
            <h1 className="m-0">
              <Link
                className="relative inline-block m-[10px_0]"
                href={getLocalizedPathFromPrefix(lang, `/`)}
              >
                <Image
                  src="/assets/logo.svg"
                  width={136}
                  height={40}
                  alt="Devs Learning"
                />
              </Link>
            </h1>
            <div className="hidden xl:flex gap-5 items-center">
              <ul className="flex gap-3">
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
          </div>
          <div className="hidden xl:flex">
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

        <button
          className="flex absolute justify-center items-center top-[9px] right-[12px] p-[10px] xl:hidden"
          onClick={toggleMobileMenu}
        >
          <FaBars className="fill-white text-xl" />
        </button>

        <div
          className={`h-[100vh] h-[100svh] pb-[80px] flex opacity-0 invisible transition-all bg-white fixed left-0 top-0 w-[100%] flex-col justify-between items-center xl:hidden ${
            showMobileMenu ? "opacity-100 visible" : ""
          }`}
        >
          <div className="w-[100%] flex relative flex-col grow">
            <div className="absolute flex top-0 right-0 justify-end w-[60px]">
              <button
                className="mt-[10px] mr-[12px]"
                onClick={toggleMobileMenu}
              >
                <Image
                  src="/assets/icons/close.svg"
                  width={40}
                  height={40}
                  alt="Close"
                  className="fill-white text-4xl"
                />
              </button>
            </div>
            <div className="flex items-center flex-col grow">
              <div className="h-[60px] w-[100%] flex justify-center items-center bg-blue-800">
                <Link href={getLocalizedPathFromPrefix(lang, `/`)}>
                  <Image
                    src="/assets/logo.svg"
                    width={136}
                    height={40}
                    alt="Devs Learning"
                    onClick={toggleMobileMenu}
                    className="inline-block"
                  />
                </Link>
              </div>

              <div className="w-[100%] grow flex flex-col justify-center">
                <ul className="w-[100%] list-none p-0 flex flex-col justify-center">
                  <li
                    className="relative text-center"
                    onClick={toggleMobileMenu}
                  >
                    <Link
                      className="inline-block w-[100%] no-underline p-[10px_0] text-2xl"
                      href={getLocalizedPathFromPrefix(lang, `/`)}
                    >
                      {dictionary.header.navigation.home}
                    </Link>
                  </li>
                  <li
                    className="relative text-center"
                    onClick={toggleMobileMenu}
                  >
                    <Link
                      className="inline-block w-[100%] no-underline p-[10px_0] text-2xl"
                      href={getLocalizedPathFromPrefix(lang, `/courses`)}
                    >
                      {dictionary.header.navigation.courses}
                    </Link>
                  </li>
                  <li
                    className="relative text-center"
                    onClick={toggleMobileMenu}
                  >
                    <Link
                      className="inline-block w-[100%] no-underline p-[10px_0] text-2xl"
                      href={getLocalizedPathFromPrefix(lang, `/technologies`)}
                    >
                      {dictionary.header.navigation.technologies}
                    </Link>
                  </li>
                  <li
                    className="relative text-center"
                    onClick={toggleMobileMenu}
                  >
                    <Link
                      className="inline-block w-[100%] no-underline p-[10px_0] text-2xl"
                      href={getLocalizedPathFromPrefix(lang, `/roadmaps`)}
                    >
                      {dictionary.header.navigation.roadmaps}
                    </Link>
                  </li>
                  <li
                    className="relative text-center"
                    onClick={toggleMobileMenu}
                  >
                    <Link
                      className="inline-block w-[100%] no-underline p-[10px_0] text-2xl"
                      href={getLocalizedPathFromPrefix(lang, `/about`)}
                    >
                      {dictionary.header.navigation.about}
                    </Link>
                  </li>
                </ul>

                <h3 className="text-center font-normal text-2xl mt-6 mb-3 text-neutral-400">
                  {dictionary.header.navigation.language}
                </h3>
                <div className="flex justify-center mb-6">
                  <LanguageSelector
                    mobile={true}
                    dictionary={dictionary}
                    lang={lang}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
