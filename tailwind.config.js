/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class", // ✅ Enables dark mode via a class
  theme: {
    extend: {
      colors: {
        primary: "#2563eb", // Blue-600
        secondary: "#64748b", // Slate-500
        accent: "#f59e0b", // Amber-500
      },
      boxShadow: {
        soft: "0 4px 6px rgba(0, 0, 0, 0.1)",
      },
      transitionProperty: {
        'theme': 'background-color, color, border-color',
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        bounceIn: {
          "0%": { transform: "scale(0.9)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        bounceIn: "bounceIn 0.4s ease",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"), // ✅ For better input styling
  ],
};
