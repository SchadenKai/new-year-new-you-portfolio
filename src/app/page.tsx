import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { BackToTop } from "@/components/ui/BackToTop";
import { profile } from "@/lib/profile";
import { HeroChat } from "@/components/chat/HeroChat";
import { DynamicPortfolio } from "@/components/content/DynamicPortfolio";
import { LiquidHero } from "@/components/ui/LiquidHero";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white relative">
      <BackToTop />
      <div className="fixed bottom-6 right-6 z-50">
        <ThemeToggle />
      </div>
      
      <LiquidHero>
        <HeroChat />
      </LiquidHero>

      <div id="portfolio" className="min-h-screen w-full p-4 md:p-12 max-w-7xl mx-auto">
        <header className="mb-20 border-b-2 border-border pb-12">
          {/* ... Header content ... */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 uppercase tracking-tighter leading-tight text-foreground">
            {profile.basics.name}
          </h1>
          <div className="flex flex-col md:flex-row md:items-center justify-between">
             <h2 className="text-2xl md:text-3xl text-primary font-black font-mono mb-4 md:mb-0">
              {profile.basics.label}
            </h2>
            <div className="flex gap-4 font-mono text-sm text-muted-foreground font-bold">
               {profile.basics.profiles?.map(p => (
                   <a key={p.network} href={p.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline decoration-2 underline-offset-4 transition-all">[{p.network}]</a>
               ))}
            </div>
          </div>
          
          <p className="max-w-4xl text-xl leading-relaxed text-foreground mt-8 border-l-4 border-border pl-6 py-2 font-medium">
            {profile.basics.summary}
          </p>
        </header>

        <DynamicPortfolio profile={profile} />
        
        <footer className="border-t-2 border-border pt-8 text-center text-muted-foreground font-mono text-sm font-bold">
          <p>© {new Date().getFullYear()} {profile.basics.name}. Deployed on Google Cloud Run.</p>
        </footer>
      </div>
    </main>
  );
}
