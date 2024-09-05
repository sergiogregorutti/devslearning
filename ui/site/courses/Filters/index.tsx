"use client";

import React, { useEffect, useState } from "react";
import Language from "@/ui/site/courses/language/language";
import Pricing from "@/ui/site/courses/Pricing";


export default function Filters({
  dictionary,
  technologyId,
  language,
  pricing,
}: {
  dictionary: { [key: string]: any };
  technologyId: string;
  language: string;
  pricing: string;
}) {
  const [stats, setStats] = useState({});

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch(`/api/technologies/${technologyId}/stats?language=${language}&pricing=${pricing}`);
        const data = await response.json();
        setStats(data);
      } catch (e) { }
    }

    fetchCourses();
  }, [language, pricing]);

  return (
    <div className="filters">
      <Language dictionary={dictionary} stats={stats} />
      <Pricing dictionary={dictionary} stats={stats} />
    </div>
  );
}
