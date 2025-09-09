// src/lib/types.ts

/**
 * Defines the structure for a single blog post object.
 * This ensures type safety when handling content data across the application.
 */
export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  imageUrl: string;
  content: string; // Added for the full article content
}
