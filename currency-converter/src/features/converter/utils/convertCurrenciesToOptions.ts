import { type CurrencyApiResponse } from "@shared/types";

export const convertCurrenciesToOptions = (currencies: Record<number, CurrencyApiResponse>) => {
  return Object.values(currencies).map((currency) => ({
    value: currency.short_code,
    label: currency.name,
  }));
};
