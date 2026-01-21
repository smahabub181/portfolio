/** @type {import('tailwindcss').Config} */
module.exports = {
  // IMPORTANT: for your Sun/Moon toggle (class-based dark mode)
  darkMode: "class",

  // Scan these files for Tailwind classes
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      // You can extend theme here later if needed
    },
  },

  plugins: [
    require("@tailwindcss/line-clamp"),
    require("tailwindcss-animate"),
  ],
};
