import Form from "@/ui/admin/technologies-categories/edit-form";
import { fetchTechnologyCategoryById } from "@/lib/data/technologiesCategories";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
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
