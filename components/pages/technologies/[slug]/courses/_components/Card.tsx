import React from "react";
import clsx from "clsx";

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ className = "", children }) => {
  const baseStyles = "rounded-lg border border-neutral-200";

  const buttonClasses = clsx(baseStyles, className);

  return <div className={buttonClasses}>{children}</div>;
};

export default Card;
