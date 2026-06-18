import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0B0B0D",
        surface: "#141417",
        surface2: "#1A1A1F",
        ink: "#ECEAE3",
        muted: "#8A8A93",
        accent: "#5B9DFF", // electric blue — the system's brand signal
        // functional status palette (used only on status indicators)
        live: "#3FB950",
        building: "#D9A441",
        shipped: "#5B9DFF",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
