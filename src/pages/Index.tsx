
import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/Hero';
import HowItWorks from '@/components/sections/HowItWorks';
import Features from '@/components/sections/Features';
import Testimonials from '@/components/sections/Testimonials';
import Feedback from '@/components/sections/Feedback';
import FAQ from '@/components/sections/FAQ';
import CTA from '@/components/sections/CTA';
import Footer from '@/components/layout/Footer';

const Index = () => {
  useEffect(() => {
    document.title = "JobFix.ai - Land Your Dream Job with AI Resume Builder";
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorks />
        <Features />
        <Testimonials />
        <Feedback />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
