import { FiUsers, FiPieChart, FiUserPlus } from "react-icons/fi";

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-32 px-4 max-w-6xl mx-auto relative z-10"
    >
      <div className="text-center mb-20">
        <h2
          className="animate-fade-up text-4xl md:text-5xl font-bold mb-4 tracking-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Everything you need to manage group finances
        </h2>
        <p className="animate-fade-up text-lg text-(--color-text-muted) max-w-xl mx-auto">
          From one-on-one trips to large household expenses, Sharemint handles
          the math so you don't have to.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="animate-fade-up bg-(--color-surface) border border-(--color-border) rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow hover:border-(--color-border-strong)">
          <div className="w-12 h-12 rounded-lg bg-(--color-primary-soft) flex items-center justify-center mb-5">
            <FiUsers className="text-(--color-primary)" size={24} />
          </div>
          <h3
            className="text-xl font-semibold mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Smart Groups
          </h3>
          <p className="text-sm text-(--color-text-muted) leading-relaxed">
            Create one-to-one or one-to-many groups. Add members easily by
            searching their email and start tracking immediately.
          </p>
        </div>

        <div className="animate-fade-up bg-(--color-surface) border border-(--color-border) rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow hover:border-(--color-border-strong)">
          <div className="w-12 h-12 rounded-lg bg-(--color-primary-soft) flex items-center justify-center mb-5">
            <FiPieChart className="text-(--color-primary)" size={24} />
          </div>
          <h3
            className="text-xl font-semibold mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Accurate Balances
          </h3>
          <p className="text-sm text-(--color-text-muted) leading-relaxed">
            Always know exactly where you stand. See real-time "to pay" and "to
            receive" amounts calculated efficiently in the backend.
          </p>
        </div>

        <div className="animate-fade-up bg-(--color-surface) border border-(--color-border) rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow hover:border-(--color-border-strong)">
          <div className="w-12 h-12 rounded-lg bg-(--color-primary-soft) flex items-center justify-center mb-5">
            <FiUserPlus className="text-(--color-primary)" size={24} />
          </div>
          <h3
            className="text-xl font-semibold mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Partial Splits
          </h3>
          <p className="text-sm text-(--color-text-muted) leading-relaxed">
            Not everyone joins every dinner. Select specific participants for an
            expense, and only their balances will be affected.
          </p>
        </div>
      </div>
    </section>
  );
}
