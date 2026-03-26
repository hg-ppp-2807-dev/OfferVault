import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Syne'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        coal: {
          950: "#0a0a0f",
          900: "#0f0f17",
          800: "#16161f",
          700: "#1e1e2a",
          600: "#252535",
        },
        amber: {
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
        },
        emerald: {
          400: "#34d399",
          500: "#10b981",
        },
        violet: {
          400: "#a78bfa",
          500: "#8b5cf6",
        },
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(251,191,36,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.03) 1px, transparent 1px)",
        "glow-amber":
          "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(251,191,36,0.12) 0%, transparent 70%)",
        "glow-violet":
          "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(139,92,246,0.10) 0%, transparent 70%)",
        "glow-emerald":
          "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(16,185,129,0.10) 0%, transparent 70%)",
      },
      backgroundSize: {
        "grid-sm": "32px 32px",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        shimmer: "shimmer 2s infinite",
        pulse: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      boxShadow: {
        "amber-glow": "0 0 30px rgba(251,191,36,0.15)",
        "violet-glow": "0 0 30px rgba(139,92,246,0.15)",
        "emerald-glow": "0 0 30px rgba(16,185,129,0.15)",
        panel: "0 1px 0 rgba(255,255,255,0.05), 0 -1px 0 rgba(0,0,0,0.3)",
      },
    },
  },
  plugins: [],
};
export default config;
