"use client";

import { useEffect, useState } from "react";
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
  const initialState = {
    _id: technology._id,
    errors: { image: [], name: [] },
    message: "",
  };
  const [state, dispatch] = useFormState(updateTechnologyWithId, initialState);
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
        defaultValue={technology.name}
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
      <label htmlFor="image-white" className="form-label">
        Image White
      </label>
      {technology.imageWhite !== undefined && technology.imageWhite !== "" && (
        <div className="img-wrapper white">
          <div className="white-image">
            <img src={technology.imageWhite} />
          </div>
        </div>
      )}
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
      {technology.imageLightBlue !== undefined &&
        technology.imageLightBlue !== "" && (
          <div className="img-wrapper">
            <img src={technology.imageLightBlue} />
          </div>
        )}
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
          Save
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
