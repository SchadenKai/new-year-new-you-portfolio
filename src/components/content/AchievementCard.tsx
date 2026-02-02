import React from 'react';
import { Profile } from '@/types/profile';
import Image from 'next/image';

type AchievementProps = {
  achievement: NonNullable<Profile['achievements']>[number];
};

export function AchievementCard({ achievement, isHighlighted }: AchievementProps & { isHighlighted?: boolean }) {
  return (
    <article
      className={`border-2 border-border ${isHighlighted ? 'bg-accent/25 shadow-[8px_8px_0px_0px_var(--border-color)]' : 'bg-background shadow-[4px_4px_0px_0px_transparent]'} p-4 md:p-6 h-full flex flex-col hover:shadow-[4px_4px_0px_0px_var(--border-color)] hover:-translate-y-1 transition-all duration-300 group`}
      aria-label={`${achievement.title} at ${achievement.event}`}
    >
      <header className="flex flex-col gap-2 mb-3 md:mb-4">
        <h3 className="text-xl md:text-2xl font-bold font-mono text-foreground text-pretty">
            {achievement.title}
        </h3>
        <div className="flex justify-between items-center text-xs md:text-sm font-mono text-muted-foreground font-bold border-b-2 border-border pb-2">
            <span>@{achievement.event}</span>
            <time>{achievement.date}</time>
        </div>
      </header>

      {achievement.image ? (
        <div className="mb-4 relative w-full h-48 flex-shrink-0">
             <Image
                src={achievement.image}
                alt={achievement.title}
                fill
                className="object-cover border-2 border-border shadow-[4px_4px_0px_0px_var(--border-color)]"
              />
        </div>
      ) : (
        <div className="mb-4 relative w-full h-48 bg-muted border-2 border-border shadow-[4px_4px_0px_0px_var(--border-color)] flex items-center justify-center text-muted-foreground text-xs md:text-sm font-mono flex-shrink-0">
           <div className='flex flex-col gap-2 items-center'>
            <span className='text-4xl'>🏆</span>
            <span className='italic opacity-50 text-center px-4'>Upload an image to src/data/profile.json</span>
           </div>
        </div>
      )}

      {achievement.summary && (
        <p className="mb-4 md:mb-6 text-foreground/80 leading-relaxed font-medium text-sm md:text-base flex-grow">
          {achievement.summary}
        </p>
      )}

      {achievement.location && (
          <div className="mt-auto pt-3 md:pt-4 border-t-2 border-border border-dashed">
             <span className="text-xs font-mono text-background font-bold bg-foreground border-2 border-border px-1.5 md:px-2 py-0.5 md:py-1 inline-flex items-center gap-1 md:gap-1.5 shadow-[2px_2px_0px_0px_var(--border-color)]">
                 📍 {achievement.location}
             </span>
          </div>
      )}
    </article>
  );
}
