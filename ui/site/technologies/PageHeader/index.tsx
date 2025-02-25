"use client";

import Container from "@/components/layout/Container";

export default function PageHeader({ dictionary }: { dictionary: any }) {
  return (
    <div className="page-header mt-12 sm:mt-18 lg:mt-22">
      <Container>
        <div className="page-header-content">
          <div className="title-container">
            <h1>{dictionary.technologies.technologies}</h1>
          </div>
        </div>
      </Container>
    </div>
  );
}
