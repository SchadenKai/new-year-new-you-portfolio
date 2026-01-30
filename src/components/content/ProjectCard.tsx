import React from 'react';
import { Profile } from '@/types/profile';
import { TechIcon } from '@/components/ui/TechIcon';

type ProjectProps = {
  project: Profile['projects'][number];
};

export function ProjectCard({ project, isHighlighted }: ProjectProps & { isHighlighted?: boolean }) {
  return (
    <article 
      className={`border-2 border-border ${isHighlighted ? 'bg-accent/25 shadow-[8px_8px_0px_0px_var(--border-color)]' : 'bg-background shadow-[4px_4px_0px_0px_transparent]'} p-4 md:p-6 flex flex-col h-full hover:shadow-[4px_4px_0px_0px_var(--border-color)] hover:-translate-y-1 transition-all duration-300`}
      aria-label={`Project: ${project.name}`}
    >
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3 md:mb-4">
        <h3 className="text-xl md:text-2xl font-bold font-mono text-foreground">
          {project.url ? (
            <a 
              href={project.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-primary transition-colors flex items-center gap-2 underline decoration-2 underline-offset-4 decoration-black hover:decoration-primary focus:outline-none focus-visible:text-primary"
              aria-label={`View ${project.name} project (opens in new tab)`}
            >
              {project.name} <span className="text-sm" aria-hidden="true">↗</span>
            </a>
          ) : (
            project.name
          )}
        </h3>
        {project.type && (
          <span className="text-[10px] uppercase font-mono border-2 border-border px-2 py-1 text-black font-bold tracking-wider bg-secondary self-start">
            {project.type}
          </span>
        )}
      </header>
      <p className="text-foreground/80 mb-4 md:mb-6 flex-grow leading-relaxed font-medium text-sm md:text-base">{project.description}</p>
      
      {project.highlights && project.highlights.length > 0 && (
        <ul className="mb-4 md:mb-6 space-y-2" aria-label="Project highlights">
           {project.highlights.map((h, i) => (
             <li key={i} className="text-xs md:text-sm text-foreground/80 border-l-2 mb-2 border-border pl-3">{h}</li>
           ))}
        </ul>
      )}

      {project.keywords && (
        <ul className="flex flex-wrap gap-1.5 md:gap-2 mt-auto pt-3 md:pt-4 border-t-2 border-border border-dashed" role="list" aria-label="Technologies used">
          {project.keywords.map((kw) => (
            <li key={kw}>
              <span className="text-xs font-mono text-background font-bold bg-foreground border-2 border-border px-1.5 md:px-2 py-0.5 md:py-1 flex items-center gap-1 md:gap-1.5 shadow-[2px_2px_0px_0px_var(--border-color)]">
                <TechIcon name={kw} className="w-2.5 h-2.5 md:w-3 md:h-3 text-background" aria-hidden="true" />
                {kw}
              </span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
