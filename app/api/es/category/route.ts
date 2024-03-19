import dbConnect from "../../../../lib/dbConnect";
import CategoryEs from "../../../../models/CategoryEs";

export async function GET() {
  await dbConnect();

  try {
    const categories = await CategoryEs.find({});
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
