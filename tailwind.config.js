/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        softBlue: "var(--soft-blue)",
        softBlueLight: "var(--soft-blue-light)",
        softPurple: "var(--accent-purple)",
        warmNeutral: "var(--warm-neutral)",
        warmNeutralDark: "var(--warm-neutral-dark)",
        textPrimary: "var(--text-primary)",
        textSecondary: "var(--text-secondary)",
        offWhite: "var(--off-white)",
      },
    },
  },
  plugins: [],
};
