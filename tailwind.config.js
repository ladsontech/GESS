/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'matlab': {
          bg: '#F0F0F0',
          panel: '#E8E8E8',
          border: '#A0A0A0',
          dark: '#808080',
          text: '#000000',
          blue: '#0076A8',
          darkblue: '#004C6D',
          toolbar: '#D4D4D4',
        },
      },
      fontFamily: {
        system: ['Arial', 'Helvetica', 'sans-serif'],
        mono: ['Courier New', 'Courier', 'monospace'],
      },
      boxShadow: {
        'inset-light': 'inset 1px 1px 2px rgba(255,255,255,0.8)',
        'inset-dark': 'inset -1px -1px 2px rgba(0,0,0,0.2)',
        'classic': '2px 2px 4px rgba(0,0,0,0.3)',
        'classic-inset': 'inset 2px 2px 4px rgba(0,0,0,0.2)',
      },
    },
  },
  plugins: [],
};
