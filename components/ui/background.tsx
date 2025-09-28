"use client"

export function Background() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/95" />

      {/* Subtle mesh pattern */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-10" />

      {/* Ambient light effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-highlight/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-highlight/3 rounded-full blur-3xl" />
    </div>
  )
}
