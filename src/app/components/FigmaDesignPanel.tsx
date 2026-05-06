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
  const svPickerRef = useRef<HTMLDivElement>(null);
  const hueSliderRef = useRef<HTMLDivElement>(null);

  // Convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 24, g: 160, b: 251 };
  };

  // Convert RGB to hex
  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join('');
  };

  const rgb = hexToRgb(accentColor);
  const initialHsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
  
  const [hue, setHue] = useState(initialHsv.h);
  const [saturation, setSaturation] = useState(initialHsv.s);
  const [value, setValue] = useState(initialHsv.v);
  const [isDraggingSV, setIsDraggingSV] = useState(false);
  const [isDraggingHue, setIsDraggingHue] = useState(false);

  // Track if we're updating internally to prevent loops
  const isInternalUpdate = useRef(false);

  // Update accent color when HSV changes
  useEffect(() => {
    if (isInternalUpdate.current) {
      isInternalUpdate.current = false;
      return;
    }
    
    const rgb = hsvToRgb(hue, saturation, value);
    const newColor = rgbToHex(rgb.r, rgb.g, rgb.b);
    if (newColor !== accentColor) {
      setAccentColor(newColor);
    }
  }, [hue, saturation, value, accentColor, setAccentColor]);

  // Update HSV when accent color changes externally
  useEffect(() => {
    const rgb = hexToRgb(accentColor);
    const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
    
    // Only update if the values are actually different
    if (Math.abs(hsv.h - hue) > 0.5 || Math.abs(hsv.s - saturation) > 0.5 || Math.abs(hsv.v - value) > 0.5) {
      isInternalUpdate.current = true;
      setHue(hsv.h);
      setSaturation(hsv.s);
      setValue(hsv.v);
    }
  }, [accentColor]);

  // Handle SV picker mouse events
  const handleSVMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDraggingSV(true);
    updateSV(e);
  };

  const updateSV = (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
    if (!svPickerRef.current) return;
    const rect = svPickerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
    setSaturation((x / rect.width) * 100);
    setValue(100 - (y / rect.height) * 100);
  };

  // Handle hue slider mouse events
  const handleHueMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDraggingHue(true);
    updateHue(e);
  };

  const updateHue = (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
    if (!hueSliderRef.current) return;
    const rect = hueSliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setHue((x / rect.width) * 360);
  };

  // Mouse move and up handlers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingSV) {
        updateSV(e);
      }
      if (isDraggingHue) {
        updateHue(e);
      }
    };

    const handleMouseUp = () => {
      setIsDraggingSV(false);
      setIsDraggingHue(false);
    };

    if (isDraggingSV || isDraggingHue) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingSV, isDraggingHue]);

  // Close color picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setShowColorPicker(false);
      }
    };

    if (showColorPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showColorPicker]);

  // Get pure hue color for the SV picker background
  const pureHueColor = hsvToRgb(hue, 100, 100);
  const pureHueHex = rgbToHex(pureHueColor.r, pureHueColor.g, pureHueColor.b);

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
              {/* Saturation/Value Picker */}
              <div 
                ref={svPickerRef}
                className="relative w-full aspect-[3/4] rounded-lg mb-3 cursor-crosshair"
                style={{
                  background: `linear-gradient(to bottom, transparent, black), linear-gradient(to right, white, ${pureHueHex})`
                }}
                onMouseDown={handleSVMouseDown}
              >
                {/* Picker Handle */}
                <div 
                  className="absolute w-4 h-4 border-2 border-white rounded-full shadow-lg pointer-events-none"
                  style={{
                    left: `calc(${saturation}% - 8px)`,
                    top: `calc(${100 - value}% - 8px)`,
                    boxShadow: '0 0 0 1px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.3)'
                  }}
                />
              </div>

              {/* Hue Slider */}
              <div 
                ref={hueSliderRef}
                className="relative w-full h-3 rounded-full mb-3 cursor-pointer"
                style={{
                  background: 'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)'
                }}
                onMouseDown={handleHueMouseDown}
              >
                {/* Hue Handle */}
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