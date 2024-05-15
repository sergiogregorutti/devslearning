"use client";

import { TechnologyForm } from "@/lib/definitions";
import Link from "next/link";

import { updateTechnology } from "@/lib/actions/technologies";

export default function EditTechnologyForm({
  technology,
}: {
  technology: TechnologyForm;
}) {
  const updateTechnologyWithId = updateTechnology.bind(null, technology._id);

  return (
    <form action={updateTechnologyWithId}>
      <label htmlFor="name" className="form-label">
        Name
      </label>
      <input
        id="name"
        name="name"
        className="form-input"
        defaultValue={technology.name}
      />
      <div>
        <button type="submit" className="btn">
          Save
        </button>
        <Link href="/admin/technologies" className="btn btn-link">
          Cancel
        </Link>
      </div>
    </form>
  );
}
