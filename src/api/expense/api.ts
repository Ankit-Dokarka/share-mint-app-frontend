import type {
  CreateExpensePayload,
  GroupExpensesResponse,
} from "../../types/expence";

export const BASE_URL = import.meta.env.VITE_API_URL;

export const expenseAPI = {
  async getGroupExpenses(groupId: string): Promise<GroupExpensesResponse> {
    const [expensesRes, balancesRes] = await Promise.all([
      fetch(`${BASE_URL}/api/expenses/group/${groupId}`, {
        method: "GET",
        credentials: "include",
      }),
      fetch(`${BASE_URL}/api/balances/${groupId}`, {
        method: "GET",
        credentials: "include",
      }),
    ]);

    const expensesData = await expensesRes.json();
    const balancesData = await balancesRes.json();

    if (!expensesRes.ok) {
      throw new Error(expensesData.message || "Failed to fetch expenses");
    }
    if (!balancesRes.ok) {
      throw new Error(balancesData.message || "Failed to fetch balances");
    }

    return {
      success: true,
      expenses: expensesData.expenses || [],
      balances: balancesData.balances || [],
    };
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
