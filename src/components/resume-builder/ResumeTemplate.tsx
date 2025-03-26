
import React from 'react';

type TemplateType = 'modern' | 'classic' | 'minimal' | 'creative' | 'professional';

interface ResumeTemplateProps {
  templateId: TemplateType;
}

export const ResumeTemplate: React.FC<ResumeTemplateProps> = ({ templateId }) => {
  // This component shows a simplified version of each template for selection
  return (
    <div className="w-full h-full p-2">
      {templateId === 'modern' && (
        <div className="w-full h-full flex">
          {/* Modern template with sidebar */}
          <div className="w-1/3 bg-jobfix-50 h-full">
            <div className="w-full h-8 bg-jobfix-200 mb-2"></div>
            <div className="p-2">
              <div className="w-full h-3 bg-gray-300 mb-2"></div>
              <div className="w-full h-3 bg-gray-300 mb-2"></div>
              <div className="w-2/3 h-3 bg-gray-300"></div>
            </div>
          </div>
          <div className="w-2/3 p-2">
            <div className="w-full h-4 bg-gray-300 mb-3"></div>
            <div className="w-4/5 h-3 bg-gray-300 mb-3"></div>
            <div className="w-full h-3 bg-gray-300 mb-2"></div>
            <div className="w-full h-3 bg-gray-300 mb-2"></div>
            <div className="w-4/5 h-3 bg-gray-300"></div>
          </div>
        </div>
      )}
      
      {templateId === 'classic' && (
        <div className="w-full h-full p-2">
          {/* Classic traditional template */}
          <div className="w-full h-5 bg-gray-400 mb-3"></div>
          <div className="w-full h-3 bg-gray-300 mb-2"></div>
          <div className="w-full h-3 bg-gray-300 mb-2"></div>
          <div className="w-4/5 h-3 bg-gray-300 mb-4"></div>
          
          <div className="w-1/2 h-4 bg-gray-400 mb-2"></div>
          <div className="w-full h-3 bg-gray-300 mb-1"></div>
          <div className="w-full h-3 bg-gray-300 mb-1"></div>
          <div className="w-full h-3 bg-gray-300 mb-4"></div>
          
          <div className="w-1/2 h-4 bg-gray-400 mb-2"></div>
          <div className="w-full h-3 bg-gray-300 mb-1"></div>
          <div className="w-4/5 h-3 bg-gray-300"></div>
        </div>
      )}
      
      {templateId === 'minimal' && (
        <div className="w-full h-full p-2">
          {/* Minimal clean template */}
          <div className="w-2/3 h-4 bg-gray-300 mb-3 mx-auto"></div>
          <div className="w-1/2 h-3 bg-gray-200 mb-4 mx-auto"></div>
          
          <div className="w-full h-0.5 bg-gray-200 mb-3"></div>
          
          <div className="w-1/3 h-3 bg-gray-300 mb-2"></div>
          <div className="w-full h-2 bg-gray-200 mb-1"></div>
          <div className="w-full h-2 bg-gray-200 mb-3"></div>
          
          <div className="w-1/3 h-3 bg-gray-300 mb-2"></div>
          <div className="w-full h-2 bg-gray-200 mb-1"></div>
          <div className="w-4/5 h-2 bg-gray-200"></div>
        </div>
      )}
      
      {templateId === 'creative' && (
        <div className="w-full h-full relative">
          {/* Creative template with design elements */}
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-jobfix-200 rounded-bl-3xl"></div>
          
          <div className="w-full h-full p-2 relative z-10">
            <div className="w-2/3 h-5 bg-gray-400 mb-2"></div>
            <div className="w-1/2 h-3 bg-gray-300 mb-4"></div>
            
            <div className="w-full flex gap-2 mb-3">
              <div className="w-1/4 h-10 bg-jobfix-100 rounded-md"></div>
              <div className="w-1/4 h-10 bg-jobfix-100 rounded-md"></div>
              <div className="w-1/4 h-10 bg-jobfix-100 rounded-md"></div>
            </div>
            
            <div className="w-2/5 h-3 bg-gray-400 mb-2"></div>
            <div className="w-full h-2 bg-gray-300 mb-1"></div>
            <div className="w-full h-2 bg-gray-300"></div>
          </div>
        </div>
      )}
      
      {templateId === 'professional' && (
        <div className="w-full h-full p-2">
          {/* Professional structured template */}
          <div className="w-full h-6 bg-gray-700 mb-3"></div>
          <div className="flex gap-2 mb-4">
            <div className="w-1/2">
              <div className="w-full h-3 bg-gray-300 mb-1"></div>
              <div className="w-4/5 h-3 bg-gray-300"></div>
            </div>
            <div className="w-1/2">
              <div className="w-full h-3 bg-gray-300 mb-1"></div>
              <div className="w-4/5 h-3 bg-gray-300"></div>
            </div>
          </div>
          
          <div className="w-2/5 h-4 bg-gray-600 mb-2"></div>
          <div className="w-full h-3 bg-gray-300 mb-1"></div>
          <div className="w-full h-3 bg-gray-300 mb-1"></div>
          <div className="w-4/5 h-3 bg-gray-300"></div>
        </div>
      )}
    </div>
  );
};
