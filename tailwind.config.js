/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#1b2430',
          soft: '#4a5568',
        },
        paper: '#f0ece2',
        card: '#fffdf8',
        cardline: '#ded6c4',
        brass: {
          DEFAULT: '#b8862e',
          dark: '#8f6822',
        },
        teal: {
          DEFAULT: '#33564f',
          light: '#e4ece9',
          deep: '#24413c',
        },
        brick: {
          DEFAULT: '#a23b2e',
          light: '#f5e2de',
        },
        focus: '#2f6fed',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      backgroundImage: {
        'ledger-lines': 'linear-gradient(#ded6c4 1px, transparent 1px)',
      },
      backgroundSize: {
        'ledger-lines': '100% 32px',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '150% 0' },
          '100%': { backgroundPosition: '-50% 0' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.4s ease-in-out infinite',
      },
      boxShadow: {
        card: '0 1px 0 #ded6c4, 0 6px 14px -10px rgba(27,36,48,0.35)',
        'card-hover': '0 1px 0 #ded6c4, 0 12px 22px -12px rgba(27,36,48,0.45)',
      },
    },
  },
  plugins: [],
}
