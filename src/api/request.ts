import type { AxiosRequestConfig } from "axios";
import api from "./axios";

export async function apiRequest<T>(
  config: AxiosRequestConfig,
): Promise<T> {
  const response = await api.request<T>(config);

  return response.data;
}