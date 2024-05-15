"use server";

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
  const { name } = CreateTechnology.parse({
    name: formData.get("name"),
  });

  revalidatePath("/admin/technologies");
  redirect("/admin/technologies");
}
