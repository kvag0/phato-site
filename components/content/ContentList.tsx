"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ContentCard, ContentItem } from "./ContentCard";

gsap.registerPlugin(ScrollTrigger);

// [DATA MOCK]: Estes dados virão de uma API ou CMS.
// Por enquanto, mockamos aqui para construir o componente.
const MOCKED_CONTENT: ContentItem[] = [
    {
      id: 1,
      type: "Blog",
      title: "O Futuro da Verificação de Fatos na Era Digital",
      excerpt: "Como a inteligência artificial está revolucionando a forma como combatemos a desinformação.",
      date: "15 Nov 2024",
      metadata: "8 min de leitura",
    },
    {
      id: 2,
      type: "Podcast",
      title: "Episódio #12: Navegando pela Infodemia",
      excerpt: "Conversamos com especialistas sobre os desafios da informação no mundo moderno.",
      date: "12 Nov 2024",
      metadata: "45 min",
    },
    {
      id: 3,
      type: "Blog",
      title: "Tecnologia Blockchain e Transparência Informacional",
      excerpt: "Explorando como a blockchain pode garantir a autenticidade das informações.",
      date: "08 Nov 2024",
      metadata: "12 min de leitura",
    },
];

export const ContentList = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // [ANIMATION]: Animação de entrada para os cards.
    // Selecionamos todos os cards com a classe '.fade-in-card'.
    const cards = gsap.utils.toArray('.fade-in-card');
    
    cards.forEach((card) => {
      gsap.from(card as gsap.DOMTarget, {
        opacity: 0,
        y: 50,
        scrollTrigger: {
          trigger: card as gsap.DOMTarget,
          start: "top 85%", // A animação começa quando o topo do card atinge 85% da altura da viewport
          end: "bottom 70%",
          toggleActions: "play none none none", // Apenas executa a animação uma vez ao entrar
        },
        duration: 0.5,
      });
    });
    
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative py-20 bg-gradient-to-b from-[#3498db] via-[#2980b9] to-[#1e3a8a] min-h-screen"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16 text-balance">
            Conteúdo Mais Recente
          </h2>

          <div className="space-y-8">
            {MOCKED_CONTENT.map((item) => (
              <ContentCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};