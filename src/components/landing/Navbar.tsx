import { useState, useEffect } from "react";
import {
  FiArrowRight,
  FiSun,
  FiMoon,
  FiCreditCard,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import useTheme from "../../context/theme/ThemeContext";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const MouseTrackingButton = ({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty(
      "--mouse-x",
      `${e.clientX - rect.left}px`,
    );
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      style={
        {
          "--mouse-x": "0px",
          "--mouse-y": "0px",
        } as React.CSSProperties
      }
      className={`
        group
        relative
        inline-flex
        items-center
        justify-center
        gap-2
        overflow-hidden
        rounded-(--btn-radius)
        bg-(--color-primary)
        font-semibold
        text-white
        transition-all
        duration-300
        hover:shadow-md
        ${className}
      `}
    >
      <span className="absolute inset-0 z-0 bg-[#be123c] [clip-path:circle(0%_at_var(--mouse-x)_var(--mouse-y))] transition-[clip-path] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:[clip-path:circle(150%_at_var(--mouse-x)_var(--mouse-y))]"></span>

      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
};

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShrunk, setIsShrunk] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsShrunk(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 z-50 w-full px-4 pt-3">
      <nav
        className={`mx-auto w-full transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          isShrunk ? "max-w-2xl" : "max-w-5xl"
        }`}
      >
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

          <div
            className={`hidden flex-1 items-center justify-center md:flex transition-opacity duration-300 ease-in-out ${
              isShrunk ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <nav aria-label="Primary navigation">
              <ul className="flex items-center gap-7">
                {navLinks.map((link) => (
                  <li key={link.label} className="h-5">
                    <a
                      href={link.href}
                      className="group relative flex h-5 overflow-hidden text-sm font-medium text-(--color-text-muted) transition-colors duration-200 hover:text-(--color-text)"
                    >
                      <span className="block leading-5 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-full">
                        {link.label}
                      </span>
                      <span className="absolute left-0 top-0 block translate-y-full leading-5 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-y-0">
                        {link.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="ml-auto hidden items-center gap-3 md:flex">
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

            <MouseTrackingButton
              onClick={() => navigate("login")}
              className="px-4 py-2 text-sm"
            >
              Get Started
              <FiArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </MouseTrackingButton>
          </div>

          <div className="ml-auto flex items-center gap-2 md:hidden">
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

            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${isShrunk ? "max-w-25 opacity-100 ml-1" : "max-w-0 opacity-0"}`}
            >
              <MouseTrackingButton
                onClick={() => navigate("login")}
                className="px-3 py-1.5 text-xs gap-1"
              >
                Start
                <FiArrowRight
                  size={12}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </MouseTrackingButton>
            </div>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className={`
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                text-(--color-text-muted)
                transition-all
                duration-300
                ease-in-out
                overflow-hidden
                hover:bg-(--color-surface-strong)
                hover:text-(--color-text)
                ${isShrunk ? "max-w-0 opacity-0" : "max-w-9 opacity-100"}
              `}
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

        {isMobileMenuOpen && !isShrunk && (
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
              <MouseTrackingButton
                onClick={() => navigate("login")}
                className="w-full px-4 py-2.5 text-sm"
              >
                Get Started
                <FiArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </MouseTrackingButton>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
