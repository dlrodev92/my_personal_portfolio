import { useState, useEffect } from 'react';
import type { Project as APIProject } from '../../../lib/types';
import ProjectCard from './ProjectCard';
import ProjectFilter from './ProjectFilter';

interface Props {
  projects: APIProject[];
}

interface Project {
  title: string;
  description: string;
  tech: string[];
  status: string;
  image: string;
  slug: string;
  category: string;
}

const ProjectsGrid = ({ projects: apiProjects }: Props) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  const transformedProjects: Project[] = apiProjects.map(project => {
    const transformed = {
      title: project.title,
      description: project.subtitle || 'No description available',
      tech: project.technologies?.map(tech => tech.name) || [],
      status: project.status === 'LIVE' ? '🚀 Live' : 
              project.status === 'IN_PROGRESS' ? '⚡ In Progress' : 
              '🛠 Building',
      image: project.heroImage,
      slug: project.slug, // Make sure this is being passed
      category: project.type.toLowerCase(),
    };
    
    
    return transformed;
  });

  useEffect(() => {
    const filtered = activeCategory === 'all' 
      ? transformedProjects 
      : transformedProjects.filter(project => project.category === activeCategory);
    
    setFilteredProjects(filtered);
  }, [activeCategory, transformedProjects]);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  return (
    <section className="p-2">
      <div className="w-full">
        
        <ProjectFilter 
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          projectCount={filteredProjects.length}
        />

        <div className="transition-all duration-300">
          {filteredProjects.length > 0 ? (
            <div className="flex flex-wrap gap-4 justify-center">
              {filteredProjects.map((project, index) => {
              
                return (
                  <ProjectCard 
                    key={`${project.slug}-${activeCategory}`} // Use slug for better keys
                    project={project}
                    index={index}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold text-black mb-2">
                No projects Yet
              </h3>
              <p className="font-body text-gray-600 mb-4">
                👩🏻‍💻 Working on new stuff, check back later!
              </p>
              <button 
                onClick={() => setActiveCategory('all')}
                className="font-body text-black hover:text-yellow-600 transition-colors underline font-medium"
              >
                Show all projects
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default ProjectsGrid;