import { useState } from "react";
import {
  FiInfo,
  FiX,
  FiShoppingCart,
  FiFilm,
  FiHome,
  FiCoffee,
} from "react-icons/fi";
import type { IconType } from "react-icons";

// --- Types ---
type Participant = {
  id: string;
  name: string;
  share: number;
  color?: string;
};

type Transaction = {
  id: string;
  description: string;
  icon: IconType;
  date: string;
  totalAmount: number;
  paidBy: {
    id: string;
    name: string;
    color: string;
  };
  participants: Participant[];
};

// --- Dummy Data ---
const dummyTransactions: Transaction[] = [
  {
    id: "t1",
    description: "Monthly Rent",
    icon: FiHome,
    date: "Oct 24, 2023",
    totalAmount: 1200.0,
    paidBy: { id: "u1", name: "Alice", color: "#FF6B6B" },
    participants: [
      { id: "u1", name: "Alice", share: 400.0, color: "#FF6B6B" },
      { id: "u2", name: "Bob", share: 400.0, color: "#4ECDC4" },
      { id: "u3", name: "Charlie", share: 400.0, color: "#FFD166" },
    ],
  },
  {
    id: "t2",
    description: "Groceries from Whole Foods",
    icon: FiShoppingCart,
    date: "Oct 20, 2023",
    totalAmount: 150.5,
    paidBy: { id: "u2", name: "Bob", color: "#4ECDC4" },
    participants: [
      { id: "u1", name: "Alice", share: 75.25, color: "#FF6B6B" },
      { id: "u2", name: "Bob", share: 75.25, color: "#4ECDC4" },
    ],
  },
  {
    id: "t3",
    description: "Movie Tickets (IMAX)",
    icon: FiFilm,
    date: "Oct 18, 2023",
    totalAmount: 60.0,
    paidBy: { id: "u3", name: "Charlie", color: "#FFD166" },
    participants: [
      { id: "u1", name: "Alice", share: 20.0, color: "#FF6B6B" },
      { id: "u2", name: "Bob", share: 20.0, color: "#4ECDC4" },
      { id: "u3", name: "Charlie", share: 20.0, color: "#FFD166" },
    ],
  },
  {
    id: "t4",
    description: "Coffee & Bagels",
    icon: FiCoffee,
    date: "Oct 15, 2023",
    totalAmount: 24.75,
    paidBy: { id: "u1", name: "Alice", color: "#FF6B6B" },
    participants: [
      { id: "u1", name: "Alice", share: 8.25, color: "#FF6B6B" },
      { id: "u2", name: "Bob", share: 8.25, color: "#4ECDC4" },
      { id: "u3", name: "Charlie", share: 8.25, color: "#FFD166" },
    ],
  },
];

// Helper function to format currency
const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

export default function Transactions() {
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  return (
    <div className="min-h-screen p-4 md:p-8 bg-(--color-bg) font-sans text-(--color-text)">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Transactions
          </h1>
          <button className="hidden md:flex items-center gap-2 bg-(--color-primary) hover:bg-(--color-primary-hover) text-white font-medium px-4 py-2 rounded-(--btn-radius) shadow-sm transition-colors">
            Add Transaction
          </button>
        </div>

        {/* Transactions List */}
        <div className="bg-(--color-surface) border border-(--color-border) rounded-(--btn-radius) shadow-sm divide-y divide-(--color-border) overflow-hidden">
          {dummyTransactions.map((tx) => {
            const Icon = tx.icon;
            // Calculate if the logged-in user needs to pay money.
            const myShare =
              tx.participants.find((p) => p.id === "u1")?.share || 0;
            const iNeedToPay = tx.paidBy.id !== "u1" && myShare > 0;

            return (
              <div
                key={tx.id}
                className="flex items-center justify-between p-4 hover:bg-(--color-bg) transition-colors duration-200 cursor-pointer"
                onClick={() => setSelectedTx(tx)}
              >
                {/* Left Side: Icon & Info */}
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-(--color-primary)/10 text-(--color-primary) rounded-(--btn-radius)">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-(--color-text)">
                      {tx.description}
                    </p>
                    <p className="text-sm text-(--color-text-muted)">
                      {tx.date} • Paid by {tx.paidBy.name}
                    </p>
                  </div>
                </div>

                {/* Right Side: Amounts & Info Button */}
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="font-semibold text-(--color-text)">
                      {formatCurrency(tx.totalAmount)}
                    </p>
                    {iNeedToPay ? (
                      <p className="text-sm text-(--color-danger) font-medium">
                        You have {formatCurrency(myShare)} to pay
                      </p>
                    ) : tx.paidBy.id === "u1" ? (
                      <p className="text-sm text-(--color-success) font-medium">
                        You lent {formatCurrency(tx.totalAmount - myShare)}
                      </p>
                    ) : (
                      <p className="text-sm text-(--color-text-muted)">
                        Not involved
                      </p>
                    )}
                  </div>
                  <button
                    className="p-2 text-(--color-text-muted) hover:text-(--color-primary) hover:bg-(--color-primary)/10 rounded-full transition-colors"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the row click twice
                      setSelectedTx(tx);
                    }}
                  >
                    <FiInfo size={20} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Slide-over Detail Panel */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40 transition-opacity"
            onClick={() => setSelectedTx(null)}
          ></div>

          {/* Panel Content */}
          <div
            className="relative h-full w-full max-w-md bg-(--color-surface) shadow-2xl flex flex-col"
            style={{ animation: "slideIn 0.3s ease-out forwards" }}
          >
            {/* Panel Header */}
            <div className="flex items-center justify-between p-6 border-b border-(--color-border)">
              <h2 className="text-xl font-bold">Transaction Details</h2>
              <button
                onClick={() => setSelectedTx(null)}
                className="p-2 text-(--color-text-muted) hover:text-(--color-text) hover:bg-(--color-bg) rounded-full transition-colors"
              >
                <FiX size={22} />
              </button>
            </div>

            {/* Panel Body */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {/* Main Info */}
              <div className="flex flex-col items-center text-center gap-2 pb-6 border-b border-(--color-border)">
                <div className="p-3 bg-(--color-primary)/10 text-(--color-primary) rounded-full mb-2">
                  <selectedTx.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold text-(--color-text)">
                  {selectedTx.description}
                </h3>
                <p className="text-(--color-text-muted)">{selectedTx.date}</p>
                <p className="text-3xl font-bold text-(--color-primary) mt-2">
                  {formatCurrency(selectedTx.totalAmount)}
                </p>
              </div>

              {/* Paid By Section */}
              <div>
                <h4 className="text-xs uppercase font-semibold text-(--color-text-muted) mb-3 tracking-wider">
                  Paid by
                </h4>
                <div className="flex items-center justify-between bg-(--color-bg) p-3 rounded-(--btn-radius)">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                      style={{ backgroundColor: selectedTx.paidBy.color }}
                    >
                      {selectedTx.paidBy.name[0]}
                    </div>
                    <span className="font-medium text-(--color-text)">
                      {selectedTx.paidBy.name}
                    </span>
                  </div>
                  <span className="font-bold text-(--color-text)">
                    {formatCurrency(selectedTx.totalAmount)}
                  </span>
                </div>
              </div>

              {/* Breakdown Section */}
              <div>
                <h4 className="text-xs uppercase font-semibold text-(--color-text-muted) mb-3 tracking-wider">
                  Split Breakdown
                </h4>
                <div className="flex flex-col gap-2">
                  {selectedTx.participants.map((p) => {
                    const isPayer = p.id === selectedTx.paidBy.id;
                    const payerShare = isPayer
                      ? selectedTx.totalAmount - p.share
                      : 0;

                    return (
                      <div
                        key={p.id}
                        className="flex items-center justify-between p-3 border border-(--color-border) rounded-(--btn-radius)"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                            style={{ backgroundColor: p.color }}
                          >
                            {p.name[0]}
                          </div>
                          <span className="font-medium text-(--color-text)">
                            {p.name} {isPayer && "(You)"}
                          </span>
                        </div>

                        <div className="text-right">
                          {isPayer ? (
                            <>
                              <p className="text-sm text-(--color-text-muted)">
                                Paid {formatCurrency(selectedTx.totalAmount)}
                              </p>
                              <p className="text-sm font-semibold text-(--color-success)">
                                Gets back {formatCurrency(payerShare)}
                              </p>
                            </>
                          ) : (
                            <p className="font-semibold text-(--color-danger)">
                              {formatCurrency(p.share)} to pay
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Panel Footer (Optional Actions) */}
            <div className="p-4 border-t border-(--color-border) flex gap-3">
              <button className="flex-1 py-2.5 border border-(--color-border) text-(--color-text) font-medium rounded-(--btn-radius) hover:bg-(--color-bg) transition-colors">
                Edit
              </button>
              <button className="flex-1 py-2.5 bg-(--color-danger) text-white font-medium rounded-(--btn-radius) hover:bg-(--color-danger-hover) transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
