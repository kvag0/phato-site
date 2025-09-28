"use client"

import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"

export default function ConteudoPage() {
  const [scrollY, setScrollY] = useState(0)
  const [duckPosition, setDuckPosition] = useState({ x: 50, y: 20 })

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setScrollY(scrollPosition)

      // Duck follows the dive - moves down and slightly to the right as we scroll
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = Math.min(scrollPosition / maxScroll, 1)

      setDuckPosition({
        x: 50 + scrollProgress * 10, // Slight horizontal movement
        y: 20 + scrollProgress * 60, // Vertical dive movement
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Sample blog posts/podcasts data
  const contentItems = [
    {
      id: 1,
      type: "Blog",
      title: "O Futuro da Verificação de Fatos na Era Digital",
      excerpt: "Como a inteligência artificial está revolucionando a forma como combatemos a desinformação.",
      date: "15 Nov 2024",
      readTime: "8 min",
    },
    {
      id: 2,
      type: "Podcast",
      title: "Episódio #12: Navegando pela Infodemia",
      excerpt: "Conversamos com especialistas sobre os desafios da informação no mundo moderno.",
      date: "12 Nov 2024",
      duration: "45 min",
    },
    {
      id: 3,
      type: "Blog",
      title: "Tecnologia Blockchain e Transparência Informacional",
      excerpt: "Explorando como a blockchain pode garantir a autenticidade das informações.",
      date: "08 Nov 2024",
      readTime: "12 min",
    },
    {
      id: 4,
      type: "Podcast",
      title: "Episódio #11: IA e Ética na Verificação",
      excerpt: "Discutindo os aspectos éticos do uso de IA na verificação de fatos.",
      date: "05 Nov 2024",
      duration: "38 min",
    },
    {
      id: 5,
      type: "Blog",
      title: "O Papel das Redes Sociais na Disseminação da Verdade",
      excerpt: "Analisando como as plataformas digitais podem promover informação confiável.",
      date: "01 Nov 2024",
      readTime: "10 min",
    },
  ]

  // Calculate dive effect - background transitions from lake scene to water color
  const diveProgress = Math.min(scrollY / 800, 1)
  const waterColor = `rgba(52, 152, 219, ${0.1 + diveProgress * 0.9})`

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Lake Scene Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Lake Background Image */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-sky-300 via-blue-400 to-blue-600"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Cdefs%3E%3ClinearGradient id='sky' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2387CEEB'/%3E%3Cstop offset='100%25' style='stop-color:%234682B4'/%3E%3C/linearGradient%3E%3ClinearGradient id='water' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%234682B4'/%3E%3Cstop offset='100%25' style='stop-color:%23191970'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1200' height='400' fill='url(%23sky)'/%3E%3Cellipse cx='600' cy='350' rx='80' ry='20' fill='%23228B22' opacity='0.8'/%3E%3Cellipse cx='200' cy='380' rx='60' ry='15' fill='%23228B22' opacity='0.6'/%3E%3Cellipse cx='1000' cy='370' rx='70' ry='18' fill='%23228B22' opacity='0.7'/%3E%3Crect y='400' width='1200' height='400' fill='url(%23water)'/%3E%3Cellipse cx='300' cy='450' rx='15' ry='8' fill='%23FFD700' opacity='0.8'/%3E%3Cellipse cx='800' cy='480' rx='12' ry='6' fill='%23FFD700' opacity='0.6'/%3E%3Cellipse cx='500' cy='520' rx='18' ry='9' fill='%23FFD700' opacity='0.7'/%3E%3Crect x='450' y='420' width='80' height='40' rx='40' fill='%238B4513'/%3E%3Crect x='480' y='400' width='20' height='60' fill='%23654321'/%3E%3Ccircle cx='490' cy='390' r='8' fill='%23F5DEB3'/%3E%3C/svg%3E")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />

        {/* Diving Overlay */}
        <div
          className="absolute inset-0 transition-all duration-300"
          style={{
            backgroundColor: waterColor,
            backdropFilter: `blur(${diveProgress * 2}px)`,
          }}
        />

        {/* Main Character Duck */}
        <div
          className="absolute w-8 h-8 bg-[#ffbc59] rounded-full border-2 border-yellow-600 transition-all duration-300 ease-out z-20"
          style={{
            left: `${duckPosition.x}%`,
            top: `${duckPosition.y}%`,
            transform: `scale(${1 - diveProgress * 0.3}) rotate(${diveProgress * 180}deg)`,
            boxShadow: `0 0 ${10 + diveProgress * 20}px rgba(255, 188, 89, 0.6)`,
          }}
        >
          {/* Duck eyes */}
          <div className="absolute top-1 left-1 w-1 h-1 bg-black rounded-full"></div>
          <div className="absolute top-1 right-1 w-1 h-1 bg-black rounded-full"></div>
        </div>

        {/* Title */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center">
            <h1
              className="text-6xl md:text-8xl font-bold text-white mb-4 text-balance"
              style={{
                opacity: Math.max(0, 1 - diveProgress * 2),
                transform: `translateY(${scrollY * 0.3}px)`,
              }}
            >
              Lago dos Phatos
            </h1>
            <p
              className="text-xl md:text-2xl text-blue-100 text-pretty"
              style={{
                opacity: Math.max(0, 1 - diveProgress * 2),
                transform: `translateY(${scrollY * 0.4}px)`,
              }}
            >
              Mergulhe no oceano de conhecimento
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce z-10"
          style={{ opacity: Math.max(0, 1 - diveProgress * 3) }}
        >
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2">Role para mergulhar</span>
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Underwater Content Section */}
      <section
        className="relative min-h-screen py-20"
        style={{
          backgroundColor: "#3498db",
          background: `linear-gradient(180deg, #3498db 0%, #2980b9 50%, #1e3a8a 100%)`,
        }}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16 text-balance">
              Conteúdo Mais Recente
            </h2>

            {/* Content Items */}
            <div className="space-y-8">
              {contentItems.map((item, index) => (
                <div
                  key={item.id}
                  className="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    opacity: Math.min(1, Math.max(0, (scrollY - 400) / 200)),
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item.type === "Blog" ? "bg-[#ffbc59] text-black" : "bg-purple-500 text-white"
                      }`}
                    >
                      {item.type}
                    </span>
                    <div className="text-blue-200 text-sm">
                      {item.date} • {item.type === "Blog" ? item.readTime : item.duration}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#ffbc59] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-blue-100 leading-relaxed mb-4 text-pretty">{item.excerpt}</p>

                  <div className="flex items-center text-[#ffbc59] font-medium group-hover:translate-x-2 transition-transform">
                    {item.type === "Blog" ? "Ler artigo" : "Ouvir episódio"}
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lake Bottom Section */}
      <section
        className="relative py-20"
        style={{
          backgroundColor: "#1e3a8a",
          background: `linear-gradient(180deg, #1e3a8a 0%, #1e293b 100%)`,
        }}
      >
        <div className="container mx-auto px-6 text-center">
          {/* Lake Bottom Rocks */}
          <div className="flex justify-center items-end mb-12 space-x-4">
            <div className="w-16 h-12 bg-gray-600 rounded-t-full opacity-80"></div>
            <div className="w-20 h-16 bg-gray-700 rounded-t-full opacity-90"></div>
            <div className="w-12 h-8 bg-gray-500 rounded-t-full opacity-70"></div>
            <div className="w-24 h-20 bg-gray-800 rounded-t-full"></div>
            <div className="w-14 h-10 bg-gray-600 rounded-t-full opacity-75"></div>
          </div>

          <h3 className="text-3xl font-bold text-white mb-8 text-balance">Chegou ao fundo do lago</h3>

          <p className="text-blue-200 text-lg mb-12 max-w-2xl mx-auto text-pretty">
            Explore mais conteúdo ou navegue para outras seções do nosso ecossistema de conhecimento.
          </p>

          {/* Pagination */}
          <div className="flex justify-center items-center space-x-4 mb-12">
            <button className="px-6 py-3 bg-white/10 text-white rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              ← Página Anterior
            </button>

            <div className="flex space-x-2">
              <button className="w-10 h-10 bg-[#ffbc59] text-black rounded-lg font-medium hover:scale-110 transition-transform">
                1
              </button>
              <button className="w-10 h-10 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
                2
              </button>
              <button className="w-10 h-10 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
                3
              </button>
            </div>

            <button className="px-6 py-3 bg-white/10 text-white rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              Próxima Página →
            </button>
          </div>

          {/* Back to Surface */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center px-8 py-4 bg-[#ffbc59] text-black font-medium rounded-full hover:bg-yellow-400 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            Voltar à Superfície
          </button>
        </div>
      </section>
    </div>
  )
}

