import React, { MouseEvent } from "react";
import Link from "next/link";

interface ButtonProps {
  label: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  href?: string;
  variant?: "default" | "darkBlue" | "outline";
  size?: "small" | "default";
  disabled?: boolean;
  linkTarget?: "_self" | "_blank";
  icon?: React.ReactNode;
  iconRotate?: boolean;
}

export default function Button({
  label,
  onClick,
  className = "",
  type = "button",
  href,
  variant = "default",
  size = "default",
  disabled = false,
  linkTarget = "_self",
  icon,
  iconRotate = false,
}: ButtonProps) {
  const baseStyles = "rounded-full cursor-pointer focus:outline-none ";

  // Size
  const defaultSizeStyles = "text-lg py-[9px] px-[28px] ";
  const smallSizeStyles = "text-sm py-[5px] px-[20px] ";

  // Variant
  const defaultStyles = "bg-blue-500 text-white hover:bg-blue-600";
  const darkBlueStyles = "bg-blue-800 text-white hover:bg-blue-900";
  const outlineStyles =
    "text-blue-500 border-solid border-2 border-blue-500 hover:bg-blue-500 hover:text-white";

  // Disabled
  const disabledStyles =
    "bg-gray-300 text-gray-500 hover:bg-gray-300 cursor-default";

  const getVariantStyles = () => {
    if (variant === "darkBlue") return darkBlueStyles;
    if (variant === "outline") return outlineStyles;
    return defaultStyles;
  };

  const getSizeStyles = () => {
    if (size === "small") return smallSizeStyles;
    return defaultSizeStyles;
  };

  const buttonClasses = `${baseStyles} ${getVariantStyles()} ${getSizeStyles()} ${
    disabled ? disabledStyles : ""
  } ${className}`;

  if (href) {
    return (
      <Link href={href} target={linkTarget} className={buttonClasses}>
        {label}
        {icon && (
          <span
            className={`ml-[10px] text-sm test ${
              iconRotate ? "inline-block relative top-[-2px] rotate-180" : null
            }`}
          >
            {icon}
          </span>
        )}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={buttonClasses}>
      {label}
      {icon && (
        <span
          className={`ml-[10px] text-sm test ${
            iconRotate ? "inline-block relative top-[-4px] rotate-180" : null
          }`}
        >
          {icon}
        </span>
      )}
    </button>
  );
}
