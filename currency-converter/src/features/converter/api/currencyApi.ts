import { httpClient } from "@/shared/api";

export const getCurrencies = async () => {
  const response = await httpClient.get("/currencies");
  return response.data;
};
