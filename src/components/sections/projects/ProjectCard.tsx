interface Project {
  title: string;
  description: string;
  tech: string[];
  status: string;
  image: string;
  slug: string;
  category: string;
}

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  return (
    <article className={`relative flex-1 min-w-[280px] max-w-full sm:max-w-[calc(50%-0.5rem)] md:max-w-[calc(33%-0.5rem)] h-[340px] rounded-xl overflow-hidden bg-black shadow-xl group mobile-project-hover transition-all duration-500 will-change-transform ${
      index % 2 === 0 ? 'hover:-rotate-1' : 'hover:rotate-1'
    }`} style={{ transformStyle: 'preserve-3d' }}>
      <div
        className="absolute inset-0 bg-cover bg-center brightness-75 grayscale group-hover:brightness-50 group-hover:grayscale-0 transition-all duration-300 rounded-xl"
        style={{ backgroundImage: `url('${project.image}')` }}
      />
              
      <div className="absolute inset-0 flex items-end justify-end p-4 opacity-100 group-hover:opacity-0 transition-opacity duration-300 z-10">
        <h3 className="text-white text-lg font-bold writing-vertical border-t-4 border-yellow-400 p-2 mr-6">
          {project.title}
        </h3>
      </div>
             
      <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white space-y-2 rounded-xl">
        <span className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full w-fit">
          {project.status}
        </span>
        <h3 className="text-xl font-bold">{project.title}</h3>
        <p className="text-sm text-gray-200">{project.description}</p>
        <div className="flex flex-wrap gap-2 text-xs">
          {project.tech.map((tech, techIndex) => (
            <span 
              key={techIndex}
              className="px-2 py-1 border border-white/30 rounded bg-white/10 backdrop-blur"
            >
              {tech}
            </span>
          ))}
        </div>
        <a 
          href={`/projects/${project.slug}`}
          className="text-yellow-400 text-sm font-bold hover:text-white transition"
        >
          View Project →
        </a>
      </div>
    </article>
  );
};

export default ProjectCard;