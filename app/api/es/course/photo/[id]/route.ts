import dbConnect from "../../../../../../lib/dbConnect";
import CourseEs from "../../../../../../models/CourseEs";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  await dbConnect();

  try {
    const course = await CourseEs.findById(id).exec();
    return new Response(course.photo.data, {
      status: 200,
      headers: { "Content-Type": course.photo.contentType },
    });
  } catch (error) {
    return Response.json(
      { success: false },
      {
        status: 200,
      }
    );
  }
}
