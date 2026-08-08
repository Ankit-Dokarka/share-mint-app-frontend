import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const main = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".floating-card");

      // 1. Set initial hidden state
      gsap.set(cards, { opacity: 0, y: 60, scale: 0.9 });

      // 2. Entrance Animation
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.3,
      });

      // 3. Scroll Animation with explicit fromTo and immediateRender: false
      cards.forEach((card) => {
        const isLeft = card.classList.contains("left-card");

        gsap.fromTo(
          card,
          { x: 0, y: 0, opacity: 1, scale: 1 }, // Explicit "visible" state to return to on scroll up
          {
            x: isLeft ? -120 : 120,
            y: 80,
            opacity: 0,
            scale: 0.85,
            ease: "none",
            immediateRender: false, // Prevents overriding the entrance animation
            scrollTrigger: {
              trigger: ".hero-section",
              start: "top top",
              end: "bottom center",
              scrub: 1,
            },
          },
        );
      });
    }, main);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={main}
      className="hero-section relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-4 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 w-200 h-200 bg-(--color-primary)/5 rounded-full blur-[120px] z-0"></div>

      {/* Center Content */}
      <div className="relative z-20 text-center max-w-3xl mx-auto flex flex-col items-center">
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

      {/* Floating Visual Elements (Left Side) */}
      <div className="floating-card left-card hidden lg:block absolute top-[12%] left-[5%] w-48 -rotate-6 z-10">
        <div className="bg-(--color-surface)/90 backdrop-blur-sm border border-(--color-border) rounded-2xl p-1.5 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=600&auto=format&fit=crop"
            alt="Wallet App"
            className="rounded-xl w-full h-auto object-cover aspect-4/3"
          />
        </div>
      </div>

      <div className="floating-card left-card hidden lg:block absolute top-[33%] left-[1%] w-64 rotate-3 z-30">
        <div className="bg-(--color-surface)/90 backdrop-blur-sm border border-(--color-border) rounded-2xl p-1.5 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop"
            alt="Analytics Dashboard"
            className="rounded-xl w-full h-auto object-cover aspect-4/3"
          />
        </div>
      </div>

      <div className="floating-card left-card hidden lg:block absolute bottom-[24%] left-[8%] w-44 -rotate-12 z-10">
        <div className="bg-(--color-surface)/90 backdrop-blur-sm border border-(--color-border) rounded-2xl p-1.5 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=600&auto=format&fit=crop"
            alt="Mobile Payment"
            className="rounded-xl w-full h-auto object-cover aspect-4/3"
          />
        </div>
      </div>

      {/* Floating Visual Elements (Right Side) */}
      <div className="floating-card right-card hidden lg:block absolute top-[12%] right-[5%] w-48 rotate-6 z-10">
        <div className="bg-(--color-surface)/90 backdrop-blur-sm border border-(--color-border) rounded-2xl p-1.5 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=600&auto=format&fit=crop"
            alt="Finance Chart"
            className="rounded-xl w-full h-auto object-cover aspect-4/3"
          />
        </div>
      </div>

      <div className="floating-card right-card hidden lg:block absolute top-[33%] right-[1%] w-64 -rotate-3 z-30">
        <div className="bg-(--color-surface)/90 backdrop-blur-sm border border-(--color-border) rounded-2xl p-1.5 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=600&auto=format&fit=crop"
            alt="Expense Calculator"
            className="rounded-xl w-full h-auto object-cover aspect-4/3"
          />
        </div>
      </div>

      <div className="floating-card right-card hidden lg:block absolute bottom-[24%] right-[8%] w-44 rotate-12 z-10">
        <div className="bg-(--color-surface)/90 backdrop-blur-sm border border-(--color-border) rounded-2xl p-1.5 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=600&auto=format&fit=crop"
            alt="Transaction History"
            className="rounded-xl w-full h-auto object-cover aspect-4/3"
          />
        </div>
      </div>

      {/* Social Proof / Trusted By */}
      <div className="relative z-20 mt-32 w-full max-w-4xl mx-auto text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-(--color-text-soft) mb-8">
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
