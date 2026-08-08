import {
  FiArrowRight,
  FiHome,
  FiShoppingBag,
  FiMapPin,
  FiCoffee,
} from "react-icons/fi";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-4 overflow-hidden">
      {/* Floating Expense Elements */}
      <div className="hidden lg:block absolute z-10 top-[25%] left-[15%] float-anim-1">
        <div className="bg-(--color-surface)/80 backdrop-blur-md border border-(--color-border) rounded-xl p-3 shadow-xl flex items-center gap-3 w-48">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
            <FiMapPin size={20} />
          </div>
          <div>
            <p className="text-xs text-(--color-text-muted)">Trip to Paris</p>
            <p className="text-sm font-bold text-(--color-text)">₹4,500</p>
          </div>
        </div>
      </div>

      <div className="hidden lg:block absolute z-10 top-[35%] right-[15%] float-anim-2">
        <div className="bg-(--color-surface)/80 backdrop-blur-md border border-(--color-border) rounded-xl p-3 shadow-xl flex items-center gap-3 w-44">
          <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
            <FiCoffee size={20} />
          </div>
          <div>
            <p className="text-xs text-(--color-text-muted)">Dinner Split</p>
            <p className="text-sm font-bold text-(--color-text)">₹1,200</p>
          </div>
        </div>
      </div>

      <div className="hidden lg:block absolute z-10 bottom-[30%] left-[12%] float-anim-2">
        <div className="bg-(--color-surface)/80 backdrop-blur-md border border-(--color-border) rounded-xl p-3 shadow-xl flex items-center gap-3 w-44">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
            <FiShoppingBag size={20} />
          </div>
          <div>
            <p className="text-xs text-(--color-text-muted)">Groceries</p>
            <p className="text-sm font-bold text-(--color-text)">₹2,100</p>
          </div>
        </div>
      </div>

      <div className="hidden lg:block absolute z-10 bottom-[25%] right-[12%] float-anim-1">
        <div className="bg-(--color-surface)/80 backdrop-blur-md border border-(--color-border) rounded-xl p-3 shadow-xl flex items-center gap-3 w-48">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
            <FiHome size={20} />
          </div>
          <div>
            <p className="text-xs text-(--color-text-muted)">Apartment Rent</p>
            <p className="text-sm font-bold text-(--color-text)">₹12,000</p>
          </div>
        </div>
      </div>

      {/* Center Content */}
      <div className="relative z-20 text-center max-w-4xl mx-auto flex flex-col items-center">
        <div className="inline-flex items-center gap-2 bg-(--color-surface) border border-(--color-border) rounded-full px-4 py-1.5 text-xs font-medium text-(--color-text-muted) mb-8 shadow-sm">
          <span className="bg-(--color-primary) w-2 h-2 rounded-full animate-pulse"></span>
          Next Gen Expense Splitting
        </div>

        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-(--color-text) mb-8"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Split expenses, <br /> not friendships.
        </h1>

        <p className="text-lg md:text-xl text-(--color-text-muted) mb-12 max-w-2xl">
          Dive into the art of asset management, where innovative technology
          meets financial expertise. Track shared expenses, manage group
          balances, and see exactly who needs to pay.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            to="/login"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-(--color-primary) hover:bg-(--color-primary-hover) text-white font-semibold rounded-lg py-4 px-8 transition-colors shadow-lg shadow-(--color-primary)/20 text-base"
          >
            Open App <FiArrowRight size={18} />
          </Link>
          <a
            href="#features"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-(--color-surface)/60 backdrop-blur-md hover:bg-(--color-surface-strong) text-(--color-text) border border-(--color-border) font-semibold rounded-lg py-4 px-8 transition-colors text-base"
          >
            Discover More
          </a>
        </div>
      </div>

      {/* Social Proof / Trusted By */}
      <div className="absolute bottom-12 w-full px-4 z-20">
        <p className="text-center text-xs font-medium uppercase tracking-widest text-(--color-text-soft) mb-6">
          Trusted by fast-growing teams worldwide
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 opacity-40">
          <span className="text-xl font-bold text-(--color-text-muted)">
            Vercel
          </span>
          <span className="text-xl font-bold text-(--color-text-muted)">
            Supabase
          </span>
          <span className="text-xl font-bold text-(--color-text-muted)">
            Linear
          </span>
          <span className="text-xl font-bold text-(--color-text-muted)">
            Notion
          </span>
          <span className="text-xl font-bold text-(--color-text-muted)">
            Figma
          </span>
        </div>
      </div>
    </section>
  );
}
