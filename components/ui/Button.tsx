import React, { MouseEvent } from "react";
import Link from "next/link";
import clsx from "clsx";

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

const Button: React.FC<ButtonProps> = React.memo(
  ({
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
  }) => {
    // Base styles
    const baseStyles =
      "rounded-full transition-all duration-500 cursor-pointer focus:outline-none inline-block";

    // Variant styles
    const variantStyles = {
      default: "bg-blue-500 text-white hover:bg-blue-600",
      darkBlue: "bg-blue-800 text-white hover:bg-blue-900",
      outline:
        "text-blue-500 border-solid border-2 border-blue-500 hover:bg-blue-500 hover:text-white",
    };

    // Size styles
    const sizeStyles = {
      small: "text-sm py-[5px] px-[20px]",
      default: "text-lg py-[9px] px-[28px]",
    };

    // Disabled styles
    const disabledStyles =
      "bg-gray-300 text-gray-500 hover:bg-gray-300 cursor-default";

    // Combine all styles using clsx
    const buttonClasses = clsx(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      { [disabledStyles]: disabled },
      className
    );

    const iconClass = clsx("ml-[10px] text-sm", {
      "inline-block relative top-[-2px] rotate-180": iconRotate,
    });

    const buttonContent = (
      <>
        {label}
        {icon && <span className={iconClass}>{icon}</span>}
      </>
    );

    if (href) {
      return (
        <Link href={href} target={linkTarget} className={buttonClasses}>
          {buttonContent}
        </Link>
      );
    }

    return (
      <button
        type={type}
        onClick={onClick}
        className={buttonClasses}
        disabled={disabled}
      >
        {buttonContent}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
