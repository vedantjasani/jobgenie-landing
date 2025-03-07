
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FadeIn from '@/components/ui/FadeIn';

const faqs = [
  {
    question: "How does AI customize my resume?",
    answer: "Our AI analyzes each job description to identify key requirements and skills, then intelligently rearranges and highlights relevant sections of your resume. It optimizes keywords for ATS systems while maintaining your original information and formatting preferences."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We employ bank-level encryption to protect your personal information and documents. Your data is never sold to third parties, and you can request deletion of your information at any time. Our systems are regularly audited for security compliance."
  },
  {
    question: "How accurate is the job matching feature?",
    answer: "Our AI job matching has over 90% accuracy in recommending relevant positions. It analyzes not just keywords but contextual factors like industry alignment, company culture, and career progression to find opportunities that truly match your profile and preferences."
  },
  {
    question: "Can I use JobFix.ai for any industry or job level?",
    answer: "Yes. JobFix.ai is designed to work across all industries and experience levels, from entry-level to executive positions. Our AI adapts to different fields including technology, healthcare, finance, education, creative industries, and more."
  },
  {
    question: "What happens after I join the waitlist?",
    answer: "Once you join the waitlist, you'll receive a confirmation email. As we approach launch, we'll invite users in order of registration. Early waitlist members will receive exclusive benefits including extended free trial periods and premium features at no extra cost."
  },
  {
    question: "How much will JobFix.ai cost?",
    answer: "We'll offer both free and premium tiers. The free tier includes basic resume optimization and job tracking, while premium plans will offer advanced features like unlimited tailored applications, priority job matching, and AI interview coaching. Pricing details will be announced closer to launch."
  }
];

const FAQ: React.FC = () => {
  return (
    <section id="faq" className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.3] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-lg">
              Everything you need to know about JobFix.ai and how it can transform your job search
            </p>
          </div>
        </FadeIn>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <FadeIn key={index} delay={0.1 * index}>
                <AccordionItem value={`item-${index}`} className="border-b border-gray-200">
                  <AccordionTrigger className="text-left font-medium text-lg py-4 hover:text-jobfix-600 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pt-1 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </FadeIn>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
