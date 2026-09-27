import { httpClient } from "@shared/api";
import { type ConverterPayload } from "@shared/types";

export const getCurrencies = async () => {
  const response = await httpClient.get("/currencies");
  return response.data;
};

export const convert = async ({ from, to, amount }: ConverterPayload) => {
  const response = await httpClient.get("/convert", { params: { from, to, amount } });
  return response.data;
};
