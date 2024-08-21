"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createTechnology } from "@/lib/actions/technologies";
import { useFormState } from "react-dom";

export default function Form({
  technologiesCategories,
}: {
  technologiesCategories: any;
}) {
  const initialState = {
    errors: { image: [], name: [] },
    message: "",
  };
  const [state, dispatch] = useFormState(createTechnology, initialState);
  const [isFormLoading, setIsFormLoading] = useState(false);

  useEffect(() => {
    setIsFormLoading(false);
  }, [state]);

  const handleSubmitForm = () => {
    setIsFormLoading(true);
  };

  return (
    <form action={dispatch} onSubmit={handleSubmitForm}>
      <label htmlFor="technology_category" className="form-label">
        Category
      </label>
      <select
        name="technology_category"
        id="technology_category"
        className="form-input"
        aria-describedby="technology_category-error"
        disabled={isFormLoading}
      >
        <option value="">Select...</option>
        {technologiesCategories.map((technologyCategory: any) => (
          <option key={technologyCategory._id} value={technologyCategory._id}>
            {technologyCategory.name}
          </option>
        ))}
      </select>
      <div id="technology_category-error" aria-live="polite" aria-atomic="true">
        {state.errors?.technology_category &&
          state.errors.technology_category.map((error: string) => (
            <p className="form-error" key={error}>
              {error}
            </p>
          ))}
      </div>
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
      <label htmlFor="slug" className="form-label">
        Slug
      </label>
      <input
        id="slug"
        name="slug"
        className="form-input"
        aria-describedby="slug-error"
        disabled={isFormLoading}
      />
      <div id="slug-error" aria-live="polite" aria-atomic="true">
        {state.errors?.slug &&
          state.errors.slug.map((error: string) => (
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
        disabled={isFormLoading}
      />
      <div id="image-white-error" aria-live="polite" aria-atomic="true">
        {state.errors?.imageWhite &&
          state.errors.imageWhite.map((error: string) => (
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
        disabled={isFormLoading}
      />
      <div id="image-light-blue-error" aria-live="polite" aria-atomic="true">
        {state.errors?.imageLightBlue &&
          state.errors.imageLightBlue.map((error: string) => (
            <p className="form-error" key={error}>
              {error}
            </p>
          ))}
      </div>
      <div>
        <button type="submit" className="btn" disabled={isFormLoading}>
          Create Technology
        </button>
        <Link
          href="/admin/technologies"
          className={`btn btn-cancel${isFormLoading ? " disabled" : ""}`}
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
