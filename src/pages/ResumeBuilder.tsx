
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Layout, 
  UserCircle, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Code, 
  Languages, 
  Sparkles,
  Linkedin,
  ArrowRight,
  ExternalLink,
  Download,
  Trash2
} from 'lucide-react';
import { toast } from 'sonner';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { ResumeTemplate } from '@/components/resume-builder/ResumeTemplate';
import { ResumeSection } from '@/components/resume-builder/ResumeSection';
import { ResumeEditor } from '@/components/resume-builder/ResumeEditor';
import { ResumePreview } from '@/components/resume-builder/ResumePreview';
import { ContentSuggestion } from '@/components/resume-builder/ContentSuggestion';
import { DraggableResumeSection } from '@/components/resume-builder/DraggableResumeSection';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  }
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// Resume section types
type SectionType = 
  | 'personal' 
  | 'experience' 
  | 'education' 
  | 'skills' 
  | 'projects' 
  | 'certifications' 
  | 'languages'
  | 'summary';

// Resume template types  
type TemplateType = 'modern' | 'classic' | 'minimal' | 'creative' | 'professional';

// Initial resume data structure
const initialResumeData = {
  personal: {
    name: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
  },
  summary: '',
  experience: [
    {
      id: '1',
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: []
    }
  ],
  education: [
    {
      id: '1',
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      description: '',
      gpa: ''
    }
  ],
  skills: [
    {
      id: '1',
      category: '',
      skills: []
    }
  ],
  projects: [
    {
      id: '1',
      name: '',
      description: '',
      technologies: [],
      url: '',
      startDate: '',
      endDate: '',
    }
  ],
  certifications: [
    {
      id: '1',
      name: '',
      issuer: '',
      date: '',
      url: ''
    }
  ],
  languages: [
    {
      id: '1',
      language: '',
      proficiency: ''
    }
  ]
};

// Templates data
const resumeTemplates: { id: TemplateType; name: string; description: string }[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and contemporary design with a sidebar for skills and contact info'
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional resume format that recruiters are familiar with'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Streamlined and concise with focus on content over design'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Standout design for creative industries with visual elements'
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Structured format ideal for corporate and traditional industries'
  }
];

// Section configuration
const sectionConfig: Record<SectionType, { title: string; icon: React.ReactNode }> = {
  personal: { title: 'Personal Information', icon: <UserCircle className="h-5 w-5" /> },
  summary: { title: 'Professional Summary', icon: <FileText className="h-5 w-5" /> },
  experience: { title: 'Work Experience', icon: <Briefcase className="h-5 w-5" /> },
  education: { title: 'Education', icon: <GraduationCap className="h-5 w-5" /> },
  skills: { title: 'Skills', icon: <Code className="h-5 w-5" /> },
  projects: { title: 'Projects', icon: <FileText className="h-5 w-5" /> },
  certifications: { title: 'Certifications', icon: <Award className="h-5 w-5" /> },
  languages: { title: 'Languages', icon: <Languages className="h-5 w-5" /> }
};

const ResumeBuilder = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [resumeData, setResumeData] = useState(initialResumeData);
  const [template, setTemplate] = useState<TemplateType>('modern');
  const [activeSectionForEdit, setActiveSectionForEdit] = useState<SectionType | null>(null);
  const [enabledSections, setEnabledSections] = useState<SectionType[]>([
    'personal', 'summary', 'experience', 'education', 'skills'
  ]);
  const [sectionOrder, setSectionOrder] = useState<SectionType[]>([
    'personal', 'summary', 'experience', 'education', 'skills', 'projects', 
    'certifications', 'languages'
  ]);
  const [aiSuggestions, setAiSuggestions] = useState<Record<string, string[]>>({});
  const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState(false);

  // Steps for the resume building process
  const steps = [
    { id: 1, title: 'Choose Template' },
    { id: 2, title: 'Personal Info' },
    { id: 3, title: 'Experience' },
    { id: 4, title: 'Skills & Education' },
    { id: 5, title: 'Customize' },
    { id: 6, title: 'Finalize & Export' }
  ];

  // Function to update resume data
  const updateResumeData = (section: SectionType, data: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  // Add a new section to the enabled sections
  const addSection = (section: SectionType) => {
    if (!enabledSections.includes(section)) {
      setEnabledSections(prev => [...prev, section]);
      toast.success(`Added ${sectionConfig[section].title} section`);
    }
  };

  // Remove a section from the enabled sections
  const removeSection = (section: SectionType) => {
    if (section === 'personal' || section === 'summary') {
      toast.error('This section cannot be removed');
      return;
    }
    
    setEnabledSections(prev => prev.filter(s => s !== section));
    toast.success(`Removed ${sectionConfig[section].title} section`);
  };

  // Reorder sections
  const reorderSections = (startIndex: number, endIndex: number) => {
    const result = Array.from(enabledSections);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setEnabledSections(result);
  };

  // Generate AI content suggestions
  const generateContentSuggestions = async (section: SectionType, context: string) => {
    setIsGeneratingSuggestions(true);
    
    try {
      // Simulate API call to get AI suggestions
      // In a real app, this would call an AI service
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockSuggestions: Record<string, string[]> = {
        summary: [
          'Experienced software engineer with 5+ years building scalable web applications using React, Node.js, and AWS.',
          'Detail-oriented developer focused on creating intuitive user experiences with clean, maintainable code.',
          'Full-stack engineer passionate about solving complex problems through innovative technology solutions.'
        ],
        experience: [
          'Led a team of 5 developers to deliver a major product feature that increased user engagement by 35%',
          'Implemented responsive design principles, improving mobile user retention by 28%',
          'Optimized database queries, reducing page load times by 40% and improving overall system performance'
        ],
        skills: [
          'JavaScript, TypeScript, React, Node.js, Express',
          'AWS, Docker, Kubernetes, CI/CD, Git',
          'UX/UI Design, Responsive Web Development, Performance Optimization'
        ]
      };
      
      setAiSuggestions(mockSuggestions);
      toast.success('Content suggestions generated');
    } catch (error) {
      toast.error('Failed to generate suggestions');
      console.error('Error generating suggestions:', error);
    } finally {
      setIsGeneratingSuggestions(false);
    }
  };

  // Import from LinkedIn
  const importFromLinkedIn = () => {
    toast('LinkedIn import feature coming soon', {
      description: 'This feature is still under development',
    });
  };

  // Export resume
  const exportResume = (format: 'pdf' | 'docx' | 'txt') => {
    toast.success(`Resume exported as ${format.toUpperCase()}`, {
      description: 'Your resume has been downloaded',
    });
  };

  // Navigation between steps
  const goToNextStep = () => {
    if (activeStep < steps.length) {
      setActiveStep(activeStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPrevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Set page title
  useEffect(() => {
    document.title = "Resume Builder - JobFix.ai";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gradient-to-b from-white to-jobfix-50/20">
        {/* Hero section */}
        <section className="w-full py-12 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-jobfix-50/30 to-transparent pointer-events-none" />
          
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.div variants={itemVariants} className="inline-flex items-center mb-4 px-3 py-1 rounded-full bg-jobfix-100 text-jobfix-700 text-sm font-medium">
                <Sparkles size={16} className="mr-2" />
                AI-Powered Resume Builder
              </motion.div>
              
              <motion.h1 
                variants={itemVariants}
                className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-jobfix-700 to-jobfix-500 bg-clip-text text-transparent"
              >
                Build Your Perfect Resume From Scratch
              </motion.h1>
              
              <motion.p 
                variants={itemVariants}
                className="text-lg md:text-xl text-muted-foreground mb-8"
              >
                Create a professional, standout resume with our step-by-step builder. Get intelligent content suggestions and customize every detail.
              </motion.p>
              
              <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mt-8">
                <Button
                  className="gap-2 bg-jobfix-500 hover:bg-jobfix-600 text-white"
                  size="lg"
                  onClick={importFromLinkedIn}
                >
                  <Linkedin size={18} />
                  Import from LinkedIn
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 border-jobfix-200"
                >
                  <FileText size={18} />
                  Start from Template
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        {/* Steps progress */}
        <div className="container mx-auto px-4 mb-8">
          <div className="w-full max-w-5xl mx-auto">
            <div className="hidden md:flex items-center justify-between mb-8">
              {steps.map((step) => (
                <div 
                  key={step.id} 
                  className={`flex flex-col items-center space-y-2 ${
                    step.id === activeStep 
                      ? 'text-jobfix-600' 
                      : step.id < activeStep 
                        ? 'text-jobfix-400' 
                        : 'text-muted-foreground'
                  }`}
                >
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                      step.id === activeStep 
                        ? 'bg-jobfix-100 border-2 border-jobfix-400 text-jobfix-700' 
                        : step.id < activeStep 
                          ? 'bg-jobfix-200 text-jobfix-800' 
                          : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {step.id}
                  </div>
                  <span className="text-sm font-medium">{step.title}</span>
                </div>
              ))}
            </div>
            
            <div className="md:hidden mb-6">
              <p className="text-sm text-muted-foreground mb-2">Step {activeStep} of {steps.length}</p>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-jobfix-500 transition-all duration-300 ease-out"
                  style={{ width: `${(activeStep / steps.length) * 100}%` }}
                />
              </div>
              <p className="text-jobfix-700 font-medium mt-2">{steps.find(s => s.id === activeStep)?.title}</p>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="container mx-auto px-4 pb-16">
          <div className="w-full max-w-5xl mx-auto">
            {/* Step 1: Choose template */}
            {activeStep === 1 && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="space-y-8"
              >
                <motion.h2 
                  variants={itemVariants}
                  className="text-2xl font-bold"
                >
                  Choose Your Resume Template
                </motion.h2>
                
                <motion.div 
                  variants={itemVariants}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  {resumeTemplates.map((tmpl) => (
                    <motion.div 
                      key={tmpl.id}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      className="relative"
                    >
                      <Card 
                        className={`h-full cursor-pointer transition-all hover:shadow-md overflow-hidden ${
                          template === tmpl.id ? 'ring-2 ring-jobfix-500 ring-offset-2' : ''
                        }`} 
                        onClick={() => setTemplate(tmpl.id)}
                      >
                        <div className="aspect-w-3 aspect-h-4 bg-jobfix-50/50">
                          <div className="w-full h-full flex items-center justify-center p-4">
                            <div className="w-full h-full bg-white rounded shadow-sm overflow-hidden">
                              <ResumeTemplate templateId={tmpl.id} />
                            </div>
                          </div>
                        </div>
                        <CardContent className="pt-4">
                          <h3 className="text-lg font-medium">{tmpl.name}</h3>
                          <p className="text-sm text-muted-foreground">{tmpl.description}</p>
                        </CardContent>
                      </Card>
                      
                      {template === tmpl.id && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-jobfix-500 rounded-full flex items-center justify-center text-white">
                          ✓
                        </div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex justify-end mt-8">
                  <Button 
                    className="gap-2 bg-jobfix-500 hover:bg-jobfix-600 text-white"
                    size="lg"
                    onClick={goToNextStep}
                  >
                    Continue
                    <ArrowRight size={18} />
                  </Button>
                </motion.div>
              </motion.div>
            )}
            
            {/* Step 2: Personal Information */}
            {activeStep === 2 && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="space-y-8"
              >
                <motion.div variants={itemVariants} className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Personal Information</h2>
                  <Button 
                    variant="outline" 
                    className="gap-2 text-jobfix-600"
                    onClick={() => generateContentSuggestions('personal', '')}
                    disabled={isGeneratingSuggestions}
                  >
                    <Sparkles size={16} />
                    Get Suggestions
                    {isGeneratingSuggestions && <div className="ml-2 animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />}
                  </Button>
                </motion.div>
                
                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <Input 
                        id="name"
                        placeholder="e.g. John Smith"
                        value={resumeData.personal.name}
                        onChange={(e) => updateResumeData('personal', {
                          ...resumeData.personal,
                          name: e.target.value
                        })}
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <Input 
                        id="email"
                        type="email"
                        placeholder="e.g. john.smith@example.com"
                        value={resumeData.personal.email}
                        onChange={(e) => updateResumeData('personal', {
                          ...resumeData.personal,
                          email: e.target.value
                        })}
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-1">
                        Phone Number
                      </label>
                      <Input 
                        id="phone"
                        placeholder="e.g. (555) 123-4567"
                        value={resumeData.personal.phone}
                        onChange={(e) => updateResumeData('personal', {
                          ...resumeData.personal,
                          phone: e.target.value
                        })}
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium mb-1">
                        Location
                      </label>
                      <Input 
                        id="location"
                        placeholder="e.g. New York, NY"
                        value={resumeData.personal.location}
                        onChange={(e) => updateResumeData('personal', {
                          ...resumeData.personal,
                          location: e.target.value
                        })}
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="website" className="block text-sm font-medium mb-1">
                        Website/Portfolio
                      </label>
                      <Input 
                        id="website"
                        placeholder="e.g. johnsmith.com"
                        value={resumeData.personal.website}
                        onChange={(e) => updateResumeData('personal', {
                          ...resumeData.personal,
                          website: e.target.value
                        })}
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="linkedin" className="block text-sm font-medium mb-1">
                        LinkedIn URL
                      </label>
                      <Input 
                        id="linkedin"
                        placeholder="e.g. linkedin.com/in/johnsmith"
                        value={resumeData.personal.linkedin}
                        onChange={(e) => updateResumeData('personal', {
                          ...resumeData.personal,
                          linkedin: e.target.value
                        })}
                        className="w-full"
                      />
                    </div>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="space-y-4">
                  <div>
                    <label htmlFor="summary" className="block text-sm font-medium mb-1">
                      Professional Summary <span className="text-red-500">*</span>
                    </label>
                    <Textarea 
                      id="summary"
                      placeholder="Write a brief overview of your professional background, skills, and career goals..."
                      value={resumeData.summary}
                      onChange={(e) => updateResumeData('summary', e.target.value)}
                      className="w-full min-h-32"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Keep your summary concise (3-5 sentences) and focused on your most relevant qualifications.
                    </p>
                  </div>
                </motion.div>
                
                {/* AI suggestions for summary */}
                {aiSuggestions.summary && aiSuggestions.summary.length > 0 && (
                  <motion.div 
                    variants={itemVariants}
                    className="mt-6 p-4 bg-jobfix-50 rounded-lg border border-jobfix-100"
                  >
                    <h3 className="text-sm font-medium flex items-center gap-2 mb-3">
                      <Sparkles size={16} className="text-jobfix-500" />
                      AI-Generated Summary Suggestions
                    </h3>
                    <div className="space-y-2">
                      {aiSuggestions.summary.map((suggestion, index) => (
                        <div 
                          key={index}
                          className="p-3 bg-white rounded border border-jobfix-100 cursor-pointer hover:border-jobfix-300 transition-colors"
                          onClick={() => updateResumeData('summary', suggestion)}
                        >
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                <motion.div variants={itemVariants} className="flex justify-between mt-8">
                  <Button 
                    variant="outline"
                    onClick={goToPrevStep}
                  >
                    Back
                  </Button>
                  
                  <Button 
                    className="gap-2 bg-jobfix-500 hover:bg-jobfix-600 text-white"
                    size="lg"
                    onClick={goToNextStep}
                    disabled={!resumeData.personal.name || !resumeData.personal.email || !resumeData.summary}
                  >
                    Continue
                    <ArrowRight size={18} />
                  </Button>
                </motion.div>
              </motion.div>
            )}
            
            {/* Step 3: Experience */}
            {activeStep === 3 && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="space-y-8"
              >
                <motion.div variants={itemVariants} className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Work Experience</h2>
                  <Button 
                    variant="outline" 
                    className="gap-2 text-jobfix-600"
                    onClick={() => generateContentSuggestions('experience', '')}
                    disabled={isGeneratingSuggestions}
                  >
                    <Sparkles size={16} />
                    Get Suggestions
                    {isGeneratingSuggestions && <div className="ml-2 animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />}
                  </Button>
                </motion.div>
                
                <motion.div variants={itemVariants} className="space-y-6">
                  {resumeData.experience.map((exp, index) => (
                    <Card key={exp.id} className="shadow-sm">
                      <CardHeader className="pb-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-medium">Experience {index + 1}</h3>
                          {resumeData.experience.length > 1 && (
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => {
                                const updatedExperience = [...resumeData.experience];
                                updatedExperience.splice(index, 1);
                                updateResumeData('experience', updatedExperience);
                              }}
                            >
                              <Trash2 size={18} />
                            </Button>
                          )}
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor={`company-${index}`} className="block text-sm font-medium mb-1">
                              Company Name <span className="text-red-500">*</span>
                            </label>
                            <Input 
                              id={`company-${index}`}
                              placeholder="e.g. Acme Corporation"
                              value={exp.company}
                              onChange={(e) => {
                                const updatedExperience = [...resumeData.experience];
                                updatedExperience[index].company = e.target.value;
                                updateResumeData('experience', updatedExperience);
                              }}
                              className="w-full"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor={`position-${index}`} className="block text-sm font-medium mb-1">
                              Job Title <span className="text-red-500">*</span>
                            </label>
                            <Input 
                              id={`position-${index}`}
                              placeholder="e.g. Senior Software Engineer"
                              value={exp.position}
                              onChange={(e) => {
                                const updatedExperience = [...resumeData.experience];
                                updatedExperience[index].position = e.target.value;
                                updateResumeData('experience', updatedExperience);
                              }}
                              className="w-full"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor={`start-date-${index}`} className="block text-sm font-medium mb-1">
                              Start Date <span className="text-red-500">*</span>
                            </label>
                            <Input 
                              id={`start-date-${index}`}
                              placeholder="e.g. Jan 2020"
                              value={exp.startDate}
                              onChange={(e) => {
                                const updatedExperience = [...resumeData.experience];
                                updatedExperience[index].startDate = e.target.value;
                                updateResumeData('experience', updatedExperience);
                              }}
                              className="w-full"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor={`end-date-${index}`} className="block text-sm font-medium mb-1">
                              End Date <span className="text-red-500">*</span>
                            </label>
                            <Input 
                              id={`end-date-${index}`}
                              placeholder="e.g. Present"
                              value={exp.endDate}
                              onChange={(e) => {
                                const updatedExperience = [...resumeData.experience];
                                updatedExperience[index].endDate = e.target.value;
                                updateResumeData('experience', updatedExperience);
                              }}
                              className="w-full"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor={`description-${index}`} className="block text-sm font-medium mb-1">
                            Description <span className="text-red-500">*</span>
                          </label>
                          <Textarea 
                            id={`description-${index}`}
                            placeholder="Describe your responsibilities and achievements..."
                            value={exp.description}
                            onChange={(e) => {
                              const updatedExperience = [...resumeData.experience];
                              updatedExperience[index].description = e.target.value;
                              updateResumeData('experience', updatedExperience);
                            }}
                            className="w-full min-h-24"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Use bullet points to highlight achievements. Start with strong action verbs.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Button 
                    variant="outline" 
                    className="gap-2" 
                    onClick={() => {
                      const newExperience = [...resumeData.experience];
                      newExperience.push({
                        id: `exp-${Date.now()}`,
                        company: '',
                        position: '',
                        startDate: '',
                        endDate: '',
                        current: false,
                        description: '',
                        achievements: []
                      });
                      updateResumeData('experience', newExperience);
                    }}
                  >
                    + Add Another Experience
                  </Button>
                </motion.div>
                
                {/* AI suggestions for experience descriptions */}
                {aiSuggestions.experience && aiSuggestions.experience.length > 0 && (
                  <motion.div 
                    variants={itemVariants}
                    className="mt-6 p-4 bg-jobfix-50 rounded-lg border border-jobfix-100"
                  >
                    <h3 className="text-sm font-medium flex items-center gap-2 mb-3">
                      <Sparkles size={16} className="text-jobfix-500" />
                      Achievement Suggestions
                    </h3>
                    <div className="space-y-2">
                      {aiSuggestions.experience.map((suggestion, index) => (
                        <div 
                          key={index}
                          className="p-3 bg-white rounded border border-jobfix-100 cursor-pointer hover:border-jobfix-300 transition-colors"
                          onClick={() => {
                            const updatedExperience = [...resumeData.experience];
                            const firstExp = updatedExperience[0];
                            updatedExperience[0] = {
                              ...firstExp,
                              description: firstExp.description 
                                ? `${firstExp.description}\n• ${suggestion}` 
                                : `• ${suggestion}`
                            };
                            updateResumeData('experience', updatedExperience);
                          }}
                        >
                          • {suggestion}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                <motion.div variants={itemVariants} className="flex justify-between mt-8">
                  <Button 
                    variant="outline"
                    onClick={goToPrevStep}
                  >
                    Back
                  </Button>
                  
                  <Button 
                    className="gap-2 bg-jobfix-500 hover:bg-jobfix-600 text-white"
                    size="lg"
                    onClick={goToNextStep}
                  >
                    Continue
                    <ArrowRight size={18} />
                  </Button>
                </motion.div>
              </motion.div>
            )}
            
            {/* Step 4: Skills & Education */}
            {activeStep === 4 && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="space-y-8"
              >
                <motion.div variants={itemVariants}>
                  <Tabs defaultValue="skills" className="w-full">
                    <TabsList className="w-full mb-4">
                      <TabsTrigger value="skills" className="flex-1">Skills</TabsTrigger>
                      <TabsTrigger value="education" className="flex-1">Education</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="skills" className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold">Skills</h2>
                        <Button 
                          variant="outline" 
                          className="gap-2 text-jobfix-600"
                          onClick={() => generateContentSuggestions('skills', '')}
                          disabled={isGeneratingSuggestions}
                        >
                          <Sparkles size={16} />
                          Get Suggestions
                          {isGeneratingSuggestions && <div className="ml-2 animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />}
                        </Button>
                      </div>
                      
                      {resumeData.skills.map((skillGroup, index) => (
                        <Card key={skillGroup.id} className="shadow-sm">
                          <CardHeader className="pb-4">
                            <div className="flex justify-between items-center">
                              <h3 className="text-lg font-medium">Skill Category {index + 1}</h3>
                              {resumeData.skills.length > 1 && (
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                  onClick={() => {
                                    const updatedSkills = [...resumeData.skills];
                                    updatedSkills.splice(index, 1);
                                    updateResumeData('skills', updatedSkills);
                                  }}
                                >
                                  <Trash2 size={18} />
                                </Button>
                              )}
                            </div>
                          </CardHeader>
                          
                          <CardContent className="space-y-4">
                            <div>
                              <label htmlFor={`skill-category-${index}`} className="block text-sm font-medium mb-1">
                                Category Name (Optional)
                              </label>
                              <Input 
                                id={`skill-category-${index}`}
                                placeholder="e.g. Programming Languages, Soft Skills, etc."
                                value={skillGroup.category}
                                onChange={(e) => {
                                  const updatedSkills = [...resumeData.skills];
                                  updatedSkills[index].category = e.target.value;
                                  updateResumeData('skills', updatedSkills);
                                }}
                                className="w-full"
                              />
                            </div>
                            
                            <div>
                              <label htmlFor={`skills-${index}`} className="block text-sm font-medium mb-1">
                                Skills <span className="text-red-500">*</span>
                              </label>
                              <Textarea 
                                id={`skills-${index}`}
                                placeholder="Enter your skills, separated by commas..."
                                value={skillGroup.skills.join(', ')}
                                onChange={(e) => {
                                  const updatedSkills = [...resumeData.skills];
                                  updatedSkills[index].skills = e.target.value.split(',').map(skill => skill.trim()).filter(Boolean);
                                  updateResumeData('skills', updatedSkills);
                                }}
                                className="w-full min-h-24"
                              />
                              <p className="text-xs text-muted-foreground mt-1">
                                List up to 10 skills per category, separated by commas.
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      
                      <div>
                        <Button 
                          variant="outline" 
                          className="gap-2" 
                          onClick={() => {
                            const newSkills = [...resumeData.skills];
                            newSkills.push({
                              id: `skill-${Date.now()}`,
                              category: '',
                              skills: []
                            });
                            updateResumeData('skills', newSkills);
                          }}
                        >
                          + Add Another Skill Category
                        </Button>
                      </div>
                      
                      {/* AI suggestions for skills */}
                      {aiSuggestions.skills && aiSuggestions.skills.length > 0 && (
                        <div className="mt-6 p-4 bg-jobfix-50 rounded-lg border border-jobfix-100">
                          <h3 className="text-sm font-medium flex items-center gap-2 mb-3">
                            <Sparkles size={16} className="text-jobfix-500" />
                            Skill Suggestions
                          </h3>
                          <div className="space-y-2">
                            {aiSuggestions.skills.map((suggestion, index) => (
                              <div 
                                key={index}
                                className="p-3 bg-white rounded border border-jobfix-100 cursor-pointer hover:border-jobfix-300 transition-colors"
                                onClick={() => {
                                  const updatedSkills = [...resumeData.skills];
                                  const firstSkillGroup = updatedSkills[0];
                                  const suggestionSkills = suggestion.split(',').map(s => s.trim());
                                  
                                  updatedSkills[0] = {
                                    ...firstSkillGroup,
                                    skills: [...new Set([...firstSkillGroup.skills, ...suggestionSkills])]
                                  };
                                  updateResumeData('skills', updatedSkills);
                                }}
                              >
                                {suggestion}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="education" className="space-y-6">
                      <h2 className="text-2xl font-bold">Education</h2>
                      
                      {resumeData.education.map((edu, index) => (
                        <Card key={edu.id} className="shadow-sm">
                          <CardHeader className="pb-4">
                            <div className="flex justify-between items-center">
                              <h3 className="text-lg font-medium">Education {index + 1}</h3>
                              {resumeData.education.length > 1 && (
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                  onClick={() => {
                                    const updatedEducation = [...resumeData.education];
                                    updatedEducation.splice(index, 1);
                                    updateResumeData('education', updatedEducation);
                                  }}
                                >
                                  <Trash2 size={18} />
                                </Button>
                              )}
                            </div>
                          </CardHeader>
                          
                          <CardContent className="space-y-4">
                            <div>
                              <label htmlFor={`institution-${index}`} className="block text-sm font-medium mb-1">
                                Institution <span className="text-red-500">*</span>
                              </label>
                              <Input 
                                id={`institution-${index}`}
                                placeholder="e.g. University of California, Berkeley"
                                value={edu.institution}
                                onChange={(e) => {
                                  const updatedEducation = [...resumeData.education];
                                  updatedEducation[index].institution = e.target.value;
                                  updateResumeData('education', updatedEducation);
                                }}
                                className="w-full"
                              />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label htmlFor={`degree-${index}`} className="block text-sm font-medium mb-1">
                                  Degree <span className="text-red-500">*</span>
                                </label>
                                <Input 
                                  id={`degree-${index}`}
                                  placeholder="e.g. Bachelor of Science"
                                  value={edu.degree}
                                  onChange={(e) => {
                                    const updatedEducation = [...resumeData.education];
                                    updatedEducation[index].degree = e.target.value;
                                    updateResumeData('education', updatedEducation);
                                  }}
                                  className="w-full"
                                />
                              </div>
                              
                              <div>
                                <label htmlFor={`field-${index}`} className="block text-sm font-medium mb-1">
                                  Field of Study <span className="text-red-500">*</span>
                                </label>
                                <Input 
                                  id={`field-${index}`}
                                  placeholder="e.g. Computer Science"
                                  value={edu.field}
                                  onChange={(e) => {
                                    const updatedEducation = [...resumeData.education];
                                    updatedEducation[index].field = e.target.value;
                                    updateResumeData('education', updatedEducation);
                                  }}
                                  className="w-full"
                                />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label htmlFor={`edu-start-date-${index}`} className="block text-sm font-medium mb-1">
                                  Start Date <span className="text-red-500">*</span>
                                </label>
                                <Input 
                                  id={`edu-start-date-${index}`}
                                  placeholder="e.g. Sep 2016"
                                  value={edu.startDate}
                                  onChange={(e) => {
                                    const updatedEducation = [...resumeData.education];
                                    updatedEducation[index].startDate = e.target.value;
                                    updateResumeData('education', updatedEducation);
                                  }}
                                  className="w-full"
                                />
                              </div>
                              
                              <div>
                                <label htmlFor={`edu-end-date-${index}`} className="block text-sm font-medium mb-1">
                                  End Date (or Expected) <span className="text-red-500">*</span>
                                </label>
                                <Input 
                                  id={`edu-end-date-${index}`}
                                  placeholder="e.g. Jun 2020"
                                  value={edu.endDate}
                                  onChange={(e) => {
                                    const updatedEducation = [...resumeData.education];
                                    updatedEducation[index].endDate = e.target.value;
                                    updateResumeData('education', updatedEducation);
                                  }}
                                  className="w-full"
                                />
                              </div>
                            </div>
                            
                            <div>
                              <label htmlFor={`gpa-${index}`} className="block text-sm font-medium mb-1">
                                GPA (Optional)
                              </label>
                              <Input 
                                id={`gpa-${index}`}
                                placeholder="e.g. 3.8/4.0"
                                value={edu.gpa}
                                onChange={(e) => {
                                  const updatedEducation = [...resumeData.education];
                                  updatedEducation[index].gpa = e.target.value;
                                  updateResumeData('education', updatedEducation);
                                }}
                                className="w-full"
                              />
                            </div>
                            
                            <div>
                              <label htmlFor={`edu-description-${index}`} className="block text-sm font-medium mb-1">
                                Description (Optional)
                              </label>
                              <Textarea 
                                id={`edu-description-${index}`}
                                placeholder="Relevant coursework, academic achievements, extracurricular activities..."
                                value={edu.description}
                                onChange={(e) => {
                                  const updatedEducation = [...resumeData.education];
                                  updatedEducation[index].description = e.target.value;
                                  updateResumeData('education', updatedEducation);
                                }}
                                className="w-full"
                              />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      
                      <div>
                        <Button 
                          variant="outline" 
                          className="gap-2" 
                          onClick={() => {
                            const newEducation = [...resumeData.education];
                            newEducation.push({
                              id: `edu-${Date.now()}`,
                              institution: '',
                              degree: '',
                              field: '',
                              startDate: '',
                              endDate: '',
                              description: '',
                              gpa: ''
                            });
                            updateResumeData('education', newEducation);
                          }}
                        >
                          + Add Another Education
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex justify-between mt-8">
                  <Button 
                    variant="outline"
                    onClick={goToPrevStep}
                  >
                    Back
                  </Button>
                  
                  <Button 
                    className="gap-2 bg-jobfix-500 hover:bg-jobfix-600 text-white"
                    size="lg"
                    onClick={goToNextStep}
                  >
                    Continue
                    <ArrowRight size={18} />
                  </Button>
                </motion.div>
              </motion.div>
            )}
            
            {/* Step 5: Customize */}
            {activeStep === 5 && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="space-y-8"
              >
                <motion.h2 
                  variants={itemVariants}
                  className="text-2xl font-bold"
                >
                  Customize Your Resume
                </motion.h2>
                
                <motion.div 
                  variants={itemVariants}
                  className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative"
                >
                  {/* Sidebar with sections and customization */}
                  <div className="lg:col-span-2 space-y-6">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Resume Sections</CardTitle>
                        <CardDescription>Drag to reorder or toggle sections</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* This would be a DnD list in a real implementation */}
                        {sectionOrder
                          .filter(section => enabledSections.includes(section) || section === 'personal' || section === 'summary')
                          .map((section) => (
                            <DraggableResumeSection
                              key={section}
                              id={section}
                              title={sectionConfig[section].title}
                              icon={sectionConfig[section].icon}
                              required={section === 'personal' || section === 'summary'}
                              onRemove={() => removeSection(section)}
                            />
                          ))}
                      </CardContent>
                      <CardFooter className="pt-0">
                        <div className="w-full">
                          <h4 className="text-sm font-medium mb-2">Add More Sections</h4>
                          <div className="flex flex-wrap gap-2">
                            {sectionOrder
                              .filter(section => !enabledSections.includes(section) && section !== 'personal' && section !== 'summary')
                              .map((section) => (
                                <Button 
                                  key={section}
                                  variant="outline" 
                                  size="sm"
                                  className="gap-1.5 text-xs"
                                  onClick={() => addSection(section)}
                                >
                                  {sectionConfig[section].icon}
                                  {sectionConfig[section].title}
                                </Button>
                              ))}
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Template Style</CardTitle>
                        <CardDescription>Change the look of your resume</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-3 gap-2">
                          {resumeTemplates.map((tmpl) => (
                            <div 
                              key={tmpl.id}
                              className={`aspect-[3/4] border rounded-md overflow-hidden cursor-pointer transition-all ${
                                template === tmpl.id ? 'ring-2 ring-jobfix-500' : 'hover:border-jobfix-300'
                              }`}
                              onClick={() => setTemplate(tmpl.id)}
                            >
                              <div className="w-full h-full relative">
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <p className="text-xs font-medium">{tmpl.name}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Preview pane */}
                  <div className="lg:col-span-3 h-full">
                    <Card className="shadow-md h-full">
                      <CardHeader className="pb-3 flex flex-row items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">Resume Preview</CardTitle>
                          <CardDescription>See how your resume looks</CardDescription>
                        </div>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Download size={14} />
                          Preview PDF
                        </Button>
                      </CardHeader>
                      <CardContent className="p-0 h-[600px] overflow-auto">
                        <div className="bg-gray-100 p-4 h-full flex items-center justify-center">
                          <div className="bg-white shadow-lg w-full max-w-[595px] h-[842px] mx-auto relative">
                            <ResumePreview
                              template={template}
                              data={resumeData}
                              sections={enabledSections}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex justify-between mt-8">
                  <Button 
                    variant="outline"
                    onClick={goToPrevStep}
                  >
                    Back
                  </Button>
                  
                  <Button 
                    className="gap-2 bg-jobfix-500 hover:bg-jobfix-600 text-white"
                    size="lg"
                    onClick={goToNextStep}
                  >
                    Continue
                    <ArrowRight size={18} />
                  </Button>
                </motion.div>
              </motion.div>
            )}
            
            {/* Step 6: Finalize & Export */}
            {activeStep === 6 && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="space-y-8"
              >
                <motion.div variants={itemVariants} className="text-center max-w-2xl mx-auto">
                  <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 bg-jobfix-100 rounded-full flex items-center justify-center text-jobfix-600">
                      <CheckCircle size={32} />
                    </div>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Your Resume Is Ready!</h2>
                  <p className="text-muted-foreground mb-8">
                    Your professional resume has been created and is ready to download. Choose your preferred format below.
                  </p>
                </motion.div>
                
                <motion.div 
                  variants={itemVariants}
                  className="max-w-2xl mx-auto"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Export Options</CardTitle>
                      <CardDescription>
                        Select a format to download your resume
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Button 
                          variant="outline" 
                          className="h-auto py-6 flex flex-col gap-2 hover:bg-jobfix-50 hover:border-jobfix-200 transition-colors"
                          onClick={() => exportResume('pdf')}
                        >
                          <FileText size={32} className="text-jobfix-500 mb-2" />
                          <span className="font-medium">PDF Format</span>
                          <span className="text-xs text-muted-foreground">Best for applications</span>
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="h-auto py-6 flex flex-col gap-2 hover:bg-jobfix-50 hover:border-jobfix-200 transition-colors"
                          onClick={() => exportResume('docx')}
                        >
                          <FileText size={32} className="text-jobfix-500 mb-2" />
                          <span className="font-medium">Word Format</span>
                          <span className="text-xs text-muted-foreground">Editable .docx file</span>
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="h-auto py-6 flex flex-col gap-2 hover:bg-jobfix-50 hover:border-jobfix-200 transition-colors"
                          onClick={() => exportResume('txt')}
                        >
                          <FileText size={32} className="text-jobfix-500 mb-2" />
                          <span className="font-medium">Text Format</span>
                          <span className="text-xs text-muted-foreground">Plain text version</span>
                        </Button>
                      </div>
                      
                      <div className="text-center pt-4">
                        <p className="text-sm text-muted-foreground mb-4">
                          Want to make additional changes?
                        </p>
                        <Button 
                          variant="ghost"
                          onClick={() => setActiveStep(5)}
                        >
                          Return to Editor
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                
                <motion.div 
                  variants={itemVariants}
                  className="max-w-2xl mx-auto bg-jobfix-50 rounded-lg border border-jobfix-100 p-4"
                >
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <Sparkles size={16} className="text-jobfix-500" />
                    What's Next?
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 text-jobfix-500">
                        <CheckCircle size={14} />
                      </div>
                      <span className="text-sm">
                        Tailor your resume for each job application to highlight relevant experience.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 text-jobfix-500">
                        <CheckCircle size={14} />
                      </div>
                      <span className="text-sm">
                        Create a matching cover letter to strengthen your application.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 text-jobfix-500">
                        <CheckCircle size={14} />
                      </div>
                      <span className="text-sm">
                        Update your LinkedIn profile to reflect your resume information.
                      </span>
                    </li>
                  </ul>
                </motion.div>
                
                <motion.div variants={itemVariants} className="text-center pt-8">
                  <Button
                    className="bg-jobfix-500 hover:bg-jobfix-600 text-white"
                    size="lg"
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      setActiveStep(1);
                      toast.success('Starting a new resume', {
                        description: 'Your previous resume is saved in your account.'
                      });
                    }}
                  >
                    Create Another Resume
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ResumeBuilder;
