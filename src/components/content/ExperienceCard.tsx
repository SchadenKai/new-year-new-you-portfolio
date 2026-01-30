import React from 'react';
import { Profile } from '@/types/profile';

type ExperienceProps = {
  work: Profile['work'][number];
};

export function ExperienceCard({ work, isHighlighted }: ExperienceProps & { isHighlighted?: boolean }) {
  return (
    <article 
      className={`border-2 border-border ${isHighlighted ? 'bg-accent/25 shadow-[8px_8px_0px_0px_var(--border-color)] -translate-y-1' : 'bg-background shadow-[4px_4px_0px_0px_var(--border-color)]'} p-4 md:p-6 mb-4 md:mb-6 relative overflow-hidden group transition-all duration-300`}
      aria-label={`${work.position} at ${work.name}`}
    >
      {/* Decorative accent */}
      <div className="absolute top-0 left-0 w-1.5 md:w-2 h-full bg-foreground transform origin-top scale-y-100 transition-transform duration-300" aria-hidden="true"></div>

      <header className="flex flex-col md:flex-row justify-between items-start md:items-baseline mb-2 md:mb-3 pl-3 md:pl-4 gap-1 md:gap-0">
        <h3 className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">{work.position}</h3>
        <time className="font-mono text-muted-foreground text-xs md:text-sm whitespace-nowrap font-bold">
          {work.startDate} — {work.endDate || 'Present'}
        </time>
      </header>
      
      <div className="text-base md:text-lg font-mono text-primary mb-3 md:mb-4 pl-3 md:pl-4 font-black">@{work.name}</div>
      
      {work.summary && (
        <p className="mb-3 md:mb-4 text-muted-foreground pl-3 md:pl-4 leading-relaxed font-medium text-sm md:text-base">{work.summary}</p>
      )}
      
      {work.highlights && (
        <ul className="list-none space-y-1.5 md:space-y-2 pl-3 md:pl-4 text-xs md:text-sm text-muted-foreground" aria-label="Key achievements">
          {work.highlights.map((highlight, idx) => (
            <li key={idx} className="flex items-start">
              <span className="text-foreground mr-1.5 md:mr-2 font-bold" aria-hidden="true">➜</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
