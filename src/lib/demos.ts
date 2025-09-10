// src/lib/demos.ts

export interface Demo {
  slug: string;
  title: string;
  description: string;
}

const demos: Demo[] = [
  {
    slug: 'analise-de-vies',
    title: 'Análise de Viés',
    description: 'Cole um URL de uma notícia e veja a nossa IA a identificar potenciais viéses na linguagem e na estrutura.'
  },
  // Future demos will be added here
];

export function getAllDemos(): Demo[] {
  return demos;
}

