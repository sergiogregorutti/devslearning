import Form from "@/components/pages/admin/courses/edit-form";
import { fetchCourseById } from "@/lib/data/courses";
import { fetchTechnologies } from "@/lib/data/technologies";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const course = await fetchCourseById(id);
  const technologies = await fetchTechnologies();

  return (
    <>
      <h1>Technologies</h1>
      <h2>Edit</h2>
      <Form course={course} technologies={technologies} />
    </>
  );
}
