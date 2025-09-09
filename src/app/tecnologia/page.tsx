// src/app/tecnologia/page.tsx

import Container from "@/components/molecules/Container";
import DemoCard from "@/components/molecules/DemoCard";
import { getAllDemos } from "@/lib/demos";

/**
 * The main technology hub page.
 * Displays a grid of available interactive demos.
 */
export default function TecnologiaPage() {
  const demos = getAllDemos();

  return (
    <Container>
      <div className="pt-32 pb-20">
        <h1 className="text-4xl font-bold tracking-tight text-phato-light sm:text-5xl">
          O Santuário da Tecnologia
        </h1>
        <p className="mt-4 text-xl text-phato-text">
          Aqui, a teoria encontra a prática. Teste as nossas ferramentas em tempo real e veja a nossa tecnologia em ação.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {demos.map((demo) => (
            <DemoCard key={demo.slug} {...demo} />
          ))}
        </div>
      </div>
    </Container>
  );
}
