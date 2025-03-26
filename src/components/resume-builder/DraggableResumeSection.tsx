
import React from 'react';
import { GripVertical, Trash2 } from 'lucide-react';

interface DraggableResumeSectionProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  required?: boolean;
  onRemove: () => void;
}

export const DraggableResumeSection: React.FC<DraggableResumeSectionProps> = ({
  id,
  title,
  icon,
  required = false,
  onRemove
}) => {
  // In a real implementation, this would use react-dnd or similar for drag functionality
  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-md border hover:border-jobfix-200 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="cursor-move text-gray-400 hover:text-gray-600">
          <GripVertical size={18} />
        </div>
        <div className="flex items-center gap-2">
          <div className="text-jobfix-500">{icon}</div>
          <span className="font-medium">{title}</span>
          {required && (
            <span className="text-xs text-jobfix-500 bg-jobfix-50 px-1.5 py-0.5 rounded-full">
              Required
            </span>
          )}
        </div>
      </div>
      
      {!required && (
        <button
          onClick={onRemove}
          className="text-gray-400 hover:text-red-500"
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>
  );
};
