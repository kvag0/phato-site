// src/app/page.tsx
'use client';

import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import PatoGuia from '@/components/atoms/PatoGuia';
import SceneryElement from '@/components/atoms/SceneryElement';
import { TreeIcon, RockIcon } from '@/components/atoms/SceneryIcons';

// Registar os plugins da GSAP
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const manifestoParagraphs = [
    "A desinformação prospera na escuridão, alimentada pela falta de contexto e pela polarização. Notícias são apresentadas como armas em uma guerra de narrativas, deixando-nos perdidos em um nevoeiro de incerteza.",
    "A nossa missão é devolver o poder ao leitor. Não através da censura, mas da clareza. Acreditamos que, com as ferramentas certas, qualquer pessoa pode discernir a verdade e formar as suas próprias conclusões informadas.",
    "A Phato é essa ferramenta. Uma plataforma que não diz em que acreditar, mas que ilumina o que não está a ser dito. Analisamos, contextualizamos e revelamos os mecanismos por trás da informação que consome.",
    "Junte-se a nós nesta jornada. Mude da dúvida para a compreensão. Ilumine o seu mundo."
];

export default function Home() {
    const mainRef = useRef<HTMLDivElement>(null);
    const patoRef = useRef<HTMLDivElement>(null);
    const lanternaRef = useRef<HTMLDivElement>(null);
    const motionPathRef = useRef<SVGPathElement>(null);
    
    // Refs for the paragraph containers
    const p1Ref = useRef<HTMLDivElement>(null);
    const p2Ref = useRef<HTMLDivElement>(null);
    const p3Ref = useRef<HTMLDivElement>(null);
    const p4Ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const main = mainRef.current;
        const pato = patoRef.current;
        const lanterna = lanternaRef.current;
        const path = motionPathRef.current;
        const pRefs = [p1Ref.current, p2Ref.current, p3Ref.current, p4Ref.current];

        if (!main || !pato || !lanterna || !path || pRefs.some(ref => !ref)) {
            return;
        }

        const ctx = gsap.context(() => {
            gsap.set([pato, lanterna], {
                xPercent: -50,
                yPercent: -50,
                transformOrigin: '50% 50%',
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: main,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1.5,
                },
            });

            tl.to(pato, {
                motionPath: { path: path, align: path, alignOrigin: [0.5, 0.5], autoRotate: true },
                ease: 'none',
            }, 0);
            
            tl.to(lanterna, {
                motionPath: { path: path, align: path, alignOrigin: [0.5, 0.5] },
                ease: 'none',
            }, "<0.05");

            // --- Paragraph Animation Synced with the Main Timeline ---
            // Adjusted timings to create a significant pause between each paragraph
            const timings = [
                { fadeIn: 0.05, fadeOut: 0.20 }, // P1
                { fadeIn: 0.30, fadeOut: 0.45 }, // P2 (has a 0.1 timeline gap)
                { fadeIn: 0.55, fadeOut: 0.70 }, // P3 (has a 0.1 timeline gap)
                { fadeIn: 0.80, fadeOut: 1.0 },  // P4 fades in and stays until the end
            ];

            pRefs.forEach((ref, index) => {
                tl.to(ref, { opacity: 1 }, timings[index].fadeIn);
                 if (index < pRefs.length -1) { // Don't fade out the last paragraph
                    tl.to(ref, { opacity: 0 }, timings[index].fadeOut);
                }
            });

            tl.to(lanterna, {
                scale: 15,
                duration: 0.5,
            }, ">-0.2");

        }, main);
        return () => ctx.revert();
    }, []);

    return (
        <>
            <div ref={mainRef} style={{ height: '1200vh' }} />

            <div className="fixed inset-0 overflow-hidden">
                
                <SceneryElement scrollTriggerRef={mainRef} className="top-[20%] left-[5%] w-40 h-40" speed={1.2}>
                    <TreeIcon />
                </SceneryElement>
                <SceneryElement scrollTriggerRef={mainRef} className="top-[50%] right-[10%] w-24 h-24" speed={1.5}>
                    <RockIcon />
                </SceneryElement>
                <SceneryElement scrollTriggerRef={mainRef} className="top-[85%] left-[15%] w-32 h-32" speed={1.8}>
                    <RockIcon />
                </SceneryElement>
                
                <div
                    ref={lanternaRef}
                    className="absolute w-64 h-64 bg-phato-yellow/30 rounded-full filter blur-3xl"
                />

                <div
                    ref={patoRef}
                    className="absolute z-20"
                >
                    <PatoGuia />
                </div>
                
                <svg width="100%" height="100%" className="absolute inset-0 z-0">
                    <path
                        ref={motionPathRef}
                        // A more fluid, serpentine path for a natural journey
                        d="M 20vw,20vh C 80vw,35vh 20vw,65vh 80vw,80vh S 40vw,95vh 50vw,110vh"
                        stroke="none"
                        fill="none"
                    />
                </svg>

                {/* Container for all manifesto paragraphs, always centered */}
                <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
                    <div className="relative w-full h-full">
                        <div ref={p1Ref} className="absolute inset-0 flex items-center justify-start opacity-0">
                            <p className="text-xl md:text-2xl text-phato-text font-medium max-w-md ml-[15vw]">
                                {manifestoParagraphs[0]}
                            </p>
                        </div>
                        <div ref={p2Ref} className="absolute inset-0 flex items-center justify-end opacity-0">
                            <p className="text-xl md:text-2xl text-phato-text font-medium max-w-md mr-[15vw] text-right">
                                {manifestoParagraphs[1]}
                            </p>
                        </div>
                        <div ref={p3Ref} className="absolute inset-0 flex items-center justify-start opacity-0">
                            <p className="text-xl md:text-2xl text-phato-text font-medium max-w-md ml-[15vw]">
                                {manifestoParagraphs[2]}
                            </p>
                        </div>
                        <div ref={p4Ref} className="absolute inset-0 flex items-center justify-center opacity-0">
                            <p className="text-xl md:text-2xl text-phato-text font-medium max-w-lg text-center">
                                {manifestoParagraphs[3]}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

