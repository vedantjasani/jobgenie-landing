
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {templates.map((template) => (
        <motion.div
          key={template.id}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
        >
          <Card 
            className="overflow-hidden h-full cursor-pointer hover:shadow-lg border-2 hover:border-jobfix-300 transition-all duration-300"
            onClick={() => handleTemplateSelect(template.id)}
          >
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
  );
};

export default TemplateSelector;
