import Form from "@/app/ui/admin/courses/create-form";
import { fetchTechnologies } from "@/lib/data/technologies";

export default async function Page() {
  const technologies = await fetchTechnologies();

  return (
    <>
      <h1>Courses</h1>
      <h2>Create</h2>
      <Form technologies={technologies} />
    </>
  );
}
