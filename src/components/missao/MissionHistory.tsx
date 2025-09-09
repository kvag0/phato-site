// src/components/missao/MissionHistory.tsx
'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from "@/components/molecules/Container";

/**
 * Placeholder para a timeline da história da Phato, agora com animação.
 */
export default function MissionHistory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="py-20 sm:py-32"
    >
      <Container>
        <h2 className="text-3xl font-bold text-center text-phato-light">
          A Nossa História (Timeline Interativa em Breve)
        </h2>
      </Container>
    </motion.section>
  );
}

