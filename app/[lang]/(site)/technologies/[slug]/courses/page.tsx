import { Suspense } from "react";
import type { Metadata, ResolvingMetadata } from "next";
import dbConnect from "@/lib/dbConnect";
import { Technology, Course } from "@/lib/models";
import { getDictionary } from "../../../dictionaries";
import { fetchFilteredCourses } from "@/lib/data/courses";
import Heading from "@/ui/site/courses/Heading";
import Sorting from "@/ui/site/courses/sorting/sorting";
import Filters from "@/ui/site/courses/Filters";
import List from "@/ui/site/courses/list/list";
import Loading from "@/ui/site/courses/list/loading";
import Pagination from "@/ui/site/courses/pagination/pagination";

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

  return {
    _id: technology._id.toString(),
    name: technology.name,
    imageWhite: technology.imageWhite,
  };
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
    openGraph: {
      title: pageTitle,
      description,
      siteName: "Devs Learning",
      images: [
        {
          url: "https://devslearning.com/assets/opengraph-image.png",
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: ["https://devslearning.com/assets/opengraph-image.png"],
    },
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
  const language = params.get("language") || "";
  const pricing = params.get("pricing") || "";
  const sortBy = params.get("sortBy") || "newest";

  const queryObject: {
    technology: string;
    language?: string;
    pricing?: string;
  } = {
    technology: technology._id.toString(),
  };
  if (language) {
    queryObject.language = language;
  }
  if (pricing) {
    queryObject.pricing = pricing;
  }

  const currentPage = Number(searchParams?.page) || 1;
  const courses = await fetchFilteredCourses(queryObject);

  return (
    <div className="technology">
      <Heading technology={technology} />
      <div className="container">
        <div className="content-wrapper">
          <div className="order-and-filters">
            <Sorting dictionary={dictionary} />
            <Filters
              technologyId={technology._id}
              language={language}
              pricing={pricing}
              dictionary={dictionary}
            />
          </div>
          <p className="courses-count">
            {dictionary.technologies.showing} {courses.totalDocs}{" "}
            {dictionary.technologies.coursesLowercase}:
          </p>
          <div className="courses">
            <Suspense fallback={<Loading />}>
              <List
                query={queryObject}
                sortBy={sortBy}
                currentPage={currentPage}
                dictionary={dictionary}
              />
            </Suspense>
            {courses.totalPages > 1 && (
              <Pagination totalPages={courses.totalPages} />
            )}
            {courses.totalDocs === 0 && (
              <p className="no-results">{dictionary.technologies.noResults}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
