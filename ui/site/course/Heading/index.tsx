"use client";

import { getLocalizedPathFromPrefix } from "@/lib/language";
import Image from "next/image";
import { FaHouse, FaChevronRight } from "react-icons/fa6";
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
    <div className="heading with-image">
      <div className="container">
        <div className="title-container">
          <div className="image">
            <Image
              src={course.image}
              width={200}
              height={200}
              alt={course.name}
            />
          </div>
          <h1>{course.name}</h1>
        </div>

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
                href={getLocalizedPathFromPrefix(lang, `/`)}
              >
                <FaHouse className="home" />
              </Link>
            </li>
            <li className="breadcrumb-item">
              <FaChevronRight className="arrow" />
              <Link
                className="item"
                href={getLocalizedPathFromPrefix(lang, `/technologies/`)}
              >
                {dictionary.technologies.technologies}
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              <FaChevronRight className="arrow" />
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
              <FaChevronRight className="arrow" />
              {course.name}
            </li>
          </ol>
        </nav>
      </div>
    </div>
  );
}
