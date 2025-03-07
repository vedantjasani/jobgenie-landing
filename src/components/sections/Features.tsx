
import React from 'react';
import FeatureCard from '@/components/common/FeatureCard';
import FadeIn from '@/components/ui/FadeIn';
import { FileText, Search, LayoutDashboard, MessageSquare, CheckCircle, BriefcaseBusiness } from 'lucide-react';

const features = [
  {
    title: 'ATS-friendly Resume Optimization',
    description: 'Our AI ensures your resume passes Applicant Tracking Systems by optimizing keywords and formatting for each job application.',
    icon: FileText
  },
  {
    title: 'Automated Job Applications',
    description: 'Apply to multiple positions with a single click, saving hours of repetitive form-filling and increasing your application volume.',
    icon: CheckCircle
  },
  {
    title: 'Smart Job Matching',
    description: 'Our AI analyzes thousands of job listings to find the perfect matches for your skills, experience, and preferences.',
    icon: Search
  },
  {
    title: 'Application Tracking Dashboard',
    description: 'Visualize your entire job search in one place with analytics on application statuses, response rates, and interview progress.',
    icon: LayoutDashboard
  },
  {
    title: 'AI-Powered Interview Prep',
    description: 'Get personalized interview questions and answers based on the job description and your profile to help you prepare effectively.',
    icon: MessageSquare
  },
  {
    title: 'Career Development Insights',
    description: 'Receive personalized recommendations on skills to develop based on job market trends and your career goals.',
    icon: BriefcaseBusiness
  }
];

const Features: React.FC = () => {
  return (
    <section 
      id="features" 
      className="py-20 md:py-28 bg-gray-50 relative"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-white to-transparent opacity-70 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-jobfix-50 text-jobfix-700 border border-jobfix-100">
              Key Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need for Your Job Search</h2>
            <p className="text-muted-foreground text-lg">
              Our AI-powered platform handles every aspect of your job search, from resume optimization to interview preparation.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FadeIn key={index} delay={0.05 * index} direction="up">
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
