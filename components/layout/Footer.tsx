"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { getLocalizedPathFromPrefix } from "@/lib/language";
import Container from "@/components/layout/Container";

import Smartlook from "smartlook-client";

export default function Footer({
  dictionary,
  lang,
}: {
  dictionary: { [key: string]: any };
  lang: string;
}) {
  useEffect(() => {
    if (!Smartlook.initialized()) {
      Smartlook.init("bf44692fcb061ad2509652dae2260a7ded59bfac");
    }
  }, []);

  return (
    <footer className="mt-auto pt-4">
      <Container>
        <div className="flex flex-col text-center text-base">
          <ul className="flex justify-center space-x-5 border-b border-gray-300 pb-4">
            <li>
              <Link
                className="text-gray-400 hover:text-gray-600"
                href={getLocalizedPathFromPrefix(lang, `/`)}
              >
                {dictionary.common.navigation.home}
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-400 hover:text-gray-600"
                href={getLocalizedPathFromPrefix(lang, `/technologies/`)}
              >
                {dictionary.common.navigation.technologies}
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-400 hover:text-gray-600"
                href={getLocalizedPathFromPrefix(lang, `/courses/`)}
              >
                {dictionary.common.navigation.courses}
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-400 hover:text-gray-600"
                href={getLocalizedPathFromPrefix(lang, `/about/`)}
              >
                {dictionary.common.navigation.about}
              </Link>
            </li>
          </ul>
          <p className="text-gray-400 mt-4 mb-4">
            © {new Date().getFullYear()} Devs Learning
          </p>
        </div>
      </Container>
    </footer>
  );
}
