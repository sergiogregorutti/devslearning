import dbConnect from "../../../../lib/dbConnect";
import Category from "../../../../models/Category";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  await dbConnect();

  try {
    const category = await Category.findById(id).exec();
    return Response.json({ success: true, data: category });
  } catch (error) {
    return Response.json(
      { success: false },
      {
        status: 200,
      }
    );
  }
}
