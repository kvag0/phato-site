// src/app/page.tsx
'use client';

import { useRef, useLayoutEffect } from 'react';
import PatoGuia from '@/components/atoms/PatoGuia';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const manifestoParagraphs = [
    "A desinformação prospera na escuridão, alimentada pela falta de contexto e pela polarização. Notícias são apresentadas como armas em uma guerra de narrativas, deixando-nos perdidos em um nevoeiro de incerteza.",
    "A nossa missão é devolver o poder ao leitor. Não através da censura, mas da clareza. Acreditamos que, com as ferramentas certas, qualquer pessoa pode discernir a verdade e formar as suas próprias conclusões informadas.",
    "A Phato é essa ferramenta. Uma plataforma que não diz em que acreditar, mas que ilumina o que não está a ser dito. Analisamos, contextualizamos e revelamos os mecanismos por trás da informação que consome.",
    "Junte-se a nós nesta jornada. Mude da dúvida para a compreensão. Ilumine o seu mundo."
];

export default function Home() {
    const mainRef = useRef<HTMLDivElement>(null);
    const patoContainerRef = useRef<HTMLDivElement>(null);
    const p1Ref = useRef<HTMLDivElement>(null);
    const p2Ref = useRef<HTMLDivElement>(null);
    const p3Ref = useRef<HTMLDivElement>(null);
    const p4Ref = useRef<HTMLDivElement>(null);
    const welcomeTextRef = useRef<HTMLHeadingElement>(null);

    useLayoutEffect(() => {
        const main = mainRef.current;
        const pato = patoContainerRef.current;
        const welcomeText = welcomeTextRef.current;
        const pRefs = [p1Ref.current, p2Ref.current, p3Ref.current, p4Ref.current];

        if (!main || !pato || !welcomeText || pRefs.some(ref => !ref)) {
            return;
        }

        const ctx = gsap.context(() => {
            // --- ESTADO INICIAL ---
            // O CSS já centra o pato. A GSAP apenas define o seu tamanho inicial grande (scale: 2).
            gsap.set(pato, { scale: 2 });
            gsap.set(welcomeText, { opacity: 1 });

            // --- TIMELINE ÚNICA E UNIFICADA ---
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: main,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1.5,
                },
            });

            // --- ANIMAÇÃO DE ENTRADA ---
            // O texto desaparece, e o pato encolhe e move-se para a sua primeira posição (direita).
            tl.to(welcomeText, { opacity: 0, duration: 0.05 })
              .to(pato, {
                  scale: 1, // Reduz para o tamanho de viagem
                  x: '25vw',  // Move 25% da largura do ecrã para a direita do centro
                  duration: 0.2
              }, 0); // O '0' faz com que esta animação comece ao mesmo tempo que a anterior

            // --- JORNADA HORIZONTAL E SINCRONIZADA ---
            // Pato viaja para a Esquerda, alinhando-se com o Parágrafo 2
            tl.to(pato, { x: '-25vw', ease: 'power1.inOut', duration: 0.2 });
            // Pato viaja para a Direita, alinhando-se com o Parágrafo 3
            tl.to(pato, { x: '25vw', ease: 'power1.inOut', duration: 0.2 });
            // Pato viaja de volta para o Centro, alinhando-se com o Parágrafo 4
            tl.to(pato, { x: '0vw', ease: 'power1.inOut', duration: 0.2 });

            // --- ANIMAÇÃO DE "ILUMINAÇÃO" DOS PARÁGRAFOS ---
            pRefs.forEach((p) => {
                gsap.fromTo(p,
                    { opacity: 0.2 },
                    {
                        opacity: 1,
                        scrollTrigger: {
                            trigger: p,
                            start: 'top 80%',
                            end: 'bottom 20%',
                            scrub: true,
                        }
                    }
                );
            });

        }, main);

        return () => ctx.revert();
    }, []);

    return (
        <main ref={mainRef} className="relative w-full" style={{ height: '500vh' }}>
            {/* O "ECRÃ" DA ANIMAÇÃO */}
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* O PATO-GUIA (ATOR PRINCIPAL)
                  O CSS trata da centralização inicial. A GSAP irá animar o 'transform' a partir daqui.
                */}
                <div
                    ref={patoContainerRef}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[25vw] max-w-[150px]"
                >
                    <PatoGuia />
                </div>

                {/* A MENSAGEM DE BOAS-VINDAS */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-48">
                    <h1 ref={welcomeTextRef} className="text-2xl text-phato-light text-center whitespace-nowrap">
                        Bem-vindo à Phato.
                    </h1>
                </div>
            </div>

            {/* O CONTEÚDO QUE ROLA (PARÁGRAFOS) */}
            <div ref={p1Ref} className="absolute top-[180vh] w-full flex justify-start pl-[15vw]">
                <p className="max-w-md text-2xl text-phato-text">
                    {manifestoParagraphs[0]}
                </p>
            </div>
            <div ref={p2Ref} className="absolute top-[280vh] w-full flex justify-end pr-[15vw]">
                <p className="max-w-md text-2xl text-phato-text text-right">
                    {manifestoParagraphs[1]}
                </p>
            </div>
            <div ref={p3Ref} className="absolute top-[360vh] w-full flex justify-start pl-[15vw]">
                <p className="max-w-md text-2xl text-phato-text">
                    {manifestoParagraphs[2]}
                </p>
            </div>
            <div ref={p4Ref} className="absolute top-[460vh] w-full flex justify-center">
                <p className="max-w-lg text-2xl text-phato-text text-center">
                    {manifestoParagraphs[3]}
                </p>
            </div>
        </main>
    );
}

