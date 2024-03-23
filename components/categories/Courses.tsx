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
}

export default function Courses({
  categoryId,
  courses,
  dictionary,
}: CoursesProps) {
  const [myFilters, setMyFilters] = useState<any>({
    filters: { category: categoryId },
  });
  const [sortBy, setSortBy] = useState<any>("priceHighToLow");
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
          sortBy: "price",
          order: "desc",
        };
      case "priceLowToHigh":
        return {
          sortBy: "price",
          order: "asc",
        };
      case "newest":
        return {
          sortBy: "year",
          order: "desc",
        };
      default:
        return {
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

  const handleSortByChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const sorting = generateSorting(value);
    loadFilteredResults(myFilters.filters, sorting.sortBy, sorting.order);
    setSortBy(value);
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
      <strong style={{ display: "inline-block", marginBottom: "5px" }}>
        Sort By
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
        />
        <label
          htmlFor="priceHighToLow"
          style={{ marginTop: "5px", marginBottom: "5px" }}
        >
          Price: High to Low
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
          Price: Low to High
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
          Newest
        </label>
        <br />
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
