// src/components/molecules/DemoCard.tsx

import Link from "next/link";
import { Demo } from "@/lib/demos";

/**
 * A card component for the technology page, linking to a specific demo.
 */
export default function DemoCard({ slug, title, description }: Demo) {
  return (
    <Link href={`/tecnologia/${slug}`} className="group block">
      <div className="h-full rounded-2xl border-2 border-phato-ui bg-phato-card p-6 transition-all duration-300 group-hover:border-phato-yellow group-hover:shadow-lg group-hover:shadow-phato-yellow/10">
        <h3 className="text-xl font-semibold text-phato-light group-hover:text-phato-yellow">
          {title}
        </h3>
        <p className="mt-3 text-base text-phato-text">
          {description}
        </p>
      </div>
    </Link>
  );
}
