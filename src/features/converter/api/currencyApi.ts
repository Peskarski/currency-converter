import { httpClient } from "@shared/api";
import { type ConverterPayload, type Currency, type ConverterResponse } from "../types";

export const getCurrencies = async (): Promise<Currency[]> => {
  const response = await httpClient.get("/currencies");
  return response.data.response;
};

export const convert = async ({
  from,
  to,
  amount,
  signal,
}: ConverterPayload & { signal: AbortSignal }): Promise<ConverterResponse> => {
  const response = await httpClient.get("/convert", { params: { from, to, amount }, signal });
  return response.data.response;
};
