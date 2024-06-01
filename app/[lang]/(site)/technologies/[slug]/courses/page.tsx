import { Suspense } from "react";
import type { Metadata, ResolvingMetadata } from "next";
import dbConnect from "../../../../../../lib/dbConnect";
import Technology from "../../../../../../models/Technology";
import Course from "../../../../../../models/Course";
import { getDictionary } from "../../../dictionaries";
import Image from "next/image";
import { fetchCoursesPages } from "@/lib/data/courses";
import Sorting from "../../../ui/courses/sorting/sorting";
import Language from "../../../ui/courses/language/language";
import List from "../../../ui/courses/list/list";
import Loading from "../../../ui/courses/list/loading";
import Pagination from "../../../ui/courses/pagination/pagination";

import "./styles.css";

type Props = {
  params: { lang: string; slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

async function getTechnology(slug: String) {
  await dbConnect();

  const technology = await Technology.findOne(
    { slug: slug },
    "_id name imageWhite"
  ).exec();

  return technology;
}

async function getCourses(id: String, lang: String) {
  await dbConnect();

  const courses = await Course.paginate(
    { technology: id, language: lang },
    {
      select: "-technology",
      sort: "-price",
    }
  );

  return courses;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const technologyData = await getTechnology(params.slug);

  let pageTitle;
  let description;

  switch (params.lang) {
    case "en":
      pageTitle = `${technologyData.name} courses | Devs Learning`;
      description = `The best courses to learn ${technologyData.name}`;
      break;

    case "es":
      pageTitle = `Cursos de ${technologyData.name} | Devs Learning`;
      description = `Los mejores cursos para aprender ${technologyData.name}`;
      break;
  }

  return {
    title: pageTitle,
    description,
  };
}

export default async function TechnologyPage({
  params: { lang, slug },
  searchParams,
}: {
  params: { lang: string; slug: string };
  searchParams?: {
    page?: string;
  };
}) {
  const dictionary = await getDictionary(lang);
  const technology = await getTechnology(slug);

  const params = new URLSearchParams(searchParams);
  const language = params.get("language") || lang;
  const sortBy = params.get("sortBy") || "priceHighToLow";

  const queryObject: { technology: string; language?: string } = {
    technology: technology._id.toString(),
  };
  if (language !== "all") {
    queryObject.language = language;
  }

  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchCoursesPages(queryObject);

  return (
    <div className="technology">
      <div className="heading">
        <div className="container">
          <Image
            src={technology.imageWhite}
            width={70}
            height={70}
            alt={technology.name}
          />
          <h1>{technology.name}</h1>
        </div>
      </div>
      <div className="container">
        <div className="courses">
          <div className="filter-and-sorting">
            <Sorting dictionary={dictionary} />
            <Language lang={lang} dictionary={dictionary} />
          </div>
          <Suspense fallback={<Loading />}>
            <List
              query={queryObject}
              sortBy={sortBy}
              currentPage={currentPage}
              dictionary={dictionary}
            />
          </Suspense>
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
