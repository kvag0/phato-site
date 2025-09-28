"use client"

import type React from "react"

import { useEffect, useState } from "react"

export function useAnimateOnScroll(containerRef: React.RefObject<HTMLElement>) {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id
          if (sectionId) {
            setVisibleSections((prev) => {
              const newSet = new Set(prev)
              if (entry.isIntersecting) {
                newSet.add(sectionId)
              } else {
                newSet.delete(sectionId)
              }
              return newSet
            })
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "-10% 0px -10% 0px",
      },
    )

    // Observe all elements with data-animate attribute
    const animatedElements = containerRef.current.querySelectorAll("[data-animate]")
    animatedElements.forEach((el) => observer.observe(el))

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el))
    }
  }, [containerRef])

  return visibleSections
}
