/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#1E40AF',
          accent: '#F59E0B',
          dark: '#0B1220',
          card: '#1E293B',
          text: '#E5E7EB',
          subtext: '#94A3B8',
        }
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
