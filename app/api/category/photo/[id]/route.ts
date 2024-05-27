import dbConnect from "../../../../../lib/dbConnect";
import Technology from "../../../../../models/Technology";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  await dbConnect();

  try {
    const technology = await Technology.findById(id).exec();
    return new Response(technology.photo.data, {
      status: 200,
      headers: { "Content-Type": technology.photo.contentType },
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
