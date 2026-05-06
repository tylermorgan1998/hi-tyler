import { MousePointer2, Frame, Square, PenTool, Type, MessageSquare } from 'lucide-react';

export function FigmaToolbar({ activeTab, onTabChange }: { activeTab: "home" | "about" | "game"; onTabChange: (tab: "home" | "about" | "game") => void }) {
  return (
    <div className="bg-[#2c2c2c] px-2 py-1.5 flex items-center justify-between border-b border-[#1e1e1e]">
      <div className="flex items-center gap-0.5">
        <button className="p-2 bg-[#18a0fb] rounded transition-colors" title="Pointer">
          <MousePointer2 size={16} className="text-[#666]" />
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
        <button
          onClick={() => onTabChange("home")}
          className={`px-4 py-1 text-sm transition-colors border-b-2 ${
            activeTab === "home"
              ? "text-white border-[#18a0fb]"
              : "text-[#b3b3b3] hover:text-white border-transparent"
          }`}
        >
          Home
        </button>
        <button
          onClick={() => onTabChange("about")}
          className={`px-4 py-1 text-sm transition-colors border-b-2 ${
            activeTab === "about"
              ? "text-white border-[#18a0fb]"
              : "text-[#b3b3b3] hover:text-white border-transparent"
          }`}
        >
          About
        </button>
        <button
          onClick={() => onTabChange("game")}
          className={`px-4 py-1 text-sm transition-colors border-b-2 ${
            activeTab === "game"
              ? "text-white border-[#18a0fb]"
              : "text-[#b3b3b3] hover:text-white border-transparent"
          }`}
        >
          Block Break
        </button>
      </div>

      <div className="w-32"></div>
    </div>
  );
}
