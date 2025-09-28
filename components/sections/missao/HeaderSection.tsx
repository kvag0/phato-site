"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ArrowDown, Shield, Target, Zap } from "lucide-react";
import { headerContent } from "@/app/missao/content";
import { useRef, useState } from "react";

gsap.registerPlugin(SplitText);

export default function HeaderSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const h1 = containerRef.current.querySelector("h1");
      const p = containerRef.current.querySelector("p");
      const arrow = containerRef.current.querySelector(".scroll-indicator");
      const icons = containerRef.current.querySelectorAll(".floating-icon");
      const buttons = containerRef.current.querySelectorAll("button");


      if (!h1 || !p || !arrow) {
        console.error("HeaderSection: Missing animation elements");
        setIsRevealed(true);
        return;
      }

      if (!h1.textContent || h1.textContent.trim() === "") {
        console.error("HeaderSection: No text content found");
        setIsRevealed(true);
        return;
      }
      
      // [PERFORMANCE-FIX]: The `gsap.set()` calls have been removed from here.
      // The initial state is now handled by Tailwind CSS classes in the JSX.

      const tl = gsap.timeline({
        onComplete: () => setIsRevealed(true),
      });

      const mySplitText = new SplitText(h1, { type: "words,chars" });
      const chars = mySplitText.chars;

      tl.from(chars, {
        opacity: 0,
        y: 20,
        ease: "power3.out",
        stagger: 0.02,
      })
        .to(p, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        }, "-=0.7")
        .to(buttons, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.1
        }, "<") // Animate buttons alongside the paragraph
        .to(arrow, {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          ease: "power1.inOut",
        }, "-=0.3")
        .to(icons, {
          autoAlpha: 1,
          y: 0,
          rotation: 0,
          duration: 1.5,
          ease: "elastic.out(1, 0.5)",
          stagger: {
            each: 0.1,
            from: "random",
          },
        }, "-=0.5");
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      id="header"
      data-animate
    >
      <div className="container relative z-10 mx-auto px-6 text-center">
        {/* [PERFORMANCE-FIX]: `opacity-0` and `translate-y-[30px]` are added to prevent FOUC. */}
        {/* GSAP will animate these properties TO their default state (opacity: 1, translate-y: 0). */}
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl leading-tight">
          {headerContent?.title || "Nossa Missão"}
        </h1>

        <p className="mx-auto mt-8 max-w-4xl text-lg text-muted-foreground md:text-xl lg:text-2xl leading-relaxed opacity-0 translate-y-[30px]">
          {headerContent?.subtitle || "Combatendo a desinformação com tecnologia avançada"}
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* [PERFORMANCE-FIX]: Buttons also get initial invisible state. */}
          <button className="px-8 py-4 bg-highlight rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-highlight/25 text-primary-foreground opacity-0 translate-y-[30px]">
            <span>Descubra a Verdade</span>
          </button>
          <button className="px-8 py-4 border border-highlight/30 text-highlight font-semibold rounded-lg hover:bg-highlight/10 transition-all duration-300 opacity-0 translate-y-[30px]">
            Junte-se à Missão
          </button>
        </div>
      </div>

      <div className="scroll-indicator absolute bottom-10 z-10 flex flex-col items-center gap-2 opacity-0">
        <span className="text-highlight/70 text-sm font-medium tracking-wider uppercase">Explore</span>
        <ArrowDown className="h-6 w-6 text-highlight animate-glow-pulse" />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[max(100vw,100vh)] h-[max(100vw,100vh)] z-0">
        <div className="floating-icon absolute top-[20%] left-[15%] w-12 h-12 flex items-center justify-center bg-highlight/5 border border-highlight/10 rounded-2xl shadow-lg shadow-highlight/5 text-highlight">
            <Shield/>
        </div>
        <div className="floating-icon absolute top-[30%] right-[10%] w-12 h-12 flex items-center justify-center bg-highlight/5 border border-highlight/10 rounded-2xl shadow-lg shadow-highlight/5 text-highlight">
            <Target/>
        </div>
        <div className="floating-icon absolute bottom-[25%] left-[25%] w-12 h-12 flex items-center justify-center bg-highlight/5 border border-highlight/10 rounded-2xl shadow-lg shadow-highlight/5 text-highlight">
            <Zap/>
        </div>
      </div>
    </section>
  );
}
