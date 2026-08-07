import { FiPlus, FiShoppingBag, FiZap, FiPlay, FiTruck } from "react-icons/fi";
import type { IconType } from "react-icons";

type Expense = {
  id: number;
  name: string;
  category: string;
  date: string;
  amount: string;
  icon: IconType;
  colorClass: string;
};

export default function Expenses() {
  const expenses: Expense[] = [
    {
      id: 1,
      name: "Groceries",
      category: "Food",
      date: "Oct 24, 2023",
      amount: "$120.00",
      icon: FiShoppingBag,
      colorClass: "bg-(--color-primary)/10 text-(--color-primary)",
    },
    {
      id: 2,
      name: "Electricity Bill",
      category: "Utilities",
      date: "Oct 22, 2023",
      amount: "$85.00",
      icon: FiZap,
      colorClass: "bg-(--color-success)/10 text-(--color-success)",
    },
    {
      id: 3,
      name: "Netflix Subscription",
      category: "Entertainment",
      date: "Oct 20, 2023",
      amount: "$15.00",
      icon: FiPlay,
      colorClass: "bg-(--color-danger)/10 text-(--color-danger)",
    },
    {
      id: 4,
      name: "Gas",
      category: "Transport",
      date: "Oct 18, 2023",
      amount: "$40.00",
      icon: FiTruck,
      colorClass: "bg-(--color-text-muted)/10 text-(--color-text-muted)",
    },
  ];

  return (
    <div className="bg-(--color-surface) border border-(--color-border) rounded-(--btn-radius) shadow-sm overflow-hidden">
      <div className="p-6 border-b border-(--color-border) flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-(--color-text)">
            All Expenses
          </h2>
          <p className="text-sm text-(--color-text-muted) mt-1">
            Manage and track your shared spending
          </p>
        </div>
        <button className="flex items-center gap-2 bg-(--color-primary) hover:bg-(--color-primary-hover) text-(--color-surface) text-sm font-medium px-4 py-2.5 rounded-(--btn-radius) transition-colors shadow-sm w-full sm:w-auto justify-center">
          <FiPlus size={16} />
          Add Expense
        </button>
      </div>

      <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-(--color-bg)/50 border-b border-(--color-border) text-[11px] font-semibold text-(--color-text-muted) uppercase tracking-wider">
        <div className="col-span-5">Name</div>
        <div className="col-span-3">Category</div>
        <div className="col-span-2">Date</div>
        <div className="col-span-2 text-right">Amount</div>
      </div>

      <div className="flex flex-col">
        {expenses.map((expense) => {
          const Icon = expense.icon;
          return (
            <div
              key={expense.id}
              className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-(--color-border) last:border-b-0 hover:bg-(--color-bg)/50 transition-colors duration-200 items-center"
            >
              <div className="col-span-12 md:col-span-5 flex items-center gap-3">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full shrink-0 ${expense.colorClass}`}
                >
                  <Icon size={18} />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-(--color-text) truncate">
                    {expense.name}
                  </p>
                  <p className="text-xs text-(--color-text-muted) md:hidden mt-0.5">
                    {expense.date}
                  </p>
                </div>
              </div>

              <div className="col-span-6 md:col-span-3 hidden md:block">
                <span
                  className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${expense.colorClass}`}
                >
                  {expense.category}
                </span>
              </div>

              <div className="col-span-3 md:col-span-2 hidden md:block">
                <p className="text-sm text-(--color-text-muted)">
                  {expense.date}
                </p>
              </div>

              <div className="col-span-6 md:col-span-2 text-right">
                <p className="font-bold text-(--color-text)">
                  {expense.amount}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
