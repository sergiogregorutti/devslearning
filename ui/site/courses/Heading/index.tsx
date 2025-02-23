"use client";

import { getLocalizedPathFromPrefix } from "@/lib/language";
import { FaHouse, FaChevronRight } from "react-icons/fa6";
import Link from "next/link";

export default function Heading({
  technology,
  lang,
  dictionary,
}: {
  technology: any;
  lang: string;
  dictionary: any;
}) {
  return (
    <div className="heading">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link
                className="item"
                key={technology.name}
                href={getLocalizedPathFromPrefix(lang, `/courses/`)}
              >
                {dictionary.common.navigation.courses}
              </Link>
            </li>
            <li className="breadcrumb-item">
              <span className="separator">/</span>
              <Link
                className="item"
                key={technology.name}
                href={getLocalizedPathFromPrefix(
                  lang,
                  `/technologies/${technology.slug}`
                )}
              >
                {technology.name}
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              <span className="separator">/</span>
            </li>
          </ol>
        </nav>
        <div className="title-container">
          <h1>
            {lang === "en"
              ? `${technology.name} Courses`
              : `Cursos de ${technology.name}`}
          </h1>
        </div>
      </div>
    </div>
  );
}
