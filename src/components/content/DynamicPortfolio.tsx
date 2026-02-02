"use client";

import React from 'react';
import { useLayoutStore, SectionName } from '@/store/useLayoutStore';
import { ExperienceCard } from "@/components/content/ExperienceCard";
import { ProjectCard } from "@/components/content/ProjectCard";
import { SkillCard } from "@/components/content/SkillCard";
import { AchievementCard } from "@/components/content/AchievementCard";
import { PostCard, DevToPost } from "@/components/content/PostCard";

import { Profile } from '@/types/profile';
import { motion, AnimatePresence } from 'framer-motion';

interface DynamicPortfolioProps {
  profile: Profile;
}

export function DynamicPortfolio({ profile }: DynamicPortfolioProps) {
  const { layoutOrder, highlightIds } = useLayoutStore();

  const isHighlighted = (id: string) => highlightIds.includes(id);

  const [posts, setPosts] = React.useState<DevToPost[]>([]);
  const [loadingPosts, setLoadingPosts] = React.useState(true);
  const [postsExpanded, setPostsExpanded] = React.useState(false);

  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts');
        if (res.ok) {
           const data = await res.json();
           if (Array.isArray(data)) {
             setPosts(data);
           }
        }
      } catch (error) {
        console.error('Failed to fetch posts', error);
      } finally {
        setLoadingPosts(false);
      }
    };
    fetchPosts();
  }, []);

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
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
    ),
    achievements: (
        <motion.section 
            layout
            key="achievements" 
            className="mb-12 md:mb-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            aria-labelledby="achievements-heading"
        >
            <h3 id="achievements-heading" className="text-2xl md:text-4xl font-bold mb-6 md:mb-12 uppercase flex items-center tracking-wide">
            <span className="w-4 h-4 md:w-6 md:h-6 bg-primary mr-3 md:mr-6" aria-hidden="true"></span>
            Achievements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {profile.achievements?.map((achievement, index) => (
                <AchievementCard 
                    key={index} 
                    achievement={achievement} 
                    isHighlighted={isHighlighted(`achievement-${index}`)}
                />
            ))}
            </div>
        </motion.section>
    ),
    posts: (
        <motion.section 
            layout
            key="posts" 
            className="mb-12 md:mb-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            aria-labelledby="posts-heading"
        >
            <h3 id="posts-heading" className="text-2xl md:text-4xl font-bold mb-6 md:mb-12 uppercase flex items-center tracking-wide">
            <span className="w-4 h-4 md:w-6 md:h-6 bg-primary mr-3 md:mr-6" aria-hidden="true"></span>
            Recent Writings
            </h3>
            {loadingPosts ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-64 bg-surface border-2 border-border animate-pulse rounded-sm" />
                  ))}
               </div>
            ) : posts.length > 0 ? (

               <div className="flex flex-col gap-6 md:gap-8">
                 <motion.div 
                    layout 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
                 >
                    <AnimatePresence initial={false} mode="popLayout">
                        {(postsExpanded ? posts : posts.slice(0, 3)).map((post) => (
                            <motion.div
                                layout
                                key={post.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
                            >
                                <PostCard 
                                    post={post} 
                                    isHighlighted={isHighlighted(`post-${post.id}`)}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                 </motion.div>
                 
                 {posts.length > 3 && (
                   <div className="flex justify-center">
                     <button
                       onClick={() => setPostsExpanded(!postsExpanded)}
                       className="px-8 py-3 bg-primary text-white font-bold font-mono tracking-wider border-2 border-foreground shadow-[4px_4px_0px_0px_var(--foreground)] hover:translate-y-1 hover:shadow-none transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary items-center flex gap-2 rounded-sm"
                       aria-expanded={postsExpanded}
                     >
                       {postsExpanded ? 'SHOW LESS' : 'VIEW ALL WRITINGS'}
                       <motion.span 
                          animate={{ rotate: postsExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          aria-hidden="true"
                          className="inline-block"
                       >
                         ↓
                       </motion.span>
                     </button>
                   </div>
                 )}
               </div>
            ) : (
                <div className="p-6 border-2 border-border border-dashed text-center">
                    <p className="text-muted-foreground font-mono">Loading posts failed or no posts found.</p>
                </div>
            )}
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
