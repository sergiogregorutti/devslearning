"use client";

import { TechnologyForm } from "@/lib/definitions";
import Link from "next/link";
import { updateTechnology } from "@/lib/actions/technologies";
import { useFormState } from "react-dom";

export default function EditTechnologyForm({
  technology,
}: {
  technology: TechnologyForm;
}) {
  const updateTechnologyWithId = updateTechnology.bind(null, technology._id);
  const initialState = { _id: technology._id, message: null, errors: {} };
  const [state, dispatch] = useFormState(updateTechnologyWithId, initialState);

  return (
    <form action={dispatch}>
      <label htmlFor="name" className="form-label">
        Name
      </label>
      <input
        id="name"
        name="name"
        className="form-input"
        aria-describedby="name-error"
        defaultValue={technology.name}
      />
      <div id="name-error" aria-live="polite" aria-atomic="true">
        {state.errors?.name &&
          state.errors.name.map((error: string) => (
            <p className="form-error" key={error}>
              {error}
            </p>
          ))}
      </div>
      <div>
        <button type="submit" className="btn">
          Save
        </button>
        <Link href="/admin/technologies" className="btn btn-cancel">
          Cancel
        </Link>
      </div>
    </form>
  );
}
