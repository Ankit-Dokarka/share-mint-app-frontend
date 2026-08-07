import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiArrowRight,
  FiUsers,
  FiPieChart,
  FiUserPlus,
  FiShield,
  FiZap,
  FiCheck,
} from "react-icons/fi";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const main = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const boxes = gsap.utils.toArray<HTMLElement>(".animate-fade-up");
      boxes.forEach((box) => {
        gsap.fromTo(
          box,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: box,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, main);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={main}
      className="bg-(--color-bg) text-(--color-text) font-sans overflow-x-hidden"
    >
      {/* Floating Pill Navbar */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-3xl">
        <div className="flex items-center justify-between bg-(--color-surface)/80 backdrop-blur-md border border-(--color-border) shadow-lg rounded-full px-3 py-2 pl-6">
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

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-(--color-text-muted)">
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
            Get Started <FiArrowRight size={14} />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-4 flex flex-col items-center text-center max-w-5xl mx-auto">
        <div className="animate-fade-up inline-flex items-center gap-2 bg-(--color-surface) border border-(--color-border) rounded-full px-4 py-1.5 text-xs font-medium text-(--color-text-muted) mb-8 shadow-sm">
          <span className="bg-(--color-primary) w-2 h-2 rounded-full"></span>
          Introducing Sharemint 2.0 — Faster and smarter than ever
        </div>

        <h1
          className="animate-fade-up text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-(--color-text) mb-6 max-w-3xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Split expenses, not friendships.
        </h1>

        <p className="animate-fade-up text-lg md:text-xl text-(--color-text-muted) mb-10 max-w-2xl">
          Sharemint makes it easy to track shared expenses, manage group
          balances, and see exactly who needs to pay and who needs to receive.
          No more awkward math.
        </p>

        <div className="animate-fade-up flex flex-col sm:flex-row items-center gap-4">
          <Link
            to="/login"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-(--color-primary) hover:bg-(--color-primary-hover) text-white font-semibold rounded-lg py-3 px-6 transition-colors shadow-md"
          >
            Start for Free <FiArrowRight size={16} />
          </Link>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-(--color-surface) hover:bg-(--color-surface-strong) text-(--color-text) border border-(--color-border) font-semibold rounded-lg py-3 px-6 transition-colors"
          >
            <FiZap size={16} className="text-(--color-primary)" /> See how it
            works
          </a>
        </div>

        {/* Hero Image */}
        <div className="animate-fade-up mt-16 w-full rounded-xl border border-(--color-border) bg-(--color-surface) p-2 shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
            alt="Sharemint Dashboard"
            className="rounded-lg w-full h-auto object-cover aspect-video"
          />
        </div>
      </section>

      {/* Social Proof / Trusted By */}
      <section className="py-12 border-y border-(--color-border) bg-(--color-surface)/50">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-center text-xs font-medium uppercase tracking-wider text-(--color-text-soft) mb-6">
            Trusted by fast-growing teams and households worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-60">
            <span className="text-lg font-bold text-(--color-text-muted)">
              Vercel
            </span>
            <span className="text-lg font-bold text-(--color-text-muted)">
              Supabase
            </span>
            <span className="text-lg font-bold text-(--color-text-muted)">
              Linear
            </span>
            <span className="text-lg font-bold text-(--color-text-muted)">
              Notion
            </span>
            <span className="text-lg font-bold text-(--color-text-muted)">
              Figma
            </span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="animate-fade-up text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Everything you need to manage group finances
          </h2>
          <p className="animate-fade-up text-(--color-text-muted) max-w-xl mx-auto">
            From one-on-one trips to large household expenses, Sharemint handles
            the math so you don't have to.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="animate-fade-up bg-(--color-surface) border border-(--color-border) rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-(--color-primary-soft) flex items-center justify-center mb-4">
              <FiUsers className="text-(--color-primary)" size={24} />
            </div>
            <h3
              className="text-lg font-semibold mb-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Smart Groups
            </h3>
            <p className="text-sm text-(--color-text-muted) leading-relaxed">
              Create one-to-one or one-to-many groups. Add members easily by
              searching their email and start tracking immediately.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="animate-fade-up bg-(--color-surface) border border-(--color-border) rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-(--color-primary-soft) flex items-center justify-center mb-4">
              <FiPieChart className="text-(--color-primary)" size={24} />
            </div>
            <h3
              className="text-lg font-semibold mb-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Accurate Balances
            </h3>
            <p className="text-sm text-(--color-text-muted) leading-relaxed">
              Always know exactly where you stand. See real-time "to pay" and
              "to receive" amounts calculated efficiently in the backend.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="animate-fade-up bg-(--color-surface) border border-(--color-border) rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-(--color-primary-soft) flex items-center justify-center mb-4">
              <FiUserPlus className="text-(--color-primary)" size={24} />
            </div>
            <h3
              className="text-lg font-semibold mb-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Partial Splits
            </h3>
            <p className="text-sm text-(--color-text-muted) leading-relaxed">
              Not everyone joins every dinner. Select specific participants for
              an expense, and only their balances will be affected.
            </p>
          </div>
        </div>
      </section>

      {/* Product Showcase Section */}
      <section
        id="how-it-works"
        className="py-24 px-4 bg-(--color-surface) border-y border-(--color-border)"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up order-2 md:order-1">
            <span className="inline-block text-(--color-primary) font-semibold text-sm mb-2">
              Effortless Setup
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              From signup to splitting in under 60 seconds.
            </h2>
            <p className="text-(--color-text-muted) mb-6">
              Securely log in with Google, create a group, and add your first
              expense. Our intelligent backend handles the exact decimal math
              and remainders automatically.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-(--color-text)">
                <FiCheck
                  className="text-(--color-primary) shrink-0"
                  size={18}
                />{" "}
                Google Authentication for secure access
              </li>
              <li className="flex items-center gap-3 text-sm text-(--color-text)">
                <FiCheck
                  className="text-(--color-primary) shrink-0"
                  size={18}
                />{" "}
                Intelligent remainder distribution
              </li>
              <li className="flex items-center gap-3 text-sm text-(--color-text)">
                <FiCheck
                  className="text-(--color-primary) shrink-0"
                  size={18}
                />{" "}
                Beautiful dark and light mode support
              </li>
            </ul>
          </div>
          <div className="animate-fade-up order-1 md:order-2 rounded-xl border border-(--color-border) overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
              alt="App Analytics"
              className="w-full h-full object-cover aspect-square"
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4">
        <div className="animate-fade-up max-w-4xl mx-auto bg-(--color-surface) border border-(--color-border) rounded-2xl p-10 md:p-16 text-center shadow-sm relative overflow-hidden">
          <div className="pointer-events-none absolute -top-20 -right-20 w-60 h-60 rounded-full bg-(--color-primary)/5 blur-3xl"></div>

          <h2
            className="text-3xl md:text-4xl font-bold mb-4 relative z-10"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Ready to settle up?
          </h2>
          <p className="text-(--color-text-muted) mb-8 max-w-md mx-auto relative z-10">
            Join thousands of users who manage their shared expenses without the
            headache.
          </p>
          <Link
            to="/login"
            className="relative z-10 inline-flex items-center gap-2 bg-(--color-primary) hover:bg-(--color-primary-hover) text-white font-semibold rounded-lg py-3 px-6 transition-colors shadow-md"
          >
            Create your first group <FiArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-(--color-border) bg-(--color-surface) py-12 px-4">
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
    </div>
  );
}
