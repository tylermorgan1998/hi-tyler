import { ChevronRight, ChevronDown, Type, Square, Search, Plus, FileText, Frame, Layers2, RectangleHorizontal } from 'lucide-react';

export function FigmaSidebar() {
  return (
    <div className="w-56 bg-[#2c2c2c] border-r border-[#1e1e1e] flex flex-col h-full">
      {/* Layers header */}
      <div className="px-3 py-2 border-b border-[#1e1e1e] flex items-center justify-between">
        <span className="text-[#b3b3b3] text-xs">Layers</span>
        <button className="text-[#b3b3b3] hover:text-white transition-colors">
          <Plus size={14} />
        </button>
      </div>

      {/* Search */}
      <div className="px-3 py-2 border-b border-[#1e1e1e]">
        <div className="bg-[#1e1e1e] rounded px-2 py-1.5 flex items-center gap-2">
          <Search size={12} className="text-[#666]" />
          <input
            type="text"
            placeholder="Search layers"
            className="bg-transparent text-[#b3b3b3] text-xs outline-none flex-1 placeholder:text-[#666]"
          />
        </div>
      </div>

      {/* Layers tree */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-0.5">
          {/* Page */}
          <div className="flex items-center gap-1 py-1 px-2 hover:bg-[#383838] rounded cursor-pointer">
            <ChevronDown size={10} className="text-[#b3b3b3]" />
            <FileText size={12} className="text-[#18a0fb]" />
            <span className="text-[#b3b3b3] text-xs flex-1">Page 1</span>
          </div>

          {/* Frame 1 - expanded */}
          <div className="ml-3">
            <div className="flex items-center gap-1 py-1 px-2 hover:bg-[#383838] rounded cursor-pointer">
              <ChevronDown size={10} className="text-[#b3b3b3]" />
              <Frame size={12} className="text-[#a259ff]" />
              <span className="text-[#b3b3b3] text-xs flex-1">Frame 1</span>
            </div>

            {/* Hero Section group */}
            <div className="ml-3">
              <div className="flex items-center gap-1 py-1 px-2 hover:bg-[#383838] rounded cursor-pointer">
                <ChevronDown size={10} className="text-[#b3b3b3]" />
                <Layers2 size={12} className="text-[#7b61ff]" />
                <span className="text-[#b3b3b3] text-xs flex-1">Hero Section</span>
              </div>

              {/* Intro Text - selected */}
              <div className="ml-3">
                <div className="flex items-center gap-1 py-1 px-2 bg-[#18a0fb] rounded cursor-pointer">
                  <div className="w-3" />
                  <Type size={12} className="text-white" />
                  <span className="text-white text-xs flex-1">Intro Text</span>
                </div>

                <div className="flex items-center gap-1 py-1 px-2 hover:bg-[#383838] rounded cursor-pointer">
                  <div className="w-3" />
                  <Type size={12} className="text-[#b3b3b3]" />
                  <span className="text-[#b3b3b3] text-xs flex-1">Subheading</span>
                </div>

                <div className="flex items-center gap-1 py-1 px-2 hover:bg-[#383838] rounded cursor-pointer">
                  <div className="w-3" />
                  <RectangleHorizontal size={12} className="text-[#b3b3b3]" />
                  <span className="text-[#b3b3b3] text-xs flex-1">CTA Button</span>
                </div>
              </div>
            </div>

            {/* Background */}
            <div className="ml-3">
              <div className="flex items-center gap-1 py-1 px-2 hover:bg-[#383838] rounded cursor-pointer">
                <div className="w-3" />
                <Square size={12} className="text-[#b3b3b3]" />
                <span className="text-[#b3b3b3] text-xs flex-1">Background</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pages footer */}
      <div className="border-t border-[#1e1e1e] px-3 py-2">
        <div className="flex items-center justify-between">
          <span className="text-[#666] text-xs">Pages</span>
          <button className="text-[#b3b3b3] hover:text-white transition-colors">
            <Plus size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
