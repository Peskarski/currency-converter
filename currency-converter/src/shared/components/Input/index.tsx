import type { HTMLInputTypeAttribute } from "react";

type InputProps = {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  id?: string;
  type?: HTMLInputTypeAttribute;
  step?: string;
};

export const Input = ({ label, id, ...otherProps }: InputProps) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
      )}
      <input className="border border-gray-300 rounded-md p-2" id={id} {...otherProps} />
    </div>
  );
};
