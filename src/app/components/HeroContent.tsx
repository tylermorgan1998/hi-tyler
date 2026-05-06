import { TypewriterText } from "./TypewriterText";

export function HeroContent() {
  return (
    <div className="text-center max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
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

    </div>
  );
}