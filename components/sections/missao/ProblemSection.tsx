"use client";

import React, { useRef, useState, useEffect } from "react";
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

// [UI-REFACTOR]: Particle simulation logic for the Ideological Funnel
const ParticleSystem = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d')!;
    let particles: any[] = [];
    let animationFrameId: number;
    let funnelWidth = 1; // 1 = 100% width

    const resize = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        particles = [];
        for (let i = 0; i < 150; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                color: `hsla(${Math.random() * 360}, 70%, 60%, 0.8)`,
            });
        }
    };

    const update = () => {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const centerX = canvas.width / 2;
        const funnelHalfWidth = (canvas.width / 2) * funnelWidth;

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            // Constrain particles within the funnel
            const leftBoundary = centerX - funnelHalfWidth;
            const rightBoundary = centerX + funnelHalfWidth;

            if (p.x < leftBoundary || p.x > rightBoundary) {
                p.vx *= -0.9; // Bounce off the funnel walls
                p.x = Math.max(leftBoundary, Math.min(rightBoundary, p.x));
            }
            if (p.y < 0 || p.y > canvas.height) {
                p.vy *= -1;
                 p.y = Math.max(0, Math.min(canvas.height, p.y));
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });

        animationFrameId = requestAnimationFrame(update);
    };

    resize();
    update();

    return {
        setFunnelWidth: (width: number) => {
            funnelWidth = width;
        },
        cleanup: () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resize);
        }
    };
};

export function ProblemSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLUListElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particleSystemRef = useRef<ReturnType<typeof ParticleSystem> | null>(null);
  const [activeStep, setActiveStep] = useState<number | null>(0);

  useEffect(() => {
    if (canvasRef.current) {
        particleSystemRef.current = ParticleSystem(canvasRef.current);
    }
    return () => {
        particleSystemRef.current?.cleanup();
    };
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current) return;
        
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const stepsContainer = stepsRef.current;
        const stickyContainer = stickyRef.current;
        if (!stepsContainer || !stickyContainer) return;

        const steps = gsap.utils.toArray<HTMLElement>(".step-card");
        
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: stepsContainer,
                start: 'top top',
                end: `+=${stepsContainer.offsetHeight - window.innerHeight}`,
                scrub: 1,
                pin: stickyContainer,
                pinSpacing: true,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    // Update the funnel width based on scroll progress
                    const progress = self.progress;
                    const funnelWidth = 1 - (progress * 0.9); // Narrows down to 10%
                    particleSystemRef.current?.setFunnelWidth(funnelWidth);
                },
            }
        });

        steps.forEach((step, i) => {
            ScrollTrigger.create({
                trigger: step,
                start: "top center",
                end: "bottom center",
                onToggle: self => self.isActive && setActiveStep(i),
            });
        });

        return () => {
          ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
      });

    },
    { scope: containerRef }
  );
  
  return (
    <section ref={containerRef} className="relative bg-background" id="problem" data-animate>
        <div className="container mx-auto px-6 relative z-10 pt-[clamp(4rem,12vw,15rem)]">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
                    {problemContent.title}
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    A inércia cognitiva é o nosso principal adversário. Esta é a anatomia.
                </p>
            </div>
        </div>

        <div className="container mx-auto px-6 md:grid md:grid-cols-2 md:gap-16 items-center">
            <div ref={stickyRef} className="h-screen md:flex flex-col justify-center items-center hidden">
                {/* [UI-REFACTOR]: Ideological Funnel Visualization */}
                <div className="w-full h-full flex justify-center items-center relative">
                    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"></canvas>
                    {/* Funnel visual overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background pointer-events-none"></div>
                </div>
            </div>

            <div className="relative z-10">
                <div className="text-center md:text-left mb-8 pt-16">
                     <h3 className="text-2xl font-bold text-foreground">{problemContent.blueprint.title}</h3>
                </div>
                <ul ref={stepsRef} className="space-y-8 md:space-y-32 pb-[calc(100vh-200px)]">
                    {problemContent.blueprint.steps.map((step: BlueprintStep, index: number) => {
                        const Icon = stepIcons[step.id] || AlertTriangle;
                        return (
                        <li key={step.id} id={step.id} className="step-card min-h-[200px]">
                            <Card className={cn("transition-all duration-300 bg-transparent", activeStep === index ? 'border-highlight/40 shadow-xl shadow-highlight/10 bg-card/30' : 'border-transparent')}>
                                <CardHeader>
                                    <div className="flex items-center gap-4 mb-2">
                                        <div className={cn("p-2 rounded-lg transition-colors duration-300", activeStep === index ? 'bg-highlight/10 text-highlight' : 'bg-card text-muted-foreground')}>
                                            <Icon className="w-5 h-5"/>
                                        </div>
                                        <span className={cn("text-sm font-bold uppercase tracking-widest", activeStep === index ? 'text-highlight' : 'text-muted-foreground')}>Passo {index + 1}</span>
                                    </div>
                                    <CardTitle className="text-2xl text-foreground">{step.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                                </CardContent>
                            </Card>
                        </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    </section>
  );
}

