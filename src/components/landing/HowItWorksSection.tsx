import { FiCheck } from "react-icons/fi";

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-32 px-4 bg-(--color-surface) border-y border-(--color-border) relative z-10"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="animate-fade-up order-2 md:order-1">
          <span className="inline-block text-(--color-primary) font-semibold text-sm mb-3 tracking-wide uppercase">
            Effortless Setup
          </span>
          <h2
            className="text-4xl font-bold mb-6 tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            From signup to splitting in under 60 seconds.
          </h2>
          <p className="text-(--color-text-muted) mb-8 text-lg">
            Securely log in with Google, create a group, and add your first
            expense. Our intelligent backend handles the exact decimal math and
            remainders automatically.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-base text-(--color-text)">
              <FiCheck className="text-(--color-primary) shrink-0" size={20} />{" "}
              Google Authentication for secure access
            </li>
            <li className="flex items-center gap-3 text-base text-(--color-text)">
              <FiCheck className="text-(--color-primary) shrink-0" size={20} />{" "}
              Intelligent remainder distribution
            </li>
            <li className="flex items-center gap-3 text-base text-(--color-text)">
              <FiCheck className="text-(--color-primary) shrink-0" size={20} />{" "}
              Beautiful dark and light mode support
            </li>
          </ul>
        </div>
        <div className="animate-fade-up order-1 md:order-2 rounded-xl border border-(--color-border) overflow-hidden shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
            alt="App Analytics"
            className="w-full h-full object-cover aspect-square"
          />
        </div>
      </div>
    </section>
  );
}
