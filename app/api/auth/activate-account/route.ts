import dbConnect from "../../../../lib/dbConnect";
const jwt = require("jsonwebtoken");
import User from "../../../../models/User";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const formData = await request.formData();
    const token = formData.get("token");

    if (token) {
      await new Promise((resolve, reject) => {
        var decodedToken = jwt.verify(
          token,
          process.env.JWT_ACCOUNT_ACTIVATION
        );

        if (decodedToken) {
          resolve(decodedToken);
        } else {
          reject("Invalid token");
        }
      });

      const { name, email, password } = jwt.decode(token);
      const user = new User({ name, email, password });

      const userSaved = await user.save();

      if (userSaved) {
        return Response.json(
          { message: "Signup success. Please signin." },
          {
            status: 200,
          }
        );
      } else {
        return Response.json(
          {
            success: false,
            error: "Error saving user in database. Try sign up again.",
          },
          {
            status: 401,
          }
        );
      }

      /*
      jwt.verify(
        token,
        process.env.JWT_ACCOUNT_ACTIVATION,
        function (err: any) {
          if (err) {
            console.log("Verify activation error");
            return Response.json(
              { success: false, error: "Expired link. Sign up again." },
              {
                status: 401,
              }
            );
          }

          const { name, email, password } = jwt.decode(token);
          const user = new User({ name, email, password });

          user.save((err: any) => {
            if (err) {
              console.log("Save user error", err);
              return Response.json(
                {
                  success: false,
                  error: "Error saving user in database. Try sign up again.",
                },
                {
                  status: 401,
                }
              );
            }

            return Response.json(
              { message: "Signup success. Please signin." },
              {
                status: 200,
              }
            );
          });
        }
      );
      */
      console.log("enter here");
    } else {
      return Response.json(
        { success: false, error: "Something went wrong. Try again." },
        {
          status: 200,
        }
      );
    }
  } catch (error: any) {
    console.log("error response", error);
    return Response.json(
      { success: false, error: error },
      {
        status: 200,
      }
    );
  }
}
