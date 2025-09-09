// src/components/organisms/MissionHero.tsx

import Container from "@/components/molecules/Container";

/**
 * The Hero section for the Mission page.
 * It serves as the impactful introduction to the Phato mission,
 * featuring a prominent title and a brief, engaging summary.
 */
export default function MissionHero() {
  return (
    <section className="py-20 sm:py-32">
      <Container>
        {/* Sub-heading with brand colors */}
        <p className="text-base font-semibold text-phato-yellow">
          A Nossa Missão
        </p>
        {/* Main heading with premium typography */}
        <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-phato-light">
          Devolver ao leitor o poder sobre a informação.
        </h1>
        {/* Introductory paragraph */}
        <p className="mt-6 text-lg text-phato-text max-w-3xl">
          Na Phato, a nossa missão é clara e urgente: combater a desinformação na sua raiz, não através da censura, mas do empoderamento. Acreditamos que um leitor bem informado é a força mais poderosa contra a polarização.
        </p>
      </Container>
    </section>
  );
}
