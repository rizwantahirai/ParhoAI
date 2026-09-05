import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink:    { DEFAULT: "#080D12", 900: "#0B1219", 800: "#121C22", 700: "#1B2831" },
        paper:  { DEFAULT: "#FBFAF7", 100: "#F2F5F3", 200: "#E5EAE7", warm: "#FAF6EE" },
        jade:   { DEFAULT: "#0A6E5C", dark: "#064A3E", bright: "#00D6A6", mint: "#7FF0D2", soft: "#E8F5F1" },
        slateink: { DEFAULT: "#3B474D", light: "#5C6B70", faint: "#86959A" },
        line:   { DEFAULT: "#DCE3E1", strong: "#B6C5C1" },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans:  ["var(--font-sans)", "system-ui", "sans-serif"],
        mono:  ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: { content: "1180px" },
      keyframes: {
        rise: { "0%": { opacity: "0", transform: "translateY(10px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
      },
      animation: { rise: "rise .5s ease-out both" },
    },
  },
  plugins: [],
};
export default config;
