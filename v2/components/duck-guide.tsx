"use client"

import { useState, useEffect } from "react"

interface DuckGuideProps {
  isActive: boolean
  position?: { x: number; y: number }
  size?: "cursor" | "normal"
  className?: string
}

export function DuckGuide({ isActive, position, size = "normal", className = "" }: DuckGuideProps) {
  const [isBlinking, setIsBlinking] = useState(false)
  const [isSwimming, setIsSwimming] = useState(false)
  const [lanternGlow, setLanternGlow] = useState(1)

  useEffect(() => {
    if (isActive) {
      const blinkInterval = setInterval(() => {
        setIsBlinking(true)
        setTimeout(() => setIsBlinking(false), 200)
      }, 3000)

      const swimInterval = setInterval(() => {
        setIsSwimming(true)
        setTimeout(() => setIsSwimming(false), 800)
      }, 4000)

      const glowInterval = setInterval(() => {
        setLanternGlow((prev) => (prev === 1 ? 1.5 : 1))
      }, 2000)

      return () => {
        clearInterval(blinkInterval)
        clearInterval(swimInterval)
        clearInterval(glowInterval)
      }
    }
  }, [isActive])

  const sizeClasses = size === "cursor" ? "w-6 h-6" : "w-16 h-16"
  const positionStyle = position ? { left: position.x, top: position.y } : {}

  return (
    <div
      className={`${sizeClasses} ${className} transition-all duration-300 ease-out ${isSwimming ? "animate-bounce" : ""}`}
      style={positionStyle}
    >
      <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {size === "normal" && (
          <>
            <circle
              cx="32"
              cy="50"
              r="20"
              fill="none"
              stroke="#ffbc59"
              strokeWidth="0.5"
              opacity="0.3"
              className="animate-ping"
            />
            <circle
              cx="32"
              cy="50"
              r="15"
              fill="none"
              stroke="#ffbc59"
              strokeWidth="0.3"
              opacity="0.2"
              className="animate-ping"
              style={{ animationDelay: "0.5s" }}
            />
          </>
        )}

        {/* Duck body */}
        <ellipse cx="32" cy="40" rx="18" ry="12" fill="#ffbc59" className={isSwimming ? "animate-pulse" : ""} />

        <ellipse cx="26" cy="38" rx="6" ry="4" fill="#ff9500" opacity="0.7" />

        {/* Duck head */}
        <circle cx="32" cy="24" r="12" fill="#ffbc59" className={isSwimming ? "animate-pulse" : ""} />

        {/* Duck beak */}
        <ellipse cx="38" cy="26" rx="4" ry="2" fill="#ff9500" />

        <circle cx="28" cy="22" r="2.5" fill="white" />
        <circle cx="28" cy="22" r="2" fill="#0d0d0d" />
        {!isBlinking && <circle cx="28.5" cy="21.5" r="0.5" fill="white" opacity="0.8" />}
        {isBlinking && <ellipse cx="28" cy="22" rx="2.5" ry="0.3" fill="#0d0d0d" />}

        {/* Lantern */}
        {size === "normal" && (
          <>
            <rect x="20" y="28" width="6" height="8" rx="1" fill="#3d3d3d" stroke="#a3a3a3" strokeWidth="0.5" />
            <circle
              cx="23"
              cy="32"
              r="2"
              fill="#ffbc59"
              className="phato-glow"
              style={{
                filter: `brightness(${lanternGlow})`,
                transition: "filter 0.5s ease-in-out",
              }}
            />
            <line x1="23" y1="28" x2="23" y2="24" stroke="#a3a3a3" strokeWidth="1" />

            <circle cx="23" cy="25" r="0.5" fill="#a3a3a3" />
            <circle cx="23" cy="26" r="0.5" fill="#a3a3a3" />
            <circle cx="23" cy="27" r="0.5" fill="#a3a3a3" />

            <defs>
              <radialGradient id="lightBeam" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffbc59" stopOpacity="0.4" />
                <stop offset="70%" stopColor="#ffbc59" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#ffbc59" stopOpacity="0" />
              </radialGradient>
            </defs>
            <ellipse cx="35" cy="32" rx="12" ry="8" fill="url(#lightBeam)" opacity={lanternGlow * 0.6} />
          </>
        )}

        {/* Light beam effect for cursor size */}
        {size === "cursor" && <circle cx="32" cy="32" r="3" fill="#ffbc59" opacity="0.6" className="phato-pulse" />}

        {isSwimming && size === "normal" && (
          <>
            <circle cx="45" cy="35" r="1" fill="#4a9eff" opacity="0.6" className="animate-ping" />
            <circle
              cx="18"
              cy="42"
              r="0.8"
              fill="#4a9eff"
              opacity="0.4"
              className="animate-ping"
              style={{ animationDelay: "0.3s" }}
            />
            <circle
              cx="40"
              cy="48"
              r="0.6"
              fill="#4a9eff"
              opacity="0.5"
              className="animate-ping"
              style={{ animationDelay: "0.6s" }}
            />
          </>
        )}
      </svg>
    </div>
  )
}
