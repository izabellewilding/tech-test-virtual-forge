import React, { ChangeEvent } from "react";

interface CheckboxProps {
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = ({
  label,
  name,
  value,
  checked,
  onChange,
}: CheckboxProps) => {
  return (
    <div className="flex flex-row gap-2">
      <input
        type="checkbox"
        id={`checkbox-id-${name}`}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className=""
      />
      <label htmlFor={`checkbox-id-${name}`}>{label}</label>
    </div>
  );
};
