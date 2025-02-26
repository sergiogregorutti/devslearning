"use client";
import React, { useEffect, useState } from "react";
import { getLocalizedPathFromPrefix } from "@/lib/language";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Counter from "@/ui/common/Counter";
import { ITechnologyCoursesCount } from "@/interfaces/course";
import Container from "@/components/layout/Container";

import "./styles.css";

export default function FeaturedTechnologies({
  dictionary,
  lang,
  technologies,
}: {
  dictionary: { [key: string]: any };
  lang: string;
  technologies: any;
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
    <div className="featured-technologies">
      <Container>
        <div className="content">
          <h2>{dictionary.home.technologiesTitle}</h2>
          <div className="technologies-list">
            {technologies.map((technology: any) => (
              <Link
                className="item transition-all duration-500"
                key={technology.name}
                href={getLocalizedPathFromPrefix(
                  lang,
                  `/technologies/${technology.slug}/`
                )}
              >
                <Image
                  src={technology.imageWhite}
                  width={100}
                  height={100}
                  alt={technology.name}
                  priority={true}
                />
                <div className="item-content">
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
          <Button
            label={dictionary.home.seeAllTechnologies}
            href={getLocalizedPathFromPrefix(lang, `/technologies`)}
            variant="darkBlue"
          />
        </div>
      </Container>
    </div>
  );
}
