
import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Edit, Star } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import FadeIn from "@/components/ui/FadeIn";
import { toast } from "sonner";

// Import our new components
import TemplateSelector from "@/components/resume/TemplateSelector";
import ResumeEditor from "@/components/resume/ResumeEditor";
import ResumePreview from "@/components/resume/ResumePreview";
import { ResumeTemplate } from "@/components/resume/TemplateSelector";
import { ResumeSection } from "@/components/resume/ResumeEditor";

const CreateResume = () => {
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
                <TemplateSelector 
                  templates={templates}
                  selectedTemplate={selectedTemplate}
                  onSelectTemplate={handleTemplateSelect}
                />
              </TabsContent>
              
              <TabsContent value="editor" className="mt-4">
                <ResumeEditor 
                  resumeSections={resumeSections}
                  onContentChange={handleContentChange}
                  onGenerateWithAI={generateWithAI}
                  onNavigate={setActiveTab}
                  atsScore={atsScore}
                />
              </TabsContent>
              
              <TabsContent value="preview" className="mt-4">
                <ResumePreview 
                  resumeSections={resumeSections}
                  atsScore={atsScore}
                  onNavigate={setActiveTab}
                />
              </TabsContent>
            </Tabs>
          </div>
        </FadeIn>
      </main>
    </div>
  );
};

export default CreateResume;
