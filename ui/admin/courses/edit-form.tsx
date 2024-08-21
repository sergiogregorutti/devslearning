"use client";

import { useEffect, useState } from "react";
import { CourseForm } from "@/lib/definitions";
import Link from "next/link";
import { updateCourse } from "@/lib/actions/courses";
import { useFormState } from "react-dom";
import Image from "next/image";

export default function EditTechnologyForm({
  course,
  technologies,
}: {
  course: CourseForm;
  technologies: any;
}) {
  const updateCourseWithId = updateCourse.bind(null, course._id);
  const initialState = {
    _id: course._id,
    errors: { technology: [], name: [], image: [] },
    message: "",
  };
  const [state, dispatch] = useFormState(updateCourseWithId, initialState);
  const [isFormLoading, setIsFormLoading] = useState(false);

  useEffect(() => {
    setIsFormLoading(false);
  }, [state]);

  const handleSubmitForm = () => {
    setIsFormLoading(true);
  };

  return (
    <form action={dispatch} onSubmit={handleSubmitForm}>
      <div>
        <a href={course.link} target="_blank" className="btn btn-small mb-15">
          Visit Course
        </a>
      </div>
      <label htmlFor="technology" className="form-label">
        Technology
      </label>
      <select
        name="technology"
        id="technology"
        className="form-input"
        defaultValue={course.technology}
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
      <div className="checkbox-wrapper">
        <label htmlFor="en">
          English
          <input
            type="radio"
            id="en"
            name="language"
            value="en"
            defaultChecked={course.language === "en" ? true : false}
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
            defaultChecked={course.language === "es" ? true : false}
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
        defaultValue={course.name}
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
        defaultValue={course.description}
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
      <label htmlFor="image" className="form-label">
        Image
      </label>
      {course.image !== undefined && course.image !== "" && (
        <div className="img-wrapper">
          <Image
            className="big"
            src={course.image}
            width={200}
            height={120}
            alt={course.name}
          />
        </div>
      )}
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
        defaultValue={course.platform}
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
        defaultValue={course.author}
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
      <div className="checkbox-wrapper">
        <label htmlFor="free">
          Free
          <input
            type="radio"
            id="free"
            name="pricing"
            value="free"
            defaultChecked={course.pricing === "free" ? true : false}
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
            defaultChecked={
              course.pricing === "one-time-payment" ? true : false
            }
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
            defaultChecked={course.pricing === "subscription" ? true : false}
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
        defaultValue={course.price}
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
        defaultValue={course.year}
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
        defaultValue={course.link}
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
          Save
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
