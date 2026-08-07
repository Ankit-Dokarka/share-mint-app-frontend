import { FiSun, FiMoon } from "react-icons/fi";
import useTheme from "../../context/theme/ThemeContext";
import Logo from "./Logo";
import ProfileDropdown from "./ProfileDropdown";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header className="h-16 bg-(--color-surface) border-b border-(--color-border) flex items-center justify-between px-4 md:px-6 shrink-0 z-10">
      <div className="flex items-center gap-2 md:hidden">
        <Logo className="w-9 h-9" />
        <span className="text-lg font-bold tracking-tight text-(--color-text)">
          Splitwise
        </span>
      </div>

      <div className="hidden md:block">
        <h2 className="text-lg font-semibold text-(--color-text)">
          Welcome back!
        </h2>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        {/* Smooth Theme Toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className={`relative w-12 h-6 rounded-full flex items-center transition-colors duration-300 ease-in-out ${
            isDark ? "bg-(--color-primary)" : "bg-(--color-border)"
          }`}
        >
          <span
            className={`absolute left-1 w-4 h-4 rounded-full bg-(--color-surface) shadow-md flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              isDark ? "translate-x-6" : "translate-x-0"
            }`}
          >
            {/* Crossfading Icons */}
            <FiSun
              size={10}
              className={`absolute text-amber-500 transition-opacity duration-200 ${
                isDark ? "opacity-0" : "opacity-100"
              }`}
            />
            <FiMoon
              size={10}
              className={`absolute text-(--color-primary) transition-opacity duration-200 ${
                isDark ? "opacity-100" : "opacity-0"
              }`}
            />
          </span>
        </button>

        <ProfileDropdown />
      </div>
    </header>
  );
}
