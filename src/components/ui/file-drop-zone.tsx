
import React, { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle, Upload, FileIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface FileDropZoneProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  fileType: string;
  maxSize: number;
  label: string;
  icon?: React.ReactNode;
  accept: string;
  onClearFile?: () => void;
}

const FileDropZone = ({
  onFileSelect,
  selectedFile,
  fileType,
  maxSize,
  label,
  icon = <Upload className="h-8 w-8 text-jobfix-500" />,
  accept,
  onClearFile
}: FileDropZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const validateFile = (file: File): boolean => {
    setFileError(null);
    
    // Validate file type
    if (!file.type.includes(fileType)) {
      const errorMsg = `Only ${fileType.toUpperCase()} files are supported`;
      setFileError(errorMsg);
      toast.error("Invalid file format", {
        description: errorMsg
      });
      return false;
    }
    
    // Validate file size
    if (file.size > maxSize) {
      const maxSizeMB = Math.round(maxSize / 1024 / 1024);
      const errorMsg = `File size must be less than ${maxSizeMB}MB`;
      setFileError(errorMsg);
      toast.error("File too large", {
        description: errorMsg
      });
      return false;
    }
    
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    
    if (files && files.length > 0) {
      const file = files[0];
      
      if (validateFile(file)) {
        onFileSelect(file);
        toast.info(`File selected: ${file.name}`);
      }
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setFileError(null);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      
      if (validateFile(file)) {
        onFileSelect(file);
        toast.info(`File selected: ${file.name}`);
      }
    }
  }, [onFileSelect]);

  return (
    <div className="space-y-2">
      <div 
        className={`relative border-2 border-dashed rounded-lg p-8 transition-all duration-200
          ${isDragging ? 'border-jobfix-400 bg-jobfix-50/60' : ''}
          ${fileError 
            ? 'border-red-300 bg-red-50/30 hover:bg-red-50/50 hover:border-red-400' 
            : 'border-jobfix-200 bg-jobfix-50/30 hover:bg-jobfix-50/50 hover:border-jobfix-300'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <AnimatePresence mode="wait">
          {selectedFile ? (
            <motion.div 
              className="flex flex-col items-center gap-4 h-[240px] justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key="file-selected"
            >
              <motion.div 
                className="w-16 h-16 rounded-full bg-jobfix-100 flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FileIcon className="h-8 w-8 text-jobfix-600" />
              </motion.div>
              <div className="flex flex-col items-center text-center">
                <span className="text-base font-medium text-foreground max-w-full truncate" style={{ maxWidth: "200px" }}>
                  {selectedFile.name}
                </span>
                <span className="text-sm text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onClearFile}
                className="mt-2"
              >
                Change File
              </Button>
            </motion.div>
          ) : (
            <motion.div 
              className="flex flex-col items-center justify-center gap-3 text-center h-[240px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              key="no-file"
            >
              <motion.div 
                className="w-16 h-16 rounded-full bg-jobfix-100/60 flex items-center justify-center mb-2"
                animate={{ 
                  y: isDragging ? -10 : 0,
                  scale: isDragging ? 1.1 : 1 
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {icon}
              </motion.div>
              <motion.div
                animate={{ 
                  y: isDragging ? -5 : 0,
                }}
              >
                <p className="text-base font-medium text-foreground mb-1">
                  {isDragging ? "Drop your file here" : `Drag and drop your ${label}`}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  {fileType === "pdf" ? "Only PDF files accepted" : `Supports ${fileType.toUpperCase()} files`} (max {maxSize / 1024 / 1024}MB)
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <Input
          id="fileInput"
          type="file"
          accept={accept}
          className="absolute inset-0 opacity-0 cursor-pointer h-full w-full"
          onChange={handleFileChange}
        />
      </div>
      
      {fileError && (
        <motion.p 
          className="text-sm text-red-500 flex items-center gap-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertCircle className="h-4 w-4" />
          {fileError}
        </motion.p>
      )}
      
      {selectedFile && !fileError && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-2 text-sm text-jobfix-600">
            <CheckCircle className="h-4 w-4" />
            <span>File ready for upload</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FileDropZone;
