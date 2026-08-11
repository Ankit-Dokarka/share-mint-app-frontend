import { useState, type ReactNode } from "react";
import { ExpenseContext } from "./ExpenseContext";
import type {
  Expense,
  Balance,
  CreateExpensePayload,
} from "../../types/expence";
import { expenseAPI } from "../../api/expense/api";

type ExpenseProviderProps = {
  children: ReactNode;
};

export function ExpenseProvider({ children }: ExpenseProviderProps) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [balances, setBalances] = useState<Balance[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addExpense = async (payload: CreateExpensePayload) => {
    await expenseAPI.createExpense(payload);
    // The component calling this should re-fetch the group expenses
    // to update the list and balances.
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        setExpenses,
        balances,
        setBalances,
        addExpense,
        isLoading,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}
