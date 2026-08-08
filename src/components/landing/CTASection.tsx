import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowRight, FiZap } from "react-icons/fi";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-element",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-4 relative z-10">
      <div className="max-w-5xl mx-auto bg-(--color-surface) border border-(--color-border) rounded-3xl p-12 md:p-24 text-center shadow-2xl relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full bg-(--color-primary)/10 blur-[100px] z-0"></div>
        <div className="pointer-events-none absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-(--color-primary)/10 blur-[100px] z-0"></div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="cta-element inline-flex items-center gap-2 bg-(--color-bg) border border-(--color-border) rounded-full px-4 py-1.5 text-xs font-medium text-(--color-text-muted) mb-8 shadow-sm">
            <FiZap size={14} className="text-(--color-primary)" />
            Get started in seconds
          </div>

          <h2
            className="cta-element text-4xl md:text-6xl font-bold mb-6 tracking-tight max-w-3xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Ready to settle up?
          </h2>

          <p className="cta-element text-lg text-(--color-text-muted) mb-12 max-w-xl mx-auto">
            Join thousands of users who manage their shared expenses without the
            headache. Your friends will thank you.
          </p>

          <div className="cta-element flex flex-col sm:flex-row items-center gap-4">
            <Link
              to="/login"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-(--color-primary) hover:bg-(--color-primary-hover) text-white font-semibold rounded-full py-4 px-8 transition-all duration-300 shadow-lg shadow-(--color-primary)/20 text-base hover:shadow-xl hover:-translate-y-0.5"
            >
              Create your first group
              <FiArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <a
              href="#features"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent hover:bg-(--color-surface-strong) text-(--color-text) border border-(--color-border) font-semibold rounded-full py-4 px-8 transition-colors text-base"
            >
              Explore Features
            </a>
          </div>

          <p className="cta-element mt-10 text-xs text-(--color-text-soft)">
            No credit card required. Free forever.
          </p>
        </div>
      </div>
    </section>
  );
}
