import { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiLoader, FiPlus, FiUsers } from "react-icons/fi";
import AddGroupModal from "../modals/AddGroupModal";
import { useGroup } from "../context/groups/GroupsContext";

export default function Groups() {
  const { groups, isLoadingGroups } = useGroup();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <>
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-(--color-text)">
              Groups
            </h1>
            <p className="text-sm text-(--color-text-muted) mt-2">
              Create shared spaces and track every amount to pay or to receive.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-(--color-primary) hover:bg-(--color-primary-hover) text-white text-sm font-semibold rounded-(--btn-radius) transition-colors shadow-sm"
          >
            <FiPlus size={16} /> Create Group
          </button>
        </div>

        {isLoadingGroups ? (
          <div className="flex items-center justify-center py-24 bg-(--color-surface) border border-(--color-border) rounded-(--btn-radius) shadow-sm">
            <FiLoader
              className="animate-spin text-(--color-primary)"
              size={28}
            />
          </div>
        ) : groups.length === 0 ? (
          <div className="flex min-h-120 flex-col items-center justify-center text-center py-20 px-6 bg-(--color-surface) border border-dashed border-(--color-border-strong) rounded-(--btn-radius) shadow-sm">
            <div className="w-18 h-18 flex items-center justify-center rounded-full bg-(--color-primary-soft) mb-5">
              <FiUsers size={28} className="text-(--color-primary)" />
            </div>
            <h2 className="text-xl font-bold text-(--color-text) mb-2">
              No groups created yet
            </h2>
            <p className="max-w-md text-sm leading-6 text-(--color-text-muted)">
              Start with a home, trip, team, or dinner group and keep shared
              expenses organized from the first entry.
            </p>
            <button
              type="button"
              onClick={() => setIsCreateOpen(true)}
              className="mt-6 flex items-center justify-center gap-2 px-4 py-2.5 bg-(--color-primary) hover:bg-(--color-primary-hover) text-white text-sm font-semibold rounded-(--btn-radius) transition-colors shadow-sm"
            >
              <FiPlus size={16} /> Create Group
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {groups.map((group) => (
              <Link
                key={group._id}
                to={`/dashboard/groups/${group._id}`}
                className="group bg-(--color-surface) border border-(--color-border) rounded-(--btn-radius) p-5 shadow-sm hover:shadow-md hover:border-(--color-primary)/40 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="w-11 h-11 rounded-(--btn-radius) bg-(--color-primary-soft) text-(--color-primary) flex items-center justify-center shrink-0">
                    <FiUsers size={20} />
                  </div>
                  <FiArrowRight
                    size={18}
                    className="text-(--color-text-soft) transition-transform group-hover:translate-x-1 group-hover:text-(--color-primary)"
                  />
                </div>

                <div className="mt-5">
                  <h2 className="truncate text-lg font-bold text-(--color-text)">
                    {group.name}
                  </h2>
                  <p className="mt-1 text-xs text-(--color-text-muted)">
                    {group.members.length}{" "}
                    {group.members.length === 1 ? "member" : "members"}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between gap-4">
                  <div className="flex -space-x-2">
                    {group.members.slice(0, 4).map((member) => (
                      <div
                        key={member._id}
                        className="h-8 w-8 rounded-full border-2 border-(--color-surface) bg-(--color-surface-strong) text-[11px] font-bold text-(--color-text-muted) flex items-center justify-center overflow-hidden"
                        title={member.fullName}
                      >
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
                    ))}
                    {group.members.length > 4 && (
                      <div className="h-8 w-8 rounded-full border-2 border-(--color-surface) bg-(--color-text) text-[11px] font-bold text-(--color-bg) flex items-center justify-center">
                        +{group.members.length - 4}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 text-right">
                    <p className="text-[11px] font-semibold uppercase text-(--color-text-soft)">
                      Balances
                    </p>
                    <p className="mt-1 truncate text-sm font-bold text-(--color-text-muted)">
                      View details
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <AddGroupModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </>
  );
}
