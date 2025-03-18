
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  className,
}) => {
  return (
    <div className={cn(
      "feature-card bg-white dark:bg-jobfix-800 rounded-2xl p-6 shadow-soft border border-border/50 dark:border-jobfix-700/30 h-full flex flex-col hover-card overflow-hidden relative group",
      className
    )}>
      {/* Decorative background gradient */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-jobfix-100 dark:bg-jobfix-700 rounded-full opacity-30 transition-all duration-300 group-hover:scale-110"></div>
      
      <div className="mb-5 p-3 w-14 h-14 rounded-xl bg-gradient-to-br from-jobfix-100 to-jobfix-200 dark:from-jobfix-700 dark:to-jobfix-600 flex items-center justify-center shadow-sm">
        <Icon size={24} className="text-jobfix-600 dark:text-white" strokeWidth={2} />
      </div>
      
      <h3 className="text-xl font-semibold mb-2 text-foreground dark:text-white">{title}</h3>
      <p className="text-muted-foreground dark:text-jobfix-200 flex-grow">{description}</p>
      
      {/* Hover indicator */}
      <div className="w-0 h-1 bg-gradient-to-r from-jobfix-300 to-jobfix-700 mt-4 transition-all duration-300 group-hover:w-full"></div>
    </div>
  );
};

export default FeatureCard;
