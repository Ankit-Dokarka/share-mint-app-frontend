import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="py-32 px-4 relative z-10">
      <div className="animate-fade-up max-w-4xl mx-auto bg-(--color-surface) border border-(--color-border) rounded-2xl p-12 md:p-20 text-center shadow-sm relative overflow-hidden">
        <div className="pointer-events-none absolute -top-20 -right-20 w-60 h-60 rounded-full bg-(--color-primary)/5 blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-(--color-primary)/5 blur-3xl"></div>

        <h2
          className="text-4xl md:text-5xl font-bold mb-4 relative z-10 tracking-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Ready to settle up?
        </h2>
        <p className="text-(--color-text-muted) mb-10 max-w-md mx-auto relative z-10 text-lg">
          Join thousands of users who manage their shared expenses without the
          headache.
        </p>
        <Link
          to="/login"
          className="relative z-10 inline-flex items-center gap-2 bg-(--color-primary) hover:bg-(--color-primary-hover) text-white font-semibold rounded-lg py-4 px-8 transition-colors shadow-lg shadow-(--color-primary)/20 text-base"
        >
          Create your first group <FiArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
