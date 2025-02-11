"use server";

import dbConnect from "@/lib/dbConnect";
import { Course } from "@/lib/models";
import { uploadFile, deleteFile } from "@/lib/files";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ["image/png", "image/svg+xml"];

const FormSchema = z.object({
  id: z.string(),
  technology: z.string().min(1, "Technology is required."),
  language: z
    .string({ message: "Language is required." })
    .min(1, "Language is required."),
  name: z.string().min(1, "Name is required."),
  description: z.string().min(1, "Description is required."),
  long_description: z.string().optional(),
  image: z
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
  platform: z.string().optional(),
  author: z.string().optional(),
  pricing: z
    .string({ message: "Pricing is required." })
    .min(1, "Pricing is required."),
  price: z.number(),
  year: z.number().min(1, "Year is required."),
  link: z.string().min(1, "Link is required."),
});

const CreateCourse = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    technology?: string[];
    language?: string[];
    name?: string[];
    description?: string[];
    image?: string[];
    platform?: string[];
    author?: string[];
    pricing?: string[];
    price?: string[];
    year?: string[];
    link?: string[];
  };
  message?: string | null;
};

export async function createCourse(prevState: State, formData: FormData) {
  await dbConnect();

  const validatedFields = CreateCourse.safeParse({
    technology: formData.get("technology"),
    language: formData.get("language"),
    name: formData.get("name"),
    description: formData.get("description"),
    long_description: formData.get("long_description"),
    image: formData.get("image"),
    platform: formData.get("platform"),
    author: formData.get("author"),
    pricing: formData.get("pricing"),
    price: Number(formData.get("price")),
    year: Number(formData.get("year")),
    link: formData.get("link"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Course.",
    };
  }

  const {
    technology,
    language,
    name,
    description,
    long_description,
    image,
    platform,
    author,
    pricing,
    price,
    year,
    link,
  } = validatedFields.data;

  const newCourse = await Course.create({
    technology: technology,
    language,
    name,
    description,
    long_description,
    platform,
    author,
    pricing,
    price,
    year,
    link,
  });

  if (image && image.size && image.size > 0) {
    try {
      const path = `${
        process.env.ENVIRONMENT === "production"
          ? ""
          : `${process.env.ENVIRONMENT}/`
      }courses/${newCourse._id}/`;

      const result = await uploadFile(image, path);

      await Course.findByIdAndUpdate(newCourse._id.toString(), {
        image: result.location,
        imageFilepath: result.key,
      });
    } catch (e) {}
  }

  revalidatePath("/admin/courses");
  redirect("/admin/courses");
}

const UpdateCourse = FormSchema.omit({ id: true });

export async function updateCourse(
  id: string,
  prevState: State,
  formData: FormData
) {
  await dbConnect();

  const validatedFields = UpdateCourse.safeParse({
    technology: formData.get("technology"),
    language: formData.get("language"),
    name: formData.get("name"),
    description: formData.get("description"),
    long_description: formData.get("long_description"),
    image: formData.get("image"),
    platform: formData.get("platform"),
    author: formData.get("author"),
    pricing: formData.get("pricing"),
    price: Number(formData.get("price")),
    year: Number(formData.get("year")),
    link: formData.get("link"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Course.",
    };
  }

  const {
    technology,
    language,
    name,
    description,
    long_description,
    image,
    platform,
    author,
    pricing,
    price,
    year,
    link,
  } = validatedFields.data;

  await Course.findByIdAndUpdate(id, {
    technology: technology,
    language,
    name,
    description,
    long_description,
    platform,
    author,
    pricing,
    price,
    year,
    link,
  });

  if (image && image.size && image.size > 0) {
    try {
      const course = await Course.findByIdAndUpdate(id, { name });

      if (course.imageFilepath !== undefined && course.imageFilepath !== "") {
        await deleteFile(course.imageFilepath);
      }

      const path = `${
        process.env.ENVIRONMENT === "production"
          ? ""
          : `${process.env.ENVIRONMENT}/`
      }courses/${id}/`;

      const result = await uploadFile(image, path);

      await Course.findByIdAndUpdate(id.toString(), {
        image: result.location,
        imageFilepath: result.key,
      });
    } catch (e) {
      console.log("error", e);
    }
  }

  revalidatePath("/admin/courses");
  redirect("/admin/courses");
}

export async function deleteCourse(id: string) {
  await Course.findByIdAndDelete(id);
  revalidatePath("/admin/courses");
}
