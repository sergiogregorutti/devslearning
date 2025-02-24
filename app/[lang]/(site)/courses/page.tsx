import type { Metadata } from "next";
import { getDictionary } from "../dictionaries";
import Heading from "@/ui/site/coursesHome/Heading";
import { fetchCategoriesWithTechnologies } from "@/lib/data/technologiesCategories";
import CategoriesList from "@/ui/site/coursesHome/CategoriesList";
import Image from "next/image";

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
      <Heading dictionary={dictionary} />
      <div className="container">
        <div className="col-content">
          <CategoriesList
            dictionary={dictionary}
            lang={lang}
            categories={categories}
          />
        </div>
        <div className="col-image">
          <Image
            src="/assets/man_working.svg"
            width={420}
            height={308}
            alt="Devs Learning"
            priority={true}
          />
        </div>
      </div>
    </div>
  );
}
