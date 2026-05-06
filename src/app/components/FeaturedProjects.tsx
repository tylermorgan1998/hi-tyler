import { useColor } from "../contexts/ColorContext";
import { projectsData } from "../data/projects";

interface FeaturedProjectsProps {
  onProjectClick: (projectId: string) => void;
}

export function FeaturedProjects({ onProjectClick }: FeaturedProjectsProps) {
  const { accentColor } = useColor();

  return (
    <section id="featured-projects" className="w-full max-w-[1200px] mx-auto px-4 sm:px-8 pb-24">
      {projectsData.map((project) => (
        <div key={project.id} className="border-t border-[#2a2a2a] py-14 sm:py-20">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

            {/* Left: text */}
            <div className="lg:w-[34%] flex flex-col gap-4">
              <h2 className="text-white text-2xl sm:text-3xl font-semibold leading-tight">
                {project.title}
              </h2>
              <p className="text-[#888] text-sm leading-relaxed">
                {project.description}
              </p>
              <span className="text-sm font-medium" style={{ color: accentColor }}>
                {project.role}
              </span>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-3 py-1 border border-[#333] rounded-full text-[#666]">
                  {project.category}
                </span>
                <span className="text-xs px-3 py-1 border border-[#333] rounded-full text-[#666]">
                  {project.year}
                </span>
              </div>
              <button
                onClick={() => onProjectClick(project.id)}
                className="mt-2 flex items-center gap-2 text-sm text-[#888] hover:text-white transition-colors w-fit group"
              >
                View Case Study
                <span className="w-5 h-5 rounded-full border border-[#555] flex items-center justify-center group-hover:border-white transition-colors">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M2 6L6 2M6 2H3M6 2V5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
            </div>

            {/* Right: image */}
            <div
              className="lg:w-[66%] bg-[#f0f0ee] rounded-2xl overflow-hidden relative cursor-pointer"
              onClick={() => onProjectClick(project.id)}
            >
              <div className="p-6 sm:p-10 min-h-[280px] sm:min-h-[380px] flex items-center justify-center">
                <img
                  src={`https://images.unsplash.com/photo-${project.images[0]}?w=900&h=560&fit=crop`}
                  alt={project.title}
                  className="w-full h-auto rounded-lg object-cover shadow-sm"
                />
              </div>
              <span className="absolute bottom-4 right-5 text-[#bbb] text-xs tracking-widest">
                {project.year}
              </span>
            </div>

          </div>
        </div>
      ))}
    </section>
  );
}
