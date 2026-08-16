import { memo } from "react";
import { FiCreditCard, FiArrowRight } from "react-icons/fi";
import { SiX, SiGithub, SiDiscord } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Pricing", href: "#" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "Support", href: "#" },
      { label: "Community", href: "#" },
      { label: "API Status", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Security", href: "#" },
      { label: "Cookies", href: "#" },
    ],
  },
];

const socialLinks = [
  { icon: SiX, label: "X (Twitter)", href: "#", size: 15 },
  { icon: SiGithub, label: "GitHub", href: "#", size: 15 },
  { icon: FaLinkedinIn, label: "LinkedIn", href: "#", size: 14 },
  { icon: SiDiscord, label: "Discord", href: "#", size: 15 },
];

const Footer = () => {
  return (
    <footer className="border-t border-(--color-border) bg-(--color-surface) pt-20 pb-12 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-16">
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

          {footerLinks.map((column) => (
            <div key={column.title}>
              <h4 className="text-xs font-semibold text-(--color-text) uppercase tracking-wider mb-4">
                {column.title}
              </h4>
              <ul className="space-y-3 text-sm text-(--color-text-muted)">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="hover:text-(--color-text) transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-(--color-border) flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-(--color-text-soft) order-2 md:order-1">
            © {new Date().getFullYear()} Sharemint, Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-2 order-1 md:order-2">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  className="h-9 w-9 flex items-center justify-center rounded-full text-(--color-text-soft) hover:bg-(--color-surface-strong) hover:text-(--color-text) transition-colors"
                  aria-label={social.label}
                >
                  <Icon size={social.size} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
