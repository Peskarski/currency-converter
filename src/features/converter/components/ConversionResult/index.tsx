import { ErrorMessage, Spinner } from "@shared/components";

type ConversionResultProps = {
  isLoading: boolean;
  isError: boolean;
  value?: number;
  precision: number;
};

export const ConversionResult = ({
  isLoading,
  isError,
  value,
  precision,
}: ConversionResultProps) => {
  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <ErrorMessage message="Failed to convert currencies" />;
  }

  if (value === undefined) {
    return <span className="text-gray-400">—</span>;
  }

  return <span>{value.toFixed(precision)}</span>;
};
