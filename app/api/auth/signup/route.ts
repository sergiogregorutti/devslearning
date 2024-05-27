import dbConnect from "../../../../lib/dbConnect";
const jwt = require("jsonwebtoken");
import User from "../../../../models/User";
import { sendEmailWithResend } from "../../../../lib/email";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const formData = await request.formData();
    let lang = formData.get("lang");
    if (lang === "en") {
      lang = "";
    } else {
      lang = "/es";
    }
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    const user = await User.findOne({ email });

    if (user) {
      return Response.json(
        { message: "E-mail is taken" },
        {
          status: 200,
        }
      );
    }

    const token = jwt.sign(
      { name, email, password },
      process.env.JWT_ACCOUNT_ACTIVATION,
      { expiresIn: "30m" }
    );

    const emailData = {
      from: "Devs Learning <noreply@devslearning.com>",
      to: email,
      subject: "ACCOUNT ACTIVATION LINK",
      text: `
            Please use the following link to activate your account
            ${process.env.DOMAIN}${lang}/auth/activate-account/${token}
            his email may contain sensitive information
            ${process.env.DOMAIN}
        `,
      html: `
      <h1>Please use the following link to activate your account</h1>
      <p>${process.env.DOMAIN}${lang}/auth/activate-account/${token}</p>
      <hr />
      <p>This email may contain sensitive information</p>
      <p>${process.env.DOMAIN}</p>
  `,
    };

    const emailSent = await sendEmailWithResend(emailData);

    if (emailSent) {
      return Response.json(
        {
          message:
            "Email has been sent to your email. Follow the instruction to activate your account",
        },
        {
          status: 200,
        }
      );
    }
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
