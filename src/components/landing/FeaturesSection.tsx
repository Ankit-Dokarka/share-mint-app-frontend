import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiUsers,
  FiPieChart,
  FiUserPlus,
  FiCheck,
  FiShield,
  FiZap,
  FiMoon,
} from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturesSection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".feature-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );

      gsap.fromTo(
        ".feature-card",
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".feature-grid",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: FiUsers,
      title: "Smart Groups",
      description:
        "Create one-to-one or one-to-many groups. Add members easily by searching their email and start tracking immediately.",
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=600&auto=format&fit=crop",
      points: ["Email search integration", "One-to-one & Group support"],
      layout: "large",
    },
    {
      icon: FiPieChart,
      title: "Accurate Balances",
      description:
        "Always know exactly where you stand. See real-time 'to pay' and 'to receive' amounts calculated efficiently.",
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=600&auto=format&fit=crop",
      points: ["Real-time math updates"],
      layout: "wide-top",
    },
    {
      icon: FiUserPlus,
      title: "Partial Splits",
      description:
        "Not everyone joins every dinner. Select specific participants, and only their balances are affected.",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=400&auto=format&fit=crop",
      layout: "small",
    },
    {
      icon: FiShield,
      title: "Google Auth",
      description: "Securely log in with your Google account in seconds.",
      image:
        "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=400&auto=format&fit=crop",
      layout: "small",
    },
    {
      icon: FiZap,
      title: "Real-time Updates",
      description:
        "Balances update instantly across all devices the moment an expense is added.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
      points: ["Instant sync"],
      layout: "wide-bottom",
    },
    {
      icon: FiMoon,
      title: "Dark & Light Mode",
      description:
        "A beautiful interface that adapts to your system preferences for comfortable viewing day or night.",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop",
      layout: "wide-bottom",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="features"
      className="py-32 px-4 max-w-6xl mx-auto relative z-10"
    >
      <div className="feature-header text-center mb-20">
        <span className="inline-block text-(--color-primary) font-semibold text-sm mb-3 tracking-wide uppercase">
          Features
        </span>
        <h2
          className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Everything you need to manage group finances
        </h2>
        <p className="text-lg text-(--color-text-muted) max-w-xl mx-auto">
          From one-on-one trips to large household expenses, Sharemint handles
          the math so you don't have to.
        </p>
      </div>

      <div className="feature-grid grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(180px,auto)]">
        {/* Large Card (Left, Spans 2 Rows) */}
        <div className="feature-card md:col-span-5 md:row-span-2 group bg-(--color-surface) border border-(--color-border) rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-(--color-primary)/40 flex flex-col">
          <div className="p-8 flex flex-col grow">
            <div className="w-12 h-12 rounded-xl bg-(--color-surface-strong) flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-(--color-primary-soft)">
              <FiUsers className="text-(--color-primary)" size={24} />
            </div>
            <h3
              className="text-xl font-semibold mb-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {features[0].title}
            </h3>
            <p className="text-sm text-(--color-text-muted) leading-relaxed mb-6 grow">
              {features[0].description}
            </p>
            <ul className="space-y-2.5 pt-6 border-t border-(--color-border)">
              {features[0].points?.map((point, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm font-medium text-(--color-text)"
                >
                  <div className="w-5 h-5 rounded-full bg-(--color-primary-soft) flex items-center justify-center shrink-0">
                    <FiCheck className="text-(--color-primary)" size={12} />
                  </div>
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-48 mt-auto overflow-hidden">
            <img
              src={features[0].image}
              alt="Smart Groups"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Wide Card (Top Right) */}
        <div className="feature-card md:col-span-7 group bg-(--color-surface) border border-(--color-border) rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-(--color-primary)/40 flex flex-col md:flex-row">
          <div className="p-8 flex flex-col justify-center grow">
            <div className="w-12 h-12 rounded-xl bg-(--color-surface-strong) flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-(--color-primary-soft)">
              <FiPieChart className="text-(--color-primary)" size={24} />
            </div>
            <h3
              className="text-xl font-semibold mb-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {features[1].title}
            </h3>
            <p className="text-sm text-(--color-text-muted) leading-relaxed">
              {features[1].description}
            </p>
          </div>
          <div className="relative md:w-1/2 h-48 md:h-auto overflow-hidden">
            <img
              src={features[1].image}
              alt="Balances"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Small Card 1 (Mid Right) */}
        <div className="feature-card md:col-span-3 group bg-(--color-surface) border border-(--color-border) rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-(--color-primary)/40 flex flex-col">
          <div className="p-6 flex flex-col grow">
            <div className="w-10 h-10 rounded-xl bg-(--color-surface-strong) flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-(--color-primary-soft)">
              <FiUserPlus className="text-(--color-primary)" size={20} />
            </div>
            <h3
              className="text-lg font-semibold mb-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {features[2].title}
            </h3>
            <p className="text-xs text-(--color-text-muted) leading-relaxed grow">
              {features[2].description}
            </p>
          </div>
          <div className="relative h-24 overflow-hidden">
            <img
              src={features[2].image}
              alt="Partial Splits"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Small Card 2 (Mid Right) */}
        <div className="feature-card md:col-span-4 group bg-(--color-surface) border border-(--color-border) rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-(--color-primary)/40 flex flex-col">
          <div className="p-6 flex flex-col grow">
            <div className="w-10 h-10 rounded-xl bg-(--color-surface-strong) flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-(--color-primary-soft)">
              <FiShield className="text-(--color-primary)" size={20} />
            </div>
            <h3
              className="text-lg font-semibold mb-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {features[3].title}
            </h3>
            <p className="text-xs text-(--color-text-muted) leading-relaxed grow">
              {features[3].description}
            </p>
          </div>
          <div className="relative h-24 overflow-hidden">
            <img
              src={features[3].image}
              alt="Security"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Wide Card 1 (Bottom Left) */}
        <div className="feature-card md:col-span-6 group bg-(--color-surface) border border-(--color-border) rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-(--color-primary)/40 flex flex-col sm:flex-row">
          <div className="p-6 flex flex-col justify-center grow">
            <div className="w-10 h-10 rounded-xl bg-(--color-surface-strong) flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-(--color-primary-soft)">
              <FiZap className="text-(--color-primary)" size={20} />
            </div>
            <h3
              className="text-lg font-semibold mb-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {features[4].title}
            </h3>
            <p className="text-xs text-(--color-text-muted) leading-relaxed">
              {features[4].description}
            </p>
          </div>
          <div className="relative sm:w-1/2 h-32 sm:h-auto overflow-hidden">
            <img
              src={features[4].image}
              alt="Real-time"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Wide Card 2 (Bottom Right) */}
        <div className="feature-card md:col-span-6 group bg-(--color-surface) border border-(--color-border) rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-(--color-primary)/40 flex flex-col sm:flex-row">
          <div className="p-6 flex flex-col justify-center grow">
            <div className="w-10 h-10 rounded-xl bg-(--color-surface-strong) flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-(--color-primary-soft)">
              <FiMoon className="text-(--color-primary)" size={20} />
            </div>
            <h3
              className="text-lg font-semibold mb-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {features[5].title}
            </h3>
            <p className="text-xs text-(--color-text-muted) leading-relaxed">
              {features[5].description}
            </p>
          </div>
          <div className="relative sm:w-1/2 h-32 sm:h-auto overflow-hidden">
            <img
              src={features[5].image}
              alt="Dark Mode"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
