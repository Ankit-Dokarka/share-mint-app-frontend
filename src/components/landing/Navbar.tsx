import { useState } from "react";
import {
  FiArrowRight,
  FiSun,
  FiMoon,
  FiCreditCard,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import useTheme from "../../context/theme/ThemeContext";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header className="fixed top-0 left-0 z-50 w-full px-4 pt-3">
      <nav className="mx-auto w-full max-w-5xl">
        <div
          className="
            flex
            h-14
            items-center
            rounded-2xl
            border
            border-(--color-border)
            bg-(--color-surface)
            px-4
            shadow-(--shadow-sm)
          "
        >
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0"
            aria-label="Home"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-(--color-primary) text-white">
              <FiCreditCard size={17} />
            </div>
            <span className="font-heading text-sm font-bold text-(--color-text)">
              SplitWise
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden flex-1 items-center justify-center md:flex">
            <nav aria-label="Primary navigation">
              <ul className="flex items-center gap-7">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="
                        text-sm
                        font-medium
                        text-(--color-text-muted)
                        transition-colors
                        duration-200
                        hover:text-(--color-text)
                      "
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Desktop Actions */}
          <div className="ml-auto hidden items-center gap-3 md:flex">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="
                relative
                flex
                h-8
                w-16
                shrink-0
                items-center
                rounded-full
                border
                border-(--color-border)
                bg-(--color-surface-strong)
                p-1
                transition-colors
              "
            >
              <span
                className={`
                  absolute
                  left-1
                  top-1
                  flex
                  h-6
                  w-6
                  items-center
                  justify-center
                  rounded-full
                  bg-(--color-elevated)
                  shadow-sm
                  transition-transform
                  duration-300
                  ease-[cubic-bezier(0.25,1,0.5,1)]
                  ${isDark ? "translate-x-8" : "translate-x-0"}
                `}
              >
                {isDark ? (
                  <FiMoon size={14} className="text-(--color-text)" />
                ) : (
                  <FiSun size={14} className="text-(--color-text)" />
                )}
              </span>

              <FiSun
                size={14}
                className={`
                  flex
                  w-1/2
                  justify-center
                  transition-colors
                  ${isDark ? "text-(--color-text-soft)" : "text-transparent"}
                `}
              />

              <FiMoon
                size={14}
                className={`
                  flex
                  w-1/2
                  justify-center
                  transition-colors
                  ${!isDark ? "text-(--color-text-soft)" : "text-transparent"}
                `}
              />
            </button>

            {/* Contact Button */}
            <a
              href="#contact"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-(--btn-radius)
                bg-(--color-primary)
                px-4
                py-2
                text-sm
                font-semibold
                text-white
                transition-colors
                duration-200
                hover:bg-(--color-primary-hover)
              "
            >
              Contact
              <FiArrowRight size={15} />
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="ml-auto flex items-center gap-2 md:hidden">
            {/* Theme Toggle (Mobile) */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="
                relative
                flex
                h-8
                w-16
                shrink-0
                items-center
                rounded-full
                border
                border-(--color-border)
                bg-(--color-surface-strong)
                p-1
                transition-colors
              "
            >
              <span
                className={`
                  absolute
                  left-1
                  top-1
                  flex
                  h-6
                  w-6
                  items-center
                  justify-center
                  rounded-full
                  bg-(--color-elevated)
                  shadow-sm
                  transition-transform
                  duration-300
                  ease-[cubic-bezier(0.25,1,0.5,1)]
                  ${isDark ? "translate-x-8" : "translate-x-0"}
                `}
              >
                {isDark ? (
                  <FiMoon size={14} className="text-(--color-text)" />
                ) : (
                  <FiSun size={14} className="text-(--color-text)" />
                )}
              </span>

              <FiSun
                size={14}
                className={`
                  flex
                  w-1/2
                  justify-center
                  transition-colors
                  ${isDark ? "text-(--color-text-soft)" : "text-transparent"}
                `}
              />

              <FiMoon
                size={14}
                className={`
                  flex
                  w-1/2
                  justify-center
                  transition-colors
                  ${!isDark ? "text-(--color-text-soft)" : "text-transparent"}
                `}
              />
            </button>

            {/* Hamburger Menu */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                text-(--color-text-muted)
                transition-colors
                hover:bg-(--color-surface-strong)
                hover:text-(--color-text)
              "
              aria-label={
                isMobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div
            className="
              mt-2
              rounded-2xl
              border
              border-(--color-border)
              bg-(--color-surface)
              p-4
              shadow-(--shadow-md)
              md:hidden
            "
          >
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="
                      block
                      text-sm
                      font-medium
                      text-(--color-text-muted)
                      transition-colors
                      hover:text-(--color-text)
                    "
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-4 border-t border-(--color-border) pt-4">
              <a
                href="#contact"
                className="
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-(--btn-radius)
                  bg-(--color-primary)
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  transition-colors
                  duration-200
                  hover:bg-(--color-primary-hover)
                "
              >
                Contact
                <FiArrowRight size={15} />
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
