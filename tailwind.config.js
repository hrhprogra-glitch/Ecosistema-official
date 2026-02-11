/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        eco: {
          dark: "#0F172A",
          green: "#10B981",
          blue: "#3B82F6",
          light: "#F8FAFC",
        }
      }
    },
  },
  plugins: [],
}