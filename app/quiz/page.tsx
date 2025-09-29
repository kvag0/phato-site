"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ArrowRight, Dna, Lightbulb, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

gsap.registerPlugin(SplitText);

// Componente da Página de Entrada do Quiz
export default function QuizLandingPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleStartQuiz = () => {
    // [NAVIGATION]: Redireciona para a página do teste.
    router.push("/quiz/teste");
  };

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const heading = containerRef.current.querySelector("h1");
      if (!heading) return;

      const split = new SplitText(heading, { type: "words,chars" });
      const chars = split.chars;
      const subtitle = containerRef.current.querySelector("[data-quiz-subtitle]");
      const cards = containerRef.current.querySelectorAll("[data-quiz-card]");
      const cta = containerRef.current.querySelector("[data-quiz-cta]");
      const meta = containerRef.current.querySelector("[data-quiz-meta]");

      const tl = gsap.timeline({
        onComplete: () => split.revert(),
      });

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

      if (cards.length) {
        tl.fromTo(
          cards,
          {
            opacity: 0,
            y: 30,
          },
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

      if (cta) {
        tl.to(
          cta,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "<"
        );
      }

      if (meta) {
        tl.to(
          meta,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power1.inOut",
          },
          "-=0.2"
        );
      }

      return () => {
        split.revert();
        tl.kill();
      };
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="bg-[#0d0d0d] text-[#E0E0E0] font-sans min-h-screen px-4 pt-32 md:pt-40 pb-24 md:pb-32"
    >
      <div className="container mx-auto max-w-4xl text-center space-y-12">

        {/* [ANIMATION]: O título pode ter um efeito de gradiente animado ou fade-in. */}
        <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#ffbc59]">
          Qual é o seu DNA de Pensamento?
        </h1>

        <p
          data-quiz-subtitle
          className="text-lg md:text-xl max-w-3xl mx-auto text-[#a3a3a3] text-balance opacity-0 translate-y-[30px]"
        >
          Esqueça os rótulos de "esquerda" e "direita". O nosso quiz foi desenhado para desempacotar as suas ideias, não para as encaixotar. Descubra a forma única do seu pensamento em 4 eixos fundamentais.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card
              data-quiz-card
              className="bg-[#0d0d0d]/50 border-[#3d3d3d] text-center p-4 opacity-0 translate-y-[30px] transition-all duration-300 transform-gpu hover:-translate-y-2 hover:border-[#ffbc59]/60 hover:bg-[#141414]/80 hover:shadow-[0_25px_50px_-12px_rgba(255,188,89,0.3)]"
            >
                <CardContent className="p-2">
                    <Scale className="w-10 h-10 mx-auto text-[#ffbc59] mb-4"/>
                    <h3 className="text-lg font-semibold">Económico & Social</h3>
                    <p className="text-sm text-[#a3a3a3]">Explore as suas visões sobre o papel do estado e os valores da sociedade.</p>
                </CardContent>
            </Card>
            <Card
              data-quiz-card
              className="bg-[#0d0d0d]/50 border-[#3d3d3d] text-center p-4 opacity-0 translate-y-[30px] transition-all duration-300 transform-gpu hover:-translate-y-2 hover:border-[#ffbc59]/60 hover:bg-[#141414]/80 hover:shadow-[0_25px_50px_-12px_rgba(255,188,89,0.3)]"
            >
                <CardContent className="p-2">
                    <Dna className="w-10 h-10 mx-auto text-[#ffbc59] mb-4"/>
                    <h3 className="text-lg font-semibold">Autoridade & Autonomia</h3>
                    <p className="text-sm text-[#a3a3a3]">Descubra o seu equilíbrio entre liberdade individual e ordem coletiva.</p>
                </CardContent>
            </Card>
            <Card
              data-quiz-card
              className="bg-[#0d0d0d]/50 border-[#3d3d3d] text-center p-4 opacity-0 translate-y-[30px] transition-all duration-300 transform-gpu hover:-translate-y-2 hover:border-[#ffbc59]/60 hover:bg-[#141414]/80 hover:shadow-[0_25px_50px_-12px_rgba(255,188,89,0.3)]"
            >
                <CardContent className="p-2">
                    <Lightbulb className="w-10 h-10 mx-auto text-[#ffbc59] mb-4"/>
                    <h3 className="text-lg font-semibold">Abordagem à Verdade</h3>
                     <p className="text-sm text-[#a3a3a3]">Analítico ou intuitivo? Veja como constrói as suas convicções.</p>
                </CardContent>
            </Card>
        </div>

        <div className="pt-8">
          <Button 
            size="lg" 
            data-quiz-cta
            className="bg-[#ffbc59] text-black hover:bg-[#ffbc59]/90 text-xl px-10 py-7 phato-glow opacity-0 translate-y-[30px]"
            onClick={handleStartQuiz}
          >
            Começar a Descoberta
            <ArrowRight className="w-6 h-6 ml-3"/>
          </Button>
        </div>

        <p
          data-quiz-meta
          className="text-sm text-[#a3a3a3] pt-4 opacity-0 translate-y-[20px]"
        >
          Leva menos de 5 minutos. Sem respostas certas ou erradas.
        </p>

      </div>
    </div>
  );
}
