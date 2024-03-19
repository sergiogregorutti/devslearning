import dbConnect from "../../../../lib/dbConnect";
import CategoryEs from "../../../../models/CategoryEs";
import LayoutEs from "../../../../components/layout/LayoutEs";
import CategoryEsComponent from "../../../../components/category/categoryEs";

async function getCategory(id: String) {
  await dbConnect();

  const category = await CategoryEs.findById(id).exec();

  return category;
}

export default async function CategoryPage({
  params,
}: {
  params: { id: string };
}) {
  const categoryData = await getCategory(params.id);
  return (
    <LayoutEs>
      <CategoryEsComponent
        category={JSON.parse(JSON.stringify(categoryData))}
      />
    </LayoutEs>
  );
}
