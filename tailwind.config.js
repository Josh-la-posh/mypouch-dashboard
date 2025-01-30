/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#A5B4FC", // Light mode primary color
          dark: "#6366F1", // Dark mode primary color
        },
        background: {
          light: "#F3F4F6", // Light mode background
          dark: "#1F2937", // Dark mode background
        },
        text: {
          light: "#664C89", // Light mode text
          dark: "#F9FAFB", // Dark mode text
        },
      },
    },
  },
  darkMode: "class", // Enable dark mode switching
  plugins: [require('tailwind-scrollbar')],
};
