import type { Metadata } from "next";
import { headers } from "next/headers";
import { cookies } from "next/headers";
const jwt = require("jsonwebtoken");
import { redirect } from "next/navigation";
import { getDictionary } from "./dictionaries";
import Image from "next/image";
import { fetchTechnologies } from "@/lib/data/technologies";
import HeroSlider from "@/ui/site/home/HeroSlider";
import StatsSection from "@/ui/site/home/StatsSection";
import CoursesSection from "@/ui/site/home/CoursesSection";
import TechnologiesSection from "@/ui/site/home/TechnologiesSection";
import RoadmapsSection from "@/ui/site/home/RoadmapsSection";

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
      pageTitle = "Devs Learning | Course directory for developers";
      description = "Discover the best courses to learn web development";
      break;

    case "es":
      pageTitle = "Devs Learning | Directorio de cursos para desarrolladores";
      description = "Descubre los mejores cursos para aprender desarrollo web";
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

export default async function Home(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;

  const { lang } = params;

  const cookieStore = await cookies();
  const languageCookie = cookieStore.get("language");

  const token = cookieStore.get("token");
  let user = null;
  if (token) {
    user = jwt.decode(token.value);
  }

  if (languageCookie?.value === "es" && lang === "en") {
    redirect("/es/");
  } else {
    const headersList = await headers();
    const acceptLanguage = headersList.get("accept-language");
    if (
      lang === "en" &&
      languageCookie?.value !== "en" &&
      acceptLanguage?.includes("es")
    ) {
      redirect("/es/");
    }
  }

  const dictionary = await getDictionary(lang);
  const technologies = await fetchTechnologies(4);

  return (
    <>
      <HeroSlider dictionary={dictionary} lang={lang} />
      <StatsSection dictionary={dictionary} />
      <CoursesSection
        dictionary={dictionary}
        lang={lang}
        technologies={technologies}
      />
      <TechnologiesSection dictionary={dictionary} lang={lang} />
      <RoadmapsSection dictionary={dictionary} lang={lang} />
    </>
  );
}
