import { type PropsWithChildren } from "react";

export const Button = ({
  children,
  type = "button",
  ...otherProps
}: PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) => {
  return (
    <button type={type} {...otherProps}>
      {children}
    </button>
  );
};
