"use server";

import dbConnect from "@/lib/dbConnect";
import { Technology } from "@/lib/models";
import { uploadFile, deleteFile } from "@/lib/files";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ["image/png", "image/svg+xml"];

const FormSchema = z.object({
  id: z.string(),
  technology_category: z.string().min(1, "Technology Category is required."),
  order: z.number().min(1, "Order is required."),
  name: z.string().min(1, "Name is required."),
  description: z.string().optional(),
  description_es: z.string().optional(),
  long_description: z.string().optional(),
  long_description_es: z.string().optional(),
  slug: z.string().min(1, "Slug is required."),
  imageColor: z
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
    technology_category?: string[];
    name?: string[];
  };
  message?: string | null;
};

export async function createTechnology(prevState: State, formData: FormData) {
  await dbConnect();

  const validatedFields = CreateTechnology.safeParse({
    technology_category: formData.get("technology_category"),
    order: Number(formData.get("order")),
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    description_es: formData.get("description_es"),
    long_description: formData.get("long_description"),
    long_description_es: formData.get("long_description_es"),
    imageColor: formData.get("image-color"),
    imageWhite: formData.get("image-white"),
    imageLightBlue: formData.get("image-light-blue"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Technology.",
    };
  }

  const {
    technology_category,
    order,
    name,
    slug,
    description,
    description_es,
    long_description,
    long_description_es,
    imageColor,
    imageWhite,
    imageLightBlue,
  } = validatedFields.data;

  const newTechnology = await Technology.create({
    technologyCategory: technology_category,
    order,
    name,
    slug,
    description,
    description_es,
    long_description,
    long_description_es,
  });

  if (imageColor && imageColor.size && imageColor.size > 0) {
    try {
      const path = `${
        process.env.ENVIRONMENT === "production"
          ? ""
          : `${process.env.ENVIRONMENT}/`
      }technologies/${newTechnology._id}/`;

      const result = await uploadFile(imageColor, path);

      await Technology.findByIdAndUpdate(newTechnology._id.toString(), {
        imageColor: result.location,
        imageColorFilepath: result.key,
      });
    } catch (e) {}
  }

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
    technology_category: formData.get("technology_category"),
    order: Number(formData.get("order")),
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    description_es: formData.get("description_es"),
    long_description: formData.get("long_description"),
    long_description_es: formData.get("long_description_es"),
    imageColor: formData.get("image-color"),
    imageWhite: formData.get("image-white"),
    imageLightBlue: formData.get("image-light-blue"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Technology.",
    };
  }

  const {
    technology_category,
    order,
    name,
    slug,
    description,
    description_es,
    long_description,
    long_description_es,
    imageColor,
    imageWhite,
    imageLightBlue,
  } = validatedFields.data;

  await Technology.findByIdAndUpdate(id, {
    technologyCategory: technology_category,
    order,
    name,
    slug,
    description,
    description_es,
    long_description,
    long_description_es,
  });

  let technology;
  if (
    (imageColor && imageColor.size && imageColor.size > 0) ||
    (imageWhite && imageWhite.size && imageWhite.size > 0) ||
    (imageLightBlue && imageLightBlue.size && imageLightBlue.size > 0)
  ) {
    technology = await Technology.findByIdAndUpdate(id, { order, name, slug });
  }

  if (imageColor && imageColor.size && imageColor.size > 0) {
    try {
      if (
        technology.imageColorFilepath !== undefined &&
        technology.imageColorFilepath !== ""
      ) {
        await deleteFile(technology.imageColorFilepath);
      }

      const path = `${
        process.env.ENVIRONMENT === "production"
          ? ""
          : `${process.env.ENVIRONMENT}/`
      }technologies/${id}/`;

      const result = await uploadFile(imageColor, path);

      await Technology.findByIdAndUpdate(id.toString(), {
        imageColor: result.location,
        imageColorFilepath: result.key,
      });
    } catch (e) {
      console.log("error uploading image", e);
    }
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
      console.log("error uploading image", e);
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
    } catch (e) {
      console.log("error uploading image", e);
    }
  }

  revalidatePath("/admin/technologies");
  redirect("/admin/technologies");
}

export async function deleteTechnology(id: string) {
  await Technology.findByIdAndDelete(id);
  revalidatePath("/admin/technologies");
}
