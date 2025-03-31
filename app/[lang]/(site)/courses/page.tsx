import type { Metadata } from "next";
import { fetchCategoriesWithTechnologies } from "@/lib/data/technologiesCategories";
import CoursesPage from "@/components/pages/courses";

type Props = {
  params: Promise<{ lang: string; id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  let pageTitle;
  let description;

  switch (params.lang) {
    case "en":
      pageTitle = "Devs Learning | Courses";
      description = "Browse between our courses to learn web development";
      break;

    case "es":
      pageTitle = "Devs Learning | Cursos";
      description = "Navega entre nuestros cursos para aprender desarrollo web";
      break;
  }

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: "https://www.devslearning.com/courses",
      languages: {
        es: "https://www.devslearning.com/es/courses",
      },
    },
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

export default async function Courses() {
  const categories = await fetchCategoriesWithTechnologies();

  return <CoursesPage categories={categories} />;
}
