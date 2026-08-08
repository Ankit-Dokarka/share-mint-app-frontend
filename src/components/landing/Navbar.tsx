import { FiArrowRight, FiSun, FiMoon, FiCreditCard } from "react-icons/fi";
import { Link } from "react-router-dom";
import useTheme from "../../context/theme/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl">
      <div className="flex items-center justify-between bg-(--color-surface)/80 backdrop-blur-xl border border-(--color-border) shadow-lg rounded-full pl-4 pr-3 py-2">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-(--color-primary) flex items-center justify-center text-white shadow-sm">
            <FiCreditCard size={18} />
          </div>
          <span
            className="font-bold text-(--color-text) text-base hidden sm:block"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Sharemint
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-(--color-text-muted)">
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

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="relative flex items-center bg-(--color-surface-strong) border border-(--color-border) rounded-full p-1 w-16 h-8 shrink-0 transition-colors"
          >
            <span
              className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-(--color-elevated) shadow-sm flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                isDark ? "translate-x-8" : "translate-x-0"
              }`}
            >
              {isDark ? (
                <FiMoon size={12} className="text-(--color-primary)" />
              ) : (
                <FiSun size={12} className="text-amber-500" />
              )}
            </span>

            <FiSun
              size={14}
              className={`w-1/2 flex justify-center transition-colors ${isDark ? "text-(--color-text-soft)" : "text-transparent"}`}
            />
            <FiMoon
              size={14}
              className={`w-1/2 flex justify-center transition-colors ${!isDark ? "text-(--color-text-soft)" : "text-transparent"}`}
            />
          </button>

          <Link
            to="/login"
            className="flex items-center gap-2 bg-(--color-primary) hover:bg-(--color-primary-hover) text-white text-sm font-semibold rounded-full py-2 px-4 transition-colors shadow-sm"
          >
            <span className="hidden sm:inline">Get Started</span>{" "}
            <FiArrowRight size={14} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
