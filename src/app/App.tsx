import { useState } from "react";
import { FigmaWindow, type WindowTab } from "./components/FigmaWindow";
import { WhatIDo } from "./components/WhatIDo";
import { AboutStory } from "./components/AboutStory";
import { FeaturedProjects } from "./components/FeaturedProjects";
import { ProjectDetail } from "./components/ProjectDetail";
import { projectsData } from "./data/projects";
import { ColorProvider } from "./contexts/ColorContext";

export default function App() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [windowTab, setWindowTab] = useState<WindowTab>("home");

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
    // The window remounts on its Home tab
    setWindowTab("home");
  };

  const onAbout = windowTab === "about";

  return (
    <ColorProvider>
      <div className="bg-[#18191B]">
        {selectedProject ? (
          <main className="flex flex-col items-center justify-center px-2 sm:px-4 py-4 sm:py-8">
            <div className="w-full max-w-[1400px]">
              <ProjectDetail project={selectedProject} onBack={handleBackToProjects} />
            </div>
          </main>
        ) : (
          <>
            <section className="min-h-screen flex flex-col items-center justify-center px-2 sm:px-4 py-8 gap-12">
              <FigmaWindow onActiveTabChange={setWindowTab} />
              {onAbout ? (
                <div className="w-full animate-in fade-in duration-500 mt-8 pb-24 flex flex-col gap-32 sm:gap-40">
                  <WhatIDo />
                  <AboutStory />
                </div>
              ) : (
                <svg width="20" height="12" viewBox="0 0 20 12" fill="none" className="text-gray-500 animate-bounce">
                  <path d="M1 1L10 10L19 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </section>
            {!onAbout && <FeaturedProjects onProjectClick={handleProjectClick} />}
          </>
        )}
      </div>
    </ColorProvider>
  );
}