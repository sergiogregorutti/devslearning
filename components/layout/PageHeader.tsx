import React from "react";

import Image from "next/image";
import Container from "@/components/layout/Container";
import Title from "../ui/Title";

interface PageHeaderProps {
  title: string;
  description?: string;
  image?: string;
}

export default function PageHeader({
  title,
  description,
  image,
}: PageHeaderProps) {
  return (
    <section className="mt-12 sm:mt-18 lg:mt-22 mb-6 lg:mb-10">
      <Container className={image ? "sm:grid sm:grid-cols-2 sm:gap-10" : ""}>
        {image && (
          <Image
            src={image}
            width={420}
            height={308}
            alt={title}
            priority={true}
            className="w-full mb-6 sm:mb-0 sm:order-2 max-h-[200px] sm:max-h-[300px]"
          />
        )}
        <div className="sm:order-1">
          <Title label={title} />
          {description && (
            <p className="mt-3 md:mt-8 xl:mt-10">{description}</p>
          )}
        </div>
      </Container>
    </section>
  );
}
