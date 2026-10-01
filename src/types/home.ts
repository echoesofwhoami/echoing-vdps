import type { CollectionEntry } from 'astro:content'

export interface PostCardProps {
  post: CollectionEntry<'blog'>;
}

export interface PostListProps {
  posts: CollectionEntry<'blog'>[];
}

export interface DiscordCtaProps {
  compact?: boolean;
}
