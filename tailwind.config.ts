import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        night: '#05050a',
        panel: '#0b0b16',
        line: 'rgba(255,255,255,0.08)',
        neon: {
          cyan: '#00f0ff',
          magenta: '#ff2ec4',
          violet: '#8b5cf6',
        },
        ink: {
          DEFAULT: '#e8e9f1',
          dim: '#9aa0b4',
          faint: '#5c6178',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 24px rgba(0,240,255,0.25)',
        'glow-magenta': '0 0 24px rgba(255,46,196,0.25)',
        'glow-violet': '0 0 32px rgba(139,92,246,0.3)',
      },
      backgroundImage: {
        'neon-gradient': 'linear-gradient(100deg, #00f0ff 0%, #8b5cf6 50%, #ff2ec4 100%)',
      },
      animation: {
        'float-slow': 'floatSlow 14s ease-in-out infinite',
        'float-slower': 'floatSlow 20s ease-in-out infinite reverse',
        blink: 'blink 1s step-end infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(60px, -40px) scale(1.15)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
