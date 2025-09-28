"use client"

import { useEffect } from "react"
import Lenis from "@studio-freight/lenis"
import { usePathname } from "next/navigation"

export function SmoothScroller() {
  const pathname = usePathname()

  // [ANIMATION]: Este useEffect garante que a página volte ao topo
  // a cada mudança de rota, um comportamento padrão que o Lenis pode alterar.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  // [ANIMATION]: Este useEffect inicializa e gerencia o ciclo de vida do Lenis.
  useEffect(() => {
    // Inicializa o Lenis com algumas configurações de suavidade.
    // O valor 'lerp' controla o quão "suave" é o scroll.
    // Valores menores = mais suave, valores maiores = mais rígido.
    const lenis = new Lenis({
  lerp: 0.05,
  duration: 1.2,
  // [FIX]: A propriedade 'smoothTouch' foi removida pois não existe mais na versão atual do Lenis.
})

    // Sincroniza o GSAP ScrollTrigger com o scroll do Lenis (essencial para futuras animações)
    //lenis.on("scroll", ScrollTrigger.update)
    //gsap.ticker.add((time) => {
    //    lenis.raf(time * 1000)
    //})

    // A função 'raf' (requestAnimationFrame) atualiza a animação a cada frame.
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // [CLEANUP]: Função de limpeza para destruir a instância do Lenis
    // quando o componente for desmontado, evitando memory leaks.
    return () => {
      lenis.destroy()
    }
  }, [])

  return null // Este componente não renderiza nada no DOM.
}