import { useState, useRef, useEffect } from 'react';
import { useColor } from '../contexts/ColorContext';

// Convert RGB to HSV
function rgbToHsv(r: number, g: number, b: number): { h: number; s: number; v: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;
  let h = 0;
  const s = max === 0 ? 0 : diff / max;
  const v = max;

  if (diff !== 0) {
    if (max === r) {
      h = ((g - b) / diff + (g < b ? 6 : 0)) / 6;
    } else if (max === g) {
      h = ((b - r) / diff + 2) / 6;
    } else {
      h = ((r - g) / diff + 4) / 6;
    }
  }

  return { h: h * 360, s: s * 100, v: v * 100 };
}

// Convert HSV to RGB
function hsvToRgb(h: number, s: number, v: number): { r: number; g: number; b: number } {
  h /= 360;
  s /= 100;
  v /= 100;
  let r = 0, g = 0, b = 0;

  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

export function FigmaDesignPanel() {
  const { accentColor, setAccentColor } = useColor();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const hueSliderRef = useRef<HTMLDivElement>(null);
  const [hue, setHue] = useState(() => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(accentColor);
    if (!result) return 200;
    const r = parseInt(result[1], 16) / 255;
    const g = parseInt(result[2], 16) / 255;
    const b = parseInt(result[3], 16) / 255;
    return rgbToHsv(r * 255, g * 255, b * 255).h;
  });
  const [isDraggingHue, setIsDraggingHue] = useState(false);

  const rgbToHex = (r: number, g: number, b: number) =>
    "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join('');

  const hueToHex = (h: number) => {
    const { r, g, b } = hsvToRgb(h, 100, 100);
    return rgbToHex(r, g, b);
  };

  const updateHue = (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
    if (!hueSliderRef.current) return;
    const rect = hueSliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const newHue = (x / rect.width) * 360;
    setHue(newHue);
    setAccentColor(hueToHex(newHue));
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => { if (isDraggingHue) updateHue(e); };
    const handleMouseUp = () => setIsDraggingHue(false);
    if (isDraggingHue) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingHue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setShowColorPicker(false);
      }
    };
    if (showColorPicker) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showColorPicker]);

  const pureHueHex = hueToHex(hue);

  return (
    <div className="w-56 bg-[#2c2c2c] border-l border-[#1e1e1e] flex flex-col h-full">
      {/* Header */}
      <div className="px-3 py-2 border-b border-[#1e1e1e]">
        <span className="text-[#666] text-xs">Design</span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {/* Fill */}
        <div className="relative">
          <div className="text-[#666] text-xs mb-2 flex items-center justify-between">
            <span>Fill</span>
            <button className="text-[#666] hover:text-[#b3b3b3]">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 3V9M3 6H9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          <div className="bg-[#1e1e1e] rounded p-2 flex items-center gap-2">
            <button 
              className="w-6 h-6 rounded border border-[#404040] cursor-pointer hover:border-[#666] transition-colors"
              style={{ backgroundColor: accentColor }}
              onClick={() => setShowColorPicker(!showColorPicker)}
            />
            <span className="text-[#b3b3b3] text-xs">Pick a color</span>
          </div>

          {/* Inline Color Picker */}
          {showColorPicker && (
            <div
              ref={colorPickerRef}
              className="absolute mt-3 bg-[#1e1e1e] rounded-lg p-3 shadow-2xl z-50 left-0 right-0"
            >
              {/* Hue Slider */}
              <div
                ref={hueSliderRef}
                className="relative w-full h-3 rounded-full mb-3 cursor-pointer"
                style={{ background: 'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)' }}
                onMouseDown={(e) => { setIsDraggingHue(true); updateHue(e); }}
              >
                <div
                  className="absolute w-5 h-5 border-2 border-white rounded-full -top-1 shadow-lg pointer-events-none"
                  style={{
                    left: `calc(${(hue / 360) * 100}% - 10px)`,
                    backgroundColor: pureHueHex,
                    boxShadow: '0 0 0 1px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.3)'
                  }}
                />
              </div>

              {/* Hex Display */}
              <div className="flex items-center justify-center gap-2">
                <div className="text-[#666] text-xs">HEX</div>
                <div className="bg-[#2c2c2c] px-2 py-1 rounded text-[#b3b3b3] text-xs font-mono">
                  {accentColor.toUpperCase()}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Effects */}
        <div>
          <div className="text-[#666] text-xs mb-2 flex items-center justify-between">
            <span>Effects</span>
            <button className="text-[#666] hover:text-[#b3b3b3]">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 3V9M3 6H9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          <div className="bg-[#1e1e1e] rounded p-2">
            <div className="flex items-center gap-2 mb-1">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[#666]">
                <circle cx="6" cy="6" r="3" stroke="currentColor" strokeWidth="1" fill="none"/>
                <circle cx="6" cy="6" r="1" fill="currentColor"/>
              </svg>
              <span className="text-[#666] text-xs">Drop shadow</span>
            </div>
            <div className="text-[#666] text-xs">0, 4, 8, 0</div>
          </div>
        </div>
      </div>
    </div>
  );
}