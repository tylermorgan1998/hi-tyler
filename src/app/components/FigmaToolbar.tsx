import { MousePointer2, Frame, Square, PenTool, Type, MessageSquare } from 'lucide-react';
import { useColor } from '../contexts/ColorContext';

type Tab = "home" | "about" | "game";

const TAB_CLASS = "px-4 py-1 text-sm transition-colors border-b-2";
const INACTIVE_TAB_CLASS = "text-[#b3b3b3] hover:text-white border-transparent";

export function FigmaToolbar({ activeTab, onTabChange }: { activeTab: Tab; onTabChange: (tab: Tab) => void }) {
  const { accentColor } = useColor();

  const tabButton = (tab: Tab, label: string) => {
    const active = activeTab === tab;
    return (
      <button
        onClick={() => onTabChange(tab)}
        className={`${TAB_CLASS} ${active ? "text-white" : INACTIVE_TAB_CLASS}`}
        style={active ? { borderColor: accentColor } : undefined}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="bg-[#2c2c2c] px-2 py-1.5 flex items-center justify-between border-b border-[#1e1e1e]">
      <div className="flex items-center gap-0.5">
        <button className="p-2 rounded transition-colors" style={{ backgroundColor: accentColor }} title="Pointer">
          <MousePointer2 size={16} className="text-white" />
        </button>
        <button className="p-2 hover:bg-[#383838] rounded transition-colors" title="Frame">
          <Frame size={16} className="text-[#666]" />
        </button>
        <button className="p-2 hover:bg-[#383838] rounded transition-colors" title="Square">
          <Square size={16} className="text-[#666]" />
        </button>
        <button className="p-2 hover:bg-[#383838] rounded transition-colors" title="Pen">
          <PenTool size={16} className="text-[#666]" />
        </button>
        <button className="p-2 hover:bg-[#383838] rounded transition-colors" title="Type">
          <Type size={16} className="text-[#666]" />
        </button>
        <button className="p-2 hover:bg-[#383838] rounded transition-colors" title="Comment">
          <MessageSquare size={16} className="text-[#666]" />
        </button>
      </div>

      {/* Center tabs */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1">
        {tabButton("home", "Home")}
        {/* Not a window tab: scrolls the page down to the project cards */}
        <button
          onClick={() => {
            const scrollToProjects = () =>
              document.getElementById("featured-projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
            // Projects are hidden on the About tab, so switch to Home first (after its fade transition)
            if (activeTab === "about") {
              onTabChange("home");
              setTimeout(scrollToProjects, 400);
            } else {
              scrollToProjects();
            }
          }}
          className={`${TAB_CLASS} ${INACTIVE_TAB_CLASS}`}
        >
          Projects
        </button>
        {tabButton("about", "About")}
        {tabButton("game", "Block Break")}
      </div>

      <div className="w-32"></div>
    </div>
  );
}
