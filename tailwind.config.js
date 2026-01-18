

/** @type {import('tailwindcss').Config} */
import tailwindcssMotion from 'tailwindcss-motion';

export default {
  content: ['./src/react-app/**/*.{html,js,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: 'var(--color-bg-dark)',
          primary: 'var(--color-brand)',
          accent: 'var(--color-accent)',
          elevated: 'var(--color-card)',
          secondary: 'var(--color-bg-clear)',
        },
        text: {
          DEFAULT: 'var(--color-text)',
        },
        card: {
          DEFAULT: 'var(--color-card)',
        },
        border: {
          DEFAULT: 'var(--color-border)',
        },
        bg: {
          DEFAULT: 'var(--color-bg)',
          dark: 'var(--color-bg-dark)',
          clear: 'var(--color-bg-clear)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'scroll': 'scroll 40s linear infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [tailwindcssMotion],
};

