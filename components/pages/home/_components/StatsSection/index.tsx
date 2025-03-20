"use client";

import { useLanguage } from "@/components/context/LanguageContext";
import { getLocalizedPathFromPrefix } from "@/lib/language";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Counter from "@/components/common/Counter";

export default function InfoBanner() {
  const { lang, dictionary } = useLanguage();
  const [coursesCount, setCoursesCount] = useState(0);
  const [technologiesCount, setTechnologiesCount] = useState(0);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch("/api/stats");
        const data = await response.json();
        setCoursesCount(data.coursesCount);
        setTechnologiesCount(data.technologiesCount);
      } catch (e) {}
    }

    fetchCourses();
  }, []);

  return (
    <div>
      <div className="grid gap-[20px] grid-cols-3 max-w-[700px] mx-auto">
        <Link href={getLocalizedPathFromPrefix(lang, "/courses")}>
          <div className="text-white bg-blue-500 transition-all duration-300 hover:bg-blue-600 rounded-2xl p-3 grid grid-cols-1 md:grid-cols-2">
            <div className="flex items-center justify-center md:justify-normal mb-3 md:mb-0">
              <Image
                src="/assets/stats/training.svg"
                width={555}
                height={286}
                alt="Courses"
                priority={true}
                className="h-[40px] md:h-[40px] w-auto"
              />
            </div>
            <div className="flex flex-col items-center md:items-end">
              <span className="block text-center text-2xl md:text-xl font-bold">
                {coursesCount ? (
                  <Counter initialValue={0} targetValue={coursesCount} />
                ) : (
                  0
                )}
              </span>
              <span className="block text-sm text-center md:text-base leading-none">
                {dictionary.home.stats["courses"]}
              </span>
            </div>
          </div>
        </Link>
        <Link href={getLocalizedPathFromPrefix(lang, "/technologies")}>
          <div className="text-white bg-blue-500 transition-all duration-300 hover:bg-blue-600 rounded-2xl p-3 grid grid-cols-1 md:grid-cols-2">
            <div className="flex items-center justify-center md:justify-normal mb-3 md:mb-0">
              <Image
                src="/assets/stats/technologies.svg"
                width={555}
                height={286}
                alt="Courses"
                priority={true}
                className="h-[40px] md:h-[40px] w-auto"
              />
            </div>
            <div className="flex flex-col items-center md:items-end">
              <span className="block text-center text-2xl md:text-xl font-bold">
                {technologiesCount ? (
                  <Counter initialValue={0} targetValue={technologiesCount} />
                ) : (
                  0
                )}
              </span>
              <span className="block text-sm md:text-base leading-none">
                {dictionary.home.stats["technologies"]}
              </span>
            </div>
          </div>
        </Link>
        <Link href={getLocalizedPathFromPrefix(lang, "/roadmaps")}>
          <div className="text-white bg-blue-500 transition-all duration-300 hover:bg-blue-600 rounded-2xl p-3 grid grid-cols-1 md:grid-cols-2">
            <div className="flex items-center justify-center md:justify-normal mb-3 md:mb-0">
              <Image
                src="/assets/stats/roadmap.svg"
                width={555}
                height={286}
                alt="Courses"
                priority={true}
                className="h-[40px] md:h-[40px] w-auto"
              />
            </div>
            <div className="flex flex-col items-center md:items-end">
              <span className="block text-center text-2xl md:text-xl font-bold">
                {coursesCount ? (
                  <Counter initialValue={0} targetValue={3} />
                ) : (
                  0
                )}
              </span>
              <span className="block text-sm text-center md:text-base leading-none">
                {dictionary.home.stats["roadmaps"]}
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
