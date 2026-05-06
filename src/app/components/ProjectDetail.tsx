import {
  ArrowLeft, Info, AlertTriangle, Target, Monitor, MessageSquare,
  Calendar, Palette, Settings, Star, Users, FilePlus, LayoutDashboard,
  User, Folder, Briefcase, TrendingUp, LucideIcon
} from "lucide-react";
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
  metrics?: { value: string; label: string; description?: string }[];
}

interface ProjectDetailProps {
  project: ProjectData;
  onBack: () => void;
}

const SECTION_ICONS: Record<string, LucideIcon> = {
  "summary": Info,
  "the problem": AlertTriangle,
  "design goals": Target,
  "home screen": Monitor,
  "dashboard": LayoutDashboard,
  "task creation": FilePlus,
  "chat & communication": MessageSquare,
  "event scheduling": Calendar,
  "personalization": Palette,
  "self-service tools": Settings,
  "feedback": Star,
  "company walkthrough": Users,
};

function getIcon(subheading?: string): LucideIcon {
  if (!subheading) return Info;
  return SECTION_ICONS[subheading.toLowerCase()] ?? Info;
}

function ChapterHeader({ subheading }: { subheading?: string }) {
  if (!subheading) return null;
  const Icon = getIcon(subheading);
  return (
    <div className="mb-8 mt-16">
      <div className="flex items-start justify-between mb-3">
        <h2 className="text-[#111] text-3xl sm:text-4xl font-bold leading-tight capitalize">
          {subheading}
        </h2>
        <Icon size={28} className="text-[#ccc] mt-1 shrink-0 ml-4" />
      </div>
      <div className="border-t border-[#e0e0e0]" />
    </div>
  );
}

function SectionBlock({ section, accentColor }: { section: ProjectSection; accentColor: string }) {
  const paragraphs = Array.isArray(section.paragraph) ? section.paragraph : [section.paragraph];

  return (
    <div className="mb-12">
      <ChapterHeader subheading={section.subheading} />

      <div className="max-w-2xl mt-8">
        <h3 className="text-[#111] text-xl sm:text-2xl font-semibold leading-snug mb-4">
          {section.heading}
        </h3>
        {paragraphs.map((para, i) => (
          <p key={i} className="text-[#555] text-base leading-relaxed mb-4 whitespace-pre-line">
            {para}
          </p>
        ))}
      </div>

      {section.images && section.images.length > 0 && (
        <div className={`mt-10 ${section.images.length === 1 ? "-mx-4 sm:-mx-6 lg:-mx-16" : ""}`}>
          {section.images.length === 1 ? (
            <ImageWithFallback
              src={`https://images.unsplash.com/photo-${section.images[0]}?w=1400&h=788&fit=crop&q=85`}
              alt={section.heading}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          ) : (
            <div className={`grid gap-3 ${section.images.length === 2 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3"}`}>
              {section.images.map((id, i) => (
                <div key={i} className="rounded-xl overflow-hidden aspect-video bg-[#eee]">
                  <ImageWithFallback
                    src={`https://images.unsplash.com/photo-${id}?w=800&h=450&fit=crop&q=85`}
                    alt={`Image ${i + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  const { accentColor } = useColor();

  return (
    <div className="w-full max-w-[820px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">

      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#999] hover:text-[#111] transition-colors mb-14 group text-sm"
      >
        <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
        All work
      </button>

      {/* Giant title */}
      <h1 className="text-[#111] text-5xl sm:text-7xl lg:text-8xl font-bold leading-none tracking-tight mb-6">
        {project.title}
      </h1>

      {/* Description — bold black intro + accent colored follow-on */}
      <p className="text-[#111] text-lg sm:text-xl font-semibold leading-relaxed max-w-2xl mb-3">
        {project.description}
      </p>

      {project.sections?.[0] && (
        <p className="text-base leading-relaxed max-w-2xl mb-14" style={{ color: accentColor }}>
          {Array.isArray(project.sections[0].paragraph)
            ? project.sections[0].paragraph[0]
            : project.sections[0].paragraph}
        </p>
      )}

      {/* 2×2 info grid */}
      <div className="grid grid-cols-2 border border-[#e0e0e0] rounded-2xl overflow-hidden mb-16 text-sm">
        <div className="p-6 border-r border-b border-[#e0e0e0]">
          <div className="flex items-center gap-2 mb-2">
            <User size={12} className="text-[#999]" />
            <span className="text-[#999] text-xs uppercase tracking-widest font-medium">My Role</span>
          </div>
          <p className="text-[#111] font-medium">{project.role}</p>
        </div>
        <div className="p-6 border-b border-[#e0e0e0]">
          <div className="flex items-center gap-2 mb-2">
            <Folder size={12} className="text-[#999]" />
            <span className="text-[#999] text-xs uppercase tracking-widest font-medium">Category</span>
          </div>
          <p className="text-[#111] font-medium">{project.category}</p>
        </div>
        <div className="p-6 border-r border-[#e0e0e0]">
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={12} className="text-[#999]" />
            <span className="text-[#999] text-xs uppercase tracking-widest font-medium">Year</span>
          </div>
          <p className="text-[#111] font-medium">{project.year}</p>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={12} className="text-[#999]" />
            <span className="text-[#999] text-xs uppercase tracking-widest font-medium">Impact</span>
          </div>
          {project.metrics?.[0] ? (
            <p className="text-[#111] font-medium">{project.metrics[0].value} {project.metrics[0].description}</p>
          ) : (
            <p className="text-[#111] font-medium">End-to-end Design</p>
          )}
        </div>
      </div>

      {/* Hero image — full bleed */}
      <div className="-mx-4 sm:-mx-6 lg:-mx-8 mb-16 bg-[#eee]">
        <ImageWithFallback
          src={`https://images.unsplash.com/photo-${project.images[0]}?w=1600&h=900&fit=crop&q=90`}
          alt={project.title}
          className="w-full h-auto object-cover"
          loading="eager"
        />
      </div>

      {/* Metrics row */}
      {project.metrics && project.metrics.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 border border-[#e0e0e0] rounded-2xl overflow-hidden mb-16 text-sm">
          {project.metrics.map((m, i) => (
            <div key={i} className={`p-6 ${i > 0 ? "border-l border-[#e0e0e0]" : ""}`}>
              <p className="text-[#111] text-3xl sm:text-4xl font-bold mb-1">{m.value}</p>
              <p className="text-[#999] text-xs leading-snug">{m.description || m.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skip first section (already shown as intro text above) */}
      {project.sections?.slice(1).map((section, i) => (
        <SectionBlock key={i} section={section} accentColor={accentColor} />
      ))}

      {/* Breaker */}
      {project.breakerText && (
        <div className="border-t border-b border-[#e0e0e0] py-14 my-8">
          <p className="text-[#111] text-2xl sm:text-3xl font-semibold leading-relaxed">
            "{project.breakerText}"
          </p>
        </div>
      )}

      {/* Post-breaker sections */}
      {project.sectionsAfterBreaker?.map((section, i) => (
        <SectionBlock key={i} section={section} accentColor={accentColor} />
      ))}

      {/* Bottom back */}
      <div className="border-t border-[#e0e0e0] mt-16 pt-10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#999] hover:text-[#111] transition-colors group text-sm"
        >
          <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
          Back to all work
        </button>
      </div>
    </div>
  );
}
