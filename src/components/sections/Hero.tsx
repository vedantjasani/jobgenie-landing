
import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Clock, FileText } from 'lucide-react';
import WaitlistForm from '@/components/common/WaitlistForm';
import FadeIn from '@/components/ui/FadeIn';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import AnimatedCard from '@/components/ui/animated-card';

const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-20 pb-20 md:pt-24 md:pb-32 overflow-hidden bg-gradient-to-b from-jobfix-50/80 to-white">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.4] pointer-events-none"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-jobfix-100 rounded-full filter blur-3xl opacity-30 animate-float pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-jobfix-100 rounded-full filter blur-3xl opacity-30 animate-float pointer-events-none" style={{ animationDelay: '-3s' }}></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text content */}
          <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left fade-in">
            <div className="mb-8 flex gap-4 justify-center lg:justify-start">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 border">
                <Award className="h-4 w-4 mr-1" />
                <span>Top Rated</span>
              </div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
                <span>ATS Optimized</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-balance">
              Land Your <span className="text-jobfix-600">Dream Job</span> with AI-Powered Resume Builder
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Create a professional, ATS-optimized resume in minutes. Our AI tailors your resume to each job application, increasing your interview chances by 3x.
            </p>
            
            <div className="mb-8 flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link to="/create-resume">
                <Button size="lg" className="text-md h-12 px-8 bg-jobfix-500 hover:bg-jobfix-600 rounded-full shadow-md">
                  Build My Resume
                </Button>
              </Link>
              <Link to="/resume-generator">
                <Button size="lg" variant="outline" className="text-md h-12 px-8 rounded-full border-2">
                  Improve Existing Resume
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Right Column: Resume Preview */}
          <div className={cn(
            "relative lg:ml-auto max-w-lg mx-auto"
          )}>
            <FadeIn direction="up" delay={0.3}>
              <div className="rounded-2xl overflow-hidden shadow-lg border border-border bg-white p-2 relative">
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src="/lovable-uploads/576fde03-25cb-4841-bbe8-3c06c42b01a5.png" 
                    alt="Resume Template" 
                    className="w-full h-auto"
                  />
                </div>
                
                {/* Badge overlays */}
                <div className="absolute -right-3 top-10 bg-white rounded-full shadow-lg p-1 border border-gray-100">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-r from-green-50 to-green-100 border-4 border-white">
                    <div className="text-center">
                      <span className="text-green-600 font-bold text-xl block leading-none">9.2</span>
                      <span className="text-green-600 text-[10px] block">ATS SCORE</span>
                    </div>
                  </div>
                </div>
                
                <div className="absolute top-0 left-0 m-4 bg-jobfix-50 rounded-full px-3 py-1 text-xs font-semibold text-jobfix-800 border border-jobfix-100">
                  Professional Template
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatedCard delay={0.1}>
            <div className="bg-white rounded-xl p-6 h-full shadow-md border border-gray-100 hover:border-jobfix-200 transition-all">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <Award className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="text-3xl font-bold">9.2/10</h3>
              </div>
              <p className="text-gray-600">Average ATS Score</p>
            </div>
          </AnimatedCard>
          
          <AnimatedCard delay={0.2}>
            <div className="bg-white rounded-xl p-6 h-full shadow-md border border-gray-100 hover:border-jobfix-200 transition-all">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold">5+ Hours</h3>
              </div>
              <p className="text-gray-600">Saved per Application</p>
            </div>
          </AnimatedCard>
          
          <AnimatedCard delay={0.3}>
            <div className="bg-white rounded-xl p-6 h-full shadow-md border border-gray-100 hover:border-jobfix-200 transition-all">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <FileText className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="text-3xl font-bold">10 Million+</h3>
              </div>
              <p className="text-gray-600">Job Ads Analyzed</p>
            </div>
          </AnimatedCard>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
