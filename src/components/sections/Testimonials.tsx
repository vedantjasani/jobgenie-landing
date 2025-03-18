
import React from 'react';
import TestimonialCard from '@/components/common/TestimonialCard';
import FadeIn from '@/components/ui/FadeIn';
import { Image } from '@/components/ui/image';

const testimonials = [
  {
    quote: "JobFix.ai transformed my job search. I received 3 interview requests within a week after struggling for months on my own.",
    author: "Alexandra Chen",
    role: "UX Designer",
  },
  {
    quote: "The AI resume tailoring is incredible! It helped me highlight relevant skills I wouldn't have thought to emphasize for each application.",
    author: "Michael Rodriguez",
    role: "Software Engineer",
  },
  {
    quote: "The application tracking dashboard saves me so much time and stress. I can finally see my entire job search in one place.",
    author: "Sarah Johnson",
    role: "Marketing Manager",
  }
];

const partnerLogos = [
  { 
    name: "LinkedIn", 
    logo: "/lovable-uploads/2fb32913-f879-4c77-9df6-fb4e2f9fca70.png",
    class: "w-32 h-10 opacity-80 hover:opacity-100 transition-opacity duration-300" 
  },
  { 
    name: "Indeed", 
    logo: "/lovable-uploads/57f751fa-92be-45ef-a0d4-b93d3072b26f.png",
    class: "w-28 h-10 opacity-80 hover:opacity-100 transition-opacity duration-300" 
  },
  { 
    name: "Glassdoor", 
    logo: "/lovable-uploads/50caee2b-663e-4fac-b784-cfed6cce568e.png",
    class: "w-32 h-10 opacity-80 hover:opacity-100 transition-opacity duration-300" 
  },
  { 
    name: "ZipRecruiter", 
    logo: "/partner-logos/ziprecruiter.svg",
    class: "w-32 h-10 opacity-70 hover:opacity-100 transition-opacity duration-300" 
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.3] pointer-events-none"></div>
      
      {/* Decorative floating elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-jobfix-100 rounded-full filter blur-3xl opacity-30 animate-float pointer-events-none"></div>
      <div className="absolute top-1/4 left-10 w-64 h-64 rounded-full border-2 border-dashed border-jobfix-200 opacity-20 animate-spin-slow pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-20 w-40 h-40 rounded-full border border-jobfix-300 opacity-15 animate-pulse pointer-events-none"></div>
      
      {/* Resume icon */}
      <div className="absolute top-1/4 right-[15%] w-20 h-24 bg-jobfix-100 rounded-lg opacity-20 pointer-events-none flex flex-col p-2">
        <div className="w-full h-3 bg-jobfix-300 rounded mb-1 opacity-60"></div>
        <div className="w-3/4 h-2 bg-jobfix-300 rounded mb-1 opacity-60"></div>
        <div className="w-full h-2 bg-jobfix-300 rounded mb-1 opacity-60"></div>
        <div className="w-1/2 h-2 bg-jobfix-300 rounded mb-1 opacity-60"></div>
        <div className="w-3/4 h-2 bg-jobfix-300 rounded mb-1 opacity-60"></div>
      </div>
      
      {/* Magnifying glass icon */}
      <div className="absolute bottom-1/4 left-[10%] pointer-events-none opacity-20">
        <div className="w-12 h-12 rounded-full border-4 border-jobfix-400"></div>
        <div className="w-4 h-10 bg-jobfix-400 rounded-full absolute -bottom-6 -right-2 rotate-45"></div>
      </div>
      
      {/* Star rating decorations */}
      <div className="absolute top-40 left-[25%] flex space-x-1 pointer-events-none opacity-20">
        {[1, 2, 3, 4, 5].map((star) => (
          <div key={star} className="text-jobfix-400 text-2xl">★</div>
        ))}
      </div>
      
      {/* Chat bubbles */}
      <div className="absolute bottom-[35%] right-[25%] flex flex-col space-y-2 pointer-events-none opacity-15">
        <div className="w-16 h-8 bg-jobfix-300 rounded-full"></div>
        <div className="w-24 h-8 bg-jobfix-400 rounded-full ml-4"></div>
        <div className="w-20 h-8 bg-jobfix-300 rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-muted-foreground text-lg">
              Hear from professionals who have transformed their job search with JobFix.ai
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <FadeIn key={index} delay={0.1 * index} direction="up">
              <TestimonialCard
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
              />
            </FadeIn>
          ))}
        </div>

        <div className="pt-12 border-t border-jobfix-100">
          <FadeIn>
            <div className="text-center mb-8">
              <h3 className="text-xl font-medium text-muted-foreground">Compatible with top job platforms</h3>
            </div>
          </FadeIn>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {partnerLogos.map((logo, index) => (
              <FadeIn key={index} delay={0.1 * index}>
                <div className={logo.class}>
                  <Image 
                    src={logo.logo} 
                    alt={`${logo.name} logo`} 
                    width={logo.name === 'LinkedIn' ? 140 : logo.name === 'Indeed' ? 130 : 120}
                    height={40}
                    className="h-full w-full object-contain"
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
