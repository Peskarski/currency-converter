import { useQuery } from "@tanstack/react-query";
import { type CurrencyApiResponse } from "@shared/types";
import { getCurrencies } from "../api";

export const useCurrencies = () => {
  return useQuery<CurrencyApiResponse[]>({
    queryKey: ["currencies"],
    queryFn: getCurrencies,
  });
};
