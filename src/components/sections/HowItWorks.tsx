
import React from 'react';
import FadeIn from '@/components/ui/FadeIn';
import { ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'AI Tailors Your Resume & Cover Letter',
    description: 'Our AI analyzes job descriptions and adapts your resume and cover letter for each application, highlighting relevant experience and skills to maximize your chances.',
  },
  {
    number: '02',
    title: 'Smart Job Matching Finds Opportunities',
    description: 'Using advanced AI matching, we identify the jobs that best fit your profile, saving you hours of manual searching and increasing your success rate.',
  },
  {
    number: '03',
    title: 'Apply & Track Applications',
    description: 'Apply to multiple positions with one click and monitor the status of all your applications in a comprehensive dashboard.',
  },
  {
    number: '04',
    title: 'Prepare for Interviews',
    description: 'Get AI-powered interview preparation with likely questions and company-specific insights for each application, increasing your confidence.',
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section 
      id="how-it-works" 
      className="py-20 md:py-28 bg-white relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.3] pointer-events-none"></div>
      
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How JobFix.ai Works</h2>
            <p className="text-muted-foreground text-lg">
              Our intelligent platform streamlines your job search from start to finish
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <FadeIn 
              key={index} 
              delay={0.1 * index}
              direction={index % 2 === 0 ? 'right' : 'left'}
            >
              <div className="relative">
                {/* Connector lines between steps */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full z-0">
                    {index % 2 === 0 ? (
                      <ArrowRight size={20} className="text-jobfix-200 -mr-3" />
                    ) : (
                      <div className="h-[100px] border-l border-dashed border-jobfix-200 -ml-4 mt-8"></div>
                    )}
                  </div>
                )}
                
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-soft border border-border/50 h-full">
                  <div className="flex items-center mb-4">
                    <span className="text-3xl font-bold text-jobfix-100 mr-4">{step.number}</span>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
