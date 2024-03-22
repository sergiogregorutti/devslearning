import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { getLocalizedPathFromPrefix } from "../../../../lib/language";
import dbConnect from "../../../../lib/dbConnect";
import Category from "../../../../models/Category";
import Course from "../../../../models/Course";
import LanguageSelector from "@/components/LanguageSelector";
import { getDictionary } from "../../dictionaries";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

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

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const categoryData = await getCategory(params.id);

  return {
    title: `${categoryData.name} courses | DevsLearning`,
  };
}

export default async function CategoryPage({
  params: { lang, id },
}: {
  params: { lang: string; id: string };
}) {
  const dictionaty = await getDictionary(lang);
  const categoryData = await getCategory(id);
  const courses = await getCourses(id);

  return (
    <>
      <LanguageSelector />
      <br />
      <br />
      <div>
        <Link href={getLocalizedPathFromPrefix(lang, `/`)}>
          {dictionaty.categories.goBack}
        </Link>
      </div>
      <h1>{categoryData.name}</h1>
      <h2>{dictionaty.categories.courses}</h2>
      <ul>
        {courses.docs.map((course: any) => (
          <li key={course.name}>
            <strong>{course.name}</strong>
            <br />
            {course.description}
            <br />
            {dictionaty.categories.pricing}: {course.pricing} |{" "}
            {dictionaty.categories.price}: {course.price} |{" "}
            {dictionaty.categories.platform}: {course.platform} |{" "}
            {dictionaty.categories.author}: {course.author} |{" "}
            {dictionaty.categories.year}: {course.year}
          </li>
        ))}
      </ul>
    </>
  );
}
