"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

// [COMPONENT]: Efeito de Lanterna (Flashlight)
// Este componente cria um "foco de luz" que segue o cursor do mouse,
// reforçando a metáfora da marca de trazer luz (conhecimento) à escuridão (desinformação).
export function FlashlightEffect() {
  const beamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const beam = beamRef.current;
    if (!beam) return;

    // [ANIMATION]: Usamos GSAP para animar a posição da "luz" de forma fluida,
    // em vez de depender de atualizações bruscas do estado do CSS.
    const moveBeam = (e: MouseEvent) => {
      gsap.to(beam, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power3.out'
      });
    };

    window.addEventListener('mousemove', moveBeam);

    return () => {
      window.removeEventListener('mousemove', moveBeam);
    };
  }, []);

  // [STYLE]: A classe 'flashlight-beam' está definida no nosso globals.css.
  // Escondemos o efeito em ecrãs pequenos ('md:block') para uma melhor experiência mobile.
  return <div ref={beamRef} className="flashlight-beam hidden md:block" aria-hidden="true"></div>;
}
