// src/components/missao/ManifestoCompleto.tsx
'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from "@/components/molecules/Container";
import InteractiveKeyword from './InteractiveKeyword'; // Importar o novo componente

/**
 * A secção do Manifesto, agora com as palavras-chave interativas.
 */
export default function ManifestoCompleto() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
      className="py-16 bg-phato-card/50"
    >
      <Container>
        <div className="grid grid-cols-12 gap-x-8">
          <div className="col-span-12 md:col-start-3 md:col-span-8">
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold tracking-tight text-phato-light"
            >
                O Nosso Manifesto
            </motion.h2>
            <motion.div
              variants={itemVariants}
              className="mt-8 space-y-6 text-phato-text prose prose-invert prose-lg max-w-none"
            >
                {/* Corrigido: Trocado <p> por <div> para permitir o aninhamento de componentes que renderizam divs. */}
                <div>
                    <strong>1. <InteractiveKeyword patoNote="É como ter os ingredientes da receita. Nós mostramos como chegamos a uma conclusão, não apenas a conclusão em si.">Transparência Radical</InteractiveKeyword>: "Não confie, verifique."</strong> Não pedimos que confie em nós; pedimos que verifique. Todas as nossas análises são abertas, e as nossas fontes, auditáveis. Acreditamos que a confiança não é dada, mas conquistada através da clareza.
                </div>
                <div>
                    <strong>2. <InteractiveKeyword>Imparcialidade Verificável</InteractiveKeyword>.</strong> A verdadeira imparcialidade não é a ausência de um ponto de vista, mas a honestidade sobre ele. O nosso compromisso é com a metodologia. Expomos o viés, independentemente da sua origem, e fornecemos as ferramentas para que você possa fazer o mesmo.
                </div>
                <div>
                    <strong>3. <InteractiveKeyword patoNote="O nosso sucesso é quando você precisa cada vez menos de nós para navegar no ecossistema de informação.">Empoderamento do Utilizador</InteractiveKeyword>.</strong> A nossa plataforma não lhe diz em que acreditar. Ela ilumina o que não está a ser dito. O nosso objetivo final é afiar o seu pensamento crítico, tornando a nossa própria ferramenta cada vez menos necessária para si.
                </div>
                 <div>
                    <strong>4. <InteractiveKeyword>Sustentabilidade Ética</InteractiveKeyword>.</strong> O nosso modelo de negócio nunca será baseado em vender a sua atenção ou os seus dados. A Phato é financiada por quem valoriza a clareza - indivíduos e organizações que acreditam num ecossistema de informação mais saudável.
                </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </motion.section>
  );
}

