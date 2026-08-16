import { useEffect, useRef } from "react";
import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import HowItWorksSection from "../components/landing/HowItWorksSection";
import CTASection from "../components/landing/CTASection";
import Footer from "../components/landing/Footer";

const floatingAnimationsCSS = `
  @keyframes float-1 {
    0%, 100% { transform: translateY(0px) translateX(0px); }
    50% { transform: translateY(-15px) translateX(5px); }
  }
  @keyframes float-2 {
    0%, 100% { transform: translateY(0px) translateX(0px); }
    50% { transform: translateY(15px) translateX(-5px); }
  }
  .float-anim-1 { animation: float-1 6s ease-in-out infinite; }
  .float-anim-2 { animation: float-2 7s ease-in-out infinite; }
`;

export default function LandingPage() {
  const main = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: gsap.Context;
    let isMounted = true;

    const initAnimations = async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      if (!isMounted) return;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
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
    };

    initAnimations();

    return () => {
      isMounted = false;
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div
      ref={main}
      className="bg-(--color-bg) text-(--color-text) font-sans overflow-x-hidden relative"
    >
      <style>{floatingAnimationsCSS}</style>

      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-200 h-200 bg-(--color-primary)/5 rounded-full blur-[120px] z-0"></div>

      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </div>
  );
}
