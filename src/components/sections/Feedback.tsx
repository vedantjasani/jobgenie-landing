
import React, { useState } from 'react';
import { 
  RadioGroup, 
  RadioGroupItem 
} from "@/components/ui/radio-group";
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import FadeIn from '@/components/ui/FadeIn';
import { Label } from '@/components/ui/label';

const featureOptions = [
  {
    id: 'resume-tailoring',
    title: 'AI Resume Tailoring',
    description: 'Customize your resume for each job with AI'
  },
  {
    id: 'job-matching',
    title: 'Smart Job Matching',
    description: 'Find the perfect jobs for your skills'
  },
  {
    id: 'application-tracking',
    title: 'Application Tracking',
    description: 'Monitor all your applications in one place'
  },
  {
    id: 'interview-prep',
    title: 'AI Interview Preparation',
    description: 'Practice with job-specific interview questions'
  }
];

const Feedback: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFeature) {
      toast.error("Please select a feature");
      return;
    }
    
    // Simulating API request
    setTimeout(() => {
      setSubmitted(true);
      toast.success("Thanks for your feedback!", {
        description: "Your opinion helps us prioritize our development.",
      });
    }, 600);
  };

  return (
    <section className="py-20 md:py-28 bg-jobfix-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-jobfix-100 rounded-full filter blur-3xl opacity-30 animate-float pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Help Us Build the Perfect Tool</h2>
              <p className="text-muted-foreground text-lg">
                Which feature would you find most valuable? Your feedback shapes our priorities.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-soft border border-border/50">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Thank you for your feedback!</h3>
                  <p className="text-muted-foreground mb-6">Your input helps us prioritize the features that matter most to you.</p>
                  <Button 
                    className="bg-jobfix-500 hover:bg-jobfix-600 text-white"
                    onClick={() => setSubmitted(false)}
                  >
                    Vote for another feature
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">Which feature excites you the most?</h3>
                    <RadioGroup value={selectedFeature} onValueChange={setSelectedFeature}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {featureOptions.map((option) => (
                          <div key={option.id} className="flex items-start space-x-2 rounded-lg border border-border p-4 hover:border-jobfix-200 transition-colors">
                            <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                            <div className="flex-1">
                              <Label htmlFor={option.id} className="text-base font-medium cursor-pointer block mb-1">{option.title}</Label>
                              <span className="text-sm text-muted-foreground">{option.description}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button 
                      type="submit" 
                      className="w-full md:w-auto bg-jobfix-500 hover:bg-jobfix-600 text-white"
                    >
                      Submit Feedback
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default Feedback;
