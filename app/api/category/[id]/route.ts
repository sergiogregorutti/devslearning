import dbConnect from "../../../../lib/dbConnect";
import { Technology } from "@/lib/models";

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  await dbConnect();

  try {
    const technology = await Technology.findById(id).exec();
    return Response.json({ success: true, data: technology });
  } catch (error) {
    return Response.json(
      { success: false },
      {
        status: 200,
      }
    );
  }
}
