import React from 'react';

type FieldSchemaType = {
  field: React.ReactElement;
  errors?: string;
};
const FieldSchema: React.FC<FieldSchemaType> = ({ field, errors }) => {
  return (
    <div className="pt-2">
      {field}
      <span className="text-red-500 text-xs">{errors}</span>
    </div>
  );
};

type InputFieldProps = {
  label: string;
  type: React.HTMLInputTypeAttribute;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  required?: boolean;
  placeholder?: string;
};
export const InputField: React.FC<InputFieldProps> = ({ label, type, onChange, value, required, placeholder }) => {
  const requiredString = required ? '*' : '';

  return (
    <div className="grid grid-cols-2">
      <p>
        {label}
        {requiredString}
      </p>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className="px-1 bg-gray-100 rounded-sm border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-teal-500 w-full"
      />
    </div>
  );
};

type Props = {
  label: string;
  selected: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
};
export const SelectField: React.FC<Props> = ({ selected, onChange, options, label, required }) => {
  const requiredString = required ? '*' : '';

  return (
    <div className="grid grid-cols-2">
      <p>
        {label}
        {requiredString}
      </p>
      <select
        value={selected}
        onChange={onChange}
        className="bg-gray-100 border border-gray-300 text-sm rounded-sm focus:border-teal-500 outline-none"
      >
        {options.map((model) => (
          <option key={model} value={model}>
            {model}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FieldSchema;
