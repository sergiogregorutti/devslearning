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
      <Container>
        <div
          className={
            image
              ? "md:grid sm:grid-cols-[60%_40%] lg:grid-cols-[70%_30%] md:gap-[20px]"
              : ""
          }
        >
          {image && (
            <div className="mb-3 sm:mb-0 md:order-2 md:flex md:justify-center">
              <Image
                src={image}
                width={420}
                height={308}
                alt={title}
                priority={true}
                className="h-[130px] w-auto md:h-auto md:w-[80%] md:max-h-[300px]"
              />
            </div>
          )}
          <div className="sm:order-1 sm:flex sm:flex-col">
            <Title label={title} className="mb-3 md:mb-0" />
            {description && (
              <p className="text-gray-500 text-sm md:text-base md:grow md:flex md:items-center">
                {description}
              </p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
