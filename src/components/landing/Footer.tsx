import { FiShield, FiZap, FiUsers } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="border-t border-(--color-border) bg-(--color-surface) py-12 px-4 relative z-10">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-(--color-primary) flex items-center justify-center text-white font-bold text-sm">
              S
            </div>
            <span
              className="font-bold text-(--color-text)"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Sharemint
            </span>
          </div>
          <p className="text-sm text-(--color-text-muted) max-w-xs">
            The easiest way to manage shared expenses and group balances.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-(--color-text) mb-4">
            Product
          </h4>
          <ul className="space-y-2 text-sm text-(--color-text-muted)">
            <li>
              <a
                href="#"
                className="hover:text-(--color-text) transition-colors"
              >
                Features
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
          <h4 className="text-sm font-semibold text-(--color-text) mb-4">
            Company
          </h4>
          <ul className="space-y-2 text-sm text-(--color-text-muted)">
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
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-(--color-text) mb-4">
            Legal
          </h4>
          <ul className="space-y-2 text-sm text-(--color-text-muted)">
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
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-(--color-border) flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-(--color-text-soft)">
          © {new Date().getFullYear()} Sharemint. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-(--color-text-soft)">
          <a href="#" className="hover:text-(--color-text) transition-colors">
            <FiShield size={16} />
          </a>
          <a href="#" className="hover:text-(--color-text) transition-colors">
            <FiZap size={16} />
          </a>
          <a href="#" className="hover:text-(--color-text) transition-colors">
            <FiUsers size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
