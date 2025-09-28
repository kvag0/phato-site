"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    ArrowRight,
    BarChart3,
    Shield,
    TrendingUp,
    GraduationCap,
    Zap,
    Target,
    CheckCircle,
    BookOpen,
    Clock,
    Eye,
    Shuffle,
    BrainCircuit,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// [DATA]: Produtos B2B (inalterado)
const b2bProducts = [
    {
        name: "Plataforma Prisma™",
        subtitle: "SaaS Platform",
        description: "Dashboard central de inteligência de narrativa para organizações que precisam ver o que os outros não veem.",
        target: "CMO, CCO, Relações Públicas",
        problem: "Empresas cegas ao contexto e viés das narrativas que moldam seu mercado.",
        solution: "Inteligência de narrativa proativa e em tempo real para antecipar riscos e oportunidades.",
        icon: <BarChart3 className="w-8 h-8 text-white" />,
        color: "from-blue-500 to-cyan-400",
        link: "/business#prisma",
    },
    {
        name: "Consultoria Argus™",
        subtitle: "Consultoria de Elite",
        description: "Relatórios de inteligência sob medida para decisões de alto risco, onde a clareza narrativa é crucial.",
        target: "CEOs, Conselhos, Private Equity",
        problem: "Due diligence tradicional ignora os riscos narrativos que podem destruir valor pós-transação.",
        solution: "Due diligence de narrativa para fusões, aquisições e gestão de crises.",
        icon: <Shield className="w-8 h-8 text-white" />,
        color: "from-purple-500 to-pink-500",
        link: "/business#argus",
    },
    {
        name: "Phato Augur™",
        subtitle: "Dados como Serviço",
        description: "Feed de dados em tempo real com sinais preditivos gerados a partir da análise de narrativas emergentes.",
        target: "Hedge Funds, Gestores de Portfólio",
        problem: "Dados financeiros tradicionais são comoditizados e perdem poder preditivo.",
        solution: "Sinal preditivo proprietário baseado na evolução de narrativas de alto impacto.",
        icon: <TrendingUp className="w-8 h-8 text-white" />,
        color: "from-green-500 to-emerald-400",
        link: "/business#augur",
    },
    {
        name: "Phato Sapiens™",
        subtitle: "Licenciamento Educacional",
        description: "Nossa tecnologia adaptada para instituições de ensino que buscam preparar a próxima geração de líderes.",
        target: "Universidades, Grupos Educacionais",
        problem: "Falta de ferramentas práticas para ensinar pensamento crítico em um ambiente informacional complexo.",
        solution: "Um 'simulador de voo' para o pensamento crítico, permitindo a análise de casos reais.",
        icon: <GraduationCap className="w-8 h-8 text-white" />,
        color: "from-orange-500 to-red-500",
        link: "/business#sapiens",
    },
];

// [DATA]: Funcionalidades B2C (inalterado)
const b2cFeatures = [
    {
        name: "Resumos Neutros",
        subtitle: "Economia de Tempo",
        description: "Algoritmos extraem a informação essencial, removendo adjetivos e opiniões para entregar o fato puro.",
        problem: "Excesso de informação e artigos opinativos que dificultam o entendimento rápido dos fatos.",
        solution: "Resumos concisos e neutros que vão direto ao ponto, economizando seu tempo e energia mental.",
        technology: "Nossos modelos de linguagem são treinados para identificar e extrair a essência factual de qualquer texto.",
        icon: <Clock className="w-8 h-8 text-white" />,
        color: "from-blue-500 to-cyan-400",
    },
    {
        name: "Análise de Viés",
        subtitle: "Detector de Perspectiva",
        description: "Nossa IA analisa a linguagem e o tom para revelar a inclinação política e emocional de qualquer texto.",
        problem: "É difícil identificar o viés embutido na linguagem e na estrutura de uma notícia.",
        solution: "Uma análise clara e visual do espectro político e do tom da matéria, empoderando sua interpretação.",
        technology: "Utilizamos processamento de linguagem natural (PLN) e análise de sentimento para mapear a carga emocional do conteúdo.",
        icon: <Eye className="w-8 h-8 text-white" />,
        color: "from-purple-500 to-pink-500",
    },
    {
        name: "Contrapontos Automáticos",
        subtitle: "Visão 360°",
        description: "Para cada fato, nossa plataforma busca e apresenta automaticamente o 'outro lado' da história.",
        problem: "Algoritmos nos prendem em 'bolhas' de confirmação, mostrando apenas o que já concordamos.",
        solution: "Acesso instantâneo a perspectivas opostas, quebrando a bolha e promovendo um entendimento completo.",
        technology: "Nossa rede de Agentes de IA busca e compara informações em um vasto espectro de fontes para construir uma visão 360 graus.",
        icon: <Shuffle className="w-8 h-8 text-white" />,
        color: "from-green-500 to-emerald-400",
    },
    {
        name: "Linha do Tempo Interativa",
        subtitle: "Contexto Histórico",
        description: "Visualize a evolução de um acontecimento ao longo do tempo, conectando os pontos e entendendo a origem.",
        problem: "Notícias isoladas não contam a história completa, faltando o contexto de como chegamos até aqui.",
        solution: "Uma linha do tempo visual que organiza os fatos em ordem cronológica, revelando a narrativa completa.",
        technology: "Analisamos a estrutura temporal das narrativas para conectar eventos e revelar como uma história evoluiu.",
        icon: <BookOpen className="w-8 h-8 text-white" />,
        color: "from-orange-500 to-red-500",
    },
];

const ProductsSection = () => {
    const [activeB2BProduct, setActiveB2BProduct] = useState(0);
    const [activeB2CFeature, setActiveB2CFeature] = useState(0);

    return (
        <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                        Um Arsenal para a <span className="text-[#ffbc59]">Mente Crítica</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Ferramentas integradas que transformam como indivíduos e organizações navegam a complexidade informacional.
                    </p>
                </div>

                <Tabs defaultValue="b2c" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-10 h-14 text-base p-1 bg-card/80">
                        <TabsTrigger value="b2c" className="text-lg data-[state=active]:bg-highlight data-[state=active]:text-black rounded-md">Aplicativo Phato</TabsTrigger>
                        <TabsTrigger value="b2b" className="text-lg data-[state=active]:bg-highlight data-[state=active]:text-black rounded-md">Business</TabsTrigger>
                    </TabsList>
                    
                    {/* B2C Content */}
                    <TabsContent value="b2c">
                        <div className="grid lg:grid-cols-2 gap-8 items-start">
                            <div className="space-y-4">
                                {b2cFeatures.map((feature, index) => (
                                    <Card
                                        key={index}
                                        className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                                            activeB2CFeature === index
                                                ? "border-[#ffbc59] bg-[#ffbc59]/5"
                                                : "border-border hover:border-[#ffbc59]/50"
                                        }`}
                                        onClick={() => setActiveB2CFeature(index)}
                                    >
                                        <CardHeader className="flex flex-row items-center gap-4 space-y-0 p-4">
                                            <div className={`p-2 rounded-lg bg-gradient-to-r ${feature.color}`}>{feature.icon}</div>
                                            <div>
                                                <CardTitle className="text-lg">{feature.name}</CardTitle>
                                                <CardDescription>{feature.subtitle}</CardDescription>
                                            </div>
                                        </CardHeader>
                                    </Card>
                                ))}
                            </div>
                            <div className="lg:sticky lg:top-32 h-fit">
                                <Card className="border-[#ffbc59] bg-[#ffbc59]/5">
                                    <CardHeader>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className={`p-3 rounded-lg bg-gradient-to-r ${b2cFeatures[activeB2CFeature].color}`}>
                                                {b2cFeatures[activeB2CFeature].icon}
                                            </div>
                                            <div>
                                                <CardTitle className="text-2xl">{b2cFeatures[activeB2CFeature].name}</CardTitle>
                                                <CardDescription className="text-lg">{b2cFeatures[activeB2CFeature].subtitle}</CardDescription>
                                            </div>
                                        </div>
                                        <p className="text-lg text-muted-foreground mb-6">{b2cFeatures[activeB2CFeature].description}</p>
                                    </CardHeader>
                                    {/* [FIX]: Estrutura e classes do CardContent B2C agora são idênticas ao B2B */}
                                    <CardContent className="space-y-6">
                                        <div>
                                            <h4 className="font-semibold mb-2 flex items-center gap-2"><Target className="w-4 h-4 text-[#ffbc59]"/>Problema Comum</h4>
                                            <p className="text-muted-foreground">{b2cFeatures[activeB2CFeature].problem}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-2 flex items-center gap-2"><Zap className="w-4 h-4 text-[#ffbc59]"/>Nossa Solução</h4>
                                            <p className="text-muted-foreground">{b2cFeatures[activeB2CFeature].solution}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-2 flex items-center gap-2"><BrainCircuit className="w-4 h-4 text-[#ffbc59]"/>Tecnologia</h4>
                                            <p className="text-muted-foreground">{b2cFeatures[activeB2CFeature].technology}</p>
                                        </div>
                                        <Button className="w-full bg-[#ffbc59] text-black hover:bg-[#ffbc59]/90 group" asChild>
                                            <Link href={b2bProducts[activeB2BProduct].link}>
                                                Disponivel no app Phato
                                                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"/>
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    {/* B2B Content */}
                    <TabsContent value="b2b">
                        <div className="grid lg:grid-cols-2 gap-8 items-start">
                             <div className="space-y-4">
                                {b2bProducts.map((product, index) => (
                                    <Card
                                        key={index}
                                        className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                                            activeB2BProduct === index
                                                ? "border-[#ffbc59] bg-[#ffbc59]/5"
                                                : "border-border hover:border-[#ffbc59]/50"
                                        }`}
                                        onClick={() => setActiveB2BProduct(index)}
                                    >
                                        <CardHeader className="flex flex-row items-center gap-4 space-y-0 p-4">
                                            <div className={`p-2 rounded-lg bg-gradient-to-r ${product.color}`}>{product.icon}</div>
                                            <div>
                                                <CardTitle className="text-lg">{product.name}</CardTitle>
                                                <CardDescription>{product.subtitle}</CardDescription>
                                            </div>
                                        </CardHeader>
                                    </Card>
                                ))}
                            </div>
                            <div className="lg:sticky lg:top-32 h-fit">
                                <Card className="border-[#ffbc59] bg-[#ffbc59]/5">
                                    <CardHeader>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className={`p-3 rounded-lg bg-gradient-to-r ${b2bProducts[activeB2BProduct].color}`}>
                                                {b2bProducts[activeB2BProduct].icon}
                                            </div>
                                            <div>
                                                <CardTitle className="text-2xl">{b2bProducts[activeB2BProduct].name}</CardTitle>
                                                <CardDescription className="text-lg">{b2bProducts[activeB2BProduct].subtitle}</CardDescription>
                                            </div>
                                        </div>
                                        <p className="text-lg text-muted-foreground mb-6">{b2bProducts[activeB2BProduct].description}</p>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div>
                                            <h4 className="font-semibold mb-2 flex items-center gap-2"><Target className="w-4 h-4 text-[#ffbc59]"/>Cliente-Alvo</h4>
                                            <p className="text-muted-foreground">{b2bProducts[activeB2BProduct].target}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-2 flex items-center gap-2"><Zap className="w-4 h-4 text-[#ffbc59]"/>Problema que Resolve</h4>
                                            <p className="text-muted-foreground">{b2bProducts[activeB2BProduct].problem}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-2 flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#ffbc59]"/>Solução Única</h4>
                                            <p className="text-muted-foreground">{b2bProducts[activeB2BProduct].solution}</p>
                                        </div>
                                        <Button className="w-full bg-[#ffbc59] text-black hover:bg-[#ffbc59]/90 group" asChild>
                                            <Link href={b2bProducts[activeB2BProduct].link}>
                                                Saber Mais sobre {b2bProducts[activeB2BProduct].name.split("™")[0]}
                                                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"/>
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
};

export default ProductsSection;