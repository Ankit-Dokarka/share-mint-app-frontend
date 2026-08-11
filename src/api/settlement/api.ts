import type { CreateSettlementPayload } from "../../types/settlement";

export const BASE_URL = import.meta.env.VITE_API_URL;

export const settlementAPI = {
  async createSettlement(payload: CreateSettlementPayload) {
    const response = await fetch(`${BASE_URL}/api/settlements`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create settlement");
    }

    return data;
  },
};
