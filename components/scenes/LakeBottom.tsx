"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button"; // Usando o Button do Shadcn/UI

gsap.registerPlugin(ScrollTrigger);

// [COMPONENT]: Componente para o fundo do lago, incluindo paginação e CTA.
export const LakeBottom = () => {
  const containerRef = useRef<HTMLElement>(null);

  // [ANIMATION]: Animação de entrada para os elementos do fundo do lago.
  useGSAP(() => {
    // Animação para as pedras com um efeito escalonado (stagger)
    gsap.from(".rock-item", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
      opacity: 0,
      y: 50,
      duration: 0.6,
      stagger: 0.1, // Atraso entre a animação de cada pedra
      ease: "power2.out",
    });

    // Animação para o bloco de texto e controles
    gsap.from(".fade-in-bottom", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power2.out",
    });

  }, { scope: containerRef });
  
  // [HANDLER]: Função para rolar suavemente de volta ao topo da página.
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section 
      ref={containerRef}
      className="relative py-20 bg-gradient-to-b from-[#1e3a8a] to-[#1e293b] overflow-hidden"
    >
      <div className="container mx-auto px-6 text-center">
        
        {/* [VISUAL]: Placeholders para as pedras no fundo do lago */}
        <div className="flex justify-center items-end mb-12 space-x-4">
          <div className="rock-item w-16 h-12 bg-gray-600/50 rounded-t-full"></div>
          <div className="rock-item w-20 h-16 bg-gray-700/60 rounded-t-full"></div>
          <div className="rock-item w-12 h-8 bg-gray-500/50 rounded-t-full"></div>
          <div className="rock-item w-24 h-20 bg-gray-800/70 rounded-t-full"></div>
          <div className="rock-item w-14 h-10 bg-gray-600/50 rounded-t-full"></div>
        </div>

        <div className="fade-in-bottom">
          <h3 className="text-3xl font-bold text-white mb-8 text-balance">
            Chegou ao fundo do lago
          </h3>
          <p className="text-blue-200 text-lg mb-12 max-w-2xl mx-auto text-pretty">
            Explore mais conteúdo ou navegue para outras seções do nosso ecossistema de conhecimento.
          </p>

          {/* [PAGINATION]: Controles de navegação entre páginas de conteúdo */}
          <div className="flex justify-center items-center space-x-2 sm:space-x-4 mb-12">
            <Button variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20 text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>
            <div className="flex space-x-2">
              <Button size="icon" className="bg-[#ffbc59] text-black hover:bg-yellow-400">1</Button>
              <Button size="icon" variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20 text-white">2</Button>
              <Button size="icon" variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20 text-white">3</Button>
            </div>
            <Button variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20 text-white">
              Próxima
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* [CTA]: Botão para voltar à superfície */}
          <Button
            onClick={handleScrollToTop}
            className="px-8 py-6 text-base bg-[#ffbc59] text-black font-medium rounded-full hover:bg-yellow-400 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <ArrowUp className="w-5 h-5 mr-2" />
            Voltar à Superfície
          </Button>
        </div>
      </div>
    </section>
  );
};