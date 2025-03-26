
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, ArrowLeft, Share2, Eye, Printer, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimatedBackground from '@/components/ui/animated-background';

const ViewResume = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  // In a real app, we would get the resume from the location state
  // For now, we'll simulate loading a resume
  useEffect(() => {
    // Simulate loading resume data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Function to share the resume
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Tailored Resume',
        text: 'Check out my tailored resume created with JobFix.ai',
        url: window.location.href,
      })
      .then(() => toast.success('Shared successfully'))
      .catch((error) => toast.error('Error sharing', { description: error.message }));
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    }
  };

  // Function to print the resume
  const handlePrint = () => {
    window.print();
  };

  // Function to download the resume
  const handleDownload = () => {
    toast.success('Resume downloaded successfully');
  };

  // Return to resume generator
  const handleBack = () => {
    navigate('/resume-generator');
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Animated background */}
      <AnimatedBackground />
      
      <Navbar />
      
      <main className="flex-1 container max-w-5xl mx-auto px-4 py-8 relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <Button
              variant="ghost"
              className="mb-4 -ml-2 text-muted-foreground"
              onClick={handleBack}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Generator
            </Button>
            <h1 className="text-3xl font-bold">Your Tailored Resume</h1>
            <p className="text-muted-foreground">Optimized for maximum impact and ATS compatibility</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="shadow-lg">
              {isLoading ? (
                <CardContent className="p-8 flex flex-col items-center justify-center min-h-[600px]">
                  <div className="animate-spin h-8 w-8 border-2 border-jobfix-500 border-r-transparent rounded-full mb-4"></div>
                  <p className="text-muted-foreground">Loading your resume...</p>
                </CardContent>
              ) : (
                <CardContent className="p-0 overflow-hidden">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="aspect-[1/1.414] bg-white border-b"
                  >
                    {/* Placeholder for resume preview */}
                    <iframe 
                      src="/placeholder.svg" 
                      className="w-full h-full"
                      title="Resume Preview"
                    ></iframe>
                  </motion.div>
                  <div className="p-4 flex justify-center">
                    <Button variant="outline" className="w-full md:w-auto">
                      <Eye className="mr-2 h-4 w-4" /> 
                      View Full Screen
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
          
          <div className="md:col-span-1">
            <Card className="shadow-md mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Resume Highlights</h3>
                <ul className="space-y-3">
                  {[
                    "Optimized for ATS systems",
                    "Keyword-rich for your target job",
                    "Improved formatting & readability",
                    "Skills matched to job requirements"
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                    >
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card className="shadow-md mb-6 border-jobfix-100 overflow-hidden">
              <div className="h-2 bg-jobfix-500"></div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">ATS Score</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-br from-jobfix-500 to-jobfix-600 flex items-center justify-center text-white font-bold text-xl">
                    92%
                  </div>
                  <div>
                    <p className="font-medium">Excellent</p>
                    <p className="text-sm text-muted-foreground">Highly optimized for ATS systems</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Keyword Match</span>
                      <span className="font-medium">95%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-green-500"
                        initial={{ width: 0 }}
                        animate={{ width: '95%' }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      ></motion.div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Format Compatibility</span>
                      <span className="font-medium">100%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-green-500"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                      ></motion.div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Content Relevance</span>
                      <span className="font-medium">88%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-green-500"
                        initial={{ width: 0 }}
                        animate={{ width: '88%' }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                      ></motion.div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-md border-jobfix-100">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Next Steps</h3>
                <ol className="space-y-3 list-decimal ml-5">
                  <li>Download your optimized resume</li>
                  <li>Submit to your target job application</li>
                  <li>Prepare for interviews using our <Link to="/" className="text-jobfix-600 underline">Interview Prep</Link> tool</li>
                  <li>Track your application in <Link to="/" className="text-jobfix-600 underline">Job Tracker</Link></li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ViewResume;
