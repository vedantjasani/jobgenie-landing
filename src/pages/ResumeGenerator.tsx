
import { useState, useEffect } from 'react';
import { FileText, Upload, ArrowRight, FileIcon, CheckCircle, Sparkles, BriefcaseBusiness } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

type FormData = {
  jobDescription: string;
  resumeFile: FileList;
};

const ResumeGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<FormData>({
    defaultValues: {
      jobDescription: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsGenerating(true);
      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      toast.success('Resume generated successfully!', {
        description: 'Your tailored resume is ready to download.',
      });
      
      console.log('Form submitted:', data);
      console.log('File:', selectedFile);
    } catch (error) {
      toast.error('Failed to generate resume', {
        description: 'Please try again later.',
      });
      console.error('Error generating resume:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      toast.info(`File selected: ${files[0].name}`);
    }
  };

  useEffect(() => {
    document.title = "Resume Generator - JobFix.ai";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-jobfix-50/30 to-white">
      <Navbar />
      
      {/* Hero section with background elements */}
      <div className="relative w-full bg-gradient-to-br from-jobfix-50 via-white to-jobfix-50/20 py-12">
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-jobfix-100/20 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-jobfix-200/20 rounded-full filter blur-2xl"></div>
        </div>
        
        <div className="container mx-auto px-4 py-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-jobfix-100 text-jobfix-700 border border-jobfix-200">
              <Sparkles size={16} className="text-jobfix-600" />
              AI-Powered Resume Optimization
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-jobfix-700 to-jobfix-500 bg-clip-text text-transparent">
              Land Your Dream Job with a Tailored Resume
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Don't send the same resume to every job. Our AI analyzes job descriptions and customizes your resume to highlight the skills employers are looking for.
            </p>
          </div>
        </div>
      </div>
      
      <main className="flex-1 container max-w-5xl mx-auto px-4 py-8 -mt-6 relative">
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
                  </div>
                  
                  <div className="md:col-span-1 space-y-6">
                    <FormItem>
                      <FormLabel className="text-base font-medium">Upload Your Resume (PDF)</FormLabel>
                      <div className="border-2 border-dashed border-jobfix-200 rounded-lg p-8 bg-jobfix-50/30 transition-all duration-200 hover:bg-jobfix-50/50 hover:border-jobfix-300">
                        <div className="flex flex-col items-center justify-center gap-3 text-center h-[240px]">
                          {selectedFile ? (
                            <div className="flex flex-col items-center gap-4 animate-fade-in">
                              <div className="w-16 h-16 rounded-full bg-jobfix-100 flex items-center justify-center">
                                <FileIcon className="h-8 w-8 text-jobfix-600" />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-base font-medium text-foreground">{selectedFile.name}</span>
                                <span className="text-sm text-muted-foreground">
                                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                </span>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="w-16 h-16 rounded-full bg-jobfix-100/60 flex items-center justify-center mb-2">
                                <Upload className="h-8 w-8 text-jobfix-500" />
                              </div>
                              <div>
                                <p className="text-base font-medium text-foreground mb-1">
                                  Drag and drop your resume
                                </p>
                                <p className="text-sm text-muted-foreground mb-4">
                                  or click to browse your files
                                </p>
                              </div>
                            </>
                          )}
                          <Input
                            id="resumeFile"
                            type="file"
                            accept=".pdf"
                            className="absolute inset-0 opacity-0 cursor-pointer h-full w-full"
                            onChange={handleFileChange}
                          />
                          {selectedFile && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedFile(null)}
                              className="mt-2"
                            >
                              Change File
                            </Button>
                          )}
                        </div>
                      </div>
                    </FormItem>
                  </div>
                </div>

                <div className="flex justify-center pt-4">
                  <Button 
                    type="submit" 
                    size="lg"
                    disabled={isGenerating || !selectedFile || !form.getValues().jobDescription}
                    className="bg-jobfix-500 hover:bg-jobfix-600 text-white gap-2 px-8 py-6 h-auto text-lg relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {isGenerating ? (
                        <>
                          <div className="animate-spin h-5 w-5 border-2 border-white border-r-transparent rounded-full"></div>
                          <span>Generating...</span>
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
                </div>
              </form>
            </Form>
          </CardContent>
          
          <CardFooter className="bg-jobfix-50/50 px-6 py-4 text-sm text-center text-muted-foreground">
            Your data is encrypted and never shared with third parties. We only use it to generate your tailored resume.
          </CardFooter>
        </Card>

        {/* How it works section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">How Our Resume Generator Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered system analyzes job descriptions and optimizes your resume in three simple steps
            </p>
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
              <Card key={i} className="feature-card border-jobfix-100 hover:-translate-y-2 transition-all duration-300">
                <CardHeader>
                  <div className="mb-4 w-16 h-16 rounded-full bg-jobfix-50 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits section */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <Card className="border-jobfix-100 bg-gradient-to-br from-white to-jobfix-50/30">
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
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 min-w-5">
                      <CheckCircle className="h-5 w-5 text-jobfix-500" />
                    </div>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card className="border-jobfix-100 bg-gradient-to-br from-white to-jobfix-50/30">
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
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 min-w-5">
                      <CheckCircle className="h-5 w-5 text-jobfix-500" />
                    </div>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* User testimonials */}
        <div className="mb-16 text-center">
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
              <Card key={i} className="border-jobfix-100 hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex flex-col h-full">
                    <p className="text-base italic mb-4 flex-grow">{testimonial.quote}</p>
                    <div className="mt-auto">
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResumeGenerator;
