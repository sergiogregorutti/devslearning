import Form from "@/app/[lang]/(admin)/admin/ui/courses/edit-form";
import { fetchCourseById } from "@/lib/data/courses";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const course = await fetchCourseById(id);

  return (
    <>
      <h1>Technologies</h1>
      <h2>Edit</h2>
      <Form course={course} />
    </>
  );
}
