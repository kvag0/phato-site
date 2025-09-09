// src/components/atoms/PatoGuia.tsx
'use client';

import Lottie from 'lottie-react';
// Certifique-se de que tem o seu ficheiro JSON do Lottie neste caminho
import patoAnimation from '../../../public/pato_andando_1.json';

/**
 * Renderiza o Pato-Guia usando uma animação Lottie.
 */
export default function PatoGuia() {
  return (
    <div className="w-24 h-24">
      <Lottie animationData={patoAnimation} loop={true} />
    </div>
  );
}

