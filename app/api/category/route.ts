import dbConnect from "../../../lib/dbConnect";
import Category from "../../../models/Category";

export async function GET() {
  await dbConnect();

  try {
    const categories = await Category.find({});
    return Response.json({ success: true, data: categories });
  } catch (error) {
    return Response.json(
      { success: false },
      {
        status: 200,
      }
    );
  }
}
