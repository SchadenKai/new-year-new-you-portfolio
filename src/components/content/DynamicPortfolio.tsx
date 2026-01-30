"use client";

import React from 'react';
import { useLayoutStore, SectionName } from '@/store/useLayoutStore';
import { ExperienceCard } from "@/components/content/ExperienceCard";
import { ProjectCard } from "@/components/content/ProjectCard";
import { SkillCard } from "@/components/content/SkillCard";
import { Profile } from '@/types/profile';
import { motion, AnimatePresence } from 'framer-motion';

interface DynamicPortfolioProps {
  profile: Profile;
}

export function DynamicPortfolio({ profile }: DynamicPortfolioProps) {
  const { layoutOrder, highlightIds } = useLayoutStore();

  const isHighlighted = (id: string) => highlightIds.includes(id);

  const sections: Record<SectionName, React.ReactNode> = {
    experience: (
      <motion.section 
        layout
        key="experience" 
        className="mb-12 md:mb-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        aria-labelledby="experience-heading"
      >
         <h3 id="experience-heading" className="text-2xl md:text-4xl font-bold mb-6 md:mb-12 uppercase flex items-center tracking-wide">
          <span className="w-4 h-4 md:w-6 md:h-6 bg-primary mr-3 md:mr-6" aria-hidden="true"></span>
          Experience
        </h3>
        <div className="space-y-4 md:space-y-8">
          {profile.work.map((work, index) => (
            <ExperienceCard 
                key={index} 
                work={work} 
                isHighlighted={isHighlighted(`work-${index}`)}
            />
          ))}
        </div>
      </motion.section>
    ),
    projects: (
         <motion.section 
            layout
            key="projects" 
            className="mb-12 md:mb-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            aria-labelledby="projects-heading"
         >
            <h3 id="projects-heading" className="text-2xl md:text-4xl font-bold mb-6 md:mb-12 uppercase flex items-center tracking-wide">
            <span className="w-4 h-4 md:w-6 md:h-6 bg-primary mr-3 md:mr-6" aria-hidden="true"></span>
            Selected Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {profile.projects.map((project, index) => (
                <ProjectCard 
                    key={index} 
                    project={project} 
                    isHighlighted={isHighlighted(`project-${index}`)}
                />
            ))}
            </div>
        </motion.section>
    ),
    skills: (
        <motion.section 
            layout
            key="skills" 
            className="mb-12 md:mb-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            aria-labelledby="skills-heading"
        >
            <h3 id="skills-heading" className="text-2xl md:text-4xl font-bold mb-6 md:mb-12 uppercase flex items-center tracking-wide">
            <span className="w-4 h-4 md:w-6 md:h-6 bg-primary mr-3 md:mr-6" aria-hidden="true"></span>
            Technical Arsenal
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {profile.skills.map((skill, index) => (
                    <SkillCard 
                        key={index} 
                        skill={skill} 
                        isHighlighted={isHighlighted(`skill-${index}`)}
                    />
                ))}
            </div>
        </motion.section>
    )
  };

  return (
    <div className="flex flex-col">
         <AnimatePresence mode="popLayout">
            {layoutOrder.map(section => sections[section])}
         </AnimatePresence>
    </div>
  );
}
