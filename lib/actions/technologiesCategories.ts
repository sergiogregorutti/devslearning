"use server";

import dbConnect from "@/lib/dbConnect";
import TechnologyCategory from "../../models/TechnologyCategory";
import { uploadFile, deleteFile } from "@/lib/files";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FormSchema = z.object({
  id: z.string(),
  order: z.number().min(1, "Order is required."),
  name: z.string().min(1, "Name is required."),
  name_es: z.string().min(1, "Name (Spanish) is required."),
  date: z.string(),
});

const CreateTechnologyCategory = FormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    name?: string[];
  };
  message?: string | null;
};

export async function createTechnologyCategory(
  prevState: State,
  formData: FormData
) {
  await dbConnect();

  const validatedFields = CreateTechnologyCategory.safeParse({
    order: Number(formData.get("order")),
    name: formData.get("name"),
    name_es: formData.get("name_es"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Technology Category.",
    };
  }

  const { order, name, name_es } = validatedFields.data;

  await TechnologyCategory.create({
    order,
    name,
    name_es,
  });

  revalidatePath("/admin/technologies-categories");
  redirect("/admin/technologies-categories");
}

const UpdateTechnologyCategory = FormSchema.omit({ id: true, date: true });

export async function updateTechnologyCategory(
  id: string,
  prevState: State,
  formData: FormData
) {
  await dbConnect();

  const validatedFields = UpdateTechnologyCategory.safeParse({
    order: Number(formData.get("order")),
    name: formData.get("name"),
    name_es: formData.get("name_es"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Technology Category.",
    };
  }

  const { order, name, name_es } = validatedFields.data;

  await TechnologyCategory.findByIdAndUpdate(id, { order, name, name_es });

  revalidatePath("/admin/technologies-categories");
  redirect("/admin/technologies-categories");
}

export async function deleteTechnologyCategory(id: string) {
  await TechnologyCategory.findByIdAndDelete(id);
  revalidatePath("/admin/technologies-categories");
}
