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

  const currentPage = Number(page) || 1;
  const courses = await fetchFilteredCourses(queryObject);

  console.log("courses", courses);

  return (
    <CoursesPage
      technology={technology}
      filtersArray={filtersArray}
      lang={lang}
      dictionary={dictionary}
    />
  );

  /*
  return (
    <div className="technology">
      <PageHeader
        title={
          lang === "en"
            ? `${technology.name} Courses`
            : `Cursos de ${technology.name}`
        }
        description={
          lang === "en"
            ? `Discover our selection of the best ${technology.name} courses, carefully curated to help you master web development. You can filter courses by language and price, and sort them based on your preferences to find the perfect fit for your learning journey.`
            : `Descubre nuestra selección de los mejores cursos de ${technology.name}, cuidadosamente seleccionados para ayudarte a dominar el desarrollo web. Puedes filtrar los cursos por idioma y precio, y ordenarlos según tus preferencias para encontrar la opción perfecta para tu aprendizaje.`
        }
        image={technology.imageColor}
        imageMobileHidden={true}
        breadcrumb={[
          {
            name: dictionary.common.navigation.courses,
            link: getLocalizedPathFromPrefix(lang, `/courses/`),
          },
        ]}
      />
      <Container>
        <div className="content-wrapper">
          <SortingAndFilters
            technologyId={technology._id}
            language={language}
            pricing={pricing}
            dictionary={dictionary}
          />
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
      </Container>
    </div>
  );
  */
}
