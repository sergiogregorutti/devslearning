"use client";

import React, { useEffect, useState } from "react";
import { useLanguage } from "@/components/context/LanguageContext";
import { getLocalizedPathFromPrefix } from "@/lib/language";
import Image from "next/image";
import Link from "next/link";
import Counter from "@/components/common/Counter";
import { ITechnologyCoursesCount } from "@/interfaces/course";

import "./styles.css";

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
    <div className="courses-page-categories">
      <div className="container">
        <div className="categories-list">
          {categories.map((category: any) => (
            <div key={category._id} className="category">
              <h2>{lang === "en" ? category.name : category.name_es}</h2>
              <div className="technologies-list">
                {category.technologies.map((technology: any) => (
                  <Link
                    className="technology-card transition-all duration-500"
                    key={technology.name}
                    href={getLocalizedPathFromPrefix(
                      lang,
                      `/technologies/${technology.slug}/courses?filters=${
                        lang === "en" ? "english" : "spanish"
                      }`
                    )}
                  >
                    <Image
                      src={technology.imageWhite}
                      width={100}
                      height={100}
                      alt={technology.name}
                      priority={true}
                    />
                    <div className="technology-card-content">
                      <span>{technology.name}</span>
                      <span className="small">
                        {courses[technology._id]?.total ? (
                          <Counter
                            initialValue={0}
                            targetValue={courses[technology._id]?.total}
                          />
                        ) : (
                          0
                        )}{" "}
                        {dictionary.home.courses}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
