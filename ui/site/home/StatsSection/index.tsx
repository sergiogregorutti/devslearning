"use client";

import React, { useEffect, useState } from "react";
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
    <div className="info-banner bg-blue-500">
      <Container>
        <div className="content">
          <span>
            {dictionary.home.stats["browseBetween"]}{" "}
            {coursesCount ? (
              <Counter initialValue={0} targetValue={coursesCount} />
            ) : (
              0
            )}{" "}
            {dictionary.home.stats["courses"]}
            {", "}
            {coursesCount ? (
              <Counter initialValue={0} targetValue={technologiesCount} />
            ) : (
              0
            )}{" "}
            {dictionary.home.stats["technologies"]}{" "}
            {dictionary.home.stats["and"]}{" "}
            <Counter initialValue={0} targetValue={3} />{" "}
            {dictionary.home.stats["roadmaps"]}
          </span>
        </div>
      </Container>
    </div>
  );
}
