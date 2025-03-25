"use client";

import React from "react";
import Link from "next/link";
import { getLocalizedPathFromPrefix } from "@/lib/language";
import Container from "@/components/layout/Container";

interface FooterProps {
  dictionary: Record<string, any>;
  lang: string;
}

export default function Footer({ dictionary, lang }: FooterProps) {
  const navigationLinks = [
    { href: "/", label: dictionary.common.navigation.home },
    { href: "/courses/", label: dictionary.common.navigation.courses },
    {
      href: "/technologies/",
      label: dictionary.common.navigation.technologies,
    },
    { href: "/roadmaps/", label: dictionary.common.navigation.roadmaps },
    { href: "/about/", label: dictionary.common.navigation.about },
  ];

  return (
    <footer className="mt-auto pt-4 bg-blue-500">
      <Container>
        <div className="flex flex-col text-center text-base">
          <ul className="flex flex-wrap justify-center gap-x-[20px] gap-y-[10px] border-b border-white pb-4 px-4">
            {navigationLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  className="text-white hover:text-blue-800"
                  href={getLocalizedPathFromPrefix(lang, href)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-white mt-4 mb-4">
            © {new Date().getFullYear()} Devs Learning
          </p>
        </div>
      </Container>
    </footer>
  );
}
