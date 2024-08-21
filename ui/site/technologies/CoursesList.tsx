import Link from "next/link";
import Image from "next/image";

export default function CoursesList({
  courses,
  dictionary,
}: {
  courses: any;
  dictionary: { [key: string]: any };
}) {
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
      {courses.map((course: any) => (
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
