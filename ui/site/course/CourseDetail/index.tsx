"use client";

import Link from "next/link";
import { FaUpRightFromSquare } from "react-icons/fa6";

import "./styles.css";

export default function Heading({
  course,
  lang,
  dictionary,
}: {
  course: any;
  lang: string;
  dictionary: any;
}) {
  const renderPricing = (value: String) => {
    switch (value) {
      case "free":
        return dictionary.technologies.pricingFree;
      case "one-time-payment":
        return ` (${dictionary.technologies.pricingOneTime})`;
      case "subscription":
        return ` (${dictionary.technologies.pricingSubscription})`;
    }
  };

  return (
    <div className="course-detail">
      <div className="container">
        <div className="cta-and-details">
          <div className="cta-container">
            <Link className="btn btn-big" href={course.link} target="_blank">
              {dictionary.technologies.visitCourse}
              <FaUpRightFromSquare />
            </Link>
          </div>
          <div className="details">
            <div className="item">
              <span>{dictionary.technologies.price}:</span>
              {course.price > 0 ? `US$ ${course.price}` : ""}
              {renderPricing(course.pricing)}
            </div>
            <div className="item">
              <span>{dictionary.technologies.platform}:</span>
              {course.platform || "---"}
            </div>
            <div className="item">
              <span>{dictionary.technologies.author}:</span>
              {course.author || "---"}
            </div>
            <div className="item">
              <span>{dictionary.technologies.year}:</span>
              {course.year}
            </div>
            <div className="item">
              <span>{dictionary.technologies.language}:</span>
              {course.language === "en"
                ? dictionary.technologies.english
                : dictionary.technologies.spanish}
            </div>
          </div>
        </div>

        <div className="description">
          {course.long_description && (
            <div
              dangerouslySetInnerHTML={{
                __html:
                  lang === "en"
                    ? course.long_description
                    : course.long_description_es,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
