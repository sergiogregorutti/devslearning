import React from "react";
import clsx from "clsx";

interface BadgeProps {
  className?: string;
  variant?: "default" | "secondary" | "outline";
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
  className = "",
  variant = "default",
  children,
}) => {
  // Base styles
  const baseStyles =
    "flex items-center px-[10px] py-[2px] text-xs rounded-full leading-[14px] h-[20px]";

  // Variant styles
  const variantStyles = {
    default: "bg-blue-500 text-white opacity-75",
    secondary: "bg-neutral-100",
    outline: "border border-neutral-200",
  };

  // Combine all styles using clsx
  const buttonClasses = clsx(baseStyles, variantStyles[variant], className);

  return <span className={buttonClasses}>{children}</span>;
};

export default Badge;
