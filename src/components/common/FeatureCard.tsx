
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
      "feature-card bg-white rounded-2xl p-6 shadow-soft border border-border/50 h-full flex flex-col",
      className
    )}>
      <div className="mb-5 p-3 w-14 h-14 rounded-xl bg-jobfix-50 flex items-center justify-center text-jobfix-600">
        <Icon size={24} className="text-jobfix-500" strokeWidth={2} />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
      <p className="text-muted-foreground flex-grow">{description}</p>
    </div>
  );
};

export default FeatureCard;
