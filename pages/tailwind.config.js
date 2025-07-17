// tailwind.config.js – základní konfigurace designu

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00B4B4', // teal – efektivita, svěžest
        dark: '#1A2A3A', // navy – důvěra, stabilita
      },
      fontFamily: {
        sans: ['Satoshi', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
