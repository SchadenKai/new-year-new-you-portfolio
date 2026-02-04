import { Video, FileText, Trophy } from 'lucide-react';

interface CompactOverlayCardProps {
  title: string;
  imageSrc?: string;
  subtitle?: string;
  href?: string;
  type?: 'article' | 'video' | 'award';
  onClick?: () => void;
  className?: string;
}

export function CompactOverlayCard({ 
  title, 
  imageSrc, 
  subtitle, 
  href, 
  type,
  onClick,
  className = ''
}: CompactOverlayCardProps) {
  
  const getIcon = () => {
    if (type === 'article') return <FileText className="w-3 h-3 mr-1" />;
    if (type === 'video') return <Video className="w-3 h-3 mr-1" />;
    if (type === 'award') return <Trophy className="w-3 h-3 mr-1" />;
    return null;
  };

  const Content = () => (
    <div className={`relative group w-full aspect-[4/5] overflow-hidden border-2 border-border bg-surface shadow-[4px_4px_0px_0px_var(--foreground)] hover:shadow-[2px_2px_0px_0px_var(--foreground)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer ${className}`}>
      
      {/* Background Image */}
      {imageSrc ? (
        <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-30 group-hover:opacity-40 grayscale group-hover:grayscale-0"
            style={{ backgroundImage: `url(${imageSrc})` }}
        />
      ) : (
        <div className="absolute inset-0 bg-muted opacity-20" />
      )}
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent opacity-90" />

      {/* Content */}
      <div className="absolute inset-0 p-4 flex flex-col justify-end">
         
         <div className="flex justify-between items-end mb-2">
            <span className="flex items-center text-[10px] font-mono uppercase font-bold tracking-widest text-primary-text border border-primary-text/30 px-2 py-1 rounded-sm bg-background/95 backdrop-blur-md shadow-sm">
                {getIcon()}
                {type}
            </span>
         </div>

         <h4 className="text-sm font-bold leading-tight text-foreground line-clamp-3 mb-1 group-hover:text-primary transition-colors">
            {title}
         </h4>
         
         {subtitle && (
            <p className="text-[10px] font-mono text-muted-foreground line-clamp-1">
                {subtitle}
            </p>
         )}
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full" onClick={onClick}>
        <Content />
      </a>
    );
  }

  return (
    <div onClick={onClick} className="h-full">
      <Content />
    </div>
  );
}
