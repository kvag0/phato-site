// src/components/missao/HeroMissao.tsx
'use client'; // Necessário para usar hooks do React e da Framer Motion.

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from "@/components/molecules/Container";

/**
 * A secção Hero da página da Missão, agora com uma animação de entrada
 * acionada pelo scroll.
 */
export default function HeroMissao() {
  // O ref aponta para a secção para que o useInView possa observá-la.
  const ref = useRef(null);
  // useInView retorna 'true' quando o elemento com o ref entra no ecrã.
  // 'once: true' garante que a animação só aconteça uma vez.
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Define os estados da animação para os elementos filhos.
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Cria um atraso entre a animação de cada filho.
      },
    },
  };

  // Define a animação de 'fade-in' e 'slide-up' para cada item.
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      ref={ref}
      className="py-20 sm:py-32"
      variants={containerVariants}
      initial="hidden"
      // Anima para o estado 'visible' quando isInView se torna true.
      animate={isInView ? "visible" : "hidden"}
    >
      <Container>
        <motion.p
          variants={itemVariants}
          className="text-lg font-semibold text-phato-yellow"
        >
          A Nossa Missão
        </motion.p>
        <motion.h1
          variants={itemVariants}
          className="mt-4 text-4xl font-extrabold tracking-tight text-phato-light sm:text-6xl max-w-4xl"
        >
          Devolver ao leitor o poder sobre a informação.
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="mt-6 text-xl text-phato-text max-w-3xl"
        >
          Num mundo saturado de narrativas, a clareza é a nossa missão. A Phato não é mais uma voz na multidão; é a lente que lhe permite ver através do ruído, fornecendo o contexto que transforma a informação em conhecimento.
        </motion.p>
      </Container>
    </motion.section>
  );
}
