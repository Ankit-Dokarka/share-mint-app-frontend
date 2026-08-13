import { useState } from "react";
import { FiCreditCard, FiLock, FiShield, FiUser } from "react-icons/fi";

export default function Payments() {
  const [selectedMethod, setSelectedMethod] = useState("card");

  // State for form inputs
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");

  // Basic formatting for card number (groups of 4)
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formattedValue = value.replace(/(.{4})/g, "$1 ").trim();
    setCardNumber(formattedValue);
  };

  // Basic formatting for expiry (MM/YY)
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (value.length >= 3) {
      setExpiry(`${value.slice(0, 2)}/${value.slice(2)}`);
    } else {
      setExpiry(value);
    }
  };

  return (
    <main className="min-h-screen w-full bg-(--color-bg)  p-4 md:p-8">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 rounded-(--btn-radius) overflow-hidden shadow-lg border border-(--color-border) bg-(--color-surface)">
        {/* Left Side: Summary */}
        <div className="bg-(--color-surface-strong) p-8 md:p-10 flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-(--color-text-muted)">
              Checkout Summary
            </h2>

            <div className="mt-8 flex flex-col items-start">
              <p className="text-sm font-medium text-(--color-text-muted)">
                You are paying
              </p>
              <h1 className="mt-2 text-5xl font-extrabold tracking-tight text-(--color-text)">
                ₹1,250.00
              </h1>
            </div>

            <div className="mt-10 space-y-4">
              <div className="flex items-center justify-between border-b border-(--color-border) pb-4">
                <span className="text-sm text-(--color-text-muted)">Group</span>
                <span className="text-sm font-semibold text-(--color-text)">
                  Trip 2024
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-(--color-border) pb-4">
                <span className="text-sm text-(--color-text-muted)">
                  Expense
                </span>
                <span className="text-sm font-semibold text-(--color-text)">
                  Dinner & Drinks
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-(--color-text-muted)">
                  Pay To
                </span>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-(--color-primary-soft) text-(--color-primary)">
                    <FiUser size={16} />
                  </div>
                  <span className="text-sm font-semibold text-(--color-text)">
                    Alex Sharma
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 hidden md:flex items-center gap-2 text-xs text-(--color-text-muted)">
            <FiShield size={14} className="text-(--color-success)" />
            <span>
              Payments are secured and encrypted. We do not store your details.
            </span>
          </div>
        </div>

        {/* Right Side: Payment Methods */}
        <div className="p-8 md:p-10 flex flex-col gap-6">
          <h2 className="text-xl font-bold text-(--color-text)">
            Add Payment Method
          </h2>

          {/* Method Selection */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setSelectedMethod("card")}
              className={`flex items-center justify-center gap-2 rounded-(--btn-radius) border p-3 text-sm font-semibold transition-all ${
                selectedMethod === "card"
                  ? "border-(--color-primary) bg-(--color-primary-soft)/40 ring-2 ring-(--color-primary)/20 text-(--color-text)"
                  : "border-(--color-border) bg-(--color-surface) text-(--color-text-muted) hover:border-(--color-border-strong)"
              }`}
            >
              <FiCreditCard size={16} />
              Card
            </button>
            <button
              onClick={() => setSelectedMethod("upi")}
              className={`flex items-center justify-center gap-2 rounded-(--btn-radius) border p-3 text-sm font-semibold transition-all ${
                selectedMethod === "upi"
                  ? "border-(--color-primary) bg-(--color-primary-soft)/40 ring-2 ring-(--color-primary)/20 text-(--color-text)"
                  : "border-(--color-border) bg-(--color-surface) text-(--color-text-muted) hover:border-(--color-border-strong)"
              }`}
            >
              <span className="font-extrabold">UPI</span>
            </button>
          </div>

          {/* Dynamic Forms */}
          {selectedMethod === "card" ? (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-(--color-text)">
                  Card Number
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  className="w-full px-4 py-3 text-sm text-(--color-text) placeholder:text-(--color-text-soft) bg-(--color-surface-strong)/50 border border-(--color-border) rounded-(--btn-radius) focus:outline-none focus:ring-2 focus:ring-(--color-primary)/25 focus:border-(--color-primary) transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-(--color-text)">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className="w-full px-4 py-3 text-sm text-(--color-text) placeholder:text-(--color-text-soft) bg-(--color-surface-strong)/50 border border-(--color-border) rounded-(--btn-radius) focus:outline-none focus:ring-2 focus:ring-(--color-primary)/25 focus:border-(--color-primary) transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-(--color-text)">
                    Expiry
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="MM / YY"
                    value={expiry}
                    onChange={handleExpiryChange}
                    className="w-full px-4 py-3 text-sm text-(--color-text) placeholder:text-(--color-text-soft) bg-(--color-surface-strong)/50 border border-(--color-border) rounded-(--btn-radius) focus:outline-none focus:ring-2 focus:ring-(--color-primary)/25 focus:border-(--color-primary) transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-(--color-text)">
                    CVV
                  </label>
                  <input
                    type="password"
                    inputMode="numeric"
                    placeholder="•••"
                    maxLength={3}
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                    className="w-full px-4 py-3 text-sm text-(--color-text) placeholder:text-(--color-text-soft) bg-(--color-surface-strong)/50 border border-(--color-border) rounded-(--btn-radius) focus:outline-none focus:ring-2 focus:ring-(--color-primary)/25 focus:border-(--color-primary) transition-all"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-(--color-text)">
                  Enter UPI ID
                </label>
                <input
                  type="text"
                  placeholder="yourname@upi"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full px-4 py-3 text-sm text-(--color-text) placeholder:text-(--color-text-soft) bg-(--color-surface-strong)/50 border border-(--color-border) rounded-(--btn-radius) focus:outline-none focus:ring-2 focus:ring-(--color-primary)/25 focus:border-(--color-primary) transition-all"
                />
                <p className="text-xs text-(--color-text-muted) mt-1">
                  e.g., name@oksbi, name@ybl, name@paytm
                </p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-auto pt-6 flex flex-col gap-3">
            <button className="flex w-full items-center justify-center gap-2 rounded-(--btn-radius) bg-(--color-primary) py-3.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-(--color-primary-hover)">
              <FiLock size={16} />
              Pay ₹1,250.00 Securely
            </button>
            <div className="flex md:hidden items-center justify-center gap-2 text-xs text-(--color-text-muted)">
              <FiShield size={14} className="text-(--color-success)" />
              <span>Secured & Encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
