// src/app/tecnologia/analise-de-vies/page.tsx

import dynamic from 'next/dynamic';
import Container from '@/components/molecules/Container';

// Dynamically import the interactive demo component with SSR turned off.
const AnaliseDeViesDemo = dynamic(
  () => import('@/components/demos/AnaliseDeVies'),
  { ssr: false }
);

/**
 * Page shell for the "Bias Analysis" demo.
 * It provides context and loads the interactive component dynamically.
 */
export default function AnaliseDeViesPage() {
  return (
    <Container>
      <div className="pt-32 pb-20">
        {/* Section explaining the technology */}
        <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-phato-light sm:text-5xl">
                Demo: Análise de Viés
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-phato-text">
                Esta ferramenta utiliza processamento de linguagem natural para analisar o texto de uma notícia, identificando palavras carregadas, generalizações e outras nuances que podem indicar um viés editorial.
            </p>
        </div>

        {/* The interactive demo component is loaded here */}
        <div className="mt-16">
            <AnaliseDeViesDemo />
        </div>
      </div>
    </Container>
  );
}
