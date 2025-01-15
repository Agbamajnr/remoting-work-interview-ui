/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

export default {
  content: [
    './src/**/*.{mjs,js,ts,jsx,tsx}',
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        "dark-background": "#111827",
        "light-background": "#ffffff",
      }
    }
  },
  darkMode: "class",
  plugins: [
    flowbite.plugin(),
  ]
}
