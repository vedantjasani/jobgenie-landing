
import React from "react";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// Resume Section Interface
export interface ResumeSection {
  id: string;
  title: string;
  content: string;
}

interface ResumeEditorProps {
  resumeSections: ResumeSection[];
  onContentChange: (sectionId: string, content: string) => void;
  onGenerateWithAI: (sectionId: string) => void;
  onNavigate: (tab: string) => void;
  atsScore: number;
}

const ResumeEditor = ({ 
  resumeSections, 
  onContentChange, 
  onGenerateWithAI, 
  onNavigate,
  atsScore 
}: ResumeEditorProps) => {
  
  const getScoreColor = () => {
    if (atsScore >= 80) return "text-green-500";
    if (atsScore >= 60) return "text-amber-500";
    return "text-red-500";
  };

  return (
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
                  onClick={() => onGenerateWithAI(section.id)}
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
                onChange={(e) => onContentChange(section.id, e.target.value)}
              />
            </CardContent>
          </Card>
        ))}
        
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => onNavigate("templates")}
          >
            Back to Templates
          </Button>
          <Button
            onClick={() => onNavigate("preview")}
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
              <div className="h-2 mt-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${atsScore >= 80 ? 'bg-green-500' : atsScore >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                  style={{ width: `${atsScore}%` }}
                ></div>
              </div>
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
  );
};

export default ResumeEditor;
