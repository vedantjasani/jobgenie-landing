
import { useState, useEffect } from 'react';
import { FileText, Upload, ArrowRight, FileIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

type FormData = {
  jobDescription: string;
  resumeFile: FileList;
};

const ResumeGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<FormData>({
    defaultValues: {
      jobDescription: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsGenerating(true);
      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      toast.success('Resume generated successfully!', {
        description: 'Your tailored resume is ready to download.',
      });
      
      console.log('Form submitted:', data);
      console.log('File:', selectedFile);
    } catch (error) {
      toast.error('Failed to generate resume', {
        description: 'Please try again later.',
      });
      console.error('Error generating resume:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      toast.info(`File selected: ${files[0].name}`);
    }
  };

  useEffect(() => {
    document.title = "Resume Generator - JobFix.ai";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container max-w-5xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Resume Generator</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Tailor your resume to match job descriptions and increase your chances of getting hired
          </p>
        </div>

        <Card className="mb-8 border-jobfix-400/20 shadow-soft">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-xl">
              <FileText className="h-5 w-5 text-jobfix-400" />
              Generate Your Tailored Resume
            </CardTitle>
            <CardDescription>
              Upload your existing resume and enter the job description to create a perfectly tailored resume
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="jobDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Paste the job description here..."
                          className="min-h-[200px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormItem>
                  <FormLabel>Upload Your Resume (PDF)</FormLabel>
                  <div className="border-2 border-dashed border-input rounded-md p-6 bg-muted/30">
                    <div className="flex flex-col items-center justify-center gap-2 text-center">
                      {selectedFile ? (
                        <div className="flex items-center gap-2">
                          <FileIcon className="h-8 w-8 text-jobfix-500" />
                          <span className="text-sm font-medium">{selectedFile.name}</span>
                        </div>
                      ) : (
                        <>
                          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground mb-1">
                            Drag and drop your resume, or click to browse
                          </p>
                        </>
                      )}
                      <Input
                        id="resumeFile"
                        type="file"
                        accept=".pdf"
                        className={selectedFile ? "hidden" : "absolute inset-0 opacity-0 cursor-pointer"}
                        onChange={handleFileChange}
                      />
                      {selectedFile && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedFile(null)}
                          className="mt-2"
                        >
                          Change File
                        </Button>
                      )}
                    </div>
                  </div>
                </FormItem>

                <div className="flex justify-center pt-4">
                  <Button 
                    type="submit" 
                    size="lg"
                    disabled={isGenerating || !selectedFile || !form.getValues().jobDescription}
                    className="bg-jobfix-500 hover:bg-jobfix-600 text-white gap-2"
                  >
                    {isGenerating ? 'Generating...' : 'Generate Tailored Resume'}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="feature-card">
            <CardHeader>
              <CardTitle className="text-lg">AI-Powered Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our AI analyzes the job description to identify key skills and requirements
              </p>
            </CardContent>
          </Card>

          <Card className="feature-card">
            <CardHeader>
              <CardTitle className="text-lg">Keyword Optimization</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We optimize your resume with relevant keywords to pass ATS systems
              </p>
            </CardContent>
          </Card>

          <Card className="feature-card">
            <CardHeader>
              <CardTitle className="text-lg">Professional Formatting</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Receive a professionally formatted resume that stands out to recruiters
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResumeGenerator;
