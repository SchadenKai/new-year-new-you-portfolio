import React from 'react';
import { Profile } from '@/types/profile';

type ExperienceProps = {
  work: Profile['work'][number];
};

export function ExperienceCard({ work, isHighlighted }: ExperienceProps & { isHighlighted?: boolean }) {
  return (
    <div className={`border-2 border-border ${isHighlighted ? 'bg-accent/25 shadow-[8px_8px_0px_0px_var(--border-color)] -translate-y-1' : 'bg-background shadow-[4px_4px_0px_0px_var(--border-color)]'} p-6 mb-6 relative overflow-hidden group transition-all duration-300`}>
      {/* Decorative accent - removed for cleaner neo look or keep as simple strip */}
      <div className="absolute top-0 left-0 w-2 h-full bg-foreground transform origin-top scale-y-100 transition-transform duration-300"></div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline mb-3 pl-4">
        <h3 className="text-xl font-bold uppercase tracking-tight text-foreground">{work.position}</h3>
        <span className="font-mono text-muted-foreground text-sm whitespace-nowrap mt-1 md:mt-0 font-bold">
          {work.startDate} — {work.endDate || 'Present'}
        </span>
      </div>
      
      <div className="text-lg font-mono text-primary mb-4 pl-4 font-black">@{work.name}</div>
      
      {work.summary && <p className="mb-4 text-muted-foreground pl-4 leading-relaxed font-medium">{work.summary}</p>}
      
      {work.highlights && (
        <ul className="list-none space-y-2 pl-4 text-sm text-muted-foreground">
          {work.highlights.map((highlight, idx) => (
            <li key={idx} className="flex items-start">
              <span className="text-foreground mr-2 font-bold">➜</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
