
import React from 'react';
import { motion } from 'framer-motion';

interface ResumeSectionProps {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  onEdit?: () => void;
  onRemove?: () => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({
  title,
  icon,
  children,
  onEdit,
  onRemove
}) => {
  return (
    <motion.div 
      className="border rounded-lg p-4 mb-4 bg-white shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="text-jobfix-500">{icon}</div>
          <h3 className="font-medium">{title}</h3>
        </div>
        
        <div className="flex items-center gap-2">
          {onEdit && (
            <button
              onClick={onEdit}
              className="w-6 h-6 flex items-center justify-center rounded-full text-jobfix-500 hover:bg-jobfix-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
          )}
          
          {onRemove && (
            <button
              onClick={onRemove}
              className="w-6 h-6 flex items-center justify-center rounded-full text-red-500 hover:bg-red-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          )}
        </div>
      </div>
      
      <div>{children}</div>
    </motion.div>
  );
};
