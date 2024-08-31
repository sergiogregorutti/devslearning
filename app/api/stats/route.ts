import { fetchTechnologies } from "@/lib/data/technologies";
import { fetchCourses } from "@/lib/data/courses";

export async function GET() {
  const technologies = await fetchTechnologies();
  const courses = await fetchCourses();

  return Response.json({
    technologiesCount: technologies.length,
    coursesCount: courses.length
  });
}
