import Link from "next/link";

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
            {dictionary.categories.pricingFree}
          </span>
        );
      case "one-time-payment":
        return (
          <span className="label pricing-one-time">
            {dictionary.categories.pricingOneTime}
          </span>
        );
      case "subscription":
        return (
          <span className="label pricing-subscription">
            {dictionary.categories.pricingSubscription}
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
            <img src={`/api/course/photo/${course._id}`} alt={course.name} />
          </div>
          <div className="content">
            <h3>{course.name}</h3>
            <p>{course.description}</p>
            <div className="details">
              <span>
                <strong>{dictionary.categories.price}:</strong> US$&nbsp;
                {course.price}
              </span>
              <span>
                <strong>{dictionary.categories.platform}:</strong>{" "}
                {course.platform}
              </span>
              <span>
                <strong>{dictionary.categories.author}:</strong> {course.author}
              </span>
              <span>
                <strong>{dictionary.categories.year}:</strong> {course.year}
              </span>
            </div>
            <Link className="btn" href={course.link} target="_blank">
              {dictionary.categories.visitCourse}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
