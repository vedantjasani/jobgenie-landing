
import React from 'react';
import TestimonialCard from '@/components/common/TestimonialCard';
import FadeIn from '@/components/ui/FadeIn';

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
  { name: "LinkedIn", class: "w-28 h-10 opacity-70 hover:opacity-100 transition-opacity duration-300" },
  { name: "Indeed", class: "w-24 h-10 opacity-70 hover:opacity-100 transition-opacity duration-300" },
  { name: "Glassdoor", class: "w-32 h-10 opacity-70 hover:opacity-100 transition-opacity duration-300" },
  { name: "ZipRecruiter", class: "w-32 h-10 opacity-70 hover:opacity-100 transition-opacity duration-300" },
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.3] pointer-events-none"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-jobfix-50 rounded-full filter blur-3xl opacity-30 animate-float pointer-events-none"></div>
      
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

        <div className="pt-12 border-t border-gray-100">
          <FadeIn>
            <div className="text-center mb-8">
              <h3 className="text-xl font-medium text-muted-foreground">Compatible with top job platforms</h3>
            </div>
          </FadeIn>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {partnerLogos.map((logo, index) => (
              <FadeIn key={index} delay={0.1 * index}>
                <div className={logo.class}>
                  <div className="h-full w-full bg-muted rounded-md"></div>
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
