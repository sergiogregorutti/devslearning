import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { getLocalizedPathFromPrefix } from "../../../../lib/language";
import dbConnect from "../../../../lib/dbConnect";
import Category from "../../../../models/Category";
import Course from "../../../../models/Course";
import LanguageSelector from "@/components/languageSelector/LanguageSelector";
import Courses from "@/components/categories/Courses";
import { getDictionary } from "../../dictionaries";
import { StringifyOptions } from "querystring";

type Props = {
  params: { id: string };
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
  const dictionary = await getDictionary(lang);
  const category = await getCategory(id);
  const courses = await getCourses(id, lang);

  return (
    <>
      <LanguageSelector dictionary={dictionary} />
      <br />
      <br />
      <div>
        <Link href={getLocalizedPathFromPrefix(lang, `/`)}>
          {dictionary.categories.goBack}
        </Link>
      </div>
      <h1>
        <img
          src={`/api/category/photo/${category._id}`}
          alt={category.name}
          style={{
            height: "38px",
            marginRight: "10px",
            position: "relative",
            top: "7px",
          }}
        />
        {category.name}
      </h1>
      <h2>{dictionary.categories.courses}</h2>
      <Courses
        categoryId={JSON.parse(JSON.stringify(category._id))}
        courses={JSON.parse(JSON.stringify(courses.docs))}
        dictionary={dictionary}
        language={lang}
      />
    </>
  );
}
