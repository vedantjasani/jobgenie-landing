
import React, { useEffect, useRef } from 'react';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  threshold?: number;
  className?: string;
}

const FadeIn: React.FC<FadeInProps> = ({ 
  children, 
  delay = 0, 
  direction = 'up', 
  threshold = 0.1,
  className = '' 
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            
            // Apply animation class based on direction
            let animationClass = 'animate-fadeIn';
            switch (direction) {
              case 'up':
                animationClass = 'animate-slideUp';
                break;
              case 'down':
                animationClass = 'animate-slideDown';
                break;
              case 'left':
                animationClass = 'animate-slideRight';
                break;
              case 'right':
                animationClass = 'animate-slideLeft';
                break;
            }
            
            // Add animation with delay
            target.style.animationDelay = `${delay}s`;
            target.classList.add(animationClass);
            
            // Unobserve after animation is applied
            observer.unobserve(target);
          }
        });
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay, direction, threshold]);

  return (
    <div 
      ref={ref} 
      className={`opacity-0 ${className}`}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </div>
  );
};

export default FadeIn;
