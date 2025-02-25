import type { Metadata } from "next";
import { getDictionary } from "../dictionaries";
import { fetchCategoriesWithTechnologies } from "@/lib/data/technologiesCategories";
import PageHeader from "@/components/layout/PageHeader";
import CategoriesList from "@/ui/site/coursesHome/CategoriesList";
import Image from "next/image";
import Container from "@/components/layout/Container";

import "./styles.css";

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
      pageTitle = "Devs Learning | Technologies";
      description = "Browse between our technologies to learn web development";
      break;

    case "es":
      pageTitle = "Devs Learning | Tecnologías";
      description =
        "Navega entre nuestras tecnologías para aprender desarrollo web";
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

export default async function Technologies(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;

  const { lang } = params;

  const dictionary = await getDictionary(lang);
  const categories = await fetchCategoriesWithTechnologies();

  return (
    <div className="courses-page">
      <PageHeader
        title={dictionary.courses.title}
        description={dictionary.courses.description}
        image="/assets/boy2.svg"
      />
      <Container>
        <CategoriesList
          dictionary={dictionary}
          lang={lang}
          categories={categories}
        />
      </Container>
    </div>
  );
}
