// src/components/molecules/PostCard.tsx

import Link from "next/link";
import Image from "next/image";
import { Post } from "@/lib/types";

interface PostCardProps {
  post: Post;
}

/**
 * A card component to display a summary of a blog post.
 * Links to the full article page.
 */
export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/conteudo/${post.slug}`} className="group block">
      <div className="overflow-hidden rounded-2xl bg-phato-card transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-phato-yellow/10">
        <Image
          src={post.imageUrl}
          alt={`Imagem para o artigo ${post.title}`}
          width={800}
          height={400}
          className="object-cover w-full h-auto"
        />
        <div className="p-6">
          <p className="text-sm text-phato-text">
            {new Date(post.date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-phato-light group-hover:text-phato-yellow">
            {post.title}
          </h3>
          <p className="mt-3 text-base text-phato-text">
            {post.excerpt}
          </p>
        </div>
      </div>
    </Link>
  );
}
