import Form from "@/app/[lang]/(admin)/admin/ui/technologies/edit-form";
import { fetchTechnologyById } from "@/lib/data/technologies";
import { fetchTechnologiesCategories } from "@/lib/data/technologiesCategories";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const technology = await fetchTechnologyById(id);
  const technologiesCategories = await fetchTechnologiesCategories();

  return (
    <>
      <h1>Technologies</h1>
      <h2>Edit</h2>
      <Form
        technology={technology}
        technologiesCategories={technologiesCategories}
      />
    </>
  );
}
