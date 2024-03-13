import { NextApiRequest, NextApiResponse } from "next";
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const categories = await Category.find(
          {}
        ); /* find all the data in our database */
        res.status(200).json({ success: true, data: categories });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    /*case "POST":
      try {
        const pet = await Pet.create(
          req.body
        );
        res.status(201).json({ success: true, data: pet });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;*/
    default:
      res.status(400).json({ success: false });
      break;
  }
}
