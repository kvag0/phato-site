"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import { Play, Pause, Zap, Eye, Shield, MessageCircle, Activity, AlertTriangle } from "lucide-react"

const sharedNewsData = [
  {
    id: 1,
    title: "Empresa X anunciou investimento de €50M",
    date: "2024-01-15",
    confidence: 0.95,
    source: "Reuters",
    impact: "positive",
    marketEffect: 2.3,
  },
  {
    id: 2,
    title: "Taxa de juro mantida em 4.5%",
    date: "2024-01-14",
    confidence: 0.98,
    source: "BCE",
    impact: "neutral",
    marketEffect: -0.5,
  },
  {
    id: 3,
    title: "Inflação registou 2.1% em novembro",
    date: "2024-01-13",
    confidence: 0.92,
    source: "INE",
    impact: "negative",
    marketEffect: -1.2,
  },
  {
    id: 4,
    title: "Exportações cresceram 3.2% no trimestre",
    date: "2024-01-12",
    confidence: 0.89,
    source: "Eurostat",
    impact: "positive",
    marketEffect: 1.8,
  },
  {
    id: 5,
    title: "Desemprego desceu para 6.8%",
    date: "2024-01-11",
    confidence: 0.94,
    source: "IEFP",
    impact: "positive",
    marketEffect: 0.9,
  },
]

export default function TecnologiaPage() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [activeDemo, setActiveDemo] = useState<string | null>(null)
  const [factStreamFacts, setFactStreamFacts] = useState<Array<{ text: string; confidence: number; source: string }>>(
    [],
  )

  // Analysis Realm state
  const [analysisProgress, setAnalysisProgress] = useState(0) // 0-1 progress through realm
  const [isInAnalysisRealm, setIsInAnalysisRealm] = useState(false)

  // Other functionality states
  const [narrativeComparison, setNarrativeComparison] = useState({
    source1: "",
    source2: "",
    analyzing: false,
    facts: [] as any[],
  })
  const [chatResponse, setChatResponse] = useState("")
  const [smokeScreenAlert, setSmokeScreenAlert] = useState({
    active: false,
    hiddenNews: "",
    distractingNews: "",
  })

  const analysisRealmRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!analysisRealmRef.current) return

      const rect = analysisRealmRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Check if we're in the analysis realm
      if (rect.top <= 0 && rect.bottom >= windowHeight) {
        setIsInAnalysisRealm(true)

        // Calculate progress through the realm (0 to 1)
        const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - windowHeight)))
        setAnalysisProgress(progress)
      } else {
        setIsInAnalysisRealm(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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

    return () => {
      observer.disconnect()
    }
  }, [])

  const startFactStreamDemo = () => {
    if (factStreamFacts.length > 0) return

    setActiveDemo("fact-stream")

    sharedNewsData.forEach((news, index) => {
      setTimeout(() => {
        setFactStreamFacts((prev) => [
          ...prev,
          {
            text: news.title,
            confidence: news.confidence,
            source: news.source,
          },
        ])
      }, index * 800)
    })

    setTimeout(
      () => {
        setActiveDemo(null)
      },
      sharedNewsData.length * 800 + 1000,
    )
  }

  const startNarrativeDemo = () => {
    if (narrativeComparison.facts.length > 0) return

    setActiveDemo("narrative")
    setNarrativeComparison({
      source1: "Jornal Conservador",
      source2: "Jornal Progressista",
      analyzing: true,
      facts: [],
    })

    setTimeout(() => {
      const facts = sharedNewsData.slice(0, 3).map((news) => ({
        text: news.title,
        source1Includes: Math.random() > 0.5,
        source2Includes: Math.random() > 0.5,
        bias: news.impact,
      }))

      setNarrativeComparison((prev) => ({
        ...prev,
        analyzing: false,
        facts,
      }))
      setActiveDemo(null)
    }, 2500)
  }

  const startChatDemo = () => {
    if (chatResponse) return

    setActiveDemo("chat")

    setTimeout(() => {
      const response = `Baseado nos ${sharedNewsData.length} factos analisados, existe uma correlação entre as políticas do BCE (taxa de juro a 4.5%) e o crescimento das exportações (3.2%). O investimento de €50M da Empresa X pode estar relacionado com a estabilidade monetária. Esta combinação sugere um ambiente favorável para investimentos de médio prazo.`
      setChatResponse(response)
      setActiveDemo(null)
    }, 2000)
  }

  const triggerSmokeScreenAlert = () => {
    if (smokeScreenAlert.active) return

    setSmokeScreenAlert({
      active: true,
      hiddenNews: "Nova lei de proteção de dados aprovada sem debate público",
      distractingNews: "Celebridade anuncia divórcio - trending topic há 6 horas",
    })

    setTimeout(() => {
      setSmokeScreenAlert((prev) => ({ ...prev, active: false }))
    }, 8000)
  }

  const getCurrentAnalysisPhase = () => {
    if (analysisProgress < 0.33) return "causal"
    if (analysisProgress < 0.66) return "timeline"
    return "economy"
  }

  const getAnalysisContent = () => {
    const phase = getCurrentAnalysisPhase()

    switch (phase) {
      case "causal":
        return {
          title: "Mapeamento Causal",
          description:
            "Visualizando as conexões entre os factos extraídos, revelando a teia de causalidade que conecta eventos aparentemente isolados.",
        }
      case "timeline":
        return {
          title: "Sequência Temporal",
          description:
            "Organizando os eventos cronologicamente para compreender a progressão natural dos acontecimentos e suas interdependências.",
        }
      case "economy":
        return {
          title: "Impacto Económico",
          description:
            "Analisando como cada evento influencia diretamente os mercados financeiros e a economia em tempo real.",
        }
      default:
        return {
          title: "Análise Phato",
          description: "Transformando dados em conhecimento através de visualizações inteligentes.",
        }
    }
  }

  return (
    <main className="min-h-screen bg-[#0d0d0d]">
      <Navigation />

      <div className="container mx-auto px-4 py-24">
        <div className="max-w-7xl mx-auto space-y-20">
          {/* Header */}
          <div
            id="header"
            data-animate
            className={`text-center space-y-6 transition-all duration-1000 ${
              visibleSections.has("header") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-[#E0E0E0] text-balance">Tecnologia Phato</h1>
            <p className="text-xl text-[#a3a3a3] text-balance max-w-4xl mx-auto">
              Ferramentas inteligentes que transformam como você consome, analisa e compreende informação
            </p>
          </div>

          {/* Fact Stream - Limited to 5 news */}
          <div
            id="fact-stream"
            data-animate
            className={`transition-all duration-1000 delay-200 ${
              visibleSections.has("fact-stream") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-[#2a2a2a] rounded-xl p-8 space-y-6 border border-[#3d3d3d] hover:border-[#ffbc59]/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#ffbc59]/20 rounded-lg">
                  <Zap className="w-6 h-6 text-[#ffbc59]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#ffbc59]">Fluxo de Factos</h2>
                  <p className="text-[#a3a3a3]">Informação pura, sem narrativa</p>
                </div>
              </div>

              <p className="text-[#c0c0c0] leading-relaxed">
                Receba factos atómicos extraídos pela nossa IA, livres de interpretação ou viés. Cada alegação é
                verificável e rastreável à sua fonte original com níveis de confiança em tempo real.
              </p>

              <div className="bg-[#0d0d0d] rounded-lg p-6 border border-[#3d3d3d]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-[#a3a3a3] flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Extração em Tempo Real
                  </span>
                  <Button
                    onClick={startFactStreamDemo}
                    disabled={activeDemo === "fact-stream"}
                    className="bg-[#ffbc59] text-[#0d0d0d] hover:bg-[#ffbc59]/90 transition-all hover:scale-105"
                  >
                    {activeDemo === "fact-stream" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {activeDemo === "fact-stream" ? "Extraindo..." : "Extrair Factos"}
                  </Button>
                </div>

                <div className="min-h-[200px]">
                  {factStreamFacts.length > 0 && (
                    <div className="space-y-3">
                      {factStreamFacts.map((fact, index) => (
                        <div
                          key={index}
                          className="p-4 bg-[#1a1a1a] rounded border-l-4 border-[#ffbc59] animate-in slide-in-from-bottom duration-500"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="flex items-start justify-between">
                            <span className="text-[#E0E0E0] flex-1">{fact.text}</span>
                            <div className="ml-4 text-right">
                              <div className="text-xs text-[#a3a3a3]">{fact.source}</div>
                              <div className="text-xs text-[#ffbc59]">
                                {(fact.confidence * 100).toFixed(0)}% confiança
                              </div>
                            </div>
                          </div>
                          <div className="mt-2 bg-[#2a2a2a] rounded-full h-1">
                            <div
                              className="bg-[#ffbc59] h-1 rounded-full transition-all duration-1000"
                              style={{ width: `${fact.confidence * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {factStreamFacts.length === 0 && (
                    <div className="flex items-center justify-center h-32 text-[#a3a3a3]">
                      Clique para ver a extração de factos em ação
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div
            ref={analysisRealmRef}
            className="h-[300vh] relative"
            style={{ position: isInAnalysisRealm ? "relative" : "static" }}
          >
            <div
              className={`${isInAnalysisRealm ? "fixed top-0 left-0 w-full h-screen" : "relative h-screen"} bg-[#0d0d0d] flex items-center justify-center transition-all duration-300`}
            >
              <div className="w-full h-full px-4">
                <div className="w-full h-full flex flex-col justify-center">
                  {/* Morphing Title and Description */}
                  <div className="text-center mb-12 space-y-4">
                    <h2 className="text-4xl md:text-6xl font-bold text-[#ffbc59] transition-all duration-1000">
                      {getAnalysisContent().title}
                    </h2>
                    <p className="text-lg md:text-xl text-[#a3a3a3] max-w-4xl mx-auto transition-all duration-1000">
                      {getAnalysisContent().description}
                    </p>
                  </div>

                  {/* Morphing Visualization - Full Screen */}
                  <div className="flex-1 flex items-center justify-center min-h-[60vh]">
                    <canvas
                      ref={canvasRef}
                      width={1200}
                      height={600}
                      className="w-full h-full max-w-none max-h-none rounded bg-transparent"
                    />
                  </div>

                  {/* Phase Indicators */}
                  <div className="flex justify-center mt-8 space-x-12">
                    {[
                      { phase: "Causal", key: "causal" },
                      { phase: "Temporal", key: "timeline" },
                      { phase: "Económico", key: "economy" },
                    ].map(({ phase, key }, index) => (
                      <div
                        key={phase}
                        className={`text-center transition-all duration-500 ${
                          getCurrentAnalysisPhase() === key ? "text-[#ffbc59] scale-110" : "text-[#666]"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full mx-auto mb-3 transition-all duration-500 ${
                            analysisProgress > index * 0.33 ? "bg-[#ffbc59]" : "bg-[#666]"
                          }`}
                        />
                        <span className="text-base font-medium">{phase}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {typeof window !== "undefined" && (
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  (function() {
                    const canvas = document.querySelector('canvas');
                    if (!canvas) return;
                    
                    const ctx = canvas.getContext('2d');
                    let animationId;
                    
                    function drawCausalMap(progress) {
                      ctx.clearRect(0, 0, canvas.width, canvas.height);
                      
                      // Draw nodes
                      const nodes = [
                        { x: 200, y: 150, active: progress > 0.1 },
                        { x: 400, y: 100, active: progress > 0.3 },
                        { x: 600, y: 200, active: progress > 0.5 },
                        { x: 300, y: 250, active: progress > 0.7 },
                        { x: 500, y: 300, active: progress > 0.9 }
                      ];
                      
                      // Draw connections
                      ctx.strokeStyle = '#ffbc59';
                      ctx.lineWidth = 2;
                      nodes.forEach((node, i) => {
                        if (i < nodes.length - 1 && node.active) {
                          ctx.beginPath();
                          ctx.moveTo(node.x, node.y);
                          ctx.lineTo(nodes[i + 1].x, nodes[i + 1].y);
                          ctx.stroke();
                        }
                      });
                      
                      // Draw nodes
                      nodes.forEach(node => {
                        ctx.fillStyle = node.active ? '#ffbc59' : '#666';
                        ctx.beginPath();
                        ctx.arc(node.x, node.y, node.active ? 8 : 4, 0, Math.PI * 2);
                        ctx.fill();
                      });
                    }
                    
                    function drawTimeline(progress) {
                      ctx.clearRect(0, 0, canvas.width, canvas.height);
                      
                      const y = canvas.height / 2;
                      const startX = 100;
                      const endX = canvas.width - 100;
                      
                      // Draw timeline line
                      ctx.strokeStyle = '#ffbc59';
                      ctx.lineWidth = 3;
                      ctx.beginPath();
                      ctx.moveTo(startX, y);
                      ctx.lineTo(startX + (endX - startX) * progress, y);
                      ctx.stroke();
                      
                      // Draw events
                      const events = 5;
                      for (let i = 0; i < events; i++) {
                        const x = startX + (endX - startX) * (i / (events - 1));
                        const active = progress > i / events;
                        
                        ctx.fillStyle = active ? '#ffbc59' : '#666';
                        ctx.beginPath();
                        ctx.arc(x, y, active ? 8 : 4, 0, Math.PI * 2);
                        ctx.fill();
                        
                        if (active) {
                          ctx.fillStyle = '#ffbc59';
                          ctx.font = '12px sans-serif';
                          ctx.textAlign = 'center';
                          ctx.fillText('2024-01-' + (15 - i), x, y - 20);
                        }
                      }
                    }
                    
                    function drawEconomyGraph(progress) {
                      ctx.clearRect(0, 0, canvas.width, canvas.height);
                      
                      const padding = 50;
                      const graphWidth = canvas.width - 2 * padding;
                      const graphHeight = canvas.height - 2 * padding;
                      
                      // Draw axes
                      ctx.strokeStyle = '#666';
                      ctx.lineWidth = 2;
                      ctx.beginPath();
                      ctx.moveTo(padding, padding);
                      ctx.lineTo(padding, canvas.height - padding);
                      ctx.lineTo(canvas.width - padding, canvas.height - padding);
                      ctx.stroke();
                      
                      // Draw economic line
                      const points = [
                        { x: 0, y: 0.5 },
                        { x: 0.2, y: 0.3 },
                        { x: 0.4, y: 0.7 },
                        { x: 0.6, y: 0.4 },
                        { x: 0.8, y: 0.6 },
                        { x: 1, y: 0.5 }
                      ];
                      
                      ctx.strokeStyle = '#ffbc59';
                      ctx.lineWidth = 3;
                      ctx.beginPath();
                      
                      const visiblePoints = Math.floor(points.length * progress);
                      points.slice(0, visiblePoints + 1).forEach((point, i) => {
                        const x = padding + point.x * graphWidth;
                        const y = padding + (1 - point.y) * graphHeight;
                        
                        if (i === 0) {
                          ctx.moveTo(x, y);
                        } else {
                          ctx.lineTo(x, y);
                        }
                      });
                      ctx.stroke();
                      
                      // Draw data points
                      points.slice(0, visiblePoints + 1).forEach(point => {
                        const x = padding + point.x * graphWidth;
                        const y = padding + (1 - point.y) * graphHeight;
                        
                        ctx.fillStyle = '#ffbc59';
                        ctx.beginPath();
                        ctx.arc(x, y, 6, 0, Math.PI * 2);
                        ctx.fill();
                      });
                    }
                    
                    function animate() {
                      const progress = window.analysisProgress || 0;
                      const phase = progress < 0.33 ? 'causal' : progress < 0.66 ? 'timeline' : 'economy';
                      
                      switch (phase) {
                        case 'causal':
                          drawCausalMap(progress * 3);
                          break;
                        case 'timeline':
                          drawTimeline((progress - 0.33) * 3);
                          break;
                        case 'economy':
                          drawEconomyGraph((progress - 0.66) * 3);
                          break;
                      }
                      
                      animationId = requestAnimationFrame(animate);
                    }
                    
                    animate();
                    
                    // Cleanup
                    window.addEventListener('beforeunload', () => {
                      if (animationId) cancelAnimationFrame(animationId);
                    });
                  })();
                `,
              }}
            />
          )}

          {/* Narrative Anatomy */}
          <div
            id="narrative"
            data-animate
            className={`transition-all duration-1000 delay-300 ${
              visibleSections.has("narrative") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-[#2a2a2a] rounded-xl p-8 space-y-6 border border-[#3d3d3d] hover:border-[#ffbc59]/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#ffbc59]/20 rounded-lg">
                  <Eye className="w-6 h-6 text-[#ffbc59]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#ffbc59]">Anatomia de uma Narrativa</h2>
                  <p className="text-[#a3a3a3]">Como os mesmos factos criam narrativas opostas</p>
                </div>
              </div>

              <p className="text-[#c0c0c0] leading-relaxed">
                Veja como diferentes veículos usam os mesmos factos do Fluxo para construir narrativas completamente
                opostas.
              </p>

              <div className="bg-[#0d0d0d] rounded-lg p-6 border border-[#3d3d3d]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-[#a3a3a3] flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Análise de Viés
                  </span>
                  <Button
                    onClick={startNarrativeDemo}
                    disabled={activeDemo === "narrative"}
                    className="bg-[#ffbc59] text-[#0d0d0d] hover:bg-[#ffbc59]/90 transition-all hover:scale-105"
                  >
                    {narrativeComparison.analyzing ? "Analisando..." : "Comparar Narrativas"}
                  </Button>
                </div>

                {narrativeComparison.facts.length > 0 && (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-[#1a1a1a] rounded border border-blue-500/30">
                        <h4 className="text-blue-400 font-medium mb-3">{narrativeComparison.source1}</h4>
                        <div className="space-y-2 text-sm">
                          {narrativeComparison.facts.map((fact, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div
                                className={`w-2 h-2 rounded-full ${fact.source1Includes ? "bg-green-500" : "bg-red-500"}`}
                              ></div>
                              <span className="text-[#c0c0c0]">{fact.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-4 bg-[#1a1a1a] rounded border border-orange-500/30">
                        <h4 className="text-orange-400 font-medium mb-3">{narrativeComparison.source2}</h4>
                        <div className="space-y-2 text-sm">
                          {narrativeComparison.facts.map((fact, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div
                                className={`w-2 h-2 rounded-full ${fact.source2Includes ? "bg-green-500" : "bg-red-500"}`}
                              ></div>
                              <span className="text-[#c0c0c0]">{fact.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-[#a3a3a3] text-center">
                      <span className="inline-flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div> Incluído
                      </span>
                      <span className="inline-flex items-center gap-1 ml-4">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div> Omitido
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Pato Vigia */}
          <div
            id="vigia"
            data-animate
            className={`transition-all duration-1000 delay-400 ${
              visibleSections.has("vigia") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-[#2a2a2a] rounded-xl p-8 space-y-6 border border-[#3d3d3d] hover:border-[#ffbc59]/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#ffbc59]/20 rounded-lg">
                  <Shield className="w-6 h-6 text-[#ffbc59]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#ffbc59]">Pato Vigia</h2>
                  <p className="text-[#a3a3a3]">Detecta "Cortinas de Fumo"</p>
                </div>
              </div>

              <p className="text-[#c0c0c0] leading-relaxed">
                Alerta quando notícias importantes passam despercebidas enquanto a atenção pública está focada noutros
                temas.
              </p>

              <div className="bg-[#0d0d0d] rounded-lg p-6 border border-[#3d3d3d]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-[#a3a3a3] flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Sistema de Vigilância
                  </span>
                  <Button
                    onClick={triggerSmokeScreenAlert}
                    className="bg-[#ffbc59] text-[#0d0d0d] hover:bg-[#ffbc59]/90 transition-all hover:scale-105"
                  >
                    Demonstrar Alerta
                  </Button>
                </div>

                {smokeScreenAlert.active && (
                  <div className="space-y-4">
                    <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                        <h4 className="text-red-400 font-medium">Cortina de Fumo Detectada</h4>
                      </div>

                      <div className="space-y-3">
                        <div className="p-3 bg-[#1a1a1a] rounded border-l-4 border-red-500">
                          <div className="text-xs text-red-400 font-medium mb-1">NOTÍCIA IMPORTANTE IGNORADA</div>
                          <div className="text-sm text-[#E0E0E0]">{smokeScreenAlert.hiddenNews}</div>
                          <div className="text-xs text-[#a3a3a3] mt-1">Cobertura mediática: 2% dos outlets</div>
                        </div>

                        <div className="p-3 bg-[#1a1a1a] rounded border-l-4 border-orange-500">
                          <div className="text-xs text-orange-400 font-medium mb-1">DISTRAÇÃO VIRAL</div>
                          <div className="text-sm text-[#E0E0E0]">{smokeScreenAlert.distractingNews}</div>
                          <div className="text-xs text-[#a3a3a3] mt-1">Cobertura mediática: 78% dos outlets</div>
                        </div>
                      </div>

                      <div className="mt-3 p-2 bg-yellow-900/20 rounded text-xs text-yellow-400">
                        <strong>Significado:</strong> Enquanto todos falam do divórcio, uma lei que afeta a privacidade
                        de milhões foi aprovada sem debate público.
                      </div>
                    </div>
                  </div>
                )}

                {!smokeScreenAlert.active && (
                  <div className="flex items-center justify-center h-32 text-[#a3a3a3]">
                    Clique para ver como funciona a detecção de cortinas de fumo
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Pato-Guia with Special Focus */}
          <div
            id="chat"
            data-animate
            className={`transition-all duration-1000 delay-500 ${
              visibleSections.has("chat") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-gradient-to-br from-[#2a2a2a] to-[#3d3d3d] rounded-xl p-12 space-y-8 border-2 border-[#ffbc59]/50 shadow-2xl shadow-[#ffbc59]/20">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-4">
                  <div className="p-4 bg-[#ffbc59]/30 rounded-xl">
                    <MessageCircle className="w-8 h-8 text-[#ffbc59]" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-[#ffbc59]">Pato-Guia</h2>
                    <p className="text-[#a3a3a3] text-lg">O Assistente que Conecta Todos os Pontos</p>
                  </div>
                </div>

                <p className="text-[#c0c0c0] leading-relaxed text-lg max-w-3xl mx-auto">
                  Depois de analisar todos os factos, conexões causais, sequências temporais e impactos económicos, o
                  Pato-Guia oferece insights únicos que só são possíveis através da análise integrada de toda a
                  informação.
                </p>
              </div>

              <div className="bg-[#0d0d0d] rounded-lg p-8 border border-[#3d3d3d] space-y-6">
                <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                  <div className="text-sm font-medium mb-2 text-blue-400">Pergunta Contextual Inteligente</div>
                  <div className="text-lg text-[#E0E0E0]">
                    "Como os factos analisados se conectam para formar o cenário económico atual e que oportunidades ou
                    riscos isso revela?"
                  </div>
                </div>

                {chatResponse && (
                  <div className="p-6 bg-[#ffbc59]/10 border border-[#ffbc59]/30 rounded-lg animate-in slide-in-from-bottom duration-500">
                    <div className="text-sm font-medium mb-3 text-[#ffbc59] flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      Análise Integrada do Pato-Guia
                    </div>
                    <div className="text-[#E0E0E0] leading-relaxed">{chatResponse}</div>
                  </div>
                )}

                {!chatResponse && (
                  <div className="flex items-center justify-center h-24 text-[#a3a3a3]">
                    Clique para ver a análise contextual completa que conecta todos os elementos
                  </div>
                )}

                <Button
                  onClick={startChatDemo}
                  disabled={activeDemo === "chat"}
                  className="w-full bg-[#ffbc59] text-[#0d0d0d] hover:bg-[#ffbc59]/90 transition-all hover:scale-105 py-4 text-lg font-medium"
                >
                  {activeDemo === "chat" ? "Conectando Todos os Pontos..." : "Conectar Todos os Pontos"}
                </Button>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div
            id="cta"
            data-animate
            className={`bg-gradient-to-r from-[#2a2a2a] to-[#3d3d3d] rounded-xl p-12 text-center space-y-6 transition-all duration-1000 delay-600 ${
              visibleSections.has("cta") ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <h2 className="text-3xl font-bold text-[#E0E0E0]">Pronto para Revolucionar o Seu Consumo de Informação?</h2>
            <p className="text-[#a3a3a3] max-w-2xl mx-auto">
              Junte-se à revolução da verdade e transforme-se num cidadão verdadeiramente informado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-[#ffbc59] text-[#0d0d0d] hover:bg-[#ffbc59]/90 px-8 py-3">
                Começar Gratuitamente
              </Button>
              <Button
                variant="outline"
                className="border-[#ffbc59] text-[#ffbc59] hover:bg-[#ffbc59]/10 px-8 py-3 bg-transparent"
              >
                Agendar Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `window.analysisProgress = ${analysisProgress};`,
        }}
      />
    </main>
  )
}
