"use client";
import React, { useState, Suspense } from "react";
import Loading from "./loading";
import CoursesList from "@/components/categories/CoursesList";

interface Course {
  name: string;
  description: string;
  pricing: string;
  price: number;
  platform: string;
  author: string;
  year: number;
}

interface CoursesProps {
  categoryId: number;
  courses: Course[];
  dictionary: { [key: string]: any };
  language: String;
}

import "./styles.css";

export default function Courses({
  categoryId,
  courses,
  dictionary,
  language: defaultLanguage,
}: CoursesProps) {
  const [myFilters, setMyFilters] = useState<any>({
    category: categoryId,
    language: defaultLanguage,
  });
  const [language, setLanguage] = useState<any>(defaultLanguage);
  const [sorting, setSorting] = useState<any>({
    id: "priceHighToLow",
    sortBy: "price",
    order: "desc",
  });
  const [filteredResults, setFilteredResults] = useState(courses);
  const [isLoading, setIsLoading] = useState(false);

  const getFilteredCourses = (
    filters = {},
    sortBy: String = "price",
    order: String = "desc"
  ) => {
    const data = {
      filters,
      sortBy,
      order,
    };
    return fetch(`/api/courses/by/search`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const generateSorting = (value: String) => {
    switch (value) {
      case "priceHighToLow":
        return {
          id: "priceHighToLow",
          sortBy: "price",
          order: "desc",
        };
      case "priceLowToHigh":
        return {
          id: "priceLowToHigh",
          sortBy: "price",
          order: "asc",
        };
      case "newest":
        return {
          id: "newest",
          sortBy: "year",
          order: "desc",
        };
      default:
        return {
          id: "priceHighToLow",
          sortBy: "price",
          order: "desc",
        };
    }
  };

  const loadFilteredResults = (
    newFilters: any,
    sortBy: String,
    order: String
  ) => {
    setIsLoading(true);
    getFilteredCourses(newFilters, sortBy, order).then((data) => {
      if (data.error) {
        console.error("There is an error loading the courses");
      } else {
        setFilteredResults(data.courses);
        setIsLoading(false);
      }
    });
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    let newFilters = {};

    if (value === "all") {
      newFilters = {
        category: categoryId,
      };
    } else {
      newFilters = {
        ...myFilters,
        language: value,
      };
    }

    loadFilteredResults(newFilters, sorting.sortBy, sorting.order);
    setMyFilters(newFilters);
    setLanguage(value);
  };

  const handleSortByChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const sorting = generateSorting(value);
    loadFilteredResults(myFilters, sorting.sortBy, sorting.order);
    setSorting(sorting);
  };

  return (
    <div className="courses">
      <div className="filter-and-sorting">
        <div>
          <span className="label">{dictionary.categories.sortBy}</span>
          <div className="inputs">
            <label className="custom-radio-button" htmlFor="priceHighToLow">
              {dictionary.categories.priceHighToLow}
              <input
                type="radio"
                id="priceHighToLow"
                name="sortBy"
                value="priceHighToLow"
                onChange={handleSortByChange}
                checked={sorting.id === "priceHighToLow" ? true : false}
              />
              <span className="checkmark"></span>
            </label>

            <label className="custom-radio-button" htmlFor="priceLowToHigh">
              {dictionary.categories.priceLowToHigh}
              <input
                type="radio"
                id="priceLowToHigh"
                name="sortBy"
                value="priceLowToHigh"
                onChange={handleSortByChange}
              />
              <span className="checkmark"></span>
            </label>

            <label className="custom-radio-button" htmlFor="newest">
              {dictionary.categories.newest}
              <input
                type="radio"
                id="newest"
                name="sortBy"
                value="newest"
                onChange={handleSortByChange}
              />
              <span className="checkmark"></span>
            </label>
          </div>
        </div>
        <div>
          <span className="label">{dictionary.categories.language}</span>
          <div className="inputs">
            <label className="custom-radio-button" htmlFor="all">
              {dictionary.categories.all}
              <input
                type="radio"
                id="all"
                name="language"
                value="all"
                onChange={handleLanguageChange}
                checked={language === "all" ? true : false}
              />
              <span className="checkmark"></span>
            </label>

            <label className="custom-radio-button" htmlFor="en">
              {dictionary.categories.english}
              <input
                type="radio"
                id="en"
                name="language"
                value="en"
                onChange={handleLanguageChange}
                checked={language === "en" ? true : false}
              />
              <span className="checkmark"></span>
            </label>

            <label className="custom-radio-button" htmlFor="es">
              {dictionary.categories.spanish}
              <input
                type="radio"
                id="es"
                name="language"
                value="es"
                onChange={handleLanguageChange}
                checked={language === "es" ? true : false}
              />
              <span className="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <CoursesList courses={filteredResults} dictionary={dictionary} />
      )}
    </div>
  );
}
