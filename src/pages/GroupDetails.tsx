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
  FiCheckCircle,
} from "react-icons/fi";
import { expenseAPI } from "../api/expense/api";
import AddExpenseModal from "../modals/AddExpenseModal";
import SettleUpModal from "../modals/SettleUpModal";
import useAuth from "../context/auth/AuthContext";
import { useGroup } from "../context/groups/GroupsContext"; // Import the context hook
import type { Balance, Expense } from "../types/expence";


export default function GroupDetails() {
  const { groupId } = useParams<{ groupId: string }>();
  const { user } = useAuth();
  const { groups, isLoadingGroups } = useGroup();

  // Find the group from the context instead of making an API call
  const group = useMemo(
    () => groups.find((g) => g._id === groupId),
    [groups, groupId]
  );

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [balances, setBalances] = useState<Balance[]>([]);
  const [isLoadingExpenses, setIsLoadingExpenses] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [isSettleUpOpen, setIsSettleUpOpen] = useState(false);

  const fetchGroupDetails = useCallback(async () => {
    if (!groupId) return;

    setIsLoadingExpenses(true);
    setError(null);

    try {
      // We only need to fetch expenses and balances, group data comes from context
      const expenseData = await expenseAPI.getGroupExpenses(groupId);

      setExpenses(expenseData.expenses);
      setBalances(expenseData.balances);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load group details",
      );
    } finally {
      setIsLoadingExpenses(false);
    }
  }, [groupId]);

  useEffect(() => {
    if (group) {
      void Promise.resolve().then(fetchGroupDetails);
    }
  }, [fetchGroupDetails, group]);

  const currentUserBalance = useMemo(
    () => balances.find((b) => b.user._id === user?._id),
    [balances, user?._id],
  );

  const formatINR = (val: number) =>
    `₹${val.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

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
    if (!currentUserBalance || currentUserBalance.balance === 0) {
      return "You are settled up";
    }
    if (currentUserBalance.balance > 0) {
      return `You have ${formatINR(currentUserBalance.balance)} to receive`;
    }
    return `You have ${formatINR(Math.abs(currentUserBalance.balance))} to pay`;
  };

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <Link
        to="/dashboard/groups"
        className="inline-flex items-center gap-2 text-sm text-(--color-text-muted) hover:text-(--color-primary) transition-colors w-fit"
      >
        <FiArrowLeft size={16} /> Groups
      </Link>

      {isLoadingGroups || isLoadingExpenses ? (
        <div className="flex items-center justify-center py-28 bg-(--color-surface) border border-(--color-border) rounded-(--btn-radius) shadow-sm">
          <FiLoader className="animate-spin text-(--color-primary)" size={32} />
        </div>
      ) : error ? (
        <div className="flex items-center gap-3 text-sm text-(--color-danger) bg-(--color-danger)/10 p-4 rounded-(--btn-radius) border border-(--color-danger)/30">
          <FiAlertCircle size={20} className="shrink-0" /> <p>{error}</p>
        </div>
      ) : !group ? (
        <div className="flex items-center gap-3 text-sm text-(--color-danger) bg-(--color-danger)/10 p-4 rounded-(--btn-radius) border border-(--color-danger)/30">
          <FiAlertCircle size={20} className="shrink-0" /> <p>Group not found. It may have been deleted or you don't have access.</p>
        </div>
      ) : (
        <>
          <div className="rounded-(--btn-radius) border border-(--color-border) bg-(--color-surface) p-5 shadow-sm md:p-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-(--color-primary-soft) text-(--color-primary) rounded-(--btn-radius)">
                  <FiUsers size={28} />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-(--color-text)">
                    {group.name}
                  </h1>
                  <p className="text-sm text-(--color-text-muted) mt-2">
                    {group.members.length}{" "}
                    {group.members.length === 1 ? "member" : "members"} · Total{" "}
                    {formatINR(totalSpent)}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={() => setIsSettleUpOpen(true)}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-(--color-success) hover:bg-(--color-success-hover) text-white text-sm font-semibold rounded-(--btn-radius) transition-colors shadow-sm"
                >
                  <FiCheckCircle size={16} /> Settle Up
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddExpenseOpen(true)}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-(--color-primary) hover:bg-(--color-primary-hover) text-white text-sm font-semibold rounded-(--btn-radius) transition-colors shadow-sm"
                >
                  <FiPlus size={16} /> Add Expense
                </button>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {group.members.map((member) => (
                <div
                  key={member._id}
                  className="flex items-center gap-2 rounded-full border border-(--color-border) bg-(--color-surface-strong)/70 py-1 pl-1 pr-3"
                >
                  <div className="h-7 w-7 rounded-full bg-(--color-primary-soft) text-(--color-primary) text-xs font-bold flex items-center justify-center overflow-hidden">
                    {member.avatar ? (
                      <img
                        src={member.avatar}
                        alt={member.fullName}
                        className="h-full w-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      member.fullName?.[0]?.toUpperCase() || "U"
                    )}
                  </div>
                  <span className="max-w-36 truncate text-xs font-semibold text-(--color-text-muted)">
                    {member.fullName}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`bg-(--color-surface) border rounded-(--btn-radius) p-6 shadow-sm ${
              currentUserBalance && currentUserBalance.balance > 0
                ? "border-(--color-success)/40"
                : currentUserBalance && currentUserBalance.balance < 0
                  ? "border-(--color-danger)/40"
                  : "border-(--color-border)"
            }`}
          >
            <p className="text-xs font-semibold uppercase text-(--color-text-muted)">
              Your Balance
            </p>
            <p
              className={`mt-3 text-2xl font-extrabold md:text-3xl ${
                currentUserBalance && currentUserBalance.balance > 0
                  ? "text-(--color-success)"
                  : currentUserBalance && currentUserBalance.balance < 0
                    ? "text-(--color-danger)"
                    : "text-(--color-text)"
              }`}
            >
              {renderUserSummary()}
            </p>
          </div>

          {expenses.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-20 px-6 bg-(--color-surface) border border-(--color-border) rounded-(--btn-radius) shadow-sm">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-(--color-primary-soft) mb-5">
                <FiCreditCard size={28} className="text-(--color-primary)" />
              </div>
              <h2 className="text-xl font-bold text-(--color-text) mb-1.5">
                No expenses yet
              </h2>
              <p className="max-w-md text-sm leading-6 text-(--color-text-muted)">
                Add the first expense to start calculating what each member has
                to pay or to receive.
              </p>
              <button
                type="button"
                onClick={() => setIsAddExpenseOpen(true)}
                className="mt-6 flex items-center justify-center gap-2 px-4 py-2.5 bg-(--color-primary) hover:bg-(--color-primary-hover) text-white text-sm font-semibold rounded-(--btn-radius) transition-colors shadow-sm"
              >
                <FiPlus size={16} /> Add Expense
              </button>
            </div>
          ) : (
            <div className="bg-(--color-surface) border border-(--color-border) rounded-(--btn-radius) shadow-sm overflow-hidden">
              <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 bg-(--color-surface-strong)/70 border-b border-(--color-border) text-[11px] font-semibold text-(--color-text-muted) uppercase">
                <div className="col-span-3">Title</div>
                <div className="col-span-3">Description</div>
                <div className="col-span-2 text-right">Amount</div>
                <div className="col-span-2">Paid By</div>
                <div className="col-span-2">Date</div>
              </div>

              {expenses.map((expense) => (
                <div
                  key={expense._id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-5 py-4 border-b border-(--color-border) last:border-b-0 hover:bg-(--color-surface-strong)/55 transition-colors"
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
                    <FiCalendar size={13} /> {formatDate(expense.createdAt)}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="bg-(--color-surface) border border-(--color-border) rounded-(--btn-radius) p-5 shadow-sm">
            <h2 className="text-sm font-bold text-(--color-text) uppercase mb-4">
              Group Balances
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {balances.map((balance) => (
                <div
                  key={balance.user._id}
                  className="flex items-center justify-between gap-4 p-3 bg-(--color-surface-strong)/70 rounded-(--btn-radius) border border-(--color-border)"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-(--color-text) truncate">
                      {balance.user.fullName}
                    </p>
                    <p className="text-xs text-(--color-text-muted) truncate">
                      {balance.user.email}
                    </p>
                  </div>
                  {balance.balance > 0 ? (
                    <p className="text-sm font-semibold text-(--color-success) whitespace-nowrap">
                      {formatINR(balance.balance)} to receive
                    </p>
                  ) : balance.balance < 0 ? (
                    <p className="text-sm font-semibold text-(--color-danger) whitespace-nowrap">
                      {formatINR(Math.abs(balance.balance))} to pay
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
          <SettleUpModal
            isOpen={isSettleUpOpen}
            onClose={() => setIsSettleUpOpen(false)}
            groupId={group._id}
            balances={balances}
            onSettled={fetchGroupDetails}
          />
        </>
      )}
    </section>
  );
}