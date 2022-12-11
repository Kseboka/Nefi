/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#101113',
        russian: '#1A1B1E',
      },
    },
  },
  plugins: [],
}
