
import React from 'react';

type SectionType = 
  | 'personal' 
  | 'experience' 
  | 'education' 
  | 'skills' 
  | 'projects' 
  | 'certifications' 
  | 'languages'
  | 'summary';

type TemplateType = 'modern' | 'classic' | 'minimal' | 'creative' | 'professional';

interface ResumePreviewProps {
  template: TemplateType;
  data: any;
  sections: SectionType[];
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ template, data, sections }) => {
  // Basic components to render different sections
  const renderPersonalInfo = () => (
    <div className="text-center mb-4">
      <h1 className="text-2xl font-bold">
        {data.personal.name || 'Your Name'}
      </h1>
      <div className="flex justify-center flex-wrap gap-x-3 text-sm text-gray-600 mt-1">
        {data.personal.email && <span>{data.personal.email}</span>}
        {data.personal.phone && <span>• {data.personal.phone}</span>}
        {data.personal.location && <span>• {data.personal.location}</span>}
      </div>
      {(data.personal.website || data.personal.linkedin) && (
        <div className="flex justify-center gap-x-3 text-sm text-gray-600 mt-1">
          {data.personal.website && <span>{data.personal.website}</span>}
          {data.personal.linkedin && <span>• {data.personal.linkedin}</span>}
        </div>
      )}
    </div>
  );

  const renderSummary = () => (
    <div className="mb-4">
      <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2">
        Professional Summary
      </h2>
      <p className="text-sm">{data.summary || 'Your professional summary...'}</p>
    </div>
  );

  const renderExperience = () => (
    <div className="mb-4">
      <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2">
        Work Experience
      </h2>
      {data.experience.map((exp: any) => (
        <div key={exp.id} className="mb-3">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{exp.position || 'Position'}</h3>
              <p className="text-sm">{exp.company || 'Company Name'}</p>
            </div>
            <p className="text-sm text-gray-600">
              {exp.startDate || 'Start Date'} - {exp.endDate || 'End Date'}
            </p>
          </div>
          <p className="text-sm mt-1">{exp.description || 'Job description...'}</p>
        </div>
      ))}
    </div>
  );

  const renderEducation = () => (
    <div className="mb-4">
      <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2">
        Education
      </h2>
      {data.education.map((edu: any) => (
        <div key={edu.id} className="mb-3">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{edu.institution || 'Institution'}</h3>
              <p className="text-sm">
                {edu.degree || 'Degree'}{edu.field ? `, ${edu.field}` : ''}
                {edu.gpa ? ` | GPA: ${edu.gpa}` : ''}
              </p>
            </div>
            <p className="text-sm text-gray-600">
              {edu.startDate || 'Start Date'} - {edu.endDate || 'End Date'}
            </p>
          </div>
          {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
        </div>
      ))}
    </div>
  );

  const renderSkills = () => (
    <div className="mb-4">
      <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2">
        Skills
      </h2>
      {data.skills.map((skillGroup: any) => (
        <div key={skillGroup.id} className="mb-2">
          {skillGroup.category && <h3 className="font-medium text-sm">{skillGroup.category}</h3>}
          <p className="text-sm">
            {skillGroup.skills.join(', ') || 'List your skills here...'}
          </p>
        </div>
      ))}
    </div>
  );

  const renderProjects = () => (
    <div className="mb-4">
      <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2">
        Projects
      </h2>
      {data.projects.map((project: any) => (
        <div key={project.id} className="mb-3">
          <div className="flex justify-between items-start">
            <h3 className="font-medium">{project.name || 'Project Name'}</h3>
            {(project.startDate || project.endDate) && (
              <p className="text-sm text-gray-600">
                {project.startDate || ''} {project.startDate && project.endDate && '- '} 
                {project.endDate || ''}
              </p>
            )}
          </div>
          {project.description && <p className="text-sm mt-1">{project.description}</p>}
          {project.technologies && project.technologies.length > 0 && (
            <p className="text-sm mt-1">
              <span className="font-medium">Technologies:</span> {project.technologies.join(', ')}
            </p>
          )}
          {project.url && (
            <p className="text-sm mt-1">
              <span className="font-medium">URL:</span> {project.url}
            </p>
          )}
        </div>
      ))}
    </div>
  );

  const renderCertifications = () => (
    <div className="mb-4">
      <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2">
        Certifications
      </h2>
      {data.certifications.map((cert: any) => (
        <div key={cert.id} className="mb-2">
          <div className="flex justify-between items-start">
            <h3 className="font-medium">{cert.name || 'Certification Name'}</h3>
            {cert.date && <p className="text-sm text-gray-600">{cert.date}</p>}
          </div>
          <p className="text-sm">{cert.issuer || 'Issuing Organization'}</p>
          {cert.url && <p className="text-sm text-gray-600">{cert.url}</p>}
        </div>
      ))}
    </div>
  );

  const renderLanguages = () => (
    <div className="mb-4">
      <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2">
        Languages
      </h2>
      <div className="flex flex-wrap gap-4">
        {data.languages.map((lang: any) => (
          <div key={lang.id}>
            <span className="font-medium text-sm">{lang.language || 'Language'}</span>
            {lang.proficiency && (
              <span className="text-sm text-gray-600"> - {lang.proficiency}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // Render sections based on template style
  if (template === 'modern') {
    return (
      <div className="w-full h-full flex text-[11px]">
        {/* Modern template with sidebar */}
        <div className="w-1/3 bg-jobfix-50 p-4 h-full">
          {sections.includes('personal') && (
            <div className="mb-6 text-center">
              <h1 className="text-lg font-bold">{data.personal.name || 'Your Name'}</h1>
              {data.personal.email && <p className="text-sm">{data.personal.email}</p>}
              {data.personal.phone && <p className="text-sm">{data.personal.phone}</p>}
              {data.personal.location && <p className="text-sm">{data.personal.location}</p>}
            </div>
          )}
          
          {sections.includes('skills') && renderSkills()}
          {sections.includes('languages') && renderLanguages()}
          {sections.includes('certifications') && renderCertifications()}
        </div>
        
        <div className="w-2/3 p-4 h-full">
          {sections.includes('summary') && renderSummary()}
          {sections.includes('experience') && renderExperience()}
          {sections.includes('education') && renderEducation()}
          {sections.includes('projects') && renderProjects()}
        </div>
      </div>
    );
  }
  
  // Default classic template (or any other template)
  return (
    <div className="w-full h-full p-6 text-[11px]">
      {sections.includes('personal') && renderPersonalInfo()}
      {sections.includes('summary') && renderSummary()}
      {sections.includes('experience') && renderExperience()}
      {sections.includes('education') && renderEducation()}
      {sections.includes('skills') && renderSkills()}
      {sections.includes('projects') && renderProjects()}
      {sections.includes('certifications') && renderCertifications()}
      {sections.includes('languages') && renderLanguages()}
    </div>
  );
};
