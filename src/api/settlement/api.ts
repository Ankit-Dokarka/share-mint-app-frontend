import type { CreateSettlementPayload } from "../../types/settlement";
import { apiRequest } from "../request";

export const settlementAPI = {
  async createSettlement(payload: CreateSettlementPayload) {
    return apiRequest({
      method: "POST",
      url: "/api/settlements",
      data: payload,
    });
  },
};