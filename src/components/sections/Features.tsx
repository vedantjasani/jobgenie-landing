
import React from 'react';
import FeatureCard from '@/components/common/FeatureCard';
import FadeIn from '@/components/ui/FadeIn';
import { FileText, Search, LayoutDashboard, MessageSquare, CheckCircle, BriefcaseBusiness, Zap, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'AI-Powered Resume Builder',
    description: 'Our advanced AI creates professional, tailored resumes optimized to pass Applicant Tracking Systems for each job application.',
    icon: Zap
  },
  {
    title: 'ATS-friendly Optimization',
    description: 'Ensures your resume passes Applicant Tracking Systems by optimizing keywords and formatting for specific job descriptions.',
    icon: FileText
  },
  {
    title: 'Expert-Designed Templates',
    description: 'Choose from dozens of beautiful, ATS-optimized templates designed by hiring professionals and career experts.',
    icon: Award
  },
  {
    title: 'Smart Job Matching',
    description: 'Our AI analyzes thousands of job listings to find the perfect matches for your skills, experience, and preferences.',
    icon: Search
  },
  {
    title: 'Application Tracking Dashboard',
    description: 'Visualize your entire job search with analytics on application statuses, response rates, and interview progress.',
    icon: LayoutDashboard
  },
  {
    title: 'AI-Powered Interview Prep',
    description: 'Get personalized interview questions and answers based on the job description and your profile to prepare effectively.',
    icon: MessageSquare
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
              Our AI-powered platform handles every aspect of your job search, from resume creation to interview preparation.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="bg-white rounded-xl p-6 h-full shadow-sm border border-gray-100 hover:shadow-md hover:border-jobfix-200 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-jobfix-50 flex items-center justify-center mb-4 text-jobfix-600">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
