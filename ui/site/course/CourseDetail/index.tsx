"use client";

import Image from "next/image";
import { FaUpRightFromSquare } from "react-icons/fa6";
import Button from "@/components/ui/Button";

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
        // return ` (${dictionary.technologies.pricingOneTime})`;
        return "";
      case "subscription":
        // return ` (${dictionary.technologies.pricingSubscription})`;
        return "";
    }
  };

  return (
    <div className="course-detail">
      <div className="container">
        <p className="description">
          {lang === "en" ? course.description : course.description_es}
        </p>
        <Button
          label={dictionary.technologies.visitCourse}
          href={course.link}
          linkTarget="_blank"
          icon={<FaUpRightFromSquare />}
          className="cta"
        />

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
        <div className="image-container">
          <Image
            src={course.image}
            width={200}
            height={200}
            alt={course.name}
          />
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

        <Button
          label={dictionary.technologies.visitCourse}
          href={course.link}
          linkTarget="_blank"
          icon={<FaUpRightFromSquare />}
          className="cta"
        />
      </div>
    </div>
  );
}
