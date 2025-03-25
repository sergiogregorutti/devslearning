"use client";

import { useLanguage } from "@/components/context/LanguageContext";
import { formatDistanceToNow } from "date-fns";
import { enUS, es } from "date-fns/locale";
import React from "react";
import { getLocalizedPathFromPrefix } from "@/lib/language";
import Button from "@/components/ui/Button";
import Container from "@/components/layout/Container";
import Heading from "@/components/ui/Heading";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Image from "next/image";

export default function RelatedCourses({
  relatedCourses,
}: {
  relatedCourses: any[];
}) {
  const { lang, dictionary } = useLanguage();

  return (
    <Container className="py-12 pb-10">
      <div className="bg-white rounded-xl p-4 border border-neutral-200">
        <Heading
          as="h2"
          label={dictionary.courseDetail.relatedCourses}
          className="text-4xl mb-8"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {relatedCourses.map((course: any) => (
            <Card
              key={course._id}
              className="overflow-hidden flex flex-col h-full"
            >
              <div className="relative pb-[56.25%] bg-gray-100">
                <img
                  src={course.image}
                  alt={course.name}
                  className="absolute inset-0 w-full h-full object-contain"
                />
                <img
                  src={course.image}
                  alt={course.name}
                  className="w-full h-48 md:h-full object-cover absolute blur-sm opacity-20"
                />
              </div>
              <div className="p-4 flex flex-col flex-grow bg-white">
                <div className="flex items-center justify-between mb-2">
                  <Badge>
                    {course.language === "en"
                      ? dictionary.technologies.english
                      : dictionary.technologies.spanish}
                  </Badge>
                  <span
                    className={`text-sm font-medium ${
                      course.pricing === "free" ? "text-green-600" : ""
                    }`}
                  >
                    {course.pricing === "free"
                      ? dictionary.technologies.pricingFree
                      : `USD $${course.price}`}
                  </span>
                </div>
                <h3 className="text-base md:text-xl leading-[16px] md:leading-[20px] font-semibold mb-3">
                  {course.name}
                </h3>
                <div className="flex justify-between text-xs text-gray-500 mb-4 flex-grow">
                  <span>{course.author}</span>
                  <span>{course.platform}</span>
                  <span>{course.year}</span>
                </div>
                <Button
                  href={getLocalizedPathFromPrefix(
                    lang,
                    `/courses/${course._id}/`
                  )}
                  className="w-full text-sm md:text-lg py-[5px] md:py-[9px] px-[20px] md:px-[28px]"
                >
                  {dictionary.technologies.viewMore}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
}
