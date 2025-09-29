"use client";

import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { problemContent } from "@/app/missao/content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, DivideCircle, Package, Zap, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const stepIcons: { [key: string]: React.ElementType } = {
    step1: DivideCircle,
    step2: Package,
    step3: Zap,
    step4: Eye,
};

type BlueprintStep = {
    id: string;
    name: string;
    description: string;
};

export function ProblemSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number | null>(0);

  useGSAP(
    () => {
      if (!containerRef.current) return;
        
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        if (!stepsRef.current) return;

        const steps = Array.from(stepsRef.current.querySelectorAll<HTMLElement>(".step-card"));

        const stepTriggers = steps.map((step, i) =>
          ScrollTrigger.create({
            trigger: step,
            start: "top center",
            end: "bottom center",
            onToggle: self => self.isActive && setActiveStep(i),
          })
        );

        return () => {
          stepTriggers.forEach(trigger => trigger.kill());
        };
      });

      return () => {
        mm.revert();
      };
    },
    { scope: containerRef }
  );
  
  return (
    <section
      ref={containerRef}
      className="w-full py-[clamp(4rem,12vw,15rem)] relative bg-background"
      id="problem"
      data-animate
    >
      <div className="max-w-3xl mx-auto text-center px-6 mb-16">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
          {problemContent.title}
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          {problemContent.subtitle || "A inércia cognitiva é o nosso principal adversário. Esta é a anatomia."}
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 px-6">
        <div className="lg:sticky top-0 h-screen flex items-center justify-center">
          <div className="w-full h-3/4 bg-card/50 rounded-lg border border-border flex items-center justify-center p-8">
            <span className="text-secondary-text text-center">
              [Placeholder para visual interativo da Anatomia da Distração]
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-16 lg:gap-[50vh]" ref={stepsRef}>
          {problemContent.blueprint.steps.map((step: BlueprintStep, index: number) => {
            const Icon = stepIcons[step.id] || AlertTriangle;
            return (
              <div
                key={step.id}
                id={step.id}
                className="step-card min-h-[50vh] flex flex-col justify-center"
              >
                <Card
                  className={cn(
                    "transition-all duration-300 bg-transparent",
                    activeStep === index
                      ? "border-highlight/40 shadow-xl shadow-highlight/10 bg-card/30"
                      : "border-transparent"
                  )}
                >
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-2">
                      <div
                        className={cn(
                          "p-2 rounded-lg transition-colors duration-300",
                          activeStep === index
                            ? "bg-highlight/10 text-highlight"
                            : "bg-card text-muted-foreground"
                        )}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span
                        className={cn(
                          "text-sm font-bold uppercase tracking-widest",
                          activeStep === index ? "text-highlight" : "text-muted-foreground"
                        )}
                      >
                        Passo {index + 1}
                      </span>
                    </div>
                    <CardTitle className="text-2xl text-foreground">{step.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
