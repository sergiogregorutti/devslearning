"use client";
import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
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

  const handleLanguageChange = (event: SelectChangeEvent) => {
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

  const handleSortByChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    const sorting = generateSorting(value);
    loadFilteredResults(myFilters, sorting.sortBy, sorting.order);
    setSorting(sorting);
  };

  return (
    <div className="courses">
      <div className="filter-and-sorting">
        <div>
          <label className="form-label">{dictionary.categories.sortBy}</label>
          <FormControl
            sx={{
              width: {
                xs: "200px",
                sm: "200px",
              },
            }}
          >
            <Select value={sorting.id} onChange={handleSortByChange}>
              <MenuItem value={"priceHighToLow"}>
                {dictionary.categories.priceHighToLow}
              </MenuItem>
              <MenuItem value={"priceLowToHigh"}>
                {dictionary.categories.priceLowToHigh}
              </MenuItem>
              <MenuItem value={"newest"}>
                {dictionary.categories.newest}
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <label className="form-label">{dictionary.categories.language}</label>
          <FormControl
            sx={{
              width: {
                xs: "100%",
                sm: "200px",
              },
            }}
          >
            <Select value={language} onChange={handleLanguageChange}>
              <MenuItem value={"all"}>{dictionary.categories.all}</MenuItem>
              <MenuItem value={"en"}>{dictionary.categories.english}</MenuItem>
              <MenuItem value={"es"}>{dictionary.categories.spanish}</MenuItem>
            </Select>
          </FormControl>
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
