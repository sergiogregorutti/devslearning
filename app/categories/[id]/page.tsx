import dbConnect from "../../../lib/dbConnect";
import Category from "../../../models/Category";
import Layout from "../../../components/layout/Layout";
import CategoryComponent from "../../../components/category/category";

async function getCategory(id: String) {
  await dbConnect();

  const category = await Category.findById(id).exec();

  return category;
}

export default async function CategoryPage({
  params,
}: {
  params: { id: string };
}) {
  const categoryData = await getCategory(params.id);
  return (
    <Layout>
      <CategoryComponent category={JSON.parse(JSON.stringify(categoryData))} />
    </Layout>
  );
}
