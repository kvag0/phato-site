// src/lib/api.ts

import { Post } from './types';

// Mock data simulating a Headless CMS.
const posts: Post[] = [
  {
    slug: 'a-luz-da-verdade',
    title: 'A Luz da Verdade: Como o Contexto Combate a Desinformação',
    excerpt: 'Num mundo saturado de informação, a verdade muitas vezes não está na notícia em si, mas no contexto que a rodeia. Explore os princípios fundadores da Phato.',
    date: '2024-09-08',
    author: 'Caio Sobrinho',
    imageUrl: 'https://placehold.co/1200x600/ffbc59/0d0d0d?text=Phato',
    content: '<p>Este é o conteúdo completo do artigo sobre a luz da verdade...</p>'
  },
  {
    slug: 'arquitetura-da-clareza',
    title: 'A Arquitetura da Clareza: A Tecnologia por Trás da Phato',
    excerpt: 'Mergulhe na tecnologia que alimenta a nossa plataforma. Da análise de sentimento à verificação de fontes, descubra como transformamos dados em clareza.',
    date: '2024-08-22',
    author: 'Rafael Montilla',
    imageUrl: 'https://placehold.co/1200x600/2a2a2a/E0E0E0?text=Tech',
    content: '<p>Este é o conteúdo completo do artigo sobre a arquitetura da clareza...</p>'
  },
  {
    slug: 'o-impacto-da-polarizacao',
    title: 'O Impacto da Polarização e o Caminho para o Diálogo',
    excerpt: 'A polarização não é um acidente, é um design. Analisamos como as plataformas atuais incentivam a divisão e como a Phato oferece uma alternativa.',
    date: '2024-07-15',
    author: 'Kalil Souza',
    imageUrl: 'https://placehold.co/1200x600/3d3d3d/E0E0E0?text=Impacto',
    content: '<p>Este é o conteúdo completo do artigo sobre o impacto da polarização...</p>'
  }
];

/**
 * Fetches all posts, simulating an API call.
 * @returns A promise that resolves to an array of all posts.
 */
export function getAllPosts(): Post[] {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Fetches a single post by its slug.
 * @param slug - The slug of the post to retrieve.
 * @returns A promise that resolves to the post object, or null if not found.
 */
export function getPostBySlug(slug: string): Post | undefined {
  return posts.find(post => post.slug === slug);
}
