
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
                <span>#1</span>
              </div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 border">
                <span>Top Rated</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-balance uppercase">
              LAND MORE OFFERS WITH <span className="text-jobfix-600">AI RESUME BUILDER</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Instantly create or refine your resume and stand out for any role with JobFix's AI-powered resume editor.
            </p>
            
            <div className="mb-8">
              <Link to="/create-resume">
                <Button size="lg" className="text-md h-12 px-8 bg-jobfix-500 hover:bg-jobfix-600 rounded-full">
                  Improve my resume for FREE
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Right Column: Resume Preview */}
          <div className={cn(
            "relative lg:ml-auto max-w-lg mx-auto"
          )}>
            <FadeIn direction="up" delay={0.3}>
              <div className="rounded-2xl overflow-hidden shadow-medium border border-border bg-white p-2">
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src="/lovable-uploads/576fde03-25cb-4841-bbe8-3c06c42b01a5.png" 
                    alt="Resume Template" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </FadeIn>
            
            {/* ATS Score indicator */}
            <div className="absolute -right-4 top-5 bg-white rounded-full shadow-lg p-2 border border-gray-100">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-r from-green-50 to-green-100 border-4 border-white">
                <div className="text-center">
                  <span className="text-green-600 font-bold text-xl block leading-none">9.0</span>
                  <span className="text-green-600 text-[10px] block">SCORE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatedCard delay={0.1}>
            <div className="bg-jobfix-50 rounded-xl p-6 h-full">
              <h3 className="text-3xl font-bold mb-2">9.1/10</h3>
              <p className="text-gray-600">Quality Improvement Rating</p>
            </div>
          </AnimatedCard>
          
          <AnimatedCard delay={0.2}>
            <div className="bg-jobfix-50 rounded-xl p-6 h-full">
              <h3 className="text-3xl font-bold mb-2">5 Hrs</h3>
              <p className="text-gray-600">of Editing Hours saved per job</p>
            </div>
          </AnimatedCard>
          
          <AnimatedCard delay={0.3}>
            <div className="bg-jobfix-50 rounded-xl p-6 h-full">
              <h3 className="text-3xl font-bold mb-2">10 Million</h3>
              <p className="text-gray-600">of job ads AI is trained on</p>
            </div>
          </AnimatedCard>
        </div>
      </div>
      
      {/* Level Up Your Resume Section */}
      <div className="container mx-auto px-4 mt-28">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">LEVEL UP YOUR RESUME IN &lt; 1 MIN</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <h3 className="text-2xl font-bold mb-4">Build A New Resume In Fast Mode</h3>
            <p className="text-lg text-gray-600 mb-8">
              No matter where you are in your job search, get a polished resume in less than 5 minutes that is highly ATS compatible.
            </p>
            
            <Link to="/create-resume">
              <Button size="lg" className="text-md h-12 px-6 bg-jobfix-500 hover:bg-jobfix-600 rounded-full">
                Improve my resume for FREE
              </Button>
            </Link>
          </div>
          
          <div className="relative">
            <img 
              src="/lovable-uploads/576fde03-25cb-4841-bbe8-3c06c42b01a5.png" 
              alt="Resume Preview" 
              className="w-full max-w-md mx-auto shadow-lg rounded-lg border"
            />
            
            {/* Quick improvement button */}
            <div className="absolute bottom-4 right-4">
              <Button className="bg-green-500 hover:bg-green-600 text-white rounded-full">
                <FileText className="h-4 w-4 mr-2" />
                Quick Improvement
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Guided AI Refinement Section */}
      <div className="container mx-auto px-4 mt-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <img 
              src="/placeholder.svg" 
              alt="AI Guided Dashboard" 
              className="w-full max-w-md mx-auto shadow-lg rounded-lg border"
            />
          </div>
          
          <div className="max-w-xl order-1 lg:order-2">
            <h3 className="text-2xl font-bold mb-4">Guided AI Refinement For Every Job</h3>
            <p className="text-lg text-gray-600 mb-8">
              Upload your resume and get an instant report card. Our advanced AI analyzes your resume against each job description and validates for optimizing skills for your resume for every job application you submit, in seconds, forever!
            </p>
            
            <Link to="/resume-generator">
              <Button size="lg" className="text-md h-12 px-6 bg-jobfix-500 hover:bg-jobfix-600 rounded-full">
                Improve my resume for FREE
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
