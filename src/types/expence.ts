export type UserRef = {
  _id: string;
  fullName: string;
  email: string;
  avatar?: string;
};

export type Participant = {
  user: UserRef;
  amount: number;
  percentage: number;
  paid: boolean;
};

export type Expense = {
  _id: string;
  title: string;
  description: string;
  amount: number;
  currency: string;
  paidBy: UserRef;
  group: string;
  participants: Participant[];
  splitType: string;
  createdAt: string;
};

export type Balance = {
  user: UserRef;
  totalPaid: number;
  totalShare: number;
  toReceive: number;
  toPay: number;
};

export type CreateExpensePayload = {
  title: string;
  description?: string;
  amount: number;
  groupId: string;
  paidBy: string;
  participantIds: string[];
};

export type GroupExpensesResponse = {
  success: true;
  group: import("./groups").Group;
  expenses: Expense[];
  balances: Balance[];
};
