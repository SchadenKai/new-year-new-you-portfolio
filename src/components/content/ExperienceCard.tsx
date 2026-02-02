import React from 'react';
import { Profile } from '@/types/profile';
import { TechIcon } from '@/components/ui/TechIcon';

type ExperienceProps = {
  work: Profile['work'][number];
};

export function ExperienceCard({ work, isHighlighted }: ExperienceProps & { isHighlighted?: boolean }) {
  const [imageError, setImageError] = React.useState(false);

  return (
    <article 
      className={`border-2 border-border ${isHighlighted ? 'bg-accent/25 shadow-[8px_8px_0px_0px_var(--border-color)]' : 'bg-background shadow-[4px_4px_0px_0px_transparent]'} p-4 md:p-6 flex flex-col h-full hover:shadow-[4px_4px_0px_0px_var(--border-color)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden`}
      aria-label={`${work.position} at ${work.name}`}
    >
      <div className="flex flex-col h-full">
        <header className="mb-4">
          <div className="flex items-center gap-3 mb-3">
             {work.logo && !imageError ? (
                <img 
                  src={work.logo} 
                  alt={`${work.name} logo`} 
                  className="w-10 h-10 md:w-12 md:h-12 object-contain rounded-full border-2 border-border/10 bg-white" 
                  onError={() => setImageError(true)}
                />
             ) : (
                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center border-2 border-border/10">
                    <span className="font-bold text-primary text-sm md:text-base">{work.name.substring(0, 2).toUpperCase()}</span>
                </div>
             )}
            <h3 className="text-xl md:text-2xl font-bold font-mono text-foreground">{work.name}</h3>
          </div>
          
          <div className="flex flex-col gap-1 text-sm">
             <div className="font-bold text-lg text-primary">{work.position}</div>
             <div className="flex flex-wrap gap-x-3 gap-y-1 text-muted-foreground font-mono text-xs md:text-sm">
                <span className="flex items-center gap-1">
                    <span>📍</span> {work.location || 'Remote'}
                </span>
                <span className="hidden md:inline text-border">|</span>
                <span className="flex items-center gap-1">
                    <span>📅</span> {work.startDate} — {work.endDate || 'Present'}
                </span>
             </div>
          </div>
        </header>
        
        <div className="flex-grow mb-6">
            {work.summary && (
                <p className="mb-4 text-foreground/80 leading-relaxed font-medium text-sm md:text-base">
                    {work.summary}
                </p>
            )}
            
            {work.highlights && (
                <ul className="list-none space-y-2 text-xs md:text-sm text-foreground/80" aria-label="Key achievements">
                {work.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start">
                    <span className="text-primary mr-2 font-bold mt-0.5" aria-hidden="true">➜</span>
                    <span>{highlight}</span>
                    </li>
                ))}
                </ul>
            )}
        </div>
        
        {work.skills && work.skills.length > 0 && (
            <div className="mt-auto pt-4 border-t-2 border-border border-dashed">
                <div className="text-xs font-bold mb-3 uppercase tracking-wider text-muted-foreground">Tech Stack:</div>
                <ul className="flex flex-wrap gap-1.5 md:gap-2" role="list" aria-label="Technologies used">
                {work.skills.map((skill) => (
                    <li key={skill}>
                    <span className="text-xs font-mono text-background font-bold bg-foreground border-2 border-border px-1.5 md:px-2 py-0.5 md:py-1 flex items-center gap-1 md:gap-1.5 shadow-[2px_2px_0px_0px_var(--border-color)]">
                        <TechIcon name={skill} className="w-2.5 h-2.5 md:w-3 md:h-3 text-background" aria-hidden="true" />
                        {skill}
                    </span>
                    </li>
                ))}
                </ul>
            </div>
        )}
      </div>
    </article>
  );
}
