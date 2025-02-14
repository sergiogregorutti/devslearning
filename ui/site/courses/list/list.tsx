import { getLocalizedPathFromPrefix } from "@/lib/language";
import Link from "next/link";
import Image from "next/image";
import { fetchFilteredCourses } from "@/lib/data/courses";

import "./styles.css";

export default async function List({
  query,
  sortBy,
  currentPage,
  dictionary,
  lang,
}: {
  query: any;
  sortBy: string;
  currentPage: number;
  dictionary: { [key: string]: any };
  lang: string;
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
        return dictionary.technologies.pricingFree;
      case "one-time-payment":
        return ` (${dictionary.technologies.pricingOneTime})`;
      case "subscription":
        return ` (${dictionary.technologies.pricingSubscription})`;
    }
  };

  return (
    <div className="courses-list">
      {courses.docs.map((course: any) => (
        <Link
          href={getLocalizedPathFromPrefix(lang, `/courses/${course.id}/`)}
          key={course.name}
          className="item-link"
        >
          <div className="item">
            <div className="image">
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
                <div className="details-item">
                  <span>{dictionary.technologies.price}:</span>
                  {course.price > 0 ? `US$ ${course.price}` : ""}
                  {renderPricing(course.pricing)}
                </div>
                <div className="details-item">
                  <span>{dictionary.technologies.platform}:</span>
                  {course.platform || "---"}
                </div>
                <div className="details-item">
                  <span>{dictionary.technologies.author}:</span>
                  {course.author || "---"}
                </div>
                <div className="details-item">
                  <span>{dictionary.technologies.year}:</span>
                  {course.year}
                </div>
                <div className="details-item">
                  <span>{dictionary.technologies.language}:</span>
                  {course.language === "en"
                    ? dictionary.technologies.english
                    : dictionary.technologies.spanish}
                </div>
              </div>
              <button className="btn btn-big">
                {dictionary.technologies.viewMore}
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
