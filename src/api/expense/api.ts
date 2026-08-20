import type {
  CreateExpensePayload,
  GroupExpensesResponse,
  Expense,
  Balance,
} from "../../types/expence";
import { apiRequest } from "../request";

export const expenseAPI = {
  async getGroupExpenses(groupId: string): Promise<GroupExpensesResponse> {
    const [expensesData, balancesData] = await Promise.all([
      apiRequest<{ expenses: Expense[] }>({
        method: "GET",
        url: `/api/expenses/group/${groupId}`,
      }),

      apiRequest<{ balances: Balance[] }>({
        method: "GET",
        url: `/api/balances/${groupId}`,
      }),
    ]);

    return {
      success: true,
      expenses: expensesData.expenses || [],
      balances: balancesData.balances || [],
    };
  },

  async createExpense(payload: CreateExpensePayload) {
    return apiRequest({
      method: "POST",
      url: "/api/expenses",
      data: payload,
    });
  },
};