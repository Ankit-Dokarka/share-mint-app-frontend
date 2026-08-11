import type { UserRef } from "./expence";

export type Settlement = {
  _id: string;
  group: string;
  payer: UserRef;
  receiver: UserRef;
  amount: number;
  note?: string;
  status: "pending" | "completed";
  settledAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateSettlementPayload = {
  groupId: string;
  receiver: string; // The user receiving the money
  amount: number;
  note?: string;
};
