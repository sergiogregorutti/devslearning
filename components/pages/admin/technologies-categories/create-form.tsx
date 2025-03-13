"use client";

import { useEffect, useState, useActionState } from "react";
import Link from "next/link";
import { createTechnologyCategory } from "@/lib/actions/technologiesCategories";

export default function Form() {
  const initialState = {
    errors: { name: [] },
    message: "",
  };
  const [state, dispatch] = useActionState(
    createTechnologyCategory,
    initialState
  );
  const [isFormLoading, setIsFormLoading] = useState(false);

  useEffect(() => {
    setIsFormLoading(false);
  }, [state]);

  const handleSubmitForm = () => {
    setIsFormLoading(true);
  };

  return (
    <form action={dispatch} onSubmit={handleSubmitForm}>
      <label htmlFor="order" className="form-label">
        Order
      </label>
      <input
        id="order"
        name="order"
        className="form-input"
        aria-describedby="order-error"
        disabled={isFormLoading}
      />
      <div id="order-error" aria-live="polite" aria-atomic="true">
        {state.errors?.order &&
          state.errors.order.map((error: string) => (
            <p className="form-error" key={error}>
              {error}
            </p>
          ))}
      </div>
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
      <label htmlFor="name" className="form-label">
        Name (Spanish)
      </label>
      <input
        id="name_es"
        name="name_es"
        className="form-input"
        aria-describedby="name_es-error"
        disabled={isFormLoading}
      />
      <div id="name_es-error" aria-live="polite" aria-atomic="true">
        {state.errors?.name_es &&
          state.errors.name_es.map((error: string) => (
            <p className="form-error" key={error}>
              {error}
            </p>
          ))}
      </div>
      <div>
        <button type="submit" className="btn" disabled={isFormLoading}>
          Create Technology Category
        </button>
        <Link
          href="/admin/technologies-categories"
          className={`btn btn-cancel${isFormLoading ? " disabled" : ""}`}
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
