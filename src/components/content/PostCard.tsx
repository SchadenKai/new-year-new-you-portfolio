import React from 'react';

export interface DevToPost {
  type_of: string;
  id: number;
  title: string;
  description: string;
  published_at: string;
  slug: string;
  path: string;
  url: string;
  comments_count: number;
  public_reactions_count: number;
  page_views_count: number;
  published_timestamp: string;
  body_markdown: string;
  positive_reactions_count: number;
  cover_image: string | null;
  tag_list: string[];
  canonical_url: string;
  reading_time_minutes: number;
  user: {
    name: string;
    username: string;
    twitter_username: string | null;
    github_username: string | null;
    website_url: string | null;
    profile_image: string;
    profile_image_90: string;
  };
}

interface PostCardProps {
  post: DevToPost;
  isHighlighted?: boolean;
}

export function PostCard({ post, isHighlighted }: PostCardProps) {
  return (
    <article
      className={`flex flex-col h-full border-2 border-border ${
        isHighlighted
          ? 'bg-accent/25 shadow-[8px_8px_0px_0px_var(--border-color)] -translate-y-1'
          : 'bg-background shadow-[4px_4px_0px_0px_var(--border-color)]'
      } p-4 md:p-6 transition-all duration-300 group`}
    >
      <header className="mb-4">
        {post.cover_image && (
          <div className="mb-4 aspect-video overflow-hidden rounded-sm border-2 border-border">
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            />
          </div>
        )}
        <h3 className="text-xl md:text-2xl font-bold leading-tight mb-2 group-hover:text-primary transition-colors">
          <a href={post.url} target="_blank" rel="noopener noreferrer" className="hover:underline decoration-2 underline-offset-2 focus:outline-none focus:text-primary">
            {post.title}
          </a>
        </h3>
        <time className="text-xs font-mono text-muted-foreground font-bold uppercase">
          {new Date(post.published_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
      </header>

      <p className="text-muted-foreground text-sm md:text-base mb-4 flex-grow line-clamp-3 leading-relaxed">
        {post.description}
      </p>

      <footer className="flex items-center justify-between border-t-2 border-border pt-4 mt-auto">
        <div className="flex flex-wrap gap-2">
          {post.tag_list.slice(0, 3).map((tag) => (
             <span key={tag} className="text-xs font-mono bg-surface px-2 py-1 rounded-sm border border-border">
               #{tag}
             </span>
          ))}
        </div>
        <div className="flex items-center gap-4 text-xs font-bold font-mono text-muted-foreground">
          <span className="flex items-center gap-1 min-w-[3ch]">
             ❤️ {post.public_reactions_count}
          </span>
           <span className="flex items-center gap-1 min-w-[3ch]">
             ⏱️ {post.reading_time_minutes}m
          </span>
        </div>
      </footer>
    </article>
  );
}
