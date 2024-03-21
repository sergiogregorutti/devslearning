import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import Category from "../models/Category";

async function getCategories() {
  await dbConnect();

  const result = await Category.find({});

  const categories = result.map((doc) => {
    const category = JSON.parse(JSON.stringify(doc));
    return category;
  });

  return categories;
}

export default async function Home() {
  const categories = await getCategories();

  return (
    <>
      <h1>DevsLearning</h1>
      <p>Course directory for developers</p>

      <h2>Categories</h2>

      <ul>
        {categories.map((category: any) => (
          <li key={category.name}>
            <Link href={`/categories/${category._id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
