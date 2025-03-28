"use client";

import { FaUpRightFromSquare } from "react-icons/fa6";
import Button from "@/components/ui/Button";
import Container from "@/components/layout/Container";
import Heading from "@/components/ui/Heading";

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
    <Container className="flex flex-col gap-10">
      <div className="bg-white rounded-xl p-4 border border-neutral-200">
        <Button
          label={dictionary.technologies.visitCourse}
          href={course.link}
          linkTarget="_blank"
          icon={<FaUpRightFromSquare />}
        />
      </div>

      <div>
        <Heading
          as="h2"
          className="mb-3"
          label={dictionary.courseDetail.information}
        />
        <div>
          <div className="grid grid-cols-2 md:flex md:items-center md:flex-wrap gap-x-[25px] gap-y-[10px] md:gap-8">
            <div>
              <span className="font-bold block">
                {dictionary.technologies.price}:
              </span>
              {course.price > 0 ? `US$ ${course.price}` : ""}
              {renderPricing(course.pricing)}
            </div>
            <div>
              <span className="font-bold block">
                {dictionary.technologies.platform}:
              </span>
              {course.platform || "---"}
            </div>
            <div>
              <span className="font-bold block">
                {dictionary.technologies.author}:
              </span>
              {course.author || "---"}
            </div>
            <div>
              <span className="font-bold block">
                {dictionary.technologies.year}:
              </span>
              {course.year}
            </div>
            <div>
              <span className="font-bold block">
                {dictionary.technologies.language}:
              </span>
              {course.language === "en"
                ? dictionary.technologies.english
                : dictionary.technologies.spanish}
            </div>
          </div>
        </div>
      </div>

      <div>
        <Heading
          as="h2"
          className="mb-3"
          label={dictionary.courseDetail.description}
        />
        <div>
          <div className="wysiwyg-content">
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
  );
}
