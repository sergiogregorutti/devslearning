"use server";

import dbConnect from "@/lib/dbConnect";
import Category from "../../models/Category";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required."),
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
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Technology.",
    };
  }

  const { name } = validatedFields.data;

  await Category.create({ name });

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
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Technology.",
    };
  }

  const { name } = validatedFields.data;

  await Category.findByIdAndUpdate(id, { name });

  revalidatePath("/admin/technologies");
  redirect("/admin/technologies");
}

export async function deleteTechnology(id: string) {
  await Category.findByIdAndDelete(id);
  revalidatePath("/admin/technologies");
}
