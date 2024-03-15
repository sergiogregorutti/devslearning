import dbConnect from "../../../../../../lib/dbConnect";
import CategoryEs from "../../../../../../models/CategoryEs";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  await dbConnect();

  try {
    const category = await CategoryEs.findById(id).exec();
    return new Response(category.photo.data, {
      status: 200,
      headers: { "Content-Type": category.photo.contentType },
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
