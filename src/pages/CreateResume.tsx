
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Star, 
  Download,
  ArrowRight,
  CheckCircle2,
  Edit,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import FadeIn from "@/components/ui/FadeIn";
import { toast } from "sonner";

// Resume Template Interfaces
interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  previewImage: string;
}

// Resume Section Interfaces
interface ResumeSection {
  id: string;
  title: string;
  content: string;
}

const CreateResume = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("templates");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [atsScore, setAtsScore] = useState(72);
  const [resumeSections, setResumeSections] = useState<ResumeSection[]>([
    { id: "summary", title: "Professional Summary", content: "" },
    { id: "experience", title: "Work Experience", content: "" },
    { id: "education", title: "Education", content: "" },
    { id: "skills", title: "Skills", content: "" }
  ]);

  // Sample templates
  const templates: ResumeTemplate[] = [
    {
      id: "modern",
      name: "Modern Professional",
      description: "Clean, contemporary design with subtle accents",
      previewImage: "placeholder.svg"
    },
    {
      id: "classic",
      name: "Classic Elegance",
      description: "Traditional format preferred by established industries",
      previewImage: "placeholder.svg"
    },
    {
      id: "creative",
      name: "Creative Portfolio",
      description: "Bold design for creative professionals",
      previewImage: "placeholder.svg"
    },
    {
      id: "minimal",
      name: "Minimalist",
      description: "Simple, straightforward presentation of your qualifications",
      previewImage: "placeholder.svg"
    }
  ];

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setActiveTab("editor");
    toast.success("Template selected successfully!");
  };

  const handleContentChange = (sectionId: string, content: string) => {
    setResumeSections(prevSections => 
      prevSections.map(section => 
        section.id === sectionId ? { ...section, content } : section
      )
    );
    
    // Simulate ATS score change when content is updated
    if (content.length > 20) {
      setAtsScore(prevScore => Math.min(100, prevScore + 2));
    }
  };

  const generateWithAI = (sectionId: string) => {
    // Simulate AI generation
    const aiContent = {
      summary: "Results-driven software engineer with 5+ years of experience developing scalable web applications. Proficient in React, Node.js, and TypeScript. Passionate about creating intuitive user interfaces and optimizing performance.",
      experience: "Senior Frontend Developer | TechCorp Inc. | 2020-Present\n• Led development of company's flagship SaaS product\n• Improved application performance by 40%\n• Mentored junior developers and established best practices",
      education: "Master of Computer Science | University of Technology | 2019\nBachelor of Software Engineering | State University | 2017",
      skills: "Technical: React, TypeScript, Node.js, GraphQL, AWS\nSoft Skills: Team Leadership, Project Management, Communication"
    };

    setResumeSections(prevSections => 
      prevSections.map(section => 
        section.id === sectionId ? { ...section, content: aiContent[sectionId as keyof typeof aiContent] } : section
      )
    );
    
    // Update ATS score when AI generates content
    setAtsScore(prevScore => Math.min(100, prevScore + 5));
    toast.success("AI content generated!");
  };

  const handleExport = () => {
    toast.success("Resume exported as PDF!");
    // In a real implementation, this would generate and download a PDF
  };

  const getScoreColor = () => {
    if (atsScore >= 80) return "text-green-500";
    if (atsScore >= 60) return "text-amber-500";
    return "text-red-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-jobfix-50/20 to-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <FadeIn>
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Create Your Professional Resume
          </h1>
          
          <div className="max-w-7xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="templates" disabled={activeTab === "templates" && !selectedTemplate}>
                  <span className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Choose Template
                  </span>
                </TabsTrigger>
                <TabsTrigger value="editor" disabled={!selectedTemplate}>
                  <span className="flex items-center gap-2">
                    <Edit className="h-4 w-4" />
                    Edit Content
                  </span>
                </TabsTrigger>
                <TabsTrigger value="preview" disabled={!selectedTemplate}>
                  <span className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Preview & Export
                  </span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="templates" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {templates.map((template) => (
                    <motion.div
                      key={template.id}
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="overflow-hidden h-full cursor-pointer hover:shadow-lg border-2 hover:border-jobfix-300 transition-all duration-300"
                            onClick={() => handleTemplateSelect(template.id)}>
                        <div className="aspect-[3/4] bg-muted relative">
                          <img
                            src={template.previewImage}
                            alt={template.name}
                            className="w-full h-full object-cover"
                          />
                          {selectedTemplate === template.id && (
                            <div className="absolute inset-0 bg-jobfix-500/20 flex items-center justify-center">
                              <CheckCircle2 className="h-12 w-12 text-jobfix-500" />
                            </div>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-lg">{template.name}</h3>
                          <p className="text-muted-foreground text-sm">{template.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="editor" className="mt-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    {resumeSections.map((section) => (
                      <Card key={section.id} className="shadow-sm">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-xl flex justify-between items-center">
                            {section.title}
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex items-center gap-1 text-xs"
                              onClick={() => generateWithAI(section.id)}
                            >
                              <Sparkles className="h-3 w-3" />
                              AI Generate
                            </Button>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Textarea
                            className="min-h-[150px]"
                            placeholder={`Enter your ${section.title.toLowerCase()}...`}
                            value={section.content}
                            onChange={(e) => handleContentChange(section.id, e.target.value)}
                          />
                        </CardContent>
                      </Card>
                    ))}
                    
                    <div className="flex justify-between mt-8">
                      <Button
                        variant="outline"
                        onClick={() => setActiveTab("templates")}
                      >
                        Back to Templates
                      </Button>
                      <Button
                        onClick={() => setActiveTab("preview")}
                      >
                        Preview Resume <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-1">
                    <Card className="sticky top-20">
                      <CardHeader>
                        <CardTitle className="text-xl">ATS Score</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="text-center">
                          <span className={`text-5xl font-bold ${getScoreColor()}`}>
                            {atsScore}%
                          </span>
                          <Progress value={atsScore} className="h-2 mt-2" />
                        </div>
                        
                        <div className="space-y-3 mt-6">
                          <h3 className="font-medium">Improvement Tips:</h3>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                              <span>Include relevant keywords from the job description</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                              <span>Quantify achievements with numbers and metrics</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                              <span>Use action verbs to start bullet points</span>
                            </li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="preview" className="mt-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-white shadow-lg p-8 rounded-lg min-h-[800px]">
                    <div className="border-b-2 border-jobfix-500 pb-4 mb-6">
                      <h2 className="text-2xl font-bold">Your Name</h2>
                      <p className="text-muted-foreground">Professional Title</p>
                    </div>
                    
                    {resumeSections.map((section) => (
                      <div key={section.id} className="mb-6">
                        <h3 className="text-lg font-semibold border-b mb-3 pb-1">{section.title}</h3>
                        <div className="whitespace-pre-line">{section.content || "No content added yet."}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="lg:col-span-1">
                    <Card className="sticky top-20">
                      <CardHeader>
                        <CardTitle className="text-xl">ATS Score</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="text-center">
                          <span className={`text-5xl font-bold ${getScoreColor()}`}>
                            {atsScore}%
                          </span>
                          <Progress value={atsScore} className="h-2 mt-2" />
                        </div>
                        
                        <Button 
                          className="w-full mt-6 gap-2"
                          onClick={handleExport}
                        >
                          <Download className="h-4 w-4" />
                          Export as PDF
                        </Button>
                        
                        <Button 
                          variant="outline"
                          className="w-full mt-2"
                          onClick={() => setActiveTab("editor")}
                        >
                          Continue Editing
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </FadeIn>
      </main>
    </div>
  );
};

export default CreateResume;
