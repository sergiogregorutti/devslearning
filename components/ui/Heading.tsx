import React from "react";

interface HeadingProps {
  label: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
}

export default function Heading({
  label,
  as: Tag = "h1",
  className = "",
}: HeadingProps) {
  const headingStyles: Record<string, string> = {
    h1: "text-blue-800 text-4xl/10 md:text-5xl/[58px] lg:text-6xl/[58px] font-bold leading-none",
    h2: "text-blue-500 text-3xl font-bold mb-2 leading-none",
    h3: "text-blue-600 text-2xl font-bold mb-2 leaging-none",
    h4: "",
    h5: "",
    h6: "",
  };

  const titleClasses = `${headingStyles[Tag]} ${className}`;

  return <Tag className={titleClasses}>{label}</Tag>;
}
