import type { CreateSettlementPayload } from "../../types/settlement";

const BASE_URL = import.meta.env.VITE_API_URL;

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "An unexpected error occurred");
  }
  return data as T;
}

export const settlementAPI = {
  async createSettlement(payload: CreateSettlementPayload) {
    const response = await fetch(`${BASE_URL}/api/settlements`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    return handleResponse(response);
  },
};
