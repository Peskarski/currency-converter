import { type Currency } from "../types";

const defaultCurrencyOption = {
  label: "Select Currency",
  value: "",
  disabled: true,
};

export const convertCurrenciesToOptions = (currencies: Currency[]) => {
  return [
    defaultCurrencyOption,
    ...currencies.map((currency) => ({
      label: currency.name,
      value: currency.short_code,
    })),
  ];
};
