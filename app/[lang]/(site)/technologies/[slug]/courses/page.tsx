import { Suspense } from "react";
import type { Metadata, ResolvingMetadata } from "next";
import dbConnect from "@/lib/dbConnect";
import { Technology } from "@/lib/models";
import { getDictionary } from "../../../dictionaries";
import { fetchFilteredCourses } from "@/lib/data/courses";
import { getLocalizedPathFromPrefix } from "@/lib/language";
import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";
import SortingAndFilters from "@/ui/site/courses/SortingAndFilters";
import List from "@/ui/site/courses/list/list";
import Loading from "@/ui/site/courses/list/loading";
import Pagination from "@/ui/site/courses/pagination/pagination";
import CoursesPage from "@/components/pages/technologies/[slug]/courses";

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
    "_id name slug imageColor"
  ).exec();

  return {
    _id: technology._id.toString(),
    name: technology.name,
    slug: technology.slug,
    imageColor: technology.imageColor,
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
    filters?: string;
    sortBy?: string;
  }>;
}) {
  const { lang, slug } = await params;
  const {
    page = 1,
    filters = "",
    sortBy = "newest",
  } = (await searchParams) || {};
  const dictionary = await getDictionary(lang);
  const technology = await getTechnology(slug);

  const filtersArray = filters ? filters.split(",").filter(Boolean) : [];

  const languageMap: Record<string, string> = {
    english: "en",
    spanish: "es",
  };

  const languageFilters = filtersArray
    .filter((f) => f === "english" || f === "spanish")
    .map((f) => languageMap[f]);

  const pricingFilters = filtersArray.filter(
    (f) => f === "free" || f === "paid"
  );

  const languageQuery =
    languageFilters.length > 0 ? languageFilters.join(",") : "";
  const pricingQuery =
    pricingFilters.length > 0 ? pricingFilters.join(",") : "";

  const currentPage = Number(page) || 1;

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

  const queryObject: {
    technology: string;
    language?: string;
    pricing?: string;
  } = {
    technology: technology._id.toString(),
  };

  if (languageQuery) {
    queryObject.language = languageQuery;
  }
  if (pricingQuery) {
    queryObject.pricing = pricingQuery;
  }

  const courses = await fetchFilteredCourses(
    queryObject,
    currentPage,
    sortByValue,
    order
  );

  const coursesArray = JSON.parse(JSON.stringify(courses.docs));

  const coursesData = {
    totalDocs: courses.totalDocs,
    limit: courses.limit,
    totalPages: courses.totalPages,
    page: courses.page,
    pagingCounter: courses.pagingCounter,
    hasPrevPage: courses.hasPrevPage,
    hasNextPage: courses.hasNextPage,
    prevPage: courses.prevPage,
    nextPage: courses.nextPage,
  };

  return (
    <CoursesPage
      technology={technology}
      filtersArray={filtersArray}
      courses={coursesArray}
      coursesData={coursesData}
      lang={lang}
      dictionary={dictionary}
    />
  );
}
