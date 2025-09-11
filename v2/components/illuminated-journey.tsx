"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { DuckGuide } from "./duck-guide"

const MANIFESTO_TEXT = `
Na era da desinformação, onde a verdade se perde em um mar de ruído digital, 
a Phato emerge como um farol de clareza e inteligência.

Nossa missão transcende a simples verificação de fatos. Somos arquitetos de 
contexto, construtores de pontes entre dados fragmentados e compreensão profunda.

Através de inteligência artificial avançada, transformamos o caos informacional 
em conhecimento estruturado, revelando as conexões ocultas que definem nossa 
realidade digital.

Cada algoritmo que desenvolvemos, cada interface que criamos, cada experiência 
que proporcionamos serve a um propósito maior: devolver às pessoas o poder de 
discernir, questionar e compreender.

A desinformação é o caos. Nós somos a ordem.
A confusão é a escuridão. Nós somos a luz.
`

export function IlluminatedJourney() {
  const [stage, setStage] = useState<"initial" | "exploring" | "complete">("initial")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [revealedText, setRevealedText] = useState<Set<number>>(new Set())
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  const handleStartExploration = () => {
    setStage("exploring")
  }

  useEffect(() => {
    if (stage !== "exploring") return

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !textRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      setMousePosition({ x, y })

      // Check which text elements are within the light beam
      const textElements = textRef.current.querySelectorAll("[data-word-index]")
      const newRevealed = new Set<number>()

      textElements.forEach((element) => {
        const elementRect = element.getBoundingClientRect()
        const elementX = elementRect.left + elementRect.width / 2 - rect.left
        const elementY = elementRect.top + elementRect.height / 2 - rect.top

        const distance = Math.sqrt(Math.pow(x - elementX, 2) + Math.pow(y - elementY, 2))

        if (distance < 100) {
          // Light beam radius
          const wordIndex = Number.parseInt(element.getAttribute("data-word-index") || "0")
          newRevealed.add(wordIndex)
        }
      })

      setRevealedText(newRevealed)
    }

    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.8) {
        setStage("complete")
      }
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("scroll", handleScroll)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("scroll", handleScroll)
    }
  }, [stage])

  const words = MANIFESTO_TEXT.trim().split(/\s+/)

  if (stage === "initial") {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center relative overflow-hidden">
        <div className="text-center space-y-8">
          <DuckGuide isActive={true} className="mx-auto" />
          <Button
            onClick={handleStartExploration}
            className="phato-pulse bg-[#ffbc59] text-[#0d0d0d] hover:bg-[#ffbc59]/90 px-8 py-4 text-lg font-medium"
          >
            Comece a Exploração
          </Button>
        </div>
      </div>
    )
  }

  if (stage === "exploring") {
    return (
      <div
        ref={containerRef}
        className="min-h-screen bg-[#0d0d0d] relative overflow-hidden flashlight-cursor p-8 md:p-16"
      >
        {/* Flashlight beam */}
        <div
          className="flashlight-beam"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
          }}
        />

        {/* Duck cursor */}
        <div
          className="fixed pointer-events-none z-50"
          style={{
            left: mousePosition.x - 12,
            top: mousePosition.y - 12,
          }}
        >
          <DuckGuide isActive={true} size="cursor" />
        </div>

        {/* Hidden text content */}
        <div ref={textRef} className="max-w-4xl mx-auto space-y-8 text-xl md:text-2xl leading-relaxed font-light">
          {MANIFESTO_TEXT.split("\n\n").map((paragraph, paragraphIndex) => (
            <p key={paragraphIndex} className="text-balance">
              {paragraph
                .trim()
                .split(/\s+/)
                .map((word, wordIndex) => {
                  const globalWordIndex = paragraphIndex * 100 + wordIndex // Simple indexing
                  const isRevealed = revealedText.has(globalWordIndex)

                  return (
                    <span
                      key={wordIndex}
                      data-word-index={globalWordIndex}
                      className={`revealed-text inline-block mr-2 ${isRevealed ? "illuminated-text" : "hidden-text"}`}
                    >
                      {word}
                    </span>
                  )
                })}
            </p>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 text-[#a3a3a3] text-sm animate-bounce">
          Continue explorando...
        </div>
      </div>
    )
  }

  // Complete stage
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d0d0d] to-[#2a2a2a] transition-all duration-1000">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold text-[#E0E0E0] text-balance">Bem-vindo à Phato</h1>
          <p className="text-xl text-[#a3a3a3] max-w-2xl mx-auto text-balance">
            Onde a inteligência artificial encontra a busca pela verdade
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-[#ffbc59] text-[#0d0d0d] hover:bg-[#ffbc59]/90 px-8 py-3">
              Conheça Nossa Missão
            </Button>
            <Button
              variant="outline"
              className="border-[#ffbc59] text-[#ffbc59] hover:bg-[#ffbc59] hover:text-[#0d0d0d] px-8 py-3 bg-transparent"
            >
              Explore a Tecnologia
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
