import axios from "axios";

const BASE_API_URL = "/api";

export const httpClient = axios.create({
  baseURL: BASE_API_URL,
});
