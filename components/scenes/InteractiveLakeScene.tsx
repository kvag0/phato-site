"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// [GSAP]: Registrando o plugin do ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// [COMPONENT]: O ideal é que os componentes filhos também sejam modularizados
// Por enquanto, vamos usar placeholders.

const LakeBackground = () => (
  // [PLACEHOLDER]: O SVG do lago, montanhas e floresta irá aqui.
  // Será o elemento principal para o efeito de parallax.
  <div ref={useRef(null)} className="absolute inset-0 bg-[#87CEEB] z-0">
    {/* Comentário para o futuro dev/designer:
        A imagem de fundo deve ser em camadas (SVG ou múltiplas imagens)
        para permitir um efeito de parallax mais rico com GSAP.
        Ex: montanhas se movem mais devagar que as árvores.
    */}
  </div>
);

const Fisherman = () => (
  // [PLACEHOLDER]: O SVG do pescador irá aqui.
  <div ref={useRef(null)} className="absolute top-[45%] left-[30%] w-24 h-32 bg-red-500/20 z-10">
    Pescador
  </div>
);

const StaticDuck = ({ top, left }: { top: string; left: string }) => (
  // [PLACEHOLDER]: Os SVGs dos patos estáticos irão aqui.
  <div
    ref={useRef(null)}
    className="absolute w-12 h-12 bg-yellow-500/20 z-10"
    style={{ top, left }}
  >
    Pato Estático
  </div>
);

const LottieDuck = ({ duckRef }: { duckRef: React.RefObject<HTMLDivElement> }) => (
  // [PLACEHOLDER]: O player do Lottie para o pato principal irá aqui.
  // O estado do Lottie (nadando vs mergulhando) será controlado pelo GSAP.
  <div ref={duckRef} className="absolute w-16 h-16 bg-[#ffbc59]/50 z-20 top-[60%] left-[50%]">
    Pato Principal (Lottie)
  </div>
);


export const InteractiveLakeScene = () => {
  const sceneRef = useRef<HTMLElement>(null);
  const duckRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    // [ANIMATION]: Aqui é onde a mágica do GSAP acontece.
    // Criamos uma timeline principal atrelada ao scroll.

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sceneRef.current, // O gatilho da animação é a própria seção
        start: "top top",         // A animação começa quando o topo da seção atinge o topo da viewport
        end: "bottom top",        // E termina quando o fundo da seção atinge o topo da viewport
        scrub: true,              // Efeito "scrub": a animação segue o scroll do usuário
        pin: true,                // "Pina" a seção enquanto a animação ocorre
        anticipatePin: 1,
      },
    });

    // Agora, adicionamos as animações à timeline.
    // Elas acontecerão em sequência ou em paralelo conforme definimos.

    // 1. Título e subtítulo desaparecem
    tl.to([titleRef.current, subtitleRef.current], {
      opacity: 0,
      y: -100,
    }, 0); // O '0' no final significa que a animação começa no início da timeline

    // 2. O Pato Principal mergulha
    tl.to(duckRef.current, {
      y: "80vh",    // Move o pato para baixo
      x: "10vw",    // Move um pouco para o lado
      scale: 0.7,   // Diminui de tamanho para dar profundidade
      rotation: 180, // Gira para simular o mergulho
    }, 0);

    // 3. A "água" sobe e a cena escurece
    // Criaremos um overlay para este efeito
    tl.fromTo('.underwater-overlay', 
      { backgroundColor: 'rgba(52, 152, 219, 0)' }, 
      { backgroundColor: 'rgba(30, 58, 138, 1)' }, 
    0);

    // [TODO - ANIMATION]:
    // - Animar o Lottie para o estado "mergulhando".
    // - Adicionar parallax no fundo (montanhas, etc).
    // - Animar os patos estáticos para fora da tela.

  }, { scope: sceneRef });

  return (
    <section ref={sceneRef} className="relative h-screen overflow-hidden">
      {/* Elementos da Cena */}
      <LakeBackground />
      <Fisherman />
      <StaticDuck top="65%" left="20%" />
      <StaticDuck top="70%" left="80%" />
      <LottieDuck duckRef={duckRef} />
      
      {/* Overlay para o efeito de mergulho */}
      <div className="underwater-overlay absolute inset-0 z-30 pointer-events-none"></div>

      {/* Conteúdo de Texto */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center">
          <h1 ref={titleRef} className="text-6xl md:text-8xl font-bold text-white mb-4">
            Lago dos Phatos
          </h1>
          <p ref={subtitleRef} className="text-xl md:text-2xl text-blue-100">
            Mergulhe no oceano de conhecimento
          </p>
        </div>
      </div>
    </section>
  );
};