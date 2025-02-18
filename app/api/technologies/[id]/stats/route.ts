import { type NextRequest } from 'next/server';

import dbConnect from "../../../../../lib/dbConnect";
import { fetchTechnologyStats } from "@/lib/data/technologies";

export async function GET(request: NextRequest, props: { params: Promise<{ id: string; }> }) {
  const params = await props.params;
  const id = params.id;

  const searchParams = request.nextUrl.searchParams;
  const language = searchParams.get("language") || '';
  const pricing = searchParams.get("pricing") || '';

  await dbConnect();

  try {
    const technologyStats = await fetchTechnologyStats(id, language, pricing);
    return Response.json(technologyStats);
  } catch (error) {
    return Response.json(
      { success: false },
      {
        status: 200,
      }
    );
  }
}
