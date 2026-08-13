export type UserRef = {
  _id: string;
  fullName: string;
  email: string;
  avatar?: string;
};

export type Participant = {
  user: UserRef;
  amount: number;
  paid: boolean;
};

export type Expense = {
  _id: string;
  title: string;
  description?: string;
  amount: number;
  paidBy: UserRef;
  group: string;
  participants: Participant[];
  splitType: "equal" | "percentage" | "exact";
  createdAt: string;
  updatedAt: string;
};

// Backend returns: { user, paid, owes, balance }
export type Balance = {
  user: UserRef;
  paid: number;
  owes: number;
  balance: number; // > 0 means to receive, < 0 means to pay
};

export type CreateExpensePayload = {
  title: string;
  description?: string;
  amount: number;
  groupId: string;
  paidBy: string;
  splitType: "equal" | "percentage" | "exact";
  participants: { user: string }[];
   expenseDate: string;

};

export type GroupExpensesResponse = {
  success: boolean;
  expenses: Expense[];
  balances: Balance[];
};
