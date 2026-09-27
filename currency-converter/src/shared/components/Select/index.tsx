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
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
      )}
      <select className="border border-gray-300 rounded-md p-2" id={id} {...otherProps}>
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
