import { memo } from "react";
import { FiSearch, FiBell, FiSettings, FiSun, FiMoon } from "react-icons/fi";
import useTheme from "../../context/theme/ThemeContext";

const IconButton = memo(
  ({ label, children }: { label: string; children: React.ReactNode }) => (
    <button
      aria-label={label}
      title={label}
      className="h-9 w-9 flex items-center justify-center rounded-(--btn-radius) text-(--color-text-muted) hover:bg-(--color-surface-strong) hover:text-(--color-text) transition-colors"
    >
      {children}
    </button>
  ),
);

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header className="h-16 bg-(--color-surface) border-b border-(--color-border) flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 shrink-0 z-10">
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 h-9 w-48 md:w-64 px-3 rounded-(--btn-radius) bg-(--color-surface-strong) border border-(--color-border) text-(--color-text-soft) cursor-pointer transition-colors hover:border-(--color-border-strong)">
          <FiSearch size={16} />
          {/* Visual placeholder for search text */}
          <div className="h-3 w-24 bg-(--color-border) rounded-sm opacity-70"></div>
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <IconButton label="Notifications">
          <FiBell size={18} />
        </IconButton>
        <IconButton label="Settings">
          <FiSettings size={18} />
        </IconButton>

        <div className="w-px h-6 bg-(--color-border) mx-1 sm:mx-2"></div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          className="relative h-8 w-13 rounded-full bg-(--color-surface-strong) border border-(--color-border) flex items-center transition-colors duration-300"
        >
          <FiSun
            size={14}
            className="absolute left-2 text-amber-500/80 pointer-events-none"
          />
          <FiMoon
            size={14}
            className="absolute right-2 text-(--color-primary)/80 pointer-events-none"
          />

          <span
            className={`absolute left-1 h-6 w-6 rounded-full bg-(--color-elevated) shadow-sm flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              isDark ? "translate-x-5" : "translate-x-0"
            }`}
          >
            {isDark ? (
              <FiMoon size={12} className="text-(--color-primary)" />
            ) : (
              <FiSun size={12} className="text-amber-500" />
            )}
          </span>
        </button>
      </div>
    </header>
  );
};

export default memo(Header);
