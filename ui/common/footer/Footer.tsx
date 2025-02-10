"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { getLocalizedPathFromPrefix } from "@/lib/language";

import Smartlook from "smartlook-client";

import "./styles.css";

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
    <footer>
      <div className="footer-content">
        <div className="container">
          <ul className="navigation">
            <li className="item">
              <Link
                className="item"
                href={getLocalizedPathFromPrefix(lang, `/`)}
              >
                {dictionary.common.navigation.home}
              </Link>
            </li>
            <li className="item">
              <Link
                className="item"
                href={getLocalizedPathFromPrefix(lang, `/technologies/`)}
              >
                {dictionary.common.navigation.technologies}
              </Link>
            </li>
          </ul>
          <p>© {new Date().getFullYear()} Devs Learning</p>
        </div>
      </div>
    </footer>
  );
}
