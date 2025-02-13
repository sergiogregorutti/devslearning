"use client";

import { getLocalizedPathFromPrefix } from "@/lib/language";
import { FaHouse, FaChevronRight } from "react-icons/fa6";
import Link from "next/link";

export default function Heading({
  lang,
  dictionary,
}: {
  lang: string;
  dictionary: any;
}) {
  return (
    <div className="heading">
      <div className="container">
        <div className="title-container">
          <h1>{dictionary.technologies.technologies}</h1>
        </div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link
                className="item"
                href={getLocalizedPathFromPrefix(lang, `/`)}
              >
                <FaHouse className="home" />
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              <FaChevronRight className="arrow" />
              {dictionary.technologies.technologies}
            </li>
          </ol>
        </nav>
      </div>
    </div>
  );
}
