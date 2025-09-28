"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight, TrendingUp, Shield, Brain, Users, Eye, Target, Zap, Globe } from "lucide-react"

const products = [
  {
    name: "Prisma™ Intelligence Suite",
    subtitle: "SaaS Platform",
    description: "Dashboard central de inteligência de narrativa para organizações",
    target: "CMO, CCO, Relações Públicas",
    problem: "Empresas cegas ao contexto e viés das narrativas",
    solution: "Inteligência de narrativa proativa",
    icon: <Eye className="w-8 h-8" />,
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Argus Advisory™",
    subtitle: "Consultoria de Elite",
    description: "Relatórios de inteligência sob medida para decisões de alto risco",
    target: "CEOs, Conselhos, Private Equity",
    problem: "Due diligence ignora riscos narrativos",
    solution: "Due diligence de narrativa",
    icon: <Shield className="w-8 h-8" />,
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Augur™ Data Feeds",
    subtitle: "Dados como Serviço",
    description: "Feed de dados em tempo real com sinais preditivos",
    target: "Hedge Funds, Gestores de Portfólio",
    problem: "Dados tradicionais comoditizados",
    solution: "Sinal preditivo proprietário",
    icon: <TrendingUp className="w-8 h-8" />,
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "Sapiens™ for Education",
    subtitle: "Licenciamento B2B2C",
    description: "Tecnologia adaptada para instituições de ensino",
    target: "Universidades, Grupos Educacionais",
    problem: "Falta de laboratórios práticos para pensamento crítico",
    solution: "Simulador de voo para pensamento crítico",
    icon: <Brain className="w-8 h-8" />,
    color: "from-orange-500 to-red-500",
  },
]

const pricingTiers = [
  {
    name: "Starter",
    price: "€2,500",
    period: "/mês",
    description: "Para equipas pequenas que começam a explorar inteligência de narrativa",
    features: [
      "Prisma™ Intelligence Suite (até 5 utilizadores)",
      "Monitorização de até 10 tópicos",
      "Relatórios mensais automatizados",
      "Suporte por email",
      "Dashboard básico de narrativas",
    ],
    cta: "Começar Agora",
    popular: false,
  },
  {
    name: "Professional",
    price: "€7,500",
    period: "/mês",
    description: "Para organizações que precisam de inteligência avançada",
    features: [
      "Prisma™ Intelligence Suite (até 25 utilizadores)",
      "Monitorização ilimitada de tópicos",
      "Relatórios semanais personalizados",
      "Augur™ Data Feeds (acesso básico)",
      "Suporte prioritário 24/7",
      "Análise de sentimento avançada",
      "Alertas em tempo real",
    ],
    cta: "Escolher Professional",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "€25,000",
    period: "/mês",
    description: "Para grandes corporações com necessidades complexas",
    features: [
      "Prisma™ Intelligence Suite (utilizadores ilimitados)",
      "Argus Advisory™ (2 relatórios/mês)",
      "Augur™ Data Feeds (acesso completo)",
      "API personalizada e integrações",
      "Gestor de conta dedicado",
      "Formação personalizada da equipa",
      "SLA garantido de 99.9%",
    ],
    cta: "Contactar Vendas",
    popular: false,
  },
  {
    name: "Oracle Elite",
    price: "Personalizado",
    period: "",
    description: "Soluções sob medida para organizações de topo mundial",
    features: [
      "Todos os produtos Oracle Intelligence",
      "Argus Advisory™ (relatórios ilimitados)",
      "Sapiens™ for Education (se aplicável)",
      "Desenvolvimento de funcionalidades personalizadas",
      "Consultoria estratégica contínua",
      "Acesso direto à equipa de investigação",
      "Implementação white-label disponível",
    ],
    cta: "Agendar Consulta",
    popular: false,
  },
]

export default function BusinessPage() {
  const [activeProduct, setActiveProduct] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="mb-6">
              <Badge variant="outline" className="text-[#ffbc59] border-[#ffbc59] mb-4">
                Oracle Intelligence
              </Badge>
              <p className="text-sm text-muted-foreground">powered by Phato</p>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
              Clarity in <span className="text-[#ffbc59]">Complexity</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto text-balance">
              Não vendemos notícias ou monitorização de média. Vendemos{" "}
              <strong className="text-foreground">vantagem decisória</strong>. Num mundo onde a narrativa pode construir
              ou destruir valor mais rápido do que qualquer balanço financeiro.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[#ffbc59] text-black hover:bg-[#e6a84d] text-lg px-8 py-6">
                Agendar Demonstração
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent">
                Ver Caso de Estudo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              A Suíte <span className="text-[#ffbc59]">Oracle Intelligence</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Quatro produtos integrados que transformam como as organizações navegam a complexidade informacional
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <div className="space-y-4">
              {products.map((product, index) => (
                <Card
                  key={index}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                    activeProduct === index
                      ? "border-[#ffbc59] bg-[#ffbc59]/5"
                      : "border-border hover:border-[#ffbc59]/50"
                  }`}
                  onClick={() => setActiveProduct(index)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${product.color}`}>{product.icon}</div>
                      <div>
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        <CardDescription>{product.subtitle}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div className="lg:sticky lg:top-32">
              <Card className="border-[#ffbc59] bg-[#ffbc59]/5">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${products[activeProduct].color}`}>
                      {products[activeProduct].icon}
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{products[activeProduct].name}</CardTitle>
                      <CardDescription className="text-lg">{products[activeProduct].subtitle}</CardDescription>
                    </div>
                  </div>
                  <p className="text-lg text-muted-foreground mb-6">{products[activeProduct].description}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4 text-[#ffbc59]" />
                      Cliente-Alvo
                    </h4>
                    <p className="text-muted-foreground">{products[activeProduct].target}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-[#ffbc59]" />
                      Problema que Resolve
                    </h4>
                    <p className="text-muted-foreground">{products[activeProduct].problem}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#ffbc59]" />
                      Solução Única
                    </h4>
                    <p className="text-muted-foreground">{products[activeProduct].solution}</p>
                  </div>
                  <Button className="w-full bg-[#ffbc59] text-black hover:bg-[#e6a84d]">
                    Saber Mais sobre {products[activeProduct].name}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Planos de <span className="text-[#ffbc59]">Investimento</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Escolha o nível de inteligência que a sua organização precisa para navegar a complexidade
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingTiers.map((tier, index) => (
              <Card
                key={index}
                className={`relative transition-all duration-300 hover:scale-105 ${
                  tier.popular ? "border-[#ffbc59] bg-[#ffbc59]/5 scale-105" : "border-border hover:border-[#ffbc59]/50"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-[#ffbc59] text-black">Mais Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    <span className="text-muted-foreground">{tier.period}</span>
                  </div>
                  <CardDescription className="mt-4 text-sm">{tier.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-[#ffbc59] mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full mt-6 ${
                      tier.popular
                        ? "bg-[#ffbc59] text-black hover:bg-[#e6a84d]"
                        : "bg-background border border-[#ffbc59] text-[#ffbc59] hover:bg-[#ffbc59] hover:text-black"
                    }`}
                  >
                    {tier.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Precisa de algo diferente? Todos os planos podem ser personalizados.
            </p>
            <Button
              variant="outline"
              size="lg"
              className="border-[#ffbc59] text-[#ffbc59] hover:bg-[#ffbc59] hover:text-black bg-transparent"
            >
              <Users className="mr-2 w-5 h-5" />
              Falar com Especialista
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto para a <span className="text-[#ffbc59]">Vantagem Decisória</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Junte-se às organizações líderes que já usam Oracle Intelligence para navegar a complexidade e tomar
            decisões baseadas em factos, não em ruído.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#ffbc59] text-black hover:bg-[#e6a84d] text-lg px-8 py-6">
              <Globe className="mr-2 w-5 h-5" />
              Agendar Demonstração Executiva
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent">
              Descarregar Caso de Estudo
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
