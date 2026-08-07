import { createContext, useContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import type {
  Expense,
  Balance,
  CreateExpensePayload,
} from "../../types/expence";

type ExpenseContextType = {
  expenses: Expense[];
  setExpenses: Dispatch<SetStateAction<Expense[]>>;
  balances: Balance[];
  setBalances: Dispatch<SetStateAction<Balance[]>>;
  addExpense: (payload: CreateExpensePayload) => Promise<void>;
  isLoading: boolean;
};

export const ExpenseContext = createContext<ExpenseContextType | null>(null);

export function useExpense() {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpense must be used within an ExpenseProvider");
  }
  return context;
}
