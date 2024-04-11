import Link from "next/link";
import dbConnect from "@/lib/dbConnect";
import Category from "@/models/Category";
import { getLocalizedPathFromPrefix } from "@/lib/language";
import { getDictionary } from "./dictionaries";
import { getSession } from "@auth0/nextjs-auth0";

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
            <img src="../assets/boy.svg" />
          </div>
        </div>
      </div>

      <h2>{dictionary.home.categories}</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {categories.map((category: any) => (
          <li key={category.name}>
            <img
              src={`/api/category/photo/${category._id}`}
              alt={category.name}
              style={{ height: "38px", marginRight: "10px" }}
            />
            <Link
              href={getLocalizedPathFromPrefix(
                lang,
                `/categories/${category._id}`
              )}
              style={{
                lineHeight: "38px",
                display: "inline-block",
                position: "relative",
                top: "-15px",
              }}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
