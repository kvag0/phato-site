// src/components/organisms/MissionTeam.tsx

import Container from "@/components/molecules/Container";

/**
 * Placeholder component for the founding team section.
 * This will later feature a grid of team member profiles.
 */
export default function MissionTeam() {
  return (
    <section className="py-20 sm:py-32 bg-phato-card/50">
      <Container className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-phato-light">
          A Equipa Fundadora
        </h2>
        <p className="mt-4 text-lg text-phato-text">
          [Placeholder para a grelha de perfis da equipa]
        </p>
      </Container>
    </section>
  );
}
