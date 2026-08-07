import { useEffect, useMemo, useState } from "react";
import { FiAlertCircle, FiCheck, FiCreditCard, FiLoader, FiX } from "react-icons/fi";
import { expenseAPI } from "../api/expense/api";
import type { Group } from "../types/groups";

type AddExpenseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  group: Group;
  onCreated: () => Promise<void> | void;
};

export default function AddExpenseModal({
  isOpen,
  onClose,
  group,
  onCreated,
}: AddExpenseModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [participantIds, setParticipantIds] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const members = useMemo(() => group.members ?? [], [group.members]);
  const isTwoPersonGroup = members.length === 2;

  useEffect(() => {
    if (!isOpen) return;

    const defaultParticipantIds = members.map((member) => member._id);
    void Promise.resolve().then(() => {
      setTitle("");
      setDescription("");
      setAmount("");
      setPaidBy(defaultParticipantIds[0] ?? "");
      setParticipantIds(defaultParticipantIds);
      setErrors({});
      setApiError(null);
      setIsSubmitting(false);
    });
  }, [isOpen, members]);

  if (!isOpen) return null;

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!title.trim()) nextErrors.title = "Title is required";
    if (!amount || Number.isNaN(Number(amount)) || Number(amount) <= 0) {
      nextErrors.amount = "Enter a valid amount";
    }
    if (!paidBy) nextErrors.paidBy = "Select who paid";
    if (participantIds.length === 0) {
      nextErrors.participants = "Select at least one participant";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const toggleParticipant = (userId: string) => {
    if (isTwoPersonGroup) return;

    setParticipantIds((current) =>
      current.includes(userId)
        ? current.filter((id) => id !== userId)
        : [...current, userId],
    );
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setApiError(null);

    try {
      await expenseAPI.createExpense({
        title: title.trim(),
        description: description.trim(),
        amount: Number(amount),
        groupId: group._id,
        paidBy,
        participantIds,
      });
      await onCreated();
      onClose();
    } catch (error) {
      setApiError(
        error instanceof Error ? error.message : "Failed to add expense",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={isSubmitting ? undefined : onClose}
      ></div>

      <div className="relative z-10 w-full max-w-xl bg-(--color-surface) rounded-(--btn-radius) shadow-lg border border-(--color-border) overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-(--color-border) shrink-0">
          <div className="flex items-center gap-3">
            <div className="rounded-(--btn-radius) bg-(--color-primary-soft) p-2 text-(--color-primary)">
              <FiCreditCard size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-(--color-text)">
                Add Expense
              </h3>
              <p className="text-xs text-(--color-text-muted)">
                Split evenly across selected participants.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-(--color-text-muted) hover:text-(--color-text) transition-colors p-1 rounded-(--btn-radius) hover:bg-(--color-bg)"
            aria-label="Close"
            disabled={isSubmitting}
          >
            <FiX size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col overflow-y-auto">
          <div className="p-5 flex flex-col gap-4">
            {apiError && (
              <div className="flex items-center gap-2 text-sm text-(--color-danger) bg-(--color-danger)/10 p-3 rounded-(--btn-radius) border border-(--color-danger)/30">
                <FiAlertCircle size={16} className="shrink-0" />
                <p>{apiError}</p>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-(--color-text)">
                Title <span className="text-(--color-danger)">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Dinner"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                disabled={isSubmitting}
                className="w-full px-4 py-3 text-sm text-(--color-text) placeholder:text-(--color-text-soft) bg-(--color-surface-strong)/70 border border-(--color-border) rounded-(--btn-radius) focus:outline-none focus:ring-2 focus:ring-(--color-primary)/25 focus:border-(--color-primary) transition-all disabled:opacity-70"
              />
              {errors.title && (
                <p className="text-xs text-(--color-danger)">{errors.title}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-(--color-text)">
                Description
              </label>
              <input
                type="text"
                placeholder="Optional notes"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                disabled={isSubmitting}
                className="w-full px-4 py-3 text-sm text-(--color-text) placeholder:text-(--color-text-soft) bg-(--color-surface-strong)/70 border border-(--color-border) rounded-(--btn-radius) focus:outline-none focus:ring-2 focus:ring-(--color-primary)/25 focus:border-(--color-primary) transition-all disabled:opacity-70"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-(--color-text)">
                Amount <span className="text-(--color-danger)">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-(--color-text-muted) text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  disabled={isSubmitting}
                  className="w-full pl-8 pr-4 py-3 text-sm text-(--color-text) placeholder:text-(--color-text-soft) bg-(--color-surface-strong)/70 border border-(--color-border) rounded-(--btn-radius) focus:outline-none focus:ring-2 focus:ring-(--color-primary)/25 focus:border-(--color-primary) transition-all disabled:opacity-70"
                />
              </div>
              {errors.amount && (
                <p className="text-xs text-(--color-danger)">{errors.amount}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-(--color-text)">
                Paid By <span className="text-(--color-danger)">*</span>
              </label>
              <select
                value={paidBy}
                onChange={(event) => setPaidBy(event.target.value)}
                disabled={isSubmitting}
                className="w-full px-4 py-3 text-sm text-(--color-text) bg-(--color-surface-strong)/70 border border-(--color-border) rounded-(--btn-radius) focus:outline-none focus:ring-2 focus:ring-(--color-primary)/25 focus:border-(--color-primary) transition-all disabled:opacity-70"
              >
                {members.map((member) => (
                  <option key={member._id} value={member._id}>
                    {member.fullName}
                  </option>
                ))}
              </select>
              {errors.paidBy && (
                <p className="text-xs text-(--color-danger)">{errors.paidBy}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-(--color-text)">
                Split Rule
              </label>
              <input
                type="text"
                value="Equal"
                disabled
                className="w-full px-4 py-3 text-sm bg-(--color-surface-strong)/70 border border-(--color-border) rounded-(--btn-radius) text-(--color-text-muted)"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-(--color-text)">
                Participants <span className="text-(--color-danger)">*</span>
              </label>
              <div className="max-h-56 overflow-y-auto grid gap-2 border border-(--color-border) rounded-(--btn-radius) p-2 bg-(--color-surface-strong)/70">
                {members.map((member) => {
                  const isChecked = participantIds.includes(member._id);

                  return (
                    <label
                      key={member._id}
                      className={`flex items-center justify-between gap-3 p-3 rounded-(--btn-radius) border transition-colors ${
                        isChecked
                          ? "bg-(--color-primary-soft) border-(--color-primary)/25"
                          : "border-(--color-border) bg-(--color-surface) hover:border-(--color-primary)/30"
                      } ${isTwoPersonGroup ? "cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-(--color-primary-soft) text-(--color-primary) text-sm font-bold flex items-center justify-center overflow-hidden">
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
                        <span className="truncate text-sm font-medium text-(--color-text)">
                          {member.fullName}
                        </span>
                      </div>
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                          isChecked
                            ? "border-(--color-primary) bg-(--color-primary) text-white"
                            : "border-(--color-border-strong) bg-(--color-surface)"
                        }`}
                      >
                        {isChecked && <FiCheck size={13} />}
                      </span>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        disabled={isTwoPersonGroup || isSubmitting}
                        onChange={() => toggleParticipant(member._id)}
                        className="sr-only"
                      />
                    </label>
                  );
                })}
              </div>
              {errors.participants && (
                <p className="text-xs text-(--color-danger)">
                  {errors.participants}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 p-5 bg-(--color-surface-strong)/50 border-t border-(--color-border) shrink-0">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2.5 text-sm font-semibold text-(--color-text) bg-(--color-surface) border border-(--color-border) rounded-(--btn-radius) hover:bg-(--color-surface-strong) transition-colors shadow-sm disabled:opacity-70"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-(--color-primary) hover:bg-(--color-primary-hover) rounded-(--btn-radius) transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <FiLoader className="animate-spin" size={14} />
                  Adding...
                </>
              ) : (
                "Add Expense"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
