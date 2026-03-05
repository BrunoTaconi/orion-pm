import React, { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type InputProps = {
  label: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
} & InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement>;

const Input = ({
  label,
  required,
  className = "",
  multiline = false,
  rows = 3,
  ...props
}: InputProps) => {
  const baseStyles =
    "w-full p-2 border border-bg-secondary shadow-sm rounded-md text-md text-text-primary outline-none focus:border-blue-500 focus:ring-0.5 focus:ring-blue-500 transition-all";

  const dateStyles =
    props.type === "date"
      ? "cursor-pointer [&::-webkit-calendar-picker-indicator]:cursor-pointer"
      : "";

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-md font-semibold text-text-primary">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {multiline ? (
        <textarea
          className={`${baseStyles} resize-y min-h-20 ${className}`}
          rows={rows}
          {...(props as any)}
        />
      ) : (
        <input
          className={`${baseStyles} ${dateStyles} ${className}`}
          {...(props as any)}
        />
      )}
    </div>
  );
};

export default Input;
