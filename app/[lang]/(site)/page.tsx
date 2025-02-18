import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { cookies } from "next/headers";
const jwt = require("jsonwebtoken");
import { redirect } from "next/navigation";
import { getDictionary } from "./dictionaries";
import Image from "next/image";
import { fetchTechnologies } from "@/lib/data/technologies";
import { getLocalizedPathFromPrefix } from "@/lib/language";
import InfoBanner from "@/ui/site/home/InfoBanner";
import TechnologiesList from "@/ui/site/home/TechnologiesList";
import FreeContent from "@/ui/site/home/FreeContent";

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
      <div className="welcome">
        <div className="container">
          <div className="col-text">
            <span className={`title ${lang}`}>{dictionary.home.title}</span>
            <span className={`title2 ${lang}`}>{dictionary.home.title2}</span>
            <p>{dictionary.home.subtitle}</p>
            <Link
              className="btn btn-big welcome-cta"
              href={getLocalizedPathFromPrefix(lang, `/technologies`)}
            >
              {dictionary.home.browseTechnologies}
            </Link>
          </div>
          <div className="col-image">
            <Image
              src="/assets/boy.svg"
              width={555}
              height={286}
              alt="Devs Learning"
              priority={true}
            />
          </div>
        </div>
      </div>
      <InfoBanner dictionary={dictionary} />
      <TechnologiesList
        dictionary={dictionary}
        lang={lang}
        technologies={technologies}
      />
      <FreeContent dictionary={dictionary} />
    </>
  );
}
