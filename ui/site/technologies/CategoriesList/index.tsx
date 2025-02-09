"use client";
import React, { useEffect, useState } from "react";
import { getLocalizedPathFromPrefix } from "@/lib/language";
import Image from "next/image";
import Link from "next/link";
import Counter from "@/ui/common/Counter";
import { ITechnologyCoursesCount } from "@/interfaces/course";

import "./styles.css";

export default function TechnologiesList({
  dictionary,
  lang,
  categories,
}: {
  dictionary: { [key: string]: any };
  lang: string;
  categories: any;
}) {
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
    <div className="categories">
      <div className="container">
        <div className="categories-list">
          {categories.map((category: any) => (
            <div key={category.id} className="category">
              <h2>{lang === "en" ? category.name : category.name_es}</h2>
              <div className="technologies-list">
                {category.technologies.map((technology: any) => (
                  <Link
                    className="item"
                    key={technology.name}
                    href={getLocalizedPathFromPrefix(
                      lang,
                      `/technologies/${technology.slug}/courses/`
                    )}
                  >
                    <Image
                      src={technology.imageWhite}
                      width={100}
                      height={100}
                      alt={technology.name}
                      priority={true}
                    />
                    <div className="content">
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
