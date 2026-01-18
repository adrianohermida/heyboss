// src/styles/theme.ts
// Centralização de cores para clear/dark mode

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

export type ThemeMode = 'clear' | 'dark';
