// src/styles/ThemeProvider.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { colors, ThemeMode } from './theme';

const ThemeContext = createContext({
  mode: 'clear' as ThemeMode,
  setMode: (mode: ThemeMode) => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>('clear');

  useEffect(() => {
    const root = document.documentElement;
    const themeColors = colors[mode];
    Object.entries(themeColors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
    root.classList.remove('theme-clear', 'theme-dark');
    root.classList.add(`theme-${mode}`);
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
