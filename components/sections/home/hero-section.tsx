"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { Button } from "@/components/ui/button";
import { ArrowDown, Zap } from "lucide-react";

gsap.registerPlugin(SplitText);

const HeroSection = () => {
  const containerRef = useRef<HTMLElement | null>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const heading = containerRef.current.querySelector("h1");
    if (!heading) return;

    const split = new SplitText(heading, { type: "words,chars" });
    const chars = split.chars;
    const subtitle = containerRef.current.querySelector("p");
    const buttons = containerRef.current.querySelectorAll("button");
    const scrollIndicator = containerRef.current.querySelector(".hero-scroll-indicator");

    const tl = gsap.timeline({ onComplete: () => split.revert() });

    tl.from(chars, {
      opacity: 0,
      y: 20,
      ease: "power3.out",
      stagger: 0.02,
      duration: 0.8,
    });

    if (subtitle) {
      tl.to(
        subtitle,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
        },
        "-=0.5"
      );
    }

    if (buttons.length > 0) {
      tl.to(
        buttons,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.1,
        },
        "<"
      );
    }

    if (scrollIndicator) {
      tl.to(
        scrollIndicator,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power1.inOut",
        },
        "-=0.3"
      );
    }

    return () => {
      split.revert();
      tl.kill();
    };
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen flex flex-col items-center justify-center text-center overflow-hidden px-4"
    >
      <div className="relative z-10 flex flex-col items-center animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold max-w-5xl tracking-tighter text-balance">
          A Reconquista do Phato
        </h1>

        {/* [COPY UPGRADE]: A nova copy é mais ativa, usando palavras do manifesto como "arsenal" e "confiança".
            Ela foca no que o usuário pode FAZER com a Phato.
        */}
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-balance opacity-0 translate-y-[30px]">
          A informação foi capturada. É hora de tomá-la de volta. Phato é o seu <strong className="text-foreground">arsenal de clareza</strong> para navegar a desinformação com contexto e confiança.
        </p>

        <div className="mt-10">
          {/* [COPY UPGRADE]: O CTA agora é um convite direto para se juntar à nossa missão.
              O efeito 'phato-glow' foi mantido para um visual premium.
          */}
          <Button
            size="lg"
            className="bg-[#ffbc59] text-primary-foreground hover:bg-highlight/90 px-8 py-6 text-base font-semibold phato-glow opacity-0 translate-y-[30px]"
          >
            <Zap className="w-5 h-5 mr-2" />
            Junte-se à Reconquista
          </Button>
        </div>
      </div>

      <div className="hero-scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-float opacity-0 translate-y-[20px]">
        <span className="text-sm">Role para explorar</span>
        <ArrowDown className="w-5 h-5" />
      </div>
    </section>
  );
};

export default HeroSection;
