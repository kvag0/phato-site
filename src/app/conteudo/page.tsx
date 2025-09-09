// src/app/conteudo/page.tsx

import Container from "@/components/molecules/Container";
import PostCard from "@/components/molecules/PostCard";
import { getAllPosts } from "@/lib/api";

/**
 * The main content hub page.
 * Fetches and displays a list of all blog posts.
 */
export default function ConteudoPage() {
  const posts = getAllPosts();

  return (
    <Container>
      <div className="pt-32 pb-20">
        <h1 className="text-4xl font-bold tracking-tight text-phato-light sm:text-5xl">
          Conteúdo & Insights
        </h1>
        <p className="mt-4 text-xl text-phato-text">
          O nosso hub de liderança de pensamento. Explore artigos sobre tecnologia, informação e o futuro do diálogo.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-20 lg:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </Container>
  );
}
