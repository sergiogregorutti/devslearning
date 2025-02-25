import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  fluid?: boolean;
}

export default function Container({
  children,
  className = "",
  fluid = false,
}: ContainerProps) {
  const baseStyles = "px-8 sm:px-12 lg:px-16 mx-auto ";
  const defaultStyles = "max-w-screen-xl";
  const fluidStyles = "w-full";

  const containerClasses = `${baseStyles} ${
    fluid ? fluidStyles : defaultStyles
  } ${className}`;

  return <div className={containerClasses}>{children}</div>;
}
