import { headers } from "next/headers";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import dbConnect from "@/lib/dbConnect";
import Category from "@/models/Category";
import { getLocalizedPathFromPrefix } from "@/lib/language";
import { getDictionary } from "./dictionaries";

import "./styles.css";

async function getCategories() {
  await dbConnect();

  const result = await Category.find({});

  const categories = result.map((doc) => {
    const category = JSON.parse(JSON.stringify(doc));
    return category;
  });

  return categories;
}

export default async function Home({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const cookieStore = cookies();
  const languageCookie = cookieStore.get("language");

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
  const categories = await getCategories();

  return (
    <>
      <div className="welcome">
        <div className="container">
          <div className="col-text">
            <span className="welcome-to">{dictionary.home.welcomeTo}</span>
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
            {categories.map((category: any) => (
              <Link
                className="item"
                key={category.name}
                href={getLocalizedPathFromPrefix(
                  lang,
                  `/categories/${category._id}`
                )}
              >
                <img
                  src={`/assets/technologies/${category._id}.svg`}
                  alt={category.name}
                />
                <span>{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
