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
  courses: Course[];
  dictionary: { [key: string]: any };
}

export default function Courses({ courses, dictionary }: CoursesProps) {
  const [filteredResults, setFilteredResults] = useState(courses);
  return (
    <>
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
            {dictionary.categories.pricing}: {course.pricing} |{" "}
            {dictionary.categories.price}: {course.price} |{" "}
            {dictionary.categories.platform}: {course.platform} |{" "}
            {dictionary.categories.author}: {course.author} |{" "}
            {dictionary.categories.year}: {course.year}
          </li>
        ))}
      </ul>
    </>
  );
}
