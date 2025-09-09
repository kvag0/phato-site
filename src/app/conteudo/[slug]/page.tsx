// src/app/conteudo/[slug]/page.tsx

import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/api';
import Container from '@/components/molecules/Container';
import Image from 'next/image';

type PostPageProps = {
  params: {
    slug: string;
  }
}

// This function tells Next.js which slugs to pre-render at build time.
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

/**
 * The page for displaying a single blog post.
 * Fetches post data based on the slug from the URL.
 */
export default function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound(); // Triggers the 404 page if post is not found
  }

  return (
    <Container>
      <article className="pt-32 pb-20">
        <header className="text-center">
          <p className="text-base font-semibold text-phato-yellow">
            {new Date(post.date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-phato-light sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-6 text-lg text-phato-text">
            Por {post.author}
          </p>
        </header>

        <div className="mt-12">
            <Image 
                src={post.imageUrl}
                alt={`Imagem de destaque para o artigo ${post.title}`}
                width={1200}
                height={600}
                className="rounded-lg object-cover"
                priority
            />
        </div>

        <div 
          className="prose prose-invert prose-lg mx-auto mt-12 text-phato-text"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </Container>
  );
}
