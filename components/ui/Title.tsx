import React from "react";

interface TitleProps {
  label: string;
  className?: string;
}

export default function Title({ label, className = "" }: TitleProps) {
  const baseStyles =
    "text-blue-800 text-4xl/10 md:text-5xl/[58px] lg:text-6xl/[58px] font-bold";

  const titleClasses = `${baseStyles} ${className}`;

  return <h1 className={titleClasses}>{label}</h1>;
}
