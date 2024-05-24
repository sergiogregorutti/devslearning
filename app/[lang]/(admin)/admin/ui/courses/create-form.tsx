"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createCourse } from "@/lib/actions/courses";
import { useFormState } from "react-dom";

export default function Form() {
  const initialState = {
    errors: { image: [], name: [] },
    message: "",
  };
  const [state, dispatch] = useFormState(createCourse, initialState);
  const [isFormLoading, setIsFormLoading] = useState(false);

  useEffect(() => {
    setIsFormLoading(false);
  }, [state]);

  const handleSubmitForm = () => {
    setIsFormLoading(true);
  };

  return (
    <form action={dispatch} onSubmit={handleSubmitForm}>
      <label htmlFor="name" className="form-label">
        Name
      </label>
      <input
        id="name"
        name="name"
        className="form-input"
        aria-describedby="name-error"
        disabled={isFormLoading}
      />
      <div id="name-error" aria-live="polite" aria-atomic="true">
        {state.errors?.name &&
          state.errors.name.map((error: string) => (
            <p className="form-error" key={error}>
              {error}
            </p>
          ))}
      </div>
      <label htmlFor="image" className="form-label">
        Image
      </label>
      <input
        type="file"
        id="image"
        name="image"
        className="form-input"
        aria-describedby="image-error"
        disabled={isFormLoading}
      />
      <div id="image-error" aria-live="polite" aria-atomic="true">
        {state.errors?.image &&
          state.errors.image.map((error: string) => (
            <p className="form-error" key={error}>
              {error}
            </p>
          ))}
      </div>
      <div>
        <button type="submit" className="btn" disabled={isFormLoading}>
          Create Course
        </button>
        <Link
          href="/admin/courses"
          className={`btn btn-cancel${isFormLoading ? " disabled" : ""}`}
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
