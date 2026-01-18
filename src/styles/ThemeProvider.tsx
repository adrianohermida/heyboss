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
    // Injeta todas as variáveis do objeto colors
    Object.entries(themeColors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
    // Alias para máxima compatibilidade com Tailwind e componentes
    root.style.setProperty('--color-bg', themeColors.bg);
    root.style.setProperty('--color-text', themeColors.text);
    root.style.setProperty('--color-card', themeColors.card);
    root.style.setProperty('--color-border', themeColors.border);
    root.classList.remove('theme-clear', 'theme-dark');
    root.classList.add(`theme-${mode}`);

    // Aplica fundo e cor de texto globalmente (body e html)
    document.body.style.backgroundColor = themeColors.bg;
    document.body.style.color = themeColors.text;
    root.style.backgroundColor = themeColors.bg;
    root.style.color = themeColors.text;
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
