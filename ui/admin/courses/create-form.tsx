"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createCourse } from "@/lib/actions/courses";
import { useFormState } from "react-dom";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

export default function Form({ technologies }: { technologies: any }) {
  const initialState = {
    errors: { technology: [], name: [], image: [] },
    message: "",
  };
  const [state, dispatch] = useFormState(createCourse, initialState);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [longDescriptionContent, setLongDescriptionContent] = useState("");

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

  const handleEditorChange = (newContent: any) => {
    setLongDescriptionContent(newContent);
  };

  useEffect(() => {
    setIsFormLoading(false);
  }, [state]);

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsFormLoading(true);

    const formData = new FormData(event.currentTarget);
    formData.append("long_description", longDescriptionContent);

    dispatch(formData);
  };

  return (
    <form action={dispatch} onSubmit={handleSubmitForm}>
      <label htmlFor="technology" className="form-label">
        Technology
      </label>
      <select
        name="technology"
        id="technology"
        className="form-input"
        aria-describedby="technology-error"
        disabled={isFormLoading}
      >
        <option value="">Select...</option>
        {technologies.map((technology: any) => (
          <option key={technology._id} value={technology._id}>
            {technology.name}
          </option>
        ))}
      </select>
      <div id="technology-error" aria-live="polite" aria-atomic="true">
        {state.errors?.technology &&
          state.errors.technology.map((error: string) => (
            <p className="form-error" key={error}>
              {error}
            </p>
          ))}
      </div>
      <label htmlFor="language" className="form-label">
        Language
      </label>
      <div className="radio-button-wrapper">
        <label htmlFor="en">
          English
          <input
            type="radio"
            id="en"
            name="language"
            value="en"
            aria-describedby="language-error"
            disabled={isFormLoading}
          />
          <span className="checkmark"></span>
        </label>
        <label htmlFor="es">
          Spanish
          <input
            type="radio"
            id="es"
            name="language"
            value="es"
            aria-describedby="language-error"
            disabled={isFormLoading}
          />
          <span className="checkmark"></span>
        </label>
      </div>
      <div id="language-error" aria-live="polite" aria-atomic="true">
        {state.errors?.language &&
          state.errors.language.map((error: string) => (
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
      <div id="description-error" aria-live="polite" aria-atomic="true">
        {state.errors?.description &&
          state.errors.description.map((error: string) => (
            <p className="form-error" key={error}>
              {error}
            </p>
          ))}
      </div>
      <label htmlFor="description" className="form-label">
        Long Description
      </label>
      <QuillEditor
        value={longDescriptionContent}
        onChange={handleEditorChange}
        modules={quillModules}
        formats={quillFormats}
      />
      <input type="hidden" name="long_description" value={longDescriptionContent} />
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
      <label htmlFor="platform" className="form-label">
        Platform
      </label>
      <input
        id="platform"
        name="platform"
        className="form-input"
        aria-describedby="platform-error"
        disabled={isFormLoading}
      />
      <div id="platform-error" aria-live="polite" aria-atomic="true">
        {state.errors?.platform &&
          state.errors.platform.map((error: string) => (
            <p className="form-error" key={error}>
              {error}
            </p>
          ))}
      </div>
      <label htmlFor="author" className="form-label">
        Author
      </label>
      <input
        id="author"
        name="author"
        className="form-input"
        aria-describedby="author-error"
        disabled={isFormLoading}
      />
      <div id="author-error" aria-live="polite" aria-atomic="true">
        {state.errors?.author &&
          state.errors.author.map((error: string) => (
            <p className="form-error" key={error}>
              {error}
            </p>
          ))}
      </div>
      <label htmlFor="pricing" className="form-label">
        Pricing
      </label>
      <div className="radio-button-wrapper">
        <label htmlFor="free">
          Free
          <input
            type="radio"
            id="free"
            name="pricing"
            value="free"
            aria-describedby="pricing-error"
            disabled={isFormLoading}
          />
          <span className="checkmark"></span>
        </label>
        <label htmlFor="one-time-payment">
          One-Time Payment
          <input
            type="radio"
            id="one-time-payment"
            name="pricing"
            value="one-time-payment"
            aria-describedby="pricing-error"
            disabled={isFormLoading}
          />
          <span className="checkmark"></span>
        </label>
        <label htmlFor="subscription">
          Subscription
          <input
            type="radio"
            id="subscription"
            name="pricing"
            value="subscription"
            aria-describedby="pricing-error"
            disabled={isFormLoading}
          />
          <span className="checkmark"></span>
        </label>
      </div>
      <div id="pricing-error" aria-live="polite" aria-atomic="true">
        {state.errors?.pricing &&
          state.errors.pricing.map((error: string) => (
            <p className="form-error" key={error}>
              {error}
            </p>
          ))}
      </div>
      <label htmlFor="price" className="form-label">
        Price
      </label>
      <input
        type="number"
        step=".01"
        id="price"
        name="price"
        className="form-input"
        aria-describedby="price-error"
        disabled={isFormLoading}
      />
      <div id="price-error" aria-live="polite" aria-atomic="true">
        {state.errors?.price &&
          state.errors.price.map((error: string) => (
            <p className="form-error" key={error}>
              {error}
            </p>
          ))}
      </div>
      <label htmlFor="year" className="form-label">
        Year
      </label>
      <input
        type="number"
        id="year"
        name="year"
        className="form-input"
        aria-describedby="year-error"
        disabled={isFormLoading}
      />
      <div id="year-error" aria-live="polite" aria-atomic="true">
        {state.errors?.year &&
          state.errors.year.map((error: string) => (
            <p className="form-error" key={error}>
              {error}
            </p>
          ))}
      </div>
      <label htmlFor="link" className="form-label">
        Link
      </label>
      <input
        id="link"
        name="link"
        className="form-input"
        aria-describedby="link-error"
        disabled={isFormLoading}
      />
      <div id="link-error" aria-live="polite" aria-atomic="true">
        {state.errors?.link &&
          state.errors.link.map((error: string) => (
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
