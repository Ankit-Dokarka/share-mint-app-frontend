import { FiSun, FiMoon } from "react-icons/fi";
import useTheme from "../../context/theme/ThemeContext";
import Logo from "./Logo";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header className="h-16 bg-(--color-surface)/95 border-b border-(--color-border) flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 shrink-0 z-10">
      <div className="flex items-center gap-3">
        <Logo className="w-9 h-9" />
        <span className="text-lg font-extrabold text-(--color-text)">
          Sharemint
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          className={`relative h-9 w-16 rounded-full border flex items-center transition-colors duration-300 ease-in-out ${
            isDark
              ? "bg-(--color-surface-strong) border-(--color-border-strong)"
              : "bg-(--color-surface-strong) border-(--color-border)"
          }`}
        >
          <span
            className={`absolute left-1.5 w-7 h-7 rounded-full bg-(--color-elevated) shadow-sm border border-(--color-border) flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              isDark ? "translate-x-7" : "translate-x-0"
            }`}
          >
            <FiSun
              size={14}
              className={`absolute text-amber-500 transition-opacity duration-200 ${
                isDark ? "opacity-0" : "opacity-100"
              }`}
            />
            <FiMoon
              size={14}
              className={`absolute text-(--color-primary) transition-opacity duration-200 ${
                isDark ? "opacity-100" : "opacity-0"
              }`}
            />
          </span>
        </button>
      </div>
    </header>
  );
}
