"use client";

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Loader, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';

// [TYPE DEFINITION]: Estruturas de dados para o novo formato de quiz.
type Question = {
  id: string;
  statement: string;
  poles: {
    left: string;
    right: string;
  };
};

type Axis = {
  id: 'economic' | 'social' | 'authority' | 'epistemological';
  title: string;
  questions: Question[];
};


// [DATA MOCK]: Banco de perguntas reestruturado para o formato de eixos e sliders.
const quizData: Axis[] = [
  {
    id: 'economic',
    title: 'Eixo Económico',
    questions: [
      { id: 'econ1', statement: "A intervenção do governo na economia é essencial para proteger os cidadãos.", poles: { left: "Discordo", right: "Concordo" } },
      { id: 'econ2', statement: "Empresas estatais, como as de energia e correios, deveriam ser privatizadas para aumentar a eficiência.", poles: { left: "Discordo", right: "Concordo" } },
      { id: 'econ3', statement: "Impostos mais altos para os mais ricos são uma forma justa de financiar serviços públicos.", poles: { left: "Discordo", right: "Concordo" } },
    ]
  },
  {
    id: 'social',
    title: 'Eixo Social',
    questions: [
      { id: 'soc1', statement: "A sociedade deve priorizar a preservação de costumes e tradições estabelecidas.", poles: { left: "Discordo", right: "Concordo" } },
      { id: 'soc2', statement: "A expansão contínua de direitos para minorias é um sinal de progresso social.", poles: { left: "Discordo", right: "Concordo" } },
      { id: 'soc3', statement: "A educação deve focar-se em incentivar o pensamento crítico, mesmo que questione valores tradicionais.", poles: { left: "Discordo", right: "Concordo" } },
    ]
  },
  {
    id: 'authority',
    title: 'Eixo de Autoridade',
    questions: [
        { id: 'aut1', statement: "A liberdade de expressão deve ser quase absoluta, mesmo que proteja discursos ofensivos.", poles: { left: "Discordo", right: "Concordo" } },
        { id: 'aut2', statement: "Em crises graves, o governo deve ter o poder de limitar liberdades individuais para garantir a segurança.", poles: { left: "Discordo", right: "Concordo" } },
        { id: 'aut3', statement: "A desobediência civil é uma ferramenta legítima contra leis que consideramos injustas.", poles: { left: "Discordo", right: "Concordo" } },
    ]
  },
  {
    id: 'epistemological',
    title: 'Eixo Epistemológico',
    questions: [
        { id: 'epi1', statement: "Ao tomar uma decisão importante, confio mais na análise de dados do que na intuição.", poles: { left: "Discordo", right: "Concordo" } },
        { id: 'epi2', statement: "Políticas públicas devem ser definidas por especialistas, mesmo que as suas conclusões sejam impopulares.", poles: { left: "Discordo", right: "Concordo" } },
        { id: 'epi3', statement: "Um líder que demonstra convicção moral forte é mais confiável do que um que se foca apenas em detalhes técnicos.", poles: { left: "Discordo", right: "Concordo" } },
    ]
  }
];

// Componente da Página de Teste com novo design
export default function QuizTestPage() {
  const router = useRouter();
  const [sliderValues, setSliderValues] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [direction, setDirection] = useState(1);
  const [currentIndices, setCurrentIndices] = useState({ axis: 0, question: 0 });

  const { axis: currentAxisIndex, question: currentQuestionIndexInAxis } = currentIndices;

  const currentAxis = quizData[currentAxisIndex];
  const currentQuestion = currentAxis.questions[currentQuestionIndexInAxis];

  const { totalQuestions, overallQuestionIndex } = useMemo(() => {
    let total = 0;
    let overall = 0;
    for (let i = 0; i < quizData.length; i++) {
        if (i < currentAxisIndex) {
            overall += quizData[i].questions.length;
        }
        total += quizData[i].questions.length;
    }
    overall += currentQuestionIndexInAxis;
    return { totalQuestions: total, overallQuestionIndex: overall };
  }, [currentAxisIndex, currentQuestionIndexInAxis]);

  const progress = ((overallQuestionIndex + 1) / totalQuestions) * 100;

  const isCurrentQuestionAnswered = useMemo(() => sliderValues.hasOwnProperty(currentQuestion.id), [sliderValues, currentQuestion]);

  const handleSliderChange = (id: string, value: number[]) => {
    setSliderValues(prev => ({ ...prev, [id]: value[0] }));
  };

  const handleNext = () => {
    setDirection(1);
    if (currentQuestionIndexInAxis < currentAxis.questions.length - 1) {
      setCurrentIndices(prev => ({ ...prev, question: prev.question + 1 }));
    } else if (currentAxisIndex < quizData.length - 1) {
      setCurrentIndices(prev => ({ axis: prev.axis + 1, question: 0 }));
    }
  };

  const handleBack = () => {
    setDirection(-1);
    if (currentQuestionIndexInAxis > 0) {
      setCurrentIndices(prev => ({ ...prev, question: prev.question - 1 }));
    } else if (currentAxisIndex > 0) {
      const prevAxisIndex = currentAxisIndex - 1;
      const lastQuestionInPrevAxis = quizData[prevAxisIndex].questions.length - 1;
      setCurrentIndices({ axis: prevAxisIndex, question: lastQuestionInPrevAxis });
    }
  };
  
  const handleFinishQuiz = () => {
    setIsLoading(true);

    const scoresByAxis = { economic: [], social: [], authority: [], epistemological: [] };
    quizData.forEach(axis => {
      axis.questions.forEach(q => {
        if (sliderValues[q.id] !== undefined) {
          scoresByAxis[axis.id].push(sliderValues[q.id]);
        }
      });
    });

    const finalScores = { economic: 0, social: 0, authority: 0, epistemological: 0 };
    for (const axis in scoresByAxis) {
        const scores = scoresByAxis[axis as keyof typeof scoresByAxis];
        if (scores.length > 0) {
            const sum = scores.reduce((a, b) => a + b, 0);
            finalScores[axis as keyof typeof finalScores] = Math.round(sum / scores.length);
        }
    }
    
    const query = `?eco=${finalScores.economic}&soc=${finalScores.social}&aut=${finalScores.authority}&epi=${finalScores.epistemological}`;
    setTimeout(() => {
      router.push(`/quiz/resultado${query}`);
    }, 1500);
  };

  const isFinalQuestion = currentAxisIndex === quizData.length - 1 && currentQuestionIndexInAxis === currentAxis.questions.length - 1;

  if (isLoading) {
    return (
        <motion.div 
            className="bg-[#0d0d0d] text-[#E0E0E0] min-h-screen flex flex-col items-center justify-center text-center space-y-6 p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        >
            <Loader className="w-16 h-16 text-[#ffbc59] animate-spin"/>
            <h2 className="text-2xl font-semibold">A analisar o seu DNA de Pensamento...</h2>
            <p className="text-[#a3a3a3]">A preparar o seu resultado personalizado.</p>
        </motion.div>
    );
  }
  
  const contentVariants = {
    enter: (direction: number) => ({ opacity: 0, x: direction > 0 ? 200 : -200 }),
    center: { opacity: 1, x: 0 },
    exit: (direction: number) => ({ opacity: 0, x: direction < 0 ? 200 : -200 }),
  };

  return (
    <div className="bg-[#0d0d0d] text-[#E0E0E0] font-sans min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden">
      <div className="w-full max-w-4xl flex flex-col">
        <header className="w-full">
          <div className="flex items-center gap-4">
            <span className="text-sm font-mono text-[#a3a3a3]">{String(overallQuestionIndex + 1).padStart(2, '0')} / {totalQuestions}</span>
            <Progress value={progress} className="w-full h-2 bg-[#3d3d3d] [&>div]:bg-[#ffbc59]" />
          </div>
          <p className="text-center text-sm text-[#a3a3a3] mt-2">{currentAxis.title}</p>
        </header>
        
        <main className="w-full max-w-2xl mx-auto flex-grow flex flex-col items-center justify-center my-12 md:my-16">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentQuestion.id}
              custom={direction}
              variants={contentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-full"
            >
              <div className="text-center space-y-10">
                <h1 className="text-3xl md:text-4xl font-bold text-balance">{currentQuestion.statement}</h1>
                <div>
                  <Slider
                    id={currentQuestion.id}
                    value={[sliderValues[currentQuestion.id] ?? 50]}
                    max={100}
                    step={1}
                    onValueChange={(value) => handleSliderChange(currentQuestion.id, value)}
                    className="[&>span:first-child]:h-3 [&>span:first-child>span]:bg-[#ffbc59] [&>span:last-child]:bg-white"
                  />
                  <div className="flex justify-between text-sm text-[#a3a3a3] mt-3 px-1">
                    <span>{currentQuestion.poles.left}</span>
                    <span>{currentQuestion.poles.right}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="w-full">
          <div className="flex items-center justify-between">
            <Button 
                variant="outline"
                onClick={handleBack}
                disabled={overallQuestionIndex === 0}
                className="disabled:opacity-50 border-[#3d3d3d] hover:bg-[#3d3d3d] text-base px-6 py-5"
            >
                <ArrowLeft className="w-5 h-5 mr-2"/>
                Voltar
            </Button>
            
            {!isFinalQuestion ? (
              <Button 
                size="lg"
                className="bg-[#ffbc59] text-black hover:bg-[#ffbc59]/90 phato-glow disabled:bg-[#3d3d3d] disabled:text-[#a3a3a3] disabled:cursor-not-allowed text-base px-8 py-6"
                onClick={handleNext}
                disabled={!isCurrentQuestionAnswered}
              >
                Próximo
                <ArrowRight className="w-5 h-5 ml-2"/>
              </Button>
            ) : (
              <Button 
                size="lg"
                className="bg-[#ffbc59] text-black hover:bg-[#ffbc59]/90 phato-glow disabled:bg-[#3d3d3d] disabled:text-[#a3a3a3] disabled:cursor-not-allowed text-base px-8 py-6"
                onClick={handleFinishQuiz}
                disabled={!isCurrentQuestionAnswered || isLoading}
              >
                Analisar meu DNA
                <ArrowRight className="w-5 h-5 ml-2"/>
              </Button>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
}

