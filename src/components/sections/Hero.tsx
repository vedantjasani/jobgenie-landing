
import React from 'react';
import WaitlistForm from '@/components/common/WaitlistForm';
import FadeIn from '@/components/ui/FadeIn';
import { cn } from '@/lib/utils';

const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-32 overflow-hidden bg-gradient-to-b from-jobfix-100/70 to-white dark:from-jobfix-900 dark:to-jobfix-950">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.4] pointer-events-none"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-jobfix-300 to-jobfix-400 dark:from-jobfix-700 dark:to-jobfix-800 rounded-full filter blur-3xl opacity-30 animate-float pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gradient-to-tr from-jobfix-400 to-jobfix-300 dark:from-jobfix-800 dark:to-jobfix-700 rounded-full filter blur-3xl opacity-30 animate-float pointer-events-none" style={{ animationDelay: '-3s' }}></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text content */}
          <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left fade-in">
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full text-sm font-medium bg-gradient-to-r from-jobfix-100 to-jobfix-200 text-jobfix-700 dark:from-jobfix-800 dark:to-jobfix-700 dark:text-white border border-jobfix-200/50 dark:border-jobfix-700/50 shadow-sm">
              🚀 Limited Early Access
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-balance">
              Land Your Dream Job <span className="gradient-text">Faster</span> with AI-Powered Applications!
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Automate your job search, tailor resumes instantly, and track applications—all in one place.
            </p>
            
            <div className="mb-8">
              <WaitlistForm 
                buttonText="Join the Waitlist" 
                placeholderText="Enter your email for early access" 
              />
            </div>
            
            <p className="text-sm text-muted-foreground">
              Join 2,000+ professionals already on the waitlist
            </p>
          </div>
          
          {/* Right Column: Dashboard mockup */}
          <div className={cn(
            "relative lg:ml-auto max-w-lg mx-auto"
          )}>
            <FadeIn direction="up" delay={0.3}>
              <div className="rounded-2xl overflow-hidden shadow-medium border border-border/50 bg-white dark:bg-jobfix-800 p-2 hover-card">
                <div className="relative rounded-xl overflow-hidden aspect-[16/10]">
                  {/* Mockup top bar */}
                  <div className="absolute top-0 inset-x-0 h-8 bg-gradient-to-r from-jobfix-800 to-jobfix-900 flex items-center px-4 rounded-t-lg">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                  </div>

                  {/* Dashboard mockup content */}
                  <div className="pt-8 px-4 pb-4 bg-white dark:bg-jobfix-900 h-full">
                    <div className="grid grid-cols-12 gap-4 h-full">
                      {/* Sidebar */}
                      <div className="col-span-3 bg-jobfix-50 dark:bg-jobfix-800 rounded-lg p-3">
                        <div className="w-full h-6 bg-jobfix-300 dark:bg-jobfix-700 rounded-md mb-3 opacity-30"></div>
                        <div className="w-3/4 h-4 bg-jobfix-300 dark:bg-jobfix-700 rounded-md mb-2 opacity-30"></div>
                        <div className="w-5/6 h-4 bg-jobfix-300 dark:bg-jobfix-700 rounded-md mb-2 opacity-30"></div>
                        <div className="w-4/5 h-4 bg-jobfix-300 dark:bg-jobfix-700 rounded-md mb-4 opacity-30"></div>
                        <div className="w-full h-20 bg-jobfix-200 dark:bg-jobfix-700 rounded-md opacity-20"></div>
                      </div>

                      {/* Main content */}
                      <div className="col-span-9 flex flex-col">
                        {/* Header */}
                        <div className="h-8 bg-white dark:bg-jobfix-900 border-b border-gray-100 dark:border-jobfix-800 mb-3 flex justify-between items-center">
                          <div className="w-1/3 h-4 bg-jobfix-300 dark:bg-jobfix-600 rounded-md opacity-30"></div>
                          <div className="w-1/6 h-5 bg-jobfix-500 dark:bg-jobfix-500 rounded-md opacity-40"></div>
                        </div>

                        {/* Main dashboard content */}
                        <div className="flex-grow grid grid-cols-2 gap-3">
                          <div className="bg-jobfix-50 dark:bg-jobfix-800 rounded-lg p-3 flex flex-col">
                            <div className="w-1/2 h-4 bg-jobfix-600 dark:bg-jobfix-500 rounded-md mb-2 opacity-60"></div>
                            <div className="w-full h-3 bg-jobfix-300 dark:bg-jobfix-700 rounded-md mb-1 opacity-40"></div>
                            <div className="w-full h-3 bg-jobfix-300 dark:bg-jobfix-700 rounded-md mb-1 opacity-40"></div>
                            <div className="w-3/4 h-3 bg-jobfix-300 dark:bg-jobfix-700 rounded-md opacity-40"></div>
                            <div className="w-1/3 h-5 bg-jobfix-600 dark:bg-jobfix-500 rounded-md mt-auto opacity-60"></div>
                          </div>
                          <div className="bg-gradient-to-br from-jobfix-50/80 to-white dark:from-jobfix-800/50 dark:to-jobfix-900 rounded-lg p-3 flex flex-col">
                            <div className="w-1/2 h-4 bg-jobfix-500 dark:bg-jobfix-400 rounded-md mb-2 opacity-40"></div>
                            <div className="w-full h-3 bg-jobfix-300 dark:bg-jobfix-700 rounded-md mb-1 opacity-30"></div>
                            <div className="w-full h-3 bg-jobfix-300 dark:bg-jobfix-700 rounded-md mb-1 opacity-30"></div>
                            <div className="w-3/4 h-3 bg-jobfix-300 dark:bg-jobfix-700 rounded-md opacity-30"></div>
                            <div className="w-1/3 h-5 bg-jobfix-500 dark:bg-jobfix-400 rounded-md mt-auto opacity-40"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-jobfix-500 to-jobfix-600 rounded-full opacity-20 blur-xl animate-pulse"></div>
            <div className="absolute -top-6 -left-6 w-20 h-20 bg-gradient-to-tr from-jobfix-600 to-jobfix-500 rounded-full opacity-10 blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
