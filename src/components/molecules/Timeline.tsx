// src/components/molecules/Timeline.tsx
'use client'; // This directive marks the component as a Client Component.

import { motion, Variants } from 'framer-motion'; // Import Variants type

// Data for the timeline. In a real application, this might come from a CMS.
const timelineEvents = [
  {
    year: '2021',
    title: 'A Faísca Inicial',
    description: 'A ideia da Phato nasce de uma observação simples: a desinformação prospera na ausência de contexto. O conceito inicial de "iluminar" as notícias toma forma.',
  },
  {
    year: '2022',
    title: 'Protótipo e Tecnologia',
    description: 'Desenvolvimento do nosso primeiro algoritmo de análise de viés. Um pequeno grupo de jornalistas e académicos testa o protótipo e fornece um feedback crucial.',
  },
  {
    year: '2023',
    title: 'Fundação e Missão',
    description: 'A Phato é oficialmente fundada. A nossa missão é consolidada e a equipa principal é formada, unida por um objetivo comum de restaurar o pensamento crítico.',
  },
  {
    year: '2024',
    title: 'Lançamento Beta',
    description: 'Lançamento da nossa primeira ferramenta ao público em versão beta, focada na análise de artigos. A comunidade começa a crescer e a validar a nossa abordagem.',
  },
];

// Animation variants for Framer Motion, now correctly typed.
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

/**
 * An interactive vertical timeline component.
 * It uses Framer Motion to animate items into view as the user scrolls.
 * Marked as a Client Component because it uses hooks and event listeners.
 */
export default function Timeline() {
  return (
    <div className="relative mt-16">
      {/* The central vertical line */}
      <div className="absolute left-1/2 top-0 h-full w-px bg-phato-ui -translate-x-1/2" />
      
      {/* List of timeline events */}
      <ul role="list" className="space-y-16">
        {timelineEvents.map((event, index) => (
          <motion.li
            key={index}
            className="relative flex justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }} // Trigger animation when 50% of the item is visible
            variants={itemVariants}
          >
            {/* Dot on the timeline */}
            <div className="absolute left-1/2 top-2 h-4 w-4 rounded-full bg-phato-yellow border-4 border-phato-black -translate-x-1/2" />

            {/* Content card */}
            <div
              className={`w-full max-w-sm p-6 rounded-lg bg-phato-card shadow-lg ${
                index % 2 === 0 ? 'mr-auto text-right' : 'ml-auto text-left'
              }`}
            >
              <p className="text-sm font-semibold text-phato-yellow">{event.year}</p>
              <h3 className="mt-2 text-lg font-bold text-phato-light">{event.title}</h3>
              <p className="mt-2 text-base text-phato-text">{event.description}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

