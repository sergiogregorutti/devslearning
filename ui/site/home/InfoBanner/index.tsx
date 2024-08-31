"use client";

import React, { useEffect, useState } from "react";
import { ITechnologyCoursesCount } from "@/interfaces/course";

import "./styles.css";

const Counter = ({
  initialValue,
  targetValue,
}: {
  initialValue: number,
  targetValue: number,
}) => {
  const [count, setCount] = useState(initialValue);
  const duration = 1500;

  useEffect(() => {
      let startValue = initialValue;
      const interval = Math.floor(
          duration / (targetValue - initialValue));

      const counter = setInterval(() => {
          startValue += 1;
          setCount(startValue);
          if (startValue >= targetValue) {
              clearInterval(counter);
          }
      }, interval);

      return () => {
          clearInterval(counter);
      };
  }, [targetValue, initialValue]);

  return (
    <span className="counter">{count}</span>
  );
};

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
        const response = await fetch('/api/stats');
        const data = await response.json();
        setStats(data);
        setCoursesCount(data.coursesCount);
        setTechnologiesCount(data.technologiesCount);
      } catch (e) { }
    }

    fetchCourses();
  }, []);

  return (
    <div className="info-banner">
      <div className="container">
        <span>{dictionary.home.info["browseBetween"]} {coursesCount ? <Counter initialValue={0} targetValue={coursesCount} /> : 0 } {dictionary.home.info["coursesIn"]} {coursesCount ? <Counter initialValue={0} targetValue={technologiesCount} /> : 0 } {dictionary.home.info["technologies"]}</span>
      </div>
    </div>
  );
}
