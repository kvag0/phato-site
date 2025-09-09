// src/components/organisms/MissionTeam.tsx

import Container from "@/components/molecules/Container";
import TeamMemberCard from "@/components/molecules/TeamMemberCard";

// Updated team data with the new members.
const teamMembers = [
  {
    name: "Caio Sobrinho",
    role: "Co-Founder",
    imageUrl: "https://placehold.co/500x500/2a2a2a/a3a3a3?text=CS",
    bio: "Lidera a visão estratégica da Phato, com uma paixão por tecnologia e jornalismo investigativo.",
  },
  {
    name: "Kalil Souza",
    role: "Co-Founder",
    imageUrl: "https://placehold.co/500x500/2a2a2a/a3a3a3?text=KS",
    bio: "Responsável pela sinergia entre produto, tecnologia e mercado, garantindo que a nossa visão se torne realidade.",
  },
  {
    name: "Bruno Basini",
    role: "Co-Founder",
    imageUrl: "https://placehold.co/500x500/2a2a2a/a3a3a3?text=BB",
    bio: "Focado no crescimento e na estratégia de negócios, construindo as pontes para o futuro da Phato.",
  },
  {
    name: "Rafael Montilla",
    role: "CTO",
    imageUrl: "https://placehold.co/500x500/2a2a2a/a3a3a3?text=RM",
    bio: "O arquiteto por trás da nossa tecnologia de análise, especialista em IA e processamento de linguagem natural.",
  },
  {
    name: "Igor Teisen",
    role: "CMO",
    imageUrl: "https://placehold.co/500x500/2a2a2a/a3a3a3?text=IT",
    bio: "Comunica a nossa missão ao mundo, criando estratégias para levar a clareza da Phato a todos os leitores.",
  }
];

/**
 * The founding team section for the Mission page.
 * It displays a grid of team member profiles.
 */
export default function MissionTeam() {
  return (
    <section className="py-20 sm:py-32 bg-phato-card/50">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-phato-light sm:text-4xl">
            A Nossa Equipa
          </h2>
          <p className="mt-4 text-lg text-phato-text">
            Somos um grupo de tecnólogos, jornalistas e designers unidos por uma única missão: iluminar a verdade.
          </p>
        </div>
        
        {/* Responsive grid for team members. It will now accommodate 5 members gracefully. */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-center sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.name} {...member} />
          ))}
        </div>
      </Container>
    </section>
  );
}

