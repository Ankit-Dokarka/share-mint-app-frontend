import type {
  CreateExpensePayload,
  GroupExpensesResponse,
} from "../../types/expence";

export const BASE_URL = import.meta.env.VITE_API_URL;

export const expenseAPI = {
  async getExpenses() {
    const response = await fetch(`${BASE_URL}/api/expenses`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  },

  async getGroupExpenses(groupId: string): Promise<GroupExpensesResponse> {
    const response = await fetch(`${BASE_URL}/api/expenses/${groupId}`, {
      method: "GET",
      credentials: "include",
    });

    const data = (await response.json()) as Partial<GroupExpensesResponse> & {
      message?: string;
    };

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch group expenses");
    }

    if (!data.group || !data.expenses || !data.balances) {
      throw new Error("Group expenses response is incomplete");
    }

    return data as GroupExpensesResponse;
  },

  async createExpense(payload: CreateExpensePayload) {
    const response = await fetch(`${BASE_URL}/api/expenses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  },
};
