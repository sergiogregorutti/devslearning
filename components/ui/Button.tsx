import React, { MouseEvent, ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";

interface ButtonProps {
  label?: string; // Optional to allow children
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  href?: string;
  variant?: "default" | "darkBlue" | "outline" | "ghost" | "disabled";
  size?: "extraSmall" | "small" | "default";
  disabled?: boolean;
  linkTarget?: "_self" | "_blank";
  icon?: React.ReactNode;
  iconRotate?: boolean;
  children?: ReactNode; // Optional children prop
}

const Button: React.FC<ButtonProps> = React.memo(
  ({
    label,
    children,
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
      "rounded-full transition-all duration-500 focus:outline-none text-center";

    // Variant styles
    const variantStyles = {
      default: "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer",
      darkBlue: "bg-blue-800 text-white hover:bg-blue-900 cursor-pointer",
      outline:
        "text-blue-500 border-solid border-blue-500 hover:bg-blue-500 hover:text-white border-1 cursor-pointer",
      ghost: "hover:bg-neutral-100 cursor-pointer",
      disabled:
        "bg-neutral-200 text-neutral-500 hover:bg-neutral-200 cursor-default",
    };

    // Size styles
    const sizeStyles = {
      extraSmall: "text-xs py-[2px] px-[10px]",
      small: "text-sm py-[5px] px-[20px]",
      default: "text-lg py-[9px] px-[28px]",
    };

    // Combine all styles using clsx
    const buttonClasses = clsx(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    const iconClass = clsx("ml-[10px] text-sm", {
      "inline-block relative top-[-2px] rotate-180": iconRotate,
    });

    // Content rendering logic
    const buttonContent = children || (
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
