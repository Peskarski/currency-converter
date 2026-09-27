type ErrorMessageProps = {
  message: string;
};

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <span className="text-red-500" role="alert">
      {message}
    </span>
  );
};
