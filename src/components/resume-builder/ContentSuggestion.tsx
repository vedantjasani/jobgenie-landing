
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface ContentSuggestionProps {
  title: string;
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

export const ContentSuggestion: React.FC<ContentSuggestionProps> = ({
  title,
  suggestions,
  onSelect
}) => {
  return (
    <Card className="border-jobfix-100 bg-jobfix-50/30">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          <Sparkles className="h-4 w-4 text-jobfix-500 mr-2" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {suggestions.map((suggestion, index) => (
          <div 
            key={index}
            className="bg-white p-2 rounded border border-jobfix-100 text-sm cursor-pointer hover:border-jobfix-300 transition-colors"
            onClick={() => onSelect(suggestion)}
          >
            {suggestion}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
