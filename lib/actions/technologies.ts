"use server";

import dbConnect from "@/lib/dbConnect";
import Category from "../../models/Category";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FormSchema = z.object({
  id: z.string(),
  name: z.string(),
  date: z.string(),
});

const CreateTechnology = FormSchema.omit({ id: true, date: true });

export async function createTechnology(formData: FormData) {
  await dbConnect();

  const { name } = CreateTechnology.parse({
    name: formData.get("name"),
  });

  await Category.create({ name });

  revalidatePath("/admin/technologies");
  redirect("/admin/technologies");
}

const UpdateTechnology = FormSchema.omit({ id: true, date: true });

export async function updateTechnology(id: string, formData: FormData) {
  const { name } = UpdateTechnology.parse({
    name: formData.get("name"),
  });

  await Category.findByIdAndUpdate(id, { name });

  revalidatePath("/admin/technologies");
  redirect("/admin/technologies");
}
