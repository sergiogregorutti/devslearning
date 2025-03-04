"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Counter from "@/ui/common/Counter";
import { ITechnologyCoursesCount } from "@/interfaces/course";
import Container from "@/components/layout/Container";

import "./styles.css";

export default function InfoBanner({
  dictionary,
}: {
  dictionary: { [key: string]: any };
}) {
  const [stats, setStats] = useState<ITechnologyCoursesCount>({});
  const [coursesCount, setCoursesCount] = useState(0);
  const [technologiesCount, setTechnologiesCount] = useState(0);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch("/api/stats");
        const data = await response.json();
        setStats(data);
        setCoursesCount(data.coursesCount);
        setTechnologiesCount(data.technologiesCount);
      } catch (e) {}
    }

    fetchCourses();
  }, []);

  return (
    <div className="py-6 md:py-12 bg-blue-500">
      <Container>
        <div className="grid gap-[30px] grid-cols-3 max-w-[700px] mx-auto">
          <div className="text-white">
            <Image
              src="/assets/stats/training.svg"
              width={555}
              height={286}
              alt="Courses"
              priority={true}
              className="h-[50px] md:h-[70px] mb-4"
            />
            <span className="block text-center text-2xl md:text-4xl font-bold">
              {coursesCount ? (
                <Counter initialValue={0} targetValue={coursesCount} />
              ) : (
                0
              )}
            </span>
            <span className="block text-center md:text-xl leading-none">
              {dictionary.home.stats["courses"]}
            </span>
          </div>
          <div className="text-white">
            <Image
              src="/assets/stats/technologies.svg"
              width={555}
              height={286}
              alt="Courses"
              priority={true}
              className="h-[50px] md:h-[70px] mb-4"
            />
            <span className="block text-center text-2xl md:text-4xl font-bold">
              {technologiesCount ? (
                <Counter initialValue={0} targetValue={technologiesCount} />
              ) : (
                0
              )}
            </span>
            <span className="block text-center md:text-xl leading-none">
              {dictionary.home.stats["technologies"]}
            </span>
          </div>
          <div className="text-white">
            <Image
              src="/assets/stats/roadmap.svg"
              width={555}
              height={286}
              alt="Courses"
              priority={true}
              className="h-[50px] md:h-[70px] mb-4"
            />
            <span className="block text-center text-2xl md:text-4xl font-bold">
              {coursesCount ? <Counter initialValue={0} targetValue={3} /> : 0}
            </span>
            <span className="block text-center md:text-xl leading-none">
              {dictionary.home.stats["roadmaps"]}
            </span>
          </div>
        </div>
      </Container>
    </div>
  );
}
