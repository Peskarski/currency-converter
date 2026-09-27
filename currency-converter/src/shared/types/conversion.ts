export type CurrencyApiResponse = {
  short_code: string;
  name: string;
  symbol: string;
};

export type ConverterPayload = {
  from: string;
  to: string;
  amount: number;
};

export type ConverterResponse = {
  value: number;
};
