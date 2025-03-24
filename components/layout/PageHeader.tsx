"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Container from "@/components/layout/Container";
import Title from "../ui/Heading";
import clsx from "clsx";

interface BreadcrumbItem {
  name: string;
  link: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  image?: string;
  imagePositionMobile?: "top" | "bottom";
  imageMobileHidden?: boolean;
  descriptionMobileHidden?: boolean;
  breadcrumb?: BreadcrumbItem[];
  previousPage?: { name: string };
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  image,
  imagePositionMobile = "top",
  imageMobileHidden = false,
  descriptionMobileHidden = false,
  breadcrumb,
  previousPage,
}) => {
  const router = useRouter();

  const imagePositionMobileClasses = clsx({
    "mb-3 md:mb-0 md:order-2": imagePositionMobile === "top",
    "mt-6 md:mt-0 order-2": imagePositionMobile === "bottom",
  });

  const titlePositionMobileClasses = clsx({
    "sm:order-1": imagePositionMobile === "top",
    "order-1": imagePositionMobile === "bottom",
  });

  const handleGoBack = () => {
    router.back();
  };

  return (
    <section className="mt-6 sm:mt-18 lg:mt-22 mb-6 lg:mb-10">
      <Container>
        <div
          className={clsx(
            image
              ? "grid md:grid-cols-[60%_40%] lg:grid-cols-[70%_30%] md:gap-[20px]"
              : ""
          )}
        >
          {image && (
            <div
              className={clsx(
                "md:flex md:justify-center md:items-center",
                imagePositionMobileClasses,
                imageMobileHidden ? "hidden" : ""
              )}
            >
              <Image
                src={image}
                width={420}
                height={308}
                alt={title}
                priority={true}
                className="h-fit w-[100%] md:w-[80%] md:max-h-[200px]"
              />
            </div>
          )}
          <div className={`sm:flex sm:flex-col ${titlePositionMobileClasses}`}>
            {breadcrumb && (
              <nav aria-label="breadcrumb">
                <ol className="flex flex-wrap list-none p-0 mb-[5px]">
                  {previousPage && (
                    <li className="mr-[5px]">
                      <button
                        onClick={handleGoBack}
                        className="cursor-pointer text-blue-500 hover:text-blue-600 pr-[8px] mr-[5px] border-r border-neutral-400"
                        aria-label={`Go back to ${previousPage.name}`}
                      >
                        {previousPage.name}
                      </button>
                    </li>
                  )}
                  <li className="mr-[5px]">
                    <Link
                      className="cursor-pointer text-blue-500 hover:text-blue-600"
                      href={breadcrumb[0].link}
                    >
                      {breadcrumb[0].name}
                    </Link>
                  </li>
                  {breadcrumb[1] && (
                    <li className="mr-[5px]">
                      <span className="inline-block ml-[5px] mr-[8px] text-neutral-400">
                        /
                      </span>
                      <Link
                        className="cursor-pointer text-blue-500 hover:text-blue-600"
                        href={breadcrumb[1].link}
                      >
                        {breadcrumb[1].name}
                      </Link>
                    </li>
                  )}
                  <li className="mr-[5px] active" aria-current="page">
                    <span className="inline-block ml-[5px] mr-[8px] text-neutral-400">
                      /
                    </span>
                  </li>
                </ol>
              </nav>
            )}
            <Title label={title} />
            {description && (
              <p
                className={`${
                  descriptionMobileHidden ? "hidden " : ""
                }text-gray-500 text-sm mt-3 md:mt-0 md:text-base md:grow md:flex md:items-center`}
              >
                {description}
              </p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PageHeader;
