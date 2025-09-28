"use client";

import { useRef } from "react";
import { Navigation } from "@/components/navigation";
import { useAnimateOnScroll } from "@/app/hooks/useAnimateOnScroll";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { teamMembers } from "./content";
import HeaderSection from "@/components/sections/missao/HeaderSection";
import { ProblemSection } from "@/components/sections/missao/ProblemSection";
import { SolutionSection } from "@/components/sections/missao/SolutionSection";
import { PrinciplesSection } from "@/components/sections/missao/PrinciplesSection";
import { TeamSection } from "@/components/sections/missao/TeamSection";
import BiasTestCtaSection from "@/components/sections/home/bias-test-cta-section";
import { Footer } from "@/components/footer";

gsap.registerPlugin(ScrollTrigger);

export default function MissaoPage() {
  const mainContainerRef = useRef<HTMLDivElement>(null);
  
  // The `useAnimateOnScroll` hook can be kept for potential future animation triggers.
  useAnimateOnScroll(mainContainerRef);

  return (
    <div ref={mainContainerRef} className="bg-background text-foreground">
      <Navigation />

      {/* [REFACTOR]: Removed z-index wrappers. The sections now manage their own stacking context. */}
      <main>
        <HeaderSection />
        <ProblemSection />
        <SolutionSection />
        <PrinciplesSection />
        <TeamSection members={teamMembers} />
        <BiasTestCtaSection />
      </main>

      <Footer />
    </div>
  );
}

