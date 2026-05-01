/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        geist: ['Geist', 'Arial', 'Apple Color Emoji', 'sans-serif'],
        mono: ['Geist Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        'roger-green': '#25D366',
        'roger-green-dark': '#128C7E',
        'roger-green-light': '#DCF8C6',
        'roger-canvas': '#f0f2f5',
        'roger-timestamp': '#667781',
        'roger-divider': '#e9edef',
        'vercel-black': '#171717',
        'vercel-gray': '#4d4d4d',
      },
    },
  },
  plugins: [],
}
