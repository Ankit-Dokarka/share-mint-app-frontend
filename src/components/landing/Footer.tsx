import { FiCreditCard, FiArrowRight } from "react-icons/fi";
import { SiX, SiGithub, SiDiscord } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-(--color-border) bg-(--color-surface) pt-20 pb-12 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Top Section: Brand/Newsletter & Links */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-16">
          {/* Brand & Newsletter */}
          <div className="col-span-2 md:col-span-2 pr-4">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-(--color-primary) flex items-center justify-center text-white">
                <FiCreditCard size={17} />
              </div>
              <span
                className="font-bold text-(--color-text) text-lg"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Sharemint
              </span>
            </div>
            <p className="text-sm text-(--color-text-muted) max-w-xs mb-6 leading-relaxed">
              Split expenses, not friendships. The smartest way to manage shared
              finances.
            </p>

            {/* Newsletter Form */}
            <form className="flex items-center gap-2 max-w-sm">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 text-sm rounded-full bg-(--color-bg) border border-(--color-border) text-(--color-text) placeholder:text-(--color-text-soft) focus:outline-none focus:ring-2 focus:ring-(--color-primary)/30 focus:border-(--color-primary)/50 transition-all"
              />
              <button
                type="submit"
                className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-(--color-primary) hover:bg-(--color-primary-hover) text-white transition-colors"
                aria-label="Subscribe"
              >
                <FiArrowRight size={16} />
              </button>
            </form>
          </div>

          {/* Link Columns */}
          <div>
            <h4 className="text-xs font-semibold text-(--color-text) uppercase tracking-wider mb-4">
              Product
            </h4>
            <ul className="space-y-3 text-sm text-(--color-text-muted)">
              <li>
                <a
                  href="#features"
                  className="hover:text-(--color-text) transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="hover:text-(--color-text) transition-colors"
                >
                  How it works
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-(--color-text) transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-(--color-text) transition-colors"
                >
                  Changelog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-(--color-text) uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-3 text-sm text-(--color-text-muted)">
              <li>
                <a
                  href="#"
                  className="hover:text-(--color-text) transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-(--color-text) transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-(--color-text) transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-(--color-text) transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-(--color-text) uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-3 text-sm text-(--color-text-muted)">
              <li>
                <a
                  href="#"
                  className="hover:text-(--color-text) transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-(--color-text) transition-colors"
                >
                  Support
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-(--color-text) transition-colors"
                >
                  Community
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-(--color-text) transition-colors"
                >
                  API Status
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-(--color-text) uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-3 text-sm text-(--color-text-muted)">
              <li>
                <a
                  href="#"
                  className="hover:text-(--color-text) transition-colors"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-(--color-text) transition-colors"
                >
                  Terms
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-(--color-text) transition-colors"
                >
                  Security
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-(--color-text) transition-colors"
                >
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright & Socials */}
        <div className="pt-8 border-t border-(--color-border) flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <p className="text-xs text-(--color-text-soft) order-2 md:order-1">
            © {new Date().getFullYear()} Sharemint, Inc. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-2 order-1 md:order-2">
            <a
              href="#"
              className="h-9 w-9 flex items-center justify-center rounded-full text-(--color-text-soft) hover:bg-(--color-surface-strong) hover:text-(--color-text) transition-colors"
              aria-label="X (Twitter)"
            >
              <SiX size={15} />
            </a>
            <a
              href="#"
              className="h-9 w-9 flex items-center justify-center rounded-full text-(--color-text-soft) hover:bg-(--color-surface-strong) hover:text-(--color-text) transition-colors"
              aria-label="GitHub"
            >
              <SiGithub size={15} />
            </a>
            <a
              href="#"
              className="h-9 w-9 flex items-center justify-center rounded-full text-(--color-text-soft) hover:bg-(--color-surface-strong) hover:text-(--color-text) transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn size={14} />
            </a>
            <a
              href="#"
              className="h-9 w-9 flex items-center justify-center rounded-full text-(--color-text-soft) hover:bg-(--color-surface-strong) hover:text-(--color-text) transition-colors"
              aria-label="Discord"
            >
              <SiDiscord size={15} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
