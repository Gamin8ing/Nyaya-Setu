/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "Poppins", "system-ui", "sans-serif"],
      },
      colors: {
        background: "#0B0D0F",
        foreground: "#FFFFFF",
        muted: {
          DEFAULT: "#1A1D21",
          50: "#22262B",
        },
        border: "#22262B",
        accent: {
          DEFAULT: "#16A34A",
          500: "#16A34A",
          600: "#13823C",
          700: "#0F6A32",
        },
        danger: "#DC2626",
      },
      borderRadius: {
        xl: "1.25rem",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.45)",
        glow: "0 0 0 1px rgba(22,163,74,0.4), 0 0 16px -2px rgba(22,163,74,0.35)",
      },
      backdropBlur: {
        xs: '2px'
      }
    },
  },
  plugins: [],
};
