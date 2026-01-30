import React from 'react';
import { Profile } from '@/types/profile';
import { TechIcon } from '@/components/ui/TechIcon';

type ProjectProps = {
  project: Profile['projects'][number];
};

export function ProjectCard({ project, isHighlighted }: ProjectProps & { isHighlighted?: boolean }) {
  return (
    <div className={`border-2 border-border ${isHighlighted ? 'bg-accent/25 shadow-[8px_8px_0px_0px_var(--border-color)]' : 'bg-background shadow-[4px_4px_0px_0px_transparent]'} p-6 flex flex-col h-full hover:shadow-[4px_4px_0px_0px_var(--border-color)] hover:-translate-y-1 transition-all duration-300`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-2xl font-bold font-mono text-foreground">
          {project.url ? (
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2 underline decoration-2 underline-offset-4 decoration-black hover:decoration-primary">
              {project.name} <span className="text-sm">↗</span>
            </a>
          ) : (
            project.name
          )}
        </h3>
        {project.type && (
          <span className="text-[10px] uppercase font-mono border-2 border-border px-2 py-1 text-foreground font-bold tracking-wider bg-secondary">
            {project.type}
          </span>
        )}
      </div>
      <p className="text-foreground/80 mb-6 flex-grow leading-relaxed font-medium">{project.description}</p>
      
      {project.highlights && project.highlights.length > 0 && (
        <div className="mb-6 space-y-2">
           {project.highlights.map((h, i) => (
             <div key={i} className="text-sm text-foreground/80 border-l-2 mb-2 border-border pl-3">{h}</div>
           ))}
        </div>
      )}

      {project.keywords && (
        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t-2 border-border border-dashed">
          {project.keywords.map((kw) => (
            <span key={kw} className="text-xs font-mono text-foreground font-bold bg-background border-2 border-border px-2 py-1 flex items-center gap-1.5 shadow-[2px_2px_0px_0px_var(--border-color)]">
              <TechIcon name={kw} className="w-3 h-3 text-foreground" />
              {kw}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
