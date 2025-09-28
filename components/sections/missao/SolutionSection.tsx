"use client";

import type React from "react";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { solutionContent } from "@/app/missao/content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, Scale, Users, PenTool, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, Flip);

const axisIcons: { [key: string]: React.ElementType } = {
    "Eixo Económico": Scale,
    "Eixo Social": Users,
    "Eixo de Autoridade": PenTool,
    "Eixo Epistemológico": Lightbulb,
};

export function SolutionSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const [isUnpacked, setIsUnpacked] = useState(false);
    
    const packageRef = useRef<HTMLDivElement>(null);
    const axisGridRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLButtonElement>(null);

    useGSAP(
        () => {
            const title = titleRef.current?.querySelector("h2");
            const subtitle = titleRef.current?.querySelector("p");

            gsap.to([title, subtitle], {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                stagger: 0.2,
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });

            gsap.from(packageRef.current, {
                opacity: 0,
                scale: 0.8,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: packageRef.current,
                    start: 'top 80%',
                }
            });

        }, { scope: containerRef });

    useGSAP(() => {
        if (!packageRef.current || !axisGridRef.current || !ctaRef.current) return;

        // [TS-FIX]: Explicitly type the arrays from gsap.utils.toArray.
        const packageElements = gsap.utils.toArray<HTMLElement>(".package-element");
        const axisCards = gsap.utils.toArray<HTMLElement>(".axis-card");
        
        const packageState = Flip.getState(packageElements);

        if (isUnpacked) {
            axisGridRef.current.classList.remove('hidden');
            axisGridRef.current.classList.add('grid');
            packageRef.current.classList.add('unpacked');

            gsap.to(ctaRef.current, { opacity: 0, y: 10, duration: 0.3, ease: 'power2.in' });

            Flip.from(packageState, {
                targets: axisCards,
                duration: 1,
                scale: true,
                ease: "expo.inOut",
                stagger: 0.1,
                onComplete: () => {
                     gsap.to(axisCards, { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 });
                }
            });
        }

    }, { dependencies: [isUnpacked] });

    return (
        <section ref={containerRef} className="relative bg-background py-[clamp(4rem,12vw,15rem)] overflow-hidden" data-animate>
            <div className="absolute inset-0 bg-mesh-gradient opacity-40 z-0"></div>
            <div className="absolute inset-0 bg-[url('https://www.publicdomainpictures.net/pictures/460000/velka/abstract-background-1673273117u5t.jpg')] bg-cover bg-center opacity-5 mix-blend-soft-light"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 opacity-0 translate-y-8">
                        {solutionContent.title}
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mx-auto opacity-0 translate-y-8">
                        {solutionContent.subtitle}
                    </p>
                </div>

                <div className="relative min-h-[500px] flex flex-col items-center justify-center">
                    <div ref={axisGridRef} className="hidden grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
                        {/* [TS-FIX]: Explicitly type parameters and access correct data property. */}
                        {solutionContent.biasAxes.map((axis: {title: string, desc: string}, index: number) => {
                            const Icon = axisIcons[axis.title] || BrainCircuit;
                            return (
                                <div key={axis.title} className="axis-card opacity-0 translate-y-4">
                                    <Card className="h-full bg-card/60 backdrop-blur-lg border border-border/20 p-6 rounded-xl shadow-lg transition-colors duration-300 hover:border-highlight/40">
                                        <CardHeader className="flex flex-row items-center gap-4 p-0 mb-3">
                                            <div className="p-3 bg-highlight/10 text-highlight rounded-lg border border-highlight/20">
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <CardTitle className="text-xl text-foreground">{axis.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-0">
                                            <p className="text-muted-foreground leading-relaxed">{axis.desc}</p>
                                        </CardContent>
                                    </Card>
                                </div>
                            );
                        })}
                    </div>
                    
                    <div ref={packageRef} className={cn("absolute inset-0 flex items-center justify-center transition-opacity duration-500", isUnpacked && "opacity-0 pointer-events-none")}>
                        <div className="relative w-64 h-64">
                            <div className="package-element absolute top-0 left-0 w-32 h-32 bg-highlight/5 border border-highlight/20 rounded-2xl animate-float"></div>
                            <div className="package-element absolute bottom-0 right-0 w-40 h-40 bg-highlight/5 border border-highlight/20 rounded-2xl animate-float" style={{animationDelay: '0.5s'}}></div>
                            <div className="package-element absolute top-1/2 left-1/2 w-24 h-24 bg-highlight/10 border border-highlight/30 rounded-2xl phato-pulse -translate-x-1/2 -translate-y-1/2"></div>
                            <div className="package-element absolute top-[20%] right-[15%] w-20 h-20 bg-highlight/5 border border-highlight/20 rounded-2xl animate-float" style={{animationDelay: '0.2s'}}></div>
                            <img src="https://image.net-beta.com/static/free-images/glowing-abstract-pattern-on-black-background.jpg" alt="Pacote Ideológico" className="absolute inset-0 w-full h-full object-cover rounded-3xl mix-blend-lighten opacity-30 animate-pulse"/>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <button ref={ctaRef} onClick={() => setIsUnpacked(true)} disabled={isUnpacked} className={cn("px-8 py-4 bg-highlight rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg text-primary-foreground hover:shadow-highlight/25", isUnpacked && "opacity-0 pointer-events-none")}>
                        Desempacotar a Verdade
                    </button>
                </div>
            </div>
        </section>
    );
}

