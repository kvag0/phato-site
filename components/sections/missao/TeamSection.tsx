"use client";

import { useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { teamMembers } from "@/app/missao/content";
import { Users, Linkedin, Mail, X, Award } from "lucide-react";
import React from "react";

gsap.registerPlugin(ScrollTrigger);

type TeamSectionProps = {
  members: typeof teamMembers;
};

export function TeamSection({ members }: TeamSectionProps) {
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const safeMembers = Array.isArray(members) ? members : [];

  // --- Initial entrance animation ---
  useGSAP(
    () => {
      if (!containerRef.current || safeMembers.length === 0) return;

      const cards = gsap.utils.toArray<HTMLDivElement>(".team-card");
      const title = containerRef.current.querySelector("h2");
      const subtitle = containerRef.current.querySelector("p");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      tl.to(title, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out'
        })
        .to(subtitle, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, "-=0.6")
        .to(cards, {
            autoAlpha: 1,
            y: 0,
            rotationY: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.15,
        }, "-=0.5");

    },
    { scope: containerRef }
  );
  
  // --- Animate modal in/out ---
  useGSAP(() => {
    if (selectedMember !== null) {
      gsap.to(modalRef.current, { autoAlpha: 1, duration: 0.3 });
      gsap.fromTo('.modal-content', {opacity: 0, scale: 0.95, y: 20}, {opacity: 1, scale: 1, y: 0, duration: 0.3, delay: 0.1, ease: 'power2.out'})
    } else {
      gsap.to(modalRef.current, { autoAlpha: 0, duration: 0.3 });
    }
  }, { dependencies: [selectedMember] });

  // [UI-IMPROVEMENT]: 3D tilt micro-interaction.
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;

    const rotateX = -y / (height / 2) * 10;
    const rotateY = x / (width / 2) * 10;

    gsap.to(card, {
      rotationX: rotateX,
      rotationY: rotateY,
      transformPerspective: 1000,
      scale: 1.05,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
    });
  };


  return (
    <section
      ref={containerRef}
      id="team"
      className="py-[clamp(4rem,12vw,15rem)] relative overflow-hidden"
      data-animate
    >
        <div className="absolute inset-0 bg-mesh-gradient opacity-20"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-[clamp(3rem,8vw,6rem)]">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 opacity-0 translate-y-8">
            Os Arquitetos da Missão
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed opacity-0 translate-y-8">
            Uma equipe multidisciplinar unida por um propósito: construir um ecossistema de informação mais saudável.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 [perspective:1200px]">
          {safeMembers.map((member, index) => (
            <div
              key={index}
              className="team-card opacity-0 translate-y-20 [transform:rotateY(-45deg)] bg-card/40 backdrop-blur-lg border border-border/20 rounded-xl text-center p-6 cursor-pointer group transition-colors duration-300 hover:border-highlight/50"
              onClick={() => setSelectedMember(index)}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="relative w-24 h-24 mx-auto rounded-full border-2 border-highlight/30 p-1 mb-4">
                 <div className="absolute inset-0 rounded-full bg-highlight/10 animate-pulse group-hover:animate-none"></div>
                 <img
                    src={`https://placehold.co/100x100/1a1a1a/ffbc59?text=${member.name.charAt(0)}`}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover relative z-10 transition-opacity duration-300 group-hover:opacity-10"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-center p-2">
                         {(member.expertise || []).slice(0, 2).map((skill, skillIndex) => (
                            <span key={skillIndex} className="block text-xs font-semibold text-highlight leading-tight mb-1">{skill}</span>
                        ))}
                    </div>
                </div>
              </div>
              <h3 className="font-bold text-foreground text-lg">{member.name}</h3>
              <p className="text-highlight text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Modal remains unchanged */}
      {selectedMember !== null && (
        <div
          ref={modalRef}
          className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-4 invisible"
          onClick={() => setSelectedMember(null)}
        >
          <div className="modal-content max-w-2xl w-full bg-card border-2 border-border/30 rounded-2xl shadow-2xl shadow-highlight/10 p-8" onClick={(e) => e.stopPropagation()}>
             <button onClick={() => setSelectedMember(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-highlight transition-colors">
                <X/>
             </button>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0 text-center">
                 <img
                    src={`https://placehold.co/120x120/1a1a1a/ffbc59?text=${safeMembers[selectedMember].name.charAt(0)}`}
                    alt={safeMembers[selectedMember].name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-highlight/50"
                />
                 <h2 className="text-2xl font-bold text-foreground mt-4">{safeMembers[selectedMember].name}</h2>
                <p className="text-highlight">{safeMembers[selectedMember].role}</p>
              </div>
              
              <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">{safeMembers[selectedMember].bio}</p>
                   <div className="flex flex-wrap gap-2">
                    {(safeMembers[selectedMember].expertise || []).map((skill, skillIndex) => (
                      <span key={skillIndex} className="px-3 py-1 bg-highlight/10 text-highlight text-xs font-medium rounded-full border border-highlight/20">
                        {skill}
                      </span>
                    ))}
                  </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}

