import { Profile } from '@/types/profile';
import { TechIcon } from '@/components/ui/TechIcon';

type SkillProps = {
  skill: Profile['skills'][number];
};

export function SkillCard({ skill, isHighlighted }: SkillProps & { isHighlighted?: boolean }) {
  return (
    <article 
      className={`border-2 border-border ${isHighlighted ? 'bg-accent/25 shadow-[8px_8px_0px_0px_var(--border-color)]' : 'bg-background shadow-[4px_4px_0px_0px_transparent]'} p-4 md:p-6 h-full hover:shadow-[4px_4px_0px_0px_var(--border-color)] hover:-translate-y-1 transition-all duration-300 group`}
      aria-label={`${skill.name} skills`}
    >
      <header className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6 border-b-2 border-border pb-2">
        <TechIcon name={skill.name} className="text-foreground w-5 h-5 md:w-6 md:h-6" aria-hidden="true" />
        <h3 className="text-lg md:text-xl font-black font-mono text-foreground uppercase tracking-wider">{skill.name}</h3>
      </header>
      <ul className="flex flex-wrap gap-2" role="list" aria-label={`${skill.name} technologies`}>
        {skill.keywords.map((kw) => (
          <li key={kw}>
            <span className="bg-background border-2 border-border px-2 md:px-3 py-1 text-xs md:text-sm font-bold font-mono text-foreground hover:bg-foreground hover:text-background transition-colors cursor-default flex items-center gap-1.5 md:gap-2 shadow-[2px_2px_0px_0px_var(--border-color)]">
              <TechIcon name={kw} className="group-hover:text-current w-3 h-3" aria-hidden="true" />
              {kw}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}
