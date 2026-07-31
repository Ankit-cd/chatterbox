"use client";

import clsx from "clsx";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  type,
  register,
  required,
  errors,
  disabled,
  placeholder,
}) => {
  return (
    <div>
      <input
        id={id}
        type={type}
        autoComplete={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder={placeholder}
        className="w-full h-14 rounded-full border border-gray-200 px-6 outline-none text-gray-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition"
      />
    </div>
  );
};

export default Input;
