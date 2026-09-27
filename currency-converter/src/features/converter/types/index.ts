export type Currency = {
  short_code: string;
  name: string;
  symbol: string;
  precision: number;
};

export type ConverterPayload = {
  from: string;
  to: string;
  amount: number;
};

export type ConverterResponse = {
  value: number;
};
