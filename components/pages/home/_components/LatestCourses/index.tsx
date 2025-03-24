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

export default function LatestCourses({
  latestCourses,
}: {
  latestCourses: any[];
}) {
  const { lang, dictionary } = useLanguage();

  return (
    <div className="bg-blue-300">
      <Container className="py-12 !max-w-5xl">
        <Heading
          as="h2"
          label={dictionary.home.latestCoursesSection.title}
          className="text-center text-4xl mb-8"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {latestCourses.map((course: any) => (
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
                <Button
                  href={getLocalizedPathFromPrefix(
                    lang,
                    `/technologies/${course.technologySlug}/`
                  )}
                  size="small"
                  className="absolute top-3 right-3 !flex items-center"
                >
                  <Image
                    src={course.technologyImageWhite}
                    alt={course.technologyName}
                    width={60}
                    height={70}
                    className="h-[16px] w-auto mr-[6px]"
                  />
                  {course.technologyName}
                </Button>
              </div>
              <div className="p-4 flex flex-col flex-grow bg-white">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex gap-3">
                    <span className="capitalize text-sm">
                      {formatDistanceToNow(new Date(course.createdAt), {
                        addSuffix: true,
                        locale: lang === "es" ? es : enUS,
                      })}
                    </span>
                  </div>
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
                  <Badge>
                    {course.language === "en"
                      ? dictionary.technologies.english
                      : dictionary.technologies.spanish}
                  </Badge>
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
      </Container>
    </div>
  );
}
