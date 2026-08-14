import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiX, FiAlertCircle, FiLoader, FiCheckCircle } from "react-icons/fi";
import { settlementAPI } from "../api/settlement/api";
import type { Balance } from "../types/expence";
import useAuth from "../context/auth/AuthContext";

type SettleUpModalProps = {
  isOpen: boolean;
  onClose: () => void;
  groupId: string;
  balances: Balance[];
  onSettled: () => Promise<void> | void;
};

type SettleUpFormValues = {
  receiver: string;
  amount: string;
  note?: string;
};

export default function SettleUpModal({
  isOpen,
  onClose,
  groupId,
  balances,
  onSettled,
}: SettleUpModalProps) {
  const { user } = useAuth();
  const [apiError, setApiError] = useState<string | null>(null);

  const usersToPay = balances.filter(
    (b) => b.balance > 0 && b.user._id !== user?._id,
  );

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SettleUpFormValues>({
    mode: "onChange",
    defaultValues: {
      receiver: "",
      amount: "",
      note: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        receiver: "",
        amount: "",
        note: "",
      });
      setApiError(null);
    }
  }, [isOpen, reset]);

  if (!isOpen) return null;

  const onSubmit = async (data: SettleUpFormValues) => {
    setApiError(null);

    try {
      await settlementAPI.createSettlement({
        groupId,
        receiver: data.receiver,
        amount: Number(data.amount),
        note: data.note?.trim() || "",
      });
      await onSettled();
      onClose();
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Failed to settle up");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={isSubmitting ? undefined : onClose}
      ></div>

      <div className="relative z-10 w-full max-w-md bg-(--color-surface) rounded-(--btn-radius) shadow-lg border border-(--color-border) overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-(--color-border) shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-(--color-success-soft) text-(--color-success) rounded-(--btn-radius)">
              <FiCheckCircle size={20} />
            </div>
            <h3 className="text-lg font-bold text-(--color-text)">Settle Up</h3>
          </div>
          <button
            onClick={onClose}
            className="text-(--color-text-muted) hover:text-(--color-text) p-1 rounded-(--btn-radius) hover:bg-(--color-bg)"
            disabled={isSubmitting}
          >
            <FiX size={18} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-5 flex flex-col gap-4 overflow-y-auto"
        >
          {apiError && (
            <div className="flex items-center gap-2 text-sm text-(--color-danger) bg-(--color-danger)/10 p-3 rounded-(--btn-radius) border border-(--color-danger)/30">
              <FiAlertCircle size={16} className="shrink-0" />
              <p>{apiError}</p>
            </div>
          )}

          {usersToPay.length === 0 ? (
            <div className="text-center py-8 text-sm text-(--color-text-muted)">
              You are all settled up! You don't have to pay anyone in this
              group.
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-(--color-text)">
                  Pay To <span className="text-(--color-danger)">*</span>
                </label>
                <select
                  disabled={isSubmitting}
                  {...register("receiver", {
                    required: "Please select a user",
                    onChange: () => trigger("amount"),
                  })}
                  className="w-full px-4 py-3 text-sm text-(--color-text) bg-(--color-surface-strong)/70 border border-(--color-border) rounded-(--btn-radius) focus:outline-none focus:ring-2 focus:ring-(--color-primary)/25 focus:border-(--color-primary) transition-all disabled:opacity-70"
                >
                  <option value="">Select a member</option>
                  {usersToPay.map((b) => (
                    <option key={b.user._id} value={b.user._id}>
                      {b.user.fullName} (You have to pay{" "}
                      {formatINR(Math.abs(b.balance))})
                    </option>
                  ))}
                </select>
                {errors.receiver && (
                  <p className="text-xs text-(--color-danger)">
                    {errors.receiver.message}
                  </p>
                )}
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
                    type="text"
                    inputMode="decimal"
                    placeholder="0.00"
                    disabled={isSubmitting}
                    {...register("amount", {
                      required: "Amount is required",
                      validate: (val, formValues) => {
                        const num = Number(val);
                        if (isNaN(num) || num <= 0)
                          return "Enter a valid amount";

                        const selectedBalance = balances.find(
                          (b) => b.user._id === formValues.receiver,
                        );

                        if (selectedBalance && num > selectedBalance.balance) {
                          return "Amount cannot exceed the amount to be paid";
                        }

                        return true;
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
                  Note (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Cash, GPay, etc."
                  disabled={isSubmitting}
                  {...register("note")}
                  className="w-full px-4 py-3 text-sm text-(--color-text) placeholder:text-(--color-text-soft) bg-(--color-surface-strong)/70 border border-(--color-border) rounded-(--btn-radius) focus:outline-none focus:ring-2 focus:ring-(--color-primary)/25 focus:border-(--color-primary) transition-all disabled:opacity-70"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
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
                  disabled={!isValid || isSubmitting}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-(--color-success) hover:bg-(--color-success-hover) rounded-(--btn-radius) transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <FiLoader className="animate-spin" size={14} /> Saving...
                    </>
                  ) : (
                    "Confirm Payment"
                  )}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

const formatINR = (val: number) =>
  `₹${val.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
