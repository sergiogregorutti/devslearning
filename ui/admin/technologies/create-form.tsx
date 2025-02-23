"use client";

import { useEffect, useState, useActionState } from "react";
import Link from "next/link";
import { createTechnology } from "@/lib/actions/technologies";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

export default function Form({
  technologiesCategories,
}: {
  technologiesCategories: any;
}) {
  const initialState = {
    errors: { image: [], name: [] },
    message: "",
  };
  const [state, dispatch] = useActionState(createTechnology, initialState);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [longDescriptionContent, setLongDescriptionContent] = useState("");
  const [longDescriptionEsContent, setLongDescriptionEsContent] = useState("");

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ align: [] }],
      [{ color: [] }],
      ["code-block"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "align",
    "color",
    "code-block",
  ];

  const handleLongDescriptionChange = (newContent: any) => {
    setLongDescriptionContent(newContent);
  };

  const handleLongDescriptionEsChange = (newContent: any) => {
    setLongDescriptionEsContent(newContent);
  };

  useEffect(() => {
    setIsFormLoading(false);
  }, [state]);

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsFormLoading(true);

    const formData = new FormData(event.currentTarget);
    formData.append("long_description", longDescriptionContent);
    formData.append("long_description_es", longDescriptionEsContent);

    dispatch(formData);
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
      <label htmlFor="description" className="form-label">
        Description
      </label>
      <textarea
        id="description"
        name="description"
        rows={4}
        className="form-input"
        aria-describedby="name-error"
        disabled={isFormLoading}
      ></textarea>
      <label htmlFor="description_es" className="form-label">
        Description (ES)
      </label>
      <textarea
        id="description_es"
        name="description_es"
        rows={4}
        className="form-input"
        aria-describedby="name-error"
        disabled={isFormLoading}
      ></textarea>
      <label htmlFor="description" className="form-label">
        Long Description
      </label>
      <ReactQuill
        value={longDescriptionContent}
        onChange={handleLongDescriptionChange}
        modules={quillModules}
        formats={quillFormats}
      />
      <input
        type="hidden"
        name="long_description"
        value={longDescriptionContent}
      />
      <label htmlFor="description" className="form-label">
        Long Description (ES)
      </label>
      <ReactQuill
        value={longDescriptionEsContent}
        onChange={handleLongDescriptionEsChange}
        modules={quillModules}
        formats={quillFormats}
      />
      <input
        type="hidden"
        name="long_description_es"
        value={longDescriptionEsContent}
      />
      <label htmlFor="image-color" className="form-label">
        Image Color
      </label>
      <input
        type="file"
        id="image-color"
        name="image-color"
        className="form-input"
        aria-describedby="image-color-error"
        disabled={isFormLoading}
      />
      <div id="image-color-error" aria-live="polite" aria-atomic="true">
        {state.errors?.imageColor &&
          state.errors.imageColor.map((error: string) => (
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
