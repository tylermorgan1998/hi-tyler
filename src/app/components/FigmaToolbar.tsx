export function FigmaToolbar({ activeTab, onTabChange }: { activeTab: "home" | "about" | "game"; onTabChange: (tab: "home" | "about" | "game") => void }) {
  return (
    <div className="bg-[#2c2c2c] px-2 py-1.5 flex items-center justify-between border-b border-[#1e1e1e]">
      <div className="flex items-center gap-0.5">
        {/* Move tool - Active */}
        <button className="p-2 bg-[#18a0fb] rounded transition-colors flex items-center gap-1" title="Move">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-white">
            <path d="M2 2L16 16M2 2L5 5M2 2L2 5M16 16L13 13M16 16L16 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="text-white">
            <path d="M1 3L4 6L7 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Frame tool */}
        <button className="p-2 hover:bg-[#383838] rounded transition-colors flex items-center gap-1" title="Frame">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-white">
            <path d="M3 6V3H6M12 3H15V6M15 12V15H12M6 15H3V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="6" y1="9" x2="12" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="9" y1="6" x2="9" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="text-white">
            <path d="M1 3L4 6L7 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Shape tool */}
        <button className="p-2 hover:bg-[#383838] rounded transition-colors flex items-center gap-1" title="Shape">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-white">
            <rect x="4" y="4" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          </svg>
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="text-white">
            <path d="M1 3L4 6L7 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Pen tool */}
        <button className="p-2 hover:bg-[#383838] rounded transition-colors flex items-center gap-1" title="Pen">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-white">
            <path d="M13 3L15 5L7 13L4 14L5 11L13 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11 5L13 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="text-white">
            <path d="M1 3L4 6L7 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Text tool */}
        <button className="p-2 hover:bg-[#383838] rounded transition-colors" title="Text">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-white">
            <path d="M4 4H14M9 4V14M7 14H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Comment tool */}
        <button className="p-2 hover:bg-[#383838] rounded transition-colors flex items-center gap-1" title="Comment">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-white">
            <path d="M15 9C15 12.314 12.314 15 9 15C8.03 15 7.12 14.77 6.32 14.37L3 15L3.63 11.68C3.23 10.88 3 9.97 3 9C3 5.686 5.686 3 9 3C12.314 3 15 5.686 15 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
          </svg>
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="text-white">
            <path d="M1 3L4 6L7 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Resources/Plugins tool */}
        <button className="p-2 hover:bg-[#383838] rounded transition-colors flex items-center gap-1" title="Resources">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-white">
            <path d="M5 9L9 5L13 9L9 13L5 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
            <circle cx="9" cy="4" r="1.5" fill="currentColor"/>
            <circle cx="13" cy="9" r="1.5" fill="currentColor"/>
          </svg>
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="text-white">
            <path d="M1 3L4 6L7 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
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