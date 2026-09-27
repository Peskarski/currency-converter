import { useQuery } from "@tanstack/react-query";
import { type ConverterPayload, type ConverterResponse } from "@shared/types";
import { convert } from "../api";

export const useConversion = ({ from, to, amount }: ConverterPayload) => {
  return useQuery<ConverterResponse>({
    queryKey: ["conversion", from, to, amount],
    queryFn: () => convert({ from, to, amount }),
    enabled: !!(from && to && amount),
  });
};
