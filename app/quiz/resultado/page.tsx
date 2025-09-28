"use client";

import { useState } from 'react';
import {
  BarChart,
  Check,
  Download,
  Facebook,
  FileText,
  Heart,
  Instagram,
  Linkedin,
  Share2,
  Twitter,
  Users,
  X,
} from 'lucide-react';
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

// [TYPE DEFINITION]: Estruturas de dados para a página de resultados.
type Archetype = {
  name: string;
  code: string;
  keyPhrase: string;
  description: string;
  strengths: string[];
  pointsToDevelop: string[];
  icon: React.ComponentType<{ className?: string }>;
};

type AxisScore = {
  axis: string;
  score: number;
  poleA: string;
  poleB: string;
  description: string;
};

type RelatedArchetype = {
  name: string;
  reason: string;
  type: 'ally' | 'challenge';
};

// [DATA MOCK]: Dados de exemplo para o arquétipo "Inovador Social".
// No futuro, estes dados virão da lógica do quiz.
const userArchetypeData: Archetype = {
  name: "O Inovador Social",
  code: "RPNA",
  keyPhrase: "Vamos redesenhar o sistema para ser mais justo e livre, e temos os dados para provar como.",
  description: "O Inovador Social combina uma paixão por justiça social (Progressista) com uma abordagem rigorosamente baseada em evidências (Analítico). Ele acredita que o Estado (Regulador) tem a responsabilidade de corrigir desigualdades sistêmicas, mas desconfia de soluções autoritárias, defendendo a máxima liberdade individual (Autonomia). Sua visão de mundo é frequentemente utilitarista, buscando políticas que maximizem o bem-estar e a liberdade para o maior número de pessoas.",
  strengths: [
    "Racional e baseado em evidências.",
    "Forte defensor de direitos e liberdades individuais.",
    "Orientado para a solução de problemas sistémicos.",
    "Intelectualmente consistente e coerente."
  ],
  pointsToDevelop: [
    "Pode subestimar o valor da tradição e da estabilidade.",
    "A sua lógica pode, por vezes, parecer fria ou distante.",
    "Risco de ignorar fatores emocionais e culturais."
  ],
  icon: BarChart,
};

// [DATA MOCK]: Pontuações do utilizador nos 4 eixos.
const userScores: AxisScore[] = [
  { axis: "Económico", score: 70, poleA: "Regulação", poleB: "Livre Mercado", description: "Você acredita que o Estado tem um papel importante na economia, mas também valoriza a liberdade de mercado." },
  { axis: "Social", score: 85, poleA: "Tradicionalista", poleB: "Progressista", description: "As suas visões sociais são fortemente alinhadas com a reforma de instituições e a expansão de direitos." },
  { axis: "Autoridade", score: 75, poleA: "Ordem", poleB: "Autonomia", description: "A liberdade individual é um valor central para si, defendendo a mínima interferência do Estado na vida pessoal." },
  { axis: "Epistemológico", score: 90, poleA: "Intuitivo", poleB: "Analítico", description: "Baseia as suas decisões primariamente em dados, lógica e evidências factuais." },
];

// [DATA MOCK]: Arquétipos relacionados para a secção de diálogo.
const relatedArchetypes: RelatedArchetype[] = [
    { name: "Arquiteto Social", reason: "Ambos partilham uma abordagem analítica para resolver problemas sociais, divergindo nos limites do poder estatal.", type: 'ally' },
    { name: "Cético Tradicional", reason: "A vossa base comum na análise (N) e autonomia (A) permite um diálogo produtivo sobre o papel da tradição vs. inovação.", type: 'ally' },
    { name: "Protetor da Tradição", reason: "O seu oposto quase direto. O diálogo com este perfil pode desafiá-lo a considerar o valor da estabilidade e da comunidade que a sua lógica por vezes ignora.", type: 'challenge' },
];

// Componente para o Gráfico de Radar
const PhatoRadarChart = () => {
  const chartData = [
    { subject: 'Económico', A: 100 - userScores[0].score, full: 100 },
    { subject: 'Social', A: userScores[1].score, full: 100 },
    { subject: 'Autoridade', A: userScores[2].score, full: 100 },
    { subject: 'Epistemológico', A: userScores[3].score, full: 100 },
  ];
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const axisName = payload[0].payload.subject;
      const axisData = userScores.find(s => s.axis === axisName);
      if (!axisData) return null;

      const score = axisName === "Económico" ? 100 - axisData.score : axisData.score;
      const pole = axisName === "Económico" 
        ? (score >= 50 ? axisData.poleA : axisData.poleB)
        : (score >= 50 ? axisData.poleB : axisData.poleA);
      const displayScore = score >= 50 ? score : 100 - score;

      return (
        <div className="bg-[#0d0d0d] border border-[#3d3d3d] p-3 rounded-md shadow-lg">
          <p className="text-[#E0E0E0] font-bold">{`${axisData.axis}`}</p>
          <p className="text-[#ffbc59]">{`${Math.round(displayScore)}% ${pole}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    // [ANIMATION]: O gráfico pode ter uma animação de desenho na entrada.
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
        <defs>
            <radialGradient id="radarGradient">
                <stop offset="0%" stopColor="#ffbc59" stopOpacity={0.4}/>
                <stop offset="100%" stopColor="#ffbc59" stopOpacity={0.1}/>
            </radialGradient>
        </defs>
        <PolarGrid stroke="#3d3d3d" />
        <PolarAngleAxis dataKey="subject" tick={{ fill: '#a3a3a3', fontSize: 14 }} />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#ffbc59", strokeWidth: 1, strokeDasharray: "3 3" }} />
        <Radar name="User" dataKey="A" stroke="#ffbc59" fill="url(#radarGradient)" fillOpacity={0.8} strokeWidth={2}/>
      </RadarChart>
    </ResponsiveContainer>
  );
};

// Componente para o slider de eixo individual
const AxisSlider = ({ score, poleA, poleB, axis, description }: AxisScore) => {
    const value = axis === "Económico" ? 100 - score : score;
    const isPoleB = value > 50;
    const poleBColor = "bg-[#ffbc59]";
    const poleAColor = "bg-[#a3a3a3]";

    return(
        <div className="space-y-4">
            <div className="flex justify-between items-center text-lg">
                <span className={`font-semibold ${!isPoleB ? 'text-[#ffbc59]' : 'text-[#a3a3a3]'}`}>{poleA}</span>
                <span className="font-bold text-[#E0E0E0]">{axis}</span>
                <span className={`font-semibold ${isPoleB ? 'text-[#ffbc59]' : 'text-[#a3a3a3]'}`}>{poleB}</span>
            </div>
            <div>
                 {/* [ANIMATION]: A barra de progresso pode animar o preenchimento na entrada. */}
                <Progress value={value} className="h-3 [&>div]:bg-gradient-to-r [&>div]:from-[#a3a3a3] [&>div]:to-[#ffbc59]" />
            </div>
            <p className="text-center text-[#a3a3a3] text-sm">{description}</p>
        </div>
    );
}

// Componente da Página Principal
export default function QuizResultPage() {
    const ArchetypeIcon = userArchetypeData.icon;

    // [STATE]: Controla o popup de arquétipos relacionados.
    const [selectedRelated, setSelectedRelated] = useState<RelatedArchetype | null>(null);

  return (
    <div className="bg-[#0d0d0d] text-[#E0E0E0] font-sans min-h-screen">
      <div className="container mx-auto max-w-5xl p-4 sm:p-8 space-y-16 md:space-y-24">
        
        {/* 1. Cabeçalho Principal: A Revelação do Arquétipo */}
        <section className="text-center space-y-6 pt-12">
            {/* [ANIMATION]: Elementos podem surgir com um efeito 'stagger'. */}
            <p className="text-[#a3a3a3] text-lg">Seu DNA de Pensamento é:</p>
            <div className="flex items-center justify-center gap-4">
                <ArchetypeIcon className="w-12 h-12 text-[#ffbc59] hidden sm:block"/>
                <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ffbc59] to-white">
                    {userArchetypeData.name}
                </h1>
            </div>
            <p className="text-2xl text-[#a3a3a3]">({userArchetypeData.code})</p>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-balance font-light">
                "{userArchetypeData.keyPhrase}"
            </p>
        </section>

        {/* 2. Visualização Central: O Diagrama Phato */}
        <section>
          <Card className="bg-[#0d0d0d] border-[#3d3d3d] shadow-2xl shadow-black/50">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-[#ffbc59]">O seu Diagrama Phato</CardTitle>
              <CardDescription className="text-center">Esta é a forma única do seu pensamento, criada a partir das suas respostas.</CardDescription>
            </CardHeader>
            <CardContent>
              <PhatoRadarChart />
            </CardContent>
          </Card>
        </section>

        {/* 3. Análise Detalhada do Arquétipo */}
        <section>
            <h2 className="text-3xl font-bold text-center mb-8">Análise do Arquétipo</h2>
            <Card className="bg-[#0d0d0d]/50 border-[#3d3d3d]">
                <CardContent className="p-6">
                    <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                        <AccordionItem value="item-1" className="border-[#3d3d3d]">
                            <AccordionTrigger className="text-xl hover:no-underline">Descrição Geral</AccordionTrigger>
                            <AccordionContent className="text-base text-[#a3a3a3] leading-relaxed pt-4">
                                {userArchetypeData.description}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2" className="border-[#3d3d3d]">
                            <AccordionTrigger className="text-xl hover:no-underline">Pontos Fortes</AccordionTrigger>
                            <AccordionContent className="text-base text-[#a3a3a3] leading-relaxed pt-4">
                                <ul className="space-y-3">
                                    {userArchetypeData.strengths.map((point, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <Check className="w-5 h-5 text-[#ffbc59] mt-1 flex-shrink-0"/>
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3" className="border-b-0">
                            <AccordionTrigger className="text-xl hover:no-underline">Pontos a Desenvolver</AccordionTrigger>
                            <AccordionContent className="text-base text-[#a3a3a3] leading-relaxed pt-4">
                                <ul className="space-y-3">
                                    {userArchetypeData.pointsToDevelop.map((point, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <Heart className="w-5 h-5 text-[#ffbc59] mt-1 flex-shrink-0"/>
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </section>
        
        {/* 4. Detalhamento dos Seus Eixos */}
        <section>
            <h2 className="text-3xl font-bold text-center mb-8">A Sua Posição em Cada Eixo</h2>
            <div className="space-y-12">
                {userScores.map(score => <AxisSlider key={score.axis} {...score} />)}
            </div>
        </section>
        
        {/* 5. Interações e Conexões */}
        <section>
            <h2 className="text-3xl font-bold text-center mb-8">Com Quem Você Dialoga?</h2>
            <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-[#0d0d0d]/50 border-[#3d3d3d]">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <Users className="w-8 h-8 text-[#ffbc59]"/>
                            <CardTitle className="text-2xl">Aliados Intelectuais</CardTitle>
                        </div>
                        <CardDescription>Perfis que partilham eixos-chave consigo, mesmo que discordem noutros pontos.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       {relatedArchetypes.filter(a => a.type === 'ally').map(ally => (
                            <Dialog key={ally.name}>
                                <DialogTrigger asChild>
                                    <div className="p-4 rounded-md border border-transparent hover:border-[#ffbc59]/50 hover:bg-[#3d3d3d]/30 cursor-pointer transition-all">
                                        <h4 className="font-bold text-[#E0E0E0]">{ally.name}</h4>
                                        <p className="text-sm text-[#a3a3a3]">{ally.reason}</p>
                                    </div>
                                </DialogTrigger>
                                {/* [PLACEHOLDER]: O conteúdo do Dialog virá de um fetch de dados do arquétipo. */}
                                <DialogContent className="bg-[#0d0d0d] border-[#3d3d3d] text-[#E0E0E0]">
                                    <DialogHeader>
                                        <DialogTitle className="text-2xl text-[#ffbc59]">{ally.name}</DialogTitle>
                                    </DialogHeader>
                                    <p className="text-center py-8">[Resumo do arquétipo '{ally.name}' aqui]</p>
                                </DialogContent>
                            </Dialog>
                       ))}
                    </CardContent>
                </Card>
                <Card className="bg-[#0d0d0d]/50 border-[#3d3d3d]">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <Heart className="w-8 h-8 text-[#ffbc59]"/>
                            <CardTitle className="text-2xl">Desafios Construtivos</CardTitle>
                        </div>
                        <CardDescription>Perfis com visões de mundo opostas que oferecem a maior oportunidade de crescimento.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       {relatedArchetypes.filter(a => a.type === 'challenge').map(challenge => (
                            <Dialog key={challenge.name}>
                                <DialogTrigger asChild>
                                    <div className="p-4 rounded-md border border-transparent hover:border-[#ffbc59]/50 hover:bg-[#3d3d3d]/30 cursor-pointer transition-all">
                                        <h4 className="font-bold text-[#E0E0E0]">{challenge.name}</h4>
                                        <p className="text-sm text-[#a3a3a3]">{challenge.reason}</p>
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="bg-[#0d0d0d] border-[#3d3d3d] text-[#E0E0E0]">
                                    <DialogHeader>
                                        <DialogTitle className="text-2xl text-[#ffbc59]">{challenge.name}</DialogTitle>
                                    </DialogHeader>
                                    <p className="text-center py-8">[Resumo do arquétipo '{challenge.name}' aqui]</p>
                                </DialogContent>
                            </Dialog>
                       ))}
                    </CardContent>
                </Card>
            </div>
        </section>

        {/* 6. Seção de Compartilhamento e CTA */}
        <section className="text-center space-y-8">
            <h2 className="text-3xl font-bold">Compartilhe o seu DNA de Pensamento!</h2>
            {/* [PLACEHOLDER]: A imagem de compartilhamento será gerada dinamicamente. */}
            <div id="share-image" className="max-w-md mx-auto aspect-square bg-[#1a1a1a] border-2 border-dashed border-[#3d3d3d] rounded-lg flex flex-col items-center justify-center p-8">
                <p className="text-lg font-bold text-[#ffbc59]">{userArchetypeData.name}</p>
                <div className="w-48 h-48 my-4">
                     {/* [VISUAL]: Idealmente, uma versão simplificada do RadarChart seria renderizada aqui. */}
                    <p className="text-xs text-[#a3a3a3]">[Visual Simplificado do Diagrama Phato]</p>
                </div>
                <p className="text-sm text-[#a3a3a3]">phato.com/quiz</p>
            </div>
            <div className="flex justify-center items-center gap-4">
                <Button size="icon" variant="outline" className="rounded-full border-[#3d3d3d] hover:bg-[#3d3d3d]"><Twitter className="w-5 h-5"/></Button>
                <Button size="icon" variant="outline" className="rounded-full border-[#3d3d3d] hover:bg-[#3d3d3d]"><Instagram className="w-5 h-5"/></Button>
                <Button size="icon" variant="outline" className="rounded-full border-[#3d3d3d] hover:bg-[#3d3d3d]"><Facebook className="w-5 h-5"/></Button>
                <Button size="icon" variant="outline" className="rounded-full border-[#3d3d3d] hover:bg-[#3d3d3d]"><Linkedin className="w-5 h-5"/></Button>
                <Button variant="outline" className="rounded-full border-[#3d3d3d] hover:bg-[#3d3d3d] px-4">
                    <Download className="w-5 h-5 mr-2"/>
                    Baixar
                </Button>
            </div>
             <div className="pt-8">
                <Button size="lg" className="bg-[#ffbc59] text-black hover:bg-[#ffbc59]/90 text-lg px-8 py-6 phato-glow">
                    <FileText className="w-6 h-6 mr-3"/>
                    Entenda o DNA das Notícias. Baixe o Phato.
                </Button>
             </div>
        </section>
      </div>
    </div>
  );
}
