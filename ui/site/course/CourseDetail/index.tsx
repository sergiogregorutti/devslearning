"use client";

import { FaUpRightFromSquare } from "react-icons/fa6";
import Button from "@/components/ui/Button";
import Container from "@/components/layout/Container";

import "./styles.css";

export default function CourseDetail({
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
        return "";
      case "subscription":
        return "";
    }
  };

  return (
    <div className="course-detail">
      <Container>
        <div className="content">
          <Button
            label={dictionary.technologies.visitCourse}
            href={course.link}
            linkTarget="_blank"
            icon={<FaUpRightFromSquare />}
          />

          <h2 className="mt-6 !mb-3">{dictionary.courseDetail.information}</h2>
          <div className="w-[100%] rounded-lg border border-neutral-200 p-4 md:p-6">
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

          <h2 className="mt-6 !mb-3">{dictionary.courseDetail.description}</h2>
          <div className="rounded-lg border border-neutral-200 p-4 md:p-6">
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
      </Container>
    </div>
  );
}
