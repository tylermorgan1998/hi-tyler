import { TypewriterText } from "./TypewriterText";

export function HeroContent() {
  return (
    <div className="text-center max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Available badge */}
      <div className="inline-flex items-center gap-2 bg-[#2c2c2c]/80 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-6 sm:mb-8 border border-[#404040]">
        <div className="w-2 h-2 bg-[#28c840] rounded-full animate-pulse"></div>
        <span className="text-[#b3b3b3] text-xs sm:text-sm">Available for work</span>
      </div>

      {/* Main heading */}
      <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
        Hi <span className="inline-block animate-wave">👋</span> I'm Tyler
      </h1>

      {/* Subheading with typewriter effect */}
      <div className="text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8">
        <span className="text-[#b3b3b3]">I am a </span>
        <TypewriterText />
        <span className="text-[#b3b3b3]"> designer</span>
      </div>

      {/* Description */}
      <p className="text-[#8a8a8a] text-base sm:text-lg mb-8 sm:mb-10 max-w-xl mx-auto px-4">
        Crafting beautiful and intuitive digital experiences that users love
      </p>

      {/* CTA Buttons */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap px-4">
        <button 
          onClick={() => {
            const projectsSection = document.getElementById('featured-projects');
            projectsSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          className="bg-white text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-lg text-sm sm:text-base"
        >
          View my work
        </button>
        <button className="bg-[#2c2c2c] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-[#383838] transition-colors border border-[#404040] text-sm sm:text-base">
          Contact me
        </button>
      </div>
    </div>
  );
}