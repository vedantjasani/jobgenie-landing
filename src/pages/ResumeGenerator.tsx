
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { 
  FileText, 
  ArrowRight, 
  CheckCircle, 
  Sparkles, 
  BriefcaseBusiness, 
  AlertCircle,
  Upload,
  FileIcon
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnimatedBackground from '@/components/ui/animated-background';
import AnimatedCard from '@/components/ui/animated-card';
import FileDropZone from '@/components/ui/file-drop-zone';

type FormData = {
  jobDescription: string;
  resumeFile: FileList;
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const bounceAnimation = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.02, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

const ResumeGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<string>("manual");
  const [jobDescriptionFile, setJobDescriptionFile] = useState<File | null>(null);

  const form = useForm<FormData>({
    defaultValues: {
      jobDescription: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!selectedFile) {
      toast.error("Resume file is required", {
        description: "Please upload a PDF resume to continue"
      });
      return;
    }

    if (activeTab === "manual" && !data.jobDescription) {
      toast.error("Job description is required", {
        description: "Please enter a job description to continue"
      });
      return;
    }

    if (activeTab === "upload" && !jobDescriptionFile) {
      toast.error("Job description file is required", {
        description: "Please upload a job description file to continue"
      });
      return;
    }

    try {
      setIsGenerating(true);
      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      toast.success('Resume generated successfully!', {
        description: 'Your tailored resume is ready to download.',
      });
      
      console.log('Form submitted:', data);
      console.log('Resume File:', selectedFile);
      console.log('Job Description File:', jobDescriptionFile);
    } catch (error) {
      toast.error('Failed to generate resume', {
        description: 'Please try again later.',
      });
      console.error('Error generating resume:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    document.title = "Resume Generator - JobFix.ai";
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Animated background */}
      <AnimatedBackground />
      
      <Navbar />
      
      {/* Hero section with enhanced visuals */}
      <div className="relative w-full py-16 overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center justify-center gap-2 px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-jobfix-100 text-jobfix-700 border border-jobfix-200"
            >
              <Sparkles size={16} className="text-jobfix-600" />
              AI-Powered Resume Optimization
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-jobfix-700 to-jobfix-500 bg-clip-text text-transparent"
            >
              Land Your Dream Job with a Tailored Resume
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Our AI analyzes job descriptions and customizes your resume to highlight the skills employers are looking for.
            </motion.p>
          </motion.div>
        </div>
      </div>
      
      <main className="flex-1 container max-w-5xl mx-auto px-4 py-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="mb-12 border-jobfix-400/20 shadow-xl rounded-xl overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-1/3 bg-gradient-to-br from-jobfix-50/50 to-transparent pointer-events-none"></div>
            
            <CardHeader className="pb-4 relative z-10">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <FileText className="h-6 w-6 text-jobfix-500" />
                Generate Your Tailored Resume
              </CardTitle>
              <CardDescription className="text-base">
                Upload your existing resume and enter the job description to create a perfectly tailored resume that gets past ATS systems
              </CardDescription>
            </CardHeader>
            
            <CardContent className="relative z-10">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="md:col-span-1 space-y-6">
                      <Tabs defaultValue="manual" className="w-full" onValueChange={setActiveTab}>
                        <TabsList className="w-full mb-2 bg-jobfix-50">
                          <TabsTrigger value="manual" className="flex-1 data-[state=active]:bg-white">
                            Paste Job Description
                          </TabsTrigger>
                          <TabsTrigger value="upload" className="flex-1 data-[state=active]:bg-white">
                            Upload Job Description
                          </TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="manual" className="mt-0">
                          <FormField
                            control={form.control}
                            name="jobDescription"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-base font-medium">Job Description</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Paste the job description here..."
                                    className="min-h-[280px] resize-none border-jobfix-200 focus-visible:ring-jobfix-500"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                                <p className="text-xs text-muted-foreground mt-1.5">
                                  The more detailed the job description, the better our AI can tailor your resume
                                </p>
                              </FormItem>
                            )}
                          />
                        </TabsContent>
                        
                        <TabsContent value="upload" className="mt-0">
                          <FormItem>
                            <FormLabel className="text-base font-medium">Upload Job Description File</FormLabel>
                            <FileDropZone
                              onFileSelect={(file) => setJobDescriptionFile(file)}
                              selectedFile={jobDescriptionFile}
                              fileType="text"
                              maxSize={5 * 1024 * 1024}
                              label="job description file"
                              accept=".txt,.pdf"
                              onClearFile={() => setJobDescriptionFile(null)}
                              icon={<Upload className="h-8 w-8 text-jobfix-500" />}
                            />
                          </FormItem>
                        </TabsContent>
                      </Tabs>
                    </div>
                    
                    <div className="md:col-span-1 space-y-6">
                      <FormItem>
                        <FormLabel className="text-base font-medium">Upload Your Resume (PDF)</FormLabel>
                        <FileDropZone
                          onFileSelect={(file) => setSelectedFile(file)}
                          selectedFile={selectedFile}
                          fileType="pdf"
                          maxSize={5 * 1024 * 1024}
                          label="resume"
                          accept=".pdf"
                          onClearFile={() => setSelectedFile(null)}
                          icon={<FileIcon className="h-8 w-8 text-jobfix-500" />}
                        />
                      </FormItem>

                      {selectedFile && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                        >
                          <Alert className="bg-jobfix-50 border-jobfix-200">
                            <CheckCircle className="h-4 w-4 text-jobfix-500" />
                            <AlertTitle>Resume Ready</AlertTitle>
                            <AlertDescription>
                              Your resume has been uploaded and is ready for optimization.
                            </AlertDescription>
                          </Alert>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-center pt-4">
                    <motion.div
                      variants={bounceAnimation}
                      initial="initial"
                      animate="animate"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button 
                        type="submit" 
                        size="lg"
                        disabled={isGenerating || (activeTab === "manual" && !form.getValues().jobDescription) || (activeTab === "upload" && !jobDescriptionFile) || !selectedFile}
                        className="bg-jobfix-500 hover:bg-jobfix-600 text-white gap-2 px-8 py-6 h-auto text-lg relative overflow-hidden group"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          {isGenerating ? (
                            <>
                              <div className="animate-spin h-5 w-5 border-2 border-white border-r-transparent rounded-full"></div>
                              <span>Optimizing Your Resume...</span>
                            </>
                          ) : (
                            <>
                              <span>Generate Tailored Resume</span>
                              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </>
                          )}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-jobfix-600 to-jobfix-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                      </Button>
                    </motion.div>
                  </div>
                </form>
              </Form>
            </CardContent>
            
            <CardFooter className="bg-jobfix-50/50 px-6 py-4 text-sm text-center text-muted-foreground">
              Your data is encrypted and never shared with third parties. We only use it to generate your tailored resume.
            </CardFooter>
          </Card>
        </motion.div>

        {/* How it works section */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-10">
            <motion.h2 
              className="text-2xl md:text-3xl font-bold mb-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              How Our Resume Generator Works
            </motion.h2>
            <motion.p 
              className="text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Our AI-powered system analyzes job descriptions and optimizes your resume in three simple steps
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <FileText className="h-10 w-10 text-jobfix-500" />,
                title: "1. Upload Your Resume",
                description: "Start with your existing resume in PDF format"
              },
              {
                icon: <BriefcaseBusiness className="h-10 w-10 text-jobfix-500" />,
                title: "2. Enter Job Description",
                description: "Paste the job description you're applying for"
              },
              {
                icon: <CheckCircle className="h-10 w-10 text-jobfix-500" />,
                title: "3. Get Your Tailored Resume",
                description: "Receive a perfectly optimized resume for that specific job"
              }
            ].map((step, i) => (
              <AnimatedCard
                key={i}
                icon={step.icon}
                title={step.title}
                description={step.description}
                delay={0.2 + i * 0.1}
              />
            ))}
          </div>
        </motion.div>

        {/* Benefits section */}
        <motion.div 
          className="grid md:grid-cols-2 gap-6 mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="border-jobfix-100 bg-gradient-to-br from-white to-jobfix-50/30 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Why optimize your resume?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  "70% of resumes are rejected by ATS systems before a human sees them",
                  "Tailored resumes are 3x more likely to get an interview",
                  "Hiring managers spend just 6 seconds reviewing each resume",
                  "Job-specific keywords increase your chances by 60%"
                ].map((point, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="mt-1 min-w-5">
                      <CheckCircle className="h-5 w-5 text-jobfix-500" />
                    </div>
                    <span>{point}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card className="border-jobfix-100 bg-gradient-to-br from-white to-jobfix-50/30 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Our AI advantage</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  "Advanced keyword optimization for ATS systems",
                  "Matches your skills to job requirements automatically",
                  "Preserves your experience while highlighting relevance",
                  "Maintains professional formatting and structure"
                ].map((point, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="mt-1 min-w-5">
                      <CheckCircle className="h-5 w-5 text-jobfix-500" />
                    </div>
                    <span>{point}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* User testimonials */}
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-jobfix-100 text-jobfix-700 border border-jobfix-200">
            <Sparkles size={16} className="text-jobfix-600" />
            Success Stories
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-10">Our Users Get Results</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "I applied to 15 jobs with my regular resume with no response. After using JobFix.ai, I got 4 interview calls in one week!",
                name: "Michael T.",
                role: "Software Engineer"
              },
              {
                quote: "The tailored resume highlighted skills I didn't even realize were relevant to the job description. Landed my dream role after just 3 applications.",
                name: "Sarah K.",
                role: "Marketing Manager"
              },
              {
                quote: "As a career changer, I was struggling to position my experience. This tool helped me emphasize transferable skills that got me noticed.",
                name: "David L.",
                role: "Data Analyst"
              }
            ].map((testimonial, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-jobfix-100 hover:shadow-lg transition-all duration-300 h-full bg-white">
                  <CardContent className="pt-6">
                    <div className="flex flex-col h-full">
                      <motion.div 
                        className="mx-auto mb-4 text-jobfix-200 opacity-30"
                        initial={{ scale: 0.8 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.5 6C9.5 6.5 9.5 7 9.5 8C8.2 8.2 7.2 8.9 6.5 10C5.8 11.1 5.5 12.3 5.5 13.5C5.5 14.7 5.8 15.8 6.5 16.5C7.2 17.2 8.1 17.5 9.5 17.5C10.9 17.5 11.8 17.2 12.5 16.5C13.2 15.8 13.5 14.7 13.5 13.5C13.5 12.7 13.3 11.8 12.8 11C12.3 10.2 11.7 9.5 10.9 9L12.4 6H9.5ZM19.5 6C19.5 6.5 19.5 7 19.5 8C18.2 8.2 17.2 8.9 16.5 10C15.8 11.1 15.5 12.3 15.5 13.5C15.5 14.7 15.8 15.8 16.5 16.5C17.2 17.2 18.1 17.5 19.5 17.5C20.9 17.5 21.8 17.2 22.5 16.5C23.2 15.8 23.5 14.7 23.5 13.5C23.5 12.7 23.3 11.8 22.8 11C22.3 10.2 21.7 9.5 20.9 9L22.4 6H19.5Z" fill="currentColor" />
                        </svg>
                      </motion.div>
                      <p className="text-base italic mb-4 flex-grow">{testimonial.quote}</p>
                      <div className="mt-auto pt-4 border-t border-gray-100">
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="border-jobfix-200/50 bg-gradient-to-r from-jobfix-50 to-jobfix-100/50 overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <motion.h2 
                    className="text-2xl md:text-3xl font-bold mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    Ready to land your dream job?
                  </motion.h2>
                  <motion.p 
                    className="text-muted-foreground mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    Get your resume optimized in minutes and start getting more interviews today.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <Button 
                      size="lg" 
                      className="bg-jobfix-500 hover:bg-jobfix-600 text-white"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                      Get Started Now
                    </Button>
                  </motion.div>
                </div>
                <div className="relative">
                  <motion.div 
                    className="absolute -top-20 -right-20 w-40 h-40 bg-jobfix-200/20 rounded-full filter blur-3xl"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ 
                      duration: 8,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                  <div className="relative z-10">
                    <motion.div 
                      className="p-4 bg-white shadow-lg rounded-lg mb-4 ml-auto max-w-xs"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <p className="text-sm mb-2 font-medium">Success Rate</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-jobfix-600">87%</span>
                        <span className="text-green-500 flex items-center gap-1 text-sm">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          +12%
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Interview success rate with optimized resumes
                      </p>
                    </motion.div>
                    
                    <motion.div 
                      className="p-4 bg-white shadow-lg rounded-lg max-w-xs"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <p className="text-sm mb-2 font-medium">Time Saved</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-jobfix-600">5.3h</span>
                        <span className="text-green-500 flex items-center gap-1 text-sm">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Efficient
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Average time saved per job application
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default ResumeGenerator;
