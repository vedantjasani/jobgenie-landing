
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Crown, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

// Resume Template Interface
export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  previewImage: string;
  isPremium?: boolean;
  rating?: number;
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
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-3xl font-bold mb-4">Choose Your Resume Template</h2>
        <p className="text-muted-foreground">
          Select from our professional, ATS-optimized templates designed to make your resume stand out and get past applicant tracking systems
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {templates.map((template) => (
          <motion.div
            key={template.id}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
          >
            <Card 
              className={`overflow-hidden h-full cursor-pointer transition-all duration-300 ${
                selectedTemplate === template.id 
                  ? 'border-2 border-jobfix-500 shadow-lg' 
                  : 'border border-gray-200 hover:shadow-md'
              }`}
              onClick={() => handleTemplateSelect(template.id)}
            >
              <div className="aspect-[3/4] bg-muted relative">
                <img
                  src={template.previewImage}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Premium badge */}
                {template.isPremium && (
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                    <Crown className="h-3 w-3 mr-1" />
                    PREMIUM
                  </div>
                )}
                
                {/* Rating */}
                {template.rating && (
                  <div className="absolute bottom-2 left-2 bg-white/90 text-gray-800 text-xs font-medium px-2 py-1 rounded-lg flex items-center">
                    <Star className="h-3 w-3 mr-1 text-yellow-500 fill-yellow-500" />
                    {template.rating}/10
                  </div>
                )}
                
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
