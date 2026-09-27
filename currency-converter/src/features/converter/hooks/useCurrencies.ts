import { useQuery } from "@tanstack/react-query";
import { getCurrencies } from "../api";

export const useCurrencies = () => {
  return useQuery({
    queryKey: ["currencies"],
    queryFn: getCurrencies,
    staleTime: Infinity,
  });
};
