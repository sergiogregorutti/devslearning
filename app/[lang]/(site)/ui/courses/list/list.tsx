import Link from "next/link";
import Image from "next/image";
import { fetchFilteredCourses } from "@/lib/data/courses";

import "./styles.css";

export default async function List({
  query,
  sortBy,
  currentPage,
  dictionary,
}: {
  query: any;
  sortBy: string;
  currentPage: number;
  dictionary: { [key: string]: any };
}) {
  let sortByValue, order;
  switch (sortBy) {
    case "priceHighToLow":
      sortByValue = "price";
      order = "desc";
      break;
    case "priceLowToHigh":
      sortByValue = "price";
      order = "asc";
      break;
    case "newest":
      sortByValue = "year";
      order = "desc";
      break;
  }
  const courses = await fetchFilteredCourses(
    query,
    currentPage,
    sortByValue,
    order
  );

  const renderPricing = (value: String) => {
    switch (value) {
      case "free":
        return (
          <span className="label pricing-free">
            {dictionary.technologies.pricingFree}
          </span>
        );
      case "one-time-payment":
        return (
          <span className="label pricing-one-time">
            {dictionary.technologies.pricingOneTime}
          </span>
        );
      case "subscription":
        return (
          <span className="label pricing-subscription">
            {dictionary.technologies.pricingSubscription}
          </span>
        );
    }
  };

  return (
    <div className="courses-list">
      {courses.docs.map((course: any) => (
        <div className="item" key={course.name}>
          <div className="image">
            {renderPricing(course.pricing)}
            <Image
              src={course.image}
              width={200}
              height={200}
              alt={course.name}
            />
          </div>
          <div className="content">
            <h3>{course.name}</h3>
            <p>{course.description}</p>
            <div className="details">
              <span className="detail">
                <strong>{dictionary.technologies.price}:</strong> US$&nbsp;
                {course.price}
              </span>
              <span className="detail">
                <strong>{dictionary.technologies.platform}:</strong>{" "}
                {course.platform}
              </span>
              <span className="detail">
                <strong>{dictionary.technologies.author}:</strong>{" "}
                {course.author}
              </span>
              <span className="detail">
                <strong>{dictionary.technologies.year}:</strong> {course.year}
              </span>
            </div>
            <Link className="btn" href={course.link} target="_blank">
              {dictionary.technologies.visitCourse}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
