
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface ResumeEditorProps {
  sectionName: string;
  onSave: (data: any) => void;
  onCancel: () => void;
  onRequestSuggestion?: () => void;
  children: React.ReactNode;
}

export const ResumeEditor: React.FC<ResumeEditorProps> = ({
  sectionName,
  onSave,
  onCancel,
  onRequestSuggestion,
  children
}) => {
  return (
    <Card className="w-full shadow-md">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Edit {sectionName}</CardTitle>
        {onRequestSuggestion && (
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-1.5 text-jobfix-600"
            onClick={onRequestSuggestion}
          >
            <Sparkles size={14} />
            Get Suggestions
          </Button>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        {children}
        
        <div className="flex justify-end gap-3 pt-4">
          <Button 
            variant="outline" 
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button 
            className="bg-jobfix-500 hover:bg-jobfix-600 text-white"
            onClick={onSave}
          >
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
