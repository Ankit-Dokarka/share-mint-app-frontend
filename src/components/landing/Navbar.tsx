import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-3xl">
      <div className="flex items-center justify-between bg-(--color-surface)/80 backdrop-blur-xl border border-(--color-border)/50 shadow-2xl rounded-full px-3 py-2 pl-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-(--color-primary) flex items-center justify-center text-white font-bold text-sm">
            S
          </div>
          <span
            className="font-bold text-(--color-text) hidden sm:block"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Sharemint
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-(--color-text-muted)">
          <a
            href="#features"
            className="hover:text-(--color-text) transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="hover:text-(--color-text) transition-colors"
          >
            How it works
          </a>
          <a
            href="#pricing"
            className="hover:text-(--color-text) transition-colors"
          >
            Pricing
          </a>
        </div>

        <Link
          to="/login"
          className="flex items-center gap-2 bg-(--color-primary) hover:bg-(--color-primary-hover) text-white text-sm font-semibold rounded-full py-2 px-4 transition-colors"
        >
          Open App <FiArrowRight size={14} />
        </Link>
      </div>
    </nav>
  );
}
