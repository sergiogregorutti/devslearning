import type { Metadata } from "next";
import { getDictionary } from "../dictionaries";
import Heading from "@/ui/site/technologies/Heading";
import { fetchCategoriesWithTechnologies } from "@/lib/data/technologiesCategories";
import CategoriesList from "@/ui/site/technologies/CategoriesList";

import "./styles.css";

type Props = {
  params: { lang: string; id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
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

export default async function Technologies({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dictionary = await getDictionary(lang);
  const categories = await fetchCategoriesWithTechnologies();

  return (
    <div className="technology-page">
      <Heading dictionary={dictionary} lang={lang} />
      <div className="container">
        <CategoriesList
          dictionary={dictionary}
          lang={lang}
          categories={categories}
        />
      </div>
    </div>
  );
}
