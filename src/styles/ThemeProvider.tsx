// src/styles/ThemeProvider.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { colors, ThemeMode } from './theme';

type ThemeOverride = Partial<{
  mode: ThemeMode;
  customColors: Partial<typeof colors.clear>;
}>;


interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  setCustomColors: (colors: Partial<typeof colors.clear> | null) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'clear',
  setMode: () => {},
  setCustomColors: () => {},
});


export const useTheme = () => useContext(ThemeContext);

export const useThemeOverride = () => {
  const { setCustomColors } = useContext(ThemeContext);
  return setCustomColors;
};


export const ThemeProvider: React.FC<{ children: React.ReactNode; override?: ThemeOverride }> = ({ children, override }) => {
  const [mode, setMode] = useState<ThemeMode>(override?.mode || 'clear');
  const [customColors, setCustomColors] = useState<Partial<typeof colors.clear> | null>(override?.customColors || null);

  useEffect(() => {
    const root = document.documentElement;
    const baseColors = colors[mode];
    const themeColors = customColors ? { ...baseColors, ...customColors } : baseColors;
    Object.entries(themeColors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
    root.style.setProperty('--color-bg', themeColors.bg);
    root.style.setProperty('--color-text', themeColors.text);
    root.style.setProperty('--color-card', themeColors.card);
    root.style.setProperty('--color-border', themeColors.border);
    root.classList.remove('theme-clear', 'theme-dark');
    root.classList.add(`theme-${mode}`);
    document.body.style.backgroundColor = themeColors.bg;
    document.body.style.color = themeColors.text;
    root.style.backgroundColor = themeColors.bg;
    root.style.color = themeColors.text;
  }, [mode, customColors]);

  return (
    <ThemeContext.Provider value={{ mode, setMode, setCustomColors }}>
      {children}
    </ThemeContext.Provider>
  );
};
