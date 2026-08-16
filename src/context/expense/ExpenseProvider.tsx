import { useState, useCallback, useMemo, type ReactNode } from "react";
import { ExpenseContext } from "./ExpenseContext";
import type {
  Expense,
  Balance,
  CreateExpensePayload,
} from "../../types/expence";
import { expenseAPI } from "../../api/expense/api";

type ExpenseProviderProps = { children: ReactNode };

export function ExpenseProvider({ children }: ExpenseProviderProps) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [balances, setBalances] = useState<Balance[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addExpense = useCallback(async (payload: CreateExpensePayload) => {
    await expenseAPI.createExpense(payload);
  }, []);

  const contextValue = useMemo(
    () => ({
      expenses,
      setExpenses,
      balances,
      setBalances,
      addExpense,
      isLoading,
      setIsLoading,
    }),
    [expenses, balances, addExpense, isLoading],
  );

  return (
    <ExpenseContext.Provider value={contextValue}>
      {children}
    </ExpenseContext.Provider>
  );
}
