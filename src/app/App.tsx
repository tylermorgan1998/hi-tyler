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
      <div className="bg-[#18191B]">
        {selectedProject ? (
          <div className="min-h-screen bg-[#fafaf8]">
            <ProjectDetail project={selectedProject} onBack={handleBackToProjects} />
          </div>
        ) : (
          <>
            <section className="min-h-screen flex flex-col items-center justify-center px-2 sm:px-4 py-8 gap-12">
              <FigmaWindow />
              <svg width="20" height="12" viewBox="0 0 20 12" fill="none" className="text-gray-500 animate-bounce">
                <path d="M1 1L10 10L19 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </section>
            <FeaturedProjects onProjectClick={handleProjectClick} />
          </>
        )}
      </div>
    </ColorProvider>
  );
}