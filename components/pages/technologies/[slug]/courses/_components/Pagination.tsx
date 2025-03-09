"use client";

import clsx from "clsx";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { generatePagination } from "@/lib/helpers";
import { usePathname, useSearchParams } from "next/navigation";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

export default function Pagination({
  totalPages,
  dictionary,
}: {
  totalPages: number;
  dictionary: any;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <>
      <div className="mt-8 flex justify-center">
        <div className="flex items-center space-x-2">
          <Button
            variant={currentPage <= 1 ? "disabled" : "outline"}
            size="extraSmall"
            className="border-1 border-neutral-200"
            href={createPageURL(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            {dictionary.courses.previous}
          </Button>
          {allPages.map((page, index) => {
            let position: "first" | "last" | "single" | "middle" | undefined;

            if (index === 0) position = "first";
            if (index === allPages.length - 1) position = "last";
            if (allPages.length === 1) position = "single";
            if (page === "...") position = "middle";

            return (
              <PaginationNumber
                key={page}
                href={createPageURL(page)}
                page={page}
                position={position}
                isActive={currentPage === page}
              />
            );
          })}
          <Button
            href={createPageURL(currentPage + 1)}
            variant={currentPage >= totalPages ? "disabled" : "outline"}
            size="extraSmall"
            disabled={currentPage >= totalPages}
          >
            {dictionary.courses.next}
          </Button>
        </div>
      </div>
    </>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
}) {
  const className = clsx({
    first: position === "first" || position === "single",
    last: position === "last" || position === "single",
    active: isActive,
    disabled: !isActive && position !== "middle",
    middle: position === "middle",
  });

  return isActive || position === "middle" ? (
    <Button
      variant="outline"
      size="extraSmall"
      className="bg-blue-500 text-white"
      href={href}
    >
      {page}
    </Button>
  ) : (
    <Button variant="outline" size="extraSmall" href={href}>
      {page}
    </Button>
  );
}
