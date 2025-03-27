
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Award,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import AnimatedCard from "@/components/ui/animated-card";

const ResumeGenerator = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-jobfix-50/20 to-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Resume Generator
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Generate an ATS-friendly resume in minutes. Upload your existing resume or create one from scratch.
          </p>
          
          {/* Add prominent CTA for Create Resume */}
          <div className="bg-jobfix-50 p-6 rounded-lg mb-12 border border-jobfix-200 shadow-sm">
            <h2 className="text-2xl font-semibold mb-3">Want to create a resume from scratch?</h2>
            <p className="mb-4">Our new Create Resume feature lets you build beautiful, ATS-friendly resumes with professional templates.</p>
            <Button asChild size="lg" className="bg-jobfix-500 hover:bg-jobfix-600">
              <Link to="/create-resume" className="flex items-center gap-2">
                Try Create Resume <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <AnimatedCard className="p-0 overflow-hidden">
              <div className="bg-gradient-to-br from-jobfix-500/20 to-jobfix-600/20 p-6">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h2 className="text-2xl font-semibold flex items-center mb-4">
                    <FileText className="mr-2 h-6 w-6 text-jobfix-500" />
                    Upload Resume
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Upload your existing resume and we'll help you optimize it for ATS systems.
                  </p>
                  <Button className="w-full bg-jobfix-500 hover:bg-jobfix-600">
                    Upload Resume
                  </Button>
                </div>
              </div>
            </AnimatedCard>
            
            <AnimatedCard className="p-0 overflow-hidden">
              <div className="bg-gradient-to-br from-jobfix-600/20 to-jobfix-700/20 p-6">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h2 className="text-2xl font-semibold flex items-center mb-4">
                    <FileText className="mr-2 h-6 w-6 text-jobfix-500" />
                    Create New Resume
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Start from scratch with our guided resume builder.
                  </p>
                  <Button asChild className="w-full bg-jobfix-500 hover:bg-jobfix-600">
                    <Link to="/create-resume">
                      Create New
                    </Link>
                  </Button>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-center mb-10">What Our Resume Generator Does</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="mr-4 bg-jobfix-100 p-2 rounded-full">
                    <Briefcase className="h-6 w-6 text-jobfix-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">ATS Optimization</h3>
                    <p className="text-muted-foreground">
                      Our AI ensures your resume passes through Applicant Tracking Systems.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="mr-4 bg-jobfix-100 p-2 rounded-full">
                    <GraduationCap className="h-6 w-6 text-jobfix-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Tailored Content</h3>
                    <p className="text-muted-foreground">
                      Match your resume to specific job descriptions to boost your chances.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="mr-4 bg-jobfix-100 p-2 rounded-full">
                    <Award className="h-6 w-6 text-jobfix-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Professional Templates</h3>
                    <p className="text-muted-foreground">
                      Choose from ATS-friendly, professionally designed resume templates.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="mr-4 bg-jobfix-100 p-2 rounded-full">
                    <Award className="h-6 w-6 text-jobfix-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Keyword Analysis</h3>
                    <p className="text-muted-foreground">
                      Identify and incorporate key skills and terms employers are looking for.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeGenerator;
