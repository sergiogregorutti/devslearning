"use client";

import { useState } from "react";

import Sorting from "@/ui/site/courses/sorting/sorting";
import Filters from "@/ui/site/courses/Filters";
import Button from "@/components/ui/Button";

import "./styles.css";

export default function SortingAndFilters({
  technologyId,
  language,
  pricing,
  dictionary,
}: {
  technologyId: string;
  language: string;
  pricing: string;
  dictionary: { [key: string]: any };
}) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="order-and-filters-container">
      <Button
        label={
          isVisible
            ? dictionary.technologyCourses.hideFilters
            : dictionary.technologyCourses.showFilters
        }
        variant="outline"
        size="small"
        onClick={toggleVisibility}
        className="order-and-filters-toggle"
      />
      <div
        className={`${
          isVisible ? "block" : "hidden"
        } order-and-filters-wrapper`}
      >
        <div className="order-and-filters">
          <Sorting dictionary={dictionary} />
          <Filters
            technologyId={technologyId}
            language={language}
            pricing={pricing}
            dictionary={dictionary}
          />
        </div>
      </div>
    </div>
  );
}
