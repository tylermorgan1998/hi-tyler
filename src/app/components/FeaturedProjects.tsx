import { useColor } from "../contexts/ColorContext";
import { projectsData } from "../data/projects";

interface FeaturedProjectsProps {
  onProjectClick: (projectId: string) => void;
}

export function FeaturedProjects({ onProjectClick }: FeaturedProjectsProps) {
  const { accentColor } = useColor();

  return (
    // Width and side padding match the FigmaWindow hero above
    <section id="featured-projects" className="w-full max-w-[1400px] mx-auto px-2 sm:px-4 pb-24 flex flex-col gap-5 scroll-mt-6">
      {projectsData.map((project) => (
        // The whole card opens the case study
        <article
          key={project.id}
          role="link"
          tabIndex={0}
          aria-label={`Read the ${project.title} case study`}
          onClick={() => onProjectClick(project.id)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onProjectClick(project.id);
            }
          }}
          className="group bg-[#232426] hover:bg-[#28292c] rounded-2xl p-2 sm:p-3 flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-20 cursor-pointer transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ outlineColor: accentColor }}
        >
          {/* Left: image on a colored panel */}
          <div
            className={`${project.bgColor} lg:w-[47%] shrink-0 aspect-[16/10] rounded-xl overflow-hidden flex items-center justify-center p-6 sm:p-10 shadow-lg transition-transform duration-300 group-hover:scale-[1.01]`}
          >
            <img
              src={project.cardImage ?? project.coverImage ?? `https://images.unsplash.com/photo-${project.images[0]}?w=900&h=560&fit=crop`}
              alt=""
              className="max-w-full max-h-full object-contain rounded-md"
            />
          </div>

          {/* Right: tags, title, description, link */}
          <div className="flex flex-col items-start px-3 pb-5 lg:px-0 lg:pb-12 lg:pr-8">
            <div className="flex flex-wrap gap-1.5">
              {(project.tags ?? [project.category]).map(tag => (
                <span key={tag} className="text-xs px-3 py-1 border border-[#444] rounded-full text-[#aaa]">
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-white text-4xl sm:text-5xl font-semibold leading-tight mt-5">
              {project.title}
            </h2>
            <p className="text-[#d7d7d7] text-lg leading-relaxed mt-4 max-w-md">
              {project.description}
            </p>
            <span
              className="mt-5 text-lg group-hover:underline underline-offset-4"
              style={{ color: accentColor }}
            >
              Read case study
            </span>
          </div>
        </article>
      ))}
    </section>
  );
}
