import React from "react";

import Link from "next/link";
import Image from "next/image";
import Container from "@/components/layout/Container";
import Title from "../ui/Title";

interface PageHeaderProps {
  title: string;
  description?: string;
  image?: string;
  imagePositionMobile?: "top" | "bottom";
  breadcrumb?: any;
}

export default function PageHeader({
  title,
  description,
  image,
  imagePositionMobile = "top",
  breadcrumb = null,
}: PageHeaderProps) {
  let imagePositionMobileClasses = "";
  let titlePositionMobileClasses = "";

  console.log("imagePositionMobile", imagePositionMobile);

  switch (imagePositionMobile) {
    case "top":
      imagePositionMobileClasses = "mb-3 md:mb-0 md:order-2";
      titlePositionMobileClasses = "sm:order-1";
      break;
    case "bottom":
      imagePositionMobileClasses = "mt-6 md:mt-0 order-2";
      titlePositionMobileClasses = "order-1";
      break;
  }
  return (
    <section className="mt-12 sm:mt-18 lg:mt-22 mb-6 lg:mb-10">
      <Container>
        <div
          className={
            image
              ? "grid md:grid-cols-[60%_40%] lg:grid-cols-[70%_30%] md:gap-[20px]"
              : ""
          }
        >
          {image && (
            <div
              className={`md:flex md:justify-center ${imagePositionMobileClasses}`}
            >
              <Image
                src={image}
                width={420}
                height={308}
                alt={title}
                priority={true}
                className="w-[50%] md:w-[80%] md:max-h-[200px]"
              />
            </div>
          )}
          <div className={`sm:flex sm:flex-col ${titlePositionMobileClasses}`}>
            {breadcrumb && (
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="item" href={breadcrumb[0].link}>
                      {breadcrumb[0].name}
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    <span className="separator">/</span>
                  </li>
                </ol>
              </nav>
            )}
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
