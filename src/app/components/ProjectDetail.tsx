import {
  ArrowLeft, Info, AlertTriangle, Target, Monitor, MessageSquare,
  Calendar, Palette, Settings, Star, Users, FilePlus, LayoutDashboard,
  User, Folder, Briefcase, LucideIcon
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

function InfoCell({
  icon: Icon, label, value, borderRight, borderTop
}: {
  icon: LucideIcon; label: string; value: string;
  borderRight?: boolean; borderTop?: boolean;
}) {
  return (
    <div className={`p-6 sm:p-8 ${borderRight ? "border-r border-[#222]" : ""} ${borderTop ? "border-t border-[#222]" : ""}`}>
      <div className="flex items-center gap-2 mb-3">
        <Icon size={13} className="text-[#555]" />
        <span className="text-[#555] text-xs uppercase tracking-widest">{label}</span>
      </div>
      <p className="text-white text-sm sm:text-base">{value}</p>
    </div>
  );
}

function ChapterHeader({ subheading, accentColor }: { subheading?: string; accentColor: string }) {
  if (!subheading) return null;
  const Icon = getIcon(subheading);
  return (
    <div className="mb-10">
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
          {subheading}
        </h2>
        <Icon size={28} className="text-[#333] mt-1 shrink-0 ml-4" />
      </div>
      <div className="border-t border-[#222]" />
    </div>
  );
}

function SectionContent({ section, accentColor, fullBleed }: {
  section: ProjectSection; accentColor: string; fullBleed?: boolean;
}) {
  const paragraphs = Array.isArray(section.paragraph) ? section.paragraph : [section.paragraph];

  return (
    <div className="mb-16">
      <ChapterHeader subheading={section.subheading} accentColor={accentColor} />

      <div className="max-w-2xl">
        <h3 className="text-white text-xl sm:text-2xl font-semibold leading-snug mb-5">
          {section.heading}
        </h3>
        {paragraphs.map((para, i) => (
          <p key={i} className="text-[#888] text-base leading-relaxed mb-4 whitespace-pre-line">
            {para}
          </p>
        ))}
      </div>

      {section.images && section.images.length > 0 && (
        <div className={`mt-10 ${section.images.length === 1 && fullBleed ? "-mx-4 sm:-mx-6 lg:-mx-8" : ""}`}>
          {section.images.length === 1 ? (
            <div className={`overflow-hidden ${fullBleed ? "" : "rounded-2xl"} bg-[#111]`}>
              <ImageWithFallback
                src={`https://images.unsplash.com/photo-${section.images[0]}?w=1400&h=788&fit=crop&q=85`}
                alt={section.heading}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          ) : (
            <div className={`grid gap-3 ${section.images.length === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}>
              {section.images.map((id, i) => (
                <div key={i} className="rounded-2xl overflow-hidden bg-[#111] aspect-video">
                  <ImageWithFallback
                    src={`https://images.unsplash.com/photo-${id}?w=800&h=450&fit=crop&q=85`}
                    alt={`${section.heading} ${i + 1}`}
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
    <div className="w-full max-w-[860px] mx-auto px-4 sm:px-6 py-10 sm:py-16">

      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#555] hover:text-white transition-colors mb-14 group text-sm"
      >
        <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
        All work
      </button>

      {/* Title + description — centered */}
      <div className="text-center mb-10">
        <h1 className="text-white text-5xl sm:text-7xl lg:text-8xl font-bold leading-none tracking-tight mb-6">
          {project.title}
        </h1>
        <p className="text-[#888] text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
          {project.description}
        </p>
      </div>

      {/* Pill tags */}
      <div className="flex flex-wrap justify-center gap-2 mb-16">
        <span className="text-xs px-3 py-1 border border-[#333] rounded-full text-[#666]">{project.category}</span>
        <span className="text-xs px-3 py-1 border border-[#333] rounded-full text-[#666]">{project.year}</span>
        <span className="text-xs px-3 py-1 border border-[#333] rounded-full text-[#666]">End-to-end Design</span>
      </div>

      {/* Hero image — full bleed */}
      <div className="-mx-4 sm:-mx-6 lg:-mx-8 mb-16 bg-[#111]">
        <ImageWithFallback
          src={`https://images.unsplash.com/photo-${project.images[0]}?w=1600&h=900&fit=crop&q=90`}
          alt={project.title}
          className="w-full h-auto object-cover"
          loading="eager"
        />
      </div>

      {/* Metrics */}
      {project.metrics && project.metrics.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 border border-[#222] rounded-2xl overflow-hidden mb-20">
          {project.metrics.map((m, i) => (
            <div
              key={i}
              className={`p-6 sm:p-8 bg-[#111] ${i > 0 ? "border-l border-[#222]" : ""}`}
            >
              <p className="text-white text-3xl sm:text-4xl font-bold mb-1">{m.value}</p>
              <p className="text-[#555] text-xs leading-snug">{m.description || m.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Pre-breaker sections */}
      {project.sections?.map((section, i) => (
        <SectionContent key={i} section={section} accentColor={accentColor} fullBleed />
      ))}

      {/* Breaker */}
      {project.breakerText && (
        <div className="border-t border-b border-[#222] py-16 my-8">
          <p className="text-white text-2xl sm:text-3xl lg:text-4xl font-semibold leading-relaxed">
            "{project.breakerText}"
          </p>
        </div>
      )}

      {/* Post-breaker sections */}
      {project.sectionsAfterBreaker?.map((section, i) => (
        <SectionContent key={i} section={section} accentColor={accentColor} fullBleed />
      ))}

      {/* Bottom back */}
      <div className="border-t border-[#222] mt-8 pt-12">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#555] hover:text-white transition-colors group text-sm"
        >
          <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
          Back to all work
        </button>
      </div>

    </div>
  );
}
