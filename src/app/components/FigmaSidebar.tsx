export function FigmaSidebar() {
  return (
    <div className="w-56 bg-[#2c2c2c] border-r border-[#1e1e1e] flex flex-col h-full">
      {/* Layers header */}
      <div className="px-3 py-2 border-b border-[#1e1e1e] flex items-center justify-between">
        <span className="text-[#b3b3b3] text-xs">Layers</span>
        <button className="text-[#b3b3b3] hover:text-white transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 3V11M3 7H11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Search */}
      <div className="px-3 py-2 border-b border-[#1e1e1e]">
        <div className="bg-[#1e1e1e] rounded px-2 py-1.5 flex items-center gap-2">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[#666]">
            <circle cx="5" cy="5" r="3" stroke="currentColor" strokeWidth="1.2" fill="none"/>
            <path d="M7 7L10 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
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
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-[#b3b3b3]">
              <path d="M2 1L8 5L2 9V1Z" fill="currentColor"/>
            </svg>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[#18a0fb]">
              <rect x="2" y="2" width="8" height="8" fill="currentColor"/>
            </svg>
            <span className="text-[#b3b3b3] text-xs flex-1">Page 1</span>
          </div>
          
          {/* Frame 1 - expanded */}
          <div className="ml-3">
            <div className="flex items-center gap-1 py-1 px-2 hover:bg-[#383838] rounded cursor-pointer">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-[#b3b3b3]">
                <path d="M2 1L8 5L2 9V1Z" fill="currentColor" transform="rotate(90 5 5)"/>
              </svg>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[#a259ff]">
                <rect x="2" y="2" width="8" height="8" stroke="currentColor" strokeWidth="1.3" fill="none"/>
              </svg>
              <span className="text-[#b3b3b3] text-xs flex-1">Frame 1</span>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-[#666]">
                <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1"/>
              </svg>
            </div>
            
            {/* Hero Section group */}
            <div className="ml-3">
              <div className="flex items-center gap-1 py-1 px-2 hover:bg-[#383838] rounded cursor-pointer">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-[#b3b3b3]">
                  <path d="M2 1L8 5L2 9V1Z" fill="currentColor" transform="rotate(90 5 5)"/>
                </svg>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[#7b61ff]">
                  <path d="M2 4L6 2L10 4V10H2V4Z" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinejoin="round"/>
                </svg>
                <span className="text-[#b3b3b3] text-xs flex-1">Hero Section</span>
              </div>
              
              {/* Intro Text - selected */}
              <div className="ml-3">
                <div className="flex items-center gap-1 py-1 px-2 bg-[#18a0fb] rounded cursor-pointer">
                  <div className="w-3"></div>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white">
                    <path d="M3 3H9M6 3V9M5 9H7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-white text-xs flex-1">Intro Text</span>
                </div>
                
                <div className="flex items-center gap-1 py-1 px-2 hover:bg-[#383838] rounded cursor-pointer">
                  <div className="w-3"></div>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[#b3b3b3]">
                    <path d="M3 3H9M6 3V9M5 9H7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-[#b3b3b3] text-xs flex-1">Subheading</span>
                </div>
                
                <div className="flex items-center gap-1 py-1 px-2 hover:bg-[#383838] rounded cursor-pointer">
                  <div className="w-3"></div>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[#b3b3b3]">
                    <rect x="3" y="4" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" fill="none"/>
                  </svg>
                  <span className="text-[#b3b3b3] text-xs flex-1">CTA Button</span>
                </div>
              </div>
            </div>
            
            {/* Background */}
            <div className="ml-3">
              <div className="flex items-center gap-1 py-1 px-2 hover:bg-[#383838] rounded cursor-pointer">
                <div className="w-3"></div>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[#b3b3b3]">
                  <rect x="2" y="2" width="8" height="8" stroke="currentColor" strokeWidth="1.3" fill="none"/>
                </svg>
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
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 3V11M3 7H11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}