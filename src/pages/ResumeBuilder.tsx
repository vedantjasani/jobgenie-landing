import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  FileText,
  ArrowRight,
  Download,
  Save,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Define types for form data
type ResumeSection = {
  title: string;
  content: string;
};

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  objective: string;
  experience: ResumeSection[];
  education: ResumeSection[];
  skills: string[];
  certifications: string[];
  projects: ResumeSection[];
  awards: string[];
  additionalSections: ResumeSection[];
};

const ResumeBuilder = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [experienceList, setExperienceList] = useState<ResumeSection[]>([{ title: '', content: '' }]);
  const [educationList, setEducationList] = useState<ResumeSection[]>([{ title: '', content: '' }]);
  const [skillsList, setSkillsList] = useState<string[]>(['']);
  const [certificationsList, setCertificationsList] = useState<string[]>(['']);
  const [projectsList, setProjectsList] = useState<ResumeSection[]>([{ title: '', content: '' }]);
  const [awardsList, setAwardsList] = useState<string[]>(['']);
  const [additionalSectionsList, setAdditionalSectionsList] = useState<ResumeSection[]>([{ title: '', content: '' }]);
  const [showGeneratedResume, setShowGeneratedResume] = useState(false);
  const [generatedResumeContent, setGeneratedResumeContent] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [useAI, setUseAI] = useState(false);

  const form = useForm<FormData>({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      linkedin: '',
      github: '',
      objective: '',
      experience: [{ title: '', content: '' }],
      education: [{ title: '', content: '' }],
      skills: [''],
      certifications: [''],
      projects: [{ title: '', content: '' }],
      awards: [''],
      additionalSections: [{ title: '', content: '' }],
    },
  });

  useEffect(() => {
    document.title = "Resume Builder - JobFix.ai";
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      setIsGenerating(true);
      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Construct the resume content
      let resumeContent = `
        ${data.fullName ? `**Full Name:** ${data.fullName}\n` : ''}
        ${data.email ? `**Email:** ${data.email}\n` : ''}
        ${data.phone ? `**Phone:** ${data.phone}\n` : ''}
        ${data.linkedin ? `**LinkedIn:** ${data.linkedin}\n` : ''}
        ${data.github ? `**GitHub:** ${data.github}\n` : ''}
        ${data.objective ? `**Objective:** ${data.objective}\n` : ''}
        
        ${data.experience.length > 0 ? '**Experience:**\n' : ''}
        ${data.experience.map(exp => `
            **${exp.title}**
            ${exp.content}
        `).join('\n')}
        
        ${data.education.length > 0 ? '**Education:**\n' : ''}
        ${data.education.map(edu => `
            **${edu.title}**
            ${edu.content}
        `).join('\n')}
        
        ${data.skills.length > 0 ? '**Skills:**\n' : ''}
        ${data.skills.map(skill => `- ${skill}`).join('\n')}
        
        ${data.certifications.length > 0 ? '**Certifications:**\n' : ''}
        ${data.certifications.map(cert => `- ${cert}`).join('\n')}
        
        ${data.projects.length > 0 ? '**Projects:**\n' : ''}
        ${data.projects.map(project => `
            **${project.title}**
            ${project.content}
        `).join('\n')}
        
        ${data.awards.length > 0 ? '**Awards:**\n' : ''}
        ${data.awards.map(award => `- ${award}`).join('\n')}
        
        ${data.additionalSections.length > 0 ? '**Additional Sections:**\n' : ''}
        ${data.additionalSections.map(section => `
            **${section.title}**
            ${section.content}
        `).join('\n')}
    `;

      setGeneratedResumeContent(resumeContent);
      setShowGeneratedResume(true);

      toast.success('Resume generated successfully!', {
        description: 'Your resume is ready to view and download.',
      });

      console.log('Form submitted:', data);
      console.log('Resume Content:', resumeContent);
    } catch (error) {
      toast.error('Failed to generate resume', {
        description: 'Please try again later.',
      });
      console.error('Error generating resume:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Handler functions for Experience
  const addExperience = () => {
    setExperienceList([...experienceList, { title: '', content: '' }]);
  };

  const updateExperience = (index: number, field: string, value: string) => {
    const updatedExperience = [...experienceList];
    updatedExperience[index][field] = value;
    setExperienceList(updatedExperience);
  };

  const removeExperience = (index: number) => {
    const updatedExperience = [...experienceList];
    updatedExperience.splice(index, 1);
    setExperienceList(updatedExperience);
  };

  // Handler functions for Education
  const addEducation = () => {
    setEducationList([...educationList, { title: '', content: '' }]);
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const updatedEducation = [...educationList];
    updatedEducation[index][field] = value;
    setEducationList(updatedEducation);
  };

  const removeEducation = (index: number) => {
    const updatedEducation = [...educationList];
    updatedEducation.splice(index, 1);
    setEducationList(updatedEducation);
  };

  // Handler functions for Skills
  const addSkill = () => {
    setSkillsList([...skillsList, '']);
  };

  const updateSkill = (index: number, value: string) => {
    const updatedSkills = [...skillsList];
    updatedSkills[index] = value;
    setSkillsList(updatedSkills);
  };

  const removeSkill = (index: number) => {
    const updatedSkills = [...skillsList];
    updatedSkills.splice(index, 1);
    setSkillsList(updatedSkills);
  };

  // Handler functions for Certifications
  const addCertification = () => {
    setCertificationsList([...certificationsList, '']);
  };

  const updateCertification = (index: number, value: string) => {
    const updatedCertifications = [...certificationsList];
    updatedCertifications[index] = value;
    setCertificationsList(updatedCertifications);
  };

  const removeCertification = (index: number) => {
    const updatedCertifications = [...certificationsList];
    updatedCertifications.splice(index, 1);
    setCertificationsList(updatedCertifications);
  };

  // Handler functions for Projects
  const addProject = () => {
    setProjectsList([...projectsList, { title: '', content: '' }]);
  };

  const updateProject = (index: number, field: string, value: string) => {
    const updatedProjects = [...projectsList];
    updatedProjects[index][field] = value;
    setProjectsList(updatedProjects);
  };

  const removeProject = (index: number) => {
    const updatedProjects = [...projectsList];
    updatedProjects.splice(index, 1);
    setProjectsList(updatedProjects);
  };

  // Handler functions for Awards
  const addAward = () => {
    setAwardsList([...awardsList, '']);
  };

  const updateAward = (index: number, value: string) => {
    const updatedAwards = [...awardsList];
    updatedAwards[index] = value;
    setAwardsList(updatedAwards);
  };

  const removeAward = (index: number) => {
    const updatedAwards = [...awardsList];
    updatedAwards.splice(index, 1);
    setAwardsList(updatedAwards);
  };

  // Handler functions for Additional Sections
  const addAdditionalSection = () => {
    setAdditionalSectionsList([...additionalSectionsList, { title: '', content: '' }]);
  };

  const updateAdditionalSection = (index: number, field: string, value: string) => {
    const updatedAdditionalSections = [...additionalSectionsList];
    updatedAdditionalSections[index][field] = value;
    setAdditionalSectionsList(updatedAdditionalSections);
  };

  const removeAdditionalSection = (index: number) => {
    const updatedAdditionalSections = [...additionalSectionsList];
    updatedAdditionalSections.splice(index, 1);
    setAdditionalSectionsList(updatedAdditionalSections);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container max-w-5xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Resume Builder</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Create a professional resume that highlights your skills and experience
          </p>
        </div>

        <Card className="mb-8 border-jobfix-400/20 shadow-soft">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-xl">
              <FileText className="h-5 w-5 text-jobfix-400" />
              Build Your Resume
            </CardTitle>
            <CardDescription>
              Fill out the sections below to create your resume
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john.doe@example.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="123-456-7890" type="tel" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="linkedin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LinkedIn</FormLabel>
                        <FormControl>
                          <Input placeholder="linkedin.com/in/johndoe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="github"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GitHub</FormLabel>
                        <FormControl>
                          <Input placeholder="github.com/johndoe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="objective"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Objective</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="A brief summary of your professional goals"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <FormLabel>Experience</FormLabel>
                  {experienceList.map((experience, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <FormField
                        control={form.control}
                        name={`experience.${index}.title` as const}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Job Title"
                                value={experience.title}
                                onChange={(e) => updateExperience(index, 'title', e.target.value)}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`experience.${index}.content` as const}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe your responsibilities and achievements"
                                className="min-h-[100px]"
                                value={experience.content}
                                onChange={(e) => updateExperience(index, 'content', e.target.value)}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="md:col-span-2 flex justify-end">
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeExperience(index)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={addExperience}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Experience
                  </Button>
                </div>

                <div>
                  <FormLabel>Education</FormLabel>
                  {educationList.map((education, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <FormField
                        control={form.control}
                        name={`education.${index}.title` as const}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Degree or Certification"
                                value={education.title}
                                onChange={(e) => updateEducation(index, 'title', e.target.value)}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`education.${index}.content` as const}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Coursework, achievements, etc."
                                className="min-h-[100px]"
                                value={education.content}
                                onChange={(e) => updateEducation(index, 'content', e.target.value)}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="md:col-span-2 flex justify-end">
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeEducation(index)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={addEducation}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Education
                  </Button>
                </div>

                <div>
                  <FormLabel>Skills</FormLabel>
                  {skillsList.map((skill, index) => (
                    <div key={index} className="flex items-center gap-4 mb-2">
                      <FormField
                        control={form.control}
                        name={`skills.${index}` as const}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                placeholder="Skill"
                                value={skill}
                                onChange={(e) => updateSkill(index, e.target.value)}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removeSkill(index)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={addSkill}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Skill
                  </Button>
                </div>

                <div>
                  <FormLabel>Certifications</FormLabel>
                  {certificationsList.map((certification, index) => (
                    <div key={index} className="flex items-center gap-4 mb-2">
                      <FormField
                        control={form.control}
                        name={`certifications.${index}` as const}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                placeholder="Certification"
                                value={certification}
                                onChange={(e) => updateCertification(index, e.target.value)}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removeCertification(index)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={addCertification}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Certification
                  </Button>
                </div>

                <div>
                  <FormLabel>Projects</FormLabel>
                  {projectsList.map((project, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <FormField
                        control={form.control}
                        name={`projects.${index}.title` as const}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Project Title"
                                value={project.title}
                                onChange={(e) => updateProject(index, 'title', e.target.value)}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`projects.${index}.content` as const}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe your role and achievements"
                                className="min-h-[100px]"
                                value={project.content}
                                onChange={(e) => updateProject(index, 'content', e.target.value)}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="md:col-span-2 flex justify-end">
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeProject(index)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={addProject}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Project
                  </Button>
                </div>

                <div>
                  <FormLabel>Awards</FormLabel>
                  {awardsList.map((award, index) => (
                    <div key={index} className="flex items-center gap-4 mb-2">
                      <FormField
                        control={form.control}
                        name={`awards.${index}` as const}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                placeholder="Award"
                                value={award}
                                onChange={(e) => updateAward(index, e.target.value)}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removeAward(index)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={addAward}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Award
                  </Button>
                </div>

                <div>
                  <FormLabel>Additional Sections</FormLabel>
                  {additionalSectionsList.map((section, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <FormField
                        control={form.control}
                        name={`additionalSections.${index}.title` as const}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Section Title"
                                value={section.title}
                                onChange={(e) => updateAdditionalSection(index, 'title', e.target.value)}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`additionalSections.${index}.content` as const}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Section Content"
                                className="min-h-[100px]"
                                value={section.content}
                                onChange={(e) => updateAdditionalSection(index, 'content', e.target.value)}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="md:col-span-2 flex justify-end">
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeAdditionalSection(index)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={addAdditionalSection}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Section
                  </Button>
                </div>

                <div className="flex items-center space-x-2">
                  <FormField
                    control={form.control}
                    name="premiumFeatures"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={isPremium}
                            onCheckedChange={(checked) => {
                              setIsPremium(checked || false);
                            }}
                            {...field}
                          />
                        </FormControl>
                        <div className="space-y-0.5">
                          <FormLabel className="text-base font-semibold">Premium Features</FormLabel>
                          <FormDescription>
                            Enable premium features (e.g., advanced formatting, AI suggestions).
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  {isPremium && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                </div>

                <div className="flex items-center space-x-2">
                  <FormField
                    control={form.control}
                    name="aiAssistance"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={useAI}
                            onCheckedChange={(checked) => {
                              setUseAI(checked || false);
                            }}
                            {...field}
                          />
                        </FormControl>
                        <div className="space-y-0.5">
                          <FormLabel className="text-base font-semibold">AI Assistance</FormLabel>
                          <FormDescription>
                            Use AI to generate suggestions for your resume content.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  {useAI && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                </div>

                <div className="flex justify-center pt-4">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isGenerating}
                    className="bg-jobfix-500 hover:bg-jobfix-600 text-white gap-2"
                  >
                    {isGenerating ? 'Generating...' : 'Generate Resume'}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {showGeneratedResume && (
          <Card className="mb-8 border-jobfix-400/20 shadow-soft">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <FileText className="h-5 w-5 text-jobfix-400" />
                Generated Resume
              </CardTitle>
              <CardDescription>
                Review your generated resume content below
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-line">{generatedResumeContent}</div>
              <div className="flex justify-end mt-4 gap-2">
                <Button variant="secondary">
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="secondary">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ResumeBuilder;
