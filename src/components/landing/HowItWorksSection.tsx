import { useEffect, useRef } from "react";

export default function HowItWorksSection() {
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
        gsap.to(".timeline-line-fill", {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".timeline-container",
            start: "top 70%",
            end: "bottom 70%",
            scrub: 1,
          },
        });

        gsap.utils.toArray<HTMLElement>(".timeline-step").forEach((step) => {
          gsap.fromTo(
            step,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: step,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            },
          );
        });
      }, sectionRef);
    };

    initAnimations();

    return () => {
      isMounted = false;
      if (ctx) ctx.revert();
    };
  }, []);

  const steps = [
    {
      title: "Create a Group",
      description:
        "Log in securely with Google. Search for your friends by email and bring them into a shared group for your trip, apartment, or project.",
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=600&auto=format&fit=crop",
    },
    {
      title: "Add an Expense",
      description:
        "Enter the amount, note who paid, and select who was involved. Our backend instantly handles the exact decimal math and remainders.",
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=600&auto=format&fit=crop",
    },
    {
      title: "Track Balances",
      description:
        "Watch as 'to pay' and 'to receive' amounts update in real-time. You always know exactly where you stand without doing any math.",
      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=600&auto=format&fit=crop",
    },
    {
      title: "Settle Up",
      description:
        "Clear your debts with a tap. Keep your finances organized and your friendships perfectly balanced, stress-free.",
      image:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="py-32 px-4 bg-(--color-surface) border-y border-(--color-border) relative z-10 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <span className="inline-block text-(--color-primary) font-semibold text-sm mb-3 tracking-wide uppercase">
            How it works
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            From signup to splitting in seconds.
          </h2>
          <p className="text-lg text-(--color-text-muted) max-w-xl mx-auto">
            A seamless flow designed to get you out of the math and back to the
            moment.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="timeline-container relative">
          {/* Base Line */}
          <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-px bg-(--color-border) -translate-x-1/2"></div>
          {/* Animated Fill Line */}
          <div className="timeline-line-fill absolute left-4 md:left-1/2 top-2 bottom-2 w-px bg-(--color-primary) -translate-x-1/2 origin-top scale-y-0 shadow-[0_0_10px_2px_var(--color-primary)]"></div>

          <div className="space-y-16 md:space-y-24">
            {steps.map((step, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div key={index} className="timeline-step relative">
                  {/* Timeline Node */}
                  <div className="absolute left-4 md:left-1/2 top-0 -translate-x-1/2 z-10">
                    <div className="w-4 h-4 rounded-full bg-(--color-surface) border-2 border-(--color-primary) flex items-center justify-center shadow-md">
                      <div className="w-1.5 h-1.5 rounded-full bg-(--color-primary)"></div>
                    </div>
                  </div>

                  {/* Content Grid */}
                  <div
                    className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${isLeft ? "" : "md:[direction:rtl]"}`}
                  >
                    {/* Text Card */}
                    <div
                      className={`pl-12 md:pl-0 ${isLeft ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left md:[direction:ltr]"}`}
                    >
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-(--color-primary-soft) text-(--color-primary) font-bold text-sm mb-4">
                        {index + 1}
                      </div>
                      <h3
                        className="text-2xl font-bold mb-3"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {step.title}
                      </h3>
                      <p className="text-base text-(--color-text-muted) leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    <div
                      className={`pl-12 md:pl-0 ${isLeft ? "md:pl-16" : "md:pr-16"} md:[direction:ltr]`}
                    >
                      <div className="rounded-2xl border border-(--color-border) bg-(--color-bg) p-1.5 shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
                        <img
                          src={step.image}
                          alt={step.title}
                          className="rounded-xl w-full h-48 object-cover"
                          loading="lazy"
                          width={600}
                          height={192}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
