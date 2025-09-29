"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { principlesContent } from "@/app/missao/content";
import { Shield, Eye, Users, Leaf, ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const principleIcons = [Shield, Eye, Users, Leaf] as const;

const principleCommitments = [
  [
    "Código, metodologia e decisões auditáveis em tempo real.",
    "Dashboards públicos que expõem fontes, dados e revisões.",
    "Auditorias externas recorrentes para validar a integridade.",
  ],
  [
    "Apresentação lado a lado de narrativas e contrapontos.",
    "Registro imutável dos vieses identificados em cada matéria.",
    "Ciclos de revisão cruzada antes de publicar sínteses.",
  ],
  [
    "Ferramentas que transformam leituras em jornadas personalizadas.",
    "Contrapontos automáticos que desafiam a zona de conforto.",
    "Recursos de anotação e partilha para fortalecer a comunidade.",
  ],
  [
    "Uso ético dos dados apenas para benefício coletivo.",
    "Modelo de receita alinhado a impacto, não a publicidade invasiva.",
    "Controles de consentimento e portabilidade sempre ativos.",
  ],
];

export function PrinciplesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const cardsRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [selectedPrinciple, setSelectedPrinciple] = useState<number>(0);

  const principleDetails = useMemo(
    () =>
      principlesContent.principles.map((principle, index) => {
        const Icon = principleIcons[index] ?? Shield;
        return {
          ...principle,
          Icon,
          commitments: principleCommitments[index] ?? [],
        };
      }),
    []
  );

  const activeIndex = Math.min(selectedPrinciple, principleDetails.length - 1);
  const detail = principleDetails[activeIndex];

  if (!detail) {
    return null;
  }

  const handleSelect = useCallback((index: number) => {
    setSelectedPrinciple(index);
  }, []);

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const headerEls = containerRef.current.querySelectorAll(".principles-header-animate");
      const cards = containerRef.current.querySelectorAll(".principle-card");

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(headerEls, {
        opacity: 0,
        y: 24,
        stagger: 0.1,
        duration: 0.8,
      }).from(
        cards,
        {
          opacity: 0,
          y: 32,
          rotateX: -12,
          duration: 0.6,
          stagger: 0.1,
          transformOrigin: "center",
        },
        "-=0.4"
      );
    },
    { scope: containerRef }
  );

  useGSAP(
    () => {
      if (!detailRef.current) return;

      gsap.fromTo(
        detailRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    },
    { dependencies: [activeIndex] }
  );

  useGSAP(
    () => {
      const triggers: ScrollTrigger[] = cardsRefs.current
        .map((card, index) => {
          if (!card) return null;
          return ScrollTrigger.create({
            trigger: card,
            start: "top 60%",
            end: "bottom 40%",
            onEnter: () => setSelectedPrinciple(index),
            onEnterBack: () => setSelectedPrinciple(index),
          });
        })
        .filter(Boolean) as ScrollTrigger[];

      return () => {
        triggers.forEach((trigger) => trigger.kill());
      };
    },
    { dependencies: [principleDetails.length] }
  );

  return (
    <section
      ref={containerRef}
      className="relative py-[clamp(4rem,10vw,12rem)]"
      id="principles"
      data-animate
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="principles-header-animate text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
            {principlesContent.title}
          </h2>
          <p className="principles-header-animate text-lg md:text-xl text-muted-foreground leading-relaxed">
            {principlesContent.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,380px)_1fr] gap-10 lg:gap-14 items-start">
          <div
            ref={detailRef}
            className="relative border border-highlight/20 rounded-3xl bg-card/50 backdrop-blur-xl p-8 md:p-10 overflow-hidden lg:sticky lg:top-28"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-highlight/5 via-transparent to-highlight/10" />
            <div className="relative z-10">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl border border-highlight/30 bg-highlight/15 text-highlight">
                  <detail.Icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-highlight/80">Compromisso ativo</span>
                  <h3 className="mt-2 text-3xl font-bold text-foreground">{detail.title}</h3>
                  <p className="mt-2 text-sm font-semibold text-muted-foreground italic">“{detail.motto}”</p>
                </div>
              </div>

              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{detail.desc}</p>

              <div className="mt-8 space-y-4">
                {detail.commitments.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <ChevronRight className="mt-1.5 h-4 w-4 text-highlight" />
                    <p className="text-foreground leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-16 lg:gap-20">
            {principleDetails.map((principle, index) => {
              const isActive = index === activeIndex;
              const Icon = principle.Icon;
              return (
                <div
                  key={principle.title}
                  ref={(el) => {
                    cardsRefs.current[index] = el;
                  }}
                  className="principle-card"
                >
                  <button
                    type="button"
                    onClick={() => handleSelect(index)}
                    className={cn(
                      "w-full text-left rounded-3xl border border-border/40 bg-card/60 backdrop-blur-xl px-7 py-10 transition-all duration-300",
                      "hover:border-highlight/50 hover:-translate-y-1",
                      isActive && "border-highlight/60 bg-highlight/10 shadow-xl shadow-highlight/10"
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={cn(
                          "p-3 rounded-xl border border-border/40 text-highlight",
                          isActive ? "bg-highlight/20 border-highlight/40" : "bg-card"
                        )}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs uppercase tracking-widest text-muted-foreground">Princípio {index + 1}</span>
                        <h3 className="mt-2 text-xl font-semibold text-foreground">{principle.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground italic">{principle.motto}</p>
                      </div>
                    </div>
                    <p className="mt-6 text-base text-muted-foreground leading-relaxed">{principle.desc}</p>
                    <div className="mt-6 flex items-center gap-2 text-highlight text-sm font-medium">
                      <Sparkles className="w-4 h-4" />
                      Role para ver compromissos
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
