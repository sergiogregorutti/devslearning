"use client";

export default function Heading({ dictionary }: { dictionary: any }) {
  return (
    <div className="heading">
      <div className="container">
        <div className="title-container">
          <h1>{dictionary.technologies.technologies}</h1>
        </div>
      </div>
    </div>
  );
}
