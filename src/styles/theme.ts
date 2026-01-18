// src/styles/theme.ts
// Centralização de cores, espaçamentos e fontes para clear/dark mode
// Edite este arquivo para alterar o design system global

export const colors = {
  clear: {
    bg: '#f8f9fa',
    brand: '#2ecc71',
    accent: '#0d9c6e',
    text: '#1a1a1a',
    card: '#fff',
    border: '#e5e7eb',
  },
  dark: {
    bg: '#0a0e1a',
    brand: '#0d9c6e',
    accent: '#f59e0b',
    text: '#fff',
    card: '#181c2a',
    border: '#23283a',
  }
};

export const font = {
  family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  size: '16px',
  weight: '400',
};

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
};

export type ThemeMode = 'clear' | 'dark';
