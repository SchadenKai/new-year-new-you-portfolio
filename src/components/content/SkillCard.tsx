import { Profile } from '@/types/profile';
import { TechIcon } from '@/components/ui/TechIcon';

type SkillProps = {
  skill: Profile['skills'][number];
};

export function SkillCard({ skill, isHighlighted }: SkillProps & { isHighlighted?: boolean }) {
  return (
    <div className={`border-2 border-border ${isHighlighted ? 'bg-accent/25 shadow-[8px_8px_0px_0px_var(--border-color)]' : 'bg-background shadow-[4px_4px_0px_0px_transparent]'} p-6 h-full hover:shadow-[4px_4px_0px_0px_var(--border-color)] hover:-translate-y-1 transition-all duration-300 group`}>
      <div className="flex items-center gap-3 mb-6 border-b-2 border-border pb-2">
        <TechIcon name={skill.name} className="text-foreground w-6 h-6" />
        <h3 className="text-xl font-black font-mono text-foreground uppercase tracking-wider">{skill.name}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skill.keywords.map((kw) => (
          <span key={kw} className="bg-background border-2 border-border px-3 py-1 text-sm font-bold font-mono text-foreground hover:bg-foreground hover:text-background transition-colors cursor-default flex items-center gap-2 shadow-[2px_2px_0px_0px_var(--border-color)]">
            <TechIcon name={kw} className="group-hover:text-current w-3 h-3" />
            {kw}
          </span>
        ))}
      </div>
    </div>
  );
}
