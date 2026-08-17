import { useCallback, useEffect, useMemo, useState, memo } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FiAlertCircle,
  FiArrowLeft,
  FiCalendar,
  FiCreditCard,
  FiPlus,
  FiUsers,
  FiCheckCircle,
} from "react-icons/fi";
import { expenseAPI } from "../api/expense/api";
import AddExpenseModal from "../modals/AddExpenseModal";
import SettleUpModal from "../modals/SettleUpModal";
import useAuth from "../context/auth/AuthContext";
import { useGroup } from "../context/groups/GroupsContext";
import type { Balance, Expense } from "../types/expence";

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

const StateMessage = memo(
  ({
    icon,
    title,
    message,
    action,
  }: {
    icon: React.ReactNode;
    title: string;
    message: string;
    action?: React.ReactNode;
  }) => (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center py-20 px-6 bg-(--color-surface) border border-dashed border-(--color-danger) rounded-(--btn-radius) shadow-sm">
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-(--color-danger-soft) mb-5">
        {icon}
      </div>
      <h2 className="text-xl font-bold text-(--color-text) mb-2">{title}</h2>
      <p className="max-w-md text-sm leading-6 text-(--color-text-muted)">
        {message}
      </p>
      {action}
    </div>
  ),
);

const GroupDetailsSkeleton = () => (
  <div className="flex flex-col gap-6">
    <div className="rounded-(--btn-radius) border border-(--color-border) bg-(--color-surface) p-6 shadow-sm h-44 animate-pulse">
      <div className="flex justify-between">
        <div className="w-1/2 space-y-3">
          <div className="h-8 w-3/4 bg-(--color-surface-strong) rounded-(--btn-radius)"></div>
          <div className="h-4 w-1/2 bg-(--color-surface-strong) rounded-(--btn-radius)"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-10 w-28 bg-(--color-surface-strong) rounded-(--btn-radius)"></div>
          <div className="h-10 w-32 bg-(--color-surface-strong) rounded-(--btn-radius)"></div>
        </div>
      </div>
      <div className="mt-6 flex gap-2">
        <div className="h-8 w-24 bg-(--color-surface-strong) rounded-full"></div>
        <div className="h-8 w-24 bg-(--color-surface-strong) rounded-full"></div>
        <div className="h-8 w-24 bg-(--color-surface-strong) rounded-full"></div>
      </div>
    </div>
    <div className="bg-(--color-surface) border border-(--color-border) rounded-(--btn-radius) p-6 shadow-sm h-28 animate-pulse space-y-3">
      <div className="h-4 w-1/4 bg-(--color-surface-strong) rounded-(--btn-radius)"></div>
      <div className="h-8 w-1/3 bg-(--color-surface-strong) rounded-(--btn-radius)"></div>
    </div>
    <div className="bg-(--color-surface) border border-(--color-border) rounded-(--btn-radius) shadow-sm p-5 space-y-4 animate-pulse">
      <div className="h-6 w-1/4 bg-(--color-surface-strong) rounded-(--btn-radius)"></div>
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="h-12 w-full bg-(--color-surface-strong) rounded-(--btn-radius)"
        ></div>
      ))}
    </div>
    <div className="bg-(--color-surface) border border-(--color-border) rounded-(--btn-radius) shadow-sm p-5 space-y-4 animate-pulse">
      <div className="h-6 w-1/4 bg-(--color-surface-strong) rounded-(--btn-radius)"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="h-16 w-full bg-(--color-surface-strong) rounded-(--btn-radius)"></div>
        <div className="h-16 w-full bg-(--color-surface-strong) rounded-(--btn-radius)"></div>
      </div>
    </div>
  </div>
);

const ExpenseItem = memo(({ expense }: { expense: Expense }) => (
  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-5 py-4 border-b border-(--color-border) last:border-b-0 hover:bg-(--color-surface-strong)/55 transition-colors">
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
    <p className="md:col-span-2 text-sm text-(--color-text) hidden md:block">
      {expense.paidBy.fullName}
    </p>
    <p className="md:col-span-2 text-sm text-(--color-text-muted) flex items-center gap-1">
      <FiCalendar size={13} /> {formatDate(expense.expenseDate)}
    </p>
  </div>
));

const BalanceItem = memo(({ balance }: { balance: Balance }) => (
  <div className="flex items-center justify-between gap-4 p-3 bg-(--color-surface-strong)/70 rounded-(--btn-radius) border border-(--color-border)">
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
));

const GroupDetails = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const { user } = useAuth();
  const { groups, isLoadingGroups } = useGroup();

  const group = useMemo(
    () => groups.find((g) => g._id === groupId),
    [groups, groupId],
  );

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [balances, setBalances] = useState<Balance[]>([]);
  const [isLoadingExpenses, setIsLoadingExpenses] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [isSettleUpOpen, setIsSettleUpOpen] = useState(false);

  const fetchGroupDetails = useCallback(async () => {
    if (!groupId) return;

    setIsLoadingExpenses(true);
    setError(null);

    try {
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
    if (!group) return;
    fetchGroupDetails();
  }, [fetchGroupDetails, group]);

  const currentUserBalance = useMemo(
    () => balances.find((b) => b.user._id === user?._id),
    [balances, user?._id],
  );

  const totalSpent = useMemo(
    () => expenses.reduce((sum, expense) => sum + expense.amount, 0),
    [expenses],
  );

  const handleOpenAddExpense = useCallback(() => setIsAddExpenseOpen(true), []);
  const handleCloseAddExpense = useCallback(
    () => setIsAddExpenseOpen(false),
    [],
  );
  const handleOpenSettleUp = useCallback(() => setIsSettleUpOpen(true), []);
  const handleCloseSettleUp = useCallback(() => setIsSettleUpOpen(false), []);

  const isOverallLoading =
    isLoadingGroups || (group ? isLoadingExpenses : false);

  const renderUserSummary = () => {
    if (!currentUserBalance || currentUserBalance.balance === 0)
      return "You are settled up";
    if (currentUserBalance.balance > 0)
      return `You have ${formatINR(currentUserBalance.balance)} to receive`;
    return `You have ${formatINR(Math.abs(currentUserBalance.balance))} to pay`;
  };

  const balanceBorderClass =
    currentUserBalance?.balance && currentUserBalance.balance > 0
      ? "border-(--color-success)/40"
      : currentUserBalance?.balance && currentUserBalance.balance < 0
        ? "border-(--color-danger)/40"
        : "border-(--color-border)";

  const balanceTextClass =
    currentUserBalance?.balance && currentUserBalance.balance > 0
      ? "text-(--color-success)"
      : currentUserBalance?.balance && currentUserBalance.balance < 0
        ? "text-(--color-danger)"
        : "text-(--color-text)";

  return (
    <section className="mx-auto flex w-full max-w-10xl flex-col gap-6">
      <Link
        to="/dashboard/groups"
        className="inline-flex items-center gap-2 text-sm text-(--color-text-muted) hover:text-(--color-primary) transition-colors w-fit"
      >
        <FiArrowLeft size={16} /> Groups
      </Link>

      {isOverallLoading ? (
        <GroupDetailsSkeleton />
      ) : error ? (
        <StateMessage
          icon={<FiAlertCircle size={28} className="text-(--color-danger)" />}
          title="Failed to load group details"
          message={error}
          action={
            <button
              type="button"
              onClick={fetchGroupDetails}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-(--btn-radius) bg-(--color-primary) px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-(--color-primary-hover)"
            >
              Try Again
            </button>
          }
        />
      ) : !group ? (
        <StateMessage
          icon={<FiAlertCircle size={28} className="text-(--color-danger)" />}
          title="Group not found"
          message="It may have been deleted or you don't have access to view it."
          action={
            <Link
              to="/dashboard/groups"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-(--btn-radius) bg-(--color-primary) px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-(--color-primary-hover)"
            >
              <FiArrowLeft size={16} /> Back to Groups
            </Link>
          }
        />
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
                  onClick={handleOpenSettleUp}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-(--color-success) hover:bg-(--color-success-hover) text-white text-sm font-semibold rounded-(--btn-radius) transition-colors shadow-sm"
                >
                  <FiCheckCircle size={16} /> Settle Up
                </button>
                <button
                  type="button"
                  onClick={handleOpenAddExpense}
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
            className={`bg-(--color-surface) border rounded-(--btn-radius) p-6 shadow-sm ${balanceBorderClass}`}
          >
            <p className="text-xs font-semibold uppercase text-(--color-text-muted)">
              Your Balance
            </p>
            <p
              className={`mt-3 text-2xl font-extrabold md:text-3xl ${balanceTextClass}`}
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
                onClick={handleOpenAddExpense}
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
                <ExpenseItem key={expense._id} expense={expense} />
              ))}
            </div>
          )}

          <div className="bg-(--color-surface) border border-(--color-border) rounded-(--btn-radius) p-5 shadow-sm">
            <h2 className="text-sm font-bold text-(--color-text) uppercase mb-4">
              Group Balances
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {balances.map((balance) => (
                <BalanceItem key={balance.user._id} balance={balance} />
              ))}
            </div>
          </div>

          <AddExpenseModal
            isOpen={isAddExpenseOpen}
            onClose={handleCloseAddExpense}
            group={group}
            onCreated={fetchGroupDetails}
          />
          <SettleUpModal
            isOpen={isSettleUpOpen}
            onClose={handleCloseSettleUp}
            groupId={group._id}
            balances={balances}
            onSettled={fetchGroupDetails}
          />
        </>
      )}
    </section>
  );
};

export default memo(GroupDetails);
