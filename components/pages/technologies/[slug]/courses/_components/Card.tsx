import React from "react";
import clsx from "clsx";

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ className = "", children }) => {
  // Base styles
  const baseStyles =
    "rounded-lg border border-neutral-200 bg-card text-card-foreground shadow-sm";

  // Combine all styles using clsx
  const buttonClasses = clsx(baseStyles, className);

  return <div className={buttonClasses}>{children}</div>;
};

export default Card;
