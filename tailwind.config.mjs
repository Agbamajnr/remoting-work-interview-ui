/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{mjs,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        "dark-background": "#111827",
        "light-background": "#ffffff",
      }
    }
  },
  darkMode: "class",
  plugins: []
}
