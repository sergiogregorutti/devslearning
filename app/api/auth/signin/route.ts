import dbConnect from "../../../../lib/dbConnect";
const jwt = require("jsonwebtoken");
import { User } from "@/lib/models";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    const user = await User.findOne({ email });

    if (!user) {
      return Response.json(
        { message: "User with that email does not exist. Please, sign up." },
        {
          status: 400,
        }
      );
    }

    if (!user.authenticate(password)) {
      return Response.json(
        { message: "Email and password do not match." },
        {
          status: 400,
        }
      );
    }

    // Generate token and sent it to client:
    const token = jwt.sign(
      { _id: user._id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "2y",
      }
    );
    const { _id, name, role } = user;
    return Response.json(
      {
        token,
        user: { _id, name, email, role },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("error", error);
    return Response.json(
      { success: false, error },
      {
        status: 200,
      }
    );
  }
}
