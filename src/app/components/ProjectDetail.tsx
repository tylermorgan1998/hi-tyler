import { ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useEffect, useRef, useState } from "react";

interface ProjectSection {
  subheading?: string;
  heading: string;
  paragraph: string | string[];
  images?: string[];
}

interface ProjectData {
  id: string;
  title: string;
  description: string;
  category: string;
  year: string;
  role: string;
  bgColor: string;
  imageQuery: string;
  overview?: string;
  challenge?: string;
  solution?: string;
  results?: string[];
  images: string[];
  // New structure for flexible content
  sections?: ProjectSection[];
  breakerText?: string;
  sectionsAfterBreaker?: ProjectSection[];
  // Add metrics for impact
  metrics?: {
    value: string;
    label: string;
    description?: string;
  }[];
}

interface ProjectDetailProps {
  project: ProjectData;
  onBack: () => void;
}

export function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      const element = contentRef.current;
      const totalScroll = element.scrollHeight - element.clientHeight;
      const currentScroll = element.scrollTop;
      const progress = (currentScroll / totalScroll) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    const element = contentRef.current;
    if (element) {
      element.addEventListener('scroll', handleScroll);
      return () => element.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Use new flexible structure if available
  if (project.sections) {
    const totalSections = (project.sections?.length || 0) + (project.sectionsAfterBreaker?.length || 0);
    
    return (
      <div ref={contentRef} className="w-full h-full overflow-y-auto scroll-smooth">
        {/* Reading progress bar */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-[#2c2c2c] z-50">
          <div 
            className="h-full bg-gradient-to-r from-[#18a0fb] to-[#0fa] transition-all duration-300"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <div className="w-full py-6 sm:py-8 lg:py-12">
          {/* Back button - in narrow column */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 sm:mb-8 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to projects</span>
            </button>
          </div>

          {/* Hero section - in narrow column */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
            <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6 leading-tight">
              {project.title}
            </h1>
            <p className="text-gray-400 text-lg sm:text-xl lg:text-2xl leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Impact metrics - if available */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20 lg:mb-24">
              {/* ... remove this code ... */}
            </div>
          )}

          {/* Featured image - full width edge to edge with parallax effect */}
          <div className="mb-16 sm:mb-20 lg:mb-24 relative overflow-hidden">
            <div className="aspect-[16/9] w-full">
              <ImageWithFallback
                src={`https://images.unsplash.com/photo-${project.images[0]}?w=1600&h=900&fit=crop&q=85`}
                alt={project.title}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </div>

          {/* Dynamic sections with enhanced styling */}
          {project.sections?.map((section, index) => (
            <section 
              key={index} 
              className="mb-16 sm:mb-20 lg:mb-24 relative"
              data-section={index}
            >
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10">
                {section.subheading && (
                  <p className="text-[#18a0fb] text-xs sm:text-sm uppercase tracking-[0.2em] mb-3 sm:mb-4 font-medium">
                    {section.subheading}
                  </p>
                )}
                <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl mb-6 sm:mb-8 leading-tight">
                  {section.heading}
                </h2>
                {Array.isArray(section.paragraph) ? (
                  section.paragraph.map((para, pIndex) => (
                    <p key={pIndex} className="text-gray-300 text-base sm:text-lg lg:text-xl leading-relaxed mb-6 whitespace-pre-line">
                      {para}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-300 text-base sm:text-lg lg:text-xl leading-relaxed whitespace-pre-line">
                    {section.paragraph}
                  </p>
                )}
              </div>
              
              {/* Optional images - enhanced presentation */}
              {section.images && section.images.length > 0 && (
                <div className="my-12 sm:my-16 lg:my-20">
                  <div className={`grid gap-6 sm:gap-8 lg:gap-10 ${
                    section.images.length === 1 ? 'grid-cols-1 max-w-5xl mx-auto' : 
                    section.images.length === 2 ? 'grid-cols-1 lg:grid-cols-2 max-w-6xl mx-auto px-4' :
                    'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-4'
                  }`}>
                    {section.images.map((imageId, imgIndex) => (
                      <div
                        key={imgIndex}
                        className="relative overflow-hidden bg-[#1a1a1a] rounded-xl"
                      >
                        <div className="aspect-video relative overflow-hidden">
                          <ImageWithFallback
                            src={`https://images.unsplash.com/photo-${imageId}?w=1000&h=750&fit=crop&q=90`}
                            alt={`${section.heading} - Image ${imgIndex + 1}`}
                            className="w-full h-full object-cover opacity-0 animate-fadeIn"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          ))}

          {/* Breaker text - enhanced styling */}
          {project.breakerText && (
            <div className="my-20 sm:my-24 lg:my-32 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative">
                <div className="absolute -left-4 top-0 text-[#18a0fb]/20 text-8xl sm:text-9xl leading-none font-serif">"</div>
                <p className="text-white text-2xl sm:text-3xl lg:text-4xl leading-relaxed text-center relative z-10 py-8">
                  {project.breakerText}
                </p>
              </div>
            </div>
          )}

          {/* Sections after breaker - enhanced styling */}
          {project.sectionsAfterBreaker?.map((section, index) => {
            return (
              <section 
                key={`after-${index}`} 
                className="mb-16 sm:mb-20 lg:mb-24 relative"
              >
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10">
                  {section.subheading && (
                    <p className="text-[#18a0fb] text-xs sm:text-sm uppercase tracking-[0.2em] mb-3 sm:mb-4 font-medium">
                      {section.subheading}
                    </p>
                  )}
                  <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl mb-6 sm:mb-8 leading-tight">
                    {section.heading}
                  </h2>
                  {Array.isArray(section.paragraph) ? (
                    section.paragraph.map((para, pIndex) => (
                      <p key={pIndex} className="text-gray-300 text-base sm:text-lg lg:text-xl leading-relaxed mb-6 whitespace-pre-line">
                        {para}
                      </p>
                    ))
                  ) : (
                    <p className="text-gray-300 text-base sm:text-lg lg:text-xl leading-relaxed whitespace-pre-line">
                      {section.paragraph}
                    </p>
                  )}
                </div>
                
                {/* Optional images - enhanced presentation */}
                {section.images && section.images.length > 0 && (
                  <div className="my-12 sm:my-16 lg:my-20">
                    <div className={`grid gap-6 sm:gap-8 lg:gap-10 ${
                      section.images.length === 1 ? 'grid-cols-1 max-w-5xl mx-auto' : 
                      section.images.length === 2 ? 'grid-cols-1 lg:grid-cols-2 max-w-6xl mx-auto px-4' :
                      'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-4'
                    }`}>
                      {section.images.map((imageId, imgIndex) => (
                        <div
                          key={imgIndex}
                          className="relative overflow-hidden bg-[#1a1a1a] rounded-xl"
                        >
                          <div className="aspect-video relative overflow-hidden">
                            <ImageWithFallback
                              src={`https://images.unsplash.com/photo-${imageId}?w=1000&h=750&fit=crop&q=90`}
                              alt={`${section.heading} - Image ${imgIndex + 1}`}
                              className="w-full h-full object-cover opacity-0 animate-fadeIn"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            );
          })}

          {/* Back button at bottom - enhanced */}
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center pt-12 sm:pt-16 pb-8">
              <button
                onClick={onBack}
                className="group bg-gradient-to-br from-[#2c2c2c] to-[#1a1a1a] text-white px-8 py-4 rounded-xl hover:from-[#383838] hover:to-[#2c2c2c] transition-all duration-300 border border-[#404040] hover:border-[#18a0fb] flex items-center gap-3 shadow-lg hover:shadow-xl hover:shadow-[#18a0fb]/10"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="text-base">Back to all projects</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Original template for projects without sections
  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 sm:mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to projects</span>
        </button>

        {/* Hero section */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-wrap gap-3 sm:gap-4 mb-4 sm:mb-6">
            <span className="px-3 py-1 bg-[#2c2c2c] text-gray-300 rounded-full text-xs sm:text-sm">
              {project.category}
            </span>
            <span className="px-3 py-1 bg-[#2c2c2c] text-gray-300 rounded-full text-xs sm:text-sm">
              {project.year}
            </span>
            <span className="px-3 py-1 bg-[#2c2c2c] text-gray-300 rounded-full text-xs sm:text-sm">
              {project.role}
            </span>
          </div>

          <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl mb-3 sm:mb-4">
            {project.title}
          </h1>
          <p className="text-gray-400 text-base sm:text-lg lg:text-xl">
            {project.description}
          </p>
        </div>

        {/* Featured image */}
        <div className={`${project.bgColor} rounded-2xl overflow-hidden mb-8 sm:mb-12 lg:mb-16`}>
          <div className="aspect-video w-full">
            <ImageWithFallback
              src={`https://images.unsplash.com/photo-${project.images[0]}?w=1200&h=675&fit=crop`}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Overview */}
        <section className="mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-white text-xl sm:text-2xl lg:text-3xl mb-4 sm:mb-6">
            Overview
          </h2>
          <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed">
            {project.overview}
          </p>
        </section>

        {/* Challenge */}
        <section className="mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-white text-xl sm:text-2xl lg:text-3xl mb-4 sm:mb-6">
            The Challenge
          </h2>
          <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed">
            {project.challenge}
          </p>
        </section>

        {/* Solution with images */}
        <section className="mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-white text-xl sm:text-2xl lg:text-3xl mb-4 sm:mb-6">
            The Solution
          </h2>
          <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8">
            {project.solution}
          </p>

          {/* Image grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {project.images.slice(1, 3).map((imageId, index) => (
              <div
                key={index}
                className="bg-[#2c2c2c] rounded-xl overflow-hidden aspect-[4/3]"
              >
                <ImageWithFallback
                  src={`https://images.unsplash.com/photo-${imageId}?w=800&h=600&fit=crop`}
                  alt={`${project.title} detail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Results */}
        {project.results && (
          <section className="mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-white text-xl sm:text-2xl lg:text-3xl mb-4 sm:mb-6">
              Results & Impact
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {project.results.map((result, index) => (
                <div
                  key={index}
                  className="bg-[#2c2c2c] rounded-xl p-4 sm:p-6 border border-[#404040]"
                >
                  <div className="text-[#18a0fb] text-2xl sm:text-3xl lg:text-4xl mb-2">
                    {result.split(" ")[0]}
                  </div>
                  <p className="text-gray-300 text-xs sm:text-sm">
                    {result.split(" ").slice(1).join(" ")}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Full width image */}
        <section className="mb-8 sm:mb-12">
          <div className="bg-[#2c2c2c] rounded-2xl overflow-hidden aspect-video">
            <ImageWithFallback
              src={`https://images.unsplash.com/photo-${project.images[3] || project.images[0]}?w=1200&h=675&fit=crop`}
              alt={`${project.title} showcase`}
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Back button at bottom */}
        <div className="flex justify-center pt-8 sm:pt-12">
          <button
            onClick={onBack}
            className="bg-[#2c2c2c] text-white px-6 py-3 rounded-lg hover:bg-[#383838] transition-colors border border-[#404040] flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to all projects
          </button>
        </div>
      </div>
    </div>
  );
}