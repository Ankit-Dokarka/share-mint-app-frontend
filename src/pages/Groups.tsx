import { useState } from "react";
import { Link } from "react-router-dom";
import { FiLoader, FiPlus, FiUsers } from "react-icons/fi";
import AddGroupModal from "../modals/AddGroupModal";
import { useGroup } from "../context/groups/GroupsContext";

export default function Groups() {
  const { groups, isLoadingGroups } = useGroup();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <>
      <section className="max-w-5xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-(--color-text)">
              Groups
            </h1>
            <p className="text-sm text-(--color-text-muted) mt-1">
              Create groups and track expenses with selected members.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-(--color-primary) hover:bg-(--color-primary-hover) text-(--color-surface) text-sm font-medium rounded-(--btn-radius) transition-colors shadow-sm"
          >
            <FiPlus size={16} />
            Create Group
          </button>
        </div>

        {isLoadingGroups ? (
          <div className="flex items-center justify-center py-24 bg-(--color-surface) border border-(--color-border) rounded-(--btn-radius)">
            <FiLoader
              className="animate-spin text-(--color-primary)"
              size={28}
            />
          </div>
        ) : groups.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20 px-6 bg-(--color-surface) border border-(--color-border) rounded-(--btn-radius) shadow-sm">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-(--color-primary)/10 mb-5">
              <FiUsers size={28} className="text-(--color-primary)" />
            </div>
            <h2 className="text-lg font-semibold text-(--color-text) mb-1.5">
              No groups created yet
            </h2>
            <button
              type="button"
              onClick={() => setIsCreateOpen(true)}
              className="mt-5 flex items-center justify-center gap-2 px-4 py-2.5 bg-(--color-primary) hover:bg-(--color-primary-hover) text-(--color-surface) text-sm font-medium rounded-(--btn-radius) transition-colors shadow-sm"
            >
              <FiPlus size={16} />
              Create Group
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {groups.map((group) => (
              <Link
                key={group._id}
                to={`/dashboard/groups/${group._id}`}
                className="bg-(--color-surface) border border-(--color-border) rounded-(--btn-radius) p-5 shadow-sm hover:shadow-md hover:border-(--color-primary)/30 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-(--btn-radius) bg-(--color-primary)/10 text-(--color-primary) flex items-center justify-center shrink-0">
                    <FiUsers size={20} />
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-semibold text-(--color-text) truncate">
                      {group.name}
                    </h2>
                    <p className="text-xs text-(--color-text-muted) mt-1">
                      {group.members.length}{" "}
                      {group.members.length === 1 ? "member" : "members"}
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
