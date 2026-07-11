import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#F7F5F0',
        ink: '#141414',
        'ink-soft': '#232120',
        revolution: {
          DEFAULT: '#CC0000',
          dark: '#9C0000',
          light: '#E13B3B',
        },
        solidarity: {
          DEFAULT: '#B8860B',
          light: '#D4A017',
        },
        steel: '#4A4A4A',
        concrete: '#E8E4DC',
        'concrete-dark': '#2A2826',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        'display-am': ['var(--font-display-am)', 'serif'],
        body: ['var(--font-body)', 'Georgia', 'serif'],
        'body-am': ['var(--font-body-am)', 'serif'],
        utility: ['var(--font-utility)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        'display-1': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '0.98', letterSpacing: '-0.01em' }],
        'display-2': ['clamp(1.9rem, 4vw, 3.2rem)', { lineHeight: '1.02', letterSpacing: '-0.01em' }],
        headline: ['clamp(1.3rem, 2.4vw, 1.9rem)', { lineHeight: '1.15' }],
      },
      borderRadius: {
        none: '0px',
      },
      backgroundImage: {
        'diagonal-cut': 'linear-gradient(115deg, transparent 49.4%, currentColor 49.4%, currentColor 50.6%, transparent 50.6%)',
      },
    },
  },
  plugins: [],
};

export default config;
