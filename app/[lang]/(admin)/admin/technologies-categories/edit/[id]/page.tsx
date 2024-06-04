import Form from "@/app/[lang]/(admin)/admin/ui/technologies-categories/edit-form";
import { fetchTechnologyCategoryById } from "@/lib/data/technologiesCategories";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const technologyCategory = await fetchTechnologyCategoryById(id);

  return (
    <>
      <h1>Technologies</h1>
      <h2>Edit</h2>
      <Form technologyCategory={technologyCategory} />
    </>
  );
}
