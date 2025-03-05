import React, { ReactNode } from "react";
import clsx from "clsx";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  fluid?: boolean;
}

const Container = ({
  children,
  className = "",
  fluid = false,
}: ContainerProps) => {
  const containerClasses = clsx(
    "px-6 sm:px-14 lg:px-16 mx-auto w-full",
    fluid ? "" : "max-w-screen-xl",
    className
  );

  return <div className={containerClasses}>{children}</div>;
};

export default React.memo(Container);
