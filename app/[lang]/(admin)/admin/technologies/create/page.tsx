import Form from "@/app/ui/admin/technologies/create-form";
import { fetchTechnologiesCategories } from "@/lib/data/technologiesCategories";

export default async function Page() {
  const technologiesCategories = await fetchTechnologiesCategories();

  return (
    <>
      <h1>Technologies</h1>
      <h2>Create</h2>
      <Form technologiesCategories={technologiesCategories} />
    </>
  );
}
