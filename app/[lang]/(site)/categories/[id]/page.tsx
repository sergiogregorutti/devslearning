import type { Metadata, ResolvingMetadata } from "next";
import dbConnect from "../../../../../lib/dbConnect";
import Category from "../../../../../models/Category";
import Course from "../../../../../models/Course";
import Courses from "@/components/categories/Courses";
import { getDictionary } from "../../dictionaries";

import "./styles.css";

type Props = {
  params: { lang: string; id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

async function getCategory(id: String) {
  await dbConnect();

  const category = await Category.findById(id, "name _id").exec();

  return category;
}

async function getCourses(id: String, lang: String) {
  await dbConnect();

  const courses = await Course.paginate(
    { category: id, language: lang },
    {
      select: "-photo -category",
      sort: "-price",
    }
  );

  return courses;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const categoryData = await getCategory(params.id);

  let pageTitle;
  let description;

  switch (params.lang) {
    case "en":
      pageTitle = `${categoryData.name} courses | Devs Learning`;
      description = `The best courses to learn ${categoryData.name}`;
      break;

    case "es":
      pageTitle = `Cursos de ${categoryData.name} | Devs Learning`;
      description = `Los mejores cursos para aprender ${categoryData.name}`;
      break;
  }

  return {
    title: pageTitle,
    description,
  };
}

export default async function CategoryPage({
  params: { lang, id },
}: {
  params: { lang: string; id: string };
}) {
  const dictionary = await getDictionary(lang);
  const category = await getCategory(id);
  const courses = await getCourses(id, lang);

  return (
    <div className="technology">
      <div className="heading">
        <div className="container">
          <img
            src={`/assets/technologies/${category._id}.svg`}
            alt={category.name}
          />
          <h1>{category.name}</h1>
        </div>
      </div>
      <div className="container">
        <Courses
          categoryId={JSON.parse(JSON.stringify(category._id))}
          courses={JSON.parse(JSON.stringify(courses.docs))}
          dictionary={dictionary}
          language={lang}
        />
      </div>
    </div>
  );
}
