import Link from "next/link";
import dbConnect from "@/lib/dbConnect";
import Category from "@/models/Category";
import { getLocalizedPathFromPrefix } from "@/lib/language";
import { getDictionary } from "./dictionaries";
import { getSession } from "@auth0/nextjs-auth0";

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
      <h1>Devs Learning</h1>
      <p>{dictionary.home.titleDescription}</p>
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
