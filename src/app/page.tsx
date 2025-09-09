// src/app/page.tsx
'use client';

import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PatoGuia from '@/components/atoms/PatoGuia';

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

const manifestoParagraphs = [
    "A desinformação prospera na escuridão, alimentada pela falta de contexto e pela polarização. Notícias são apresentadas como armas em uma guerra de narrativas, deixando-nos perdidos em um nevoeiro de incerteza.",
    "A nossa missão é devolver o poder ao leitor. Não através da censura, mas da clareza. Acreditamos que, com as ferramentas certas, qualquer pessoa pode discernir a verdade e formar as suas próprias conclusões informadas.",
    "A Phato é essa ferramenta. Uma plataforma que não diz em que acreditar, mas que ilumina o que não está a ser dito. Analisamos, contextualizamos e revelamos os mecanismos por trás da informação que consome.",
    "Junte-se a nós nesta jornada. Mude da dúvida para a compreensão. Ilumine o seu mundo."
];

/**
 * The main interactive homepage.
 * Features a scroll-driven animation guiding the user through the manifesto.
 */
export default function Home() {
    const mainRef = useRef<HTMLDivElement>(null);
    const patoRef = useRef<HTMLDivElement>(null);
    const lanternaRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Set the initial position of the elements using GSAP.
            gsap.set([patoRef.current, lanternaRef.current], { x: '50vw', y: '10vh' });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: mainRef.current,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1, // Makes the animation smoothly follow the scroll
                },
            });

            // Animate Pato and Lanterna along a predefined path from their initial position.
            tl.to([patoRef.current, lanternaRef.current], { x: '5vw', y: '25vh', duration: 1 })
              .to([patoRef.current, lanternaRef.current], { x: '80vw', y: '60vh', duration: 1 })
              .to([patoRef.current, lanternaRef.current], { x: '10vw', y: '100vh', duration: 1 })
              .to([patoRef.current, lanternaRef.current], { x: '50vw', y: '140vh', duration: 1 })
              .to(lanternaRef.current, { scale: 40, duration: 1 });

        }, mainRef); // Scope the context to the main element

        return () => ctx.revert(); // Cleanup GSAP animations
    }, []);

    return (
        <div ref={mainRef}>
            {/* Scrollable container that drives the animation */}
            <div style={{ height: '400vh' }} />

            {/* Fixed container for all animated elements */}
            <div className="fixed inset-0 overflow-hidden">
                
                {/* The Lantern effect - removed x and y from style prop */}
                <div ref={lanternaRef} className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-phato-yellow/30 rounded-full" style={{ filter: 'blur(50px)' }}/>
                
                {/* The Duck Guide - removed x and y from style prop */}
                <div ref={patoRef} className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
                    <PatoGuia />
                </div>

                {/* The Manifesto text */}
                <div className="absolute inset-0 flex flex-col justify-around items-center p-8 pointer-events-none z-10">
                    <p className="max-w-md text-phato-text text-left self-start mt-[15vh]">{manifestoParagraphs[0]}</p>
                    <p className="max-w-md text-phato-text text-right self-end">{manifestoParagraphs[1]}</p>
                    <p className="max-w-md text-phato-text text-left self-start">{manifestoParagraphs[2]}</p>
                    <p className="max-w-md text-phato-light font-semibold text-center self-center mb-[15vh]">{manifestoParagraphs[3]}</p>
                </div>
            </div>
        </div>
    );
}

