"use server";

import dbConnect from "@/lib/dbConnect";
import Technology from "../../models/Technology";
import { uploadFile, deleteFile } from "@/lib/files";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

  const newTechnology = await Technology.create({
    name,
  });

  if (imageWhite && imageWhite.size && imageWhite.size > 0) {
    try {
      const path = `${
        process.env.ENVIRONMENT === "production"
          ? ""
          : `${process.env.ENVIRONMENT}/`
      }technologies/${newTechnology._id}/`;

      const result = await uploadFile(imageWhite, path);

      await Technology.findByIdAndUpdate(newTechnology._id.toString(), {
        imageWhite: result.location,
        imageWhiteFilepath: result.key,
      });
    } catch (e) {}
  }

  if (imageLightBlue && imageLightBlue.size && imageLightBlue.size > 0) {
    try {
      const path = `${
        process.env.ENVIRONMENT === "production"
          ? ""
          : `${process.env.ENVIRONMENT}/`
      }technologies/${newTechnology._id}/`;

      const result = await uploadFile(imageLightBlue, path);

      await Technology.findByIdAndUpdate(newTechnology._id.toString(), {
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

  await Technology.findByIdAndUpdate(id, { name });

  let technology;
  if (
    (imageWhite && imageWhite.size && imageWhite.size > 0) ||
    (imageLightBlue && imageLightBlue.size && imageLightBlue.size > 0)
  ) {
    technology = await Technology.findByIdAndUpdate(id, { name });
  }

  if (imageWhite && imageWhite.size && imageWhite.size > 0) {
    try {
      if (
        technology.imageWhiteFilepath !== undefined &&
        technology.imageWhiteFilepath !== ""
      ) {
        await deleteFile(technology.imageWhiteFilepath);
      }

      const path = `${
        process.env.ENVIRONMENT === "production"
          ? ""
          : `${process.env.ENVIRONMENT}/`
      }technologies/${id}/`;

      const result = await uploadFile(imageWhite, path);

      await Technology.findByIdAndUpdate(id.toString(), {
        imageWhite: result.location,
        imageWhiteFilepath: result.key,
      });
    } catch (e) {
      console.log("error", e);
    }
  }

  if (imageLightBlue && imageLightBlue.size && imageLightBlue.size > 0) {
    try {
      if (
        technology.imageWhiteFilepath !== undefined &&
        technology.imageWhiteFilepath !== ""
      ) {
        await deleteFile(technology.imageLightBlueFilepath);
      }

      const path = `${
        process.env.ENVIRONMENT === "production"
          ? ""
          : `${process.env.ENVIRONMENT}/`
      }technologies/${id}/`;

      const result = await uploadFile(imageLightBlue, path);

      await Technology.findByIdAndUpdate(id.toString(), {
        imageLightBlue: result.location,
        imageLightBlueFilepath: result.key,
      });
    } catch (e) {}
  }

  revalidatePath("/admin/technologies");
  redirect("/admin/technologies");
}

export async function deleteTechnology(id: string) {
  await Technology.findByIdAndDelete(id);
  revalidatePath("/admin/technologies");
}
