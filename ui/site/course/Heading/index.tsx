"use client";

import { getLocalizedPathFromPrefix } from "@/lib/language";
import Image from "next/image";
import Link from "next/link";

export default function Heading({
  course,
  lang,
  dictionary,
  referer,
}: {
  course: any;
  lang: string;
  dictionary: any;
  referer: any;
}) {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="heading">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            {referer && (
              <li className="breadcrumb-item">
                <a onClick={handleGoBack} className="item back">
                  {dictionary.common.goBack}
                </a>
              </li>
            )}
            <li className="breadcrumb-item">
              <Link
                className="item"
                href={getLocalizedPathFromPrefix(lang, `/courses/`)}
              >
                {dictionary.common.navigation.courses}
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              <span className="separator">/</span>
              <Link
                className="item"
                href={getLocalizedPathFromPrefix(
                  lang,
                  `/technologies/${course.technologySlug}/courses/`
                )}
              >
                {course.technologyName}
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              <span className="separator">/</span>
            </li>
          </ol>
        </nav>
        <div className="title-container">
          <h1>{course.name}</h1>
        </div>
      </div>
    </div>
  );
}
