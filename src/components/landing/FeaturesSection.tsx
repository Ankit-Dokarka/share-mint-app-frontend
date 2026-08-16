import { useEffect, useRef } from "react";
import {
  FiUsers,
  FiPieChart,
  FiUserPlus,
  FiShield,
  FiZap,
  FiMoon,
  FiCheck,
} from "react-icons/fi";

const features = [
  {
    icon: FiUsers,
    title: "Smart Groups",
    description:
      "Create one-to-one or one-to-many groups. Add members easily by searching their email and start tracking immediately.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=600&auto=format&fit=crop",
    points: ["Email search integration", "One-to-one & Group support"],
    gridClass: "md:col-span-5 md:row-span-2",
    layoutClass: "flex-col",
    contentClass: "p-8 flex flex-col grow",
    imgWrapClass: "h-48 mt-auto",
    boxClass: "w-12 h-12 mb-6",
    titleClass: "text-xl mb-3",
    descClass: "text-sm mb-6 grow",
    iconSize: 24,
  },
  {
    icon: FiPieChart,
    title: "Accurate Balances",
    description:
      "Always know exactly where you stand. See real-time 'to pay' and 'to receive' amounts calculated efficiently.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=600&auto=format&fit=crop",
    gridClass: "md:col-span-7",
    layoutClass: "flex-col md:flex-row",
    contentClass: "p-8 flex flex-col justify-center grow",
    imgWrapClass: "md:w-1/2 h-48 md:h-auto",
    boxClass: "w-12 h-12 mb-6",
    titleClass: "text-xl mb-3",
    descClass: "text-sm",
    iconSize: 24,
  },
  {
    icon: FiUserPlus,
    title: "Partial Splits",
    description:
      "Not everyone joins every dinner. Select specific participants, and only their balances are affected.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=400&auto=format&fit=crop",
    gridClass: "md:col-span-3",
    layoutClass: "flex-col",
    contentClass: "p-6 flex flex-col grow",
    imgWrapClass: "h-24",
    boxClass: "w-10 h-10 mb-4",
    titleClass: "text-lg mb-2",
    descClass: "text-xs grow",
    iconSize: 20,
  },
  {
    icon: FiShield,
    title: "Google Auth",
    description: "Securely log in with your Google account in seconds.",
    image:
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=400&auto=format&fit=crop",
    gridClass: "md:col-span-4",
    layoutClass: "flex-col",
    contentClass: "p-6 flex flex-col grow",
    imgWrapClass: "h-24",
    boxClass: "w-10 h-10 mb-4",
    titleClass: "text-lg mb-2",
    descClass: "text-xs grow",
    iconSize: 20,
  },
  {
    icon: FiZap,
    title: "Real-time Updates",
    description:
      "Balances update instantly across all devices the moment an expense is added.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
    gridClass: "md:col-span-6",
    layoutClass: "flex-col sm:flex-row",
    contentClass: "p-6 flex flex-col justify-center grow",
    imgWrapClass: "sm:w-1/2 h-32 sm:h-auto",
    boxClass: "w-10 h-10 mb-4",
    titleClass: "text-lg mb-2",
    descClass: "text-xs",
    iconSize: 20,
  },
  {
    icon: FiMoon,
    title: "Dark & Light Mode",
    description:
      "A beautiful interface that adapts to your system preferences for comfortable viewing day or night.",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop",
    gridClass: "md:col-span-6",
    layoutClass: "flex-col sm:flex-row",
    contentClass: "p-6 flex flex-col justify-center grow",
    imgWrapClass: "sm:w-1/2 h-32 sm:h-auto",
    boxClass: "w-10 h-10 mb-4",
    titleClass: "text-lg mb-2",
    descClass: "text-xs",
    iconSize: 20,
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: gsap.Context;
    let isMounted = true;

    const initAnimations = async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      if (!isMounted) return;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
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
    };

    initAnimations();

    return () => {
      isMounted = false;
      if (ctx) ctx.revert();
    };
  }, []);

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
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className={`feature-card group bg-(--color-surface) border border-(--color-border) rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-(--color-primary)/40 flex ${feature.layoutClass} ${feature.gridClass}`}
            >
              <div className={feature.contentClass}>
                <div
                  className={`${feature.boxClass} rounded-xl bg-(--color-surface-strong) flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-(--color-primary-soft)`}
                >
                  <Icon
                    className="text-(--color-primary)"
                    size={feature.iconSize}
                  />
                </div>
                <h3
                  className={`${feature.titleClass} font-semibold`}
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {feature.title}
                </h3>
                <p
                  className={`${feature.descClass} text-(--color-text-muted) leading-relaxed`}
                >
                  {feature.description}
                </p>

                {feature.points && (
                  <ul className="space-y-2.5 pt-6 border-t border-(--color-border)">
                    {feature.points.map((point, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-sm font-medium text-(--color-text)"
                      >
                        <div className="w-5 h-5 rounded-full bg-(--color-primary-soft) flex items-center justify-center shrink-0">
                          <FiCheck
                            className="text-(--color-primary)"
                            size={12}
                          />
                        </div>
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div
                className={`relative ${feature.imgWrapClass} overflow-hidden`}
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
