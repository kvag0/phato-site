// src/components/missao/MissionTeam.tsx
'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from "@/components/molecules/Container";
import TeamMemberCard from "@/components/molecules/TeamMemberCard";

const teamMembers = [
  {
    name: "Caio Sobrinho",
    role: "Co-Founder",
    imageUrl: "https://placehold.co/500x500/2a2a2a/a3a3a3?text=CS",
  },
  {
    name: "Kalil Souza",
    role: "Co-Founder",
    imageUrl: "https://placehold.co/500x500/2a2a2a/a3a3a3?text=KS",
  },
  {
    name: "Bruno Baisini",
    role: "Co-Founder",
    imageUrl: "https://placehold.co/500x500/2a2a2a/a3a3a3?text=BB",
  },
  {
    name: "Rafael Montilla",
    role: "CTO",
    imageUrl: "https://placehold.co/500x500/2a2a2a/a3a3a3?text=RM",
  },
  {
    name: "Igor Teisen",
    role: "CMO",
    imageUrl: "https://placehold.co/500x500/2a2a2a/a3a3a3?text=IT",
  },
];

/**
 * A secção da equipa, agora com animação de entrada para o texto e os cards.
 */
export default function MissionTeam() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="py-20 sm:py-32 bg-phato-card/50"
    >
      <Container>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div variants={itemVariants} className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-phato-light sm:text-4xl">A Nossa Equipa</h2>
            <p className="mt-6 text-lg leading-8 text-phato-text">
              Somos um coletivo de tecnólogos, jornalistas e designers apaixonados por restaurar a clareza no discurso público.
            </p>
          </motion.div>
          <motion.ul
            variants={containerVariants} // Reutilizamos para o stagger dos cards
            className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
          >
            {teamMembers.map((person) => (
              <motion.li key={person.name} variants={itemVariants}>
                <TeamMemberCard bio={''} {...person} />
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </Container>
    </motion.section>
  );
}

