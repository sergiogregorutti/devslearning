import React, { MouseEvent } from "react";
import Link from "next/link";

interface ButtonProps {
  label: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  href?: string;
  variant?: "default" | "darkBlue";
  disabled?: boolean;
  linkTarget?: "_self" | "_blank";
  icon?: React.ReactNode;
}

export default function Button({
  label,
  onClick,
  className = "",
  type = "button",
  href,
  variant = "default",
  disabled = false,
  linkTarget = "_self",
  icon,
}: ButtonProps) {
  const baseStyles =
    "text-lg py-[9px] px-[28px] rounded-full cursor-pointer focus:outline-none ";
  const defaultStyles = "bg-blue-500 text-white hover:bg-blue-600";
  const darkBlueStyles = "bg-blue-800 text-white hover:bg-blue-900";
  const disabledStyles =
    "bg-gray-300 text-gray-500 hover:bg-gray-300 cursor-default";

  const getVariantStyles = () => {
    if (variant === "darkBlue") return darkBlueStyles;
    return defaultStyles;
  };

  const buttonClasses = `${baseStyles} ${getVariantStyles()} ${
    disabled ? disabledStyles : ""
  } ${className}`;

  if (href) {
    return (
      <Link href={href} target={linkTarget} className={buttonClasses}>
        {label}
        {icon && <span className="ml-[10px] text-sm">{icon}</span>}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={buttonClasses}>
      {label}
      {icon && <span className="ml-[10px] text-sm">{icon}</span>}
    </button>
  );
}
