import React from "react";

interface TitleProps {
  label: string;
  className?: string;
}

export default function Title({ label, className = "" }: TitleProps) {
  const baseStyles = "text-blue-800 text-4xl/10 sm:text-5xl/20 font-bold";

  const titleClasses = `${baseStyles} ${className}`;

  return <h1 className={titleClasses}>{label}</h1>;
}
