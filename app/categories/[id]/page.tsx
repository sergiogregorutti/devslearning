import Link from "next/link";
import dbConnect from "../../../lib/dbConnect";
import Category from "../../../models/Category";
import Course from "../../../models/Course";

async function getCategory(id: String) {
  await dbConnect();

  const category = await Category.findById(id, "name _id").exec();

  return category;
}

async function getCourses(id: String) {
  await dbConnect();

  const courses = await Course.paginate(
    { category: id },
    {
      select: "-photo -category",
    }
  );

  return courses;
}

export default async function CategoryPage({
  params,
}: {
  params: { id: string };
}) {
  const categoryData = await getCategory(params.id);
  const courses = await getCourses(params.id);

  return (
    <>
      <Link href={`/`}>Go Back</Link>
      <h1>{categoryData.name}</h1>
      <h2>Courses</h2>
      <ul>
        {courses.docs.map((course: any) => (
          <li key={course.name}>
            <strong>{course.name}</strong>
            <br />
            {course.description}
            <br />
            Pricing: {course.pricing} | Price: {course.price} | Platform:{" "}
            {course.platform} | Author: {course.author} | Year: {course.year}
          </li>
        ))}
      </ul>
    </>
  );
}
