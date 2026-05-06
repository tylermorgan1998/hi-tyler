import { ImageWithFallback } from "./figma/ImageWithFallback";
import { projectsData } from "../data/projects";

interface FeaturedProjectsProps {
  onProjectClick: (projectId: string) => void;
}

export function FeaturedProjects({ onProjectClick }: FeaturedProjectsProps) {
  const projects = [
    {
      title: "Nexus",
      description: "Creating a more personal, less frustrating way to get tech support",
      imageQuery: "tech support",
      id: "nexus",
    },
    {
      title: "Tribe.so Admin onboarding",
      description: "Increase user engagment",
      imageQuery: "dashboard interface",
      id: "tribe-so-admin",
    },
    {
      title: "Lendscape",
      description: "Lend and Borrow Dashboard",
      imageQuery: "crypto dashboard",
      id: "lendscape",
    },
    {
      title: "Flop App",
      description: "Social media for poker players",
      imageQuery: "mobile app poker",
      id: "flop-app",
    },
  ];

  return (
    <div id="featured-projects" className="w-full py-12 sm:py-16 lg:py-20">
      <h2 className="text-gray-400 text-center mb-8 sm:mb-12">Featured Projects</h2>
      
      <div className="flex flex-col gap-12 sm:gap-16 max-w-[900px] mx-auto px-4">
        {projects.map((project, index) => (
          <div
            key={index}
            onClick={() => onProjectClick(project.id)}
            className="group cursor-pointer transition-transform hover:scale-[1.01]"
          >
            {/* Image area - white/light background card */}
            <div className="bg-[#f5f5f5] rounded-2xl p-8 sm:p-12 lg:p-16 flex items-center justify-center min-h-[300px] sm:min-h-[400px] mb-4">
              <div className="w-full max-w-[300px] sm:max-w-[400px]">
                <ImageWithFallback
                  src={index === 0 ? "https://i.imgur.com/9hBZYWL.jpeg" : `https://images.unsplash.com/photo-${getUnsplashId(index)}?w=600&h=400&fit=crop`}
                  alt={project.title}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            {/* Text area - on dark background below card */}
            <div className="px-2">
              <h3 className="text-white mb-1">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper function to get different placeholder images
function getUnsplashId(index: number): string {
  const ids = [
    "1551288049-29ac87e57e47", // tech support
    "1460925895917-afdab827c52f", // dashboard
    "1551288049-29ac87e57e47", // crypto/finance
    "1512941937669-90a1b58e7e9c", // mobile app
  ];
  return ids[index];
}