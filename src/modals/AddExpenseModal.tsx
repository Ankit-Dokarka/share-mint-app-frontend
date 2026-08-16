import { useEffect, useCallback, memo, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  FiAlertCircle,
  FiCheck,
  FiCreditCard,
  FiLoader,
  FiX,
} from "react-icons/fi";
import { expenseAPI } from "../api/expense/api";
import type { Group, User } from "../types/groups";

type AddExpenseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  group: Group;
  onCreated: () => Promise<void> | void;
};

type ExpenseFormValues = {
  title: string;
  description?: string;
  amount: string;
  expenseDate: string;
  paidBy: string;
  participants: string[];
};

const formatExpenseDate = (htmlDate: string): string => {
  if (!htmlDate) return "";
  const date = new Date(htmlDate);
  if (isNaN(date.getTime())) return "";

  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;

  return `${day} ${month} ${year}, ${hours}:${minutes} ${ampm}`;
};

const getDefaultDateTime = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
};

// 2. Extracted & Memoized Participant Item
const ParticipantItem = memo(
  ({
    member,
    isChecked,
    isTwoPersonGroup,
    isSubmitting,
    onToggle,
  }: {
    member: User;
    isChecked: boolean;
    isTwoPersonGroup: boolean;
    isSubmitting: boolean;
    onToggle: (id: string) => void;
  }) => (
    <label
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
        checked={isChecked || false}
        disabled={isTwoPersonGroup || isSubmitting}
        onChange={() => onToggle(member._id)}
        className="sr-only"
      />
    </label>
  ),
);
ParticipantItem.displayName = "ParticipantItem";

const AddExpenseModal = ({
  isOpen,
  onClose,
  group,
  onCreated,
}: AddExpenseModalProps) => {
  const members = useMemo(() => group.members ?? [], [group.members]);
  const isTwoPersonGroup = members.length === 2;

  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ExpenseFormValues>({
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      amount: "",
      expenseDate: getDefaultDateTime(),
      paidBy: members[0]?._id ?? "",
      participants: members.map((m) => m._id),
    },
  });

  const selectedParticipants = watch("participants");

  useEffect(() => {
    if (isOpen) {
      const defaultParticipantIds = members.map((m) => m._id);
      reset({
        title: "",
        description: "",
        amount: "",
        expenseDate: getDefaultDateTime(),
        paidBy: defaultParticipantIds[0] ?? "",
        participants: defaultParticipantIds,
      });
      setApiError(null);
    }
  }, [isOpen, members, reset]);

  const toggleParticipant = useCallback(
    (userId: string) => {
      if (isTwoPersonGroup) return;

      const current = selectedParticipants || [];
      const updated = current.includes(userId)
        ? current.filter((id) => id !== userId)
        : [...current, userId];

      setValue("participants", updated, { shouldValidate: true });
    },
    [isTwoPersonGroup, selectedParticipants, setValue],
  );

  const handleClose = useCallback(() => {
    if (!isSubmitting) onClose();
  }, [isSubmitting, onClose]);

  const onSubmit = useCallback(
    async (data: ExpenseFormValues) => {
      setApiError(null);
      try {
        const participantsPayload = data.participants.map((id) => ({
          user: id,
        }));
        await expenseAPI.createExpense({
          title: data.title.trim(),
          description: data.description?.trim() || "",
          amount: Number(data.amount),
          groupId: group._id,
          paidBy: data.paidBy,
          splitType: "equal",
          participants: participantsPayload,
          expenseDate: formatExpenseDate(data.expenseDate),
        });
        await onCreated();
        onClose();
      } catch (error) {
        setApiError(
          error instanceof Error ? error.message : "Failed to add expense",
        );
      }
    },
    [group._id, onCreated, onClose],
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
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
            onClick={handleClose}
            className="text-(--color-text-muted) hover:text-(--color-text) transition-colors p-1 rounded-(--btn-radius) hover:bg-(--color-bg)"
            aria-label="Close"
            disabled={isSubmitting}
          >
            <FiX size={18} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col overflow-y-auto"
        >
          <div className="p-5 flex flex-col gap-4">
            {apiError && (
              <div className="flex items-center gap-2 text-sm text-(--color-danger) bg-(--color-danger)/10 p-3 rounded-(--btn-radius) border border-(--color-danger)/30">
                <FiAlertCircle size={16} className="shrink-0" />
                <p>{apiError}</p>
              </div>
            )}

            {/* Title */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-(--color-text)">
                Title <span className="text-(--color-danger)">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Dinner"
                disabled={isSubmitting}
                {...register("title", { required: "Title is required" })}
                className="w-full px-4 py-3 text-sm text-(--color-text) placeholder:text-(--color-text-soft) bg-(--color-surface-strong)/70 border border-(--color-border) rounded-(--btn-radius) focus:outline-none focus:ring-2 focus:ring-(--color-primary)/25 focus:border-(--color-primary) transition-all disabled:opacity-70"
              />
              {errors.title && (
                <p className="text-xs text-(--color-danger)">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-(--color-text)">
                Description
              </label>
              <input
                type="text"
                placeholder="Optional notes"
                disabled={isSubmitting}
                {...register("description")}
                className="w-full px-4 py-3 text-sm text-(--color-text) placeholder:text-(--color-text-soft) bg-(--color-surface-strong)/70 border border-(--color-border) rounded-(--btn-radius) focus:outline-none focus:ring-2 focus:ring-(--color-primary)/25 focus:border-(--color-primary) transition-all disabled:opacity-70"
              />
            </div>

            {/* Amount & Date Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-(--color-text)">
                  Amount <span className="text-(--color-danger)">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-(--color-text-muted) text-sm">
                    ₹
                  </span>
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="0.00"
                    disabled={isSubmitting}
                    {...register("amount", {
                      required: "Amount is required",
                      validate: (val) => {
                        const num = Number(val);
                        return (
                          (!isNaN(num) && num > 0) || "Enter a valid amount"
                        );
                      },
                    })}
                    className="w-full pl-8 pr-4 py-3 text-sm text-(--color-text) placeholder:text-(--color-text-soft) bg-(--color-surface-strong)/70 border border-(--color-border) rounded-(--btn-radius) focus:outline-none focus:ring-2 focus:ring-(--color-primary)/25 focus:border-(--color-primary) transition-all disabled:opacity-70"
                  />
                </div>
                {errors.amount && (
                  <p className="text-xs text-(--color-danger)">
                    {errors.amount.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-(--color-text)">
                  Date & Time <span className="text-(--color-danger)">*</span>
                </label>
                <input
                  type="datetime-local"
                  disabled={isSubmitting}
                  {...register("expenseDate", {
                    required: "Date and time are required",
                  })}
                  className="w-full px-4 py-3 text-sm text-(--color-text) placeholder:text-(--color-text-soft) bg-(--color-surface-strong)/70 border border-(--color-border) rounded-(--btn-radius) focus:outline-none focus:ring-2 focus:ring-(--color-primary)/25 focus:border-(--color-primary) transition-all disabled:opacity-70"
                />
                {errors.expenseDate && (
                  <p className="text-xs text-(--color-danger)">
                    {errors.expenseDate.message}
                  </p>
                )}
              </div>
            </div>

            {/* Paid By */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-(--color-text)">
                Paid By <span className="text-(--color-danger)">*</span>
              </label>
              <select
                disabled={isSubmitting}
                {...register("paidBy", { required: "Select who paid" })}
                className="w-full px-4 py-3 text-sm text-(--color-text) bg-(--color-surface-strong)/70 border border-(--color-border) rounded-(--btn-radius) focus:outline-none focus:ring-2 focus:ring-(--color-primary)/25 focus:border-(--color-primary) transition-all disabled:opacity-70"
              >
                {members.map((member) => (
                  <option key={member._id} value={member._id}>
                    {member.fullName}
                  </option>
                ))}
              </select>
              {errors.paidBy && (
                <p className="text-xs text-(--color-danger)">
                  {errors.paidBy.message}
                </p>
              )}
            </div>

            {/* Split Rule */}
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

            {/* Participants */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-(--color-text)">
                Participants <span className="text-(--color-danger)">*</span>
              </label>
              <div className="max-h-56 overflow-y-auto grid gap-2 border border-(--color-border) rounded-(--btn-radius) p-2 bg-(--color-surface-strong)/70">
                {members.map((member) => (
                  <ParticipantItem
                    key={member._id}
                    member={member}
                    isChecked={
                      selectedParticipants?.includes(member._id) || false
                    }
                    isTwoPersonGroup={isTwoPersonGroup}
                    isSubmitting={isSubmitting}
                    onToggle={toggleParticipant}
                  />
                ))}
              </div>
              {errors.participants && (
                <p className="text-xs text-(--color-danger)">
                  {errors.participants.message}
                </p>
              )}
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 p-5 bg-(--color-surface-strong)/50 border-t border-(--color-border) shrink-0">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="px-4 py-2.5 text-sm font-semibold text-(--color-text) bg-(--color-surface) border border-(--color-border) rounded-(--btn-radius) hover:bg-(--color-surface-strong) transition-colors shadow-sm disabled:opacity-70"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-(--color-primary) hover:bg-(--color-primary-hover) rounded-(--btn-radius) transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <FiLoader className="animate-spin" size={14} /> Adding...
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
};

export default memo(AddExpenseModal);
