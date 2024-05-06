"use client";
import React, { useState } from "react";
import Link from "next/link";
import { getLocalizedPathFromPrefix } from "@/lib/language";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import "./styles.css";

const Header = ({ lang, user }: { lang: string; user: any }) => {
  const isAuth = user ? user : false;
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <header>
      <div className="container">
        <h1>
          <Link href={getLocalizedPathFromPrefix(lang, `/admin`)}>
            <img src="/assets/logo2024.svg" />
          </Link>
        </h1>
        <div className="right">
          <Link
            className="go-to-website"
            href={getLocalizedPathFromPrefix(lang, `/`)}
          >
            Go to Website
          </Link>
          <button className="menu-toggle" onClick={toggleMobileMenu}>
            <MenuIcon />
          </button>

          <div className={`mobile-menu ${showMobileMenu ? "open" : ""}`}>
            <div className="mobile-menu-content">
              <div className="close-container">
                <button className="btn-close" onClick={toggleMobileMenu}>
                  <CloseIcon />
                </button>
              </div>
              <ul className="menu">
                <li className="item">
                  <Link href="/admin/technologies">Tecnologies</Link>
                </li>
                <li className="item">
                  <Link href="/admin/courses">Courses</Link>
                </li>
                <li className="item">
                  <Link href="/">Go to Website</Link>
                </li>
              </ul>
            </div>
            <img className="mobile-menu-logo" src="/assets/logo_dark.svg" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
