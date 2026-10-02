import {
  ArrowLeft, Info, AlertTriangle, Target, Monitor, MessageSquare,
  Calendar, Palette, Settings, Star, Users, FilePlus, LayoutDashboard,
  User, Folder, Briefcase, Smartphone, Sparkles, Trophy, Paintbrush, LucideIcon
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion, MotionConfig } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useColor } from "../contexts/ColorContext";
import type { TeamMember, ParagraphItem } from "../data/projects";

interface ProjectSection {
  subheading?: string;
  heading?: string;
  paragraph: string | ParagraphItem[];
  images?: string[];
  team?: TeamMember[];
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
  coverImage?: string;
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
  "project highlights": Star,
  "role & approach": User,
  "issue": AlertTriangle,
  "overall design": Palette,
  "company view / team view": Users,
  "absence types": Folder,
  "absence colors": Paintbrush,
  "mobile": Smartphone,
  "key features": Sparkles,
  "results": Trophy,
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

function ChapterHeader({ subheading, number, accentColor }: {
  subheading?: string; number: number; accentColor: string;
}) {
  if (!subheading) return null;
  const Icon = getIcon(subheading);
  return (
    <div className="mb-10 sm:mb-12">
      <div className="flex items-center gap-3 mb-5" style={{ color: accentColor }}>
        <span className="font-mono text-sm tracking-widest">{String(number).padStart(2, "0")}</span>
        <span className="h-px w-10 bg-current opacity-60" />
        <Icon size={18} />
      </div>
      <h2 className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
        {subheading}
      </h2>
    </div>
  );
}

// Renders **bold** spans within a line of text
function renderInline(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? <strong key={i} className="text-white font-semibold">{part}</strong> : part
  );
}

// Renders a paragraph string: lines starting with "• " become a styled list,
// other lines become paragraphs (blank lines separate paragraphs).
function RichText({ text, accentColor }: { text: string; accentColor: string }) {
  const blocks: ({ type: "p"; lines: string[] } | { type: "ul"; items: string[] })[] = [];
  for (const line of text.split("\n")) {
    const last = blocks[blocks.length - 1];
    if (line.startsWith("• ")) {
      if (last?.type === "ul") last.items.push(line.slice(2));
      else blocks.push({ type: "ul", items: [line.slice(2)] });
    } else if (line.trim() === "") {
      blocks.push({ type: "p", lines: [] });
    } else if (last?.type === "p") {
      last.lines.push(line);
    } else {
      blocks.push({ type: "p", lines: [line] });
    }
  }

  return (
    <>
      {blocks.map((block, i) =>
        block.type === "ul" ? (
          <ul key={i} className="space-y-3 mb-6">
            {block.items.map((item, j) => (
              <li key={j} className="flex gap-4 text-[#d7d7d7] text-lg sm:text-xl leading-relaxed">
                <span className="mt-[0.7em] w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: accentColor }} />
                <span>{renderInline(item)}</span>
              </li>
            ))}
          </ul>
        ) : block.lines.length > 0 ? (
          <p key={i} className="text-[#d7d7d7] text-lg sm:text-xl leading-[1.75] mb-6 whitespace-pre-line">
            {renderInline(block.lines.join("\n"))}
          </p>
        ) : null
      )}
    </>
  );
}

// Imported assets resolve to a path or data URL; anything else is an Unsplash photo ID
function isLocalImage(src: string) {
  return src.includes("/") || src.startsWith("data:");
}

function TeamGrid({ team, accentColor }: { team: TeamMember[]; accentColor: string }) {
  return (
    <div className="flex flex-col gap-4 mt-12">
      {team.map((member, i) => {
        const initials = member.name.split(" ").map(part => part[0]).join("").slice(0, 2);
        return (
          <motion.div
            key={member.name}
            className="flex items-center gap-5 px-5 py-4 rounded-2xl border border-[#222]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
          >
            {member.photo ? (
              <img
                src={member.photo}
                alt={member.name}
                className="w-14 h-14 rounded-full object-cover shrink-0"
              />
            ) : (
              <div
                className="w-14 h-14 rounded-full shrink-0 flex items-center justify-center text-lg font-semibold"
                style={{ backgroundColor: `${accentColor}26`, color: accentColor }}
                aria-hidden="true"
              >
                {initials}
              </div>
            )}
            <div>
              <p className="text-white text-lg font-medium leading-tight">{member.name}</p>
              <p className="text-[#888] text-base mt-0.5">{member.role}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function SectionIndex({ items, activeId, accentColor }: {
  items: { id: string; number: number; label: string }[]; activeId: string | null; accentColor: string;
}) {
  return (
    <nav className="sticky top-24" aria-label="Sections">
      <p className="text-[#666] text-xs uppercase tracking-widest mb-5">Contents</p>
      <ul className="space-y-1 border-l border-[#222]">
        {items.map(item => {
          const active = item.id === activeId;
          return (
            <li key={item.id}>
              <button
                onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className={`-ml-px flex items-baseline gap-3 w-full text-left pl-4 py-1.5 border-l-2 text-sm transition-colors ${
                  active ? "text-white" : "text-[#666] hover:text-[#b3b3b3] border-transparent"
                }`}
                style={active ? { borderColor: accentColor } : undefined}
                aria-current={active ? "true" : undefined}
              >
                <span className="font-mono text-[11px]" style={active ? { color: accentColor } : undefined}>
                  {String(item.number).padStart(2, "0")}
                </span>
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function SectionContent({ id, section, number, accentColor, fullBleed }: {
  id: string; section: ProjectSection; number: number; accentColor: string; fullBleed?: boolean;
}) {
  const paragraphs = Array.isArray(section.paragraph) ? section.paragraph : [section.paragraph];

  return (
    <motion.section
      id={id}
      className="py-16 sm:py-24 border-t border-[#222] scroll-mt-4"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <ChapterHeader subheading={section.subheading} number={number} accentColor={accentColor} />

      <div className="max-w-3xl">
        {section.heading && (
          <h3 className="text-white text-2xl sm:text-3xl lg:text-[2.1rem] font-medium leading-snug tracking-tight mb-8">
            {section.heading}
          </h3>
        )}
        {paragraphs.map((para, i) =>
          typeof para === "string" ? (
            <RichText key={i} text={para} accentColor={accentColor} />
          ) : (
            <ImageWithFallback
              key={i}
              src={para.image}
              alt={para.alt ?? ""}
              className="w-full h-auto mt-2 mb-10"
              loading="lazy"
            />
          )
        )}
        {section.team && section.team.length > 0 && (
          <TeamGrid team={section.team} accentColor={accentColor} />
        )}
      </div>

      {section.images && section.images.length > 0 && (
        <div className={`mt-10 ${section.images.length === 1 && fullBleed && !isLocalImage(section.images[0]) ? "-mx-4 sm:-mx-6 lg:-mx-8" : ""}`}>
          {section.images.length === 1 && isLocalImage(section.images[0]) ? (
            // Local images (e.g. device mockups with transparent backgrounds) render as-is
            <ImageWithFallback
              src={section.images[0]}
              alt={section.heading ?? section.subheading ?? ""}
              className="w-full h-auto"
              loading="lazy"
            />
          ) : section.images.length === 1 ? (
            <div className={`overflow-hidden ${fullBleed ? "" : "rounded-2xl"} bg-[#111]`}>
              <ImageWithFallback
                src={`https://images.unsplash.com/photo-${section.images[0]}?w=1400&h=788&fit=crop&q=85`}
                alt={section.heading ?? section.subheading ?? ""}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          ) : (
            <div className={`grid gap-3 ${section.images.length === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}>
              {section.images.map((id, i) => (
                <div key={i} className="rounded-2xl overflow-hidden bg-[#111] aspect-video">
                  <ImageWithFallback
                    src={isLocalImage(id) ? id : `https://images.unsplash.com/photo-${id}?w=800&h=450&fit=crop&q=85`}
                    alt={`${section.heading ?? section.subheading ?? ""} ${i + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </motion.section>
  );
}

export function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  const { accentColor } = useColor();
  const sectionsBeforeBreaker = project.sections?.length ?? 0;
  const [activeId, setActiveId] = useState<string | null>(null);

  const indexItems = [...(project.sections ?? []), ...(project.sectionsAfterBreaker ?? [])]
    .map((section, i) => ({ id: `section-${i + 1}`, number: i + 1, label: section.subheading ?? "" }))
    .filter(item => item.label);

  // Highlight the section crossing the middle of the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveId(e.target.id); }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    indexItems.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [project.id]);

  return (
    <MotionConfig reducedMotion="user">
    <div className="w-full max-w-[1120px] mx-auto px-4 sm:px-6 py-10 sm:py-16">

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
        <p className="text-[#d7d7d7] text-xl sm:text-2xl leading-relaxed max-w-3xl mx-auto">
          {project.description}
        </p>
      </div>

      {/* Pill tags */}
      <div className="flex flex-wrap justify-center gap-2 mb-16">
        <span className="text-xs px-3 py-1 border border-[#333] rounded-full text-[#666]">{project.category}</span>
        <span className="text-xs px-3 py-1 border border-[#333] rounded-full text-[#666]">{project.year}</span>
        <span className="text-xs px-3 py-1 border border-[#333] rounded-full text-[#666]">End-to-end Design</span>
      </div>

      {/* Hero image — breaks out of the content column to nearly full viewport width */}
      <div className="relative left-1/2 -translate-x-1/2 w-[95vw] max-w-[1800px] mb-16">
        {/* Soft accent glow behind the image */}
        <div
          className="absolute inset-x-[15%] inset-y-[20%] rounded-full blur-[120px] opacity-25 pointer-events-none"
          style={{ backgroundColor: accentColor }}
        />
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <ImageWithFallback
            src={project.coverImage ?? `https://images.unsplash.com/photo-${project.images[0]}?w=1600&h=900&fit=crop&q=90`}
            alt={project.title}
            className="w-full h-auto object-cover"
            loading="eager"
          />
        </motion.div>
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
              <p className="text-[#d7d7d7] text-xs leading-snug">{m.description || m.label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-16">
      {/* Sticky section index (desktop only); shifted left into the page margin on wider screens */}
      <aside className="hidden lg:block pt-16 sm:pt-24 xl:-translate-x-24 2xl:-translate-x-48">
        <SectionIndex items={indexItems} activeId={activeId} accentColor={accentColor} />
      </aside>

      <div className="min-w-0">
      {/* Pre-breaker sections */}
      {project.sections?.map((section, i) => (
        <SectionContent key={i} id={`section-${i + 1}`} section={section} number={i + 1} accentColor={accentColor} fullBleed />
      ))}

      {/* Breaker */}
      {project.breakerText && (
        <motion.div
          className="border-t border-[#222] py-20 sm:py-28"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
        >
          <p className="text-white text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight">
            <span style={{ color: accentColor }}>“</span>{project.breakerText}<span style={{ color: accentColor }}>”</span>
          </p>
        </motion.div>
      )}

      {/* Post-breaker sections */}
      {project.sectionsAfterBreaker?.map((section, i) => (
        <SectionContent key={i} id={`section-${sectionsBeforeBreaker + i + 1}`} section={section} number={sectionsBeforeBreaker + i + 1} accentColor={accentColor} fullBleed />
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
      </div>

    </div>
    </MotionConfig>
  );
}
