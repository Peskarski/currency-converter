import { useQuery } from "@tanstack/react-query";
import { type ConverterPayload } from "../types";
import { convert } from "../api";

export const useConversion = ({ from, to, amount }: ConverterPayload) => {
  return useQuery({
    queryKey: ["conversion", from, to, amount],
    queryFn: ({ signal }) => convert({ from, to, amount, signal }),
    enabled: !!(from && to && amount),
    staleTime: 1000 * 60 * 15,
  });
};
