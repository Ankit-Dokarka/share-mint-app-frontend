import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FiAlertCircle,
  FiArrowLeft,
  FiCalendar,
  FiCreditCard,
  FiLoader,
  FiPlus,
  FiUsers,
} from "react-icons/fi";
import { expenseAPI } from "../api/expense/api";
import AddExpenseModal from "../modals/AddExpenseModal";
import useAuth from "../hooks/useAuth";
import type { Balance, Expense } from "../types/expence";
import type { Group } from "../types/groups";

export default function GroupDetails() {
  const { groupId } = useParams<{ groupId: string }>();
  const { user } = useAuth();
  const [group, setGroup] = useState<Group | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [balances, setBalances] = useState<Balance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);

  const fetchGroupDetails = useCallback(async () => {
    if (!groupId) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await expenseAPI.getGroupExpenses(groupId);
      setGroup(data.group);
      setExpenses(data.expenses);
      setBalances(data.balances);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load group details",
      );
    } finally {
      setIsLoading(false);
    }
  }, [groupId]);

  useEffect(() => {
    void Promise.resolve().then(fetchGroupDetails);
  }, [fetchGroupDetails]);

  const currentUserBalance = useMemo(
    () => balances.find((balance) => balance.user._id === user?._id),
    [balances, user?._id],
  );

  const formatINR = (val: number) =>
    `₹${val.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const formatDate = (isoString?: string) =>
    isoString
      ? new Date(isoString).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "No date";

  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const renderUserSummary = () => {
    if (!currentUserBalance) {
      return "You are settled up";
    }

    if (currentUserBalance.toReceive > 0) {
      return `You have ${formatINR(currentUserBalance.toReceive)} to receive`;
    }

    if (currentUserBalance.toPay > 0) {
      return `You have ${formatINR(currentUserBalance.toPay)} to pay`;
    }

    return "You are settled up";
  };

  return (
    <section className="max-w-6xl mx-auto flex flex-col gap-6">
      <Link
        to="/dashboard/groups"
        className="inline-flex items-center gap-2 text-sm text-(--color-text-muted) hover:text-(--color-primary) transition-colors w-fit"
      >
        <FiArrowLeft size={16} />
        Groups
      </Link>

      {isLoading ? (
        <div className="flex items-center justify-center py-28 bg-(--color-surface) border border-(--color-border) rounded-(--btn-radius)">
          <FiLoader className="animate-spin text-(--color-primary)" size={32} />
        </div>
      ) : error ? (
        <div className="flex items-center gap-3 text-sm text-(--color-danger) bg-(--color-danger)/10 p-4 rounded-(--btn-radius) border border-(--color-danger)/30">
          <FiAlertCircle size={20} className="shrink-0" />
          <p>{error}</p>
        </div>
      ) : group ? (
        <>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-(--color-primary)/10 text-(--color-primary) rounded-(--btn-radius)">
                <FiUsers size={28} />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-(--color-text)">
                  {group.name}
                </h1>
                <p className="text-sm text-(--color-text-muted) mt-1">
                  {group.members.length}{" "}
                  {group.members.length === 1 ? "member" : "members"} · Total{" "}
                  {formatINR(totalSpent)}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsAddExpenseOpen(true)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-(--color-primary) hover:bg-(--color-primary-hover) text-(--color-surface) text-sm font-medium rounded-(--btn-radius) transition-colors shadow-sm"
            >
              <FiPlus size={16} />
              Add Expense
            </button>
          </div>

          <div
            className={`bg-(--color-surface) border rounded-(--btn-radius) p-5 shadow-sm ${
              currentUserBalance?.toReceive
                ? "border-(--color-success)/40"
                : currentUserBalance?.toPay
                  ? "border-(--color-danger)/40"
                  : "border-(--color-border)"
            }`}
          >
            <p className="text-xs font-semibold uppercase text-(--color-text-muted) tracking-wider">
              Your Balance
            </p>
            <p
              className={`mt-2 text-xl font-bold ${
                currentUserBalance?.toReceive
                  ? "text-(--color-success)"
                  : currentUserBalance?.toPay
                    ? "text-(--color-danger)"
                    : "text-(--color-text)"
              }`}
            >
              {renderUserSummary()}
            </p>
          </div>

          {expenses.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-20 px-6 bg-(--color-surface) border border-(--color-border) rounded-(--btn-radius) shadow-sm">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-(--color-primary)/10 mb-5">
                <FiCreditCard size={28} className="text-(--color-primary)" />
              </div>
              <h2 className="text-lg font-semibold text-(--color-text) mb-1.5">
                No expenses yet
              </h2>
              <button
                type="button"
                onClick={() => setIsAddExpenseOpen(true)}
                className="mt-5 flex items-center justify-center gap-2 px-4 py-2.5 bg-(--color-primary) hover:bg-(--color-primary-hover) text-(--color-surface) text-sm font-medium rounded-(--btn-radius) transition-colors shadow-sm"
              >
                <FiPlus size={16} />
                Add Expense
              </button>
            </div>
          ) : (
            <div className="bg-(--color-surface) border border-(--color-border) rounded-(--btn-radius) shadow-sm overflow-hidden">
              <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 bg-(--color-bg)/60 border-b border-(--color-border) text-[11px] font-semibold text-(--color-text-muted) uppercase tracking-wider">
                <div className="col-span-3">Title</div>
                <div className="col-span-3">Description</div>
                <div className="col-span-2 text-right">Amount</div>
                <div className="col-span-2">Paid By</div>
                <div className="col-span-2">Date</div>
              </div>

              {expenses.map((expense) => (
                <div
                  key={expense._id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-5 py-4 border-b border-(--color-border) last:border-b-0 hover:bg-(--color-bg)/40 transition-colors"
                >
                  <div className="md:col-span-3 min-w-0">
                    <p className="font-semibold text-(--color-text) truncate">
                      {expense.title}
                    </p>
                    <p className="md:hidden text-xs text-(--color-text-muted) mt-1">
                      Paid by {expense.paidBy.fullName}
                    </p>
                  </div>
                  <p className="md:col-span-3 text-sm text-(--color-text-muted)">
                    {expense.description || "No description"}
                  </p>
                  <p className="md:col-span-2 md:text-right font-bold text-(--color-text)">
                    {formatINR(expense.amount)}
                  </p>
                  <p className="md:col-span-2 text-sm text-(--color-text)">
                    {expense.paidBy.fullName}
                  </p>
                  <p className="md:col-span-2 text-sm text-(--color-text-muted) flex items-center gap-1">
                    <FiCalendar size={13} />
                    {formatDate(expense.createdAt)}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="bg-(--color-surface) border border-(--color-border) rounded-(--btn-radius) p-5 shadow-sm">
            <h2 className="text-sm font-bold text-(--color-text) uppercase tracking-wider mb-4">
              Group Balances
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {balances.map((balance) => (
                <div
                  key={balance.user._id}
                  className="flex items-center justify-between gap-4 p-3 bg-(--color-bg) rounded-(--btn-radius) border border-(--color-border)"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-(--color-text) truncate">
                      {balance.user.fullName}
                    </p>
                    <p className="text-xs text-(--color-text-muted) truncate">
                      {balance.user.email}
                    </p>
                  </div>
                  {balance.toReceive > 0 ? (
                    <p className="text-sm font-semibold text-(--color-success) whitespace-nowrap">
                      {formatINR(balance.toReceive)} to receive
                    </p>
                  ) : balance.toPay > 0 ? (
                    <p className="text-sm font-semibold text-(--color-danger) whitespace-nowrap">
                      {formatINR(balance.toPay)} to pay
                    </p>
                  ) : (
                    <p className="text-sm font-semibold text-(--color-text-muted) whitespace-nowrap">
                      Settled up
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <AddExpenseModal
            isOpen={isAddExpenseOpen}
            onClose={() => setIsAddExpenseOpen(false)}
            group={group}
            onCreated={fetchGroupDetails}
          />
        </>
      ) : null}
    </section>
  );
}
