import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FiAlertCircle,
  FiArrowRight,
  FiCreditCard,
  FiPlus,
  FiUsers,
} from "react-icons/fi";
import useAuth from "../context/auth/AuthContext";
import { useGroup } from "../context/groups/GroupsContext";

const StatCard = memo(
  ({
    icon,
    label,
    value,
    colorClass,
  }: {
    icon: React.ReactNode;
    label: string;
    value: React.ReactNode;
    colorClass: string;
  }) => (
    <div className="rounded-(--btn-radius) border border-(--color-border) bg-(--color-surface) p-5 shadow-sm">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-(--btn-radius) ${colorClass}`}
      >
        {icon}
      </div>
      <p className="mt-5 text-sm font-medium text-(--color-text-muted)">
        {label}
      </p>
      <p className="mt-1 text-3xl font-extrabold text-(--color-text)">
        {value}
      </p>
    </div>
  ),
);
StatCard.displayName = "StatCard";

const Dashboard = () => {
  const { user } = useAuth();
  const { groups, isLoadingGroups, groupsError } = useGroup();

  const uniqueMemberCount = useMemo(() => {
    return new Set(
      groups.flatMap((group) => group.members.map((member) => member._id)),
    ).size;
  }, [groups]);

  return (
    <section className="mx-auto flex w-full max-w-10xl flex-col gap-6">
      <div className="flex flex-col gap-3 rounded-(--btn-radius) border border-(--color-border) bg-(--color-surface) p-6 shadow-sm md:p-8">
        <p className="text-sm font-semibold text-(--color-primary)">
          {user?.fullName ? `Hi ${user.fullName}` : "Hello"}
        </p>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-(--color-text) md:text-4xl">
              Welcome to Sharemint
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-(--color-text-muted) md:text-base">
              Track shared expenses, review group balances, and settle what you
              have to pay or to receive with a cleaner workspace.
            </p>
          </div>
          <Link
            to="/dashboard/groups"
            className="inline-flex w-fit items-center justify-center gap-2 rounded-(--btn-radius) bg-(--color-primary) px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-(--color-primary-hover)"
          >
            Open Groups
            <FiArrowRight size={16} />
          </Link>
        </div>
      </div>

      {isLoadingGroups ? (
        <div className="flex flex-col gap-6">
          <div className="grid gap-4 md:grid-cols-3">
            {[0, 1, 2].map((item) => (
              <div
                key={item}
                className="h-36 animate-pulse rounded-(--btn-radius) border border-(--color-border) bg-(--color-surface)"
              />
            ))}
          </div>
          <div className="h-64 animate-pulse rounded-(--btn-radius) border border-(--color-border) bg-(--color-surface)" />
        </div>
      ) : groupsError ? (
        <div className="flex min-h-104 flex-col items-center justify-center rounded-(--btn-radius) border border-dashed border-(--color-danger) bg-(--color-surface) px-6 text-center shadow-sm">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-(--color-danger-soft) text-(--color-danger)">
            <FiAlertCircle size={30} />
          </div>
          <h2 className="text-xl font-bold text-(--color-text)">
            Failed to load dashboard data
          </h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-(--color-text-muted)">
            {groupsError}
          </p>
        </div>
      ) : groups.length === 0 ? (
        <div className="flex min-h-104 flex-col items-center justify-center rounded-(--btn-radius) border border-dashed border-(--color-border-strong) bg-(--color-surface) px-6 text-center shadow-sm">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-(--color-primary-soft) text-(--color-primary)">
            <FiUsers size={30} />
          </div>
          <h2 className="text-xl font-bold text-(--color-text)">
            Create your first group
          </h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-(--color-text-muted)">
            Invite members, add shared expenses, and Sharemint will keep every
            amount to pay and to receive tidy.
          </p>
          <Link
            to="/dashboard/groups"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-(--btn-radius) bg-(--color-primary) px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-(--color-primary-hover)"
          >
            <FiPlus size={16} />
            Create Group
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard
              icon={<FiUsers size={20} />}
              label="Active groups"
              value={groups.length}
              colorClass="bg-(--color-primary-soft) text-(--color-primary)"
            />
            <StatCard
              icon={<FiUsers size={20} />}
              label="Members connected"
              value={uniqueMemberCount}
              colorClass="bg-(--color-success-soft) text-(--color-success)"
            />
            <StatCard
              icon={<FiCreditCard size={20} />}
              label="Balance tracking"
              value={
                <span className="text-lg font-bold">To pay and to receive</span>
              }
              colorClass="bg-(--color-danger-soft) text-(--color-danger)"
            />
          </div>

          <div className="rounded-(--btn-radius) border border-(--color-border) bg-(--color-surface) shadow-sm">
            <div className="flex items-center justify-between border-b border-(--color-border) px-5 py-4">
              <h2 className="text-base font-bold text-(--color-text)">
                Recent groups
              </h2>
              <Link
                to="/dashboard/groups"
                className="text-sm font-semibold text-(--color-primary) hover:text-(--color-primary-hover)"
              >
                View all
              </Link>
            </div>
            <div className="divide-y divide-(--color-border)">
              {groups.slice(0, 4).map((group) => (
                <Link
                  key={group._id}
                  to={`/dashboard/groups/${group._id}`}
                  className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-(--color-surface-strong)/60"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-(--color-text)">
                      {group.name}
                    </p>
                    <p className="mt-1 text-xs text-(--color-text-muted)">
                      {group.members.length}{" "}
                      {group.members.length === 1 ? "member" : "members"}
                    </p>
                  </div>
                  <FiArrowRight
                    size={16}
                    className="shrink-0 text-(--color-text-soft)"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default memo(Dashboard);
