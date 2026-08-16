import { useEffect, useRef, memo } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const floatingCardsData = [
  {
    src: "/image-1.png",
    alt: "Wallet App",
    side: "left",
    classes: "top-[12%] left-[5%] w-48 -rotate-6 z-10",
  },
  {
    src: "/image-2.png",
    alt: "Analytics Dashboard",
    side: "left",
    classes: "top-[33%] left-[1%] w-64 rotate-3 z-30",
  },
  {
    src: "/image-3.png",
    alt: "Mobile Payment",
    side: "left",
    classes: "bottom-[24%] left-[8%] w-44 -rotate-12 z-10",
  },
  {
    src: "/image-4.png",
    alt: "Finance Chart",
    side: "right",
    classes: "top-[12%] right-[5%] w-48 rotate-6 z-10",
  },
  {
    src: "/image-5.png",
    alt: "Expense Calculator",
    side: "right",
    classes: "top-[33%] right-[1%] w-64 -rotate-3 z-30",
  },
  {
    src: "/image-6.png",
    alt: "Transaction History",
    side: "right",
    classes: "bottom-[24%] right-[8%] w-44 rotate-12 z-10",
  },
];

const FloatingCard = memo(
  ({
    src,
    alt,
    side,
    classes,
  }: {
    src: string;
    alt: string;
    side: string;
    classes: string;
  }) => (
    <div
      className={`floating-card ${side}-card hidden lg:block absolute ${classes}`}
    >
      <div className="bg-(--color-surface)/90 backdrop-blur-sm border border-(--color-border) rounded-2xl p-1.5 shadow-2xl">
        <img
          src={src}
          alt={alt}
          className="rounded-xl w-full h-auto object-cover aspect-4/3"
          loading="lazy"
          width={400}
          height={300}
        />
      </div>
    </div>
  ),
);
FloatingCard.displayName = "FloatingCard";

export default function HeroSection() {
  const main = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: gsap.Context;
    let isMounted = true;

    const initAnimations = async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      if (!isMounted) return;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".floating-card");

        gsap.set(cards, { opacity: 0, y: 60, scale: 0.9 });

        gsap.to(cards, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.3,
        });

        cards.forEach((card) => {
          const isLeft = card.classList.contains("left-card");

          gsap.fromTo(
            card,
            { x: 0, y: 0, opacity: 1, scale: 1 },
            {
              x: isLeft ? -120 : 120,
              y: 80,
              opacity: 0,
              scale: 0.85,
              ease: "none",
              immediateRender: false,
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
    };

    initAnimations();

    return () => {
      isMounted = false;
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      ref={main}
      className="hero-section relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-4 overflow-hidden"
    >
      <div className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 w-200 h-200 bg-(--color-primary)/5 rounded-full blur-[120px] z-0"></div>

      <div className="relative z-20 text-center max-w-3xl mx-auto flex flex-col items-center">
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-(--color-text) mb-8"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Spli expenses, <br /> not friendships.
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
            Get Started <FiArrowRight size={18} />
          </Link>
          <a
            href="#features"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-(--color-surface)/60 backdrop-blur-md hover:bg-(--color-surface-strong) text-(--color-text) border border-(--color-border) font-semibold rounded-lg py-4 px-8 transition-colors text-base"
          >
            Discover More
          </a>
        </div>
      </div>

      {floatingCardsData.map((card, index) => (
        <FloatingCard
          key={index}
          src={card.src}
          alt={card.alt}
          side={card.side}
          classes={card.classes}
        />
      ))}

      <div className="relative z-20 mt-32 w-full max-w-4xl mx-auto text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-(--color-text-soft) mb-8">
          Perfect for managing shared finances for
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 opacity-50">
          <span className="text-xl font-bold text-(--color-text-muted)">
            Roommates
          </span>
          <span className="text-xl font-bold text-(--color-text-muted)">
            Travel Groups
          </span>
          <span className="text-xl font-bold text-(--color-text-muted)">
            Couples
          </span>
          <span className="text-xl font-bold text-(--color-text-muted)">
            Project Teams
          </span>
          <span className="text-xl font-bold text-(--color-text-muted)">
            Friends
          </span>
        </div>
      </div>
    </section>
  );
}
