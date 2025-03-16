"use client";

import React, { useEffect, useState } from "react";
import { useLanguage } from "@/components/context/LanguageContext";
import { getLocalizedPathFromPrefix } from "@/lib/language";
import Counter from "@/components/common/Counter";
import { ITechnologyCoursesCount } from "@/interfaces/course";
import CardLink from "@/components/ui/CardLink";

export default function TechnologiesList({ categories }: { categories: any }) {
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
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {categories.map((category: any) => (
        <div key={category._id}>
          <h2>{lang === "en" ? category.name : category.name_es}</h2>
          <div className="grid grid-cols-1 gap-4 md:gap-5">
            {category.technologies.map((technology: any) => (
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
                href={getLocalizedPathFromPrefix(
                  lang,
                  `/technologies/${technology.slug}/courses?filters=${
                    lang === "en" ? "english" : "spanish"
                  }`
                )}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
