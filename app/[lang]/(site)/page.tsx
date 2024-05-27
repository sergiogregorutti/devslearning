import type { Metadata } from "next";
import { headers } from "next/headers";
import { cookies } from "next/headers";
const jwt = require("jsonwebtoken");
import { redirect } from "next/navigation";
import Link from "next/link";
import dbConnect from "@/lib/dbConnect";
import Technology from "@/models/Technology";
import { getLocalizedPathFromPrefix } from "@/lib/language";
import { getDictionary } from "./dictionaries";

import "./styles.css";

type Props = {
  params: { lang: string; id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

async function getTechnologies() {
  await dbConnect();

  const result = await Technology.find({});

  const technologies = result.map((doc: any) => {
    const technology = JSON.parse(JSON.stringify(doc));
    return technology;
  });

  return technologies;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
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
  };
}

export default async function Home({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const cookieStore = cookies();
  const languageCookie = cookieStore.get("language");

  const token = cookieStore.get("token");
  let user = null;
  if (token) {
    user = jwt.decode(token.value);
  }

  if (languageCookie?.value === "es" && lang === "en") {
    redirect("/es/");
  } else {
    const headersList = headers();
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
  const technologies = await getTechnologies();

  return (
    <>
      <div className="welcome">
        <div className="container">
          <div className="col-text">
            <span className="welcome-to">
              {dictionary.home.welcomeTo}&nbsp;
            </span>
            <span className="title">Devs Learning</span>
            <p>{dictionary.home.titleDescription}</p>
          </div>
          <div className="col-image">
            <img src="/assets/boy.svg" />
          </div>
        </div>
      </div>

      <div className="technologies">
        <div className="container">
          <h2>{dictionary.home.technologiesTitle}</h2>
          <div className="technologies-list">
            {technologies.map((technology: any) => (
              <Link
                className="item"
                key={technology.name}
                href={getLocalizedPathFromPrefix(
                  lang,
                  `/technologies/${technology._id}`
                )}
              >
                <img
                  src={`/assets/technologies/${technology._id}.svg`}
                  alt={technology.name}
                />
                <span>{technology.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
