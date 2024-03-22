import Link from "next/link";
import dbConnect from "@/lib/dbConnect";
import Category from "@/models/Category";
import { getLocalizedPathFromPrefix } from "@/lib/language";
import LanguageSelector from "@/components/LanguageSelector";
import { getDictionary } from "./dictionaries";

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
      <LanguageSelector dictionary={dictionary} />
      <h1>DevsLearning</h1>
      <p>{dictionary.home.titleDescription}</p>
      <h2>{dictionary.home.categories}</h2>
      <ul>
        {categories.map((category: any) => (
          <li key={category.name}>
            <Link
              href={getLocalizedPathFromPrefix(
                lang,
                `/categories/${category._id}`
              )}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
