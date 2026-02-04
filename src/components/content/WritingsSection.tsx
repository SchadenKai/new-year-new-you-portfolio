"use client";

import React, { useEffect, useState, useRef } from 'react';
import { DevToPost } from './PostCard';
import { TikTokOEmbed } from './TikTokPostCard';
import { CompactOverlayCard } from './CompactOverlayCard';
import { Profile } from '@/types/profile';
import { useLayoutStore } from '@/store/useLayoutStore';
import { ArrowUp } from 'lucide-react';
import { ExpandButton } from '@/components/ui/ExpandButton';

interface WritingsSectionProps {
  profile: Profile;
}

type MixedItem = 
  | { type: 'post', data: DevToPost }
  | { type: 'tiktok', data: TikTokOEmbed, url: string };

export function WritingsSection({ profile }: WritingsSectionProps) {
  const { highlightIds } = useLayoutStore();
  const isHighlighted = (id: string) => highlightIds.includes(id);
  const sectionRef = useRef<HTMLElement>(null);

  const [items, setItems] = useState<MixedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [postsRes, tiktokRes] = await Promise.allSettled([
           fetch('/api/posts'),
           // For TikTok, we fetch individual URLs. In a real app we'd batch this or have a user-feed endpoint.
           profile.tiktok && profile.tiktok.length > 0 
             ? Promise.all(profile.tiktok.map(url => fetch(`/api/tiktok?url=${encodeURIComponent(url)}`).then(r => r.ok ? r.json().then(data => ({ data, url })) : null)))
             : Promise.resolve([])
        ]);

        let newItems: MixedItem[] = [];

        if (postsRes.status === 'fulfilled' && postsRes.value.ok) {
           const posts = await postsRes.value.json();
           if (Array.isArray(posts)) {
             // Take all posts
             newItems.push(...posts.map((p: DevToPost) => ({ type: 'post' as const, data: p })));
           }
        }

        if (tiktokRes.status === 'fulfilled') {
            const tiktoks = tiktokRes.value;
            if (Array.isArray(tiktoks)) {
                tiktoks.forEach(t => {
                    if (t && t.data) {
                        newItems.push({ type: 'tiktok' as const, data: t.data, url: t.url });
                    }
                });
            }
        }

        // Shuffle / Interleave items to look "combined"
        // Simple interleave: post, tiktok, post, tiktok...
        // Sort by date if we had it for both, but we don't for tiktok easily.
        // Let's just mix them: [p1, t1, p2, t2...]
        const mixed: MixedItem[] = [];
        const maxLength = Math.max(newItems.filter(i => i.type === 'post').length, newItems.filter(i => i.type === 'tiktok').length);
        const posts = newItems.filter(i => i.type === 'post');
        const tiktoks = newItems.filter(i => i.type === 'tiktok');
        
        for (let i = 0; i < maxLength; i++) {
            if (posts[i]) mixed.push(posts[i]);
            if (tiktoks[i]) mixed.push(tiktoks[i]);
        }

        setItems(mixed);
      } catch (error) {
        console.error("Failed to fetch writings", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [profile.tiktok]);

  // Handle scroll for floating button
  useEffect(() => {
    const handleScroll = () => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        // Show if we scrolled past ~600px into the section (approx 3rd row start)
        // rect.top is negative as we scroll down
        // If we are significantly past the top of the section
        if (rect.top < -600 && visibleCount > 3) {
            setShowFloatingButton(true);
        } else {
            setShowFloatingButton(false);
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleCount]);

  const handleViewLess = () => {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      // Small delay to allow scroll to start/finish reasonably before layout shift? 
      // Actually better to just set it immediately or after a ms?
      // If we set immediately, the section shrinks and the scroll might be weird.
      // But scrolling to top first ensures we are at the right place.
      setVisibleCount(3);
  };


  // Split into 3 columns for masonry effect
  const visibleItems = items.slice(0, visibleCount);
  const col1 = visibleItems.filter((_, i) => i % 3 === 0);
  const col2 = visibleItems.filter((_, i) => i % 3 === 1);
  const col3 = visibleItems.filter((_, i) => i % 3 === 2);

  const isExpanded = visibleCount > 3;

  return (
    <section ref={sectionRef} id="writings" aria-labelledby="writings-heading" className="mb-12 md:mb-24 relative">
      <h3 id="writings-heading" className="text-2xl md:text-4xl font-bold mb-6 md:mb-12 uppercase flex items-center tracking-wide">
        <span className="w-4 h-4 md:w-6 md:h-6 bg-primary mr-3 md:mr-6" aria-hidden="true"></span>
        Writings & Clips
      </h3>

      {loading ? (
           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
               {[...Array(6)].map((_, i) => (
                   <div key={i} className="aspect-[4/5] bg-surface animate-pulse border-2 border-border rounded-sm"/>
               ))}
           </div>
      ) : items.length > 0 ? (
          <div className="flex flex-col items-center">
              <div 
                className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 align-start w-full transition-all"
              >
                 <div className="flex flex-col gap-3 md:gap-4">
                    {col1.map((item, i) => (
                        <CompactOverlayCard
                            key={`col1-${i}`}
                            title={item.type === 'post' ? item.data.title : item.data.title}
                            subtitle={item.type === 'post' ? new Date(item.data.published_at).toLocaleDateString() : item.data.author_name}
                            imageSrc={item.type === 'post' ? (item.data.cover_image || "") : item.data.thumbnail_url}
                            href={item.type === 'post' ? item.data.url : item.url}
                            type={item.type === 'post' ? 'article' : 'video'}
                        />
                    ))}
                 </div>
                 <div className="flex flex-col gap-3 md:gap-4">
                    {col2.map((item, i) => (
                        <CompactOverlayCard
                            key={`col2-${i}`}
                            title={item.type === 'post' ? item.data.title : item.data.title}
                            subtitle={item.type === 'post' ? new Date(item.data.published_at).toLocaleDateString() : item.data.author_name}
                            imageSrc={item.type === 'post' ? (item.data.cover_image || "") : item.data.thumbnail_url}
                            href={item.type === 'post' ? item.data.url : item.url}
                            type={item.type === 'post' ? 'article' : 'video'}
                        />
                    ))}
                 </div>
                 <div className="flex flex-col gap-3 md:gap-4">
                    {col3.map((item, i) => (
                        <CompactOverlayCard
                            key={`col3-${i}`}
                            title={item.type === 'post' ? item.data.title : item.data.title}
                            subtitle={item.type === 'post' ? new Date(item.data.published_at).toLocaleDateString() : item.data.author_name}
                            imageSrc={item.type === 'post' ? (item.data.cover_image || "") : item.data.thumbnail_url}
                            href={item.type === 'post' ? item.data.url : item.url}
                            type={item.type === 'post' ? 'article' : 'video'}
                        />
                    ))}
                 </div>
              </div>
              
              {items.length > 3 && (
                  <div className="flex justify-center mt-8">
                     <ExpandButton 
                        isExpanded={isExpanded}
                        onClick={() => {
                            if (isExpanded) {
                                handleViewLess();
                            } else {
                                setVisibleCount(items.length);
                            }
                        }}
                        labelMore="VIEW MORE"
                        labelLess="VIEW LESS"
                     />
                  </div>
              )}
          </div>
      ) : (
        <div className="p-6 border-2 border-dashed border-border text-center text-muted-foreground font-mono">
            No content found.
        </div>
      )}

      {/* Floating View Less Button */}
      {showFloatingButton && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
             <button 
                onClick={handleViewLess}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all rounded-full border-2 border-primary/50 backdrop-blur-sm"
             >
                <ArrowUp className="w-4 h-4" />
                VIEW LESS
             </button>
        </div>
      )}
    </section>
  );
}
