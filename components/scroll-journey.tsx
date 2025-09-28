"use client"

import Lottie from "lottie-react"
import duckLottie from "@/public/duckie.json"
import React, { useState, useEffect, useRef, useLayoutEffect, useMemo } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"
import { SplitText } from "gsap/SplitText"
import { cn } from "@/lib/utils"

// [SETUP]: Registra os plugins do GSAP para que fiquem disponíveis para uso em todo o componente.
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, SplitText)

// --- DADOS DA JORNADA ---
const JOURNEY_SECTIONS = [
  {
    type: "paragraph",
    align: "left",
    text: "Na era da desinformação, onde a verdade se perde em um mar de ruído digital, a Phato emerge como um farol de clareza e inteligência.",
    keywords: ["desinformação", "clareza", "inteligência"],
  },
  {
    type: "paragraph",
    align: "right",
    text: "Nossa missão transcende a simples verificação de fatos. Somos arquitetos de contexto, construtores de pontes entre dados fragmentados e compreensão profunda.",
    keywords: ["missão", "contexto", "compreensão"],
  },
  {
    type: "statistic",
    align: "center",
    preText: "Mais de",
    stat: "70%",
    postText: "dos consumidores admitem ter dificuldades em distinguir notícias falsas de verdadeiras.",
    keywords: ["70%"],
  },
  {
    type: "paragraph",
    align: "left",
    text: "Através de inteligência artificial avançada, transformamos o caos informacional em conhecimento estruturado, revelando as conexões ocultas que definem nossa realidade digital.",
    keywords: ["inteligência artificial", "conhecimento", "conexões"],
  },
  {
    type: "paragraph",
    align: "right",
    text: "A desinformação é o caos. Nós somos a ordem. A confusão é a escuridão. Nós somos a luz.",
    keywords: ["caos", "ordem", "escuridão", "luz"],
  },
]

// --- COMPONENTES AUXILIARES OTIMIZADOS ---

const FloatingParticles = React.memo(({ mainContainerRef }: { mainContainerRef: React.RefObject<HTMLDivElement> }) => {
  const particles = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 1,
      opacity: Math.random() * 0.2 + 0.1,
      speed: Math.random() * 0.1 + 0.05,
    }));
  }, []);
  const particleRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (!mainContainerRef.current) return;
      
    const ctx = gsap.context(() => {
      particleRefs.current.forEach((ref, i) => {
        if (!ref) return;
        const particle = particles[i];
        gsap.to(ref, {
          y: () => -(mainContainerRef.current?.offsetHeight || 0) * particle.speed,
          ease: "none",
          scrollTrigger: {
            trigger: mainContainerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5 + Math.random(),
          },
        });
      });
    }, mainContainerRef);
    return () => ctx.revert();
  }, [particles, mainContainerRef]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {particles.map((p, i) => (
        <div
          key={p.id}
          ref={(el) => { particleRefs.current[i] = el }}
          className="absolute bg-[#ffbc59] rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
});
FloatingParticles.displayName = 'FloatingParticles';


// --- COMPONENTE PRINCIPAL ---

export function ScrollJourney() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const mainContainerRef = useRef<HTMLDivElement>(null)
  const duckContainerRef = useRef<HTMLDivElement>(null)
  const motionPathRef = useRef<SVGPathElement>(null)
  const finalTitleRef = useRef<HTMLHeadingElement>(null)
  const finalSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useLayoutEffect(() => {
    if (!mainContainerRef.current || !duckContainerRef.current || !motionPathRef.current || !finalSectionRef.current || !finalTitleRef.current) {
        return;
    }
    
    const mainContainer = mainContainerRef.current;
    const duckContainer = duckContainerRef.current;
    const motionPath = motionPathRef.current;
    const finalSection = finalSectionRef.current;
    const finalTitle = finalTitleRef.current;
      
    const ctx = gsap.context(() => {
      
      const motionPathAnimation = gsap.to(duckContainer, {
        motionPath: {
          path: motionPath,
          align: motionPath,
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
        },
        scrollTrigger: {
          trigger: mainContainer,
          start: "top top",
          endTrigger: finalSection,
          end: "top center",
          scrub: 1.5,
        },
        ease: "none",
      });

      // [FIX]: A animação de pouso é criada dentro do gatilho para garantir uma transição suave.
      ScrollTrigger.create({
        trigger: finalSection,
        start: "top center",
        onEnter: () => {
          // Pausa a animação do caminho para que a de pouso possa assumir o controle.
          motionPathAnimation.pause();
          
          // Anima suavemente da posição ATUAL para a posição FINAL.
          gsap.to(duckContainer, {
              duration: 1.2,
              ease: "power2.inOut",
              // [FIX]: Usa getBoundingClientRect para calcular a posição final em relação ao viewport,
              // que é o correto para um elemento com 'position: fixed'.
              x: finalTitle.getBoundingClientRect().left + finalTitle.offsetWidth / 2,
              y: finalTitle.getBoundingClientRect().top - 100,
              scale: 0.8,
          });
        },
        onLeaveBack: () => {
          // Ao rolar para cima, mata a animação de pouso para evitar conflitos.
          gsap.killTweensOf(duckContainer);
          // Retoma a animação do caminho. O 'invalidate()' força o GSAP a recalcular a posição.
          motionPathAnimation.invalidate().play();
        },
      });

      // --- ANIMAÇÕES DE TEXTO E WELCOME ---
       gsap.utils.toArray<HTMLElement>(".journey-section").forEach((section) => {
        const textElement = section.querySelector(".animated-text")
        if (!textElement) return

        const split = new SplitText(textElement, { type: "chars, words" })
        
        gsap.from(split.chars, {
          opacity: 0.1,
          y: 20,
          stagger: 0.02,
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "bottom 80%",
            scrub: 1,
          },
        })

        const keywords = section.dataset.keywords?.split(",") || []
        split.words.forEach(word => {
            if (keywords.includes((word as HTMLElement).innerText.toLowerCase().replace(/[^a-z0-9%]/gi, ''))) {
                gsap.to(word, {
                    color: "#ffbc59",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 60%",
                        end: "bottom 70%",
                        toggleActions: "play reverse play reverse",
                    }
                })
            }
        })
      });

      const welcomeTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".welcome-section",
          start: "top top",
          end: "bottom 50%",
          scrub: true,
        },
      })
      welcomeTl.to(".welcome-content", {
        opacity: 0,
        y: -50,
      })

    }, mainContainer)

    return () => ctx.revert()
  }, [])
    
  const totalSections = JOURNEY_SECTIONS.length + 2;
  const svgPathHeight = 100 * (totalSections - 1);

  return (
    <div ref={mainContainerRef} className="relative bg-[#0d0d0d]">
        <FloatingParticles mainContainerRef={mainContainerRef} />
      
        <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-10">
            <svg
            className="w-full h-full"
            viewBox={`0 0 1000 ${svgPathHeight}`}
            preserveAspectRatio="xMidYMin slice"
            >
            <path
                ref={motionPathRef}
                d={`M 500 50 
                C 800 200, 200 400, 500 500
                S 800 700, 500 900
                S 200 1100, 500 1300
                S 800 1500, 500 1700
                S 200 1900, 500 2100
                C 800 2300, 200 2500, 500 2700
                `}
                fill="none"
                stroke="#ffbc59"
                strokeWidth="2"
                strokeDasharray="4 8"
                opacity="0.1"
            />
            </svg>
        </div>

        <div ref={duckContainerRef} className="fixed top-0 left-0 z-30 pointer-events-none w-24 h-24 md:w-32 md:h-32">
            <Lottie animationData={duckLottie} loop={true} autoplay={true} />
        </div>

        <div className="relative z-20">
            {/* Welcome Section */}
            <div className="h-screen flex items-center justify-center welcome-section">
                <div
                    className="absolute inset-0 bg-gradient-radial from-[#ffbc59]/10 via-transparent to-transparent"
                    style={{
                    transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) scale(${isHovering ? 1.2 : 1})`,
                    transition: "transform 0.3s ease-out",
                    }}
                />
                <div
                    className="text-center space-y-8 welcome-content"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-[#E0E0E0] text-balance">
                    Bem-vindo ao Phato
                    </h1>
                    <p className="text-xl text-[#a3a3a3] max-w-2xl mx-auto text-balance">
                    Role para descobrir nossa jornada
                    </p>
                    <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 animate-bounce">
                        <div className="w-6 h-10 border-2 border-[#ffbc59] rounded-full flex justify-center">
                            <div className="w-1 h-3 bg-[#ffbc59] rounded-full mt-2 animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Journey Sections */}
            {JOURNEY_SECTIONS.map((section, index) => (
            <div
                key={index}
                className="h-screen flex items-center journey-section"
                data-keywords={section.keywords.join(",")}
            >
                <div
                className={cn(
                    "max-w-3xl text-2xl md:text-4xl leading-relaxed font-light text-[#E0E0E0] text-balance p-8 mx-auto",
                    {
                    "text-left md:mr-[45%]": section.align === "left",
                    "text-right md:ml-[45%]": section.align === "right",
                    "text-center": section.align === "center",
                    }
                )}
                >
                {section.type === "paragraph" && <p className="animated-text">{section.text}</p>}
                {section.type === "statistic" && (
                    <div className="animated-text">
                    <span>{section.preText} </span>
                    <span className="text-6xl md:text-8xl font-bold text-[#ffbc59]">{section.stat}</span>
                    <span> {section.postText}</span>
                    </div>
                )}
                </div>
            </div>
            ))}
            
            {/* Final Section */}
            <div ref={finalSectionRef} className="h-screen flex items-center justify-center">
            <div className="text-center space-y-8 max-w-4xl relative z-10">
                <h2
                    ref={finalTitleRef}
                    className="text-4xl md:text-5xl font-bold text-[#E0E0E0] text-balance"
                >
                    Junte-se à Revolução da Verdade
                </h2>
                <p className="text-xl text-[#a3a3a3] text-balance">
                    Explore nossa tecnologia e descubra como estamos transformando o futuro da informação
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="group bg-[#ffbc59] text-[#0d0d0d] hover:bg-[#ffbc59]/90 px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#ffbc59]/25">
                    <span className="group-hover:animate-pulse">Conheça Nossa Missão</span>
                    </button>
                    <button className="group border border-[#ffbc59] text-[#ffbc59] hover:bg-[#ffbc59] hover:text-[#0d0d0d] px-8 py-3 rounded-lg font-medium transition-all duration-300 bg-transparent transform hover:scale-105 hover:shadow-lg hover:shadow-[#ffbc59]/25">
                    <span className="group-hover:animate-pulse">Explore a Tecnologia</span>
                    </button>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

