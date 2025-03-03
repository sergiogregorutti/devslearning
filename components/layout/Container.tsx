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
  const baseStyles = "px-6 sm:px-14 lg:px-16 mx-auto w-full ";
  const defaultStyles = "max-w-screen-xl";
  const fluidStyles = "";

  const containerClasses = `${baseStyles} ${
    fluid ? fluidStyles : defaultStyles
  } ${className}`;

  return <div className={containerClasses}>{children}</div>;
}
