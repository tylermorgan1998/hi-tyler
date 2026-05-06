import { useState } from "react";
import { FigmaToolbar } from "./FigmaToolbar";
import { FigmaSidebar } from "./FigmaSidebar";
import { FigmaDesignPanel } from "./FigmaDesignPanel";
import { HeroContent } from "./HeroContent";
import { AboutContent } from "./AboutContent";
import { BlockBreakContent } from "./BlockBreakContent";
import { useColor } from "../contexts/ColorContext";

export function FigmaWindow() {
  const [activeTab, setActiveTab] = useState<"home" | "about" | "game">("home");
  const [contentVisible, setContentVisible] = useState(true);
  const { accentColor } = useColor();

  const handleTabChange = (tab: "home" | "about" | "game") => {
    setContentVisible(false);
    setTimeout(() => {
      setActiveTab(tab);
      setTimeout(() => setContentVisible(true), 50);
    }, 200);
  };

  return (
    <div className={`w-full bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl transition-all duration-300 ${activeTab === "game" ? "max-w-[95vw]" : "max-w-[1400px]"}`}>
      {/* Window controls and toolbar */}
      <div className="bg-[#2c2c2c] px-2 sm:px-4 py-2 sm:py-3 flex items-center justify-between border-b border-[#1a1a1a]">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* macOS window controls */}
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#ff5f56] rounded-full"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#ffbd2e] rounded-full"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#27c93f] rounded-full"></div>
          </div>
          
          {/* Figma logo and file name */}
          <div className="flex items-center gap-1.5 sm:gap-2 ml-2 sm:ml-4">
            <span className="text-white text-xs sm:text-sm hidden sm:inline">Tyler's Portfolio</span>
            <span className="text-white text-xs sm:hidden">Portfolio</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <div
            className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: accentColor }}
          >
            <span className="text-white font-bold text-xs sm:text-sm select-none">T</span>
          </div>
        </div>
      </div>

      <FigmaToolbar activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Main content area */}
      <div className="flex flex-col lg:flex-row h-full">
        <div className={`transition-all duration-500 ease-in-out overflow-hidden hidden lg:block ${activeTab === "about" || activeTab === "game" ? "w-0" : "w-56"}`}>
          <FigmaSidebar />
        </div>
        
        {/* Canvas area */}
        <div 
          className={`flex-1 bg-[#1e1e1e] p-4 sm:p-6 lg:p-8 relative min-h-[720px] flex items-center justify-center ${activeTab === "game" ? "overflow-x-auto" : "overflow-x-hidden"}`}
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        >
          <div className={`transition-opacity duration-300 w-full ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
            {activeTab === "home" ? (
              <HeroContent />
            ) : activeTab === "about" ? (
              <AboutContent />
            ) : (
              <BlockBreakContent />
            )}
          </div>
          
          {/* Scroll indicator - only show on home */}
          {activeTab === "home" && (
            <div className={`absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-300 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
              <span className="text-gray-500 text-xs">Scroll to explore</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gray-500 animate-bounce">
                <path d="M10 3V17M10 17L15 12M10 17L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
        </div>

        <div className={`transition-all duration-500 ease-in-out overflow-hidden hidden lg:block ${activeTab === "about" || activeTab === "game" ? "w-0" : "w-56"}`}>
          <FigmaDesignPanel />
        </div>
      </div>
    </div>
  );
}