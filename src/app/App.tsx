import { useState } from "react";
import { FigmaWindow } from "./components/FigmaWindow";
import { FeaturedProjects } from "./components/FeaturedProjects";
import { ProjectDetail } from "./components/ProjectDetail";
import { projectsData } from "./data/projects";
import { ColorProvider } from "./contexts/ColorContext";

export default function App() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const selectedProject = selectedProjectId 
    ? projectsData.find(p => p.id === selectedProjectId) 
    : null;

  const handleProjectClick = (projectId: string) => {
    setSelectedProjectId(projectId);
    // Scroll to top when opening project
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToProjects = () => {
    setSelectedProjectId(null);
  };

  return (
    <ColorProvider>
      <div className="min-h-screen bg-[#18191B]">
        <main className="flex flex-col items-center justify-center px-2 sm:px-4 py-4 sm:py-8">
          {selectedProject ? (
            // Show project detail without browser wrapper
            <div className="w-full max-w-[1400px]">
              <ProjectDetail project={selectedProject} onBack={handleBackToProjects} />
            </div>
          ) : (
            // Show normal portfolio view
            <>
              <FigmaWindow />
              <FeaturedProjects onProjectClick={handleProjectClick} />
            </>
          )}
        </main>
      </div>
    </ColorProvider>
  );
}