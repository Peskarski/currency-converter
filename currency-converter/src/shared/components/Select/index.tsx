import { type Option } from "@shared/types";

type SelectProps = {
  options: Option[];
  label?: string;
  disabled?: boolean;
};

export const Select = ({
  options,
  label,
  id,
  ...otherProps
}: SelectProps & React.SelectHTMLAttributes<HTMLSelectElement>) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        className="h-11 w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-3 text-base text-gray-900 shadow-xs disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500"
        id={id}
        {...otherProps}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
