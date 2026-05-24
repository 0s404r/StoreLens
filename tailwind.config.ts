import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-cairo)", "system-ui", "sans-serif"],
        display: ["var(--font-reem)", "var(--font-cairo)", "serif"],
      },
      colors: {
        // Brand colors — distinctive editorial palette
        ink: {
          50: "#FAFAF7",
          100: "#F4F3EE",
          200: "#E5E3DA",
          300: "#C9C6B8",
          400: "#9C9A8E",
          500: "#6B6A60",
          600: "#4A4944",
          700: "#2F2E2A",
          800: "#1A1A18",
          900: "#0D0D0C",
        },
        accent: {
          50: "#F0F7F6",
          100: "#D8EAE7",
          200: "#A8D0C9",
          300: "#6FB0A5",
          400: "#3D8A7E",
          500: "#0D5E5E",
          600: "#0A4B4B",
          700: "#083838",
          800: "#052525",
          900: "#031414",
        },
        signal: {
          critical: "#C53030",
          warning: "#D97706",
          success: "#0D9F6E",
          info: "#1E5DAA",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        pulse_slow: "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
