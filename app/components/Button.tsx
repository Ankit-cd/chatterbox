"use client";

import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type,
  disabled,
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`w-full cursor-pointer h-14 rounded-full bg-linear-to-r from-amber-300 to-yellow-300 text-white font-semibold text-lg hover:scale-[1.02] transition duration-300 shadow-lg`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
