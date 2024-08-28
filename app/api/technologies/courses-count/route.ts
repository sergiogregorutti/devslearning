import { fetchTechnologiesCoursesCount } from "@/lib/data/technologies";

export async function GET() {
  const technologiesCoursesCount = await fetchTechnologiesCoursesCount();

  return Response.json(technologiesCoursesCount);
}
