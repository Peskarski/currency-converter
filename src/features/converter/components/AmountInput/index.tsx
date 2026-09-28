import { Input } from "@shared/components";

type AmountInputProps = {
  value: string;
  onChange: (value: string) => void;
};

const AMOUNT_PATTERN = /^\d*[.]?\d*$/;

export const AmountInput = ({ value, onChange }: AmountInputProps) => {
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    if (AMOUNT_PATTERN.test(next)) {
      onChange(next);
    }
  };

  return (
    <Input
      value={value}
      onChange={handleAmountChange}
      label="Amount"
      id="amount"
      type="text"
      inputMode="decimal"
    />
  );
};
