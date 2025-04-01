
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

// Resume Template Interface
export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  previewImage: string;
}

interface TemplateSelectorProps {
  templates: ResumeTemplate[];
  selectedTemplate: string | null;
  onSelectTemplate: (templateId: string) => void;
}

const TemplateSelector = ({ templates, selectedTemplate, onSelectTemplate }: TemplateSelectorProps) => {
  const handleTemplateSelect = (templateId: string) => {
    onSelectTemplate(templateId);
    toast.success("Template selected successfully!");
  };

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="text-3xl font-bold mb-4">Choose Your Resume Template</h2>
        <p className="text-muted-foreground">
          Select from our professional, ATS-optimized templates to make your resume stand out
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {templates.map((template) => (
          <motion.div
            key={template.id}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
          >
            <Card 
              className={`overflow-hidden h-full cursor-pointer hover:shadow-lg transition-all duration-300 ${
                selectedTemplate === template.id 
                  ? 'border-2 border-jobfix-500' 
                  : 'border border-gray-200'
              }`}
              onClick={() => handleTemplateSelect(template.id)}
            >
              <div className="aspect-[3/4] bg-muted relative">
                <img
                  src={template.previewImage}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
                {selectedTemplate === template.id && (
                  <div className="absolute inset-0 bg-jobfix-500/10 flex items-center justify-center">
                    <CheckCircle2 className="h-12 w-12 text-jobfix-500" />
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg">{template.name}</h3>
                <p className="text-muted-foreground text-sm">{template.description}</p>
                
                <div className="mt-4">
                  <Button 
                    variant={selectedTemplate === template.id ? "default" : "outline"}
                    className={`w-full ${selectedTemplate === template.id ? 'bg-jobfix-500' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTemplateSelect(template.id);
                    }}
                  >
                    {selectedTemplate === template.id ? 'Selected' : 'Use This Template'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
