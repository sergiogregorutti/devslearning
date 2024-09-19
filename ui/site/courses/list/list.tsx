import Link from "next/link";
import Image from "next/image";
import { fetchFilteredCourses } from "@/lib/data/courses";
import {
  FaDollarSign,
  FaLaptopCode,
  FaUser,
  FaCalendarDays,
  FaGlobe,
  FaUpRightFromSquare,
} from "react-icons/fa6";

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
        <Link
          href={course.link}
          target="_blank"
          key={course.name}
          className="item-link"
        >
          <div className="item">
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
              <h3>
                {course.name} <FaUpRightFromSquare />
              </h3>
              <p>{course.description}</p>
              <div className="details">
                <span
                  className="detail price"
                  title={dictionary.technologies.price}
                >
                  <span className="attribute">
                    <FaDollarSign />
                  </span>{" "}
                  {course.price > 0
                    ? `US$ ${course.price}`
                    : dictionary.technologies.pricingFree}
                </span>
                <span
                  className="detail platform"
                  title={dictionary.technologies.platform}
                >
                  <span className="attribute">
                    <FaLaptopCode />
                  </span>{" "}
                  {course.platform}
                </span>
                {course.author !== "" ? (
                  <span
                    className="detail author"
                    title={dictionary.technologies.author}
                  >
                    <span className="attribute">
                      <FaUser />
                    </span>{" "}
                    {course.author}
                  </span>
                ) : null}
                <span
                  className="detail year"
                  title={dictionary.technologies.year}
                >
                  <span className="attribute">
                    <FaCalendarDays />
                  </span>{" "}
                  {course.year}
                </span>
                <span
                  className="detail language"
                  title={dictionary.technologies.language}
                >
                  <span className="attribute">
                    <FaGlobe />
                  </span>{" "}
                  {course.language === "en"
                    ? dictionary.technologies.english
                    : dictionary.technologies.spanish}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
