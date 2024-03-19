import dbConnect from "../../../../../lib/dbConnect";
import Course from "../../../../../models/Course";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  await dbConnect();

  try {
    const course = await Course.findById(id).exec();
    return new Response(course.photo.data, {
      status: 200,
      headers: { "Content-Type": course.photo.contentType },
    });
    return Response.json({ success: true, data: course });
  } catch (error) {
    return Response.json(
      { success: false },
      {
        status: 200,
      }
    );
  }
}
