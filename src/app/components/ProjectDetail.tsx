import { ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useColor } from "../contexts/ColorContext";

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
  sections?: ProjectSection[];
  breakerText?: string;
  sectionsAfterBreaker?: ProjectSection[];
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

function SectionBlock({ section, accentColor }: { section: ProjectSection; accentColor: string }) {
  return (
    <div className="border-t border-[#222] pt-12 pb-4">
      <div className="max-w-2xl">
        {section.subheading && (
          <p className="text-xs uppercase tracking-[0.2em] mb-4 font-medium" style={{ color: accentColor }}>
            {section.subheading}
          </p>
        )}
        <h2 className="text-white text-2xl sm:text-3xl font-semibold leading-snug mb-6">
          {section.heading}
        </h2>
        {Array.isArray(section.paragraph) ? (
          section.paragraph.map((para, i) => (
            <p key={i} className="text-[#888] text-base leading-relaxed mb-5 whitespace-pre-line">
              {para}
            </p>
          ))
        ) : (
          <p className="text-[#888] text-base leading-relaxed whitespace-pre-line">
            {section.paragraph}
          </p>
        )}
      </div>

      {section.images && section.images.length > 0 && (
        <div className={`mt-10 grid gap-4 ${
          section.images.length === 1 ? 'grid-cols-1' :
          section.images.length === 2 ? 'grid-cols-1 sm:grid-cols-2' :
          'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        }`}>
          {section.images.map((imageId, i) => (
            <div key={i} className="bg-[#1a1a1a] rounded-2xl overflow-hidden aspect-video">
              <ImageWithFallback
                src={`https://images.unsplash.com/photo-${imageId}?w=900&h=506&fit=crop&q=85`}
                alt={`${section.heading} ${i + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  const { accentColor } = useColor();

  return (
    <div className="w-full max-w-[860px] mx-auto px-4 sm:px-6 py-10 sm:py-16">

      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#555] hover:text-white transition-colors mb-12 group text-sm"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        All work
      </button>

      {/* Title block */}
      <div className="mb-10">
        <h1 className="text-white text-4xl sm:text-5xl font-semibold leading-tight mb-4">
          {project.title}
        </h1>
        <p className="text-[#888] text-lg leading-relaxed max-w-xl">
          {project.description}
        </p>
      </div>

      {/* Metadata row */}
      <div className="flex flex-wrap gap-x-10 gap-y-3 mb-14 border-t border-b border-[#222] py-5">
        <div>
          <p className="text-[#555] text-xs uppercase tracking-widest mb-1">Role</p>
          <p className="text-white text-sm">{project.role}</p>
        </div>
        <div>
          <p className="text-[#555] text-xs uppercase tracking-widest mb-1">Category</p>
          <p className="text-white text-sm">{project.category}</p>
        </div>
        <div>
          <p className="text-[#555] text-xs uppercase tracking-widest mb-1">Year</p>
          <p className="text-white text-sm">{project.year}</p>
        </div>
      </div>

      {/* Hero image */}
      <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden mb-16">
        <div className="aspect-[16/9]">
          <ImageWithFallback
            src={`https://images.unsplash.com/photo-${project.images[0]}?w=1400&h=788&fit=crop&q=85`}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
      </div>

      {/* Metrics */}
      {project.metrics && project.metrics.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-16 border-t border-b border-[#222] py-10">
          {project.metrics.map((metric, i) => (
            <div key={i}>
              <p className="text-white text-3xl sm:text-4xl font-semibold mb-1">{metric.value}</p>
              <p className="text-[#555] text-xs leading-snug">{metric.description || metric.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Sections */}
      <div className="space-y-12">
        {project.sections?.map((section, i) => (
          <SectionBlock key={i} section={section} accentColor={accentColor} />
        ))}
      </div>

      {/* Breaker quote */}
      {project.breakerText && (
        <div className="border-t border-[#222] py-16 my-4">
          <p className="text-white text-2xl sm:text-3xl font-semibold leading-relaxed max-w-2xl">
            "{project.breakerText}"
          </p>
        </div>
      )}

      {/* Sections after breaker */}
      {project.sectionsAfterBreaker && project.sectionsAfterBreaker.length > 0 && (
        <div className="space-y-12">
          {project.sectionsAfterBreaker.map((section, i) => (
            <SectionBlock key={i} section={section} accentColor={accentColor} />
          ))}
        </div>
      )}

      {/* Back button */}
      <div className="border-t border-[#222] mt-16 pt-12">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#555] hover:text-white transition-colors group text-sm"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to all work
        </button>
      </div>
    </div>
  );
}
