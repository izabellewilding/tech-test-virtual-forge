import React, { ChangeEvent, InputProps } from "react";

interface TextFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: React.HTMLProps<HTMLButtonElement>["type"];
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  name,
  value,
  onChange,
  required = false,
}) => {
  return (
    <div>
      <label htmlFor={`text-field-id-${name}`}>{label}:</label>
      <input
        type="text"
        id={`text-field-id-${name}`}
        name={name}
        value={value}
        onChange={onChange}
        className={
          "shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none"
        }
        required={required}
        aria-required={required}
      />
    </div>
  );
};
