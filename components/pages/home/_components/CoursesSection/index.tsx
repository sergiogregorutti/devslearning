"use client";

import { useLanguage } from "@/components/context/LanguageContext";
import React, { useEffect, useState } from "react";
import { getLocalizedPathFromPrefix } from "@/lib/language";
import Button from "@/components/ui/Button";
import Counter from "@/components/common/Counter";
import { ITechnologyCoursesCount } from "@/interfaces/course";
import Container from "@/components/layout/Container";
import CardLink from "@/components/ui/CardLink";
import Heading from "@/components/ui/Heading";

export default function FeaturedTechnologies({
  technologies,
}: {
  technologies: any;
}) {
  const { lang, dictionary } = useLanguage();
  const [courses, setCourses] = useState<ITechnologyCoursesCount>({});

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch("/api/technologies/courses-count");
        const data = await response.json();
        setCourses(data);
      } catch (e) {}
    }

    fetchCourses();
  }, []);

  return (
    <div className="bg-white">
      <Container className="py-12 text-right">
        <Heading
          as="h2"
          label={dictionary.home.coursesSection.title}
          className="text-center text-4xl mb-4"
        />
        <p className="mb-6 leading-[30px] w-full text-center">
          {dictionary.home.coursesSection.description}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 md:gap-6 xl:gap-14 mb-6 md:mb-8">
          {technologies.map((technology: any) => (
            <CardLink
              key={technology.name}
              title={technology.name}
              subtitle={
                <>
                  {courses[technology._id]?.total ? (
                    <Counter
                      initialValue={0}
                      targetValue={courses[technology._id]?.total}
                    />
                  ) : (
                    0
                  )}{" "}
                  {dictionary.home.courses}
                </>
              }
              imageSrc={technology.imageWhite}
              layout="vertical"
              href={getLocalizedPathFromPrefix(
                lang,
                `/technologies/${technology.slug}/courses?filters=${
                  lang === "en" ? "english" : "spanish"
                }`
              )}
            />
          ))}
        </div>
        <Button
          label={dictionary.home.coursesSection.cta}
          href={getLocalizedPathFromPrefix(lang, `/courses`)}
          variant="darkBlue"
        />
      </Container>
    </div>
  );
}
