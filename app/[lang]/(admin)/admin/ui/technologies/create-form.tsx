"use client";

import Link from "next/link";
import { createTechnology } from "@/lib/actions/technologies";
import { useFormState } from "react-dom";

export default function Form() {
  const initialState = {
    errors: { image: [], name: [] },
    message: "",
  };
  const [state, dispatch] = useFormState(createTechnology, initialState);

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
          Create Technology
        </button>
        <Link href="/admin/technologies" className="btn btn-cancel">
          Cancel
        </Link>
      </div>
    </form>
  );
}
