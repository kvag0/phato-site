"use client";

import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { principlesContent } from "@/app/missao/content";
import { Shield, Eye, Users, Leaf } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function PrinciplesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const descriptionContainerRef = useRef<HTMLDivElement>(null);
  
  // [REFACTOR]: Default to the first principle being selected to prevent layout shifts.
  const [selectedPrinciple, setSelectedPrinciple] = useState<number>(0);

  const cardPositions = [
    { top: "15%", left: "20%", icon: Shield },
    { top: "25%", left: "70%", icon: Eye },
    { top: "65%", left: "15%", icon: Users },
    { top: "70%", left: "65%", icon: Leaf },
  ];
  
  const connectionPaths = [
    "M25% 25% Q 50% 15% 75% 35%", 
    "M25% 25% Q 15% 45% 20% 75%", 
    "M75% 35% Q 85% 55% 70% 75%",
    "M20% 75% Q 45% 85% 70% 75%",
  ];

  // Entry animation for the whole section
  useGSAP(
    () => {
      if (!containerRef.current) return;
      
      const title = containerRef.current.querySelector('.section-title');
      const subtitle = containerRef.current.querySelector('.section-subtitle');
      const nodes = gsap.utils.toArray<HTMLElement>('.principle-node');
      const paths = gsap.utils.toArray<SVGPathElement>('.connection-path');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      });

      tl.to([title, subtitle], {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out'
        })
        .to(nodes, {
            duration: 1,
            opacity: 1,
            scale: 1,
            ease: "elastic.out(1, 0.5)",
            stagger: 0.1,
        }, "-=0.5")
        .from(paths, {
            strokeDashoffset: 400,
            duration: 1.5,
            ease: 'power2.inOut',
            stagger: 0.2
        }, "<");
    },
    { scope: containerRef }
  );
  
  // [REFACTOR]: Animation for focus and description text change
  useGSAP(() => {
      const nodes = gsap.utils.toArray<HTMLElement>('.principle-node');
      const activeNode = nodes[selectedPrinciple];
      const inactiveNodes = nodes.filter((_, i) => i !== selectedPrinciple);

      // Animate focus on nodes
      if (activeNode) {
          gsap.to(activeNode, { opacity: 1, scale: 1.05, filter: 'blur(0px)', duration: 0.4, ease: 'power3.out', overwrite: true });
      }
      if (inactiveNodes.length > 0) {
          gsap.to(inactiveNodes, { opacity: 0.4, scale: 1, filter: 'blur(1px)', duration: 0.4, ease: 'power3.out', overwrite: true });
      }

      // Animate description text
      if (descriptionContainerRef.current) {
          const title = descriptionContainerRef.current.querySelector('h3');
          const desc = descriptionContainerRef.current.querySelector('p');
          gsap.fromTo([title, desc], 
              { opacity: 0, y: 15 }, 
              { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power3.out', overwrite: true }
          );
      }

  }, [selectedPrinciple]);

  return (
    <section
      ref={containerRef}
      className="relative py-[clamp(4rem,12vw,15rem)] overflow-hidden"
      id="principles"
      data-animate
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-[clamp(3rem,8vw,6rem)]">
          <h2 className="section-title text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 opacity-0 translate-y-8">
            {principlesContent.title}
          </h2>
          <p className="section-subtitle text-lg md:text-xl text-muted-foreground leading-relaxed opacity-0 translate-y-8">
            {principlesContent.subtitle}
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto aspect-[4/3]">
           <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 100 75"
          >
            {connectionPaths.map((d, index) => (
              <path
                key={index}
                className="connection-path"
                d={d}
                fill="none"
                stroke="url(#line-gradient)"
                strokeWidth="0.5"
                strokeDasharray="400"
                strokeDashoffset="0"
              />
            ))}
             <defs>
              <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--highlight) / 0.1)" />
                <stop offset="50%" stopColor="hsl(var(--highlight) / 0.5)" />
                <stop offset="100%" stopColor="hsl(var(--highlight) / 0.1)" />
              </linearGradient>
            </defs>
          </svg>

          {principlesContent.principles.map((principle, index) => {
             const Icon = cardPositions[index].icon;
             return(
              <div
                key={index}
                className="principle-node absolute z-10 p-4 md:p-6 w-48 md:w-64 bg-card/40 backdrop-blur-lg border border-border/20 rounded-xl shadow-lg transition-colors duration-300 hover:border-highlight/50 cursor-pointer opacity-0 scale-90"
                style={{
                  top: cardPositions[index].top,
                  left: cardPositions[index].left,
                  transform: 'translate(-50%, -50%)'
                }}
                onMouseEnter={() => setSelectedPrinciple(index)}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-highlight/10 rounded-lg border border-highlight/20 text-highlight">
                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-foreground mb-1">{principle.title}</h3>
                    <p className="font-medium text-highlight italic text-xs md:text-sm">"{principle.motto}"</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        
        {/* [REFACTOR] Dedicated description area to prevent layout shifts */}
        <div className="relative mt-12 max-w-3xl mx-auto text-center h-28">
            <div ref={descriptionContainerRef} className="absolute inset-0 flex flex-col items-center justify-center">
                <h3 className="text-xl font-bold text-highlight mb-3">{principlesContent.principles[selectedPrinciple].title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">{principlesContent.principles[selectedPrinciple].desc}</p>
            </div>
        </div>

      </div>
    </section>
  );
}

