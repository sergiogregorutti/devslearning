"use client";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { getLocalizedPathFromPrefix } from "@/lib/language";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Image from "next/image";

import "./styles.css";

const Header = ({ lang, user }: { lang: string; user: any }) => {
  const pathname = usePathname();
  const isAuth = user ? user : false;
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const links = [
    { name: "Dashboard", href: "/admin/", arrow: true },
    {
      name: "Technologies",
      href: "/admin/technologies/",
      arrow: true,
    },
    { name: "Courses", href: "/admin/courses/", arrow: true },
    { name: "Go to Website", href: "/", arrow: false },
  ];

  return (
    <header>
      <div className="container">
        <h1>
          <Link href={getLocalizedPathFromPrefix(lang, `/admin`)}>
            <Image
              src="/assets/logo2024.svg"
              width={136}
              height={40}
              alt="Devs Learning"
            />
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
                {links.map((link) => {
                  return (
                    <li
                      key={link.name}
                      className={clsx("item", {
                        active: pathname === link.href,
                      })}
                      onClick={toggleMobileMenu}
                    >
                      <Link href={link.href}>
                        {link.name} {link.arrow ? <ArrowRightIcon /> : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <Image
              className="mobile-menu-logo"
              src="/assets/logo_dark.svg"
              width={200}
              height={59}
              alt="Devs Learning"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
