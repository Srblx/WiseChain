// React libs
import React from "react";

interface Option {
  id: string;
  name: string;
}

export interface SelectProps {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  label: string;
  placeholder: string;
}

const Select = ({ name, value, onChange, options, label, placeholder }: SelectProps) => (
  <div className="mb-2">
    <label className="label">{label}</label>
    <select
      name={name}
      value={value || ""}
      onChange={onChange}
      className="select select-bordered w-full mb-2"
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  </div>
);

export default Select;