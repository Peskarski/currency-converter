type InputProps = {
  label?: string;
};

export const Input = ({
  label,
  id,
  ...otherProps
}: InputProps & React.InputHTMLAttributes<HTMLInputElement>) => {
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
