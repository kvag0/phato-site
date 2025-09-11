"use client"

import { Navigation } from "@/components/navigation"
import { DuckGuide } from "@/components/duck-guide"
import { useState, useEffect } from "react"

export default function MissaoPage() {
  const [selectedMember, setSelectedMember] = useState<number | null>(null)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id))
          }
        })
      },
      { threshold: 0.1 },
    )

    const sections = document.querySelectorAll("[data-animate]")
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const teamMembers = [
    {
      name: "Caio Sobrinho",
      role: "Co-Fundador",
      bio: "Visionário em tecnologia com expertise em verificação de fatos e sistemas de integridade informacional.",
      expertise: ["Estratégia", "Visão", "Liderança"],
    },
    {
      name: "Bruno Basini",
      role: "Co-Fundador & CPO",
      bio: "Especialista em produto com background em jornalismo investigativo e desenvolvimento de plataformas digitais.",
      expertise: ["Produto", "UX", "Jornalismo"],
    },
    {
      name: "Kalil Souza",
      role: "Co-Fundador",
      bio: "Executivo experiente em operações e crescimento de startups de tecnologia com foco em impacto social.",
      expertise: ["Operações", "Crescimento", "Impacto"],
    },
    {
      name: "Rafael Montilla",
      role: "CTO",
      bio: "Arquiteto de software com expertise em sistemas distribuídos e machine learning aplicado à verificação de informação.",
      expertise: ["Tecnologia", "ML", "Arquitetura"],
    },
    {
      name: "Igor Teisen",
      role: "CMO",
      bio: "Especialista em marketing digital e comunicação estratégica com foco em tecnologia e transparência informacional.",
      expertise: ["Marketing", "Comunicação", "Branding"],
    },
  ]

  return (
    <main className="min-h-screen bg-[#0d0d0d] relative overflow-hidden">
      <Navigation />

      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-4xl mx-auto space-y-16">
          <div
            id="header"
            data-animate
            className={`text-center space-y-6 transition-all duration-1000 ${
              visibleSections.has("header") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <DuckGuide isActive={true} className="mx-auto" />
            <h1 className="text-4xl md:text-6xl font-bold text-[#E0E0E0] text-balance">
              Vivemos numa era de contradições
            </h1>
            <p className="text-xl text-[#a3a3a3] text-balance max-w-3xl mx-auto leading-relaxed">
              O acesso à informação nunca foi tão fácil, mas a confiança na verdade nunca foi tão frágil. Os factos
              tornaram-se areia movediça numa paisagem digital onde a linha entre realidade e ficção se desvanece.
            </p>
          </div>

          <div
            id="problem"
            data-animate
            className={`space-y-12 transition-all duration-1000 delay-200 ${
              visibleSections.has("problem") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-[#ffbc59]">A Crise da Realidade Factual</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#ffbc59] to-[#ff9500] mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6 group">
                <h3 className="text-xl font-semibold text-[#E0E0E0] group-hover:text-[#ffbc59] transition-colors duration-300">
                  A Erosão do{" "}
                  <span className="hover:bg-[#ffbc59] hover:text-[#0d0d0d] px-1 rounded transition-all duration-300 cursor-pointer">
                    Facto
                  </span>
                </h3>
                <p className="text-[#a3a3a3] leading-relaxed group-hover:text-[#c0c0c0] transition-colors duration-300">
                  A linha entre facto e{" "}
                  <span className="hover:opacity-70 hover:blur-sm transition-all duration-300 cursor-pointer">
                    opinião
                  </span>{" "}
                  tornou-se perigosamente ténue. Vivemos num mundo onde narrativas pessoais competem com evidências
                  verificáveis, criando um terreno fértil para a desinformação.
                </p>
              </div>

              <div className="space-y-6 group">
                <h3 className="text-xl font-semibold text-[#E0E0E0] group-hover:text-[#ffbc59] transition-colors duration-300">
                  As Bolhas Algorítmicas
                </h3>
                <p className="text-[#a3a3a3] leading-relaxed group-hover:text-[#c0c0c0] transition-colors duration-300">
                  A tecnologia aprisionou-nos em ecos das nossas próprias crenças. Os algoritmos, desenhados para
                  engagement, aprofundam a polarização ao mostrar-nos apenas aquilo que confirma os nossos preconceitos.
                </p>
              </div>
            </div>

            <div className="relative h-64 bg-[#1a1a1a] rounded-lg overflow-hidden group">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex space-x-8">
                  <div
                    className="w-24 h-24 bg-[#ff6b6b]/30 rounded-full flex items-center justify-center border-2 border-[#ff6b6b] 
                                  group-hover:translate-x-[-20px] transition-transform duration-1000 cursor-pointer hover:scale-110"
                  >
                    <span className="text-[#ff6b6b] text-sm font-medium">Bolha A</span>
                  </div>
                  <div
                    className="w-24 h-24 bg-[#4ecdc4]/30 rounded-full flex items-center justify-center border-2 border-[#4ecdc4] 
                                  group-hover:translate-x-[20px] transition-transform duration-1000 cursor-pointer hover:scale-110"
                  >
                    <span className="text-[#4ecdc4] text-sm font-medium">Bolha B</span>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-[#a3a3a3] text-sm">
                Passe o rato para ver a polarização
              </div>
            </div>
          </div>

          <div
            id="solution"
            data-animate
            className={`space-y-12 transition-all duration-1000 delay-400 ${
              visibleSections.has("solution") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-[#ffbc59]">A Reconquista do Facto</h2>
              <p className="text-xl text-[#a3a3a3] max-w-2xl mx-auto">
                A tecnologia foi parte do problema. Acreditamos que deve ser o caminho para a solução.
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-[#ffbc59] to-[#ff9500] mx-auto rounded-full"></div>
            </div>

            <div className="bg-[#2a2a2a] rounded-lg p-8 space-y-8 hover:bg-[#2f2f2f] transition-all duration-500">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-[#E0E0E0]">A Nossa Visão</h3>
                <p className="text-[#a3a3a3] leading-relaxed max-w-3xl mx-auto">
                  Um futuro onde a confiança na informação é uma prova, não uma promessa. Onde a integridade é a
                  arquitetura do sistema, não uma funcionalidade adicional.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Restaurar o Pensamento Crítico",
                    desc: "Equipar o leitor com as ferramentas para pensar por conta própria",
                    icon: "🧠→🕸️",
                  },
                  {
                    title: "Combater a Desinformação na Raiz",
                    desc: "Focar em contexto, não em censura",
                    icon: "🔍",
                  },
                  {
                    title: "Construir um Ecossistema de Confiança",
                    desc: "Criar uma plataforma onde a integridade é estrutural",
                    icon: "🏗️",
                  },
                ].map((mission, index) => (
                  <div
                    key={index}
                    className="text-center space-y-4 p-6 rounded-lg hover:bg-[#3a3a3a] transition-all duration-300 cursor-pointer group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                      {mission.icon}
                    </div>
                    <h4 className="text-lg font-semibold text-[#E0E0E0] group-hover:text-[#ffbc59] transition-colors duration-300">
                      {mission.title}
                    </h4>
                    <p className="text-[#a3a3a3] text-sm group-hover:text-[#c0c0c0] transition-colors duration-300">
                      {mission.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            id="principles"
            data-animate
            className={`space-y-12 transition-all duration-1000 delay-600 ${
              visibleSections.has("principles") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-[#ffbc59]">A Arquitetura da Confiança</h2>
              <p className="text-xl text-[#a3a3a3]">Não pedimos a sua confiança. Conquistamo-la a cada segundo.</p>
              <div className="w-24 h-1 bg-gradient-to-r from-[#ffbc59] to-[#ff9500] mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Transparência Radical",
                  motto: "Não confie, verifique.",
                  desc: "Todos os nossos processos são abertos e auditáveis. O código é público, os dados são rastreáveis.",
                },
                {
                  title: "Imparcialidade Verificável",
                  motto: "O processo, não a alegação.",
                  desc: "Focamos em metodologias rigorosas, não em conclusões pré-determinadas.",
                },
                {
                  title: "Empoderamento do Utilizador",
                  motto: "O utilizador como protagonista.",
                  desc: "Fornecemos ferramentas, não verdades. O pensamento crítico é seu, não nosso.",
                },
                {
                  title: "Sustentabilidade Ética",
                  motto: "A missão acima do lucro.",
                  desc: "O nosso modelo de negócio alinha-se com o bem público, não contra ele.",
                },
              ].map((principle, index) => (
                <div
                  key={index}
                  className="bg-[#2a2a2a] rounded-lg p-6 space-y-4 hover:bg-[#2f2f2f] hover:scale-105 transition-all duration-500 cursor-pointer group border-2 border-transparent hover:border-[#ffbc59]/30"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-[#E0E0E0] group-hover:text-[#ffbc59] transition-colors duration-300">
                      {principle.title}
                    </h3>
                    <p className="text-sm font-medium text-[#ffbc59] italic">"{principle.motto}"</p>
                  </div>
                  <p className="text-[#a3a3a3] text-sm leading-relaxed group-hover:text-[#c0c0c0] transition-colors duration-300">
                    {principle.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Team section remains the same structure but with updated members */}
          <div
            id="team"
            data-animate
            className={`space-y-8 transition-all duration-1000 delay-800 ${
              visibleSections.has("team") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-[#ffbc59]">Nossa Equipe</h2>
              <p className="text-[#a3a3a3]">Os arquitetos da nova era informacional</p>
              <div className="w-24 h-1 bg-gradient-to-r from-[#ffbc59] to-[#ff9500] mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-5 gap-6">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className={`relative cursor-pointer transition-all duration-500 ${
                    selectedMember === index ? "transform scale-105 z-10" : "hover:transform hover:scale-102"
                  }`}
                  onClick={() => setSelectedMember(selectedMember === index ? null : index)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`bg-[#2a2a2a] rounded-lg p-6 text-center space-y-4 border-2 transition-all duration-500 hover:shadow-lg ${
                      selectedMember === index
                        ? "border-[#ffbc59] shadow-lg shadow-[#ffbc59]/20 bg-[#2f2f2f]"
                        : "border-transparent hover:border-[#ffbc59]/50 hover:bg-[#2f2f2f]"
                    }`}
                  >
                    <div
                      className={`w-20 h-20 mx-auto bg-gradient-to-br from-[#ffbc59] to-[#ff9500] rounded-full flex items-center justify-center text-2xl font-bold text-[#0d0d0d] transition-all duration-300 ${
                        selectedMember === index ? "animate-pulse" : "hover:scale-110"
                      }`}
                    >
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#E0E0E0]">{member.name}</h3>
                      <p className="text-sm text-[#ffbc59]">{member.role}</p>
                    </div>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {member.expertise.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-[#ffbc59]/20 text-[#ffbc59] text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedMember !== null && (
              <div className="bg-[#1a1a1a] rounded-lg p-8 border border-[#ffbc59]/30 transition-all duration-500 animate-in slide-in-from-bottom-4">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#ffbc59] to-[#ff9500] rounded-full flex items-center justify-center text-xl font-bold text-[#0d0d0d] flex-shrink-0">
                    {teamMembers[selectedMember].name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-xl font-bold text-[#E0E0E0]">{teamMembers[selectedMember].name}</h3>
                      <p className="text-[#ffbc59] font-medium">{teamMembers[selectedMember].role}</p>
                    </div>
                    <p className="text-[#a3a3a3] leading-relaxed">{teamMembers[selectedMember].bio}</p>
                    <div className="flex flex-wrap gap-2">
                      {teamMembers[selectedMember].expertise.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 bg-[#ffbc59]/20 text-[#ffbc59] text-sm rounded-full border border-[#ffbc59]/30"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
