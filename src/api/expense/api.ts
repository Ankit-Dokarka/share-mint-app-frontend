import type {
  CreateExpensePayload,
  GroupExpensesResponse,
  Expense,
  Balance,
} from "../../types/expence";

const BASE_URL = import.meta.env.VITE_API_URL;

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "An unexpected error occurred");
  }
  return data as T;
}

export const expenseAPI = {
  async getGroupExpenses(groupId: string): Promise<GroupExpensesResponse> {
    const [expensesRes, balancesRes] = await Promise.all([
      fetch(`${BASE_URL}/api/expenses/group/${groupId}`, {
        credentials: "include",
      }),
      fetch(`${BASE_URL}/api/balances/${groupId}`, { credentials: "include" }),
    ]);

    const expensesData = await handleResponse<{ expenses: Expense[] }>(
      expensesRes,
    );
    const balancesData = await handleResponse<{ balances: Balance[] }>(
      balancesRes,
    );

    return {
      success: true,
      expenses: expensesData.expenses || [],
      balances: balancesData.balances || [],
    };
  },

  async createExpense(payload: CreateExpensePayload) {
    const response = await fetch(`${BASE_URL}/api/expenses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    return handleResponse(response);
  },
};
