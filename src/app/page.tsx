import dynamic from 'next/dynamic';
import { HeroChat } from '@/components/chat/HeroChat';
import { LiquidHero } from '@/components/ui/LiquidHero';
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { BackToTop } from "@/components/ui/BackToTop";
import { profile } from "@/lib/profile";

const DynamicPortfolio = dynamic(
  () => import('@/components/content/DynamicPortfolio').then(m => ({ default: m.DynamicPortfolio })),
  {
    loading: () => (
      <div className="space-y-8 animate-pulse">
        <div className="h-48 bg-surface border-2 border-border rounded-lg" />
        <div className="h-48 bg-surface border-2 border-border rounded-lg" />
      </div>
    )
  }
);

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white relative">
      {/* Skip link for keyboard accessibility */}
      <a href="#portfolio" className="skip-link">
        Skip to main content
      </a>
      <BackToTop />
      <div className="fixed bottom-6 right-6 z-50">
        <ThemeToggle />
      </div>
      
      <LiquidHero>
        <HeroChat />
      </LiquidHero>

      <article id="portfolio" className="min-h-screen w-full px-4 py-8 md:p-12 max-w-7xl mx-auto" aria-label="Portfolio content">
        <header className="mb-12 md:mb-20 border-b-2 border-border pb-8 md:pb-12">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 uppercase tracking-tighter leading-tight text-foreground">
            {profile.basics.name}
          </h1>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
             <h2 className="text-xl sm:text-2xl md:text-3xl text-primary font-black font-mono">
              {profile.basics.label}
            </h2>
            <nav aria-label="Social links" className="flex flex-wrap gap-3 md:gap-4 font-mono text-sm text-muted-foreground font-bold">
               {profile.basics.profiles?.map(p => (
                   <a 
                     key={p.network} 
                     href={p.url} 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="hover:text-primary hover:underline decoration-2 underline-offset-4 transition-all min-h-[44px] flex items-center focus:outline-none focus-visible:text-primary"
                     aria-label={`Visit ${p.network} profile`}
                   >
                     [{p.network}]
                   </a>
               ))}
            </nav>
          </div>
          
          <p className="max-w-4xl text-lg md:text-xl leading-relaxed text-foreground mt-6 md:mt-8 border-l-4 border-border pl-4 md:pl-6 py-2 font-medium">
            {profile.basics.summary}
          </p>
        </header>

        <DynamicPortfolio profile={profile} />
        
        <footer className="border-t-2 border-border pt-6 md:pt-8 text-center text-muted-foreground font-mono text-xs md:text-sm font-bold mt-12 md:mt-20">
          <p>© {new Date().getFullYear()} {profile.basics.name}. Deployed on Google Cloud Run.</p>
        </footer>
      </article>
    </main>
  );
}
