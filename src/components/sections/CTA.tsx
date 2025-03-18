
import React, { useState, useEffect } from 'react';
import WaitlistForm from '@/components/common/WaitlistForm';
import FadeIn from '@/components/ui/FadeIn';

interface CountdownProps {
  targetDate: Date;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="flex justify-center gap-4 mb-8">
      {[
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Minutes', value: timeLeft.minutes },
        { label: 'Seconds', value: timeLeft.seconds }
      ].map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-white dark:bg-jobfix-700 border border-jobfix-200 dark:border-jobfix-600 rounded-xl flex items-center justify-center shadow-soft">
            <span className="text-2xl md:text-3xl font-mono font-semibold text-jobfix-800 dark:text-jobfix-300">
              {item.value < 10 ? `0${item.value}` : item.value}
            </span>
          </div>
          <span className="text-xs mt-2 text-muted-foreground">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

const CTA: React.FC = () => {
  // Set the date 30 days from now
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

  return (
    <section id="waitlist" className="py-24 md:py-32 bg-gradient-to-b from-jobfix-100 to-white dark:from-jobfix-800 dark:to-jobfix-950 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.3] pointer-events-none"></div>
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white to-transparent dark:from-jobfix-950 dark:to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full text-sm font-medium bg-jobfix-300 text-jobfix-800 dark:bg-jobfix-700 dark:text-white border border-jobfix-300 dark:border-jobfix-600">
              Limited Early Access
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Be Among the First to Get Access!
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8">
              Early users receive exclusive benefits including premium features and extended free trials.
            </p>
            
            <Countdown targetDate={thirtyDaysFromNow} />
            
            <div className="bg-white dark:bg-jobfix-700 rounded-2xl p-6 md:p-8 shadow-medium border border-jobfix-200/50 dark:border-jobfix-600/30 mb-6">
              <h3 className="text-xl font-semibold mb-2">Join the waitlist & unlock exclusive features</h3>
              <p className="text-muted-foreground dark:text-jobfix-300 mb-6">
                Get early access and help shape the future of AI-powered job applications.
              </p>
              
              <WaitlistForm
                buttonText="Secure Your Spot" 
                placeholderText="Enter your email address" 
                buttonFullWidth={true}
              />
            </div>
            
            <p className="text-sm text-muted-foreground">
              By joining, you agree to receive updates about JobFix.ai.
              <br />We respect your privacy and will never share your information.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default CTA;
