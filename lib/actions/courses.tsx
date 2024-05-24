"use server";

import dbConnect from "@/lib/dbConnect";
import Course from "../../models/Course";
import { uploadFile, deleteFile } from "@/lib/files";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ["image/png", "image/svg+xml"];

const FormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required."),
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
  date: z.string(),
});

const CreateCourse = FormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    name?: string[];
  };
  message?: string | null;
};

export async function createCourse(prevState: State, formData: FormData) {
  await dbConnect();

  const validatedFields = CreateCourse.safeParse({
    name: formData.get("name"),
    image: formData.get("image"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Course.",
    };
  }

  const { name, image } = validatedFields.data;

  const newCourse = await Course.create({
    name,
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

const UpdateCourse = FormSchema.omit({ id: true, date: true });

export async function updateCourse(
  id: string,
  prevState: State,
  formData: FormData
) {
  await dbConnect();

  const validatedFields = UpdateCourse.safeParse({
    name: formData.get("name"),
    image: formData.get("image"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Course.",
    };
  }

  const { name, image } = validatedFields.data;

  await Course.findByIdAndUpdate(id, { name });

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
