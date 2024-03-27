"use client";
import React, { useEffect, useState } from "react";

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
    getFilteredCourses(newFilters, sortBy, order).then((data) => {
      if (data.error) {
        console.error("There is an error loading the courses");
      } else {
        setFilteredResults(data.courses);
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

  const renderPricing = (value: String) => {
    switch (value) {
      case "free":
        return <>Free</>;
      case "one-time-payment":
        return <>One Time Payment</>;
      case "subscription":
        return <>Subscription</>;
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "15px" }}>
        <strong style={{ display: "inline-block", marginBottom: "5px" }}>
          {dictionary.categories.language}
        </strong>
        <div>
          <input
            style={{
              marginLeft: 0,
              marginRight: "5px",
              marginTop: "5px",
              marginBottom: "5px",
            }}
            type="radio"
            id="all"
            name="language"
            value="all"
            onChange={handleLanguageChange}
            checked={language === "all" ? true : false}
          />
          <label
            htmlFor="all"
            style={{ marginTop: "5px", marginBottom: "5px" }}
          >
            {dictionary.categories.all}
          </label>
          <br />

          <input
            style={{
              marginLeft: 0,
              marginRight: "5px",
              marginTop: "5px",
              marginBottom: "5px",
            }}
            type="radio"
            id="en"
            name="language"
            value="en"
            onChange={handleLanguageChange}
            checked={language === "en" ? true : false}
          />
          <label htmlFor="en" style={{ marginTop: "5px", marginBottom: "5px" }}>
            {dictionary.categories.english}
          </label>
          <br />

          <input
            style={{
              marginLeft: 0,
              marginRight: "5px",
              marginTop: "5px",
              marginBottom: "5px",
            }}
            type="radio"
            id="es"
            name="language"
            value="es"
            onChange={handleLanguageChange}
            checked={language === "es" ? true : false}
          />
          <label htmlFor="es" style={{ marginTop: "5px", marginBottom: "5px" }}>
            {dictionary.categories.spanish}
          </label>
          <br />
        </div>
      </div>
      <div>
        <strong style={{ display: "inline-block", marginBottom: "5px" }}>
          {dictionary.categories.sortBy}
        </strong>
        <div>
          <input
            style={{
              marginLeft: 0,
              marginRight: "5px",
              marginTop: "5px",
              marginBottom: "5px",
            }}
            type="radio"
            id="priceHighToLow"
            name="sortBy"
            value="priceHighToLow"
            onChange={handleSortByChange}
            checked={sorting.id === "priceHighToLow" ? true : false}
          />
          <label
            htmlFor="priceHighToLow"
            style={{ marginTop: "5px", marginBottom: "5px" }}
          >
            {dictionary.categories.priceHighToLow}
          </label>
          <br />

          <input
            style={{
              marginLeft: 0,
              marginRight: "5px",
              marginTop: "5px",
              marginBottom: "5px",
            }}
            type="radio"
            id="priceLowToHigh"
            name="sortBy"
            value="priceLowToHigh"
            onChange={handleSortByChange}
          />
          <label
            htmlFor="priceLowToHigh"
            style={{ marginTop: "5px", marginBottom: "5px" }}
          >
            {dictionary.categories.priceLowToHigh}
          </label>
          <br />

          <input
            style={{
              marginLeft: 0,
              marginRight: "5px",
              marginTop: "5px",
              marginBottom: "5px",
            }}
            type="radio"
            id="newest"
            name="sortBy"
            value="newest"
            onChange={handleSortByChange}
          />
          <label
            htmlFor="newest"
            style={{ marginTop: "5px", marginBottom: "5px" }}
          >
            {dictionary.categories.newest}
          </label>
          <br />
        </div>
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredResults.map((course: any) => (
          <li key={course.name}>
            <div>
              <img
                src={`/api/course/photo/${course._id}`}
                alt={course.name}
                style={{
                  height: "70px",
                  marginTop: "20px",
                  marginBottom: "5px",
                }}
              />
            </div>
            <strong>{course.name}</strong>
            <br />
            {course.description}
            <br />
            {dictionary.categories.pricing}: {renderPricing(course.pricing)} |{" "}
            {dictionary.categories.price}: {course.price} |{" "}
            {dictionary.categories.platform}: {course.platform} |{" "}
            {dictionary.categories.author}: {course.author} |{" "}
            {dictionary.categories.year}: {course.year}
          </li>
        ))}
      </ul>
    </div>
  );
}
