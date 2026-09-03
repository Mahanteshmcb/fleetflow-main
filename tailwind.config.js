/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#0B1220",
          900: "#101A2E",
          800: "#16223B",
          700: "#22304D",
          600: "#334063",
          500: "#4B5A7F",
        },
        brand: {
          50: "#EEF3FF",
          100: "#DCE7FF",
          200: "#B8CEFF",
          300: "#8DAEFF",
          400: "#5C87F5",
          500: "#3562E0",
          600: "#2749C2",
          700: "#1E3999",
          800: "#1A2E77",
          900: "#182960",
        },
        healthy: { DEFAULT: "#1F9D55", bg: "#E9F8EF", ring: "#1F9D55" },
        warning: { DEFAULT: "#D97B0B", bg: "#FEF3E2", ring: "#D97B0B" },
        critical: { DEFAULT: "#D6362E", bg: "#FDEBEA", ring: "#D6362E" },
        surface: "#F6F7FA",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(16, 26, 46, 0.06), 0 1px 1px rgba(16,26,46,0.04)",
        pop: "0 12px 32px rgba(16, 26, 46, 0.16)",
      },
      borderRadius: {
        xl2: "1rem",
      },
    },
  },
  plugins: [],
}
