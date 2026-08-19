import { useState, useEffect, useCallback, memo } from "react";
import {
  FiX,
  FiSearch,
  FiLoader,
  FiUserPlus,
  FiUser,
  FiCheck,
  FiUsers,
} from "react-icons/fi";
import { useGroup } from "../context/groups/GroupsContext";
import { groupsAPI } from "../api/groups/api";
import type { User } from "../types/groups";
import { useDebounce } from "../hooks/useDebounce";

type AddGroupModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SearchEmptyState = memo(({ message }: { message: string }) => (
  <div className="flex items-center justify-center text-(--color-text-muted) text-sm py-8">
    <p>{message}</p>
  </div>
));

const SelectedMemberChip = memo(
  ({ member, onRemove }: { member: User; onRemove: (id: string) => void }) => (
    <div className="flex items-center gap-1.5 pl-1.5 pr-2 py-1 bg-(--color-primary-soft) text-(--color-primary) text-xs font-semibold rounded-full border border-(--color-primary)/20">
      <div className="w-5 h-5 rounded-full bg-(--color-primary) text-white flex items-center justify-center text-[10px]">
        {member.fullName?.[0]?.toUpperCase()}
      </div>
      {member.fullName}
      <button
        onClick={() => onRemove(member._id)}
        className="hover:text-(--color-danger)"
      >
        <FiX size={12} />
      </button>
    </div>
  ),
);

const SearchResultItem = memo(
  ({
    user,
    isSelected,
    onToggle,
  }: {
    user: User;
    isSelected: boolean;
    onToggle: (user: User) => void;
  }) => (
    <div
      className={`w-full flex items-center justify-between p-2.5 border rounded-(--btn-radius) transition-colors ${
        isSelected
          ? "bg-(--color-primary-soft) border-(--color-primary)/30"
          : "bg-(--color-surface-strong)/70 border-(--color-border) hover:border-(--color-primary)/30"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-(--color-primary)/10 text-(--color-primary) font-medium text-sm overflow-hidden">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.fullName}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            user.fullName?.[0]?.toUpperCase() || <FiUser />
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-(--color-text)">
            {user.fullName}
          </p>
          <p className="text-xs text-(--color-text-muted)">{user.email}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => onToggle(user)}
        className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-(--btn-radius) transition-colors ${
          isSelected
            ? "text-(--color-success) bg-(--color-success-soft) hover:bg-(--color-success-soft)"
            : "text-white bg-(--color-primary) hover:bg-(--color-primary-hover)"
        }`}
      >
        {isSelected ? (
          <>
            <FiCheck size={14} /> Added
          </>
        ) : (
          <>
            <FiUserPlus size={14} /> Add
          </>
        )}
      </button>
    </div>
  ),
);

const AddGroupModal = ({ isOpen, onClose }: AddGroupModalProps) => {
  const { createGroup, isCreatingGroup } = useGroup();

  const [groupName, setGroupName] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [selectedMembers, setSelectedMembers] = useState<User[]>([]);

  useEffect(() => {
    if (!isOpen) return;

    const trimmedQuery = debouncedQuery.trim();
    if (!trimmedQuery) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    let cancelled = false;
    setIsSearching(true);
    setApiError(null);

    groupsAPI
      .searchMembers(trimmedQuery)
      .then((users) => {
        if (!cancelled) setSearchResults(users);
      })
      .catch((error) => {
        if (!cancelled) {
          setSearchResults([]);
          setApiError(
            error instanceof Error ? error.message : "Failed to search users",
          );
        }
      })
      .finally(() => {
        if (!cancelled) setIsSearching(false);
      });

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery, isOpen]);

  const toggleMember = useCallback((user: User) => {
    setSelectedMembers((prev) => {
      const isSelected = prev.some((m) => m._id === user._id);
      return isSelected
        ? prev.filter((m) => m._id !== user._id)
        : [...prev, user];
    });
  }, []);

  const removeMember = useCallback((id: string) => {
    setSelectedMembers((prev) => prev.filter((m) => m._id !== id));
  }, []);

  const handleClose = useCallback(() => {
    setGroupName("");
    setQuery("");
    setSearchResults([]);
    setApiError(null);
    setSelectedMembers([]);
    setValidationError(null);
    onClose();
  }, [onClose]);

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setValidationError(null);

      if (groupName.trim().length < 4) {
        setValidationError("Group name must be greater than 3 characters");
        return;
      }
      if (selectedMembers.length === 0) {
        setValidationError("Please add at least one member");
        return;
      }

      try {
        await createGroup({
          name: groupName.trim(),
          members: selectedMembers.map((m) => m._id),
        });
        handleClose();
      } catch (error) {
        setApiError(
          error instanceof Error ? error.message : "Failed to create group",
        );
      }
    },
    [groupName, selectedMembers, createGroup, handleClose],
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
      ></div>

      <div className="relative z-10 w-full max-w-xl bg-(--color-surface) rounded-(--btn-radius) shadow-lg border border-(--color-border) overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-5 border-b border-(--color-border) shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-(--color-primary-soft) text-(--color-primary) rounded-(--btn-radius)">
              <FiUsers size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-(--color-text)">
                Create Group
              </h3>
              <p className="text-xs text-(--color-text-muted)">
                Add people now or invite them later.
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-(--color-text-muted) hover:text-(--color-text) p-1 rounded-(--btn-radius) hover:bg-(--color-bg)"
          >
            <FiX size={18} />
          </button>
        </div>

        <form
          onSubmit={onSubmit}
          className="p-5 flex flex-col gap-4 overflow-y-auto"
        >
          <div>
            <label className="block text-sm font-semibold text-(--color-text) mb-1.5">
              Group Name <span className="text-(--color-danger)">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Apartment 4B"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full px-4 py-3 text-sm text-(--color-text) placeholder:text-(--color-text-soft) bg-(--color-surface-strong)/70 border border-(--color-border) rounded-(--btn-radius) focus:outline-none focus:ring-2 focus:ring-(--color-primary)/25 focus:border-(--color-primary) transition-all"
            />
          </div>

          {validationError && (
            <p className="mt-1.5 text-xs text-(--color-danger)">
              {validationError}
            </p>
          )}

          {apiError && (
            <div className="text-sm text-(--color-danger) bg-(--color-danger)/10 border border-(--color-danger)/30 rounded-(--btn-radius) px-3 py-2">
              {apiError}
            </div>
          )}

          {selectedMembers.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedMembers.map((m) => (
                <SelectedMemberChip
                  key={m._id}
                  member={m}
                  onRemove={removeMember}
                />
              ))}
            </div>
          )}

          <div className="border-t border-(--color-border) pt-4">
            <h4 className="text-sm font-semibold text-(--color-text) mb-3">
              Search members
            </h4>

            <div className="relative mb-3">
              <FiSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-(--color-text-muted)"
                size={16}
              />
              <input
                type="text"
                placeholder="Search name or email..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-sm text-(--color-text) placeholder:text-(--color-text-soft) bg-(--color-surface-strong)/70 border border-(--color-border) rounded-(--btn-radius) focus:outline-none focus:ring-2 focus:ring-(--color-primary)/25 focus:border-(--color-primary) transition-all"
              />
            </div>

            <div className="min-h-32 max-h-56 overflow-y-auto flex flex-col gap-2 pr-1">
              {isSearching && (
                <div className="flex items-center justify-center gap-2 text-(--color-text-muted) text-sm py-8">
                  <FiLoader className="animate-spin" size={18} />
                  Searching users...
                </div>
              )}

              {!isSearching && query.trim().length === 0 && (
                <SearchEmptyState message="Type a name or email to search." />
              )}

              {!isSearching &&
                query.trim().length > 0 &&
                searchResults.length === 0 && (
                  <SearchEmptyState message="No users found." />
                )}

              {!isSearching &&
                searchResults.map((user) => (
                  <SearchResultItem
                    key={user._id}
                    user={user}
                    isSelected={selectedMembers.some((m) => m._id === user._id)}
                    onToggle={toggleMember}
                  />
                ))}
            </div>
          </div>
        </form>

        <div className="flex justify-end gap-3 p-5 bg-(--color-surface-strong)/50 border-t border-(--color-border) shrink-0">
          <button
            type="button"
            onClick={handleClose}
            disabled={isCreatingGroup}
            className="px-4 py-2.5 text-sm font-semibold text-(--color-text) bg-(--color-surface) border border-(--color-border) rounded-(--btn-radius) hover:bg-(--color-surface-strong) transition-colors shadow-sm disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={onSubmit}
            disabled={isCreatingGroup}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-(--color-primary) hover:bg-(--color-primary-hover) rounded-(--btn-radius) transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCreatingGroup ? (
              <>
                <FiLoader className="animate-spin" size={14} /> Creating...
              </>
            ) : (
              "Create Group"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(AddGroupModal);
