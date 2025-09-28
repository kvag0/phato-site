"use client";

import { useRouter } from 'next/navigation';
import { ArrowRight, Dna, Lightbulb, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Componente da Página de Entrada do Quiz
export default function QuizLandingPage() {
  const router = useRouter();

  const handleStartQuiz = () => {
    // [NAVIGATION]: Redireciona para a página do teste.
    router.push('/quiz/teste');
  };

  return (
    <div className="bg-[#0d0d0d] text-[#E0E0E0] font-sans min-h-screen flex items-center justify-center p-4">
      <div className="container mx-auto max-w-4xl text-center space-y-12">
        
        {/* [ANIMATION]: O título pode ter um efeito de gradiente animado ou fade-in. */}
        <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#ffbc59]">
          Qual é o seu DNA de Pensamento?
        </h1>

        <p className="text-lg md:text-xl max-w-3xl mx-auto text-[#a3a3a3] text-balance">
          Esqueça os rótulos de "esquerda" e "direita". O nosso quiz foi desenhado para desempacotar as suas ideias, não para as encaixotar. Descubra a forma única do seu pensamento em 4 eixos fundamentais.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card className="bg-[#0d0d0d]/50 border-[#3d3d3d] text-center p-4">
                <CardContent className="p-2">
                    <Scale className="w-10 h-10 mx-auto text-[#ffbc59] mb-4"/>
                    <h3 className="text-lg font-semibold">Económico & Social</h3>
                    <p className="text-sm text-[#a3a3a3]">Explore as suas visões sobre o papel do estado e os valores da sociedade.</p>
                </CardContent>
            </Card>
            <Card className="bg-[#0d0d0d]/50 border-[#3d3d3d] text-center p-4">
                <CardContent className="p-2">
                    <Dna className="w-10 h-10 mx-auto text-[#ffbc59] mb-4"/>
                    <h3 className="text-lg font-semibold">Autoridade & Autonomia</h3>
                    <p className="text-sm text-[#a3a3a3]">Descubra o seu equilíbrio entre liberdade individual e ordem coletiva.</p>
                </CardContent>
            </Card>
            <Card className="bg-[#0d0d0d]/50 border-[#3d3d3d] text-center p-4">
                <CardContent className="p-2">
                    <Lightbulb className="w-10 h-10 mx-auto text-[#ffbc59] mb-4"/>
                    <h3 className="text-lg font-semibold">Abordagem à Verdade</h3>
                     <p className="text-sm text-[#a3a3a3]">Analítico ou intuitivo? Veja como constrói as suas convicções.</p>
                </CardContent>
            </Card>
        </div>

        <div className="pt-8">
          <Button 
            size="lg" 
            className="bg-[#ffbc59] text-black hover:bg-[#ffbc59]/90 text-xl px-10 py-7 phato-glow"
            onClick={handleStartQuiz}
          >
            Começar a Descoberta
            <ArrowRight className="w-6 h-6 ml-3"/>
          </Button>
        </div>
        
        <p className="text-sm text-[#a3a3a3] pt-4">Leva menos de 5 minutos. Sem respostas certas ou erradas.</p>

      </div>
    </div>
  );
}
