/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        softBlue: "#A3C9E0",
        softBlueLight: "#D9ECF2",
        softPurple: "#C8B6E2",
        warmNeutral: "#f4f2ef",
        warmNeutralDark: "#e5d7cf",
        textPrimary: "#2d3748",
        textSecondary: "#718096",
      },
    },
  },
  plugins: [],
};
