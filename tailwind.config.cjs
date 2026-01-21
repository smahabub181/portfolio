/** @type {import('tailwindcss').Config} */
module.exports = {
  // IMPORTANT: your UI toggles the "dark" class on <html>
  // so Tailwind must use "class" mode (not the default "media")
  darkMode: "class",

  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {},
  },

  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/line-clamp"),
  ],
};
