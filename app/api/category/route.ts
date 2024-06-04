import dbConnect from "../../../lib/dbConnect";
import { Technology } from "@/lib/models";

export async function GET() {
  await dbConnect();

  try {
    const technologies = await Technology.find({});
    return Response.json({ success: true, data: technologies });
  } catch (error) {
    return Response.json(
      { success: false },
      {
        status: 200,
      }
    );
  }
}
