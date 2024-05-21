"use server";

import { s3Client } from "nodejs-s3-typescript";
import dbConnect from "@/lib/dbConnect";
import Category from "../../models/Category";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

//S3 Config
const s3Config = {
  bucketName: process.env.AWS_BUCKET_NAME as string,
  region: process.env.AWS_REGION as string,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  contentType: "",
};

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ["image/png", "image/svg+xml"];

const FormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required."),
  imageWhite: z
    .instanceof(File)
    .optional()
    .refine((file) => {
      return !file || file.size <= MAX_UPLOAD_SIZE;
    }, "File size must be less than 3MB")
    .refine(
      (file) =>
        !file ||
        (file && (file.size === 0 || ACCEPTED_FILE_TYPES.includes(file.type))),
      "File must be a PNG or SVG"
    ),
  imageLightBlue: z
    .instanceof(File)
    .optional()
    .refine((file) => {
      return !file || file.size <= MAX_UPLOAD_SIZE;
    }, "File size must be less than 3MB")
    .refine(
      (file) =>
        !file ||
        (file && (file.size === 0 || ACCEPTED_FILE_TYPES.includes(file.type))),
      "File must be a PNG or SVG"
    ),
  date: z.string(),
});

const CreateTechnology = FormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    name?: string[];
  };
  message?: string | null;
};

export async function createTechnology(prevState: State, formData: FormData) {
  await dbConnect();

  const validatedFields = CreateTechnology.safeParse({
    name: formData.get("name"),
    imageWhite: formData.get("image-white"),
    imageLightBlue: formData.get("image-light-blue"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Technology.",
    };
  }

  const { name, imageWhite, imageLightBlue } = validatedFields.data;

  const newCategory = await Category.create({
    name,
  });

  if (imageWhite && imageWhite.size && imageWhite.size > 0) {
    try {
      const s3 = new s3Client({
        ...s3Config,
        dirName: `${
          process.env.ENVIRONMENT === "production"
            ? ""
            : process.env.ENVIRONMENT
        }/technologies/${newCategory._id}/`,
      });
      let result;
      if (imageWhite.type === "image/svg+xml") {
        result = await s3.uploadFile(
          Buffer.from(await imageWhite.arrayBuffer()),
          "imageWhite.svg"
        );
      } else {
        result = await s3.uploadFile(
          Buffer.from(await imageWhite.arrayBuffer())
        );
      }

      await Category.findByIdAndUpdate(newCategory._id.toString(), {
        imageWhite: result.location,
        imageWhiteFilepath: result.key,
      });
    } catch (e) {}
  }

  if (imageLightBlue && imageLightBlue.size && imageLightBlue.size > 0) {
    try {
      const s3 = new s3Client({
        ...s3Config,
        dirName: `${
          process.env.ENVIRONMENT === "production"
            ? ""
            : process.env.ENVIRONMENT
        }/technologies/${newCategory._id}/`,
      });
      let result;
      if (imageLightBlue.type === "image/svg+xml") {
        result = await s3.uploadFile(
          Buffer.from(await imageLightBlue.arrayBuffer()),
          "imageLightBlue.svg"
        );
      } else {
        result = await s3.uploadFile(
          Buffer.from(await imageLightBlue.arrayBuffer())
        );
      }

      await Category.findByIdAndUpdate(newCategory._id.toString(), {
        imageLightBlue: result.location,
        imageLightBlueFilepath: result.key,
      });
    } catch (e) {}
  }

  revalidatePath("/admin/technologies");
  redirect("/admin/technologies");
}

const UpdateTechnology = FormSchema.omit({ id: true, date: true });

export async function updateTechnology(
  id: string,
  prevState: State,
  formData: FormData
) {
  await dbConnect();

  const validatedFields = UpdateTechnology.safeParse({
    name: formData.get("name"),
    imageWhite: formData.get("image-white"),
    imageLightBlue: formData.get("image-light-blue"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Technology.",
    };
  }

  const { name, imageWhite, imageLightBlue } = validatedFields.data;

  await Category.findByIdAndUpdate(id, { name });

  if (imageWhite && imageWhite.size && imageWhite.size > 0) {
    try {
      const s3 = new s3Client({
        ...s3Config,
        dirName: `${
          process.env.ENVIRONMENT === "production"
            ? ""
            : process.env.ENVIRONMENT
        }/technologies/${id}/`,
      });
      let result;
      if (imageWhite.type === "image/svg+xml") {
        result = await s3.uploadFile(
          Buffer.from(await imageWhite.arrayBuffer()),
          "imageWhite.svg"
        );
      } else {
        result = await s3.uploadFile(
          Buffer.from(await imageWhite.arrayBuffer())
        );
      }

      await Category.findByIdAndUpdate(id, {
        imageWhite: result.location,
        imageWhiteFilepath: result.key,
      });
    } catch (e) {}
  }

  if (imageLightBlue && imageLightBlue.size && imageLightBlue.size > 0) {
    try {
      const s3 = new s3Client({
        ...s3Config,
        dirName: `${
          process.env.ENVIRONMENT === "production"
            ? ""
            : process.env.ENVIRONMENT
        }/technologies/${id}/`,
      });
      let result;
      if (imageLightBlue.type === "image/svg+xml") {
        result = await s3.uploadFile(
          Buffer.from(await imageLightBlue.arrayBuffer()),
          "imageLightBlue.svg"
        );
      } else {
        result = await s3.uploadFile(
          Buffer.from(await imageLightBlue.arrayBuffer())
        );
      }

      await Category.findByIdAndUpdate(id, {
        imageLightBlue: result.location,
        imageLightBlueFilepath: result.key,
      });
    } catch (e) {}
  }

  revalidatePath("/admin/technologies");
  redirect("/admin/technologies");
}

export async function deleteTechnology(id: string) {
  await Category.findByIdAndDelete(id);
  revalidatePath("/admin/technologies");
}
