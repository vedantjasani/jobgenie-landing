
import React from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResumeSection } from "./ResumeEditor";
import { toast } from "sonner";

interface ResumePreviewProps {
  resumeSections: ResumeSection[];
  atsScore: number;
  onNavigate: (tab: string) => void;
}

const ResumePreview = ({ resumeSections, atsScore, onNavigate }: ResumePreviewProps) => {
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
              <div className="h-2 mt-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${atsScore >= 80 ? 'bg-green-500' : atsScore >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                  style={{ width: `${atsScore}%` }}
                ></div>
              </div>
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
              onClick={() => onNavigate("editor")}
            >
              Continue Editing
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResumePreview;
