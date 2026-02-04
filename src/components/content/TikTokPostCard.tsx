import React from 'react';

export interface TikTokOEmbed {
  version: string;
  type: string;
  title: string;
  author_url: string;
  author_name: string;
  width: number;
  height: number;
  html: string;
  thumbnail_width: number;
  thumbnail_height: number;
  thumbnail_url: string;
  provider_url: string;
  provider_name: string;
  stats?: {
    viewCount: number;
    likeCount: number;
    commentCount: number;
    shareCount: number;
  }
}

export interface TikTokPostProps {
  data: TikTokOEmbed | null; 
  url: string;
  isHighlighted?: boolean;
}

export function TikTokPostCard({ data, url, isHighlighted }: TikTokPostProps) {
  // Format numbers for display (e.g. 1.2M, 10k)
  const formatNumber = (num: number) => {
    if (!num) return '0';
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  if (!data) {
    return (
        <article
        className={`flex flex-col h-full border-2 border-border ${
            isHighlighted
            ? 'bg-accent/25 shadow-[8px_8px_0px_0px_var(--border-color)] -translate-y-1'
            : 'bg-background shadow-[4px_4px_0px_0px_var(--border-color)]'
        } p-4 md:p-6 transition-all duration-300 group justify-center items-center`}
        >
            <div className="animate-pulse w-full h-48 bg-surface rounded-sm"></div>
        </article>
    )
  }

  return (
    <article
      className={`flex flex-col h-full border-2 border-border ${
        isHighlighted
          ? 'bg-accent/25 shadow-[8px_8px_0px_0px_var(--border-color)] -translate-y-1'
          : 'bg-background shadow-[4px_4px_0px_0px_var(--border-color)]'
      } p-4 md:p-6 transition-all duration-300 group hover:translate-y-[-4px] hover:shadow-[6px_6px_0px_0px_var(--border-color)]`}
    >
      <a href={url} target="_blank" rel="noopener noreferrer" className="block mb-4 focus:outline-none focus:ring-2 focus:ring-primary rounded-sm group/link">
        {data.thumbnail_url && (
          <div className="aspect-[9/16] md:aspect-video overflow-hidden rounded-sm border-2 border-border bg-black relative">
            <img
              src={data.thumbnail_url}
              alt={data.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover/link:scale-105"
              style={{ objectPosition: 'center' }}
            />
            {/* Dark overlay that lightens slightly on hover */}
            <div className="absolute inset-0 bg-black/20 group-hover/link:bg-black/10 transition-colors duration-300" />
            
            <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-14 h-14 bg-black/60 rounded-full flex items-center justify-center border-2 border-white/80 backdrop-blur-sm group-hover/link:scale-110 group-hover/link:bg-red-500/80 group-hover/link:border-white transition-all duration-300 shadow-lg">
                    <span className="text-2xl ml-1 text-white">▶️</span>
                 </div>
            </div>
            <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs font-mono text-white flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                TikTok
            </div>
          </div>
        )}
      </a>

      <header className="mb-4 flex-grow">
        <h3 className="text-lg md:text-xl font-bold leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
          <a href={url} target="_blank" rel="noopener noreferrer" className="hover:underline decoration-2 underline-offset-2 focus:outline-none focus:text-primary">
            {data.title || "TikTok Video"}
          </a>
        </h3>
        <div className="text-xs font-mono text-muted-foreground font-bold uppercase flex items-center gap-2">
             <span>@{data.author_name}</span>
        </div>
      </header>

      {/* Stats Footer */}
      {(data.stats && (data.stats.viewCount > 0 || data.stats.likeCount > 0)) && (
         <footer className="flex items-center justify-between border-t-2 border-border pt-4 mt-auto">
            <div className="flex items-center gap-4 text-xs font-bold font-mono text-muted-foreground w-full justify-between">
              <span className="flex items-center gap-1" title="Views">
                 👁️ {formatNumber(data.stats.viewCount)}
              </span>
              <span className="flex items-center gap-1" title="Likes">
                 ❤️ {formatNumber(data.stats.likeCount)}
              </span>
              <span className="flex items-center gap-1" title="Comments">
                 💬 {formatNumber(data.stats.commentCount)}
              </span>
              <span className="flex items-center gap-1" title="Shares">
                 ↗️ {formatNumber(data.stats.shareCount)}
              </span>
            </div>
         </footer>
      )}
    </article>
  );
}
