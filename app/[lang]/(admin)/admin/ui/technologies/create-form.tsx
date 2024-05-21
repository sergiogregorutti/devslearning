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
      <label htmlFor="image-white" className="form-label">
        Image White
      </label>
      <input
        type="file"
        id="image-white"
        name="image-white"
        className="form-input"
        aria-describedby="image-white-error"
      />
      <div id="image-white-error" aria-live="polite" aria-atomic="true">
        {state.errors?.name &&
          state.errors.name.map((error: string) => (
            <p className="form-error" key={error}>
              {error}
            </p>
          ))}
      </div>
      <label htmlFor="image-light-blue" className="form-label">
        Image Light Blue
      </label>
      <input
        type="file"
        id="image-light-blue"
        name="image-light-blue"
        className="form-input"
        aria-describedby="image-light-blue-error"
      />
      <div id="image-light-blue-error" aria-live="polite" aria-atomic="true">
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
