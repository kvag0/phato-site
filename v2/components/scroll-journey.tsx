"use client"

import { useState, useEffect, useRef } from "react"
import { DuckGuide } from "./duck-guide"

const JOURNEY_PARAGRAPHS = [
  "Na era da desinformação, onde a verdade se perde em um mar de ruído digital, a Phato emerge como um farol de clareza e inteligência.",
  "Nossa missão transcende a simples verificação de fatos. Somos arquitetos de contexto, construtores de pontes entre dados fragmentados e compreensão profunda.",
  "Através de inteligência artificial avançada, transformamos o caos informacional em conhecimento estruturado, revelando as conexões ocultas que definem nossa realidade digital.",
  "Cada algoritmo que desenvolvemos, cada interface que criamos, cada experiência que proporcionamos serve a um propósito maior: devolver às pessoas o poder de discernir, questionar e compreender.",
  "A desinformação é o caos. Nós somos a ordem. A confusão é a escuridão. Nós somos a luz.",
]

const FloatingParticles = ({ scrollY }: { scrollY: number }) => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    speed: Math.random() * 0.5 + 0.2,
  }))

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute bg-[#ffbc59] rounded-full opacity-20"
          style={{
            left: `${particle.x}%`,
            top: `${(particle.y + scrollY * particle.speed * 0.1) % 100}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            transform: `translateY(${Math.sin(scrollY * 0.01 + particle.id) * 10}px)`,
          }}
        />
      ))}
    </div>
  )
}

export function ScrollJourney() {
  const [scrollY, setScrollY] = useState(0)
  const [duckPosition, setDuckPosition] = useState({ x: 0, y: 0 })
  const [showWelcome, setShowWelcome] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const newScrollY = window.scrollY
      setScrollY(newScrollY)

      if (newScrollY <= 50) {
        setShowWelcome(true)
      } else {
        setShowWelcome(false)
      }

      const viewportHeight = window.innerHeight
      const currentSection = Math.floor(newScrollY / viewportHeight)
      const sectionProgress = (newScrollY % viewportHeight) / viewportHeight

      const totalSections = JOURNEY_PARAGRAPHS.length + 1
      const finalSectionStart = totalSections * viewportHeight
      const finalSectionCenter = finalSectionStart + viewportHeight / 2

      let duckX = 0
      let duckY = 0

      if (newScrollY + viewportHeight / 2 >= finalSectionCenter - 150) {
        // Final position - center
        duckX = 0
        duckY = -150
      } else if (currentSection > 0 && currentSection <= JOURNEY_PARAGRAPHS.length) {
        const paragraphIndex = currentSection - 1
        const baseOffset = 300
        const smoothProgress = Math.sin(sectionProgress * Math.PI)

        // Duck positioning based on paragraph layout:
        // 1st paragraph (left) → duck on right
        // 2nd paragraph (right) → duck on right
        // 3rd paragraph (right) → duck on left
        // 4th paragraph (right) → duck on left
        if (paragraphIndex === 0) {
          // 1st paragraph (left) → duck on right
          duckX = baseOffset - smoothProgress * 100
        } else if (paragraphIndex === 1) {
          // 2nd paragraph (right) → duck on right
          duckX = baseOffset - smoothProgress * 100
        } else if (paragraphIndex === 2) {
          // 3rd paragraph (right) → duck on left
          duckX = -baseOffset + smoothProgress * 100
        } else {
          // 4th paragraph (right) → duck on left
          duckX = -baseOffset + smoothProgress * 100
        }

        duckY = Math.sin(newScrollY * 0.008) * 15 + Math.cos(newScrollY * 0.012) * 8
      } else if (newScrollY > 50) {
        const transitionProgress = Math.min((newScrollY - 50) / (viewportHeight - 50), 1)
        duckX = 300 * transitionProgress // Start on right for first paragraph
        duckY = Math.sin(newScrollY * 0.01) * 10
      }

      setDuckPosition({ x: duckX, y: duckY })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const getParagraphOpacity = (index: number) => {
    const viewportHeight = window.innerHeight
    const paragraphCenter = (index + 1) * viewportHeight
    const distanceFromCenter = Math.abs(scrollY + viewportHeight / 2 - paragraphCenter)
    const maxDistance = viewportHeight / 3 // Reduced threshold for better visibility

    // Always return 1 (full opacity) when paragraph is in center area
    return distanceFromCenter < maxDistance
      ? 1
      : Math.max(0.3, 1 - (distanceFromCenter - maxDistance) / (viewportHeight / 3))
  }

  const getParagraphAlignment = (index: number) => {
    if (index === 0) return "left" // 1st paragraph left
    if (index === 1) return "right" // 2nd paragraph right
    if (index === 2) return "left" // 3rd paragraph left (changed from right)
    if (index === 3) return "right" // 4th paragraph right
    return "right" // 5th paragraph right
  }

  const getTextRevealProgress = (index: number) => {
    const viewportHeight = window.innerHeight
    const paragraphStart = (index + 1) * viewportHeight - viewportHeight / 3
    const paragraphEnd = (index + 1) * viewportHeight + viewportHeight / 3

    if (scrollY < paragraphStart) return 0
    if (scrollY > paragraphEnd) return 1

    return (scrollY - paragraphStart) / (paragraphEnd - paragraphStart)
  }

  return (
    <div ref={containerRef} className="relative">
      <FloatingParticles scrollY={scrollY} />

      {/* Welcome section */}
      <div className="h-screen bg-[#0d0d0d] flex items-center justify-center relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-radial from-[#ffbc59]/5 via-transparent to-transparent"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) scale(${isHovering ? 1.1 : 1})`,
            transition: "transform 0.3s ease-out",
          }}
        />

        <div
          className={`text-center space-y-8 transition-all duration-1000 ${
            showWelcome ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-[#E0E0E0] text-balance">
            {"Bem-vindo à Phato".split("").map((char, i) => (
              <span key={i} className="inline-block animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>

          <p
            className="text-xl text-[#a3a3a3] max-w-2xl mx-auto text-balance opacity-0 animate-fade-in-up"
            style={{ animationDelay: "2s" }}
          >
            Role para baixo e descubra nossa jornada
          </p>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-[#ffbc59] rounded-full flex justify-center">
              <div className="w-1 h-3 bg-[#ffbc59] rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed top-1/2 left-1/2 z-50 pointer-events-none transition-all duration-1000 ease-out ${
          showWelcome ? "opacity-0 scale-0" : "opacity-100 scale-100"
        }`}
        style={{
          transform: `translate(calc(-50% + ${duckPosition.x}px), calc(-50% + ${duckPosition.y}px))`,
          filter: `drop-shadow(0 0 ${Math.abs(duckPosition.x) / 15 + 8}px #ffbc59) brightness(${1 + Math.abs(duckPosition.x) / 1000})`,
        }}
      >
        <DuckGuide isActive={!showWelcome} />
      </div>

      {/* Scrolling paragraphs */}
      {JOURNEY_PARAGRAPHS.map((paragraph, index) => {
        const alignment = getParagraphAlignment(index)
        const opacity = getParagraphOpacity(index)
        const revealProgress = getTextRevealProgress(index)

        return (
          <div key={index} className="h-screen bg-[#0d0d0d] flex items-center px-8 md:px-16 relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `radial-gradient(circle at ${50 + mousePosition.x}% ${50 + mousePosition.y}%, #ffbc59 1px, transparent 1px)`,
                backgroundSize: "50px 50px",
                transform: `translateY(${scrollY * 0.1}px)`,
              }}
            />

            <div
              className={`max-w-2xl text-2xl md:text-3xl leading-relaxed font-light text-[#E0E0E0] text-balance transition-all duration-500 relative ${
                alignment === "left" ? "mr-auto" : "ml-auto"
              }`}
              style={{
                opacity,
                transform: `translateY(${(1 - revealProgress) * 50}px)`,
              }}
            >
              {paragraph.split(" ").map((word, wordIndex) => (
                <span
                  key={wordIndex}
                  className="inline-block mr-2 transition-all duration-300"
                  style={{
                    opacity: revealProgress > wordIndex / paragraph.split(" ").length ? 1 : 0.3,
                    transform: `translateY(${revealProgress > (wordIndex / paragraph.split(" ").length) ? 0 : 10}px)`,
                  }}
                >
                  {word}
                </span>
              ))}

              <div className="absolute inset-0 pointer-events-none">
                {["Phato", "inteligência", "verdade", "ordem", "luz"].map((keyword) => {
                  const keywordIndex = paragraph.toLowerCase().indexOf(keyword.toLowerCase())
                  if (keywordIndex !== -1) {
                    return (
                      <span
                        key={keyword}
                        className="absolute text-[#ffbc59] opacity-20 blur-sm"
                        style={{
                          left: `${(keywordIndex / paragraph.length) * 100}%`,
                          top: 0,
                        }}
                      >
                        {keyword}
                      </span>
                    )
                  }
                  return null
                })}
              </div>
            </div>
          </div>
        )
      })}

      {/* Final section */}
      <div className="h-screen bg-gradient-to-b from-[#0d0d0d] to-[#2a2a2a] flex items-center justify-center px-8 relative overflow-hidden">
        <div className="absolute inset-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-[#ffbc59]/10 rounded-full blur-3xl animate-pulse"
              style={{
                width: `${200 + i * 100}px`,
                height: `${200 + i * 100}px`,
                left: `${20 + i * 15}%`,
                top: `${10 + i * 20}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i}s`,
              }}
            />
          ))}
        </div>

        <div className="text-center space-y-8 max-w-4xl relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-[#E0E0E0] text-balance">
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
  )
}
