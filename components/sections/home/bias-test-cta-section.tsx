import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Target, Brain } from "lucide-react"
import Link from "next/link"

const BiasTestCtaSection = () => {
  return (
    <section className="w-full py-[clamp(3rem,8vw,10rem)] md:py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-highlight/5 via-transparent to-highlight/5 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <Card className="max-w-6xl mx-auto bg-card/40 backdrop-blur-md p-[clamp(1.5rem,4vw,3rem)] md:p-12 border-2 border-border/30 overflow-hidden group relative transition-all duration-500 hover:border-highlight/40 hover:shadow-2xl hover:shadow-highlight/10 rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-highlight/5 via-transparent to-highlight/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="grid lg:grid-cols-2 gap-[clamp(2rem,6vw,3rem)] items-center relative z-10">
            <div className="space-y-[clamp(1rem,3vw,1.5rem)]">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-highlight/10 border border-highlight/20 rounded-full mb-4">
                <Brain className="w-4 h-4 text-highlight" />
                <span className="text-highlight font-medium text-sm uppercase tracking-wider">Autoconhecimento</span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                Desafie sua <span className="text-gradient">perspectiva</span>.
              </h2>

              <p className="text-lg text-muted-foreground text-balance leading-relaxed">
                Antes de analisar o mundo, que tal entender seu próprio ponto de partida? Desenvolvemos uma ferramenta
                para ajudá-lo a visualizar seu espectro de opinião e a reconhecer os vieses que todos nós possuímos.
              </p>

              <Button
                size="lg"
                className="bg-highlight text-background hover:bg-highlight/90 text-base font-semibold group/button transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-highlight/25 px-8 py-4"
                asChild
              >
                <Link href="/quiz">
                  <Target className="w-5 h-5 mr-2 group-hover/button:animate-pulse" />
                  Fazer o Teste de Viés
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover/button:translate-x-1" />
                </Link>
              </Button>
            </div>

            <div className="flex items-center justify-center aspect-square bg-background/30 rounded-2xl border-2 border-border/30 relative overflow-hidden group-hover:border-highlight/30 transition-all duration-500">
              {/* Animated background */}
              <div className="absolute inset-0 bg-mesh-gradient opacity-30" />

              {/* Floating elements */}
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 bg-highlight/30 rounded-full animate-float"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${3 + Math.random() * 2}s`,
                  }}
                />
              ))}

              {/* Central visualization */}
              <div className="relative z-10 text-center space-y-4">
                <div className="w-24 h-24 bg-gradient-to-br from-highlight/20 to-highlight/10 rounded-full flex items-center justify-center mx-auto animate-glow-pulse">
                  <Target className="w-12 h-12 text-highlight" />
                </div>
                <div className="space-y-2">
                  <span className="text-highlight font-medium block">Espectro de Opinião</span>
                  <span className="text-muted-foreground text-sm block">Visualização Interativa</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

export default BiasTestCtaSection
