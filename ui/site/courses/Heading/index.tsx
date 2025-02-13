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
        <div className="title-container">
          <h1>{technology.name}</h1>
        </div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link
                className="item"
                key={technology.name}
                href={getLocalizedPathFromPrefix(lang, `/`)}
              >
                <FaHouse className="home" />
              </Link>
            </li>
            <li className="breadcrumb-item">
              <FaChevronRight className="arrow" />
              <Link
                className="item"
                key={technology.name}
                href={getLocalizedPathFromPrefix(lang, `/technologies/`)}
              >
                {dictionary.technologies.technologies}
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              <FaChevronRight className="arrow" />
              {technology.name}
            </li>
          </ol>
        </nav>
      </div>
    </div>
  );
}
