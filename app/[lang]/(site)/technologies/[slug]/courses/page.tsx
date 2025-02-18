import { Suspense } from "react";
import type { Metadata, ResolvingMetadata } from "next";
import dbConnect from "@/lib/dbConnect";
import { Technology } from "@/lib/models";
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
  params: Promise<{ lang: string; slug: string }>;
  searchParams?: Promise<{
    page?: string;
    language?: string;
    pricing?: string;
    sortBy?: string;
  }>;
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
  const { lang, slug } = await params;
  const technologyData = await getTechnology(slug);

  let pageTitle;
  let description;

  switch (lang) {
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
  params,
  searchParams,
}: {
  params: Promise<{ lang: string; slug: string }>;
  searchParams?: Promise<{
    page?: string;
    language?: string;
    pricing?: string;
    sortBy?: string;
  }>;
}) {
  const { lang, slug } = await params;
  const {
    page = 1,
    language = "en",
    pricing = "",
    sortBy = "newest",
  } = (await searchParams) || {};
  const dictionary = await getDictionary(lang);
  const technology = await getTechnology(slug);

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

  const currentPage = Number(page) || 1;
  const courses = await fetchFilteredCourses(queryObject);

  return (
    <div className="technology">
      <Heading dictionary={dictionary} lang={lang} technology={technology} />
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
            {courses.totalDocs} {dictionary.technologies.coursesLowercase}
          </p>
          <div className="courses">
            <Suspense fallback={<Loading />}>
              <List
                query={queryObject}
                sortBy={sortBy}
                currentPage={currentPage}
                dictionary={dictionary}
                lang={lang}
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
