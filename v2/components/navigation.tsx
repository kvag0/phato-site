"use client"

import Link from "next/link"
import { DuckGuide } from "./duck-guide"

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[#0d0d0d]/80 backdrop-blur-sm border-b border-[#3d3d3d]">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <DuckGuide isActive={false} size="cursor" className="w-8 h-8" />
          <span className="text-xl font-bold text-[#ffbc59]">Phato</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link href="/missao" className="text-[#a3a3a3] hover:text-[#ffbc59] transition-colors">
            Missão
          </Link>
          <Link href="/tecnologia" className="text-[#a3a3a3] hover:text-[#ffbc59] transition-colors">
            Tecnologia
          </Link>
          <Link href="/conteudo" className="text-[#a3a3a3] hover:text-[#ffbc59] transition-colors">
            Conteúdo
          </Link>
          <Link
            href="/business"
            className="bg-[#ffbc59] text-[#0d0d0d] px-4 py-2 rounded hover:bg-[#ffbc59]/90 transition-colors"
          >
            Business
          </Link>
        </div>
      </div>
    </nav>
  )
}
