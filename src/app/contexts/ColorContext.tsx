import { createContext, useContext, useState, ReactNode } from 'react';

interface ColorContextType {
  accentColor: string;
  setAccentColor: (color: string) => void;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export function ColorProvider({ children }: { children: ReactNode }) {
  const [accentColor, setAccentColor] = useState('#18a0fb');

  return (
    <ColorContext.Provider value={{ accentColor, setAccentColor }}>
      {children}
    </ColorContext.Provider>
  );
}

export function useColor() {
  const context = useContext(ColorContext);
  if (context === undefined) {
    throw new Error('useColor must be used within a ColorProvider');
  }
  return context;
}
